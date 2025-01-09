import { Elysia } from 'elysia';
import roleRoutes from './routes/RoleRoute';
import { errorHandling } from './errorHandling';

const app = new Elysia()
	.get('/', () => 'Hello Elysia')
	.onError(({ error, set }) => {
		const errorHandlingResponse = errorHandling(error);

		set.status = errorHandlingResponse.code;
		return {
			error: errorHandlingResponse.error
		};
	})
	.use(roleRoutes)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
