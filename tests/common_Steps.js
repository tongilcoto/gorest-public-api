const {Given, When, Then} = require('@cucumber/cucumber');
const {authmethods, responseStatuses, errorMessages} = require('./src/constants.js');
const expect = require('expect');

Given(/^an "(anonymous|authenticated)" api consumer$/, (authmethod) => {
    global.accessToken = (authmethod === authmethods.AUTHENTICATED) ? `Bearer ${process.env.API_ACCESS_TOKEN}` : null;
});

When(/^he asks for "(first|intermediate|random|last)" page of "(products|users|categories|product-categories|product-categories|posts|comments|todos)"$/, async (page, resource) => {
    global.requestedPage = page;
    await apiRequests.getPage(page, resource);
});

Then(/^he gets a "(SYNCHRONOUS_OK|ASYNCHRONOUS_OK|AUTHENTICATION_KO)" response$/, (status) => {
    expect(response.status).toEqual(responseStatuses.SYNCHRONOUS_OK);
    expect(response.data.code).toEqual(responseStatuses[status]);
    console.log('Response Status Checked');
});

Then(/^the number of items per page matches response meta info$/, () => {
    expect(response.data.data.length).toEqual(responseUtils.getPageExpectedItemsNumber(requestedPage));
    console.log('Items per page follow Limit property Checked');
});

When(/^he deletes a random resource of "(products|users|product-categories|posts|comments|todos)"$/, async (resource) => {
    await apiRequests.deleteResource(resource);
});

Then(/^a "(AUTHENTICATION_KO)" info message$/, (error) => {
    expect(response.data.data.message).toEqual(errorMessages[error]);
    console.log('Authentication Error Checked');
});

Then(/^the resource is still available$/, async () => {
    await requestUtils.verifyResourceByPath(response.request.path);
});

When(/^he creates a new "(complete|only mandatory)" resource of "(products|users|posts|comments|todos)"$/, async (fieldsCondition, resource) => {
    global.resourceData = requestUtils.generateResourceData(resource, fieldsCondition);
    await apiRequests.createResource(resource, resourceData);
    global.resource_id = response.data.data.id
});

Then(/^the new resource is available at location header$/, async () => {
    await requestUtils.verifyResourceByPath(response.headers.location);
});

Then(/^the resource data matches original data$/, async () => {
    expect(responseUtils.getCuratedNumberFields(response.data.data))
        .toMatchObject(responseUtils.getCuratedNumberFields(resourceData));
    console.log('No missing info Checked');
});




