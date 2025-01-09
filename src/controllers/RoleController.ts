import { PrismaClient } from '@prisma/client';
import { Context } from 'elysia/dist/context';

const db = new PrismaClient();

interface Create {
  name: string;
  permissionIds: number[];
}

interface Update extends Create {
  id: number;
}

interface Destroy {
  id: number;
}

export const find = async ({ params: { id }}: Context) => {
	const role = await db.role.findFirstOrThrow({
    where: {
      id: parseInt(id)
    },
    include: {
      permissions: {
        include: {
          permission: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    role
  };
};

export const get = async ({ query }: Context) => {
  const lastId = query.lastId ? parseInt(query.lastId as string) : null;
  const pageSize = parseInt(query.pageSize as string) || 10;
  const take = pageSize > 0 ? pageSize + 1 : 10;

  const searchCondition = query.keyword
    ? {
        OR: [
          { name: { contains: query.keyword } },
        ],
      }
    : {};

  const roles = await db.role.findMany({
    take,
    where: {
      ...(lastId ? { id: { lt: lastId } } : {}),
      ...searchCondition
    },
    orderBy: {
      id: 'desc'
    }
  });
  
  return {
    roles: roles.slice(0, pageSize),
    hasNextPage: roles.length === take
  }
}

export const store = async ({ set, body }: Context) => {
  const request = body as Create;
  set.status = 201;
  return db.$transaction(async (tx) => {
    const role = await tx.role.create({
      data: {
        name: request.name,
        isSystem: false
      }
    });

    await tx.rolePermission.createMany({
      data: request.permissionIds.map((id) => ({ 
        roleId: role.id, 
        permissionId: id 
      }))
    });

    return {
      role
    }
  });
}

export const update = async ({ body }: Context) => {
  const request = body as Update;

  return db.$transaction(async (tx) => {
    const role = await tx.role.update({
      where: {
        id: request.id
      },
      data: {
        name: request.name,
        isSystem: false
      }
    });

    await tx.rolePermission.deleteMany({
      where: {
        roleId: request.id
      }
    });

    await tx.rolePermission.createMany({
      data: request.permissionIds.map((id) => ({ 
        roleId: role.id, 
        permissionId: id 
      }))
    });

    return {
      role
    }
  });
}

export const destroy = async ({ set, body }: Context) => {
  const request = body as Destroy;
  set.status = 204;
  return db.$transaction(async (tx) => {
    await tx.rolePermission.deleteMany({
      where: {
        roleId: request.id
      }
    });
    await tx.role.delete({
      where: {
        id: request.id
      }
    });
    return null
  });
}
