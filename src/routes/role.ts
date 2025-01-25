import { destroySchema, findOneSchema, indexSchema, storeSchema, updateSchema } from '@schemas/role';
import Service from '@services/RoleService';
import { Elysia } from 'elysia';

export default new Elysia({
  prefix: '/roles',
  detail: {
    tags: ['Role']
  }
})
  .decorate('service', new Service())
  .get('/', ({ service, query }) => service.getAllRoles(query), indexSchema)
  .get('/:id', ({ service, params: { id } }) => service.findRole(id), findOneSchema)
  .post('/', ({ service, body }) => service.storeRole(body), storeSchema)
  .put('/', ({ service, body }) => service.updateRole(body), updateSchema)
  .delete('/:id', ({ service, params: { id } }) => service.destroyRole(id), destroySchema);
