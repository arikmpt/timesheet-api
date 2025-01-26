import { jwtPlugin, verifyToken } from '@plugins/security';
import { changePasswordSchema, profileResponseSchema, updateProfileSchema } from '@schemas/user';
import Service from '@services/UserService';
import { Elysia } from 'elysia';

const service = new Service();

export default new Elysia({
  prefix: '/user',
  detail: {
    tags: ['User']
  }
})
  .use(jwtPlugin)
  .use(verifyToken)
  .get('/profile', ({ userToken }) => service.profile(userToken?.id), profileResponseSchema)
  .put('/profile', ({ body, userToken }) => service.updateProfile(body, userToken?.id), updateProfileSchema)
  .put('/change-password', ({ body, userToken }) => service.changePassword(body, userToken?.id), changePasswordSchema);
