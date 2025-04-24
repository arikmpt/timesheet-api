import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import config from '@/config';
import { ROLE_ADMIN } from '@/constant';

async function userSeeder(prisma: PrismaClient) {
  const defaultPassword = process.env.DEFAULT_PASSWORD as string;
  const defaultEmail = process.env.DEFAULT_EMAIL as string;
  const findUser = await prisma.user.findFirst({
    where: {
      email: defaultEmail
    }
  });
  if (findUser) {
    return;
  }
  if (!process.env.DEFAULT_PASSWORD) {
    return;
  }
  await prisma.$transaction(async (tx) => {
    const role = await tx.role.findFirstOrThrow({
      where: {
        name: ROLE_ADMIN
      }
    });
    if (role) {
      const exists = await tx.user.findFirst({
        where: {
          email: defaultEmail
        }
      });
      if (!exists) {
        const cryptedPassword = await bcrypt.hash(defaultPassword, config.saltRound);
        const user = await tx.user.create({
          data: {
            email: defaultEmail,
            password: cryptedPassword,
            isActive: true,
            roleId: role.id
          }
        });

        await tx.profile.create({
          data: {
            firstName: 'System',
            lastName: 'Administrator',
            userId: user.id
          }
        });
      }
    }
  });
}

export default userSeeder;
