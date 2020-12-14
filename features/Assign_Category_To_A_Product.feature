Feature: As an authenticated api consumer I can assign a category to a given product

Scenario: As an authenticated api consumer I can assign a category to a given product

  Given an "authenticated" api consumer
  And he creates a new "complete" resource of "products"
  When he assigns a category to the new product
  Then he gets a "ASYNCHRONOUS_OK" response
  And the product is updated with the new category
