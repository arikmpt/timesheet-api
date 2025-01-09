import { t } from 'elysia';

export const storeValidation = {
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
  })
};

export const updateValidation = {
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
  })
};

export const destroyValidation = {
  body: t.Object({
    id: t.Number({
      error: 'id is required'
    }),
  })
}