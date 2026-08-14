import express from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
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
          content: "My name is Tobi and I am 25 years old."
        }
      ],

      response_format: {
        type: "json_schema",

        json_schema: {
          name: "test_schema",
          strict: true,
          schema: testSchema
        }
      }
    })
  }
);

const data = await response.json();

console.log(JSON.stringify(data, null, 2));
})


export default router;