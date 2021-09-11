## Criteria

1. Design and create the database schema
2. Build out the endpoints

## Schema

A survey is likely to have 10's of questions but not 100's, however their may be 1000's of respondants. With this in mind I feel to go for a `survey collection` and for each completed form to be a `document` with each question/answer being an object within a questions array within the document.

This allows for all the data to be in a single collection making it easier to work with. The questions array is a fixed number so will not grow too large and with each respondant creating a new document the scalability to cope with 1000s of respondants is in place.

1. Make the model --------------------------------------------------

```js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const SurveySchema = new Schema(
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
        answer_string: {
          type: String,
          maxlength: 50,
        },
        answer_boolean: {
          type: Boolean,
        },
        answer_num: {
          type: Number,
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

module.exports = mongoose.model("Survey", SurveySchema);
```

2. Create the controller ---------------------------------------------------------

```js
const Survey = require("../models/Survey");

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

module.exports = { postNewSurvey, retrieveAllSurveys };
```

3. Add the route to hit the endpoints file (survey.js) in the routes folder -------------------------

```js
app.use("/api/survey", require("./routes/survey"));
```

4. Create the endpoints -----------------------------------------------------------------

```js
const express = require("express");
const {
  postNewSurvey,
  retrieveAllSurveys,
} = require("../controllers/surveyController");
const Survey = require("../models/Survey");

const router = express.Router();

router.post("/new_survey", async (req, res) => {
  try {
    // const dummySurvey = { first_name: "John", last_name: "Smith" };
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

module.exports = router;
```
