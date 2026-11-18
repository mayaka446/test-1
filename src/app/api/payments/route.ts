import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
const schema=z.object({studentId:z.string().min(1),amount:z.coerce.number().positive(),method:z.enum(["CASH","BANK","MOBILE_MONEY","CARD","OTHER"]),reference:z.string().optional()});
export async function POST(req:NextRequest){try{const user=await requireRole(["ADMIN","BURSAR"]);const b=schema.parse(await req.json());const receiptNo=`MAY-${Date.now()}`;const payment=await prisma.payment.create({data:{...b,receiptNo,receivedBy:user.id}});await prisma.auditLog.create({data:{userId:user.id,action:"PAYMENT_RECORDED",entity:"Payment",entityId:payment.id}});return NextResponse.json({id:payment.id,receiptNo},{status:201});}catch{return NextResponse.json({error:"Invalid payment or unauthorized request"},{status:400});}}
