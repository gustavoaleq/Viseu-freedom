-- CreateEnum
CREATE TYPE "StatusAudiencia" AS ENUM ('IMPORTADA', 'AGENDADA', 'A_CONFIRMAR', 'CONFIRMADA', 'NAO_POSSO', 'SEM_RESPOSTA', 'SUBSTITUICAO_NECESSARIA', 'EM_ANDAMENTO', 'CHECK_IN_PENDENTE', 'RELATORIO_PENDENTE', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "Modalidade" AS ENUM ('PRESENCIAL', 'ONLINE');

-- CreateEnum
CREATE TYPE "TipoMensagem" AS ENUM ('CONFIRMACAO_D1', 'REITERACAO_H1H30', 'CHECK_IN', 'RELATORIO_POS', 'SUBSTITUICAO_AVISO', 'ESCALONAMENTO');

-- CreateEnum
CREATE TYPE "DirecaoMensagem" AS ENUM ('ENVIADA', 'RECEBIDA');

-- CreateEnum
CREATE TYPE "StatusEnvioMensagem" AS ENUM ('PENDENTE', 'ENVIADA', 'ENTREGUE', 'LIDA', 'FALHA');

-- CreateEnum
CREATE TYPE "StatusImportacao" AS ENUM ('PROCESSANDO', 'CONCLUIDA', 'ERRO');

-- CreateEnum
CREATE TYPE "OcorrenciaAudiencia" AS ENUM ('SIM', 'NAO', 'REMARCADA');

-- CreateEnum
CREATE TYPE "ResultadoAudiencia" AS ENUM ('ACORDO', 'SEM_ACORDO', 'AUSENCIA', 'REDESIGNADA');

-- CreateEnum
CREATE TYPE "StatusSubstituicao" AS ENUM ('ABERTA', 'RESOLVIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "RoleUsuario" AS ENUM ('ADMIN', 'OPERADOR', 'GESTOR');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "RoleUsuario" NOT NULL DEFAULT 'OPERADOR',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trts" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prepostos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefoneWhatsapp" TEXT NOT NULL,
    "email" TEXT,
    "cpf" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prepostos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parceiros" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parceiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contatos_parceiro" (
    "id" TEXT NOT NULL,
    "parceiroId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefoneWhatsapp" TEXT NOT NULL,
    "email" TEXT,
    "cargo" TEXT,
    "ordemEscalonamento" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contatos_parceiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "importacoes" (
    "id" TEXT NOT NULL,
    "nomeArquivo" TEXT NOT NULL,
    "totalRegistros" INTEGER NOT NULL DEFAULT 0,
    "registrosImportados" INTEGER NOT NULL DEFAULT 0,
    "registrosIgnorados" INTEGER NOT NULL DEFAULT 0,
    "mapeamentoColunas" JSONB,
    "status" "StatusImportacao" NOT NULL DEFAULT 'PROCESSANDO',
    "erros" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "importacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audiencias" (
    "id" TEXT NOT NULL,
    "numeroProcesso" TEXT NOT NULL,
    "reclamante" TEXT,
    "data" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "modalidade" "Modalidade" NOT NULL,
    "local" TEXT,
    "link" TEXT,
    "trtId" TEXT NOT NULL,
    "vara" TEXT,
    "status" "StatusAudiencia" NOT NULL DEFAULT 'AGENDADA',
    "prepostoId" TEXT NOT NULL,
    "parceiroId" TEXT NOT NULL,
    "importacaoId" TEXT,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audiencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagens" (
    "id" TEXT NOT NULL,
    "audienciaId" TEXT NOT NULL,
    "prepostoId" TEXT,
    "contatoParceiroId" TEXT,
    "tipo" "TipoMensagem" NOT NULL,
    "direcao" "DirecaoMensagem" NOT NULL,
    "conteudo" TEXT NOT NULL,
    "respostaBotao" TEXT,
    "observacao" TEXT,
    "whatsappMessageId" TEXT,
    "statusEnvio" "StatusEnvioMensagem" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorios_audiencia" (
    "id" TEXT NOT NULL,
    "audienciaId" TEXT NOT NULL,
    "audienciaOcorreu" "OcorrenciaAudiencia",
    "resultado" "ResultadoAudiencia",
    "advogadoPresente" BOOLEAN,
    "advogadoDominioCaso" BOOLEAN,
    "problemaRelevante" BOOLEAN,
    "relato" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "relatorios_audiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_status" (
    "id" TEXT NOT NULL,
    "audienciaId" TEXT NOT NULL,
    "statusAnterior" "StatusAudiencia" NOT NULL,
    "statusNovo" "StatusAudiencia" NOT NULL,
    "motivo" TEXT,
    "atualizadoPor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historico_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "substituicoes" (
    "id" TEXT NOT NULL,
    "audienciaId" TEXT NOT NULL,
    "prepostoAnteriorId" TEXT NOT NULL,
    "prepostoNovoId" TEXT,
    "motivo" TEXT NOT NULL,
    "status" "StatusSubstituicao" NOT NULL DEFAULT 'ABERTA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvidoEm" TIMESTAMP(3),

    CONSTRAINT "substituicoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "trts_numero_key" ON "trts"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "prepostos_telefoneWhatsapp_key" ON "prepostos"("telefoneWhatsapp");

-- CreateIndex
CREATE INDEX "audiencias_data_idx" ON "audiencias"("data");

-- CreateIndex
CREATE INDEX "audiencias_status_idx" ON "audiencias"("status");

-- CreateIndex
CREATE INDEX "audiencias_trtId_idx" ON "audiencias"("trtId");

-- CreateIndex
CREATE INDEX "audiencias_prepostoId_idx" ON "audiencias"("prepostoId");

-- CreateIndex
CREATE INDEX "audiencias_parceiroId_idx" ON "audiencias"("parceiroId");

-- CreateIndex
CREATE INDEX "mensagens_audienciaId_idx" ON "mensagens"("audienciaId");

-- CreateIndex
CREATE INDEX "mensagens_whatsappMessageId_idx" ON "mensagens"("whatsappMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "relatorios_audiencia_audienciaId_key" ON "relatorios_audiencia"("audienciaId");

-- CreateIndex
CREATE INDEX "historico_status_audienciaId_idx" ON "historico_status"("audienciaId");

-- AddForeignKey
ALTER TABLE "contatos_parceiro" ADD CONSTRAINT "contatos_parceiro_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "parceiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audiencias" ADD CONSTRAINT "audiencias_trtId_fkey" FOREIGN KEY ("trtId") REFERENCES "trts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audiencias" ADD CONSTRAINT "audiencias_prepostoId_fkey" FOREIGN KEY ("prepostoId") REFERENCES "prepostos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audiencias" ADD CONSTRAINT "audiencias_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "parceiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audiencias" ADD CONSTRAINT "audiencias_importacaoId_fkey" FOREIGN KEY ("importacaoId") REFERENCES "importacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_audienciaId_fkey" FOREIGN KEY ("audienciaId") REFERENCES "audiencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_prepostoId_fkey" FOREIGN KEY ("prepostoId") REFERENCES "prepostos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_contatoParceiroId_fkey" FOREIGN KEY ("contatoParceiroId") REFERENCES "contatos_parceiro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorios_audiencia" ADD CONSTRAINT "relatorios_audiencia_audienciaId_fkey" FOREIGN KEY ("audienciaId") REFERENCES "audiencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_status" ADD CONSTRAINT "historico_status_audienciaId_fkey" FOREIGN KEY ("audienciaId") REFERENCES "audiencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substituicoes" ADD CONSTRAINT "substituicoes_audienciaId_fkey" FOREIGN KEY ("audienciaId") REFERENCES "audiencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substituicoes" ADD CONSTRAINT "substituicoes_prepostoAnteriorId_fkey" FOREIGN KEY ("prepostoAnteriorId") REFERENCES "prepostos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "substituicoes" ADD CONSTRAINT "substituicoes_prepostoNovoId_fkey" FOREIGN KEY ("prepostoNovoId") REFERENCES "prepostos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
