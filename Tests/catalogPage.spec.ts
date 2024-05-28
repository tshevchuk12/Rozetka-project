import {test, expect, Page } from "@playwright/test";
import { createCatalogPage } from "../PageObject/catalogPage_PO";


//Check if all required elements are presented in the product card on the Catalog page
test("Product card should contain all elements in Catalog page", async({page}) => {
    const catalogPage = createCatalogPage(page);

    await catalogPage.openCatalogPage();

    const firstClassNameList = await catalogPage.getProductCardLableFirstClassNameList();

    expect(firstClassNameList).toContain("goods-tile__label");
    expect(firstClassNameList).toContain("goods-tile__actions");
    expect(firstClassNameList).toContain("goods-tile__colors");
    expect(firstClassNameList).toContain("goods-tile__prices");
    expect(firstClassNameList).toContain("goods-tile__availability");
    expect(firstClassNameList).toContain("goods-tile__promo");
    expect(firstClassNameList).toContain("goods-tile__hidden-content")    
});


//Check "Show more" button on the Catalog page
test("Show more button increases the quantity of goods on the Catalog page", async({page})=>{
    const catalogPage = createCatalogPage(page);
    await catalogPage.openCatalogPage();

    const productsBefore = await catalogPage.getProductItemsList();
    
    await catalogPage.getExpectedGoodsQuantity(200)

    const productsAfter = await catalogPage.getProductItemsList();
    
    expect(productsAfter.length).toBeGreaterThan(productsBefore.length);
    console.log(productsAfter.length)
})