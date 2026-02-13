import { prisma } from '../config/database.js'

const TRTS_ATIVOS_POC = new Set(['2', '15'])

export async function listarTrts() {
  return prisma.trt.findMany({
    orderBy: { numero: 'asc' },
  })
}

export async function atualizarTrt(id: string, ativo: boolean) {
  const trtAtual = await prisma.trt.findUnique({
    where: { id },
    select: { id: true, numero: true },
  })

  if (!trtAtual) return null

  const ativoEsperado = TRTS_ATIVOS_POC.has(trtAtual.numero)
  if (ativo !== ativoEsperado) {
    throw new Error('TRT_TRAVADO_POC')
  }

  return prisma.trt.update({
    where: { id },
    data: { ativo: ativoEsperado },
  })
}
