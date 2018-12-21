Feature: Edit guarantee by other user

  Scenario Outline: Edit guarantee by initial user
    Given User is logged in as admin
    And Organisation is created with values
      | facilityName   | name               | number | address  | city     | zip   | enabled |
      | Admin Facility | Admin Organisation | GTI    | Broadway | New York | 00000 | true    |
    And Contract is created with values
      | name           | address  | city       | zip   | organisationName   |
      | Admin Contract | Greenway | Dream town | 00001 | Admin Organisation |
    And Guarantee type is created with values
      | name           | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | enabled |
      | Combined Admin | 4200         | true           | 5                     | 60           | true           | 3                     | true    |
    And Guarantee is created with values
      | unitNumber | beneficiaryName | address | city | zip | contractAmount | startDate        | endDate          | approveNow | contractName   | organisationName   | guaranteeType  |
      | 61/17      | Admin Admin     | Address | City | Zip | 61700          | today + 1 months | today + 6 months | False      | Admin Contract | Admin Organisation | Combined Admin |
    And guarantee is created by <admin>
    And Guarantee status is draft
    When User updates guarantee with values
      | unitNumber | beneficiaryName | address | city | zip | contractAmount | startDate        | endDate          | approveNow | contractName   | organisationName   | guaranteeType  |
      | 61/17      | Admin Admin     | Address | City | Zip | 180000         | today + 1 months | today + 6 months | False      | Admin Contract | Admin Organisation | Combined Admin |
    Then guarantee is created by <admin>
    And  initial user modified guarantee

    Examples:
      | admin      |
      | Admin User |

  Scenario Outline: Edit guarantee by other user
    Given User is logged in as not admin
    When User updates guarantee with values
      | unitNumber | beneficiaryName | address | city | zip | contractAmount | startDate        | endDate          | approveNow | contractName   | organisationName   | guaranteeType  | username | password |
      | 18/21      | Admin Admin     | Address | City | Zip | 560000         | today + 1 months | today + 6 months | False      | Admin Contract | Admin Organisation | Combined Admin | test     | test     |
    Then guarantee is created by <admin>
    And  guarantee is modified by <user>

    Examples:
      | admin      | user      |
      | Admin User | Test User |







