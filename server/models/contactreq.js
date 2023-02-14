import mongoose from "mongoose";

const contactreq = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    ip: {
      type: String,
    },
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("Contactrequests", contactreq);