import{test, expect, Page} from '@playwright/test'
import { createMainPage } from '../PageObject/mainPage_PO'
import { createSearchPage } from '../PageObject/searchPage_PO'


//Parameterized test 
const dataForSearch = [{text:"Lenovo",test:1}, {text:"Acer",test:2}, {text:"Nokia",test:3}, {text:"JBL",test:4}, {text:"LG",test:5}]

dataForSearch.forEach((data) => {
    test(`Search for ${data.text}`, async ({page})=>{
        const mainPage = createMainPage(page);
        const searchPage = createSearchPage(page);
        await mainPage.openMainPage();
        await searchPage.setSearchData(data.text);
        await page.keyboard.press("Enter", {"delay":100});
        const searchPageHeader = await searchPage.getSearchPageHeader();

        const searchPageHeaderText = searchPageHeader?.replace(/\s/g, ' ');
        expect(searchPageHeaderText?.trim()).toEqual(`Результати пошуку «${data.text}»`);
     
    })
})