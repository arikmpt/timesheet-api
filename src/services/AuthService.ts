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
      select: { id: true, password: true }
    });
    if (!findUser) {
      throw new Error('Invalid Credentials');
    }

    if (await bcrypt.compare(payload.password, findUser.password)) {
      const token = await jwt.sign({
        id: findUser.id
      });
      return {
        token
      };
    }

    throw new Error('Invalid Credentials');
  }
}
