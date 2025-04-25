import Elysia from 'elysia';

import {
  requestCreateUser,
  requestFindUser,
  responseCreateUser,
  responseFindUser,
  responseResendActivationLinkUser
} from '@/models/user';
import permissionPlugin from '@/plugins/permission';
import UserService from '@/services/userService';

const userController = new Elysia()
  .use(permissionPlugin)
  .post('/', ({ body, hasPermission }) => UserService.create(body, hasPermission), {
    body: requestCreateUser,
    response: responseCreateUser
  })
  .post('/resend-activation', ({ body, hasPermission }) => UserService.resendActivationLink(body.id, hasPermission), {
    body: requestFindUser,
    response: responseResendActivationLinkUser
  })
  .get('/:id', ({ params: { id }, hasPermission }) => UserService.find(id, hasPermission), {
    params: requestFindUser,
    response: responseFindUser
  });

export default userController;
