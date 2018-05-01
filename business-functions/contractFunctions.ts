import {AddressForm} from "../pages/addressForm";
import {ContractPage} from "../pages/contract";
import {ListingPage} from "../pages/listing";
import {SearchFunctions} from "./searchFunctions";

const searchFunctions = new SearchFunctions(),
    listingPage = new ListingPage(),
    contractPage = new ContractPage(),
    addressForm = new AddressForm();

export class ContractFunctions {

    public async openContract(contractNumber: string, contractName: string) {
        await searchFunctions.openStartPageAndSearch(contractNumber);
        await listingPage.clickEditContractLinkFor(contractName);
    }

    public async populateContractCard(contractData) {
        await contractPage.setProjectName(contractData.name);
        await contractPage.setContractNumber(contractData.number);
        await contractPage.setProjectDate(contractData.date);
        await addressForm.setAddressLine1(contractData.address);
        await addressForm.setAddressLine2(contractData.city);
        await addressForm.setAddressLine3(contractData.zip);
    }
}
