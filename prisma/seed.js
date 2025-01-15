const {PrismaClient} = require('@prisma/client');
const posts = require('./dummyData.json');
const prisma = new PrismaClient()

async function main() {
  for (const post of posts) {
    await prisma.post.create({
      data: post
    })
  }
}

main().then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect();
  process.exit(1);
  
})