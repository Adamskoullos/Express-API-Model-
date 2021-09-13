const express = require("express");
const {
  postCompletedSurvey,
  retrieveAllSurveyType,
  retrieveSurvey,
} = require("../controllers/completedSurveyController");
// const Survey = require("../models/CompletedSurvey");

const router = express.Router();

const dummySurvey = {
  title: "Survey One",
  description: "This is the first test of the schema",
  questions: [
    {
      question: "How many eyes have you got?",
      answer_num: 4,
    },
    {
      question: "Have you got a nose?",
      answer_boolean: true,
    },
  ],
};

router.post("/create", async (req, res) => {
  try {
    const newSurvey = await postCompletedSurvey(dummySurvey);
    return res.status(200).send(newSurvey);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

const title = dummySurvey.title;

router.get("/all/type", async (_, res) => {
  try {
    const allSurveys = await retrieveAllSurveyType(title);
    return res.status(200).send(allSurveys);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const survey = await retrieveSurvey(req.params.id);
    return res.status(200).send(survey);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
