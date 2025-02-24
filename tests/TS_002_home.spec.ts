import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage'; 
import { ProductPage } from '../pages/productPage';

test.describe('Test Case Module: Home Page', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        homePage = new HomePage (page);
        await loginPage.navigateToWebsite();
        await loginPage.loginWithValidCredentials();
      });
    
      test('TC_006 User menambahkan produk ke dalam keranjang', async () => {
        //Dapat menambahkan hingga 6 produk.
        await homePage.addProductsToCart(5);
        await homePage.verifyProductAdded('5');
      });

      test('TC_007 User ingin melihat deskripsi produk', async () => {
        await homePage.seeProductDesc();
        await productPage.backToProductsHomePage();
        await homePage.verifyBackToHomePage();
      }) 
})