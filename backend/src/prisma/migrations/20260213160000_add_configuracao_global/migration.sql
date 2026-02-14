-- CreateTable
CREATE TABLE "configuracao_global" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "enviarAvisoNaImportacao" BOOLEAN NOT NULL DEFAULT true,
    "horarioD1" TEXT,
    "antecedenciaD1Horas" INTEGER NOT NULL DEFAULT 24,
    "antecedenciaReiteracaoHoras" INTEGER NOT NULL DEFAULT 6,
    "antecedenciaCheckinMinutos" INTEGER NOT NULL DEFAULT 60,
    "posAudienciaMinutosDepois" INTEGER NOT NULL DEFAULT 30,
    "fusoHorario" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configuracao_global_pkey" PRIMARY KEY ("id")
);

-- Seed singleton row with defaults
INSERT INTO "configuracao_global" ("id", "updatedAt")
VALUES ('singleton', NOW())
ON CONFLICT ("id") DO NOTHING;
