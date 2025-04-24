import Elysia from 'elysia';

import {
  requestCreateRole,
  requestDestroyRole,
  requestRole,
  requestRoles,
  requestUpdateRole,
  responseDestroyRole,
  responseRole,
  responseRoles
} from '@/models/role';
import permissionPlugin from '@/plugins/permission';
import RoleService from '@/services/roleService';

const roleController = new Elysia()
  .use(permissionPlugin)
  .get('/', async ({ query, hasPermission }) => RoleService.list(query, hasPermission), {
    response: responseRoles,
    query: requestRoles
  })
  .get('/:id', ({ params: { id }, hasPermission }) => RoleService.find(id, hasPermission), {
    params: requestRole,
    response: responseRole
  })
  .post('/', ({ body, hasPermission }) => RoleService.create(body, hasPermission), {
    body: requestCreateRole,
    response: responseRole
  })
  .put('/', ({ body, hasPermission }) => RoleService.update(body, hasPermission), {
    body: requestUpdateRole,
    response: responseRole
  })
  .delete('/', ({ body, hasPermission }) => RoleService.destroy(body.id, hasPermission), {
    body: requestDestroyRole,
    response: responseDestroyRole
  });

export default roleController;
