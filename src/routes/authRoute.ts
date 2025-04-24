import Elysia from 'elysia';

import authController from '@/controllers/authController';

export default new Elysia({
  prefix: '/auth',
  detail: {
    tags: ['Auth']
  }
}).use(authController);
