import express, { Request, Response } from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
import { resumeContentExtractorPrompt } from "../aiCallInformation/AI-Resume-Content-Extractor/aiContentExtractorPrompt";
import { resumeDataSchema } from "../aiCallInformation/AI-Resume-Content-Extractor/resumeDataSchema";
import { AppError } from "../utils/appError";
import { resumeContent as content } from "../aiCallInformation/AI-Resume-Content-Extractor/parsedResume";
const router = express.Router()

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/resume', resumeRoutes);
 
router.use("/api/v1/test",async (req:Request,res:Response)=> {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // model: "openai/gpt-oss-20b:free",
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: resumeContentExtractorPrompt
            },
            {
              role:"user",
              content: `
                RESUME CONTENT:${content} JSON SCHEMA:${JSON.stringify(resumeDataSchema, null, 2)}`.trim(),
            }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "resume_extraction",
              strict: true,
              schema: resumeDataSchema,
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new AppError(
        data.error?.message ??
          data.message ??
          response.statusText ??
          "AI request failed.",
        response.status
      );
    }
     res.json(data);
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError("Unable to communicate with the AI service, try again later", 500);
  }
})


export default router;