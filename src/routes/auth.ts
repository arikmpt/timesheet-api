import { jwtPlugin } from '@plugins/security';
import { loginSchema } from '@schemas/auth';
import Service from '@services/AuthService';
import { Elysia } from 'elysia';

export default new Elysia({
  prefix: '/auth',
  detail: {
    tags: ['Auth']
  }
})
  .use(jwtPlugin)
  .decorate('service', new Service())
  .post('/login', ({ jwt, body, service }) => service.login(body, jwt), loginSchema);
