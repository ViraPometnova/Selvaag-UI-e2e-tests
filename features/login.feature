Feature: Log in Selvaag

  @CucumberScenario
  Scenario Outline: Log in with invalid credentials
    Given User is on login page
    And types username <username>
    And types password <password>
    When performs log in
    Then User is left on login page

    Examples:
      | username  | password |
      | something | anything |
      |           |          |

  @CucumberScenario
  Scenario Outline: Log in with valid credentials
    Given User is on login page
    And types username <username>
    And types password <password>
    When performs log in
    Then User is redirected to start page

    Examples:
      | username | password |
      | admin    | admin    |






