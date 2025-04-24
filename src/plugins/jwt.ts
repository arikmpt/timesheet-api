import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

import config from '@/config';

const jwtPlugin = new Elysia().use(
  jwt({
    name: 'jwt',
    secret: config.jwtSecret as string,
    exp: '24h'
  })
);

export default jwtPlugin;
