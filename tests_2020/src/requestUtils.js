const RandExp = require('randexp');
const {formsForResouce, fieldTypes, stepWording, resources, responseStatuses} = require('./constants.js');
const expect = require('expect');

class RequestUtils {

    /**
     * Creates the appropiate JSON object for a given resource. It creates random data that matches 
     * certain configured conditions. It uses different methods in order to generate the correct data.
     * It works with a list of mandatory fields and a list of optional fields.
     * @param {string} resource: API resource where to send the request to. Supported Values: 
     *  resources.CATEGORIES, resources.PRODUCTS, resources.USERS, resources.PRODUCT_CATEGORIES, 'posts', 
     *  'comments', 'todos'
     * @param {string} fieldsCondition: Indicates the fields list to be generated. Supported Values: 
     *  stepWording.MANDATORY, stepWording.OPTIONAL
     * @param {Object} data: For Optional fields list, it is the current mandatory data (mandatory fields
     *  were already populated)
     * @returns {Object}: populated list of fields
     */
    generateNewResourceInfo(resource, fieldsCondition, data) {
        const form = formsForResouce[resource][fieldsCondition];
        data = data || {};
        for (let field in form) {
            switch (form[field].type) {
                case fieldTypes.REGEXP:
                    data[field] = new RandExp(form[field].value).gen();
                    break;
                case fieldTypes.BOOLEAN:
                    data[field] = Math.random() < 0.5;
                    break;
                case fieldTypes.EVAL: {
                    data[field] = eval(form[field].value);
                    break;
                }
                default:
                    throw new Error(`Field type ${form[field].type} is not supported`);
            }
        }
        return data;
    };

    /**
     * Manages the creation of the appropiate JSON object for a given resource. It creates random data that matches 
     * certain configured conditions. It uses different methods in order to generate the correct data.
     * It works with a list of mandatory fields and a list of optional fields.
     * @param {string} resource: API resource where to send the request to. Supported Values: 
     *  resources.CATEGORIES, resources.PRODUCTS, resources.USERS, resources.PRODUCT_CATEGORIES, 'posts', 
     *  'comments', 'todos'
     * @param {string} fieldsCondition: Indicates the fields list to be generated. Supported Values: 
     *  stepWording.MANDATORY, stepWording.OPTIONAL
     * @returns {Object} : resource object.
     */
    generateResourceData(resource, fieldsCondition) {
        const data = this.generateNewResourceInfo(resource, stepWording.MANDATORY);
        if (fieldsCondition === stepWording.COMPLETE) {
            this.generateNewResourceInfo(resource, stepWording.OPTIONAL, data);
        }
        return data;
    }

    /**
     * Verifies if the given resource exists just by requesting its id and checking that the return code is OK
     * @param {string} path: resource id path following this pattern: <resource api name>/<resource id>
     */
    async verifyResourceByPath(path) {
        const pathArray = path.split('/');
        const resourceId = pathArray.pop();
        const resource = pathArray.pop();
        await apiRequests.getResource(resource, resourceId);
        expect(response.status).toEqual(responseStatuses.SYNCHRONOUS_OK);
        console.log(`Status ${responseStatuses.SYNCHRONOUS_OK} Checked`);
    }

    /**
     * Retrieves a random category from API
     * @returns {string[]} category id and category name
     */    
    async getRandomCategory() {
        await apiRequests.getPage(stepWording.RANDOM, resources.CATEGORIES);
        const category = response.data.data[Math.floor(Math.random() * response.data.data.length)];
        return [category.id, category.name];
    };
}

module.exports = RequestUtils;