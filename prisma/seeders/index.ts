import { PrismaClient } from '@prisma/client';

import roleSeeder from './roleSeeder';
import userSeeder from './userSeeder';

const prisma = new PrismaClient();

async function main() {
  await roleSeeder(prisma);
  await userSeeder(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
