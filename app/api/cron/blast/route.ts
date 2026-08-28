export const dynamic = 'force-dynamic'

export async function GET(req: Request){
  try{
    const url = new URL(req.url)
    const cat = url.searchParams.get('cat') || 'all'

    // Simple working version - no KV import that broke build
    // Will add KV + SERP after this deploy succeeds

    const categories = cat === 'all'? ['roofing','plumbers','hvac','dentists'] : [cat]

    // Call your mine API that already works
    for(let niche of categories){
      try{
        await fetch(`https://venus-ai-v8.vercel.app/api/mine?niche=${niche}&city=houston`, {cache:'no-store'})
      }catch(e){}
    }

    // Call blast API that already works
    let total = 0
    for(let niche of categories){
      try{
        const r = await fetch(`https://venus-ai-v8.vercel.app/api/blast`, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({niche, city:'houston', limit:5})
        })
        const j:any = await r.json()
        total += j.sent || 0
      }catch(e){}
    }

    return Response.json({
      ok:true,
      time: new Date().toISOString(),
      cat,
      categories,
      totalSent: total,
      msg: 'Cron clicked - 5 per category'
    })
  }catch(e:any){
    return Response.json({ok:false, error:e.message}, {status:500})
  }
}
