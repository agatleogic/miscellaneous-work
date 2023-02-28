import mongoose from "mongoose";

const ServicesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shortdescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    texteditor: {
      type: String,
    },
  },
  { timestamps: true }
);

mongoose.models = {};

export default mongoose.model("Services", ServicesSchema);