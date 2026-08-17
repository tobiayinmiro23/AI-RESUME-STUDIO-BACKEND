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
          content: "Generate an empty resume structure using the provided schema."
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

const data = await response.json();

console.log(JSON.stringify(data, null, 2));
res.json(data)
})


export default router;