import { jwtPlugin, verifyToken } from '@plugins/security';
import { createContract } from '@schemas/contract';
import Service from '@services/ContractService';
import { Elysia } from 'elysia';

const service = new Service();

export default new Elysia({
  prefix: '/contracts',
  detail: {
    tags: ['Contract']
  }
})
  .use(jwtPlugin)
  .use(verifyToken)
  .post('/', ({ body }) => service.createContract(body), createContract);
