import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brevoKey = process.env.BREVO_API_KEY!;
    const groqKey = process.env.GROQ_API_KEY;
    if(!brevoKey) return NextResponse.json({ok:false,error:"BREVO key missing"},{status:500});

    const filePath = path.join(process.cwd(),"public","site500.json");
    const sites = JSON.parse(fs.readFileSync(filePath,"utf8"));

    const progressPath = "/tmp/venus_progress.json";
    const dailyPath = "/tmp/venus_daily.json";

    let index = 0;
    if(fs.existsSync(progressPath)){
      try{ index = JSON.parse(fs.readFileSync(progressPath,"utf8")).index||0 }catch{}
    }

    // DAILY CAP 300
    let todayCount = 0;
    let today = new Date().toISOString().slice(0,10);
    if(fs.existsSync(dailyPath)){
      try{
        const d = JSON.parse(fs.readFileSync(dailyPath,"utf8"));
        if(d.date===today) todayCount = d.count;
        else todayCount = 0;
      }catch{}
    }
    if(todayCount >= 295){ // stop at 295 to be safe
      return NextResponse.json({ok:true,paused:true,reason:"Daily 300 limit reached",todayCount,date:today,nextReset:"tomorrow 00:00 UTC",currentIndex:index});
    }

    if(index >= sites.length) index=0;
    const site = sites[index]; // ONLY 1 PER RUN

    let body = `Hey ${site.business} - spotted ${site.domain}. We make sites hit different at VenusHQ7 (web + closers + video). 2-min audit free? Reply YES. - Ron`;
    if(groqKey){
      try{
        const r = await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${groqKey}`,"Content-Type":"application/json"},body:JSON.stringify({model:"llama-3.1-8b-instant",messages:[{role:"user",content:`Write 50-word Gen Z cold email for ${site.business} ${site.domain}. Casual, VenusHQ7 web design.`}],max_tokens:100})});
        const j = await r.json();
        if(j.choices?.[0]?.message?.content) body=j.choices[0].message.content;
      }catch{}
    }

    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email",{
      method:"POST",
      headers:{"api-key":brevoKey,"Content-Type":"application/json"},
      body:JSON.stringify({
        sender:{name:"Ron Kahn - VenusHQ7",email:"ron@venushq7.com"},
        to:[{email:site.email||"ron@venushq7.com",name:site.business}],
        subject:`${site.business} - quick win for ${site.domain} 🚀`,
        htmlContent:`<p>${body.replace(/\n/g,"<br>")}</p><p>- Ron Kahn<br>Venus Plaza<br>ron@venushq7.com</p>`
      })
    });

    const ok = brevoRes.ok;
    if(ok){
      fs.writeFileSync(progressPath,JSON.stringify({index:index+1}));
      fs.writeFileSync(dailyPath,JSON.stringify({date:today,count:todayCount+1}));
    }

    return NextResponse.json({
      ok:true,
      autonomous:true,
      safe_mode:true,
      every:"5min",
      sent: ok?1:0,
      todayCount: todayCount + (ok?1:0),
      dailyLimit: 300,
      buffer: 300-(todayCount+(ok?1:0)),
      nextIndex: index+1,
      total: 500,
      daysToFinish: Math.ceil((500-(index+1))/288) + " days",
      timeSplit: "1 email / 5 min = 288/day - agents have 5 min to verify MX, scrape, etc",
      from:"ron@venushq7.com"
    });

  }catch(e:any){ return NextResponse.json({ok:false,error:e.message},{status:500}); }
}



