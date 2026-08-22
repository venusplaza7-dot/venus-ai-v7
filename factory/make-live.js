const fs=require('fs');
const path=require('path');
const puppeteer=require('puppeteer');

(async () => {
  const file=path.join(__dirname,'clients.txt');
  const urls=fs.readFileSync(file,'utf8').split('\n').map(s=>s.trim()).filter(Boolean);
  console.log('CLIENTS',urls);
  const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});
  const page=await browser.newPage();
  for(let url of urls){
    try{
      await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
      let name=url.split('/')[2].replace('www.','').split('.')[0];
      name=name.charAt(0).toUpperCase()+name.slice(1)+' Houston';
      const slug=url.replace('https://','').replace('http://','').replace('www.','').split('.')[0].toLowerCase()+'-houston';
      fs.writeFileSync(path.join(__dirname,slug+'.json'), JSON.stringify({businessName:name,oldSite:url,autonomous:true},null,2));
      console.log('SAVED '+slug+'.json -> '+name);
    }catch(e){
      console.log('FAIL '+url);
    }
  }
  await browser.close();
  console.log('DONE');
})();



