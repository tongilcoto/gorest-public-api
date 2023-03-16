const axios = require('axios');
const {baseURL, ordinals, stepWording} = require('./constants.js');

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};
  
const api = axios.create({
    baseURL,
    headers,
    timeout: 10000,
    validateStatus: false
  });

class APIRequests {

    /**
     * Performs a get request for a given page by using 'page' query parameter
     * If the 'page' is not the first one. It will perform an initial request in order to get the pagination parameters and 
     * calculate a valid page number according to 'page' parameter
     * It creates global variable 'response' which will host the api response
     * @param {string} page: Desired page. Supported Values: ordinals.FIRS, ordinals.INTERMEDIATE, ordinals.LAST, stepWording.RANDOM
     * @param {string} resource: API resource where to send the request to. Supported Values: resources.CATEGORIES, resources.PRODUCTS, 
     *  resources.USERS, resources.PRODUCT_CATEGORIES, 'posts', 'comments', 'todos'
    */
    async getPage(page, resource) {
        global.response = await api.get(resource);
        const totalPages = response.data.meta.pagination.pages
        if (page === ordinals.LAST) {
            console.log(`Page Number: ${totalPages}`);
            global.response = await api.get(resource, {params: {page: totalPages}});
        } else if (page === ordinals.INTERMEDIATE || page === stepWording.RANDOM) {
            let randomPageNumber = Math.floor(Math.random() * totalPages) + 1;
            if (page === ordinals.INTERMEDIATE && randomPageNumber === 1) {
                randomPageNumber = 2
            } else if (page === ordinals.INTERMEDIATE && randomPageNumber === totalPages) {
                randomPageNumber = totalPages - 1;
            }
            console.log(`${page} Page Number: ${randomPageNumber}`);
            global.response = await api.get(resource, {params: {page: randomPageNumber}});
        }
        console.log(`First ${resource}: ${JSON.stringify(response.data.data[0])}`);
    }

    /**
     * Performs a get request on a given resource in order to get all its details
     * It creates global variable 'response' which will host the api response
     * @param {string} resource: API resource where to send the request to. Supported Values: resources.CATEGORIES, resources.PRODUCTS, 
     *  resources.USERS, resources.PRODUCT_CATEGORIES, 'posts', 'comments', 'todos'
     * @param {numnber} resourceId: Resource unique identifier
     */
     async getResource(resource, resourceId) {
        const path = `${resource}/${resourceId}`;
        console.log(`Asking for ${path}`);
        global.response = await api.get(path);
    };

    /**
     * Deletes a random resource. The tests coverages only includes Delete Authorization Error, so no need for more options.
     * TODO: To support resource id as parameter
     * It creates global variable 'response' which will host the api response
     * @param {string} resource: API resource where to send the request to. Supported Values: resources.CATEGORIES, resources.PRODUCTS, 
     *  resources.USERS, resources.PRODUCT_CATEGORIES, 'posts', 'comments', 'todos'
     */
    async deleteResource(resource) {
        const resources = await api.get(resource);
        const resource_index = Math.floor(Math.random() * Math.min(resources.data.meta.pagination.total, resources.data.meta.pagination.limit));
        console.log(`${resource} to be deleted: ${JSON.stringify(resources.data.data[resource_index])}`);
        const resourceUrl = `${resource}/${resources.data.data[resource_index].id}`
        global.response = await api.delete(resourceUrl);
    };

    /**
     * Creates a new resource for a given resource with the given data
     * It creates global variable 'response' which will host the api response
     * @param {string} resource: API resource where to send the request to. Supported Values: resources.CATEGORIES, resources.PRODUCTS, 
     *  resources.USERS, resources.PRODUCT_CATEGORIES, 'posts', 'comments', 'todos'
     * @param {Object} data: JSON object containing resource data
     */
    async createResource(resource, data) {
        global.response = await api.post(resource, data, {headers: {Authorization: accessToken}});
        console.log(`Created Resource at ${resource}`);
        console.log(response.data);
    }

};

module.exports = APIRequests;