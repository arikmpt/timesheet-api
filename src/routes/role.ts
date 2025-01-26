import { jwtPlugin, verifyToken } from '@plugins/security';
import { destroySchema, findOneSchema, indexSchema, storeSchema, updateSchema } from '@schemas/role';
import Service from '@services/RoleService';
import { Elysia } from 'elysia';

export default new Elysia({
  prefix: '/roles',
  detail: {
    tags: ['Role']
  }
})
  .use(jwtPlugin)
  .use(verifyToken)
  .derive(({ userToken }) => ({
    service: new Service(userToken)
  }))
  .get('/', ({ query, service }) => service.getAllRoles(query), indexSchema)
  .get('/:id', ({ params: { id }, service }) => service.findRole(id), findOneSchema)
  .post('/', ({ body, service }) => service.storeRole(body), storeSchema)
  .put('/', ({ body, service }) => service.updateRole(body), updateSchema)
  .delete('/:id', ({ params: { id }, service }) => service.destroyRole(id), destroySchema);
