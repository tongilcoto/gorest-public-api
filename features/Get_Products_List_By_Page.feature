Feature: As an anonymous api consumer I can get any page of products

Scenario Outline: As an anonymous api consumer I can get any page of products

  Given an "anonymous" api consumer
  When he asks for "<page>" page of "products"
  Then he gets a "SYNCHRONOUS_OK" response
  And the number of items per page matches response meta info
  And products response "mandatory" fields are populated

Examples:
|page|
|intermediate|
|last|
