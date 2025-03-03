import { Page, ElementHandle } from "@playwright/test";

    const utility = {
        clearAndType: async(page:Page, field: any, textToType:string ) =>{
           
            if ( typeof field === "string") {
                await page.click(field);
                await page.fill(field,"");
                await page.fill(field,textToType)
                } 
                else if( typeof field !== "string") {
                    await field.type("");
                    await field.type(textToType)
                }
}
}

export {utility}