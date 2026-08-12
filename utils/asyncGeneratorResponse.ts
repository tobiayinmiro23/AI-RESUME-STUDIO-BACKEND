type progress = "error" | "progress" | "complete"
export async function* asyncGeneratorResponse(message: string, type:progress, success:boolean | null=null) {
    yield {
        type,
        success,
        message
    };
}