import config from '@config';
import swagger from '@elysiajs/swagger';
import roleRoutes from '@routes/role';
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
  .get('/', () => 'Hello Elysia')
  .use(roleRoutes)
  .use(vendorRoutes)
  .listen(config.app.port, () => {
    console.log(`Environment: ${config.app.env}`);
    console.log(`Bun (🍔) API Starter is running at ${config.app.host}:${config.app.port}`);
  });
