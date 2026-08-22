useEffect(() => {
  fetch(`/api/proposal/${slug}`).then(r=>r.json()).then(d=>{
    if(d && d.found) setData(d);
  }).catch(()=>{ setData(null); });
}, [slug]);