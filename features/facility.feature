Feature: Facility

  Scenario: Facility is not created
    Given User is logged in as admin
    And opens admin page
    And opens Facility manager
    And performs new Facility creation
    And populate facility card with values
      | name             |
      | NotSavedFacility |
    When User cancels changes
    Then canceled Facility is not created

  Scenario: New Facility is created
    Given User is on facilities page
    And performs new Facility creation
    And populate facility card with values
      | name         |
      | TestFacility |
    When User submits changes
    Then Facility is created

  Scenario: Edit Facility
    Given User is on facilities page
    And opens Facility
    And edit facility data
      | name        |
      | NewFacility |
    When User submits changes
    Then edited Facility is created
    And  old Facility is not created











