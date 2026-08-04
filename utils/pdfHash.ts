import { createHash } from "crypto";
import { createReadStream } from "fs";
import { AppError } from "./appError";

export function hashPdf(filePath: string): Promise<string> {
  try{
      return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);
    stream.on("data", (chunk) => {
      hash.update(chunk);
    });
    stream.on("end", () => {
      resolve(hash.digest("hex"));
    });
    stream.on("error", (error) => {
    reject(
        new AppError(
            `Failed to hash PDF: ${error.message}`,
            500
        )
    );
});
  });
  }catch(error){
    console.log("pdf hash error")
    throw new AppError(`Failed to hash PDF: ${error instanceof Error ? error.message : "Unknown error"}`, 500);
  }
}