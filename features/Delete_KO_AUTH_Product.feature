Feature: As an anonymous api consumer I can not delete a given product

Scenario: As an anonymous api consumer I can not delete a given product

  Given an "anonymous" api consumer
  When he deletes a random resource of "products"
  Then he gets a "AUTHENTICATION_KO" response
  And a "AUTHENTICATION_KO" info message
  And the resource is still available
