import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const otpSchema = new Schema(
  {
    email: { type: String, required: true },
    codeHash: { type: String, required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true } // gives you createdAt/updatedAt for free, informational only
);

export type User = InferSchemaType<typeof userSchema>;
export type Otp = InferSchemaType<typeof otpSchema>;

export const UserModel = model<User>("User", userSchema);
export const OtpModel = model<Otp>("Otp", otpSchema);