import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type {Request,Response,NextFunction} from "express";
import {env} from "./config.js";
export type Session={userId:string;tenantId:string;role:string;permissions:string[]};
export function signSession(s:Session){return jwt.sign(s,env.JWT_SECRET,{expiresIn:"12h"});}
export function hashPassword(p:string){return bcrypt.hash(p,12);}
export function verifyPassword(p:string,h:string){return bcrypt.compare(p,h);}
export function auth(req:Request,res:Response,next:NextFunction){const token=req.headers.authorization?.replace(/^Bearer\s+/,"");if(!token)return res.status(401).json({error:"authentication_required"});try{req.session=jwt.verify(token,env.JWT_SECRET) as Session;next()}catch{return res.status(401).json({error:"invalid_session"});}}
export function requirePermission(permission:string){return (req:Request,res:Response,next:NextFunction)=>{if(!req.session?.permissions?.includes(permission)&&req.session?.role!=="owner")return res.status(403).json({error:"permission_denied",permission});next();};}
declare global{namespace Express{interface Request{session?:Session}}}
