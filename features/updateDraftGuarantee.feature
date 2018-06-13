Feature: Draft guarantee

  Scenario: Update draft guarantee
    Given User is logged in
    And Organisation is created with values
      | facilityName | name          | number | address       | city          | zip   | enabled |
      | New Breeze   | Flaming Drill | RA     | Thadvai, NH65 | Eklashkhanpet | 50233 | true    |
    And Contract is created with values
      | name        | address          | city      | zip  | date       | organisationName |
      | Alien Heart | U11, Princes Hwy | Ulladulla | 2539 | 2013-07-19 | Flaming Drill    |
    And Guarantee type is created with values
      | name          | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId            | letterTemplateId              | agreementId | enabled |
      | Combined Type | 4200         | true           | 5                     | 60           | true           | 3                     | DTLw180530123634T2-HONUM00000 | DTLw180214174409S11ARNUM00946 | 1398        | true    |
    And Combined guarantee is created with values
      |  |  |  |  |  |  |  |  |
      |  |  |  |  |  |  |  |  |
    When
    Then







