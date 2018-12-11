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
    And clicks on bottom zero coordinates
    Then organisation name validation message is shown
    And organisation number validation message is shown
    And address line 1 validation message is shown
    And address line 2 validation message is shown
    And address line 3 validation message is shown

  Scenario: Create Facility member
    Given User is on Facility members page
    And performs new Facility member creation
    And fills organisation card with values
      | facilityName  | name            | number | address        | city  | zip   | enabled | contractsAmount |
      | Rich Railroad | Facility member | FMN    | Ocean drive 12 | Miami | 33139 | true    | 0               |
    When User submits changes
    Then Facility member is present in Facility member list
    And Facility member is present in start page listing
    And Facility member is present on Facility member page

  Scenario: Edit Facility member
    Given User is on Facility members page
    And opens Facility member
    And edit Facility member data
      | name                | number |
      | Edited organisation | EON    |
    When User submits changes
    Then old Facility member is not created
    And edited Facility member is created


  Scenario: Disable Facility member
    Given Organisation is created with values
      | facilityName     | name                     | number | address        | city  | zip   | enabled |
      | Barbershop Rapid | Disabled facility member | DFN    | Ocean drive 12 | Miami | 33139 | true    |
    And User is on Facility members page
    And opens Facility member to disable
    And makes organisation disabled
    When User submits changes
    Then Facility member is disabled in Facility members list
    And Facility member is disabled for adding contracts from start page listing
    And Facility member is disabled for adding contracts from Facility member page



