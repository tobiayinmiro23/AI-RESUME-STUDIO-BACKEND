import fs from "fs"
import dotenv from "dotenv";
dotenv.config();

// fetch request example
const resumeFormat = async () => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "your-selected-model",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
              Extract this resume into JSON.

              Return:
              - name
              - email
              - phone
              - summary
              - experience
              - education
              - skills
              - projects
              - certifications

              Do not invent information that is not present.
            `,
          },
          {
            type: "file",
            file: {
              filename: "resume.pdf",
              fileData: "https://your-storage.com/resume.pdf",
            },
          },
        ],
      },
    ],
  }),
});
}

export const promptTest = async()=>{
  try {
    let response=await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': '<YOUR_SITE_URL>',
        'X-Title': '<YOUR_SITE_NAME>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b:free',
        messages: [
          {
            role: 'user',
            content: 'What is the meaning of life?',
          },
        ],
      }),
    })
    if(!response.ok){
      return {
        success:false,
        message:"an error occured"
      }
  }
      const data = await response.json();


    return data;
  } catch (error:any) {
    return {
        success:false,
        message:error.message || "an error occured"
      }
  }
}

export const getResumeDetail = async()=>{
    async function encodePDFToBase64(pdfPath: string): Promise<string> {
  const pdfBuffer = await fs.promises.readFile(pdfPath);
  const base64PDF = pdfBuffer.toString('base64');
  return `data:application/pdf;base64,${base64PDF}`;
}

// Read and encode the PDF
const pdfPath = '../uploads/1785230040147-Ayinmiro Tobi B E.pdf';
const base64PDF = await encodePDFToBase64(pdfPath);

  try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/gemma-3-27b-it',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'What are the main points in this document?',
          },
          {
            type: 'file',
            file: {
              filename: 'document.pdf',
              file_data: base64PDF,
            },
          },
        ],
      },
    ],
    // Optional: Configure PDF processing engine
    // PDF parsing will still work even if the plugin is not explicitly set
    plugins: [
      {
        id: 'file-parser',
        pdf: {
          engine: 'cloudflare-ai', // defaults to "mistral-ocr". See Pricing above
        },
      },
    ],
  }),
});

  if(!response.ok){
      return {
        success:false,
        message:"an error occured"
      }
  }
      const data = await response.json();
    return data;

  } catch (error:any) {
    return {
        success:false,
        message:error.message || "an error occured"
      }
  }
}