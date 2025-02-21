import {Page,expect} from '@playwright/test';

export class HomePage  {
    private page: Page;

    //Products
    private backpackAddtoCart = "xpath=//button[@id='add-to-cart-sauce-labs-backpack']";
    private jacketAddtoCart = "xpath=//button[@id='add-to-cart-sauce-labs-fleece-jacket']";
    private onesieAddtoCart = "xpath=//button[@id='add-to-cart-sauce-labs-onesie']";
    private bikeLightAddtoCart = "xpath=//button[@id='add-to-cart-sauce-labs-bike-light']";
    private boltTshirtAddtoCart = "xpath=//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']";
    private redTshirtAddtoCart = "xpath=//button[@id='add-to-cart-test.allthethings()-t-shirt-(red)']";
    //=
    private cartNumberCount = "xpath=//div[@id='shopping_cart_container']";
    private sortFilterButton = "xpath=//*[@id='header_container']/div[2]/div/span/select";
    private saucelabBackPack = "xpath=//*[@id='item_4_title_link']/div";
    private saucelabBackPackTitle = "xpath=//*[@id='inventory_item_container']/div/div/div[2]/div[1]"

    constructor (page:Page) {
        this.page = page;
    }

    async addProductsToCart (productQty: number) {
        const productSelectors = [
            this.backpackAddtoCart,
            this.jacketAddtoCart,
            this.onesieAddtoCart,
            this.bikeLightAddtoCart,
            this.boltTshirtAddtoCart,
            this.redTshirtAddtoCart
        ];
        for (let i = 0; i < productQty && i < productSelectors.length; i++) {
            await this.page.click(productSelectors[i]);
        }  
    }

    async verifyProductAdded (productAdded: string) {
        const productsAdded = await this.page.locator(this.cartNumberCount).textContent();
        expect (productsAdded).toBe(productAdded);
    }

    async useFilterAndSort () {
        await this.page.click(this.sortFilterButton);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async seeProductDesc () {
        await this.page.click(this.saucelabBackPack);
        await expect (this.page.locator(this.saucelabBackPackTitle)).toBeVisible();
        const saucelabBackPackTitle = await this.page.locator(this.saucelabBackPackTitle).textContent();
        expect (saucelabBackPackTitle).toBe('Sauce Labs Backpack');
    }

    async clickCartIcon () {
        await this.page.click(this.cartNumberCount);
    }

    async verifyBackToHomePage () {
        const currentURL = this.page.url();
        expect (currentURL).toBe('https://www.saucedemo.com/inventory.html');
    }
}