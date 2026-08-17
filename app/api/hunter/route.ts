import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

// FAKE DB - Replace with Vercel KV later
let LEADS_DB:any[] = [];

export async function GET(req: Request) {
  const niches = ["roofer", "dentist", "contractor", "plumber"];
  const city = "Houston TX";
  const niche = niches[Math.floor(Math.random()*niches.length)];
  
  // In real: Scrape Google "niche + © 2015-2017"
  // For now: Simulated old sites (you will replace with Apify/Google API)
  const oldSites = [
    { domain: "abc-roofing-houston.com", company: "ABC Roofing", year: 2015, email: "info@abc-roofing-houston.com", phone: "713-555-0101", url: "http://abc-roofing-houston.com" },
    { domain: "best-dentist-houston.com", company: "Best Dental", year: 2016, email: "contact@best-dentist-houston.com", phone: "713-555-0102", url: "http://best-dentist-houston.com" },
  ];

  return NextResponse.json({ 
    success: true, 
    agent: "HUNTER Sylvie", 
    found: oldSites.length, 
    leads: oldSites,
    next: "Designer will build demos"
  });
}

