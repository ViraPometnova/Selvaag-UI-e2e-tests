Feature: Guarantee card validation

  Scenario: Guarantee card empty inputs
    Given User is logged in
    And Organisation is created with values
      | facilityName    | name           | number | address                  | city     | zip   | enabled |
      | White Tombstone | Strong Lobster | ON     | 1255, 5th Ave, Manhattan | New York | 10029 | true    |
    And Contract is created with values
      | name          | address                 | city      | zip   | date       | number | organisationName |
      | Eastern Moose | 1297, Massachusetts Ave | Arlington | 02476 | 01.01.2010 | HG     | Strong Lobster   |
    And Guarantee type is created with values
      | name           | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId | letterTemplateId | agreementId | enabled |
      | Blue Plutonium | 4200         | true           | 5                     | 60           | true           | 3                     | CDTID              | CLTID            | 1398        | true    |
    And performs new guarantee creation
    And clears unit number
    And clears beneficiary name
    And clears address line 1
    And clears address line 2
    And clears address line 3
    And clicks on bottom zero coordinates
    And selects guarantee type
    And clears contract amount
    And clears performance start date
    And clears performance end date
    And clicks on bottom zero coordinates
    Then unit number validation message is shown
    And beneficiary name validation message is shown
    And address line 1 validation message is shown
    And address line 2 validation message is shown
    And address line 3 validation message is shown
    And contract amount validation message is shown
    And performance start date validation message is shown
    And performance end date validation message is shown

  Scenario Outline: Input valid start dates
    Given User is on new guarantee page
    When sets performance start date <startDate>
    And clicks on bottom zero coordinates
    Then performance start date is set

    Examples:
      | startDate        |
      | today            |
      | today - 3 months |
      | today + 1 months |

  Scenario Outline: Input invalid start dates
    Given User is on new guarantee page
    When sets performance start date <startDate>
    And clicks on bottom zero coordinates
    Then performance start date is not set

    Examples:
      | startDate                 |
      | today - 3 months - 1 days |
      | today + 1 months + 1 days |

  Scenario Outline: Input valid end dates
    Given User is on new guarantee page
    When sets performance start date <startDate>
    And sets performance end date <endDate>
    And clicks on bottom zero coordinates
    Then performance end date is set

    Examples:
      | startDate | endDate         |
      | today     | today + 1 days  |
      | today     | today + 30 days |

  Scenario Outline: Input invalid end dates
    Given User is on new guarantee page
    When sets performance start date <startDate>
    And sets performance end date <endDate>
    And clicks on bottom zero coordinates
    Then performance end date is not set

    Examples:
      | startDate | endDate        |
      | today     | today - 1 days |
      | today     | today - 3 days |

  Scenario: Create guarantee type to test contract amount
    Given Guarantee type is created with values
      | name            | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | documentTemplateId | letterTemplateId | agreementId | enabled |
      | Strawberry Moon | 2400         | false          | 0                     | 0            | true           | 10                    | ADTID              | ALTID            | 1405        | true    |

  Scenario Outline: Input valid guarantee amounts
    Given User is on new guarantee page
    And selects guarantee type
    When sets contract amount <contractAmount>
    Then contract amount validation message is not shown

    Examples:
      | contractAmount |
      | 50000000       |
      | 50000004       |
      | 9876321        |

  Scenario Outline: Input invalid guarantee amounts
    Given User is on new guarantee page
    And selects guarantee type
    When sets contract amount <contractAmount>
    Then contract amount limit validation message is shown

    Examples:
      | contractAmount |
      | 50000005       |
      | 61234789       |








