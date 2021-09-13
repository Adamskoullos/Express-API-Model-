const Survey = require("../models/CompletedSurvey");

const postCompletedSurvey = async (survey) => {
  try {
    const newCompletedSurvey = new Survey({ ...survey });
    const dbEntry = await newCompletedSurvey.save();
    return dbEntry;
  } catch (err) {
    throw new Error(err);
  }
};

const retrieveAllSurveyType = async (title) => {
  try {
    const allSurveys = await Survey.find({ title: title });
    return allSurveys;
  } catch (err) {
    throw new Error(err);
  }
};

const retrieveSurvey = async (id) => {
  try {
    const survey = await Survey.find({ _id: id });
    return survey;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  postCompletedSurvey,
  retrieveAllSurveyType,
  retrieveSurvey,
};
