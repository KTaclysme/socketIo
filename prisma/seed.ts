import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const existingUser = await prisma.user.findUnique({
        where: { name: 'Joe' },
    });

    if (!existingUser) {
        const hashedPassword = await bcrypt.hash('Joe', 10);

        await prisma.user.create({
            data: {
                name: 'Joe', 
                password: hashedPassword,
            },
        });

        console.log('Default user created.');
    } else {
        console.log('Default user already exists.');
    }
}

main()
  .catch((e) => {
      console.error(e);
      process.exit(1);
  })
  .finally(async () => {
      await prisma.$disconnect();
  });
