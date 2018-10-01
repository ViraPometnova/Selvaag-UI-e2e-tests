Feature: Guarantee type

  Scenario: Validation guarantee type card
    Given User is logged in
    And opens admin page
    And opens Manage guarantee types page
    And performs new guarantee type creation
    And clears guarantee type name
    And clears fixed premium
    And clears maintenance percentage
    And clears maintenance period in months
    And clears performance percentage
    And clears document template id
    And clears letter template id
    And clears agreement id
    And clears approval letter template id
    And clicks on top zero coordinates
    Then guarantee type name validation message is shown
    And fixed premium validation message is shown
    And maintenance percentage validation message is shown
    And maintenance period in months validation message is shown
    And performance percentage validation message is shown
    And document template id validation message is shown
    And letter template id validation message is shown
    And agreement id validation message is shown
    And approval letter template id validation message is shown


  Scenario: Create guarantee type
    Given User is on Manage guarantee types page
    And performs new guarantee type creation
    And fills guarantee type card with values
      | name     | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId | letterTemplateId | approvalTemplateId | agreementId | enabled |
      | Combined | 4200         | true           | 5                     | 60           | true           | 3                     | CDTID              | CLTID            | CATID              | 1398        | true    |
    When User submits changes
    Then guarantee type is present in Guarantee Types list
    And User opens guarantee type to edit
    And guarantee type is present on Edit Guarantee Type page

  Scenario: Edit guarantee type
    Given User is on Manage guarantee types page
    And Guarantee type is created with values
      | name              | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | enabled |
      | Maintenance Vault | 4200         | true           | 5                     | 60           | false          | 0                     | true    |
    And User opens guarantee type to edit
    And edits guarantee type data
      | name                 | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId | letterTemplateId | approvalTemplateId | agreementId | enabled |
      | MaintenanceNew Vault | 5678         | false          | 0                     | 37           | true           | 48                    | MNDTID             | MNLTID           | MNATID             | 1377        | false   |
    When User submits changes
    Then old guarantee type is not created
    And edited guarantee type is created


  Scenario: Disable guarantee type
    Given Organisation is created with values
      | facilityName | name         | number | address                  | city     | zip   | enabled |
      | Facility     | Organisation | ON     | 1255, 5th Ave, Manhattan | New York | 10029 | true    |
    And Contract is created with values
      | name     | address                 | city      | zip   | number | organisationName |
      | Contract | 1297, Massachusetts Ave | Arlington | 02476 | HG     | Organisation     |
    And Guarantee type is created with values
      | name          | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | enabled |
      | Advanced Pool | 2400         | false          | 0                     | 0            | true           | 10                    | true    |
    And performs new guarantee creation
    And guarantee type is able to be selected on New Guarantee page
    And User is on Manage guarantee types page
    And User opens guarantee type to edit
    And makes guarantee type disabled
    And User submits changes
    When performs new guarantee creation
    Then guarantee type is not able to be selected on New Guarantee page










