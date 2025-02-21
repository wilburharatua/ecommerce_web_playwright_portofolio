import {expect, test} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import 'dotenv/config';

test.describe('Test Case Module: Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToWebsite();
      });
    
      test('User melakukan login dengan credential valid', async () => {
        await loginPage.loginWithValidCredentials();
        await loginPage.verifyLogin();
      });

      test('User melakukan login dengan username invalid', async () => {
        await loginPage.loginWithInvalidUsername();
        await loginPage.verifyErrorInvalidCredentials();
      });

      test('User melakukan login dengan password invalid', async () => {
        await loginPage.loginWithInvalidUsername();
        await loginPage.verifyErrorInvalidCredentials();
      });

      test('User melakukan login tanpa mengisi credential', async () => {
        await loginPage.loginToWebsiteWith('', '');
        await loginPage.verifyErrorEmptyCredentials();
      });

      test('User melakukan logout setelah login', async () => {
        await loginPage.loginWithValidCredentials();
        await loginPage.logoutFromWebsite();
        await loginPage.verifyLogout();
      });
})