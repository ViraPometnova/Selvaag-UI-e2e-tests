Feature: Advanced search

  Scenario: Switch on advanced search
    Given User is logged in
    When User performs advanced search
    Then advanced search options are available
    And simple search is not available

  Scenario: Switch off advanced search
    Given User is on start page
    And User performs advanced search
    When User closes advanced search
    Then simple search is available
    And advanced search options are not available

  Scenario Outline: Advanced search by developer
    Given Organisation is created with values
      | facilityName | name           | number | address                  | city     | zip   | enabled |
      | Facility     | Test developer | ON     | 1255, 5th Ave, Manhattan | New York | 10029 | true    |
    And Contract is created with values
      | name          | address    | city        | zip   | organisationName |
      | Test contract | Sunrise St | Violet town | 00002 | Test developer   |
    And User performs advanced search
    When User selects developer <organisationName>
    Then search result contains selected developer <organisationName>

    Examples:
      | organisationName |
      | Test developer   |

  Scenario Outline: Advanced search by contract
    When User selects contract <projectName>
    And developer filter is cleared
    And search result contains selected contract <projectName>

    Examples:
      | projectName   |
      | Test contract |

  Scenario Outline: Clear search results
    When User clears contract
    Then contract filter is cleared
    And developer filter is cleared
    And search result contains selected developer <organisationName>
    And search result contains selected contract <projectName>

    Examples:
      | organisationName | projectName   |
      | Test developer   | Test contract |
















