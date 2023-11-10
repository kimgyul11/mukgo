-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_storeId_fkey";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "road_address_name" TEXT NOT NULL,
    "phone" TEXT,
    "lat" TEXT,
    "lng" TEXT,
    "place_url" TEXT,
    "category_group_name" TEXT,
    "category_name" TEXT,
    "content" TEXT NOT NULL,
    "star" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
