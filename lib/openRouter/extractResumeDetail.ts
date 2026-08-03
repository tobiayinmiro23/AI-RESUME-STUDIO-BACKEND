import dotenv from "dotenv";
import { TextResult } from "pdf-parse";

dotenv.config();



export const getResumeDetail = async(content:TextResult)=>{
  
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
        const error = await response.json();
        return {
          success: false,
          message: error.message || "An error occurred"
        };
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


