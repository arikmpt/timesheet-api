import UniqueError from '@exceptions/UniqueError';
import { TokenData } from '@plugins/security';
import { CREATE_ROLE, DESTROY_ROLE, INDEX_ROLE, READ_ROLE, UPDATE_ROLE } from 'contants';

import AuthorizationService from './AuthorizationService';
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

export default class RoleService extends AuthorizationService {
  constructor(auth?: TokenData) {
    super(auth);
  }

  async getAllRoles(query: Query) {
    this.checkPermission(INDEX_ROLE);

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
    this.checkPermission(READ_ROLE);

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
    this.checkPermission(CREATE_ROLE);

    const findExist = await prisma.role.findFirst({
      where: {
        name: payload.name
      }
    });

    if (findExist) {
      throw new UniqueError(`Role name already exists`);
    }

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
    this.checkPermission(UPDATE_ROLE);

    const findExist = await prisma.role.findFirst({
      where: {
        name: payload.name,
        AND: [
          {
            NOT: {
              id: payload.id
            }
          }
        ]
      }
    });

    if (findExist) {
      throw new UniqueError(`Role name already exists`);
    }

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
    this.checkPermission(DESTROY_ROLE);

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
