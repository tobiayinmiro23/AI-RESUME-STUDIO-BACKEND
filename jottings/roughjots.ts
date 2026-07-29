

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

// export const getResumeDetail = async()=>{
//     // async function encodePDFToBase64(pdfPath: string): Promise<string> {
//     //   const pdfBuffer = await fs.readFile(pdfPath);
//     //   const base64PDF = pdfBuffer.toString('base64');
//     //   return `data:application/pdf;base64,${base64PDF}`;
//     // }

// // Read and encode the PDF

//   const pdfPath = path.join(__dirname, '../uploads/1785230040147-Ayinmiro Tobi B E.pdf');
//   const content = await getPdfContents(pdfPath);
//   try {
//       const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           // model: 'openrouter/auto-beta', 
//           model: 'inclusionai/ling-3.0-flash:free', 
//           messages: [
//             {
//               role: 'user',
//               content: [
//                 {
//                   type: 'text',
//                   text:`Extract all readable text from this resume give a brief overview/ summary of the readable text, the summary must not be more than 12 lines resume: ${content.text}` ,
//                 },
//                 // {
//                 //   type: 'file',
//                 //   file: {
//                 //     filename: '1785230040147-Ayinmiro Tobi B E.pdf',
//                 //     file_data: base64PDF,
//                 //   },
//                 // },
//               ],
//             },
//           ],
//           // Optional: Configure PDF processing engine
//           // PDF parsing will still work even if the plugin is not explicitly set
//           // plugins: [
//           //   {
//           //     id: 'file-parser',
//           //     pdf: {
//           //       engine: 'cloudflare-ai', // defaults to "mistral-ocr". See Pricing above
//           //     },
//           //   },
//           // ],
//         }),
//       });
//       console.log(response)
//     if(!response.ok){
//       return {
//         success:false,
//         message:"an error occured"
//       }
//   }
//       const data = await response.json();
//     return data;

//   } catch (error:any) {
//     console.log(error)
//     return {
//         success:false,
//         message:error.message || "an error occured"
//       }
//   }
// }


//  this endpoint is not free
export const getResumeDetailsWithUrl = async()=>{
   try {
             const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
    body: JSON.stringify({
    model: 'inclusionai/ling-3.0-flash:free', 
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'give a 5 line summary of this pdf file',
          },
          {
            type: 'file',
            file: {
              filename: '1785230040147-Ayinmiro Tobi B E.pdf',
              file_data: 'https://raw.githubusercontent.com/tobiayinmiro23/AI-RESUME-STUDIO-BACKEND/main/uploads/1785230040147-Ayinmiro%20Tobi%20B%20E.pdf',
            },
          },
        ],
      },
    ],
    // Optional: Configure PDF processing engine
    // plugins: [
    //   {
    //     id: 'file-parser',
    //     pdf: {
    //       engine: 'mistral-ocr',
    //     },
    //   },
    // ],
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