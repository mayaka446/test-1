"use client";
import { useState } from "react";
export default function LoginForm(){
 const [email,setEmail]=useState("admin@mayakas.school"),[password,setPassword]=useState("ChangeMe123!"),[error,setError]=useState("");
 async function submit(e:React.FormEvent){e.preventDefault();setError("");const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});if(r.ok)location.href="/dashboard";else setError("Sign-in failed. Check your credentials.");}
 return <form onSubmit={submit} style={{display:"grid",gap:13,marginTop:22}}>
  <div className="field"><label>Email address</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
  <div className="field"><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
  {error&&<p style={{color:"#b42318",fontSize:12}}>{error}</p>}<button className="btn" style={{padding:13}}>Sign in</button>
 </form>;
}
