# GOREST.CO.IN Critical Test Plan

## Foundations

In order to assess critical tests, a good knowledge of api goals is needed. Depending on the goals, the critical tests can be different because of the business priorities. In a real life scenario, the critical tests, or smoke tests, should be agreed by business and qa. 

It looks like this API gives support for an e-commerce site, since products have a catalogued price, that also hosts a comments platform for logged users, although not linked to products. Besides this e-commerce site has two operational modes: anonymous and authenticated. With the available info, It can not be inferred that the authenticated mode is for e-commerce site logged users or just the e-commerce site instance identification.

So, following the previous business definition, the main goal is to assure that users can buy products.

## Test Plan

Since the API does not provide log in neither pay options, these are the critical tests:

1. As an anonymous api consumer I can get first page of products
2. As an anonymous api consumer I can get a given page of products
3. As an authenticated api consumer I can create a new product
4. As an authenticated api consumer I can create a new category. NOT ALLOWED BY GOREST.CO.IN
5. As an authenticated api consumer I can assign a category to a given product
6. As an anonymous api consumer I can get first page of users
7. As an anonymous api consumer I can get a given page of users
8. As an authenticated api consumer I can create a new user
9. As an anonymous api consumer I can get first page of posts
10. As an anonymous api consumer I can get first page of comments
11. As an anonymous api consumer I can get first page of todos
12. As an anonymous api consumer I can not delete a given user
13. As an anonymous api consumer I can not delete a given product


### This suite is covering


- Most important related-to-purchases resource creation: “products” and “users”.
- Since products also need the “category” resource for a complete product definition, they are also covered
- All “products” and “users” details (by getting navigation through all pages)
- Pagination mechanism for some resources (let's assume there is a single class managing pagination for all resources)
- Partial access to comments platform
- Security harness for users and products unrecoverable actions


### And it is not covering

- Error scenarios. These tests should be performed at Regression suite, not Smoke suite.
- Secondary resources: comments platform. They are not involved in purchases
- Security tests. Only unrecoverable actions on users and products are covered, the rest of them should be performed at Regression suite
- Search tests. Since the suite is already covering all resources retrieving, search is not a critical feature.

## Framework

- Tests Definition: Gherkin language following TDD/BDD best practices
- BDD/TDD Framework: Cucumber. Using feature files in order to decouple test definition from test code
- Tests code: Javascript / node.js
- Cucumber:
-- Features directory: `features`. No tag is being used for this small test plan.
-- Steps Definition directory: `tests`. Files are splited by resource plus a common one. Dedicated by resource files are near empty, just because these is only the critical/smoke test plan.
-- Additional test code: `tests/src`
-- Classes set up: `tests/setup.js`
-- Command Line launch: `./node_modules/.bin/cucumber-js --require setup.js --require tests`
- Test data clean up: Not supported. An “After” hook should be maybe added.


## Test Execution

1. Generate your access token: https://gorest.co.in/access-token
2. Create a new environment variable with it: `export API_ACCESS_TOKEN=<access token>`
3. Launch test plan: `npm test`