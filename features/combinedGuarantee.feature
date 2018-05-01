Feature: Combined guarantee

  Scenario: Create Combined guarantee
    Given User is logged in
    And Organisation is created with values
      | facilityName | name          | number | address       | city          | zip   | enabled |
      | New Breeze   | Flaming Drill | FD     | Thadvai, NH65 | Eklashkhanpet | 50233 | true    |
    And Contract is created with values
      | name     | address          | city      | zip  | date       | number | organisationName |
      | Contract | U11, Princes Hwy | Ulladulla | 2539 | 12.07.2013 | HG     | Flaming Drill    |
    And Guarantee type is created with values
      | name          | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId | letterTemplateId | agreementId | enabled |
      | Combined Type | 4200         | true           | 5                     | 60           | true           | 3                     | CDTID              | CLTID            | 1398        | true    |
    And performs new guarantee creation
    And selects guarantee type
    And fills guarantee card with values
      | unitNumber | beneficiaryName    | address    | city   | zip | contractAmount | performanceStartDate | performanceEndDate        |
      | 12-89      | Combined Guarantee | Comber Way | Surrey | V3W | 1230500        | today                | today + 9 months + 7 days |
    And goes to preview draft
    And wording for combined bond is shown
    When User submits changes
    Then draft guarantee is present on contract page
    And draft guarantee is present on start page









