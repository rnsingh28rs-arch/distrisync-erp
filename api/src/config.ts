import "dotenv/config";
import {z} from "zod";
const schema=z.object({PORT:z.coerce.number().default(8080),DATABASE_URL:z.string().optional(),JWT_SECRET:z.string().min(32).default("development-only-change-this-secret-123456"),CORS_ORIGIN:z.string().default("*")});
export const env=schema.parse(process.env);
