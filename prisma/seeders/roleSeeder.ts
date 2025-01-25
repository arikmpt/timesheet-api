import { PrismaClient } from '@prisma/client';

const ADMIN_ROLE = 'admin';
const HRD_ROLE = 'human resource departmen';
const VENDOR_ROLE = 'vendor';
const EMPLOYEE_ROLE = 'employee';

const roles = [ADMIN_ROLE, HRD_ROLE, VENDOR_ROLE, EMPLOYEE_ROLE];

const ROLE_PERMISSIONS = ['create_role', 'read_role', 'update_role', 'destroy_role'];

const USER_PERMISSIONS = ['create_user', 'read_user', 'update_user', 'destroy_user'];

const CONTRACT_PERMISSIONS = ['create_contract', 'read_contract', 'update_contract', 'destroy_contract'];

const VENDOR_PERMISSIONS = ['create_vendor', 'read_vendor', 'update_vendor', 'destroy_vendor'];

const INVOICE_PERMISSIONS = ['create_invoice', 'read_invoice', 'update_invoice', 'destroy_invoice'];

const TIMESHEET_PERMISSIONS = ['create_timesheet', 'read_timesheet', 'update_timesheet', 'destroy_timesheet'];

const ADMIN_PERMISSIONS = [
  ...ROLE_PERMISSIONS,
  ...USER_PERMISSIONS,
  ...CONTRACT_PERMISSIONS,
  ...VENDOR_PERMISSIONS,
  ...INVOICE_PERMISSIONS
];

const HR_PERMISSIONS = [
  ...USER_PERMISSIONS,
  ...CONTRACT_PERMISSIONS,
  ...VENDOR_PERMISSIONS,
  ...INVOICE_PERMISSIONS,
  'read_timesheet',
  'notes_timesheet'
];

const EMPLOYEE_PERMISSIONS = [...TIMESHEET_PERMISSIONS];

const VENDOR_ROLE_PERMISSIONS = ['read_timesheet', 'status_timesheet', 'notes_timesheet', 'read_invoice'];

const permissions = [...ADMIN_PERMISSIONS, ...HR_PERMISSIONS, ...EMPLOYEE_PERMISSIONS, ...VENDOR_ROLE_PERMISSIONS];

async function roleSeeder(prisma: PrismaClient) {
  await prisma.role.createMany({
    data: roles.map((name) => ({ isSystem: true, name })),
    skipDuplicates: true
  });

  await prisma.permission.createMany({
    data: permissions.map((name) => ({ name })),
    skipDuplicates: true
  });

  const adminRole = await prisma.role.findUnique({
    where: {
      name: ADMIN_ROLE,
      isSystem: true
    }
  });

  const hrRole = await prisma.role.findUnique({
    where: {
      name: HRD_ROLE,
      isSystem: true
    }
  });

  const employeeRole = await prisma.role.findUnique({
    where: {
      name: EMPLOYEE_ROLE,
      isSystem: true
    }
  });

  const vendorRole = await prisma.role.findUnique({
    where: {
      name: VENDOR_ROLE,
      isSystem: true
    }
  });

  ADMIN_PERMISSIONS.map(async (permission) => {
    const permissionData = await prisma.permission.findUnique({
      where: {
        name: permission
      }
    });

    if (adminRole && permissionData) {
      const hasRolePermissions = await prisma.rolePermission.findFirst({
        where: {
          permissionId: permissionData.id,
          roleId: adminRole.id
        }
      });
      if (!hasRolePermissions) {
        await prisma.rolePermission.create({
          data: {
            roleId: adminRole.id,
            permissionId: permissionData.id
          }
        });
      }
    }
  });

  HR_PERMISSIONS.map(async (permission) => {
    const permissionData = await prisma.permission.findUnique({
      where: {
        name: permission
      }
    });

    if (hrRole && permissionData) {
      const hasRolePermissions = await prisma.rolePermission.findFirst({
        where: {
          permissionId: permissionData.id,
          roleId: hrRole.id
        }
      });
      if (!hasRolePermissions) {
        await prisma.rolePermission.create({
          data: {
            roleId: hrRole.id,
            permissionId: permissionData.id
          }
        });
      }
    }
  });

  EMPLOYEE_PERMISSIONS.map(async (permission) => {
    const permissionData = await prisma.permission.findUnique({
      where: {
        name: permission
      }
    });

    if (employeeRole && permissionData) {
      const hasRolePermissions = await prisma.rolePermission.findFirst({
        where: {
          permissionId: permissionData.id,
          roleId: employeeRole.id
        }
      });
      if (!hasRolePermissions) {
        await prisma.rolePermission.create({
          data: {
            roleId: employeeRole.id,
            permissionId: permissionData.id
          }
        });
      }
    }
  });

  VENDOR_ROLE_PERMISSIONS.map(async (permission) => {
    const permissionData = await prisma.permission.findUnique({
      where: {
        name: permission
      }
    });

    if (vendorRole && permissionData) {
      const hasRolePermissions = await prisma.rolePermission.findFirst({
        where: {
          permissionId: permissionData.id,
          roleId: vendorRole.id
        }
      });
      if (!hasRolePermissions) {
        await prisma.rolePermission.create({
          data: {
            roleId: vendorRole.id,
            permissionId: permissionData.id
          }
        });
      }
    }
  });
}

export default roleSeeder;
