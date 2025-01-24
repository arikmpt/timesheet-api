import { t } from 'elysia';

const arrResponse = {
  vendors: t.Array(
    t.Object({
      id: t.Number(),
      name: t.String(),
      address: t.String(),
      createdAt: t.Date(),
      updatedAt: t.Date()
    })
  ),
  hasNextPage: t.Boolean()
};

const singleResponse = {
  vendor: t.Object({
    id: t.Number(),
    name: t.String(),
    address: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date()
  })
};

export const indexSchema = {
  query: t.Object({
    pageSize: t.Optional(t.String()),
    lastId: t.Optional(t.String()),
    keyword: t.Optional(t.String())
  }),
  response: t.Object(arrResponse)
};

export const findOneSchema = {
  params: t.Object({
    id: t.Number()
  }),
  response: t.Object(singleResponse)
};

export const destroySchema = {
  params: t.Object({
    id: t.Number()
  })
};

export const storeSchema = {
  body: t.Object({
    name: t.String({
      error: 'name is required',
      minLength: 3,
      maxLength: 80
    }),
    address: t.String({
      error: 'address is required',
      minLength: 3
    })
  }),
  response: t.Object(singleResponse)
};

export const updateSchema = {
  body: t.Object({
    id: t.Number({
      error: 'id is required'
    }),
    name: t.String({
      error: 'name is required',
      minLength: 3,
      maxLength: 80
    }),
    address: t.String({
      error: 'address is required',
      minLength: 3
    })
  }),
  response: t.Object(singleResponse)
};
