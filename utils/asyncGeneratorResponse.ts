
export async function* asyncGeneratorResponse(currentAction: string) {
    yield {
        stage: "parsing",
        message: currentAction
    };
}

// res.end();