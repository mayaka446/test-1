import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
const schema=z.object({email:z.string().email(),password:z.string().min(1)});
export async function POST(req:NextRequest){
 try{
  const body=schema.parse(await req.json());
  const user=await prisma.user.findUnique({where:{email:body.email}});
  if(!user||!user.active||!(await bcrypt.compare(body.password,user.passwordHash))) return NextResponse.json({error:"Invalid credentials"},{status:401});
  await createSession({id:user.id,role:user.role,name:user.name});
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:"Invalid request"},{status:400});}
}
