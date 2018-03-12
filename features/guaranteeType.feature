Feature: Contract

  Scenario: Validation contract card
    Given User is logged in
    And Organisation is created
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


  Scenario Outline: Create contract
#    Given opens new contract page
#    And types project name <name>
#    And types address line 1 <address>
#    And types address line 2 <city>
#    And types address line 3 <zip>
#    And types contract number <number>
#    And chooses start date <date>
#    When User submits changes
    Given Contract is created
    When User performs search by <number>
    And <name> has contract number <number> in start page listing
    And <name> has address line 1 <address> in start page listing
    And <name> has address line 2 <city> in start page listing
    And <name> has address line 3 <zip> in start page listing
    And <name> has project date <date> in start page listing
    And <name> has <guaranteeAmount> created guarantees in start page listing
    And editing contract <name> is enabled from start page listing
    And User performs search by <number>
    And <name> new guarantee is able to be created from start page listing
    And User opens <name> contract page
    And has project name <name> on Contract page
    And <name> has number <number> on Contract page
    And <name> has address line 1 <address> on Contract page
    And <name> has address line 2 <city> on Contract page
    And <name> has address line 3 <zip> on Contract page
    And <name> has project date <date> on Contract page
    And <name> has <guaranteeAmount> created guarantees on Contract page

    Examples:
      | name      | address                 | city      | zip   | date       | number | guaranteeAmount |
      | Sun Risky | 1297, Massachusetts Ave | Arlington | 02476 | 2010-01-01 | CN     | 0               |


  Scenario Outline: Edit contract details
    Given User opens <oldName> contract page
    And types project name <newName>
    And types contract number <newNumber>
#    And chooses start date <newDate>
    When User submits changes
    Then <oldNumber> contract is not created
    And <newNumber> contract is created
    And <newName> has contract number <newNumber> in start page listing
#    And <newName> has project date <newDate> in start page listing
    And User opens <newName> contract page
    And has project name <newName> on Contract page
    And <newName> has number <newNumber> on Contract page
#    And <newName> has project date <newDate> on Contract page

    Examples:
      | oldName   | newName      | newNumber | oldNumber | newDate    |
      | Sun Risky | Cheerful sun | NN        | CN        | 2015-12-31 |












