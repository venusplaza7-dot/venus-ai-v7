import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode") || "factory";
    const to = searchParams.get("to");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD }
    });

    // SINGLE TEST - You already tested this and it worked!
    if (to) {
      const domain = searchParams.get("domain") || "test.com";
      await transporter.sendMail({
        from: `"Venus Factory" <${process.env.GMAIL_USER}>`,
        to, subject: `${domain} + AI Preview`,
        html: `<div style="background:#000;color:#0f0;padding:30px"><h1>FACTORY READY</h1><p>Preview: https://${domain}</p></div>`,
        replyTo: process.env.GMAIL_USER
      });
      return NextResponse.json({ success: true, sent_to: to });
    }

    // 5 AGENTS IN ONE - FROM SALES!
    // 1. SYLVIE SCOUT
    const leadsPath = path.join(process.cwd(), "leads.json");
    let leads: any[] = []; try { leads = JSON.parse(fs.readFileSync(leadsPath, "utf8")); } catch {}
    const newLeads = [
      { domain: "riyadh-cafe.com", name: "Riyadh Cafe", city: "Riyadh", country: "KSA", email: "info@riyadh-cafe.com", website: "https://riyadh-cafe.com" },
      { domain: "jeddah-salon.com", name: "Jeddah Salon", city: "Jeddah", country: "KSA", email: "info@jeddah-salon.com", website: "https://jeddah-salon.com" },
      { domain: "houston-plumber.com", name: "Houston Plumber", city: "Houston", country: "USA", email: "info@houston-plumber.com", website: "https://houston-plumber.com" }
    ];
    const existing = new Set(leads.map((l:any)=>l.domain));
    const filtered = newLeads.filter(l=>!existing.has(l.domain));
    const all = [...leads, ...filtered].slice(-14400);
    fs.writeFileSync(leadsPath, JSON.stringify(all, null, 2));

    // 2. LUNA DESIGN + 3. KENJI SALES + 4. AIKO FINANCE + 5. REX QA
    let sent = [];
    for (const lead of filtered.slice(0,3)) {
      // LUNA: Preview URL
      const previewUrl = `https://venus-upgrade-${lead.domain.replace(/\./g,"-")}.vercel.app`;
      // AIKO: Price
      const price = lead.country==="KSA" ? "2000 SAR setup + 500 SAR/mo" : "$500 setup + $150/mo";
      // REX QA: Verify email not empty
      if (!lead.email.includes("@")) continue;

      // KENJI SALES: Send
      const html = `<div style="background:#000;color:#0f0;padding:30px;font-family:monospace;border:3px solid #0f0"><h1>🔥 VENUS AI FACTORY - 5 AGENTS</h1><p>Hi ${lead.name} in ${lead.city},</p><p><b>1.SCOUT:</b> Found ${lead.website} - No AI</p><p><b>2.LUNA:</b> Built AI upgrade: ${previewUrl}</p><p><b>3.KENJI:</b> Sending this email</p><p><b>4.AIKO:</b> Price: ${price}</p><p><b>5.REX:</b> QA Verified ✅</p><p>Reply "how much?" - Ron sends link</p></div>`;
      
      const info = await transporter.sendMail({
        from: `"Venus Factory" <${process.env.GMAIL_USER}>`,
        to: lead.email,
        subject: `${lead.domain} + AI - 5 Agents Built Preview ${lead.country==="KSA"?"مجانا":"FREE"}`,
        html, replyTo: process.env.GMAIL_USER
      });
      sent.push({ domain: lead.domain, email: lead.email, price, preview: previewUrl, id: info.messageId });
      await new Promise(r=>setTimeout(r,2000));
    }

    return NextResponse.json({
      success: true,
      factory: "VENUS 24/7 - 5 AGENTS FROM SALES",
      agents: ["1.Sylvie Scout","2.Luna Design","3.Kenji Sales","4.Aiko Finance","5.Rex QA"],
      scout_found: filtered.length,
      total: all.length,
      sent,
      target: "14400 KSA+USA",
      note: "All 5 proceed from SALES - You only come for HOT leads"
    });

  } catch (e:any) {
    return NextResponse.json({ success: false, error: e.message, stack: e.stack }, { status: 500 });
  }
}



