# Planning & Testing for Part Two

ToC:

- [Database](#Database)
- [Models and Controllers](#Models-and-Controllers)
- [Schema](#Schema)
- [Workflows and Endpoints](#Workflows-and-Endpoints)
- [Development Process](#Development-Process)
- [Testing](#Testing)

---

## Database Design

```
/user_db/
        survey_templates_collection/
        completed_survey_collection/

```

## Schema

A survey is likely to have 10's of questions but not 100's, however their may be 1000's of respondants. With this in mind I feel to go for a completed surveys `collection` and for each completed form to be a `document` with each question/answer being an object within a questions array within the document.

This allows for all the data for completed surveys to be in a single collection making it easier to work with the data. Once created the questions array is a fixed number so will not grow too large and with each respondant creating a new document the scalability to cope with 1000s of respondants is in place.

## Routes

1. `/api/survey_templates`.

2. `/api/completed_surveys`.

## Workflows and Endpoints

---

**Route**: `/api/survey_templates`

**Template Owner**:

- [x] Create new survey template from user input: **POST**`/create`
- [x] Let the user see all their survey templates: **GET**`/all`
- [x] Let the **owner** and **respondant** users see a single survey template: **GET**`/:id`
- [x] Let the user edit their survey templates: **PATCH**`/:id`
- [x] Let the user delete templates: **DELETE**`/:id`

---

**Route**: `/api/completed_surveys`

**Respondant Users**:

- [x] Let the user submit the completed survey: **POST**`/create`

**Owner**:

- [x] Get all surveys of a specific type: **GET**`/all/type`

**Note on above**: In a rudimentary manner I am passing in the `title` value here as the unique identifier to grab completed surveys of that type. I appreciate this should be something like `template_id` which could also then be used as the reference which would allow me to reduce duplicate data across collections.

- [x] Use the list from the above endpoint and let the **owner** dig into individual completed surveys: **GET**`/:id`

## Development Process

1. Make the models

The schemas I have created are currently duplicating some data and need refactoring after some direction.

- [x] `SurveyTemplate.js`
- [x] `CompletedSurvey.js`

2. Create the controllers

- [x] `surveyTemplateController.js`
- [x] `completedSurveyController.js`

3. Within `app.js` add the routes to hit the endpoint files in the routes folder

```js
app.use("/api/survey_templates", require("./routes/surveyTemplates"));
app.use("/api/completed_surveys", require("./routes/completedSurveys"));
```

4. Add endpoints to the routes folder (Task list within `Workflows & Endpoints` section above)

## Testing

- [x] research and model some relevant best practices
- [x] Set Jest up in the project and folder structure for tests
- [x] Create list of unit tests for each file
- [ ] Create simple tests that test the main areas of the app

---

### Initial setup

**Structure**: I am not sure the best way to structure test folders and files for large projects but have opted to go for a separate `__test__` folder to keep the main project less cluttered and then to organise test files in folders that mirror the main project to make it easy to find individual test files.

1. Add Jest: `npm i --save-dev jest`
2. Edit the package.json file to use jest when running test commands:

```js
"scripts": {
    "test": "jest --coverage",
```

Adding `--coverage` to the above provides an organised view of all tests within the terminal and also creates an html report file to easily view test results.

- To runs tests: `npm test`

### Tests

A list of simple unit tests that check the basics of each moving part of the application.

#### Routes:

**surveyTemplates.js & completedSurveys.js**:

Write individual tests for each route, passing in dummy data to POST requests, providing an id where required:

- if response status equals 200: `pass`, if 500: `fail`

#### Controllers:

**surveyTemplateController.js**:

1. `PostNewSurvey()`: check to see if the passed in data is equal to the returned dbEntry: true = `pass`, false = `fail`

2. `retrieveAllSurveys()`: Check to see if the returned item is an array. It would also be nice to check if the length of the array matches the db.

3. `retrieveSurvey()`: Check if `survey` has a value and if the `_id` is equal to the `_id` passed in: true = `pass`, false = `fail`

4. `updateSurvey()`: A more detailed test to first PATCH an update to a test survey and then make a GET request using the `_id` to check if the value of the updated data passed in matches the value for the property of the fetched survey: true = `pass`, false = `fail`

5. `deleteSurvey()`: Use a test survey and delete it using its `_id`, then attempt to GET the same survey using the same `_id`. An empty array is a `pass`, an array that has a length is a `fail`

**completedSurveysController.js**:

1. `postCompletedSurvey()`: check to see if the passed in data is equal to the returned dbEntry: true = `pass`, false = `fail`

2. `retrieveAllSurveyType()`: Check to see if the returned item is an array. It would also be nice to check if the length of the array matches the db.

3. `retrieveSurvey()`: Check if `survey` has a value and if the `_id` is equal to the `_id` passed in: true = `pass`, false = `fail`

#### Models:

I would like to test if the data saved to the `completed_surveys` documents is saved as an allowed data type.
This is new to me and I have attempted to allow answers to be multiple data types by the use of an array. This may not be quite right and a good area to drill into.
