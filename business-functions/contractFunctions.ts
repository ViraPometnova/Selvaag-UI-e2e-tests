import {ListingPage} from "../pages/listing";
import {SearchFunctions} from "./searchFunctions";

const searchFunctions = new SearchFunctions(),
    listingPage = new ListingPage();

export class ContractFunctions {

    public async openContract(contractNumber: string, contractName: string) {
        await searchFunctions.openStartPageAndSearch(contractNumber);
        await listingPage.clickEditContractLinkFor(contractName);
    }
}
