import { Page } from "@playwright/test"
import {searchPageSelectors} from "../Selectors/searchPageSelectors"
import {utility} from '../Utilities/Utility'

class SearchPage{
    private page:Page;

    constructor (page:Page){
        this.page = page
    };

    async setSearchData (data:string){
        await utility.clearAndType(this.page,searchPageSelectors.SEARCH_FIELD,data)
    };
    async getSearchPageHeader(){
        return await this.page.textContent(searchPageSelectors.SEARCHPAGE_HEADER)
    }
}

export {SearchPage}