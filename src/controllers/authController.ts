import Elysia from 'elysia';

import {
  requestChangePassword,
  requestLogin,
  requestProfile,
  requestResetPassword,
  responseChangePassword,
  responseLogin,
  responseProfile,
  responseResetPassword
} from '@/models/auth';
import authorizationPlugin from '@/plugins/authorization';
import jwtPlugin from '@/plugins/jwt';
import AuthService from '@/services/authService';

const authController = new Elysia()
  .use(jwtPlugin)
  .use(authorizationPlugin)
  .post(
    '/login',
    async ({ jwt, body }) => {
      const service = await AuthService.login(body.email, body.password);
      const token = await jwt.sign({
        id: service.id,
        email: service.email,
        permissions: JSON.stringify(service.permissions)
      });
      return {
        token
      };
    },
    {
      body: requestLogin,
      response: responseLogin
    }
  )
  .get('/profile', ({ authorizationContext }) => AuthService.profile(authorizationContext?.id), {
    response: responseProfile,
    detail: {
      security: [{ bearerAuth: [] }]
    }
  })
  .put('/profile', async ({ body }) => await AuthService.updateProfile(body), {
    body: requestProfile,
    response: responseProfile,
    detail: {
      security: [{ bearerAuth: [] }]
    }
  })
  .put(
    '/change-password',
    async ({ body, authorizationContext }) => {
      const payload = {
        id: authorizationContext?.id,
        ...body
      };

      return await AuthService.changePassword(payload);
    },
    {
      body: requestChangePassword,
      response: responseChangePassword,
      detail: {
        security: [{ bearerAuth: [] }]
      }
    }
  )
  .post('/reset-password', async ({ body }) => await AuthService.resetPassword(body.email), {
    body: requestResetPassword,
    response: responseResetPassword
  });

export default authController;
