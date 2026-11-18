import { PrismaClient, Role, Curriculum } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma=new PrismaClient();
async function main(){
 const passwordHash=await bcrypt.hash("ChangeMe123!",12);
 const accounts=[
  {name:"System Administrator",email:"admin@mayakas.school",role:Role.ADMIN},
  {name:"Demo Teacher",email:"teacher@mayakas.school",role:Role.TEACHER},
  {name:"Demo Student",email:"student@mayakas.school",role:Role.STUDENT},
  {name:"Demo Bursar",email:"bursar@mayakas.school",role:Role.BURSAR}
 ];
 for(const a of accounts) await prisma.user.upsert({where:{email:a.email},update:{},create:{...a,passwordHash}});
 await prisma.subject.upsert({where:{code:"MATH-CBC"},update:{},create:{code:"MATH-CBC",name:"Mathematics",curriculum:Curriculum.CBC}});
 await prisma.subject.upsert({where:{code:"ENG-CAM"},update:{},create:{code:"ENG-CAM",name:"English Language",curriculum:Curriculum.CAMBRIDGE}});
 console.log("Seed complete. Demo password for all accounts: ChangeMe123!");
}
main().finally(()=>prisma.$disconnect());
