-- CreateTable
CREATE TABLE "Ongs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Incidents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "ong_id" TEXT NOT NULL,
    CONSTRAINT "Incidents_ong_id_fkey" FOREIGN KEY ("ong_id") REFERENCES "Ongs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
