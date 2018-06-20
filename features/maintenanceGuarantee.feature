Feature: Maintenance guarantee

  Scenario: Create Maintenance guarantee
    Given User is logged in
    And Organisation is created with values
      | facilityName   | name           | number | address           | city   | zip   | enabled |
      | Liquid Morning | Brave Electron | FD     | 776B, Boylston St | Boston | 02199 | true    |
    And Contract is created with values
      | name          | address        | city    | zip | date       | organisationName |
      | Serious Laser | 1212, Santa Fe | Rosario | 258 | 2015-02-01 | Brave Electron   |
    And Guarantee type is created with values
      | name             | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId            | letterTemplateId              | agreementId | enabled |
      | Maintenance Type | 4200         | true           | 5                     | 60           | false          | 0                     | DTLw180530124253T2-HONUM00019 | DTLw180607111722T2-HONUM00018 | 1376        | true    |
    And performs new guarantee creation
    And selects guarantee type
    And fills guarantee card with values
      | unitNumber | organisationNumber | contractAmount | maintenanceStartDate |
      | 111/2      | 916489854          | 568000         | today + 2 days       |
    And clicks on bottom zero coordinates
    And goes to maintenance preview draft wording
    And wording for maintenance guarantee is shown
    When User approves immediate guarantee creation
    Then maintenance guarantee is present on contract page
    And maintenance guarantee status is processing









