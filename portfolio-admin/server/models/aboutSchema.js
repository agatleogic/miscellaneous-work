import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    seotitle: {
      type: String,
      required: true,
    },
    seodescription: {
      type: String,
      required: true,
    },
    seoTags: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    years: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    feedbackProvider: {
      type: String,
      required: true,
    },
    designation: {
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

export default mongoose.model("Abouts", aboutSchema);
