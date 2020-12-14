Feature: As an anonymous api consumer I can get first page of ToDo's

Scenario: As an anonymous api consumer I can get first page of ToDo's

  Given an "anonymous" api consumer
  When he asks for "first" page of "todos"
  Then he gets a "SYNCHRONOUS_OK" response
  And the number of items per page matches response meta info
  And todos response fields are populated
