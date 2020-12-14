const {Given, When, Then} = require('@cucumber/cucumber');
const {postsResponseFields} = require('./src/constants.js');

Then(/^posts response fields are populated$/, () => {
    responseUtils.verifyFieldsArePopulated(postsResponseFields.mandatory, response.data.data);
});
