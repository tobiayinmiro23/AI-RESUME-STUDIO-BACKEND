import fs from "fs/promises"
import dotenv from "dotenv";
import path from 'path';
import { PDFParse, TextResult } from "pdf-parse";

dotenv.config();


async function getPdfContent(pdfPath: string): Promise<TextResult> {
  const buffer = await fs.readFile(pdfPath);
  const parser = new PDFParse({
    data: buffer, 
  });
  const result = await parser.getText();
  await parser.destroy();
  return result
}
  
export const getResumeDetail = async()=>{
  const pdfPath = path.join(__dirname, '../uploads/1785230040147-Ayinmiro Tobi B E.pdf');
  const content = await getPdfContent(pdfPath);
  try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // model: 'openrouter/auto-beta', 
          model: 'inclusionai/ling-3.0-flash:free', 
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text:`Extract all readable text from this resume give a brief overview/ summary of the readable text, the summary must not be more than 12 lines resume: ${content.text}` ,
                },
              ],
            },
          ],
        }),
      });
      console.log(response)
    if(!response.ok){
      return {
        success:false,
        message:"an error occured"
      }
  }
      const data = await response.json();
    return data;

  } catch (error:any) {
    console.log(error)
    return {
        success:false,
        message:error.message || "an error occured"
      }
  }
}


