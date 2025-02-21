import {Page, expect} from '@playwright/test';
import 'dotenv/config';

export class LoginPage {
    private page: Page;
    private usernameField = "xpath=//input[@id='user-name']";
    private passwordField = "xpath=//input[@id='password']";
    private loginButton = "xpath=//input[@id='login-button']";
    private productBanner = "xpath=//span[contains(text(),'Products')]";
    private errorInvalidCredentials = "xpath=//body/div[@id='root']/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/div[3]";
    private errorEmptyCredentials = "xpath=//body/div[@id='root']/div[1]/div[2]/div[1]/div[1]/div[1]/form[1]/div[3]";
    private burgerMenuButton = "xpath=//button[@id='react-burger-menu-btn']";
    private logoutButton = "xpath=//a[@id='logout_sidebar_link']";
    
    constructor(page:Page) {
        this.page = page;
    }

    async navigateToWebsite (){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginToWebsiteWith (username: string, password: string){
        await this.page.fill(this.usernameField, username);
        await this.page.fill(this.passwordField, password);
        await this.page.click(this.loginButton); 
    }

    async loginWithValidCredentials() {
        const username = process.env.SD_USERNAME;
        const password = process.env.SD_PASSWORD;
        if (!username || !password) {
            throw new Error('SD_USERNAME or SD_PASSWORD is not defined in environment variables.');
        }
        await this.loginToWebsiteWith(username, password);
    }

    async loginWithInvalidUsername() {
        const username = 'invalid_username';
        const password = process.env.SD_PASSWORD;
        if (!username || !password) {
            throw new Error('SD_USERNAME or SD_PASSWORD is not defined in environment variables.');
        }
        await this.loginToWebsiteWith(username, password);
    }

    async loginWithInvalidPassword() {
        const username = process.env.SD_USERNAME;
        const password = 'invalid_password';
        if (!username || !password) {
            throw new Error('SD_USERNAME or SD_PASSWORD is not defined in environment variables.');
        }
        await this.loginToWebsiteWith(username, password);
    }

    async verifyLogin () {
        await expect (this.page.locator(this.productBanner)).toBeVisible();
    }

    async verifyErrorInvalidCredentials (){
        await expect (this.page.locator(this.errorInvalidCredentials)).toBeVisible();
        const errorMessage = await this.page.locator(this.errorInvalidCredentials).textContent();
        expect (errorMessage).toBe("Epic sadface: Username and password do not match any user in this service")
    }

    async verifyErrorEmptyCredentials () {
        await expect (this.page.locator(this.errorEmptyCredentials)).toBeVisible();
        const errorMessage = await this.page.locator(this.errorEmptyCredentials).textContent();
        expect (errorMessage).toBe("Epic sadface: Username is required")
    }

    async logoutFromWebsite () {
        await this.page.click(this.burgerMenuButton);
        await this.page.click(this.logoutButton);
    }

    async verifyLogout () {
        await this.page.waitForURL('https://www.saucedemo.com/');
        const currentURL = this.page.url();
        expect (currentURL).toBe('https://www.saucedemo.com/')
    }
}