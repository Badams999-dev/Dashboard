
import React from 'react';
import axios from 'axios';
export default function Toolbar({bom}){
  const dl=(ep,fn)=>async()=>{const {data}=await axios.post(`/api/export/${ep}`,bom,{responseType:'blob'});const url=URL.createObjectURL(new Blob([data]));const a=document.createElement('a');a.href=url;a.download=fn;a.click();};
  return (<div style={{margin:'1rem 0'}}>
    <button onClick={dl('excel','BOM.xlsx')}>Download Excel</button>{' '}
    <button onClick={dl('pdf','datasheet.pdf')}>Download PDF</button>
  </div>);
}
