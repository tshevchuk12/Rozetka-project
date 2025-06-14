import {test, expect, Page, ElementHandle } from '@playwright/test'
import { MainPage } from '../PageObject/mainPage_PO'


//Check if the number of visible products in the section is increased on the Main page after clicking the "Show more" button 
test("ShowMore button increases visible products", async({page}) => {
    const mainPage = new MainPage(page);
    
    await mainPage.openMainPage();
    const firstSectionElementsBefore = await mainPage.getQuantityOfProducts();
    
    const buttonName = await mainPage.getShowMoreButtonName();
    expect(buttonName).toContain('Показати ще');

    await  mainPage.clickShowMoreButton();   
    
    const firstSectionElementsAfter = await mainPage.getQuantityOfProducts();
    expect(firstSectionElementsAfter).toBeGreaterThan(firstSectionElementsBefore)
      
});
