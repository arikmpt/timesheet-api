import Elysia from 'elysia';

import roleController from '@/controllers/roleController';

export default new Elysia({
  prefix: '/roles',
  detail: {
    tags: ['Role'],
    security: [{ bearerAuth: [] }]
  }
}).use(roleController);
