import express from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
import { resumeDataSchema } from "../aiCallInformation/AI-Resume-Content-Extractor/resumeDataSchema";
import { AppError } from "../utils/appError";
import { resumeContent as content } from "../aiCallInformation/AI-Resume-Content-Extractor/parsedResume";
const router = express.Router()

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/resume', resumeRoutes);
 const getResumeDetail = async () => {
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
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "system",
              content: `
                You are a resume information extraction system.

                Extract information from the resume and return data that strictly
                matches the provided JSON schema.

                Do not invent information.

                If information is missing:

                - string → ""
                - number → 0
                - boolean → false
                - array → []

                Do not return empty arrays if relevant information exists in the resume.

                For experience, education, skills, and projects, extract every
                relevant item found in the resume.

                "organization" means company/employer.
                "position" means job title.
                "description" contains responsibilities and achievements.
                "qualification" means degree/certificate.
                "fieldOfStudy" means course/major.

                Calculate yearsOfExperience only when the employment history provides
                enough information.
              `.trim(),
            },
            {
              role: "user",
              content: `RESUME CONTENT:${content}`,
            },
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
    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError("Unable to communicate with the AI service, try again later",500);
  }
};
router.use("/api/v1/test",getResumeDetail)


export default router;