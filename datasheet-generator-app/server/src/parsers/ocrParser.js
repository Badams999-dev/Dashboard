
import { createWorker } from 'tesseract.js';
export default async function ocrParser(images=[]){
  if(!images.length) return [];
  const worker= await createWorker('eng');
  const rows=[];
  for(const img of images){
    const { data:{ text } } = await worker.recognize(img.tempFilePath);
    text.split(/\n/).forEach(l=>{
      const m=l.match(/^(\d+)\s+([\w\-\.]+)\s+(.+?)\s+(\d+|AR)/);
      if(m) rows.push({item:m[1],partNumber:m[2],description:m[3],qty:m[4]});
    });
  }
  await worker.terminate();
  return rows;
}
