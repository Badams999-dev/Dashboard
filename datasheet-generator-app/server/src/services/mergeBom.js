
import { v4 as uuid } from 'uuid';
export default function mergeBom(pdfRows=[], ocrRows=[], stepTree){
  if(!stepTree) stepTree={partNumber:'ROOT',description:'',children:[]};
  const cat=[...pdfRows,...ocrRows];
  const byPN=Object.fromEntries(cat.map(r=>[r.partNumber,r]));
  const attach=node=>({id:uuid(),partNumber:node.partNumber,description:byPN[node.partNumber]?.description||node.description||'',qty:byPN[node.partNumber]?.qty||1,material:byPN[node.partNumber]?.material||'',spec:'',children:(node.children||[]).map(attach)});
  return attach(stepTree);
}
