import dotenv from "dotenv";
dotenv.config();

// fetch request example
const getResumeDetails = async () => {
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

const promptTest=()=>{
  fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'HTTP-Referer': '<YOUR_SITE_URL>',
    'X-Title': '<YOUR_SITE_NAME>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openai/gpt-4o',
    messages: [
      {
        role: 'user',
        content: 'What is the meaning of life?',
      },
    ],
  }),
});
}