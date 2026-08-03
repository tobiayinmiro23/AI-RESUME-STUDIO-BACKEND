import { PDFParse, TextResult } from "pdf-parse";
import fs from "fs/promises"
import { AppError } from "../utils/appError";

export async function getPdfContent(pdfPath: string): Promise<TextResult> {
  try {
    const buffer = await fs.readFile(pdfPath);
    const parser = new PDFParse({
      data: buffer, 
    });
    const result = await parser.getText();
    await parser.destroy();
    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to extract text from PDF.";
    throw new AppError(message, 400);
  }
}
  