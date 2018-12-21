Feature: Contract

  Scenario: Validation contract card
    Given User is logged in as admin
    And Organisation is created with values
      | facilityName | name    | number | address                  | city     | zip   | enabled |
      | Facility     | Svartis | ON     | 1255, 5th Ave, Manhattan | New York | 10029 | true    |
    And opens new contract page
    And clears project name
    And clears address line 1
    And clears address line 2
    And clears address line 3
    And clicks on top zero coordinates
    Then project name validation message is shown
    And address line 1 validation message is shown
    And address line 2 validation message is shown
    And address line 3 validation message is shown

  Scenario: Create contract
    Given opens new contract page
    And fills contract card with values
      | name      | address                 | city      | zip   | organisationName |
      | Sun Risky | 1297, Massachusetts Ave | Arlington | 02476 | Svartis          |
    When User submits changes
    And contract is present in start page listing
    And contract is present on Contract page
    And performs new guarantee creation
    And contract data is present on new guarantee page

  Scenario: Edit contract details
    Given User opens contract page
    And edits contract data
      | name         | address                   | city     | zip   |
      | Cheerful sun | 413, W 34th St, Manhattan | New York | 10001 |
    When User submits changes
    Then old contract is not created
    And edited contract is created
    And performs new guarantee creation for edited contract
    And edited contract data is present on new guarantee page

  Scenario: Delete unused contract
    Given User opens edited contract
    And deletes contract
    Then contract is not present in start page listing
    And contract is not present on Facility member page














