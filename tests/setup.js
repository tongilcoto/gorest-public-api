const apiRequests = require('./src/apiRequests.js');
global.apiRequests = new apiRequests();

const responseUtils = require('./src/responseUtils.js');
global.responseUtils = new responseUtils();

const requestUtils = require('./src/requestUtils.js');
global.requestUtils = new requestUtils();