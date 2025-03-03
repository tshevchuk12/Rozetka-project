import {test, expect, Page, ElementHandle } from '@playwright/test'
import { createMainPage } from '../PageObject/mainPage_PO'


//Check if the number of visible products in the section is increased on the Main page after clicking the "Show more" button 
test("ShowMore button increases visible products", async({page}) => {
    const mainPage = createMainPage(page);
    
    await mainPage.openMainPage();
    const firstSectionElementsBefore = await mainPage.getQuantityOfProducts();
    
    const buttonName = await mainPage.showMoreButton.getName();
    expect(buttonName).toContain('Показати ще');

    await  mainPage.showMoreButton.click();   
    
    const firstSectionElementsAfter = await mainPage.getQuantityOfProducts();
    expect(firstSectionElementsAfter).toBeGreaterThan(firstSectionElementsBefore)
      
});
