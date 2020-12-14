const expect = require('expect');
const {ordinals, numberFieldsAsStrings} = require('./constants.js');

class ResponseUtils {

    /**
     * Calculates the last page items number based on items per page and total items. Both values appear at response pagination property
     * @returns {number} last page items
     */
    getExpectedItemsAtLastPage() {
        return response.data.meta.pagination.total - (
            response.data.meta.pagination.limit * (
                response.data.meta.pagination.page - 1
            )
        );
    }

    /**
     * Calculates the expoected items number for a given page based on page ordinal position, items per page and total items. 
     * @returns {number} page items number
     */
    getPageExpectedItemsNumber(requestedPage) {
        let expectedValue;
        switch(requestedPage) {
            case ordinals.FIRST:
            case ordinals.INTERMEDIATE:
                expectedValue = (response.data.meta.pagination.pages === 1)
                    ? response.data.meta.pagination.total
                    : response.data.meta.pagination.limit
                break;
            case ordinals.LAST:
                expectedValue = this.getExpectedItemsAtLastPage();
                break;
            default:
                throw new Error(`Not supported page configuration: ${requestedPage}`);
        }
        return expectedValue;
    };

    /**
     * Verifies if a value is a truthy value.
     * @param {*} value: value to be checked
     * @returns {boolean} truthy value?
     */
    verifyFieldIsPopulated(value) {
        return value !== null && value !== 'null' && value !== undefined && value !== ''
    }

    /**
     * Verifies all given fields of an object array are truthy
     * @param {string[]} fieldsList: list of fields to be checked
     * @param {Object[]} data: Array of objects to be checked
     */
    verifyFieldsArePopulated(fieldsList, data) {
        for (let resource of data) {
            expect(fieldsList.filter((field) => !this.verifyFieldIsPopulated(resource[field])).length).toEqual(0);
        }
        console.log('Response fields are populated');
    }

    /**
     * Transforms number fields that API is dealing as string into real number values in order to
     * get correct assertion. It uses a configuration in order to detect affected fields by resource.
     * @param {Object} data: Resource object to be curated
     * @returns {Object} configured fields are transformed from string to number
     */
    getCuratedNumberFields(data) {
        const pathArray = response.request.path.split('/');
        const resource_id = pathArray.pop();
        const resource = pathArray.pop();
        Object.keys(data).filter((field) => numberFieldsAsStrings[resource].includes(field))
            .map((field) => data[field] = parseFloat(data[field]));
        console.log(data)
        return data;
    }
};

module.exports = ResponseUtils;