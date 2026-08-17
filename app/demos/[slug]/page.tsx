"use client";
import { useParams } from "next/navigation";
export default function Demo(){
  const p=useParams(); const slug=(p?.slug as string)||"abc-roofing";
  return (<div style={{padding:"30px",fontFamily:"system-ui"}}><div style={{background:"#111",color:"#FFD700",padding:"8px",textAlign:"center"}}>AI REBUILT 2026</div><h1 style={{fontSize:"36px",fontWeight:"900",marginTop:"20px"}}>{slug} - AI Instant Quote $8400-$11200</h1><p>Old ©2015 site losing 70% leads. New with AI chatbot + estimator.</p></div>);
}
