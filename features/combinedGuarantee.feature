Feature: Combined guarantee

  Scenario: Create Combined guarantee
    Given User is logged in
    And Organisation is created with values
      | facilityName | name          | number | address       | city          | zip   | enabled |
      | New Breeze   | Flaming Drill | RA     | Thadvai, NH65 | Eklashkhanpet | 50233 | true    |
    And Contract is created with values
      | name        | address          | city      | zip  | organisationName |
      | Alien Heart | U11, Princes Hwy | Ulladulla | 2539 | Flaming Drill    |
    And Guarantee type is created with values
      | name            | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | enabled |
      | Combined Secret | 4200         | true           | 5                     | 60           | true           | 3                     | true    |
    And performs new guarantee creation
    And selects guarantee type
    And fills guarantee card with values
      | unitNumber | beneficiaryName | address    | city   | zip | contractAmount | performanceStartDate | performanceEndDate |
      | 12-89      | Combined Gt     | Comber Way | Surrey | V3W | 1230500        | today + 5 days       | today + 6 days     |
    And goes to combined preview draft wording
    And wording for combined guarantee is shown
    When User submits changes
    Then combined guarantee is present on contract page
    And combined guarantee status is processing
    And combined guarantee is present on start page
    And combined guarantee status is processing

  Scenario: Delete used contract via WebApi
    Given User is on start page
    When deletes used contract via WebApi
    Then contract is not deleted





