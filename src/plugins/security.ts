import config from '@config';
import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

export default new Elysia().use(
  jwt({
    name: 'jwt',
    secret: config.auth.jwt.secret,
    exp: config.auth.jwt.expiresIn
  })
);
