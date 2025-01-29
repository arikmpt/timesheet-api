import UniqueError from '@exceptions/UniqueError';
import { TokenData } from '@plugins/security';
import {
  CREATE_CONTRACT,
  DESTROY_CONTRACT,
  INDEX_CONTRACT,
  READ_CONTRACT,
  UPDATE_CONTRACT,
  VENDOR_ROLE
} from 'contants';

import AuthorizationService from './AuthorizationService';
import prisma from './prisma';

interface CreateContract {
  code: string;
  startDate: Date;
  endDate: Date;
  hourlyRate: number;
  minHourPerWeek: number;
  maxHourPerWeek: number;
}

interface UpdateContract {
  id: number;
  code: string;
  startDate: Date;
  endDate: Date;
  hourlyRate: number;
  minHourPerWeek: number;
  maxHourPerWeek: number;
}

interface AssignContract {
  id: number;
  employeeId: number;
  vendorId: number;
}

interface Query {
  pageSize?: string;
  lastId?: string;
  keyword?: string;
}

export default class ContractService extends AuthorizationService {
  constructor(auth?: TokenData) {
    super(auth);
  }

  async getContracts(query: Query) {
    this.checkPermission(INDEX_CONTRACT);

    const lastId = query.lastId ? parseInt(query.lastId as string) : null;
    const pageSize = parseInt(query.pageSize as string) || 10;
    const take = pageSize > 0 ? pageSize + 1 : 10;

    const searchCondition = query.keyword
      ? {
          OR: [{ code: { contains: query.keyword } }]
        }
      : {};

    let whereCondition = {};

    if (this.roleName === VENDOR_ROLE) {
      const vendorId = this.getVendorId();

      if (!vendorId) {
        throw new Error('vendor id is not found');
      }

      whereCondition = {
        ...(lastId ? { id: { lt: lastId } } : {}),
        ...searchCondition,
        employeeContracts: {
          every: {
            vendorId
          }
        }
      };
    } else {
      whereCondition = {
        ...(lastId ? { id: { lt: lastId } } : {}),
        ...searchCondition
      };
    }

    const contracts = await prisma.contract.findMany({
      take,
      where: whereCondition,
      orderBy: {
        id: 'desc'
      }
    });

    return {
      contracts: contracts.slice(0, pageSize),
      hasNextPage: contracts.length === take
    };
  }

  async getVendorId() {
    const getVendorId = await prisma.user.findFirstOrThrow({
      where: {
        id: this.authId
      },
      include: {
        vendor: true
      }
    });

    return getVendorId.vendor?.vendorId;
  }

  async findContract(id: number) {
    this.checkPermission(READ_CONTRACT);

    const contract = await prisma.contract.findFirstOrThrow({
      where: {
        id
      }
    });

    return {
      contract
    };
  }

  async createContract(payload: CreateContract) {
    this.checkPermission(CREATE_CONTRACT);

    const findExist = await prisma.contract.findFirst({
      where: {
        code: payload.code
      }
    });

    if (findExist) {
      throw new UniqueError(`Contract code already exists`);
    }

    const contract = await prisma.contract.create({
      data: payload
    });
    return {
      contract
    };
  }

  async updateContract(payload: UpdateContract) {
    this.checkPermission(UPDATE_CONTRACT);

    const findExist = await prisma.contract.findFirst({
      where: {
        code: payload.code,
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
      throw new UniqueError(`Contract code already exists`);
    }

    const contract = await prisma.contract.update({
      where: {
        id: payload.id
      },
      data: {
        code: payload.code,
        startDate: payload.startDate,
        endDate: payload.endDate,
        hourlyRate: payload.hourlyRate,
        minHourPerWeek: payload.minHourPerWeek,
        maxHourPerWeek: payload.maxHourPerWeek
      }
    });

    return {
      contract
    };
  }

  async destroyContract(id: number) {
    this.checkPermission(DESTROY_CONTRACT);

    const findActiveContract = await prisma.employeeContract.findFirst({
      where: {
        contractId: id
      }
    });

    if (findActiveContract) {
      throw new Error('You still have assigned contract, please remove the assign first');
    }

    await prisma.contract.delete({
      where: {
        id
      }
    });

    return null;
  }

  async assignContract(payload: AssignContract) {
    this.checkPermission(UPDATE_CONTRACT);

    const findActiveContract = await prisma.employeeContract.findFirst({
      where: {
        contractId: payload.id,
        employeeId: payload.employeeId,
        vendorId: payload.vendorId
      }
    });

    if (findActiveContract) {
      throw new Error('Employee already assign to contract');
    }

    await prisma.employeeContract.create({
      data: {
        employeeId: payload.employeeId,
        contractId: payload.id,
        vendorId: payload.vendorId
      }
    });

    return {
      message: 'Contract assign successfully'
    };
  }

  async unassignContract(payload: AssignContract) {
    this.checkPermission(DESTROY_CONTRACT);

    await prisma.employeeContract.delete({
      where: {
        employeeId_contractId_vendorId: {
          employeeId: payload.employeeId,
          contractId: payload.id,
          vendorId: payload.vendorId
        }
      }
    });

    return {
      message: 'Contract unassign successfully'
    };
  }
}
