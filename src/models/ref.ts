import { t } from 'elysia';

const responseCountries = t.Object({
  countries: t.Array(
    t.Object({
      name: t.String(),
      dialCode: t.String(),
      code: t.String()
    })
  )
});

export { responseCountries };
