const {Given, When, Then} = require('@cucumber/cucumber');
const {usersResponseFields} = require('./src/constants.js');

Then(/^users response fields are populated$/, () => {
    responseUtils.verifyFieldsArePopulated(usersResponseFields.mandatory, response.data.data);
});
