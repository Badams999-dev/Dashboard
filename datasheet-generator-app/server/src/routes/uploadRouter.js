
import { Router } from "express";
import pdfParser from "../parsers/pdfParser.js";
import ocrParser from "../parsers/ocrParser.js";
import stepParser from "../parsers/stepParser.js";
import mergeBom from "../services/mergeBom.js";

const router = Router();
router.post("/", async (req, res) => {
  try {
    const files = Object.values(req.files || {});
    const pdfs = files.filter(f=>f.mimetype==='application/pdf');
    const images = files.filter(f=>f.mimetype.startsWith('image/'));
    const steps = files.filter(f=>f.mimetype==='model/step' || f.name.endsWith('.step') || f.name.endsWith('.stp'));
    const pdfRows = await pdfParser(pdfs);
    const ocrRows = await ocrParser(images);
    const stepTree = await stepParser(steps);
    const bom = mergeBom(pdfRows, ocrRows, stepTree);
    res.json(bom);
  } catch(e) {
    console.error(e);
    res.status(500).json({error:"parse-failure"});
  }
});
export default router;
