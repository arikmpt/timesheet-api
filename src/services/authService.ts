import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import config from '@/config';
import { Nullable } from '@/types';

import { generateRandomPassword } from './commonService';
import EmailService from './emailService';

interface GetProfileRequest {
  id: number;
  firstName: string;
  lastName: string;
  countryCode: Nullable<string>;
  contactNumber: Nullable<string>;
  birthOfDate: Nullable<Date>;
  placeOfBirth: Nullable<string>;
  address: Nullable<string>;
}

interface GetChangePasswordRequest {
  id?: number;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface GetChangePasswordAfterResetRequest {
  newPassword: string;
  confirmPassword: string;
  token: string;
}
abstract class AuthService {
  private static prisma = new PrismaClient();

  static async login(email: string, password: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        email
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (await bcrypt.compare(password, user.password)) {
      const permissions: string[] = user.role?.permissions.map((data) => data.permission.name) || [];

      await this.prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          lastLogin: new Date()
        }
      });

      return {
        email: user.email,
        id: user.id,
        permissions
      };
    }

    throw new Error(`Credential is not match`);
  }

  static async profile(userId?: number) {
    const profile = await this.prisma.profile.findUniqueOrThrow({
      omit: {
        userId: true
      },
      where: {
        userId
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return {
      profile
    };
  }

  static async updateProfile(body: GetProfileRequest) {
    const profile = await this.prisma.profile.update({
      where: {
        id: body.id
      },
      data: {
        ...body
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return {
      profile
    };
  }

  static async changePassword(body: GetChangePasswordRequest) {
    if (body.newPassword !== body.confirmPassword) {
      throw new Error('New password and confirm password must be match');
    }

    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        id: body.id
      }
    });

    if (await bcrypt.compare(body.oldPassword, user.password)) {
      const cryptedPassword = await bcrypt.hash(body.confirmPassword, config.saltRound);

      const update = await this.prisma.user.update({
        where: {
          id: body.id
        },
        data: {
          password: cryptedPassword
        }
      });

      if (!update) {
        throw new Error(`Failed to process your request`);
      }

      return {
        message: 'Successfully to change your password'
      };
    }

    throw new Error(`Wrong old password`);
  }

  static async resetPassword(email: string) {
    const password = generateRandomPassword(8);

    if (!password) {
      throw new Error('No Default Password');
    }

    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        email
      }
    });

    const cryptedPassword = await bcrypt.hash(password, config.saltRound);

    const token = crypto.randomBytes(32).toString('hex');
    const expiredAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    const update = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: cryptedPassword,
        resetToken: token,
        resetExpiredAt: expiredAt
      }
    });

    if (!update) {
      throw new Error(`Failed to process your request`);
    }

    await EmailService.sendResetPasswordEmail({
      email: update.email,
      resetLink: `${config.resetPasswordUrl}?token=${token}`
    });

    return {
      message: 'Successfully to reset your password'
    };
  }

  static async checkInvitationToken(token: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        invitationToken: token
      }
    });

    const dateNow = new Date();
    const tokenDate = new Date(user.invitationExpiredAt ?? '');

    if (dateNow < tokenDate) {
      const update = await this.prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          isActive: true,
          invitationExpiredAt: null,
          invitationToken: null
        }
      });

      if (!update) {
        throw new Error('Failed to process your request');
      }

      return {
        message: 'Successfully updated user status'
      };
    }

    throw new Error('Token expired');
  }

  static async checkResetToken(token: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        resetToken: token
      }
    });

    const dateNow = new Date();
    const tokenDate = new Date(user.resetExpiredAt ?? '');

    if (dateNow < tokenDate) {
      return {
        message: 'Successfully get reset data'
      };
    }

    throw new Error('Token expired');
  }

  static async changePasswordAfterReset(body: GetChangePasswordAfterResetRequest) {
    if (body.newPassword !== body.confirmPassword) {
      throw new Error('New password and confirm password must be match');
    }

    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        resetToken: body.token
      }
    });

    const dateNow = new Date();
    const tokenDate = new Date(user.resetExpiredAt ?? '');

    if (dateNow < tokenDate) {
      const cryptedPassword = await bcrypt.hash(body.confirmPassword, config.saltRound);
      const update = await this.prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          resetExpiredAt: null,
          resetToken: null,
          password: cryptedPassword
        }
      });

      if (!update) {
        throw new Error('Failed to process your request');
      }

      return {
        message: 'Successfully change your password'
      };
    }

    throw new Error('Token expired');
  }
}

export default AuthService;
