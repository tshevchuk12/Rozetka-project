import { Page } from "@playwright/test"
import {mainPageSelectors} from "../Selectors/mainPageSelectors"

const createMainPage = (page: Page) => {
    const mainPage = {
        openMainPage: () => page.goto('https://rozetka.com.ua/ua/', {waitUntil:"networkidle"}), 
    
        getFirstProductSectionElements: async() => {
            const firstSectionLocator =  page.locator(mainPageSelectors.PRODUCT_ELEMENTS_LIST); 
            return firstSectionLocator
        },
        getQuantityOfProducts: async() => {
            const quantityOfProducts = (await mainPage.getFirstProductSectionElements()).count()
            return quantityOfProducts
        },
        showMoreButton: {
            getButtonLocator: () => {
                const showMoreButton = page.locator(mainPageSelectors.SHOW_MORE_BUTTON)
                return showMoreButton
            },
            getName: async() => {
                const showMoreButton = mainPage.showMoreButton.getButtonLocator()
                return await showMoreButton.innerText();
        
            },
            click: async() => {
                const showMoreButton =  mainPage.showMoreButton.getButtonLocator()
                await showMoreButton?.click()
            }
            
        }
    }
return mainPage
}

export { createMainPage }