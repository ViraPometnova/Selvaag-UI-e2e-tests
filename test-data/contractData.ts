import {CurrentRun} from "../support/currentRun";
import {facilityMemberData} from "./facilityMemberData";

export const contractData = {
    number: CurrentRun.uniqueNumber('CN'),
    organisationName: facilityMemberData.organisationName,
    address: '1297, Massachusetts Ave',
    city: 'Arlington',
    zip: '02476',
    projectDate: '2010-01-01',
    projectName: CurrentRun.uniqueName('Sun Risky')
};