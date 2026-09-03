import pg from "pg";
import {env} from "./config.js";
const {Pool}=pg;
export const pool=env.DATABASE_URL?new Pool({connectionString:env.DATABASE_URL,ssl:env.DATABASE_URL.includes("sslmode=require")?{rejectUnauthorized:false}:undefined}):null;
export async function query<T=unknown>(text:string,params:any[]=[]):Promise<T[]>{if(!pool)return [];const result=await pool.query(text,params);return result.rows as T[];}
