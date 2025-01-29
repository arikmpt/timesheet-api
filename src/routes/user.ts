import { jwtPlugin, verifyToken } from '@plugins/security';
import { assignToVendorSchema, changePasswordSchema, profileResponseSchema, updateProfileSchema } from '@schemas/user';
import Service from '@services/UserService';
import { Elysia } from 'elysia';

export default new Elysia({
  prefix: '/user',
  detail: {
    tags: ['User']
  }
})
  .use(jwtPlugin)
  .use(verifyToken)
  .derive(({ userToken }) => ({
    service: new Service(userToken)
  }))
  .get('/profile', ({ userToken, service }) => service.profile(userToken?.id), profileResponseSchema)
  .put('/profile', ({ body, userToken, service }) => service.updateProfile(body, userToken?.id), updateProfileSchema)
  .put(
    '/change-password',
    ({ body, userToken, service }) => service.changePassword(body, userToken?.id),
    changePasswordSchema
  )
  .put('/assign-to-vendor', ({ body, service }) => service.assignUserToVendor(body), assignToVendorSchema)
  .put('/unassign-from-vendor', ({ body, service }) => service.unassignUserFromVendor(body), assignToVendorSchema);
