import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage'; 
import { ProductPage } from '../pages/productPage';


test.describe('Test Case Module: Product Page', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage (page);
        productPage = new ProductPage (page);
        await loginPage.navigateToWebsite();
        await loginPage.loginWithValidCredentials();
      });
    
      test('TC_008 User ingin menambahkan produk kedalam keranjang setelah melihat deskripsi produk', async () => {
        await homePage.seeProductDesc();
        await productPage.addToCartFromProductPage();
        await productPage.backToProductsHomePage();
        await homePage.verifyProductAdded('1');
      });  
})