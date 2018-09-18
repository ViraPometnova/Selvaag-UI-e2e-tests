export enum ValidationMessage {
    DeleteContract = "Contract with guarantees can't be removed",
    MaintenanceAmount = "Maintenance amount can't be greater than 5000000 NOK",
    PerformanceAmount = "Performance amount can't be greater than 5000000 NOK",
    StartDateLeftLimit = "Start date can't be less than 3 months from now",
    StartDateRightLimit = "Start date can't be greater than 1 month from now",
}
