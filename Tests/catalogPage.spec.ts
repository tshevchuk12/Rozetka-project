import {test, expect } from "@playwright/test";
import { CatalogPage } from "../PageObject/catalogPage_PO";


//Check if all required elements are presented in the product card on the Catalog page
test("Product card should contain all elements in Catalog page", async({page}) => {
    const catalogPage = new CatalogPage(page);

    await catalogPage.openCatalogPage();

    const firstClassNameList = await catalogPage.getProductCardLabelFirstClassNameList();

    expect(firstClassNameList).toContain("tile-promo-label");
    expect(firstClassNameList).toContain("action-buttons");
    expect(firstClassNameList).toContain("tile-title");
    expect(firstClassNameList).toContain("price");
    expect(firstClassNameList).toContain("buy-button");
    expect(firstClassNameList).toContain("tile-image");
   
});


//Check "Show more" button on the Catalog page
test("Show more button increases the quantity of goods on the Catalog page", async({page})=>{
    const catalogPage = new CatalogPage(page);
    await catalogPage.openCatalogPage();

    const productsCountBefore = await catalogPage.getQuantityOfProducts();
   
    await catalogPage.getExpectedGoodsQuantity(200)

    const productsCountAfter = await catalogPage.getQuantityOfProducts();
    
    expect(productsCountAfter).toBeGreaterThan(productsCountBefore);
    console.log(productsCountAfter)
})