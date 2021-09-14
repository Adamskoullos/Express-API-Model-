# Planning for Part 2

## Criteria

1. Design and create the database schema
2. Build out the endpoints

## Database

Thinking about how to structure the db I feel drawn to having at least one collection for a users survey templates and another for completed surveys. An example below:

```
/user_db/
        survey_templates_collection/
        completed_survey_collection/

```

## Model & Controllers

1. Schema, model and controller for the templates collection via the route: `/api/survey_templates`.

2. Schema, model and controller for the completed surveys collection via route: `/api/completed_surveys`.

## Schema

A survey is likely to have 10's of questions but not 100's, however their may be 1000's of respondants. With this in mind I feel to go for a completed surveys `collection` and for each completed form to be a `document` with each question/answer being an object within a questions array within the document.

This allows for all the data for completed surveys to be in a single collection making it easier to work with the data. Once created the questions array is a fixed number so will not grow too large and with each respondant creating a new document the scalability to cope with 1000s of respondants is in place.

## Workflows & Endpoints

---

**Route**: `/api/survey_templates`

**Template Owner**:

- [x] Create new survey template from user input: **POST**`/create`
- [x] Let the user see all their survey templates: **GET**`/all`
- [x] Let the **owner** and **respondant** users see a single survey template: **GET**`/{id}`
- [x] Let the user edit their survey templates: **PATCH**`/{id}`
- [x] Let the user delete templates: **DELETE**`/{id}`

---

**Route**: `/api/completed_surveys`

**Respondant Users**:

- [x] Let the user submit the completed survey: **POST**`/create`

**Owner**:

- [x] Get all surveys of a specific type: **GET**`/all/type` // This should really be `/all/{template_id}`
- [x] Use the list from the above endpoint and let the **owner** dig into individual completed surveys: **GET**`/{id}`

**Both Owner and Respondant users**:

Only basic metrics can be provided as the logic needs to allow for different survey templates. However some amazing work can be done here for say an initial customer onboarding survey for internal use by CP+R as all data points would be known and fixed. This data could then be used on the front end in conjunction with a graph library.
CP+R has massive potential to add value in this area with interactive user analytics.

- [ ] Get survey report: **GET**`/analysis/{title}` // This should really be `/analysis/{template_id}`

**Note**: Come back to the above should there be time after adding some tests:

- Add dummy data file of completed surveys
- Add them to the db on initial load ready to use
- Create analysis logic and return the computed data

This could be saved to a separate schema/collection but for now just send to the browser

## Development Process

1. Make the models --------------------------------------------------

**Note**: I feel I should be extending the `Survey_Template` schema to create the the `Completed_Surveys` schema but cannot so far find a pattern for this. I have found a mongoose plugin that does this but didn't want to rush into adding further dependencies without direction first as there is probably a better way.

- [x] `SurveyTemplate.js`
- [x] `CompletedSurvey.js`

2. Create the controllers ---------------------------------------------------------

- [x] `surveyTemplateController.js`
- [x] `completedSurveyController.js`

3. Within `app.js` add the routes to hit the endpoint files in the routes folder -------------------------

```js
app.use("/api/survey_templates", require("./routes/surveyTemplates"));
app.use("/api/completed_surveys", require("./routes/completedSurveys"));
```

4. Add endpoints to the routes folder (Task list within `Workflows & Endpoints` section above)

## Testing

- [x] research and model some relevant best practices
- [x] Set Jest up in the project and folder structure for tests
- [ ] Create list of unit tests for each file
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

### Core test patterns and best practices:

After scanning the docs, there is no point making pattern notes as it is really well presented in the docs.

### Create list of tests for each file
