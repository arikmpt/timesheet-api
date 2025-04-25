import Elysia from 'elysia';

import {
  requestCreateUser,
  requestFindUser,
  responseCreateUser,
  responseResendActivationLinkUser
} from '@/models/user';
import permissionPlugin from '@/plugins/permission';
import UserService from '@/services/userService';

const userController = new Elysia()
  .use(permissionPlugin)
  .post('/', async ({ body, hasPermission }) => UserService.create(body, hasPermission), {
    body: requestCreateUser,
    response: responseCreateUser
  })
  .post(
    '/resend-activation',
    async ({ body, hasPermission }) => UserService.resendActivationLink(body.id, hasPermission),
    {
      body: requestFindUser,
      response: responseResendActivationLinkUser
    }
  );

export default userController;
