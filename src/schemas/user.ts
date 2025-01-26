import { t } from 'elysia';

export const profileResponseSchema = {
  response: t.Object({
    profile: t.Object({
      firstName: t.String(),
      lastName: t.String(),
      contactNumber: t.Nullable(t.String()),
      countryCode: t.Nullable(t.String()),
      birthOfDate: t.Nullable(t.Date()),
      placeOfBirth: t.Nullable(t.String()),
      address: t.Nullable(t.String())
    })
  })
};

export const updateProfileSchema = {
  body: t.Object({
    firstName: t.String(),
    lastName: t.String(),
    contactNumber: t.String(),
    countryCode: t.String(),
    birthOfDate: t.Date(),
    placeOfBirth: t.String(),
    address: t.String()
  }),
  profileResponseSchema
};

export const changePasswordSchema = {
  body: t.Object({
    password: t.String({ maxLength: 256 }),
    newPassword: t.String({ maxLength: 256 })
  }),
  response: t.Object({
    message: t.String()
  })
};
