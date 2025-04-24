import { swagger } from '@elysiajs/swagger';
import { Prisma } from '@prisma/client';
import { Elysia } from 'elysia';
import { ValidationError } from 'elysia';

import { AuthorizationError } from './exceptions/AuthorizationError';
import authRoute from './routes/authRoute';
import roleRoute from './routes/roleRoute';

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Timesheet API Documentation',
          version: '1.0.0'
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        }
      }
    })
  )
  .onError(({ error, set }) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      set.status = 400;

      if (error.code === 'P2002') {
        set.status = 409;
        return { error: `Duplicate field: ` };
      }

      if (error.code === 'P2025') {
        set.status = 404;
        return { error: 'Record not found' };
      }

      return { error: `Prisma error: ${error.message}` };
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      set.status = 400;
      return { error: 'Validation error', detail: error.message };
    }

    if (error instanceof AuthorizationError) {
      set.status = 403;
      return {
        error: error.message
      };
    }

    if (error instanceof ValidationError) {
      set.status = 409;
      const groupedErrors: Record<
        string,
        {
          messages: string[];
        }
      > = {};
      for (const e of error.all) {
        if ('path' in e) {
          const key = e.path.replace('/', '');

          if (!groupedErrors[key]) {
            groupedErrors[key] = {
              messages: []
            };
          }

          groupedErrors[key].messages.push(e.message);
        }
      }

      const errors = Object.fromEntries(Object.entries(groupedErrors).map(([key, val]) => [key, val.messages]));

      return {
        message: 'Validation failed',
        errors
      };
    }

    if (error instanceof Error) {
      set.status = 500;
      return {
        error: error.message
      };
    }
    return {
      error
    };
  })
  .use(authRoute)
  .use(roleRoute)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
