import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
  name: 'GlobalProcessingExtension',
  query: {
    $allModels: {
      create: async ({ args, query }) => {
        args.data = preprocessBeforeSave(args.data);
        const result = await query(args);
        return postprocessAfterFetch(result);
      },
      update: async ({ args, query }) => {
        args.data = preprocessBeforeSave(args.data);
        const result = await query(args);
        return postprocessAfterFetch(result);
      },
      findMany: async ({ args, query }) => {
        const result = await query(args);
        return postprocessAfterFetch(result);
      },
      findUnique: async ({ args, query }) => {
        const result = await query(args);
        return postprocessAfterFetch(result);
      },
      findFirst: async ({ args, query }) => {
        const result = await query(args);
        return postprocessAfterFetch(result);
      }
    }
  }
});

function preprocessBeforeSave<T>(data: T): T {
  if (!data) return data;

  if (typeof data === 'object' && !Array.isArray(data)) {
    const result = { ...data } as Record<string, unknown>;
    for (const key in result) {
      const value = result[key];

      if (['name', 'firstName', 'lastName', 'email'].includes(key)) {
        if (typeof value === 'string') {
          result[key] = value.toLowerCase();
        }
      } else if (value instanceof Date) {
        result[key] = value;
      } else if (value && typeof value === 'object') {
        result[key] = preprocessBeforeSave(value);
      }
    }
    return result as T;
  }

  if (Array.isArray(data)) {
    return data.map(preprocessBeforeSave) as T;
  }

  return data;
}

function postprocessAfterFetch<T>(data: T): T {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(postprocessAfterFetch) as T;
  }

  if (typeof data === 'object') {
    const result = { ...data } as Record<string, unknown>;
    for (const key in result) {
      const value = result[key];

      if (['name', 'firstName', 'lastName', 'email'].includes(key)) {
        if (typeof value === 'string') {
          result[key] = toTitleCase(value);
        }
      } else if (value instanceof Date) {
        result[key] = value;
      } else if (value && typeof value === 'object') {
        result[key] = postprocessAfterFetch(value);
      }
    }
    return result as T;
  }

  return data;
}

function toTitleCase(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export default prisma;

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
