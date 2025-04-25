import Elysia from 'elysia';

import {
  requestCreateUser,
  requestFindUser,
  requestUsers,
  responseCreateUser,
  responseFindUser,
  responseResendActivationLinkUser,
  responseUsers
} from '@/models/user';
import permissionPlugin from '@/plugins/permission';
import UserService from '@/services/userService';

const userController = new Elysia()
  .use(permissionPlugin)
  .get('/', async ({ query, hasPermission }) => UserService.list(query, hasPermission), {
    response: responseUsers,
    query: requestUsers
  })
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
