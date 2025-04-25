import { t } from 'elysia';

const requestLogin = t.Object({
  email: t.String({ format: 'email', maxLength: 80 }),
  password: t.String({ maxLength: 255 })
});

const responseLogin = t.Object({
  token: t.String()
});

const responseProfile = t.Object({
  profile: t.Object({
    id: t.Number(),
    firstName: t.String(),
    lastName: t.String(),
    countryCode: t.Nullable(t.String()),
    contactNumber: t.Nullable(t.String()),
    birthOfDate: t.Nullable(t.Date()),
    placeOfBirth: t.Nullable(t.String()),
    address: t.Nullable(t.String()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    user: t.Object({
      email: t.String()
    })
  })
});

const requestProfile = t.Object({
  id: t.Number(),
  firstName: t.String(),
  lastName: t.String(),
  countryCode: t.Nullable(t.String()),
  contactNumber: t.Nullable(t.String()),
  birthOfDate: t.Nullable(t.Date()),
  placeOfBirth: t.Nullable(t.String()),
  address: t.Nullable(t.String())
});

const requestChangePassword = t.Object({
  oldPassword: t.String({ maxLength: 255, minLength: 8 }),
  newPassword: t.String({ maxLength: 255, minLength: 8 }),
  confirmPassword: t.String({ maxLength: 255, minLength: 8 })
});

const responseChangePassword = t.Object({
  message: t.String()
});

const requestResetPassword = t.Object({
  email: t.String({ format: 'email', maxLength: 80 })
});

const responseResetPassword = responseChangePassword;

const requestToken = t.Object({
  token: t.String()
});

const responseToken = t.Object({
  message: t.String()
});

const requestChangePasswordAfterReset = t.Object({
  token: t.String(),
  newPassword: t.String({ maxLength: 255, minLength: 8 }),
  confirmPassword: t.String({ maxLength: 255, minLength: 8 })
});

const responseChangePasswordAfterReset = t.Object({
  message: t.String()
});

export {
  requestLogin,
  responseLogin,
  responseProfile,
  requestProfile,
  requestChangePassword,
  responseChangePassword,
  requestResetPassword,
  responseResetPassword,
  requestToken,
  responseToken,
  requestChangePasswordAfterReset,
  responseChangePasswordAfterReset
};
