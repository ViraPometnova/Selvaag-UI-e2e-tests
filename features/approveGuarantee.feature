Feature: Approve guarantee

  Scenario: Accepted guarantee
    Given User is logged in
    And Organisation is created with values
      | facilityName    | name         | number | address  | city     | zip   | enabled |
      | Purple Tucutucu | Black Desman | GTI    | Broadway | New York | 00000 | true    |
    And Contract is created with values
      | name          | address    | city        | zip   | organisationName |
      | Yellow Duiker | Sunrise St | Violet town | 00002 | Black Desman     |
    And Guarantee type is created with values
      | name             | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId            | letterTemplateId              | agreementId | enabled |
      | Performance Type | 2400         | false          | 0                     | 60           | true           | 3                     | DTLw180530124330T2-HONUM00002 | DTLw180214174409S11ARNUM00946 | 1398        | true    |
    And Guarantee is created with values
      | unitNumber | beneficiaryName | address | city | zip | contractAmount | startDate       | endDate         | approveNow | contractName  | organisationName | guaranteeType    |
      | 0001       | To be approved  | Address | City | Zip | 58500          | today - 11 days | today + 15 days | False      | Yellow Duiker | Black Desman     | Performance Type |
    When Guarantee status is accepted
    Then guarantee is approved on start page listing

  Scenario: Valid guarantee
    When Guarantee status is valid
    Then guarantee is approved on start page listing

  Scenario: Valid guarantee
    When Guarantee status is expired
    Then guarantee is approved on start page listing







