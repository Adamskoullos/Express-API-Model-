const mongoose = require("mongoose");

const { Schema } = mongoose;

const SurveyTemplateSchema = new Schema(
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
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

module.exports = mongoose.model("SurveyTemplate", SurveyTemplateSchema);
