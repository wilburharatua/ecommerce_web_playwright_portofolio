import {Page,expect} from '@playwright/test';

export class CartPage {
    private page: Page;
    private checkOutButton = "xpath=//button[@id='checkout']";
    private firstNameField = "xpath=//input[@id='first-name']";
    private lastNameField = "xpath=//input[@id='last-name']";
    private zipPostalCode = "xpath=//input[@id='postal-code']";
    private continueButton = "xpath=//input[@id='continue']";
    private finishButton = "xpath=//button[@id='finish']";
    private backtoHomeButton = "//button[@id='back-to-products']";
    private errorPopUp = 'xpath=//*[@id="checkout_info_container"]/div/form/div[1]/div[4]';
    private successPopup = "xpath=//h2[contains(text(),'Thank you for your order!')]";
;
    constructor(page:Page){
        this.page= page;
    }

    async checkoutProduct () {
        await this.page.click(this.checkOutButton);
        await this.page.fill(this.firstNameField, 'User');
        await this.page.fill(this.lastNameField, 'Testing');
        await this.page.fill(this.zipPostalCode,'210800');
        await this.page.click(this.continueButton);
        await this.page.click(this.finishButton);
        await expect (this.page.locator(this.successPopup)).toBeVisible();
        const successPopup = await this.page.locator(this.successPopup).textContent();
        expect (successPopup).toBe('Thank you for your order!');
        await this.page.click(this.backtoHomeButton);
    }

    async checkoutWithoutInputFirstname () {
        await this.page.click(this.checkOutButton);
        await this.page.fill(this.firstNameField, '');
        await this.page.fill(this.lastNameField, 'Testing');
        await this.page.fill(this.zipPostalCode,'210800');
        await this.page.click(this.continueButton);    
    }

    async checkoutWithoutInputLastName () {
        await this.page.click(this.checkOutButton);
        await this.page.fill(this.firstNameField, 'User');
        await this.page.fill(this.lastNameField, '');
        await this.page.fill(this.zipPostalCode,'210800');
        await this.page.click(this.continueButton);    
    }

    async checkoutWithoutInputPostalCode () {
        await this.page.click(this.checkOutButton);
        await this.page.fill(this.firstNameField, 'User');
        await this.page.fill(this.lastNameField, 'Testing');
        await this.page.fill(this.zipPostalCode,'');
        await this.page.click(this.continueButton);    
    }

    async verifyFirstNameErrorPopup () {
        await expect(this.page.locator(this.errorPopUp)).toBeVisible();
        const firstNameErrorPopup = await this.page.locator(this.errorPopUp).textContent();
        expect (firstNameErrorPopup).toBe('Error: First Name is required');
    }

    async verifyLastNameErrorPopup () {
        await expect(this.page.locator(this.errorPopUp)).toBeVisible();
        const lastNameErrorPopup = await this.page.locator(this.errorPopUp).textContent();
        expect (lastNameErrorPopup).toBe('Error: Last Name is required');
    }

    async verifyPostalCodeErrorPopup () {
        await expect(this.page.locator(this.errorPopUp)).toBeVisible();
        const postalErrorPopup = await this.page.locator(this.errorPopUp).textContent();
        expect (postalErrorPopup).toBe('Error: Postal Code is required');
    }
}