import { t } from 'elysia';

const contractResponse = {
  contract: t.Object({
    id: t.Number(),
    code: t.String(),
    startDate: t.Date(),
    endDate: t.Date(),
    hourlyRate: t.Number(),
    minHourPerWeek: t.Number(),
    maxHourPerWeek: t.Number(),
    createdAt: t.Date(),
    updatedAt: t.Date()
  })
};

export const createContract = {
  body: t.Object({
    contract: t.Object({
      code: t.String(),
      startDate: t.Date(),
      endDate: t.Date(),
      hourlyRate: t.Number(),
      minHourPerWeek: t.Number(),
      maxHourPerWeek: t.Number()
    }),
    user: t.Object({
      email: t.String({ format: 'email' }),
      firstName: t.String(),
      lastName: t.String(),
      contactNumber: t.Optional(t.String()),
      countryCode: t.Optional(t.String()),
      birthOfDate: t.Optional(t.Date()),
      placeOfBirth: t.Optional(t.String()),
      address: t.Optional(t.String())
    }),
    vendor: t.Object({
      id: t.Number()
    })
  }),
  response: t.Object(contractResponse)
};
