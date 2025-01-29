import Elysia from 'elysia';

export default new Elysia().onError(({ set }) => {
  set.status = 400;
  return {
    message: 'Server Error!',
    code: 500
  };
});
