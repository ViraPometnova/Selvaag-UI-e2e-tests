Feature: Approve guarantee

  Scenario: Rejected guarantee
    Given User is logged in
    And Organisation is created with values
      | facilityName    | name        | number | address  | city     | zip   | enabled |
      | Fuschia Davinci | Green Slate | GTI    | Broadway | New York | 00000 | true    |
    And Contract is created with values
      | name        | address    | city        | zip   | organisationName |
      | Red Panther | Sunrise St | Violet town | 00002 | Green Slate      |
    And Guarantee type is created with values
      | name             | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId            | letterTemplateId              | agreementId | enabled |
      | Maintenance Type | 2400         | true           | 5                     | 60           | false          | 0                     | DTLw180530124253T2-HONUM00019 | DTLw180214174409S11ARNUM00946 | 1398        | true    |
    And Guarantee is created with values
      | unitNumber | beneficiaryName | address | city | zip | contractAmount | startDate        | endDate                    | approveNow | contractName | organisationName | guaranteeType    |
      | 0001       | To be cancelled | Address | City | Zip | 114000         | today - 2 months | today - 2 months + 5 years | False      | Red Panther  | Green Slate      | Maintenance Type |
    When Guarantee status is rejected
    Then guarantee is cancelled on start page listing

  Scenario: Cancelled guarantee
    When Guarantee status is cancelled
    Then guarantee is cancelled on start page listing








