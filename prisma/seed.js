const { PrismaClient } = require('@prisma/client');
const {hash} = require("bcrypt"); 

export const prisma = new PrismaClient();

const load = async () => {
  try {
    const password = await hash(process.env.ADMIN_PASS,12);
    const admin = await prisma.user.create({
        data:{
            name:'Admin',
            email:process.env.ADMIN_EMAIL,
            password,
            role:'ADMIN',
        },
    })
    // const user = await prisma.user.upsert({
    //   where: { email: 'test@test.com' },
    //   update: {},
    //   create: {
    //     name: 'Test User',
    //     email: 'test@test.com',
    //     password,
    //   },
    //});  
    console.log(admin);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();