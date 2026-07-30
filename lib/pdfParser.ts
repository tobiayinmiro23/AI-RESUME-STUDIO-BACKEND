import { PDFParse, TextResult } from "pdf-parse";
import fs from "fs/promises"

export async function getPdfContent(pdfPath: string): Promise<TextResult> {
  const buffer = await fs.readFile(pdfPath);
  const parser = new PDFParse({
    data: buffer, 
  });
  const result = await parser.getText();
  await parser.destroy();
  return result
}
  