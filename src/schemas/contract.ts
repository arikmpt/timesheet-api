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

const contractsResponse = {
  contracts: t.Array(
    t.Object({
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
  ),
  hasNextPage: t.Boolean()
};

export const indexSchema = {
  query: t.Object({
    pageSize: t.Optional(t.String()),
    lastId: t.Optional(t.String()),
    keyword: t.Optional(t.String())
  }),
  response: t.Object(contractsResponse)
};

export const createContract = {
  body: t.Object({
    code: t.String(),
    startDate: t.Date(),
    endDate: t.Date(),
    hourlyRate: t.Number(),
    minHourPerWeek: t.Number(),
    maxHourPerWeek: t.Number()
  }),
  response: t.Object(contractResponse)
};

export const updateContract = {
  body: t.Object({
    id: t.Number(),
    code: t.String(),
    startDate: t.Date(),
    endDate: t.Date(),
    hourlyRate: t.Number(),
    minHourPerWeek: t.Number(),
    maxHourPerWeek: t.Number()
  }),
  response: t.Object(contractResponse)
};

export const findOneContract = {
  params: t.Object({
    id: t.Number()
  }),
  response: t.Object(contractResponse)
};

export const destroyContract = {
  params: t.Object({
    id: t.Number()
  })
};

export const assignContract = {
  body: t.Object({
    id: t.Number(),
    employeeId: t.Number(),
    vendorId: t.Number()
  }),
  response: t.Object({
    message: t.String()
  })
};
