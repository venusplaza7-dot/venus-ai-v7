import nodemailer from "nodemailer";
export async function POST(req: Request) {
  const body = await req.json().catch(()=>({})) as any;
  if (body.secret !== "venus_hq_2024") return Response.json({error:"Unauthorized"},{status:401});
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER!, pass: process.env.GMAIL_APP_PASSWORD! },
    });
    // SEND TO YOU RIGHT NOW - PROOF
    const info = await transporter.sendMail({
      from: `"Venus Plaza" <${process.env.GMAIL_USER}>`,
      to: `${process.env.GMAIL_USER}`, // sends to YOURSELF
      subject: `🔥 LIVE TEST ${new Date().toISOString()} - Agent Working NOW`,
      html: `<h1>Agent is LIVE at ${new Date().toLocaleString()}</h1><p>If you get this, hourly sending works. Next step: Sylvia's 50 real Houston leads.</p>`,
    });
    return Response.json({status:"SENT NOW", messageId: info.messageId, to: process.env.GMAIL_USER, time: new Date().toISOString()});
  } catch (e:any) {
    return Response.json({status:"FAILED", error: e.message, stack: e.toString()}, {status:500});
  }
}




