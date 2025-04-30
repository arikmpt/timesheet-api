import { PrismaClient } from '@prisma/client';
import { Elysia } from 'elysia';

import { AuthorizationError } from '@/exceptions/AuthorizationError';

import authorizationPlugin from './authorization';
import jwtPlugin from './jwt';

const permissionPlugin = new Elysia({ name: 'permissionContext' })
  .use(jwtPlugin)
  .use(authorizationPlugin)
  .derive({ as: 'global' }, async ({ authorizationContext, request }) => {
    if (
      request.url.includes('/swagger') ||
      request.url.includes('/auth/login') ||
      request.url.includes('/auth/login') ||
      request.url.includes('/ref/countries')
    ) {
      return;
    }
    if (!authorizationContext?.id) {
      throw new AuthorizationError('Invalid token data');
    }

    const prisma = new PrismaClient();
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: authorizationContext.id
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

    const permissions: string[] = user.role?.permissions?.map((data) => data.permission.name) || [];

    const hasPermission = (name: string) => {
      return permissions.includes(name);
    };

    return {
      hasPermission
    };
  });

export default permissionPlugin;
