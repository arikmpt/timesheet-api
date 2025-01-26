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
  .get('/profile', ({ decryptId }) => service.profile(decryptId), profileResponseSchema)
  .put('/profile', ({ body, decryptId }) => service.updateProfile(body, decryptId), updateProfileSchema)
  .put('/change-password', ({ body, decryptId }) => service.changePassword(body, decryptId), changePasswordSchema);
