import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   const getAllUsers = await prisma.user.findMany();
  //   console.log(getAllUsers);

  const postUser = await prisma.user.create({
    data: {
      first_name: "Rezoan",
      last_name: "Bro",
      email: "bro@gmail.com",
      age: 34,
    },
  });
  console.log(postUser);
}

main();
