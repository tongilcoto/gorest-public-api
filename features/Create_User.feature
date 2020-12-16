Feature: As an authenticated api consumer I can create a new user

@newResourceId
Scenario: As an authenticated api consumer I can create a new user

  Given an "authenticated" api consumer
  When he creates a new "complete" resource of "users"
  Then he gets a "ASYNCHRONOUS_OK" response
  And the new resource is available at location header
  And the resource data matches original data
