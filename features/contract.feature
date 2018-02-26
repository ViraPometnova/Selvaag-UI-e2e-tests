Feature: Contract

  Scenario Outline: Create contract
    Given User is logged in
    And Facility member is created
    And opens new contract page
    And types project name <name>
    And types project address line 1 <address>
    And types project address line 2 <city>
    And types project address line 3 <zip>
    And chooses start date <date>
    And types contract number <number>
    When User submits changes
    Then <name> contract is created
    And <name> has contract number <number> in listing
    And <name> has contract address <address> in listing
    And <name> has contract city <city> in listing
    And <name> has contract zip <zip> in listing
    And <name> has contract date <date> in listing
    And <name> has <guaranteeAmount> created guarantees in listing
    And editing contract <name> is enabled
    And <name> new guarantee is able to be created


    Examples:
      | name      | address                 | city      | zip   | date | number | guaranteeAmount |
      | Sun Risky | 1297, Massachusetts Ave | Arlington | 02476 |      | $      | 0               |


#
#  -EDIT CONTRACT DETAILS-
#  GIVEN -ADD NEW CONTRACT-
#  AND user opens contract to edit
#  AND makes changes: update project name/address/date/ or contract number
#  WHEN submits changes
#  THEN contract details are updated
#  AND draft guarantees contain updated contract details
#  AND draft guarantee wordings contain updated contract details












