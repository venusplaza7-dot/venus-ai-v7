import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json().catch(()=>({})) as any;
  if (body.secret !== "venus_hq_2024") return Response.json({error:"Unauthorized"},{status:401});

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER!, pass: process.env.GMAIL_APP_PASSWORD! },
    });

    // VERIFY CONNECTION
    await transporter.verify();

    const testEmail = "ve9us1@gmail.com";
    
    const info = await transporter.sendMail({
      from: `"Venus Plaza - Luxury Websites" <${process.env.GMAIL_USER}>`,
      to: testEmail,
      subject: `Your Custom Luxury Proposal - ${new Date().toLocaleDateString()}`,
      html: `
      <div style="font-family:Arial,sans-serif;background:#0a0a0a;padding:40px;color:#fff">
        <h1 style="color:#d4af37;letter-spacing:8px;text-align:center;border:2px solid #d4af37;padding:20px">VENUS PLAZA</h1>
        <div style="max-width:600px;margin:30px auto;background:#151515;padding:30px;border-left:4px solid #d4af37">
          <h2 style="color:#fff">Hi, team at ${testEmail.split('@')[0]}</h2>
          <p style="color:#ccc;line-height:1.8">I audited your current site and rebuilt it as a $15,000 luxury experience. This is not a template - custom animations, SEO, and booking system included.</p>
          <p style="color:#fff;font-weight:bold">Live Preview Ready:</p>
          <a href="https://venus-agent-hq.vercel.app/p/demo" style="display:inline-block;background:#d4af37;color:#000;padding:16px 32px;text-decoration:none;font-weight:bold;margin:20px 0">VIEW YOUR PROPOSAL →</a>
          <p style="color:#888;font-size:13px">This is Sylvia - Lead Scraper Agent from Venus Plaza. We are taking only 3 luxury clients in Houston this week.</p>
          <p style="color:#d4af37">Reply to this email or WhatsApp: +1 (786) 588-0578</p>
        </div>
        <p style="text-align:center;color:#555;font-size:11px">Venus Plaza | Houston, TX | Autonomous Agent System LIVE</p>
      </div>
      `,
    });

    return Response.json({
      status: "REAL WORK STARTED - TEST SENT",
      to: testEmail,
      messageId: info.messageId,
      gmailUser: process.env.GMAIL_USER,
      next: "Now change to 50 real Houston leads - agents find them every hour",
      timestamp: new Date().toISOString()
    });

  } catch (e: any) {
    return Response.json({ status: "FAILED", error: e.message, full: e.toString() }, { status: 500 });
  }
}

