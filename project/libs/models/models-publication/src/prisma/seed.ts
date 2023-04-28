import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.publications.upsert({
    where: { id: 1 },
    update: {},
    create: {
      authorId: 'Mr Bvz',
      status: 'DRAFT',
      kindId: 1,
      post: {
        name: 'This is video.',
        linkToVideo: 'www.google.com',
      },
      comments: {
        create: [
          {
            text: 'Есть гениальная идея!',
            userId: '1',
          },
          {
            text: 'Это вы вчера звонили по поводу авоськи?',
            userId: '1',
          },
        ]
      },
      likes: {
        create: [
          { userId: '5' },
          { userId: '8' },
          { userId: '5' },
        ]
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
      post: {
        name: 'Force overwrite.',
        announcement: 'Prisma manages the relation table under the hood',
        text: 'The following properties of the schema are determined by the database.',
      }
    }
  });

  await prisma.publications.upsert({
    where: { id: 3 },
    update: {},
    create: {
      authorId: 'Miss Janet',
      status: 'PUBLISHED',
      kindId: 3,
      post: {
        text: 'Не звоните сюда больше, это квартира!',
        authorOfQuoteId: 'Force overwrite.',
      }
    }
  });

  await prisma.publications.upsert({
    where: { id: 4 },
    update: {},
    create: {
      authorId: 'Miss Janet',
      status: 'PUBLISHED',
      kindId: 4,
      post: {
        linkToPhoto: 'https://yandex.ru/images/search?from',
      },
      comments: {
        create: {
          text: 'Все учесть невозможно!',
          userId: '13',
        },
      }
    }
  });

  await prisma.publications.upsert({
    where: { id: 5 },
    update: {},
    create: {
      authorId: 'Luis Carroll',
      status: 'DRAFT',
      kindId: 5,
      post: {
        description: 'Cheshire Cat',
        link: 'https://www.youtube.com/watch?v=QSDIziYBsHs',
      },
      comments: {
        create: {
          text: 'Мы согласовали!',
          userId: '13',
        },
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
