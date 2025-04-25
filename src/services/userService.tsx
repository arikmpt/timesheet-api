import { generateRandomPassword, sendEmail } from "./commonService"
import InviteUser from '@/emails/InviteUser'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import crypto from 'crypto';
import { HasPermission } from "@/types";
import { AuthorizationError } from "@/exceptions/AuthorizationError";
import { CREATE_USER, FIND_USER } from "@/constant";
import bcrypt from 'bcrypt';
import config from "@/config";
import { PrismaClient } from "@prisma/client";

interface CreateUser {
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
}

abstract class UserService {
  private static prisma = new PrismaClient();

  static async create(body: CreateUser, hasPermission?: HasPermission) {
    if (!hasPermission?.(CREATE_USER)) {
      throw new AuthorizationError(`You don't have permission to this resource`);
    }

    const role = await this.prisma.role.findFirstOrThrow({
      where: {
        id: body.roleId
      }
    });
  
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const password = generateRandomPassword(8);
    const cryptedPassword = await bcrypt.hash(password, config.saltRound);

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: body.email,
          password: cryptedPassword,
          isActive: false,
          invitationExpiredAt: expiresAt,
          invitationToken: token,
          roleId: role.id
        },
        include: {
          profile: true
        },
        omit: {
          password: true
        }
      });

      await tx.profile.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          userId: user.id
        }
      });

      return user
    });

    if(!result) {
      throw new Error('Failed to process your request');
    }

    const html = renderToStaticMarkup(
      <InviteUser 
        invitationLink={`${config.appUrl}users/accept-invitation?token=${token}`} 
        firstName={result.profile?.firstName ?? ''} 
        lastName={result.profile?.lastName ?? ''} 
        password={password}
      />
    );

    await sendEmail({ 
      to: result.email, 
      subject: 'Accept Invitation', 
      html, 
    })

    return {
      user: {
        ...result,
        profile: result.profile
      }
    }
  }

  static async resendActivationLink(id: number, hasPermission?: HasPermission) {
    if (!hasPermission?.(FIND_USER)) {
      throw new AuthorizationError(`You don't have permission to this resource`);
    }

    const find = await this.prisma.user.findFirstOrThrow({
      where: {
        id
      },
    });

    if(find.isActive) {
      throw new Error(`This user already active, you can't resend the activation link`);
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiredAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const password = generateRandomPassword(8);
    const cryptedPassword = await bcrypt.hash(password, config.saltRound);

    const user = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        invitationToken: token,
        invitationExpiredAt: expiredAt,
        password: cryptedPassword
      },
      include: {
        profile: true
      }
    })

    const html = renderToStaticMarkup(
      <InviteUser 
        invitationLink={`${config.appUrl}users/accept-invitation?token=${token}`} 
        firstName={user.profile?.firstName ?? ''} 
        lastName={user.profile?.lastName ?? ''} 
        password={password}
      />
    );

    await sendEmail({ 
      to: user.email, 
      subject: 'Accept Invitation', 
      html, 
    })

    return {
      message: 'Successfully resend the activation link'
    }
  }
}

export default UserService