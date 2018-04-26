Feature: Contract

  Scenario: Validation contract card
    Given User is logged in
    And Organisation is created with values
      | facilityName | name    | number | address                  | city     | zip   | enabled |
      | Facility     | Svartis | ON     | 1255, 5th Ave, Manhattan | New York | 10029 | true    |
    And opens new contract page
    And clears project name
    And clears contract number
    And clears address line 1
    And clears address line 2
    And clears address line 3
    And clears project date
    And clicks on zero coordinates
    Then project name validation message is shown
    And contract number validation message is shown
    And address line 1 validation message is shown
    And address line 2 validation message is shown
    And address line 3 validation message is shown
    And project date validation message is shown

  Scenario: Create contract
    Given opens new contract page
    And fill contract card with values
      | name      | address                 | city      | zip   | date       | number | guaranteesAmount |
      | Sun Risky | 1297, Massachusetts Ave | Arlington | 02476 | 01.01.2010 | CN     | 0                |
    When User submits changes
    And contract is present in start page listing
    And contract is present on Contract page

  Scenario: Edit contract details
    Given User opens contract page
    And edit contract data
      | name         | number | date       |
      | Cheerful sun | NN     | 31.12.2015 |
    When User submits changes
    Then old contract is not created
    And edited contract is created

   Scenario: Delete unused contract
     Given User opens edited contract
     And deletes contract
     Then contract is not present in start page listing














