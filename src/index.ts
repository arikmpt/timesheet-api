import config from '@config';
import swagger from '@elysiajs/swagger';
import { errorHandling } from '@exceptions/handling';
import errorPlugin from '@plugins/error';
import authRoutes from '@routes/auth';
import contractRoutes from '@routes/contract';
import roleRoutes from '@routes/role';
import userRoutes from '@routes/user';
import vendorRoutes from '@routes/vendor';
import { Elysia } from 'elysia';

export const app = new Elysia()
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: {
          title: 'Timesheet Api Docs',
          version: config.app.version
        }
      }
    })
  )
  .onError(({ set, error }) => {
    const errorHandlingResponse = errorHandling(error);

    set.status = errorHandlingResponse.code;
    return {
      message: errorHandlingResponse.message
    };
  })
  .use(errorPlugin)
  .use(authRoutes)
  .use(userRoutes)
  .use(roleRoutes)
  .use(vendorRoutes)
  .use(contractRoutes)
  .listen(config.app.port, () => {
    console.log(`Environment: ${config.app.env}`);
    console.log(`Bun (🍔) API Starter is running at ${config.app.host}:${config.app.port}`);
  });
