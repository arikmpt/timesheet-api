import security from '@plugins/security';
import { loginSchema } from '@schemas/auth';
import Service from '@services/AuthService';
import { Elysia } from 'elysia';
const service = new Service();

export default new Elysia({
  prefix: '/auth',
  detail: {
    tags: ['Auth']
  }
})
  .use(security)
  .post('/login', ({ jwt, body }) => service.login(body, jwt), loginSchema);
