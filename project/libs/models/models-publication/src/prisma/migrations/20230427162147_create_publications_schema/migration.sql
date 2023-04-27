-- CreateTable
CREATE TABLE "publications" (
    "id" SERIAL NOT NULL,
    "author_id" TEXT NOT NULL,
    "date_of_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_of_publication" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "kind_id" INTEGER NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "post" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);
