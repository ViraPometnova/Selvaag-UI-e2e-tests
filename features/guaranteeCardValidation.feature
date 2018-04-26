Feature: Guarantee card validation

  Scenario: Guarantee card empty inputs
    Given User is logged in
    And Organisation is created with values
      | facilityName | name         | number | address                  | city     | zip   | enabled |
      | Facility     | Organisation | ON     | 1255, 5th Ave, Manhattan | New York | 10029 | true    |
    And Contract is created with values
      | name     | address                 | city      | zip   | date       | number | organisationName |
      | Contract | 1297, Massachusetts Ave | Arlington | 02476 | 01.01.2010 | HG     | Organisation     |
    And performs new guarantee creation
    And clears unit number
    And clears beneficiary name
    And clears address line 1
    And clears address line 2
    And clears address line 3
    And selects combined guarantee type
    And clears contract amount
    And clears performance start date
    And clears performance end date
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
    When sets start date <startDate>
    Then start date validation message is not shown

    Examples:
      | startDate        |
      | today            |
      | today - 3 months |
      | today + 1 month  |

  Scenario Outline: Input invalid start dates
    Given User is on new guarantee page
    When sets start date <startDate>
    Then start date validation message is shown

    Examples:
      | startDate                |
      | today - 3 months - 1 day |
      | today + 1 month + 1 day  |

  Scenario Outline: Input valid end dates
    Given User is on new guarantee page
    When sets start date <startDate>
    And sets end date <endDate>
    Then end date validation message is not shown

    Examples:
      | startDate | endDate         |
      | today     | today + 1 day   |
      | today     | today + 30 days |

  Scenario Outline: Input invalid end dates
    Given User is on new guarantee page
    When sets start date <startDate>
    And sets end date <endDate>
    Then end date validation message is shown

    Examples:
      | startDate | endDate        |
      | today     | today - 1 day  |
      | today     | today - 3 days |

  Scenario Outline: Input valid guarantee amounts
    Given User is on new guarantee page
    And selects performance guarantee type
    When sets contract amount <contractAmount>
    Then contract amount validation message is not shown

    Examples:
      | contractAmount |
      | 50000000       |
      | 50000004       |
      | 9876321        |

  Scenario Outline: Input invalid guarantee amounts
    Given User is on new guarantee page
    And selects performance guarantee type
    When sets contract amount <contractAmount>
    Then contract amount validation message is shown

    Examples:
      | contractAmount |
      | 50000005       |
      | 61234789       |








