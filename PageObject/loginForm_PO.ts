import { Page} from "@playwright/test";
import { loginFormSelectors } from "../Selectors/loginFormSelectors";
import {utility} from "../Utilities/Utility"

const createLoginForm = (page : Page) => {
    const loginForm ={   
        openPhoneLoginForm: async() => {
            await page.goto('https://rozetka.com.ua/ua/')
            await page.click(loginFormSelectors.LOGIN_BUTTON)
        },
        openEmailLoginForm: async() => {
            await loginForm.openPhoneLoginForm();
            await page.click(loginFormSelectors.EMAIL_LINK_BUTTON)
        },
        getLoginFormHeaderText: () => page.textContent(loginFormSelectors.LOGIN_FORM_HEADER), 
        setLogin: async (email:string) => {
            await utility.clearAndType(page,loginFormSelectors.EMAIL_FIELD,email)
        },
        setPassword: async(password:string)=> {
            await utility.clearAndType(page,loginFormSelectors.PASSWORD_FIELD,password) 
        },
        getErrorText: {
           passwordError: () => page.innerText(loginFormSelectors.PASSWORD_ERROR_TEXT)
        },
        getPasswordStatus: () => page.getAttribute(loginFormSelectors.PASSWORD_FIELD, 'type'),
        
        clickPasswordToggleButton: () => page.click(loginFormSelectors.PASSWORD_TOGGLE_BUTTON),

        acceptEmail: async (emilToInsert:string) => {
            await utility.clearAndType(page,loginFormSelectors.EMAIL_FIELD, emilToInsert);
            await page.click(loginFormSelectors.EMAIL_SUBMIT_BUTTON);
        
        }
    }
    return loginForm
}

export {createLoginForm}
