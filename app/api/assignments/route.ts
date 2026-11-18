import {NextRequest,NextResponse} from "next/server";
import {z} from "zod";
import {prisma} from "@/lib/prisma";
import {requireRole} from "@/lib/auth";
const createSchema=z.object({title:z.string().min(2),instructions:z.string().min(2),subjectId:z.string(),grade:z.string(),curriculum:z.enum(["CBC","CAMBRIDGE"]),dueDate:z.string().optional(),status:z.enum(["DRAFT","PUBLISHED","CLOSED"]).default("PUBLISHED"),fileUrl:z.string().url().optional()});
export async function GET(){try{await requireRole(["ADMIN","TEACHER","STUDENT"]);return NextResponse.json(await prisma.assignment.findMany({include:{subject:true},orderBy:{createdAt:"desc"}}));}catch{return NextResponse.json({error:"Unauthorized"},{status:401});}}
export async function POST(req:NextRequest){try{const user=await requireRole(["ADMIN","TEACHER"]);const b=createSchema.parse(await req.json());const row=await prisma.assignment.create({data:{...b,dueDate:b.dueDate?new Date(b.dueDate):undefined,createdBy:user.id}});return NextResponse.json(row,{status:201});}catch{return NextResponse.json({error:"Invalid assignment or unauthorized"},{status:400});}}
