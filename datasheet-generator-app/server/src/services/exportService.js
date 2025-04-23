
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import puppeteer from 'puppeteer';
export function bomToExcel(tree){
  const rows=[]; const walk=(n,p='1')=>{rows.push({Item:p,PartNumber:n.partNumber,Description:n.description,Qty:n.qty,Material:n.material});n.children.forEach((c,i)=>walk(c,`${p}.${i+1}`));};walk(tree);
  const wb=XLSX.utils.book_new(); const ws=XLSX.utils.json_to_sheet(rows); XLSX.utils.book_append_sheet(wb,ws,'BOM'); const fp=`/tmp/${uuid()}.xlsx`; XLSX.writeFile(wb,fp); return fp; }
export async function bomToPdf(tree){const rows=[];const walk=(n,p='1')=>{rows.push(`<tr><td>${p}</td><td>${n.partNumber}</td><td>${n.description}</td><td>${n.qty}</td><td>${n.material}</td></tr>`);n.children.forEach((c,i)=>walk(c,`${p}.${i+1}`));};walk(tree); const html=`<!DOCTYPE html><html><head><meta charset='utf-8'><style>table{width:100%;border-collapse:collapse;font:12px Arial;}td,th{border:1px solid #ccc;padding:4px;}th{background:#eee;}</style></head><body><h1>Product Datasheet</h1><table><tr><th>Item</th><th>Part Number</th><th>Description</th><th>Qty</th><th>Material</th></tr>${rows.join('')}</table></body></html>`; const browser=await puppeteer.launch({args:['--no-sandbox']}); const page=await browser.newPage(); await page.setContent(html,{waitUntil:'networkidle0'}); const fp=`/tmp/${uuid()}.pdf`; await page.pdf({path:fp,format:'A4'}); await browser.close(); return fp; }
