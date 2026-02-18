-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN "resetToken" TEXT,
ADD COLUMN "resetTokenExpiraEm" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_resetToken_key" ON "usuarios"("resetToken");
