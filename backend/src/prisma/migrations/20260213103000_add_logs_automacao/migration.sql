CREATE TABLE "logs_automacao" (
  "id" TEXT NOT NULL,
  "audienciaId" TEXT NOT NULL,
  "origem" TEXT NOT NULL,
  "evento" TEXT NOT NULL,
  "etapa" TEXT,
  "status" TEXT,
  "mensagem" TEXT NOT NULL,
  "metadados" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "logs_automacao_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "logs_automacao_audienciaId_createdAt_idx"
ON "logs_automacao"("audienciaId", "createdAt");

CREATE INDEX "logs_automacao_evento_idx"
ON "logs_automacao"("evento");

ALTER TABLE "logs_automacao"
ADD CONSTRAINT "logs_automacao_audienciaId_fkey"
FOREIGN KEY ("audienciaId") REFERENCES "audiencias"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
