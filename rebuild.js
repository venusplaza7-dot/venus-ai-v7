const fs=require('fs');
let d=['stellarhomes.com','peakfitgym.com','blossomcafe.net','techvortex.io','urbanroast.co','lumina-design.com','coastalretreat.com','apexmotors.net','greenleafspa.com','ironcladsecurity.io'];
let sites=[];
for(let i=0;i<500;i++){let base=d[i%10];let dom=base.replace('.',i+'.');sites.push({id:i+1,business:'Business '+(i+1),domain:dom,email:'contact@'+dom,url:'https://'+dom})}
fs.writeFileSync('public/site500.json',JSON.stringify(sites,null,2));
console.log('DONE',sites.length);
