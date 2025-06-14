import { Page} from "@playwright/test";
import { catalogPageSelectors } from "../Selectors/catalogPageSelectors"; 

class CatalogPage {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async openCatalogPage() {
		await this.page.goto('https://rozetka.com.ua/ua/notebooks/c80004/', {
			waitUntil: 'networkidle',
		});
	}

	async getProductCardLabelFirstClassNameList() {
		const firstProductCard = this.page.locator(catalogPageSelectors.PRODUCT_CARD).first();
		const productLabelItems = firstProductCard.locator(catalogPageSelectors.PRODUCT_LABLE_ITEMS);

		const productCardLabelClassNames = await productLabelItems.evaluateAll((elements) =>
			elements.map((el) => el.getAttribute('class'))
		);

		return productCardLabelClassNames.map((className) => className?.split(' ')[0]);
	}

	async getProductItemsList() {
		return this.page.locator(catalogPageSelectors.PRODUCT_ITEMS_LIST);
	}

	async getQuantityOfProducts() {
		const items = await this.getProductItemsList();
		return items.count();
	}

	async clickShowMoreButton() {
		await this.page.click(catalogPageSelectors.SHOW_MORE_BUTTON);
	}

	async getExpectedGoodsQuantity(expectedGoodsQuantity: number): Promise<void> {
		const currentQuantity = await this.getQuantityOfProducts();

		if (currentQuantity < expectedGoodsQuantity) {
			await this.page.waitForSelector(catalogPageSelectors.SHOW_MORE_BUTTON);
			await this.clickShowMoreButton();
			await this.getExpectedGoodsQuantity(expectedGoodsQuantity);
		}
	}
}

export { CatalogPage };
