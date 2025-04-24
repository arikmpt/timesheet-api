import { Elysia } from 'elysia';

import { AuthorizationError } from '@/exceptions/AuthorizationError';

import jwtPlugin from './jwt';

const authorizationPlugin = new Elysia({ name: 'authorizationContext' })
  .use(jwtPlugin)
  .derive({ as: 'global' }, async ({ jwt, headers, request }) => {
    if (
      request.url.includes('/swagger') ||
      request.url.includes('/auth/login') ||
      request.url.includes('/auth/reset-password')
    ) {
      return;
    }

    const authHeader = headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthorizationError('Missing or invalid Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    const verifyToken = await jwt.verify(token);
    if (!verifyToken) {
      throw new AuthorizationError('Unauthenticated');
    }

    const context = {
      id: verifyToken.id as number,
      email: verifyToken.email as string
    };

    return {
      authorizationContext: context
    };
  });

export default authorizationPlugin;
