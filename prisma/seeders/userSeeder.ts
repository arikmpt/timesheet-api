import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

async function userSeeder(prisma: PrismaClient) {
  const findUser = await prisma.user.findFirst({
    where: {
      email: 'admin@admin.com'
    }
  });
  if (findUser) {
    return;
  }
  await prisma.$transaction(async (tx) => {
    const role = await tx.role.findFirstOrThrow({
      where: {
        name: 'admin'
      }
    });
    const cryptedPassword = await bcrypt.hash('password!23', 10);
    const user = await tx.user.create({
      data: {
        email: 'admin@admin.com',
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
  });
}

export default userSeeder;
