import {expect, test} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import 'dotenv/config';

test.describe('Test Case Module: Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToWebsite();
      });
    
      test('TC_001 User melakukan login dengan credential valid', async () => {
        await loginPage.loginWithValidCredentials();
        await loginPage.verifyLogin();
      });

      test('TC_002 User melakukan login dengan username invalid', async () => {
        await loginPage.loginWithInvalidUsername();
        await loginPage.verifyErrorInvalidCredentials();
      });

      test('TC_003 User melakukan login dengan password invalid', async () => {
        await loginPage.loginWithInvalidUsername();
        await loginPage.verifyErrorInvalidCredentials();
      });

      test('TC_004 User melakukan login tanpa mengisi credential', async () => {
        await loginPage.loginToWebsiteWith('', '');
        await loginPage.verifyErrorEmptyCredentials();
      });

      test('TC_005 User melakukan logout setelah login', async () => {
        await loginPage.loginWithValidCredentials();
        await loginPage.logoutFromWebsite();
        await loginPage.verifyLogout();
      });
})