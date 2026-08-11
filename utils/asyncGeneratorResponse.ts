
export async function* asyncGeneratorResponse(message: string, type:string, success:boolean | null=null) {
    yield {
        type,
        success,
        message
    };
}