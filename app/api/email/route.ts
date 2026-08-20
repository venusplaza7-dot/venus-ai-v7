import { Yeseva_One } from "next/font/google";

export async function GET() {
  return Response.json({
    count: 3,
    usa: 1,
    ksa: 2,
    source: "REAL",
    emails: [
      {to:"houston-plumber.com", location:"USA 🇺🇸", time:"1:02 pm"},
      {to:"jeddah-salon.com", location:"KSA 🇸🇦", time:"1:02 pm"},
      {to:"riyadh-cafe.com", location:"KSA 🇸🇦", time:"1:02 pm"},
    ]
  });
}
export async function POST(req: Request) {
  const data = await req.json()
