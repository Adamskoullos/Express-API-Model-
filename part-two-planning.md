# Planning for Part 2

## Criteria

1. Design and create the database schema
2. Build out the endpoints

## Database

Thinking about how to structure the db I feel drawn to having at least one collection for a users survey templates and another for completed surveys. In the end I feel a more scalable approach would be for completed surveys to have a separate collection for each survey template. An example below:

```
/user_one/
        survey_templates_collection/
        survey_one_collection/
        survey_two_collection/

```

**Note**: I am not sure as yet how to save `completed surveys` to different collections depending on their survey type, so for now there is one collection for completed surveys: `completed_surveys`.

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

- [x] Get all surveys of a specific type: **GET**`/all/type`
- [x] Use the list from the above endpoint and let the **owner** dig into individual completed surveys: **GET**`/{id}`

**Both Owner and Respondant users**:

Only basic metrics can be provided as the logic needs to allow for different survey templates. However some amazing work can be done here for say an initial customer onboarding survey for internal use by CP+R as all data points would be known and fixed. This data could then be used on the front end in conjunction with a graph library.
CP+R has massive potential to add value in this area with interactive user analytics.

- [ ] Get survey report: **GET**`/analysis/{title}`

---

## Development Process

1. Make the models --------------------------------------------------

**Note**: I feel I should be extending the `Survey_Template` schema to create the the `Completed_Surveys` schema but cannot so far find a pattern for this. I have found a mongoose plugin that does this but didn't want to rush into adding further dependencies without direction first as there is probably a better way.

- [x] `SurveyTemplate.js`
- [x] `CompletedSurvey.js`

2. Create the controllers ---------------------------------------------------------

- [x] `surveyTemplateController.js`
- [x] `completedSurveyController.js`

3. Within `app.js` add the routes to hit the endpoints files in the routes folder -------------------------

```js
app.use("/api/survey_templates", require("./routes/surveyTemplates"));
app.use("/api/completed_surveys", require("./routes/completedSurveys"));
```

4. Add endpoints to the routes folders (Task list within `Workflows & Endpoints` section above)

## Testing

- [ ] research and model some relevant best practices
- [ ] create a list of tests that could be done
- [ ] create sudo code of test logic for each test
- [ ] Add testing folder and test workflows (if viable)
