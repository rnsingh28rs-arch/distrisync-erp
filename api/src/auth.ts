import crypto from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { env } from './config.js';
export type Session = { userId:string; tenantId:string; role:string; permissions:string[] };
function encode(v:string){return Buffer.from(v).toString('base64url');}
export function signSession(s:Session){
  const body=encode(JSON.stringify(s));
  const sig=crypto.createHmac('sha256',env.JWT_SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}
function verify(token:string):Session{
  const [body,sig]=token.split('.');
  const expected=crypto.createHmac('sha256',env.JWT_SECRET).update(body).digest('base64url');
  if(!body||!sig||!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected))) throw new Error('invalid');
  return JSON.parse(Buffer.from(body,'base64url').toString()) as Session;
}
export function auth(req:Request,res:Response,next:NextFunction){
  const token=req.headers.authorization?.replace(/^Bearer\\s+/,'');
  if(!token)return res.status(401).json({error:'authentication_required'});
  try{req.session=verify(token);next();}catch{return res.status(401).json({error:'invalid_session'});}
}
export function requirePermission(permission:string){return (req:Request,res:Response,next:NextFunction)=>{
  if(!req.session?.permissions?.includes(permission)&&req.session?.role!=='owner')return res.status(403).json({error:'permission_denied',permission});
  next();
};}
declare global{namespace Express{interface Request{session?:Session}}}
