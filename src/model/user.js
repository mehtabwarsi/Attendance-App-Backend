import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    attendence: {
      type: Schema.Types.ObjectId,
      ref: "SignTime",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
