Feature: Combined guarantee

  Scenario: Create Combined guarantee
    Given User is logged in
    And Organisation is created with values
      | facilityName | name          | number | address       | city          | zip   | enabled |
      | New Breeze   | Flaming Drill | RA     | Thadvai, NH65 | Eklashkhanpet | 50233 | true    |
    And Contract is created with values
      | name        | address          | city      | zip  | date       | number | organisationName |
      | Alien Heart | U11, Princes Hwy | Ulladulla | 2539 | 12.07.2013 | AE     | Flaming Drill    |
    And Guarantee type is created with values
      | name          | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId            | letterTemplateId              | agreementId | enabled |
      | Combined Type | 4200         | true           | 5                     | 60           | true           | 3                     | DTLw180214172650S11ARNUM00939 | DTLw180214174409S11ARNUM00946 | 1398        | true    |
    And performs new guarantee creation
    And selects guarantee type
    And fills guarantee card with values
      | unitNumber | beneficiaryName    | address    | city   | zip | contractAmount | performanceStartDate | performanceEndDate        |
      | 12-89      | Combined Guarantee | Comber Way | Surrey | V3W | 1230500        | today + 5 days       | today + 9 months + 7 days |
    And clicks on bottom zero coordinates
    And goes to combined preview draft wording
    And wording for combined guarantee is shown
    When User submits changes
    Then processing combined guarantee is present on contract page
    And processing combined guarantee is present on start page









