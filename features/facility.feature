Feature: Facility

  @CucumberScenario
  Scenario Outline: Facility is not created
    Given User is logged in with <username> and <password>
    And opens admin page
    And opens facility manager
    And performs new facility creation
    And types facility name <facilityName>
    When user cancels changes
    Then facility <facilityName> is not created

    Examples:
      | username | password | facilityName     |
      | admin    | admin    | NotSavedFacility |

  @CucumberScenario
  Scenario Outline: New Facility is created
    Given User is on facilities page
    And performs new facility creation
    And types facility name <facilityName>
    When user submits creation
    Then facility <facilityName> is created

    Examples:
      | facilityName  |
      | Test Facility |

  @CucumberScenario
  Scenario Outline: Edit Facility
    Given User is on facilities page
    And opens facility <oldFacilityName> to edit
    And types facility name <newFacilityName>
    When user submits creation
    Then facility <newFacilityName> is created
    And  facility <oldFacilityName> is not created

    Examples:
      | oldFacilityName | newFacilityName |
      | Test Facility   | New Facility    |












