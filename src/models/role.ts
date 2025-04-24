import { t } from 'elysia';

const meta = t.Object({
  totalData: t.Number(),
  currentPage: t.Number(),
  hasNextPage: t.Boolean(),
  totalPage: t.Number()
});

const responseRoles = t.Object({
  roles: t.Array(
    t.Object({
      id: t.Number(),
      name: t.String(),
      createdAt: t.Date(),
      updatedAt: t.Date()
    })
  ),
  meta
});

const requestRoles = t.Object({
  page: t.Optional(t.Number()),
  limit: t.Optional(t.Number()),
  search: t.Optional(t.String())
});

const responseRole = t.Object({
  role: t.Object({
    id: t.Number(),
    name: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    permissions: t.Array(
      t.Object({
        id: t.Number(),
        name: t.String()
      })
    )
  })
});

const requestRole = t.Object({
  id: t.Number()
});

const requestCreateRole = t.Object({
  name: t.String(),
  permissions: t.Array(t.Number(), { minItems: 1 })
});

const requestUpdateRole = t.Object({
  id: t.Number(),
  name: t.String(),
  permissions: t.Array(t.Number(), { minItems: 1 })
});

const requestDestroyRole = requestRole;

const responseDestroyRole = t.Object({
  message: t.String()
});

export {
  responseRoles,
  requestRoles,
  responseRole,
  requestRole,
  requestCreateRole,
  requestUpdateRole,
  requestDestroyRole,
  responseDestroyRole
};
