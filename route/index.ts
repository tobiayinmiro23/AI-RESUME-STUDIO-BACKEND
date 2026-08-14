import express from "express";
import authRoutes from "./authRoutes";
import resumeRoutes from "./resumeRoutes";
const router = express.Router()

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/resume', resumeRoutes);
router.use("/api/v1/test",(req,res)=>{
 const testSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    age: {
      type: "number"
    }
  },
  required: ["name", "age"],
  additionalProperties: false
};
})


export default router;