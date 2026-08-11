import express from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
const router = express.Router()

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/resume', resumeRoutes);
// test
router.post("/resume/status", (req, res) => {
res.write(JSON.stringify({
  stage: "parsing",
  message: "Parsing resume..."
}) + "\n");

res.write(JSON.stringify({
  stage: "analyzing",
  message: "Analyzing resume..."
}) + "\n");

res.write(JSON.stringify({
  stage: "completed",
  message: "Resume processed successfully"
}) + "\n");

res.end();
});

export default router;