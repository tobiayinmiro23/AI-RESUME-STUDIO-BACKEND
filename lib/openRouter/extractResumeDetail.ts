import dotenv from "dotenv";
import {resumeContentExtractorPrompt} from "../../aiCallInformation/AI-Resume-Content-Extractor/aiContentExtractorPrompt";
import {resumeDataSchema} from "../../aiCallInformation/AI-Resume-Content-Extractor/resumeDataSchema";
import { AppError } from "../../utils/appError";
dotenv.config();



export const getResumeDetail = async(content:string)=>{
  
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
              role: "system",
              content: resumeContentExtractorPrompt
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text:content,
                },
              ],
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "resume_extraction",
              strict: true,
              schema: resumeDataSchema
            }
          }
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
  } catch (error) {
    console.log(error)
    if (error instanceof AppError) throw error;
      throw new AppError("Unable to communicate with the AI service, try again later",500);
  }
}


