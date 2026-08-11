import express from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
const router = express.Router()

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/resume', resumeRoutes);
// test
router.post("/resume/status", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    res.write(`event: progress
data: ${JSON.stringify({
        stage: "parsing",
        message: "Parsing resume..."
    })}

`);

    setTimeout(() => {
        res.write(`event: progress
data: ${JSON.stringify({
            stage: "analyzing",
            message: "Analyzing resume..."
        })}

`);
    }, 2000);

    setTimeout(() => {
        res.write(`event: complete
data: ${JSON.stringify({
            success: true
        })}

`);

        res.end();
    }, 5000);
});

export default router;