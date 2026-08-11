import { Response } from "express";

export const httpStreamResponse=(res:Response)=>{
    res.write(JSON.stringify({
        stage: "parsing",
        message: "Parsing resume..."
    }) + "\n");
}

// res.end();