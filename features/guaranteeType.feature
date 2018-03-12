Feature: Guarantee type

  Scenario: Validation guarantee type card
    Given User is logged in
    And opens Manage guarantee types page
    And performs new guarantee creation
    And clears guarantee type name
    And clears fixed premium
    And clears maintenance percentage
    And clears maintenance period in months
    And clears performance percentage
    And clears document template id
    And clears letter template id
    And clears agreement id
    And clicks on zero coordinates
    Then guarantee type name validation message is shown
    And contract number validation message is shown
    And fixed premium validation message is shown
    And maintenance percentage validation message is shown
    And maintenance period in months validation message is shown
    And performance percentage validation message is shown
    And document template id validation message is shown
    And letter template id validation message is shown
    And agreement id validation message is shown


  Scenario Outline: Create guarantee type
    Given User is on Manage guarantee types page
    And performs new guarantee creation
    And types guarantee type name <name>
    And makes guarantee type enabled
    And types fixed premium <fixedPremium>
    And makes guarantee type has maintenance <hasMaintenance>
    And types maintenance percentage <maintenancePercentage>
    And types maintenance period in months <monthsAmount>
    And makes guarantee type has performance <hasPerformance>
    And types performance percentage <performancePercentage>
    And types document template id <documentTemplateId>
    And types letter template id <letterTemplateId>
    And types agreement id <agreementId>
    When User submits changes
    Then guarantee type <name> is created
    And <name> has guarantee type enabled <enabled> in Guarantee Types list
    And <name> has fixed premium <fixedPremium> in Guarantee Types list
    And <name> has maintenance <hasMaintenance> in Guarantee Types list
    And <name> has maintenance percentage <maintenancePercentage> in Guarantee Types list
    And <name> has maintenance period in months <monthsAmount> in Guarantee Types list
    And <name> has performance <hasPerformance> in Guarantee Types list
    And <name> has performance percentage <performancePercentage> in Guarantee Types list
    And User opens guarantee type <name> to edit
    And <name> has guarantee type enabled <enabled> on Edit Guarantee Type page
    And <name> has fixed premium <fixedPremium> on Edit Guarantee Type page
    And <name> has maintenance <hasMaintenance> on Edit Guarantee Type page
    And <name> has maintenance percentage <maintenancePercentage> on Edit Guarantee Type page
    And <name> has maintenance period in months <monthsAmount> on Edit Guarantee Type page
    And <name> has performance <hasPerformance> on Edit Guarantee Type page
    And <name> has performance percentage <performancePercentage> on Edit Guarantee Type page
    And <name> has document template id <documentTemplateId> on Edit Guarantee Type page
    And <name> has letter template id <letterTemplateId> on Edit Guarantee Type page
    And <name> has agreement id <agreementId> on Edit Guarantee Type page

    Examples:
      | name        | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId | letterTemplateId | agreementId | enabled |
      | Combined    | 4200         | true           | 5                     | 60           | true           | 3                     | CDTID              | CLTID            | 1398        | true    |
      | Maintenance | 4200         | true           | 5                     | 60           | false          | 0                     | MDTID              | MLTID            | 1376        | true    |
      | Advanced    | 2400         | false          | 0                     | 0            | true           | 10                    | ADTID              | ALTID            | 1405        | true    |

  Scenario Outline: Edit guarantee type
    Given User is on Manage guarantee types page
    And User opens guarantee type <oldName> to edit
    And types guarantee type name <newName>
    And makes guarantee type disabled
    And types fixed premium <newFixedPremium>
    And makes guarantee type has maintenance <newHasMaintenance>
    And types maintenance percentage <newMaintenancePercentage>
    And types maintenance period in months <newMonthsAmount>
    And makes guarantee type has performance <newHasPerformance>
    And types performance percentage <newPerformancePercentage>
    When User submits changes
    Then guarantee type <newName> is created
    And guarantee type <oldName> is not created
    And <newName> has guarantee type enabled <newEnabled> in Guarantee Types list
    And <newName> has fixed premium <newFixedPremium> in Guarantee Types list
    And <newName> has maintenance <newHasMaintenance> in Guarantee Types list
    And <newName> has maintenance percentage <newMaintenancePercentage> in Guarantee Types list
    And <newName> has maintenance period in months <newMonthsAmount> in Guarantee Types list
    And <newName> has performance <newHasPerformance> in Guarantee Types list
    And <newName> has performance percentage <newPerformancePercentage> in Guarantee Types list
    And User opens guarantee type <newName> to edit
    And <newName> has guarantee type enabled <newEnabled> on Edit Guarantee Type page
    And <newName> has fixed premium <newFixedPremium> on Edit Guarantee Type page
    And <newName> has maintenance <hasMaintenance> on Edit Guarantee Type page
    And <newName> has maintenance percentage <newMaintenancePercentage> on Edit Guarantee Type page
    And <newName> has maintenance period in months <newMonthsAmount> on Edit Guarantee Type page
    And <newName> has performance <newHasPerformance> on Edit Guarantee Type page
    And <newName> has performance percentage <newPerformancePercentage> on Edit Guarantee Type page

    Examples:
      | oldName     | newName        | newFixedPremium | newMaintenancePercentage | newPerformancePercentage | newMonthsAmount | newHasMaintenance | newHasPerformance | newEnabled |
      | Combined    | NewCombined    | 1234            | 24                       | 95                       | 120             | false             | false             | false      |
      | Maintenance | NewMaintenance | 5678            | 0                        | 48                       | 37              | false             | true              | false      |
      | Advanced    | NewAdvanced    | 900             | 6                        | 237                      | 42              | true              | false             | false      |

  Scenario Outline: Disable guarantee type
    Given Facility is created
    And Organisation is created
    And Contract is created
    And Enabled guarantee type is created
    And <name> is able to be selected on New Guarantee page
    And User opens guarantee type <name> to edit
    And makes guarantee type disabled
    When User submits changes
    Then <name> is not able to be selected on New Guarantee page

    Examples:
      | name             |
      | Enabled Combined |









