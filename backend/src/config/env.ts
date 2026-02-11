import 'dotenv/config'

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  REDIS_URL: process.env.REDIS_URL ?? 'redis://localhost:6379',
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev-secret',
  PORT: Number(process.env.PORT ?? 3001),
  HOST: process.env.HOST ?? '0.0.0.0',
}
