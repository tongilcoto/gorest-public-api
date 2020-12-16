Feature: As an authenticated api consumer I can create a new product

@newResourceId
Scenario: As an authenticated api consumer I can create a new product

  Given an "authenticated" api consumer
  When he creates a new "complete" resource of "products"
  Then he gets a "ASYNCHRONOUS_OK" response
  And the new resource is available at location header
  And the resource data matches original data
