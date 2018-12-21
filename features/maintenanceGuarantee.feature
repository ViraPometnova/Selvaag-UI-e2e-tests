Feature: Maintenance guarantee

  Scenario: Create Maintenance guarantee
    Given User is logged in as admin
    And Organisation is created with values
      | facilityName   | name           | number | address           | city   | zip   | enabled |
      | Liquid Morning | Brave Electron | FD     | 776B, Boylston St | Boston | 02199 | true    |
    And Contract is created with values
      | name          | address        | city    | zip | organisationName |
      | Serious Laser | 1212, Santa Fe | Rosario | 258 | Brave Electron   |
    And Guarantee type is created with values
      | name             | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | enabled |
      | Maintenance Frog | 4200         | true           | 5                     | 60           | false          | 0                     | true    |
    And performs new guarantee creation
    And selects guarantee type
    And fills guarantee card with values
      | unitNumber | beneficiaryName | address            | city     | zip      | contractAmount | maintenanceStartDate |
      | 111/2      | Maintenance Gt  | 584 Oakland Street | Fort Lee | NJ 07024 | 568000         | today + 2 days       |
    And goes to maintenance preview draft wording
    And wording for maintenance guarantee is shown
    When User approves immediate guarantee creation
    Then maintenance guarantee is present on contract page
    And maintenance guarantee status is processing









