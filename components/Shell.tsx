import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const nav = [
  ["OVERVIEW", [["Dashboard","/dashboard"]]],
  ["SCHOOL", [["Students","/students"],["Staff","/staff"],["Classes & subjects","/academics"],["Attendance","/attendance"]]],
  ["LEARNING", [["Examinations & results","/results"],["Homework & assignments","/assignments"],["Lesson notes","/lesson-notes"]]],
  ["FINANCE", [["Fee collection","/finance"],["Reports","/reports"]]]
];

export default async function Shell({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  const allowed = (path: string) => {
    if (session.role === "TEACHER") return !["/finance"].includes(path);
    if (session.role === "STUDENT") return ["/dashboard","/results","/assignments","/lesson-notes","/attendance"].includes(path);
    if (session.role === "BURSAR") return ["/dashboard","/students","/finance","/reports"].includes(path);
    return true;
  };
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand">MAYAKAS</div><div className="brand-sub">MANAGEMENT SYSTEM</div>
      <nav>{nav.map(([group, links]) => <div key={group as string}>
        <div className="nav-label">{group}</div>
        {(links as string[][]).filter(([,path])=>allowed(path)).map(([label,path])=><Link className="nav-link" href={path} key={path}>{label}</Link>)}
      </div>)}</nav>
    </aside>
    <main className="main">
      <header className="topbar"><div><strong>Mayakas Management System</strong><div className="sub">CBC + Cambridge education management</div></div>
        <div style={{textAlign:"right"}}><strong style={{fontSize:12}}>{session.name}</strong><div className="sub">{session.role}</div></div>
      </header>
      {children}
    </main>
  </div>;
}
