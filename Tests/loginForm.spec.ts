import {test, expect, Page} from '@playwright/test'
import { createLoginForm} from '../PageObject/loginForm_PO'
import { loginFormSelectors } from "../Selectors/loginFormSelectors"
import {utility} from "../Utilities/Utility"


test("Check email error message", async ({page})=> {
    const loginForm = createLoginForm(page);
    await loginForm.openEmailLoginForm();
    await utility.clearAndType(page, loginFormSelectors.EMAIL_FIELD, "Text");
    await page.keyboard.press("Enter", {"delay":100});
    const errorText = await page.innerText(loginFormSelectors.EMAIL_VALIDATION_ERROR_TEXT)
    expect(errorText).toEqual('Невірний формат email')
})


//Check if the password is shown in the login form after clicking the "Show password" button 
test("ShowPassword button displays a password", async({page}) => {
    const loginForm = createLoginForm(page);
        
    await loginForm.openEmailLoginForm();
    
    await loginForm.setPassword("test12");
    const passwordStatusBefore = await loginForm.getPasswordStatus();
        
    if(passwordStatusBefore === 'password'){
        await loginForm.clickPasswordToggleButton()
    }else if(passwordStatusBefore === 'text'){
        throw new Error ('Password Status Before should be invisible')
    }
    
    const passwordStatusAfter = await loginForm.getPasswordStatus();
    expect (passwordStatusAfter).toContain('text'); 
});


    const checkEmailFieldValidation = async (page: Page,  invalidEmailDataList: string[]) => {
        const loginForm = createLoginForm(page);
        for (const invalidEmail of invalidEmailDataList) {
            await loginForm.acceptEmail(invalidEmail);
            const errorMessageText = await page.innerText(loginFormSelectors.EMAIL_VALIDATION_ERROR_TEXT);
            expect(errorMessageText).toEqual("Невірний формат email")
            }
    }
    
//Check the validation of the Email field in the Login form
test("Email field validation in the Login form", async ({page}) => {
    const loginForm = createLoginForm(page);
    
    await loginForm.openEmailLoginForm();
    const loginFormHeaderText = await loginForm.getLoginFormHeaderText();
    expect(loginFormHeaderText).toContain("Вхід");
        
    const invalidEmailDataList = ["12@gmailcom", "@gmail.com", "куа@gmail.com", "12testgmail.com", "   ", " 12@gmailcom"];
    await checkEmailFieldValidation(page,invalidEmailDataList);
        
});
