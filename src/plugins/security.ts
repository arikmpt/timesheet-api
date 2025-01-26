import config from '@config';
import { jwt as jwtLibrary } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

export interface TokenData {
  id: number;
  role: string;
  permissions: Permission[];
}

interface Permission {
  name: string;
}

interface RawPermission {
  permission: {
    name: string;
  };
}

export const jwtPlugin = new Elysia().use(
  jwtLibrary({
    name: 'jwt',
    secret: config.auth.jwt.secret,
    exp: config.auth.jwt.expiresIn
  })
);

export const verifyToken = new Elysia({ name: 'userToken' })
  .use(jwtPlugin)
  .derive({ as: 'global' }, async ({ jwt, headers, request }) => {
    if (request.url.includes('/docs')) {
      return;
    }

    const userToken = await jwt.verify(headers.authorization);
    if (!userToken) {
      throw new Error('Invalid token!');
    }
    const userPermissions = JSON.parse(userToken.permissions as string) as RawPermission[];

    const responseToken: TokenData = {
      id: userToken.id as number,
      role: userToken.role as string,
      permissions: userPermissions.flatMap((permission) => ({
        name: permission.permission.name
      }))
    };

    return {
      userToken: responseToken
    };
  });
