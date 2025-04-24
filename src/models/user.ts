import { t } from 'elysia';

const profile = t.Object({
  id: t.Number(),
  firstName: t.String(),
  lastName: t.String(),
  countryCode: t.Nullable(t.String()),
  contactNumber: t.Nullable(t.String()),
  birthOfDate: t.Nullable(t.Date()),
  placeOfBirth: t.Nullable(t.String()),
  address: t.Nullable(t.String())
});

const requestCreateUser = t.Object({
  email: t.String({ format: 'email', maxLength: 80 }),
  firstName: t.String(),
  lastName: t.String(),
  roleId: t.Number()
});

const responseCreateUser = t.Object({
  user: t.Object({
    id: t.Number(),
    email: t.String(),
    isActive: t.Boolean(),
    lastLogin: t.Nullable(t.Date()),
    roleId: t.Nullable(t.Number()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    profile: t.Nullable(profile)
  })
});

export { requestCreateUser, responseCreateUser };
