import Elysia from 'elysia';

import {
  requestChangePassword,
  requestChangePasswordAfterReset,
  requestLogin,
  requestProfile,
  requestResetPassword,
  requestToken,
  responseChangePassword,
  responseLogin,
  responseProfile,
  responseResetPassword,
  responseToken
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
  })
  .post('/check-invite-token', async ({ body }) => await AuthService.checkInvitationToken(body.token), {
    body: requestToken,
    response: responseToken
  })
  .post('/check-reset-token', async ({ body }) => await AuthService.checkResetToken(body.token), {
    body: requestToken,
    response: responseToken
  })
  .post('/change-password-token', async ({ body }) => await AuthService.changePasswordAfterReset(body), {
    body: requestChangePasswordAfterReset,
    response: responseChangePassword
  });

export default authController;
