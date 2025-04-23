
import React,{useState} from 'react';
import Upload from './components/Upload.jsx';
import BomTree from './components/BomTree.jsx';
import Toolbar from './components/Toolbar.jsx';
export default function App(){
  const [bom,setBom]=useState(null);
  return (<div style={{padding:'1rem',fontFamily:'Arial'}}>
    <h2>Datasheet Generator</h2>
    <Upload onBom={setBom}/>
    {bom && <><Toolbar bom={bom}/><BomTree node={bom}/></>}
  </div>);
}
