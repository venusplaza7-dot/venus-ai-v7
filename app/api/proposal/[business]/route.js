import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const business = params.business;
  try {
    const filePath = path.join(process.cwd(), 'factory', `${business}.json`);
    if (!fs.existsSync(filePath)) {
      // try allianceplumbing-houston without dash variant
      const altPath = path.join(process.cwd(), 'factory', 'allianceplumbing-houston.json');
      if (fs.existsSync(altPath)) {
        return Response.json({ found: true,...JSON.parse(fs.readFileSync(altPath, 'utf8')) });
      }
      return Response.json({ found: false });
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Response.json({ found: true,...data });
  } catch (e) {
    return Response.json({ found: false, error: e.message });
  }
}


