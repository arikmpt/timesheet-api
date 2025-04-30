import Elysia from 'elysia';

import refController from '@/controllers/refController';

export default new Elysia({
  prefix: '/ref',
  detail: {
    tags: ['Reference']
  }
}).use(refController);
