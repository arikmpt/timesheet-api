import { t } from 'elysia';

const arrResponse = {
  roles: t.Array(
    t.Object({
      id: t.Number(),
      name: t.String(),
      createdAt: t.Date(),
      updatedAt: t.Date()
    })
  ),
  hasNextPage: t.Boolean()
};

const singleResponse = {
  role: t.Object({
    id: t.Number(),
    name: t.String(),
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
  response: t.Object({
    role: t.Object({
      id: t.Number(),
      name: t.String(),
      createdAt: t.Date(),
      updatedAt: t.Date(),
      permissions: t.Optional(
        t.Array(
          t.Object({
            roleId: t.Number(),
            permissionId: t.Number(),
            permission: t.Optional(
              t.Object({
                id: t.Number(),
                name: t.String()
              })
            )
          })
        )
      )
    })
  })
};

export const storeSchema = {
  body: t.Object({
    name: t.String({
      error: 'name is required',
      minLength: 3,
      maxLength: 80
    }),
    permissionIds: t.Array(t.Number(), {
      minItems: 1,
      error: 'minimal have one permission id'
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
    permissionIds: t.Array(t.Number(), {
      minItems: 1,
      error: 'minimal have one permission id'
    })
  }),
  response: t.Object(singleResponse)
};

export const destroySchema = {
  params: t.Object({
    id: t.Number()
  })
};
