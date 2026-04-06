import mongoose from "mongoose";

const atsResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: "Untitled Resume" },
    resumeId: { type: String },
    metrics: {
      keywordsMatch: { type: Number, default: 0 },
      readability: { type: Number, default: 0 },
      formatting: { type: Number, default: 0 },
      sections: { type: Number, default: 0 },
    },
    ats: {
      score: { type: Number, default: 0 },
      suggestions: [String],
      improvements: [String],
      interviewQuestions: [String],
    },
  },
  { timestamps: true, minimize: false },
);


const AtsResume = mongoose.models.ATS || mongoose.model("ATS", atsResumeSchema);



export default AtsResume;