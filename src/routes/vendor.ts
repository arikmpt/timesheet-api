import { destroySchema, findOneSchema, indexSchema, storeSchema, updateSchema } from '@schemas/vendor';
import Service from '@services/VendorService';
import { Elysia } from 'elysia';

export default new Elysia({
  prefix: '/vendors',
  detail: {
    tags: ['Vendor']
  }
})
  .decorate('service', new Service())
  .get('/', ({ service, query }) => service.getAllVendors(query), indexSchema)
  .get('/:id', ({ service, params: { id } }) => service.getVendor(id), findOneSchema)
  .post('/', ({ service, body }) => service.createVendor(body), storeSchema)
  .put('/', ({ service, body }) => service.updateVendor(body), updateSchema)
  .delete('/:id', ({ service, params: { id } }) => service.destroyVendor(id), destroySchema);
