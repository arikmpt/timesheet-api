import UnauthorizedError from '@exceptions/UnauthorizedError';
import bcrypt from 'bcrypt';

import prisma from './prisma';

interface LoginPayload {
  email: string;
  password: string;
}

interface JWTPayload {
  readonly sign: (morePayload: Record<string, string | number>) => Promise<string>;
  readonly verify: (jwt?: string | undefined) => Promise<false | Record<string, string | number>>;
}

export default class AuthService {
  async login(payload: LoginPayload, jwt: JWTPayload) {
    const findUser = await prisma.user.findUnique({
      where: {
        email: payload.email
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
    if (!findUser) {
      throw new UnauthorizedError('Invalid Credentials');
    }

    if (await bcrypt.compare(payload.password, findUser.password)) {
      const token = await jwt.sign({
        id: findUser.id,
        role: findUser.role.name.toLocaleLowerCase(),
        permissions: JSON.stringify(findUser.role.permissions)
      });
      return {
        token
      };
    }

    throw new UnauthorizedError('Invalid Credentials');
  }
}
