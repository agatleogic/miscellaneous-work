const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  try {
    const product = await prisma.product.create({
      data: {
        title: "raman",
        price: 100,
        category: "mobile",
        isAvalaiable: true,
        description: "sjhfkdsufhgkdsfj gkjdfh dfjkghsdfkjgsdg fjsgfkdfj",
      },
    });
    console.log(product);
  } catch (error) {
    console.log(error);
  }
  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });
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
