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


#  Scenario Outline: Create contract
#    Given opens new contract page
#    And types project name <name>
#    And types address line 1 <address>
#    And types address line 2 <city>
#    And types address line 3 <zip>
#    And types contract number <number>
#    And chooses start date <date>
#    When User submits changes
#    Then <name> contract is created
#    And <name> has number <number> in start page listing
#    And <name> has address line 1 <address> in start page listing
#    And <name> has address line 2 <city> in start page listing
#    And <name> has address line 3 <zip> in start page listing
#    And <name> has contract date <date> in start page listing
#    And <name> has <guaranteeAmount> created guarantees in start page listing
#    And editing contract <name> is enabled from start page listing
#    And <name> new guarantee is able to be created from start page listing
#
#
#    Examples:
#      | name      | address                 | city      | zip   | date       | number | guaranteeAmount |
#      | Sun Risky | 1297, Massachusetts Ave | Arlington | 02476 | 2010-01-01 | $      | 0               |


#
#  -EDIT CONTRACT DETAILS-
#  GIVEN -ADD NEW CONTRACT-
#  AND user opens contract to edit
#  AND makes changes: update project name/address/date/ or contract number
#  WHEN submits changes
#  THEN contract details are updated
#  AND draft guarantees contain updated contract details
#  AND draft guarantee wordings contain updated contract details












