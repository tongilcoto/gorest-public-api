const {After} = require('@cucumber/cucumber');
const fs = require('fs') 

After({tags: "@newResourceId"}, () => {
    fs.appendFileSync(newResourcesListFile, global.resourcesList);
});
