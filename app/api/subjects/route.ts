import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {requireRole} from "@/lib/auth";
export async function GET(){try{await requireRole(["ADMIN","TEACHER"]);return NextResponse.json(await prisma.subject.findMany({orderBy:{name:"asc"}}));}catch{return NextResponse.json({error:"Unauthorized"},{status:401});}}
