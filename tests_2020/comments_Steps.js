const {Given, When, Then} = require('@cucumber/cucumber');
const {commentsResponseFields} = require('./src/constants.js');

Then(/^comments response fields are populated$/, () => {
    responseUtils.verifyFieldsArePopulated(commentsResponseFields.mandatory, response.data.data);
});
