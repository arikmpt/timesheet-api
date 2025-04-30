import Elysia from 'elysia';

import { responseCountries } from '@/models/ref';
import RefService from '@/services/refService';

const refController = new Elysia().get('/countries', () => RefService.countryCodes(), {
  response: responseCountries
});

export default refController;
