import { Elysia } from 'elysia';
import roleRoutes from './routes/RoleRoute';
import { errorHandling } from './errorHandling';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
	.use(
		swagger({
			documentation: {
				info: {
					title: 'Timesheet Api Documentation',
					version: '1.0.0'
				},
				tags: [{ name: 'Role', description: 'Role endpoints' }]
			}
		})
	)
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
