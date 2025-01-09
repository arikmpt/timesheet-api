import { Elysia } from 'elysia';
import {
	find as findRole,
	get as getRoles,
	store as storeRoles,
	update as updateRoles,
	destroy as destroyRoles
} from '../controllers/RoleController';
import {
	storeValidation as storeRoleValidation,
	updateValidation as updateRoleValidation,
	destroyValidation as destroyRoleValidation
} from '../validators/RoleValidator';

const app = new Elysia().group('/roles', (app) =>
	app
		.get('/', getRoles)
		.get('/:id', findRole)
		.post('/', storeRoles, storeRoleValidation)
		.put('/', updateRoles, updateRoleValidation)
		.delete('/', destroyRoles, destroyRoleValidation)
);

export default app;
