import 'dotenv/config'
import { z } from 'zod'

// process.env = { NODE_ENV: 'x', ... }

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('Invalid envirorment variables', _env.error.format())
    throw new Error('Invalid envirorment variables !')
}

export const env = _env.data