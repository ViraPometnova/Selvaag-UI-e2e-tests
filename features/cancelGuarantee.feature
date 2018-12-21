Feature: Cancel guarantee

  Scenario: Manually rejected guarantee
    Given User is logged in as admin
    And Organisation is created with values
      | facilityName    | name        | number | address  | city     | zip   | enabled |
      | Fuschia Davinci | Green Slate | GTI    | Broadway | New York | 00000 | true    |
    And Contract is created with values
      | name        | address    | city        | zip   | organisationName |
      | Red Panther | Sunrise St | Violet town | 00002 | Green Slate      |
    And Guarantee type is created with values
      | name              | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | enabled |
      | Maintenance Terra | 2400         | true           | 5                     | 60           | false          | 0                     | true    |
    And Guarantee is created with values
      | unitNumber | beneficiaryName         | address | city | zip | contractAmount | startDate        | endDate                    | approveNow | contractName | organisationName | guaranteeType     |
      | 0001       | To be rejected manually | Address | City | Zip | 114000         | today - 2 months | today - 2 months + 5 years | False      | Red Panther  | Green Slate      | Maintenance Terra |
    And Guarantee status is draft
    When User rejects guarantee
    Then guarantee is rejected on contract page

  Scenario: Rejected guarantee
    And Guarantee is created with values
      | unitNumber | beneficiaryName | address | city | zip | contractAmount | startDate        | endDate                    | approveNow | contractName | organisationName | guaranteeType     |
      | 0003       | To be rejected  | Address | City | Zip | 114000         | today - 2 months | today - 2 months + 5 years | False      | Red Panther  | Green Slate      | Maintenance Terra |
    And Guarantee status is draft
    When Guarantee status is rejected
    Then guarantee is cancelled on start page listing

  Scenario: Cancelled guarantee
    And Guarantee is created with values
      | unitNumber | beneficiaryName | address        | city    | zip  | contractAmount | startDate | endDate          | approveNow | contractName | organisationName | guaranteeType     |
      | 0002       | To be cancelled | Prinsensgate 1 | Andenes | 8480 | 114000         | today     | today + 250 days | False      | Red Panther  | Green Slate      | Maintenance Terra |
    And Guarantee status is draft
    When Guarantee status is cancelled
    Then guarantee is cancelled on start page listing








