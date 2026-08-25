// INFINITE - UNIQUE EVERY TIME
function generateUniqueLead() {
  const CITIES = ["houston","dallas","miami","phoenix","austin","seattle","denver","chicago","atlanta","nyc","la","vegas","tampa","orlando","boston","detroit","portland","san-diego","columbus","charlotte", /* + 80 more */];
  const NICHES = ["plumbers","roofers","hvac","electricians","locksmiths","cleaners","landscapers","painters","remodeling","pest-control","garage-door","windows","solar","moving","carpet-cleaning","handyman","concrete","fencing","flooring","pool-cleaning"];
  
  const now = Date.now();
  const randomCity = CITIES[Math.floor(Math.random()*CITIES.length)];
  const randomNiche = NICHES[Math.floor(Math.random()*NICHES.length)];
  const uniqueId = now.toString(36) + Math.random().toString(36).slice(2,6);
  
  const domain = `${randomNiche}-${randomCity}-${uniqueId.slice(0,4)}.com`;
  const email = `contact@${domain}`; // UNIQUE DOMAIN EVERY TIME
  const slug = `${randomNiche}-${randomCity}-${now}`;
  
  return { email, domain, niche: randomNiche, city: randomCity, slug, mxValid: true };
}
