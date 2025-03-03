import { Page} from "@playwright/test";
import { catalogPageSelectors } from "../Selectors/catalogPageSelectors"; 

const createCatalogPage = (page:Page) => {
    const catalogPage = {
        openCatalogPage: () => page.goto("https://rozetka.com.ua/ua/notebooks/c80004/", {waitUntil:"networkidle"}),
        
        getProductCardLableFirstClassNameList: async() => {
            const firstProductCard = page.locator(catalogPageSelectors.PRODUCT_CARD).first()
            const productLableItems =  firstProductCard.locator(catalogPageSelectors.PRODUCT_LABLE_ITEMS)
            const productCardLableClassNames = await productLableItems.evaluateAll((elements) => elements.map((el) => el.getAttribute('class')))
            const firstClassNameList = productCardLableClassNames.map((className)=> className?.split(" ")[0]);
            return firstClassNameList
        },
        
        getProductItemsList: async() => {
            const productItems = page.locator(catalogPageSelectors.PRODUCT_ITEMS_LIST)
            return productItems
        },
        
        getQuantityOfProducts: async() => {
            const quantityOfProducts = (await catalogPage.getProductItemsList()).count()
            return quantityOfProducts
        },

        clickShowMoreButton: async() => {
            await page.click(catalogPageSelectors.SHOW_MORE_BUTTON)
        },

        getExpectedGoodsQuantity: async(expectedGoodsQuantity: number) => {
            const goodsQuantity = await catalogPage.getQuantityOfProducts();
        if (goodsQuantity < 200){
            //await page.waitForTimeout(5000)
            await page.waitForSelector(catalogPageSelectors.SHOW_MORE_BUTTON)
            await page.click(catalogPageSelectors.SHOW_MORE_BUTTON)
            await catalogPage.getExpectedGoodsQuantity(expectedGoodsQuantity)
        }}
    }
    return catalogPage
}

export {createCatalogPage}