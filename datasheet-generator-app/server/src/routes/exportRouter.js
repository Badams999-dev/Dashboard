
import { Router } from "express";
import { bomToExcel, bomToPdf } from "../services/exportService.js";
import fs from "fs";
const router = Router();

router.post("/excel", (req,res)=>{
  const file = bomToExcel(req.body);
  res.download(file, "BOM.xlsx", ()=>fs.unlinkSync(file));
});
router.post("/pdf", async (req,res)=>{
  const file = await bomToPdf(req.body);
  res.download(file, "datasheet.pdf", ()=>fs.unlinkSync(file));
});
export default router;
