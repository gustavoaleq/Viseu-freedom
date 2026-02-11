import { prisma } from '../config/database.js'

export async function listarTrts() {
  return prisma.trt.findMany({
    orderBy: { numero: 'asc' },
  })
}

export async function atualizarTrt(id: string, ativo: boolean) {
  const trtAtual = await prisma.trt.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!trtAtual) return null

  return prisma.trt.update({
    where: { id },
    data: { ativo },
  })
}
