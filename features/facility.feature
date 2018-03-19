Feature: Facility

  Scenario Outline: Facility is not created
    Given User is logged in with <username> and <password>
    And opens admin page
    And opens Facility manager
    And performs new Facility creation
    And types Facility name <facilityName>
    When User cancels changes
    Then Facility <facilityName> is not created

    Examples:
      | username | password | facilityName     |
      | admin    | admin    | NotSavedFacility |

  Scenario Outline: New Facility is created
    Given User is on facilities page
    And performs new Facility creation
    And types Facility name <facilityName>
    When User submits changes
    Then Facility <facilityName> is created

    Examples:
      | facilityName  |
      | Test Facility |

  Scenario Outline: Edit Facility
    Given User is on facilities page
    And opens Facility <oldFacilityName> to edit
    And types Facility name <newFacilityName>
    When User submits changes
    Then Facility <newFacilityName> is created
    And  Facility <oldFacilityName> is not created

    Examples:
      | oldFacilityName | newFacilityName |
      | Test Facility   | New Facility    |

#TODO: Add check if facilities ordered alphabetically










