import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

export const URL_ROOT = `https://www.set.gov.py/documents/20123/517070/ruc`
export const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '0 */1 * * * *'
export const DATABASE_URL = process.env.DATABASE_URL || 'file:../data/rucpy.db'
export const TIMEZONE = process.env.TIMEZONE || 'America/Asuncion'
export const PORT = process.env.PORT || 8080
export const VERSION = '0.0.1'
export const prisma = new PrismaClient()