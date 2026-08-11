import { Response } from "express";

export const asyncGeneratorResponse=(res:Response, currentAction:string)=>{
    res.write(JSON.stringify({
        stage: "parsing",
        message: currentAction
    }) + "\n");
}

// res.end();