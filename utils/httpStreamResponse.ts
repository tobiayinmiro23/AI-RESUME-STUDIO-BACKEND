import { Response } from "express";

export const httpStreamResponse=(res:Response, currentAction:string)=>{
    res.write(JSON.stringify({
        stage: "parsing",
        message: currentAction
    }) + "\n");
}

// res.end();