import { Prisma } from '@prisma/client';
import { ValidationError } from 'elysia';

export const errorHandling = <T>(error: T) => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		switch (error.code) {
			case 'P2002':
				return {
					code: 409,
					error: `${error.meta?.modelName ?? 'Record'} already taken`
				};
			case 'P2025':
				return {
					code: 404,
					error: `${error.meta?.modelName ?? 'Record'} not found`
				};
			default:
				return {
					code: 500,
					error: 'An unknown Prisma error occurred'
				};
		}
	}
	if (error instanceof Prisma.PrismaClientValidationError) {
		return {
			code: 400,
			error: 'Validation error occurred'
		};
	}
	if (error instanceof Prisma.PrismaClientRustPanicError) {
		return {
			code: 500,
			error: 'Prisma encountered a critical error'
		};
	}
	if (error instanceof ValidationError) {
		if ('schema' in error.all[0]) {
			return {
				code: 422,
				error: [error.all[0].schema]
			};
		}

		return {
			code: 409,
			error: 'Validation exception'
		};
	}

	return {
		code: 500,
		error: 'An unexpected error occurred'
	};
};
