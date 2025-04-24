import Elysia from 'elysia';

import { requestCreateUser, responseCreateUser } from '@/models/user';
import permissionPlugin from '@/plugins/permission';
import UserService from '@/services/userService';

const userController = new Elysia()
  .use(permissionPlugin)
  .post('/', async ({ body, hasPermission }) => UserService.create(body, hasPermission), {
    body: requestCreateUser,
    response: responseCreateUser
  });

export default userController;
