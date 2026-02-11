import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, 'src', 'prisma', 'schema.prisma'),
  migrate: {
    async resolve({ datasourceUrl }) {
      return process.env.DATABASE_URL ?? datasourceUrl
    },
  },
})
