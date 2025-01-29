import { jwtPlugin, verifyToken } from '@plugins/security';
import {
  assignContract,
  createContract,
  destroyContract,
  findOneContract,
  indexSchema,
  updateContract
} from '@schemas/contract';
import Service from '@services/ContractService';
import { Elysia } from 'elysia';

export default new Elysia({
  prefix: '/contracts',
  detail: {
    tags: ['Contract']
  }
})
  .use(jwtPlugin)
  .use(verifyToken)
  .derive(({ userToken }) => ({
    service: new Service(userToken)
  }))
  .get('/', ({ query, service }) => service.getContracts(query), indexSchema)
  .get('/:id', ({ params: { id }, service }) => service.findContract(id), findOneContract)
  .post('/', ({ body, service }) => service.createContract(body), createContract)
  .put('/', ({ body, service }) => service.updateContract(body), updateContract)
  .delete('/', ({ params: { id }, service }) => service.destroyContract(id), destroyContract)
  .put('/assign-contract', ({ body, service }) => service.assignContract(body), assignContract)
  .put('/unassign-contract', ({ body, service }) => service.unassignContract(body), assignContract);
