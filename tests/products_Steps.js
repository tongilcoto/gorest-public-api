const {Given, When, Then} = require('@cucumber/cucumber');
const expect = require('expect');
const {productsResponseFields, resources, stepWording} = require('./src/constants.js');

Then(/^products response "(mandatory|all)" fields are populated$/, (fieldsToCheck) => {
    responseUtils.verifyFieldsArePopulated(productsResponseFields.mandatory, response.data.data);
    if (fieldsToCheck === stepWording.ALL) {
        responseUtils.verifyFieldsArePopulated(productsResponseFields.optional, response.data.data);
    }
});

When(/^he assigns a category to the new product$/, async () => {
    global.productId = resourceId;
    [global.categoryId, global.categoryName] = await requestUtils.getRandomCategory();
    global.resourceData = requestUtils.generateResourceData(resources.PRODUCT_CATEGORIES, stepWording.COMPLETE);
    console.log(`New Product - Category link: ${JSON.stringify(resourceData)}`);
    await apiRequests.createResource(resources.PRODUCT_CATEGORIES, resourceData);
    global.resourceId = response.data.data.id;
    global.resourcesList = `${global.resourcesList}${resources.PRODUCT_CATEGORIES}/${global.resourceId}\n`
});

Then(/^the product is updated with the new category$/, async () => {
    await apiRequests.getResource(resources.PRODUCTS, productId);
    const category = response.data.data.categories[0];
    console.log(`Received Product Category: ${JSON.stringify(category)}`);
    expect(category.id).toEqual(categoryId);
    expect(category.name).toEqual(categoryName);
    console.log(`Category update Checked`);
});
