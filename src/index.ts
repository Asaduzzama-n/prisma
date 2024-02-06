import { PrismaClient } from "@prisma/client";
import app from "./app";

const prisma = new PrismaClient();

async function main() {
  const port = process.env.port || 5000;
  app.listen(port, () => {
    console.log(`server listening at port: ${port}`);
  });
}

main();
