
export async function* asyncGeneratorResponse(message: string, type:string, success=null) {
    yield {
        type,
        success,
        message
    };
}

// res.end();