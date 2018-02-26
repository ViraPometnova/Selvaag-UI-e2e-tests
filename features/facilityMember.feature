Feature: Facility Member

  Scenario Outline: Facility member card validation
    Given User is logged in
    And opens admin page
    And opens Facility members manager
    And performs new Facility member creation
    And types organisation name <anyText>
    And types organisation number <anyText>
    And types organisation address line 1 <anyText>
    And types organisation address line 2 <anyText>
    And types organisation address line 3 <anyText>
#    And clears organisation name
#    And clears organisation number
#    And clears organisation address line 1
#    And clears organisation address line 2
#    And clears organisation address line 3
#    Then organisation name validation message is shown
#    And organisation number validation message is shown
    And organisation address line 1 validation message is shown
    And organisation address line 2 validation message is shown
    And organisation address line 3 validation message is shown

    Examples:
      | anyText |
      |         |

  Scenario Outline: Create Facility member
    Given Facility is created
    And User is on Facility members page
    And performs new Facility member creation
    And chooses Facility
    And types organisation name <name>
    And types organisation number <number>
    And types organisation address line 1 <address>
    And types organisation address line 2 <city>
    And types organisation address line 3 <zip>
    And makes organisation enabled
    When User submits changes
    Then <name> Facility member is created
    And <name> has number <number> in Facility members list
    And <name> has Facility in Facility members list
    And <name> has enabled <enabled> in Facility members list
    And User performs search by <number>
    And <name> has number <number> in listing
    And <name> has address line 1 <address> in listing
    And <name> has address line 2 <city> in listing
    And <name> has address line 3 <zip> in listing
    And <name> has <contractsAmount> created contracts in listing
    And <name> new contract is able to be created

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
    And <newName> has number <newNumber> in listing

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
    And <name> is disabled for adding contracts

    Examples:
      | name      | enabled | number |
      | Solutions | false   | @      |



