import Elysia, { t } from 'elysia';

export const loginSchemaModel = new Elysia().model({
  auth: t.Object({
    email: t.String({ format: 'email', maxLength: 256 }),
    password: t.String({ maxLength: 256 })
  }),
  response: t.Object({
    token: t.String()
  })
});

export const loginResponseSchema = t.Object({
  token: t.String()
});

export const loginSchema = {
  body: t.Object({
    email: t.String({ format: 'email', maxLength: 256 }),
    password: t.String({ maxLength: 256 })
  }),
  response: t.Object({
    token: t.String()
  })
};
