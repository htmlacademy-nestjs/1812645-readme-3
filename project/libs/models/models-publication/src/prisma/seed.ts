import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.kind.upsert({
    where: {id: 1},
    update: {},
    create: {
      type: 'video'
    }
  });

  await prisma.kind.upsert({
    where: {id: 2},
    update: {},
    create: {
      type: 'text'
    }
  });

  await prisma.kind.upsert({
    where: {id: 3},
    update: {},
    create: {
      type: 'quote'
    }
  });

  await prisma.kind.upsert({
    where: {id: 4},
    update: {},
    create: {
      type: 'photo'
    }
  });

  await prisma.kind.upsert({
    where: {id: 5},
    update: {},
    create: {
      type: 'link'
    }
  });

  await prisma.publications.create({
    data: {
      authorId: 'Mr Bvz',
      status: 'DRAFT',
      kindId: 1,
      posts: {
        create: {
          videoPosts: {
            create: {
              name: 'This is video.',
              linkToVideo: 'www.google.com',
            }
          },
        }
      }
    }
  });

  await prisma.publications.upsert({
    where: { id: 2 },
    update: {},
    create: {
      authorId: 'Miss Janet',
      status: 'PUBLISHED',
      kindId: 2,
      posts: {
        create: {
          textPosts: {
            create: {
              name: 'Force overwrite.',
              announcement: 'Prisma manages the relation table under the hood',
              text: 'The following properties of the schema are determined by the database.',
            }
          }
        }
      }
    }
  });

  await prisma.publications.upsert({
    where: { id: 3 },
    update: {},
    create: {
      authorId: 'Luis Carroll',
      status: 'DRAFT',
      kindId: 1,
      posts: {
        create: {
          videoPosts: {
            create: {
              name: 'Cheshire Cat',
              linkToVideo: 'https://www.youtube.com/watch?v=QSDIziYBsHs',
            }
          },
        }
      }
    }
  });

  console.info('🤘️ Database was filled 🤘️')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
