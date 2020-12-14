Feature: As an anonymous api consumer I can get first page of comments

Scenario: As an anonymous api consumer I can get first page of comments

  Given an "anonymous" api consumer
  When he asks for "first" page of "comments"
  Then he gets a "SYNCHRONOUS_OK" response
  And the number of items per page matches response meta info
  And comments response fields are populated
