import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.publications.upsert({
    where: { id: 1 },
    update: {},
    create: {
      authorId: '23',
      status: 'DRAFT',
      kindId: 1,
      post: {
        name: 'This is video.',
        linkToVideo: 'www.google.com',
      },
      tags: {
        create: [
          { title: 'семья' },
          { title: 'работа' },
          { title: 'бега' }
        ]
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
      authorId: '56',
      status: 'PUBLISHED',
      kindId: 2,
      post: {
        name: 'Задача стоит!',
        announcement: 'Взяли на работу, терпите!',
        text: 'Всюду жизнь, творчество, креатив.',
      },
      tags: {
        create: [
          { title: 'охота' }
        ],
        connect: {
          title: 'семья'
        }
      },
    }
  });

  await prisma.publications.upsert({
    where: { id: 3 },
    update: {},
    create: {
      authorId: '13',
      status: 'PUBLISHED',
      kindId: 3,
      post: {
        text: 'Не звоните сюда больше, это квартира!',
        authorOfQuoteId: 'Force overwrite.',
      },
      tags: {
        create: { title: 'котики' },
      },
    }
  });

  await prisma.publications.upsert({
    where: { id: 4 },
    update: {},
    create: {
      authorId: '456',
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
      authorId: '49',
      status: 'DRAFT',
      kindId: 5,
      post: {
        description: 'Cheshire Cat, Luis Carroll',
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

  await prisma.publications.upsert({
    where: { id: 6 },
    update: {},
    create: {
      authorId: '4979',
      status: 'DRAFT',
      kindId: 5,
      post: {
        description: 'Cheshire Cat, Luis Carroll',
        link: 'https://www.youtube.com/watch?v=QSDIziYBsHs',
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
