import Elysia from 'elysia';

import userController from '@/controllers/userController';

export default new Elysia({
  prefix: '/users',
  detail: {
    tags: ['User'],
    security: [{ bearerAuth: [] }]
  }
}).use(userController);
