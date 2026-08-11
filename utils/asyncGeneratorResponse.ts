
export async function* asyncGeneratorResponse(currentAction: string, processingDone=false) {
    yield {
        processingDone,
        message: currentAction
    };
}

// res.end();