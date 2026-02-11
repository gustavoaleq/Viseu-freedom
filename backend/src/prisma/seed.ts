import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const TRTs = [
  { numero: '1', nome: 'TRT 1ª Região — Rio de Janeiro', ativo: false },
  { numero: '2', nome: 'TRT 2ª Região — São Paulo', ativo: true },
  { numero: '3', nome: 'TRT 3ª Região — Minas Gerais', ativo: false },
  { numero: '4', nome: 'TRT 4ª Região — Rio Grande do Sul', ativo: false },
  { numero: '5', nome: 'TRT 5ª Região — Bahia', ativo: false },
  { numero: '6', nome: 'TRT 6ª Região — Pernambuco', ativo: false },
  { numero: '7', nome: 'TRT 7ª Região — Ceará', ativo: false },
  { numero: '8', nome: 'TRT 8ª Região — Pará/Amapá', ativo: false },
  { numero: '9', nome: 'TRT 9ª Região — Paraná', ativo: false },
  { numero: '10', nome: 'TRT 10ª Região — Distrito Federal/Tocantins', ativo: false },
  { numero: '11', nome: 'TRT 11ª Região — Amazonas/Roraima', ativo: false },
  { numero: '12', nome: 'TRT 12ª Região — Santa Catarina', ativo: false },
  { numero: '13', nome: 'TRT 13ª Região — Paraíba', ativo: false },
  { numero: '14', nome: 'TRT 14ª Região — Rondônia/Acre', ativo: false },
  { numero: '15', nome: 'TRT 15ª Região — Campinas', ativo: true },
  { numero: '16', nome: 'TRT 16ª Região — Maranhão', ativo: false },
  { numero: '17', nome: 'TRT 17ª Região — Espírito Santo', ativo: false },
  { numero: '18', nome: 'TRT 18ª Região — Goiás', ativo: false },
  { numero: '19', nome: 'TRT 19ª Região — Alagoas', ativo: false },
  { numero: '20', nome: 'TRT 20ª Região — Sergipe', ativo: false },
  { numero: '21', nome: 'TRT 21ª Região — Rio Grande do Norte', ativo: false },
  { numero: '22', nome: 'TRT 22ª Região — Piauí', ativo: false },
  { numero: '23', nome: 'TRT 23ª Região — Mato Grosso', ativo: false },
  { numero: '24', nome: 'TRT 24ª Região — Mato Grosso do Sul', ativo: false },
]

async function main() {
  console.log('Iniciando seed...')

  // Seed TRTs
  for (const trt of TRTs) {
    await prisma.trt.upsert({
      where: { numero: trt.numero },
      update: { nome: trt.nome, ativo: trt.ativo },
      create: trt,
    })
  }
  console.log(`✅ ${TRTs.length} TRTs criados`)

  // Seed usuário admin
  const senhaHash = await bcrypt.hash('admin123', 10)
  await prisma.usuario.upsert({
    where: { email: 'admin@freedom.ai' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@freedom.ai',
      senha: senhaHash,
      role: 'ADMIN',
      ativo: true,
    },
  })
  console.log('✅ Usuário admin criado (admin@freedom.ai / admin123)')

  console.log('Seed concluído!')
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
