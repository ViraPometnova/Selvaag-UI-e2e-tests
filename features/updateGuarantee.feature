Feature: Update guarantee

  Scenario: Update draft guarantee
    Given User is logged in
    And Organisation is created with values
      | facilityName    | name          | number | address  | city     | zip   | enabled |
      | Sienna Nitrogen | Maroon Spider | GTI    | Broadway | New York | 00000 | true    |
    And Contract is created with values
      | name         | address  | city       | zip   | date       | organisationName |
      | Purple Snake | Greenway | Dream town | 00001 | 2017-11-21 | Maroon Spider    |
    And Guarantee type is created with values
      | name          | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId            | letterTemplateId              | agreementId | enabled |
      | Combined Type | 4200         | true           | 5                     | 60           | true           | 3                     | DTLw180905105119T4-HONUM00000 | DTLw180214174409S11ARNUM00946 | 1398        | true    |
    And Guarantee is created with values
      | unitNumber | beneficiaryName | address | city | zip | contractAmount | startDate        | endDate          | approveNow | contractName | organisationName | guaranteeType |
      | 61/17      | To be updated   | Address | City | Zip | 61700          | today + 1 months | today + 6 months | False      | Purple Snake | Maroon Spider    | Combined Type |
    And Guarantee status is draft
    And guarantee is able to be edited
    And fills guarantee card with values
      | unitNumber | beneficiaryName | address      | city      | zip      | contractAmount | performanceStartDate | performanceEndDate |
      | 61/17 [Up] | Updated         | Address [Up] | City [Up] | Zip [Up] | 61170          | today + 3 days       | today + 4 days     |
    And goes to combined preview draft wording
    And wording for combined guarantee is shown
    When User submits changes
    Then combined guarantee is present on contract page
    And combined guarantee is present on start page
    And combined guarantee status is draft







