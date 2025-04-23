
import StepFile from 'step-file-parser';
export default async function stepParser(steps=[]){
  if(!steps.length) return {partNumber:'ROOT',description:'',children:[]};
  const ast= await StepFile.parse(steps[0].tempFilePath);
  const walk=n=>({partNumber:n.attributes?.id||n.name,description:n.name,children:(n.children||[]).map(walk)});
  return walk(ast.root);
}
