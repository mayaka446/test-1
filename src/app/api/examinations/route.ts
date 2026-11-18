import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {requireRole} from "@/lib/auth";
export async function GET(){try{await requireRole(["ADMIN","TEACHER","STUDENT"]);return NextResponse.json(await prisma.examination.findMany({orderBy:{createdAt:"desc"}}));}catch{return NextResponse.json({error:"Unauthorized"},{status:401});}}
