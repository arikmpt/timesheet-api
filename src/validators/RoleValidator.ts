import { t } from 'elysia';

export const rolesValidation = {
	query: t.Object({
		pageSize: t.Optional(t.String()),
		lastId: t.Optional(t.String())
	})
};

export const roleValidation = {
	params: t.Object({
		id: t.Number()
	})
};

export const storeValidation = {
	body: t.Object({
		name: t.String({
			error: 'name is required',
			minLength: 3,
			maxLength: 80
		}),
		permissionIds: t.Array(t.Number(), {
			minItems: 1,
			error: 'minimal have one permission id'
		})
	})
};

export const updateValidation = {
	body: t.Object({
		id: t.Number({
			error: 'id is required'
		}),
		name: t.String({
			error: 'name is required',
			minLength: 3,
			maxLength: 80
		}),
		permissionIds: t.Array(t.Number(), {
			minItems: 1,
			error: 'minimal have one permission id'
		})
	})
};

export const destroyValidation = {
	body: t.Object({
		id: t.Number({
			error: 'id is required'
		})
	})
};
