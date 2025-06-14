import { Page } from "@playwright/test"
import {mainPageSelectors} from "../Selectors/mainPageSelectors"

class MainPage {
    private page:Page;

    constructor (page:Page){
        this.page = page
    };

    async openMainPage() {
        await this.page.goto('https://rozetka.com.ua/ua/', {waitUntil:"networkidle"})
    };

    async getFirstProductSectionElements() {
        const firstSectionLocator =  this.page.locator(mainPageSelectors.PRODUCT_ELEMENTS_LIST); 
        return firstSectionLocator
    };
    async getQuantityOfProducts(){
        const quantityOfProducts = (await this.getFirstProductSectionElements()).count()
            return quantityOfProducts
    };
    
    getShowMoreButtonLocator() {
		return this.page.locator(mainPageSelectors.SHOW_MORE_BUTTON);
	};

	async getShowMoreButtonName() {
		const btn = this.getShowMoreButtonLocator();
		return await btn.innerText();
	};

	async clickShowMoreButton() {
		const btn = this.getShowMoreButtonLocator();
		await btn.click();
	};


}

export { MainPage }