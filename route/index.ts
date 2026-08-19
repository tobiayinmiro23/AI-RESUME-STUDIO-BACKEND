import express from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
import { resumeDataSchema } from "../aiCallInformation/AI-Resume-Content-Extractor/resumeDataSchema";
const router = express.Router()

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/resume', resumeRoutes);
router.use("/api/v1/test",async (req,res)=>{
 const testSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    age: {
      type: "number"
    }
  },
  required: ["name", "age"],
  additionalProperties: false
    };

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
          role: "user",
          content: `Your task is to extract information from the provided resume.

You MUST populate the schema using information found in the resume.

Do NOT return empty arrays when the resume contains information
for that section.

Do NOT invent information.

If a field is not present in the resume, use an appropriate
empty value.

For example:
- Missing string → ""
- Missing number → 0
- Missing boolean → false
- Missing array → []

For experience, education, skills, and projects:
extract every relevant item found in the resume.

"organization" = company/employer
"position" = job title
"description" = responsibilities and achievements
"qualification" = degree/certificate
"fieldOfStudy" = course/major

Calculate yearsOfExperience from the employment history when
the resume provides enough information to do so. Do not invent
experience.
`
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "test_schema",
          strict: true,
          schema: resumeDataSchema
        }
      }
    })
  }
);
console.log(response)
const data = await response.json();

console.log(JSON.stringify(data, null, 2));
res.json(data)
})


export default router;