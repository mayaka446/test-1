import {NextRequest,NextResponse} from "next/server";
import {z} from "zod";
import {prisma} from "@/lib/prisma";
import {requireRole} from "@/lib/auth";
const schema=z.object({name:z.string().min(2),curriculum:z.enum(["CBC","CAMBRIDGE"]),grade:z.string(),academicYear:z.coerce.number().int(),term:z.string(),amount:z.coerce.number().positive()});
export async function GET(){try{await requireRole(["ADMIN","BURSAR"]);return NextResponse.json(await prisma.feeStructure.findMany({orderBy:[{academicYear:"desc"},{grade:"asc"}]}));}catch{return NextResponse.json({error:"Unauthorized"},{status:401});}}
export async function POST(req:NextRequest){try{await requireRole(["ADMIN","BURSAR"]);return NextResponse.json(await prisma.feeStructure.create({data:schema.parse(await req.json())}),{status:201});}catch{return NextResponse.json({error:"Invalid fee structure"},{status:400});}}
