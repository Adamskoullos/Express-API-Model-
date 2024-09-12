const Survey = require("../models/SurveyTemplate");

const postNewSurvey = async (survey) => {
  try {
    const newSurvey = new Survey({ ...survey });
    const dbEntry = await newSurvey.save();
    return dbEntry;
  } catch (err) {
    throw new Error(err);
  }
};

const retrieveAllSurveys = async () => {
  try {
    const allSurveys = await Survey.find({});
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

const updateSurvey = async (id, newData) => {
  try {
    const survey = await Survey.findOneAndUpdate({ _id: id }, newData);
    return survey;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteSurvey = async (id) => {
  try {
    const survey = await Survey.findOneAndDelete({ _id: id });
    return survey;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  postNewSurvey,
  retrieveAllSurveys,
  retrieveSurvey,
  updateSurvey,
  deleteSurvey,
};
