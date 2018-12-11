Feature: Guarantee card validation

  Scenario: Guarantee card empty inputs
    Given User is logged in
    And Organisation is created with values
      | facilityName    | name           | number | address                    | city   | zip   | enabled |
      | White Tombstone | Strong Lobster | ON     | 45, Paseo de la Castellana | Madrid | 28046 | true    |
    And Contract is created with values
      | name          | address                          | city         | zip   | organisationName |
      | Eastern Moose | 897, Av. Corrientes, San Nicolas | Buenos Aires | C1043 | Strong Lobster   |
    And Guarantee type is created with values
      | name               | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | enabled |
      | Combined Plutonium | 4200         | true           | 5                     | 60           | true           | 3                     | true    |
    And performs new guarantee creation
    And selects guarantee type
    And clicks preview draft
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
    And selects guarantee type
    When sets performance start date <startDate>
    And clicks on top zero coordinates
    Then performance start date is set

    Examples:
      | startDate        |
      | today            |
      | today - 3 months |
      | today + 1 months |

  Scenario Outline: Input invalid start dates
    Given User is on new guarantee page
    And selects guarantee type
    When sets performance start date <startDate>
    And clicks on top zero coordinates
    Then performance start date is not set

    Examples:
      | startDate                 |
      | today - 3 months - 1 days |
      | today + 1 months + 1 days |

  Scenario Outline: Input valid end dates
    Given User is on new guarantee page
    And selects guarantee type
    When sets performance start date <startDate>
    And sets performance end date <endDate>
    And clicks on top zero coordinates
    Then performance end date is set

    Examples:
      | startDate | endDate         |
      | today     | today + 1 days  |
      | today     | today + 30 days |

  Scenario Outline: Input invalid end dates
    Given User is on new guarantee page
    And selects guarantee type
    When sets performance start date <startDate>
    And sets performance end date <endDate>
    And clicks on top zero coordinates
    Then performance end date is not set

    Examples:
      | startDate | endDate        |
      | today     | today - 1 days |
      | today     | today - 3 days |

  Scenario: Create guarantee with invalid start date left limit via WebApi
    When Guarantee is created with invalid start date left limit
      | unitNumber | beneficiaryName       | address | city | zip | contractAmount | startDate                 | endDate          | approveNow | contractName  | organisationName | guaranteeType      |
      | unitNumber | Left Limit Start Date | Address | City | Zip | 780000         | today - 3 months - 1 days | today + 9 months | False      | Eastern Moose | Strong Lobster   | Combined Plutonium |
    Then Guarantee is not created

  Scenario: Create guarantee with invalid maintenance amount via WebApi
    When Guarantee is created with invalid maintenance amount
      | unitNumber | beneficiaryName    | address | city | zip | contractAmount | startDate | endDate          | approveNow | contractName  | organisationName | guaranteeType      |
      | unitNumber | Maintenance Amount | Address | City | Zip | 100000100      | today     | today + 9 months | False      | Eastern Moose | Strong Lobster   | Combined Plutonium |
    Then Guarantee is not created

  Scenario: Create guarantee type to test contract amount
    Given Guarantee type is created with values
      | name             | fixedPremium | hasMaintenance | maintenancePercentage | monthsAmount | hasPerformance | performancePercentage | enabled |
      | Performance Moon | 2400         | false          | 0                     | 0            | true           | 10                    | true    |

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

  Scenario: Create guarantee with invalid start date right limit via WebApi
    When Guarantee is created with invalid start date right limit
      | unitNumber | beneficiaryName        | address | city | zip | contractAmount | startDate                 | endDate          | approveNow | contractName  | organisationName | guaranteeType    |
      | unitNumber | Right Limit Start Date | Address | City | Zip | 1250000        | today + 1 months + 1 days | today + 6 months | False      | Eastern Moose | Strong Lobster   | Performance Moon |
    Then Guarantee is not created

  Scenario: Create guarantee with invalid performance amount via WebApi
    When Guarantee is created with invalid performance amount
      | unitNumber | beneficiaryName    | address | city | zip | contractAmount | startDate | endDate          | approveNow | contractName  | organisationName | guaranteeType    |
      | unitNumber | Performance Amount | Address | City | Zip | 50000100       | today     | today + 5 months | False      | Eastern Moose | Strong Lobster   | Performance Moon |
    Then Guarantee is not created









