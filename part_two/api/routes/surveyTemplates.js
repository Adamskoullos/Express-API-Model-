const express = require("express");
const {
  postNewSurvey,
  retrieveAllSurveys,
  retrieveSurvey,
  updateSurvey,
  deleteSurvey,
} = require("../controllers/surveyTemplateController");
const Survey = require("../models/SurveyTemplate");

const router = express.Router();

const dummySurvey = {
  title: "Survey One",
  description: "This is the first test of the schema",
  questions: [
    {
      question: "How many eyes have you got?",
      answer_num: null,
    },
    {
      question: "Have you got a nose?",
      answer_boolean: null,
    },
  ],
};

router.post("/create", async (req, res) => {
  try {
    const newSurvey = await postNewSurvey(dummySurvey);
    return res.status(200).send(newSurvey);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.get("/all", async (_, res) => {
  try {
    const allSurveys = await retrieveAllSurveys();
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

const dummyUpdateData = {
  title: "Survey Two",
  description: "This is the updated dummy survey",
  questions: [
    {
      question: "What is your favourite color?",
      answer_string: "",
    },
  ],
};

router.patch("/:id", async (req, res) => {
  try {
    const survey = await updateSurvey(req.params.id, dummyUpdateData);
    return res.status(200).send(survey);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const survey = await deleteSurvey(req.params.id);
    return res.status(200).send(survey);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = router;
