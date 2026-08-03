import { Schema, model, Types } from "mongoose";

const resumeSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    pdfHash: {
      type: String,
      required: true,
    },

    resumeTitle: {
      type: String,
      trim: true,
      default: null,
    },

    extractedText: {
      type: String,
      required: true,
    },

    resumeData: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
resumeSchema.index(
  { userId: 1, pdfHash: 1 },
  { unique: true }
);
export const ResumeModel = model("Resume", resumeSchema);