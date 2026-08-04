import { unlink } from "fs/promises";

export async function deleteUploadedFile(filePath: string) {
  try {
    await unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete file: ${filePath}`, error);
  }
}