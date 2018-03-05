import {CurrentRun} from "../support/currentRun";
import {facilityData} from "../test-data/facilityData";

export const facilityMemberData = {
    address: '1255, 5th Ave, Manhattan',
    city: 'New York',
    zip: '10029',
    organisationName: CurrentRun.uniqueName('Svartis'),
    organisationNumber: CurrentRun.uniqueNumber('?'),
    enabled: true,
    facilityName: CurrentRun.uniqueName(facilityData.name)
};