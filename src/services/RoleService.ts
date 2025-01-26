import prisma from './prisma';

interface Create {
  name: string;
  permissionIds: number[];
}

interface Update extends Create {
  id: number;
}

interface Query {
  pageSize?: string;
  lastId?: string;
  keyword?: string;
}

export default class RoleService {
  async getAllRoles(query: Query) {
    const lastId = query.lastId ? parseInt(query.lastId as string) : null;
    const pageSize = parseInt(query.pageSize as string) || 10;
    const take = pageSize > 0 ? pageSize + 1 : 10;

    const searchCondition = query.keyword
      ? {
          OR: [{ name: { contains: query.keyword } }]
        }
      : {};

    const roles = await prisma.role.findMany({
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
    };
  }

  async findRole(id: number) {
    const role = await prisma.role.findFirstOrThrow({
      where: {
        id
      },
      include: {
        permissions: {
          include: {
            permission: {
              select: {
                name: true,
                id: true
              }
            }
          }
        }
      }
    });

    return {
      role
    };
  }

  async storeRole(payload: Create) {
    return prisma.$transaction(async (tx) => {
      const role = await tx.role.create({
        data: {
          name: payload.name,
          isSystem: false
        }
      });

      await tx.rolePermission.createMany({
        data: payload.permissionIds.map((id) => ({
          roleId: role.id,
          permissionId: id
        }))
      });

      return {
        role
      };
    });
  }

  async updateRole(payload: Update) {
    return prisma.$transaction(async (tx) => {
      const role = await tx.role.update({
        where: {
          id: payload.id
        },
        data: {
          name: payload.name,
          isSystem: false
        }
      });

      await tx.rolePermission.deleteMany({
        where: {
          roleId: payload.id
        }
      });

      await tx.rolePermission.createMany({
        data: payload.permissionIds.map((id) => ({
          roleId: role.id,
          permissionId: id
        }))
      });

      return {
        role
      };
    });
  }

  async destroyRole(id: number) {
    return prisma.$transaction(async (tx) => {
      const role = await tx.role.findFirstOrThrow({
        where: {
          id,
          isSystem: false
        }
      });

      await tx.rolePermission.deleteMany({
        where: {
          roleId: role.id
        }
      });
      await tx.role.delete({
        where: {
          id: role.id
        }
      });
      return null;
    });
  }
}
