-- Add configurable response templates for inbound confirmations
ALTER TABLE "configuracao_global"
ADD COLUMN "respostaD1Confirmacao" TEXT,
ADD COLUMN "respostaReiteracaoConfirmacao" TEXT,
ADD COLUMN "respostaCheckinConfirmacao" TEXT,
ADD COLUMN "respostaPosAudienciaConfirmacao" TEXT;
