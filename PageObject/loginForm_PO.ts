import { Page} from "@playwright/test";
import { loginFormSelectors } from "../Selectors/loginFormSelectors";
import {utility} from "../Utilities/Utility"

class LoginForm {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async openPhoneLoginForm() {
		await this.page.goto('https://rozetka.com.ua/ua/', { waitUntil: 'networkidle' });
		await this.page.click(loginFormSelectors.LOGIN_BUTTON);
	}

	async openEmailLoginForm() {
		await this.openPhoneLoginForm();
		await this.page.click(loginFormSelectors.OTHER_AUTHORIZATION_BUTTON)
		await this.page.click(loginFormSelectors.EMAIL_LINK_BUTTON);
	}

	async getLoginFormHeaderText() {
		return this.page.textContent(loginFormSelectors.LOGIN_FORM_HEADER);
	}

	async setLogin(email: string) {
		await utility.clearAndType(this.page, loginFormSelectors.EMAIL_FIELD, email);
	}

	async setPassword(password: string) {
		await utility.clearAndType(this.page, loginFormSelectors.PASSWORD_FIELD, password);
	}

	async getPasswordStatus() {
		return this.page.getAttribute(loginFormSelectors.PASSWORD_FIELD, 'type');
	}

	async clickPasswordToggleButton() {
		await this.page.click(loginFormSelectors.PASSWORD_TOGGLE_BUTTON);
	}

	async acceptEmail(emailToInsert: string) {
		await utility.clearAndType(this.page, loginFormSelectors.EMAIL_FIELD, emailToInsert);
		await this.page.click(loginFormSelectors.EMAIL_SUBMIT_BUTTON);
	}
}

export { LoginForm };