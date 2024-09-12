const mongoose = require("mongoose");

const { Schema } = mongoose;

const CompletedSurveySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
      maxlength: 50,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
          maxlength: 50,
        },
        answer: {
          type: ["string", "boolean", "number"],
          maxlength: 100,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

module.exports = mongoose.model("CompletedSurvey", CompletedSurveySchema);
