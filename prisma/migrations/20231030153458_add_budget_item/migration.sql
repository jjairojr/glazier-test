-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "total" DROP NOT NULL;

-- CreateTable
CREATE TABLE "BudgetItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "BudgetItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
