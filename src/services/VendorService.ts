import prisma from './prisma';

interface Create {
  name: string;
  address: string;
}

interface Update extends Create {
  id: number;
}

interface Query {
  pageSize?: string;
  lastId?: string;
  keyword?: string;
}

export default class VendorService {
  async getAllVendors(query: Query) {
    const lastId = query.lastId ? parseInt(query.lastId as string) : null;
    const pageSize = parseInt(query.pageSize as string) || 10;
    const take = pageSize > 0 ? pageSize + 1 : 10;

    const searchCondition = query.keyword
      ? {
          OR: [{ name: { contains: query.keyword } }, { address: { contains: query.keyword } }]
        }
      : {};

    const vendors = await prisma.vendor.findMany({
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
      vendors: vendors.slice(0, pageSize),
      hasNextPage: vendors.length === take
    };
  }

  async createVendor(payload: Create) {
    const store = await prisma.vendor.create({
      data: payload
    });

    return {
      vendor: store
    };
  }

  async getVendor(id: number) {
    return {
      vendor: await prisma.vendor.findFirstOrThrow({
        where: {
          id
        }
      })
    };
  }

  async updateVendor(payload: Update) {
    const store = await prisma.vendor.update({
      where: {
        id: payload.id
      },
      data: {
        name: payload.name,
        address: payload.address
      }
    });

    return {
      vendor: store
    };
  }

  async destroyVendor(id: number) {
    await prisma.vendor.delete({
      where: {
        id
      }
    });

    return null;
  }
}
