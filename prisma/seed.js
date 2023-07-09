const { PrismaClient } = require('@prisma/client');
const {hash} = require("bcrypt"); 

const prisma = new PrismaClient();

const load = async () => {
  try {
    const password = await hash('test',12);
    const user = await prisma.user.upsert({
      where: { email: 'test@test.com' },
      update: {},
      create: {
        name: 'Test User',
        email: 'test@test.com',
        password,
      },
    });
    console.log(user);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();