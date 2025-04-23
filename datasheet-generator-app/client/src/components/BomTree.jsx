
import React from 'react';
export default function BomTree({node,depth=0}){
  return (<div style={{marginLeft:depth*20}}>
    <div><strong>{node.partNumber}</strong> – {node.description} (x{node.qty})</div>
    {node.children && node.children.map((c,i)=><BomTree key={i} node={c} depth={depth+1}/>)}
  </div>);
}
