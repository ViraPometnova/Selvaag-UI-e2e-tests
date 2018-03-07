Feature: Facility Member

  Scenario: Facility member card validation
    Given User is logged in
    And opens admin page
    And opens Facility members manager
    And performs new Facility member creation
    And clears organisation name
    And clears organisation number
    And clears address line 1
    And clears address line 2
    And clears address line 3
    And makes organisation disabled
    Then organisation name validation message is shown
    And organisation number validation message is shown
    And organisation address line 1 validation message is shown
    And address line 2 validation message is shown
    And address line 3 validation message is shown

  Scenario Outline: Create Facility member
    Given Facility is created
    And User is on Facility members page
    And performs new Facility member creation
    And chooses Facility
    And types organisation name <name>
    And types organisation number <number>
    And types address line 1 <address>
    And types address line 2 <city>
    And types address line 3 <zip>
    And makes organisation enabled
    When User submits changes
    Then <name> Facility member is created
    And <name> has number <number> in Facility members list
    And <name> has Facility in Facility members list
    And <name> has enabled <enabled> in Facility members list
    And User performs search by <number>
    And <name> has number <number> in start page listing
    And <name> has address line 1 <address> in start page listing
    And <name> has address line 2 <city> in start page listing
    And <name> has address line 3 <zip> in start page listing
    And <name> has <contractsAmount> created contracts in start page listing
    And <name> new contract is able to be created from start page listing
    And User opens <name> Facility member page
    And <name> has number <number> on Facility member page
    And <name> has address line 1 <address> on Facility member page
    And <name> has address line 2 <city> on Facility member page
    And <name> has address line 3 <zip> on Facility member page
    And <name> has <contractsAmount> created contracts on Facility member page
    And <name> new contract is able to be created from Facility member page

    Examples:
      | name    | number | address        | city  | zip   | enabled | contractsAmount |
      | Svartis | #      | Ocean drive 12 | Miami | 33139 | true    | 0               |

  Scenario Outline: Edit Facility member
    Given User is on Facility members page
    And opens facility member <oldName> to edit
    And types organisation name <newName>
    And types organisation number <newNumber>
    When User submits changes
    Then <newName> Facility member is created
    And  <oldName> Facility member is not created
    And <newName> has number <newNumber> in Facility members list
    And User performs search by <newNumber>
    And <newName> has number <newNumber> in start page listing
    And User opens <newName> Facility member page
    And <newName> has number <newNumber> on Facility member page


    Examples:
      | oldName | newName   | newNumber |
      | Svartis | Solutions | @         |

  Scenario Outline: Disable Facility member
    Given User is on Facility members page
    And opens facility member <name> to edit
    And makes organisation disabled
    When User submits changes
    Then <name> has enabled <enabled> in Facility members list
    And User performs search by <number>
    And <name> is disabled for adding contracts from start page listing
    And User opens <name> Facility member page
    And <name> is disabled for adding contracts from Facility member page

    Examples:
      | name      | enabled | number |
      | Solutions | false   | @      |



