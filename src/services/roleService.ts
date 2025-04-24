import { Prisma, PrismaClient } from '@prisma/client';

import { CREATE_ROLE, EDIT_ROLE, FIND_ROLE, INDEX_ROLE, REMOVE_ROLE } from '@/constant';
import { AuthorizationError } from '@/exceptions/AuthorizationError';
import { HasPermission } from '@/types';

interface RoleListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface CreateRoleRequest {
  name: string;
  permissions: number[];
}

interface UpdateRoleRequest extends CreateRoleRequest {
  id: number;
}

abstract class RoleService {
  private static prisma = new PrismaClient();

  static async list(query: RoleListQueryParams, hasPermission?: HasPermission) {
    if (!hasPermission?.(INDEX_ROLE)) {
      throw new AuthorizationError(`You don't have permission to this resource`);
    }

    const { page = 1, limit = 10, search } = query;

    const whereClause = search
      ? {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive
          }
        }
      : {};

    const [roles, total] = await Promise.all([
      this.prisma.role.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit
      }),
      this.prisma.role.count({
        where: whereClause
      })
    ]);

    const totalPage = Math.ceil(total / limit);
    const hasNextPage = page < totalPage;

    return {
      roles,
      meta: {
        totalData: total,
        currentPage: page,
        hasNextPage,
        totalPage
      }
    };
  }

  static async find(id?: number, hasPermission?: HasPermission) {
    if (!hasPermission?.(FIND_ROLE)) {
      throw new AuthorizationError(`You don't have permission to this resource`);
    }

    if (isNaN(Number(id))) {
      throw new AuthorizationError(`Invalid parameter id`);
    }

    const role = await this.prisma.role.findUniqueOrThrow({
      where: {
        id: Number(id)
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
      role: {
        ...role,
        permissions: role.permissions.map((permission) => ({
          id: permission.permission.id,
          name: permission.permission.name
        }))
      }
    };
  }

  static async create(body: CreateRoleRequest, hasPermission?: HasPermission) {
    if (!hasPermission?.(CREATE_ROLE)) {
      throw new AuthorizationError(`You don't have permission to this resource`);
    }

    const exists = await this.prisma.role.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: Prisma.QueryMode.insensitive
        }
      }
    });

    if (exists) {
      throw new Error(`Role with name ${body.name} already exists`);
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const role = await tx.role.create({
        data: {
          name: body.name
        }
      });

      const permissions = await tx.permission.findMany({
        where: {
          id: {
            in: body.permissions
          }
        }
      });

      if (permissions.length !== body.permissions.length) {
        const foundIds = permissions.map((p) => p.id);
        const notFound = body.permissions.filter((id) => !foundIds.includes(id));
        throw new Error(`Cannot find permission(s) with id: ${notFound.join(', ')}`);
      }

      await tx.rolePermission.createMany({
        data: body.permissions.map((permissionId) => ({
          roleId: role.id,
          permissionId
        }))
      });

      const roleWithPermissions = await tx.role.findUnique({
        where: { id: role.id },
        include: {
          permissions: {
            include: {
              permission: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      });

      return roleWithPermissions;
    });

    if (!result) {
      throw new Error('Failed to receive result');
    }

    return {
      role: {
        ...result,
        permissions:
          result.permissions.map((permission) => ({
            id: permission.permission.id,
            name: permission.permission.name
          })) ?? []
      }
    };
  }

  static async update(body: UpdateRoleRequest, hasPermission?: HasPermission) {
    if (!hasPermission?.(EDIT_ROLE)) {
      throw new AuthorizationError(`You don't have permission to this resource`);
    }

    const { id, name, permissions } = body;

    await this.prisma.role.findUniqueOrThrow({
      where: { id }
    });

    const duplicate = await this.prisma.role.findFirst({
      where: {
        name: {
          equals: name,
          mode: Prisma.QueryMode.insensitive
        },
        NOT: {
          id: id
        }
      }
    });

    if (duplicate) {
      throw new Error(`Role with name ${name} already exists`);
    }

    const result = await this.prisma.$transaction(async (tx) => {
      await tx.role.update({
        where: { id },
        data: { name }
      });

      const validPermissions = await tx.permission.findMany({
        where: {
          id: { in: permissions }
        }
      });

      if (validPermissions.length !== permissions.length) {
        const validIds = validPermissions.map((p) => p.id);
        const notFound = permissions.filter((p) => !validIds.includes(p));
        throw new Error(`Permissions not found: ${notFound.join(', ')}`);
      }

      await tx.rolePermission.deleteMany({
        where: { roleId: id }
      });

      await tx.rolePermission.createMany({
        data: permissions.map((permissionId) => ({
          roleId: id,
          permissionId
        }))
      });

      return await tx.role.findUnique({
        where: { id },
        include: {
          permissions: {
            include: {
              permission: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      });
    });

    if (!result) {
      throw new Error('Failed to receive result');
    }

    return {
      role: {
        ...result,
        permissions:
          result.permissions.map((permission) => ({
            id: permission.permission.id,
            name: permission.permission.name
          })) ?? []
      }
    };
  }

  static async destroy(id: number, hasPermission?: HasPermission) {
    if (!hasPermission?.(REMOVE_ROLE)) {
      throw new AuthorizationError(`You don't have permission to this resource`);
    }

    await this.prisma.role.findUniqueOrThrow({
      where: {
        id
      }
    });

    const destroy = await this.prisma.role.delete({
      where: {
        id
      }
    });

    if (!destroy) {
      throw new Error('Failed to process your request');
    }

    return {
      message: 'Successfully to remove role'
    };
  }
}

export default RoleService;
