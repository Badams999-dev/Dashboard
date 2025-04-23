
import pdf from 'pdf-parse';
import fs from 'fs/promises';

export default async function pdfParser(files=[]){
  const rows=[];
  for(const f of files){
    const data=await fs.readFile(f.tempFilePath);
    const { text } = await pdf(data);
    const lines=text.split(/\n/).map(l=>l.trim());
    const idx=lines.findIndex(l=>/part.*qty/i.test(l));
    if(idx<0) continue;
    for(let i=idx+1;i<lines.length;i++){
      const l=lines[i];
      if(!l) break;
      const m=l.match(/^(\d+)\s+([\w\-\.]+)\s+(.+?)\s+(\d+|AR)(.*)$/);
      if(m){
        rows.push({item:m[1],partNumber:m[2],description:m[3],qty:m[4],material:m[5]||''});
      }
    }
  }
  return rows;
}
