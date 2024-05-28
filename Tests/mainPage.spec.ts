import {test, expect, Page, ElementHandle } from '@playwright/test'
import { createMainPage } from '../PageObject/mainPage_PO'


//Check if the number of visible products in the section is increased on the Main page after clicking the "Show more" button 
test("ShowMore button increases visible products", async({page}) => {
    const mainPage = createMainPage(page);
    
    await mainPage.openMainPage();
    const firstSectionElementsBefore = await mainPage.getFirstProductSectionElements();
    
    const buttonName = await mainPage.showMoreButton.getName();
    expect(buttonName).toContain('Показати ще');

    await  mainPage.showMoreButton.click();   
    
    const firstSectionElementsAfter = await mainPage.getFirstProductSectionElements();
    expect(firstSectionElementsAfter.length).toBeGreaterThan(firstSectionElementsBefore.length)
      
});


test("Each product section contains a ShowMore button on the Main page",async({page}) => {
    const mainPage = createMainPage(page);
    
    await mainPage.openMainPage();
    
    await mainPage.scrollToLastElement(10);

    const productSectionsList = await mainPage.getProductSectionsList()
    expect(productSectionsList.length).toEqual(10);

    const lastProductSectionTitle = await productSectionsList[9].innerText();
    expect(lastProductSectionTitle).toContain('Зараз користуються попитом');
    
    const showMoreButtonList = await mainPage.getShowMoreButtonList();
    expect(showMoreButtonList.length).toEqual(productSectionsList.length)
  });