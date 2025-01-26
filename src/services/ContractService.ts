import bcrypt from 'bcrypt';

import prisma from './prisma';

interface CreateContract {
  contract: {
    code: string;
    startDate: Date;
    endDate: Date;
    hourlyRate: number;
    minHourPerWeek: number;
    maxHourPerWeek: number;
  };
  user: {
    email: string;
    firstName: string;
    lastName: string;
    contactNumber?: string;
    countryCode?: string;
    birthOfDate?: Date;
    placeOfBirth?: string;
    address?: string;
  };
  vendor: {
    id: number;
  };
}

export default class ContractService {
  async createContract(payload: CreateContract) {
    const checkUserExist = await prisma.user.findFirst({
      where: {
        email: payload.user.email
      },
      include: {
        employeeContracts: {
          include: {
            contract: true
          }
        }
      }
    });

    const findContractExist = checkUserExist?.employeeContracts.find(
      (employeeContract) => employeeContract.contract.code === payload.contract.code
    );

    if (findContractExist) {
      throw new Error('Employee already sign to contract code');
    }

    return await prisma.$transaction(async (tx) => {
      const cryptedPassword = await bcrypt.hash('newPassword!23', 10);

      const role = await tx.role.findFirstOrThrow({
        where: {
          name: 'employee'
        }
      });

      const user = await tx.user.create({
        data: {
          email: payload.user.email,
          password: cryptedPassword,
          roleId: role.id
        }
      });

      await tx.profile.create({
        data: {
          firstName: payload.user.firstName,
          lastName: payload.user.lastName,
          contactNumber: payload.user.contactNumber,
          countryCode: payload.user.countryCode,
          birthOfDate: payload.user.birthOfDate,
          placeOfBirth: payload.user.placeOfBirth,
          address: payload.user.address,
          userId: user.id
        }
      });

      const contract = await tx.contract.create({
        data: payload.contract
      });

      await tx.employeeContract.create({
        data: {
          contractId: contract.id,
          vendorId: payload.vendor.id,
          employeeId: user.id
        }
      });

      return {
        contract
      };
    });
  }
}
