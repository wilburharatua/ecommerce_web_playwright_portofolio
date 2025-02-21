import {Page,expect} from "@playwright/test";
import 'dotenv/config';

export class ProductPage {
    private page: Page;
    private addToCartButton = "xpath=//button[@id='add-to-cart']";
    private cartNumberCount = "xpath=//div[@id='shopping_cart_container']";
    private backToProductButton = "xpath=//button[@id='back-to-products']";

    constructor (page:Page) {
        this.page= page;
    }

    async addToCartFromProductPage () {
        await this.page.click(this.addToCartButton);
    }
    
    async backToProductsHomePage () {
        await this.page.click(this.backToProductButton); 
    }
}
