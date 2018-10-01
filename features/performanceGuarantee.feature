Feature: Performance guarantee

  Scenario: Create Performance guarantee
    Given User is logged in
    And Organisation is created with values
      | facilityName   | name              | number | address                    | city      | zip   | enabled |
      | Endless Oyster | Pointless Lantern | SKY    | 7821, Atlantic Ave, Queens | Woodhaven | 11421 | true    |
    And Contract is created with values
      | name             | address            | city   | zip   | number | organisationName  |
      | Jupiter Barbaric | 78, Calle Gran Vía | Madrid | 28013 | TRI    | Pointless Lantern |
    And Guarantee type is created with values
      | name              | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | enabled |
      | Performance Block | 2400         | false          | 0                     | 0            | true           | 10                    | true    |
    And performs new guarantee creation
    And selects guarantee type
    And fills guarantee card with values
      | unitNumber | beneficiaryName | address            | city    | zip  | contractAmount | performanceStartDate | performanceEndDate        |
      | 48*26      | Performance Gt  | F1563, Princes Hwy | Termeil | 2539 | 712500         | today - 3 days       | today + 7 months + 5 days |
    And goes to performance preview draft wording
    And wording for performance guarantee is shown
    And User goes back
    And edits guarantee data with values
      | unitNumber  | beneficiaryName | address                  | city          | zip        | contractAmount | performanceStartDate | performanceEndDate |
      | 48*26[Edit] | [Edited] Gt     | F1563, Princes Hwy[Edit] | Termeil[Edit] | 2539[Edit] | 712501         | today - 7 days       | today + 7 months   |
    And goes to performance preview draft wording
    And User waits for pdf to be reloaded
    And wording for performance guarantee is shown
    When User submits changes
    Then performance guarantee is present on contract page
    And performance guarantee status is processing
    And performance guarantee is present on start page
    And performance guarantee status is processing









