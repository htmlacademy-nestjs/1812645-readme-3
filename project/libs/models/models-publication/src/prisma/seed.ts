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

  await prisma.publications.upsert({
    where: { id: 1 },
    update: {},
    create: {
      author_id: 'Mr Bvz',
      status: 'DRAFT',
      kind: {
        connect: {
          id: 1,
        }
      },
      posts: {
        create: {
          video_posts: {
            create: {
              name: 'This is video.',
              link_to_video: 'www.google.com',
            }
          },
          text_posts: {}
        }
      }
    }
  });

  await prisma.publications.upsert({
    where: { id: 2 },
    update: {},
    create: {
      author_id: 'Miss Janet',
      status: 'PUBLISHED',
      kind: {
        connect: {
          id: 2,
        }
      },
      posts: {
        create: {
          video_posts: {},
          text_posts: {
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
      author_id: 'Luis Carroll',
      status: 'DRAFT',
      kind: {
        connect: {
          id: 1,
        }
      },
      posts: {
        create: {
          video_posts: {
            create: {
              name: 'Cheshire Cat',
              link_to_video: 'https://www.youtube.com/watch?v=QSDIziYBsHs',
            }
          },
          text_posts: {}
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
