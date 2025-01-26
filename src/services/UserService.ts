import bcrypt from 'bcrypt';

import prisma from './prisma';

interface UpdateProfile {
  firstName: string;
  lastName: string;
  contactNumber: string;
  countryCode: string;
  birthOfDate: Date;
  placeOfBirth: string;
  address: string;
}

interface ChangePassword {
  password: string;
  newPassword: string;
}

export default class UserService {
  async profile(id?: number) {
    const profile = await prisma.profile.findFirstOrThrow({
      where: {
        userId: id
      }
    });

    return {
      profile
    };
  }

  async updateProfile(payload: UpdateProfile, id?: number) {
    const profile = await prisma.profile.update({
      where: {
        userId: id
      },
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        contactNumber: payload.contactNumber,
        countryCode: payload.countryCode,
        birthOfDate: payload.birthOfDate,
        placeOfBirth: payload.placeOfBirth,
        address: payload.address
      }
    });

    return {
      profile
    };
  }

  async changePassword(payload: ChangePassword, id?: number) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id
      }
    });

    if (await bcrypt.compare(payload.password, user.password)) {
      const cryptedPassword = await bcrypt.hash(payload.newPassword, 10);
      await prisma.user.update({
        where: {
          id
        },
        data: {
          password: cryptedPassword
        }
      });

      return {
        message: 'Password changed successfully'
      };
    }

    throw new Error('Wrong old password');
  }
}
