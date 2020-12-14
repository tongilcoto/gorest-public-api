Feature: As an anonymous api consumer I can get first page of posts

Scenario: As an anonymous api consumer I can get first page of posts

  Given an "anonymous" api consumer
  When he asks for "first" page of "posts"
  Then he gets a "SYNCHRONOUS_OK" response
  And the number of items per page matches response meta info
  And posts response fields are populated
