import config from '@config';
import { jwt as jwtLibrary } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

export const jwtPlugin = new Elysia().use(
  jwtLibrary({
    name: 'jwt',
    secret: config.auth.jwt.secret,
    exp: config.auth.jwt.expiresIn
  })
);

export const verifyToken = new Elysia({ name: 'decryptId' })
  .use(jwtPlugin)
  .derive({ as: 'global' }, async ({ jwt, headers, request }) => {
    if (request.url.includes('/docs')) {
      return;
    }

    const decryptId = await jwt.verify(headers.authorization);

    if (!decryptId) {
      throw new Error('Invalid token!');
    }

    return {
      decryptId: decryptId.id as number
    };
  });
