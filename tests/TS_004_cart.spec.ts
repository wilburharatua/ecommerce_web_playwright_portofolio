import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage'; 
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';


test.describe('Test Case Module: Cart Page', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage (page);
        productPage = new ProductPage (page);
        cartPage = new CartPage (page);
        await loginPage.navigateToWebsite();
        await loginPage.loginWithValidCredentials();
      });
    
      test('TC_009 User ingin melakukan checkout produk', async () => {
        //Dapat menambahkan hingga 6 produk.
        await homePage.addProductsToCart(4);
        await homePage.verifyProductAdded('4')
        await homePage.clickCartIcon();
        await cartPage.checkoutProduct();
        await homePage.verifyBackToHomePage();
      });

      test('TC_010 User ingin melakukan checkout produk tanpa mengisi credential first name', async () => {
        await homePage.addProductsToCart(2);
        await homePage.verifyProductAdded('2')
        await homePage.clickCartIcon();
        await cartPage.checkoutWithoutInputFirstname();
        await cartPage.verifyFirstNameErrorPopup();
      });

      test('TC_011 User ingin melakukan checkout produk tanpa mengisi credential last name', async () => {
        await homePage.addProductsToCart(2);
        await homePage.verifyProductAdded('2')
        await homePage.clickCartIcon();
        await cartPage.checkoutWithoutInputLastName();
        await cartPage.verifyLastNameErrorPopup();
      });

      test('TC_012 User ingin melakukan checkout produk tanpa mengisi credential Postal Code', async () => {
        await homePage.addProductsToCart(2);
        await homePage.verifyProductAdded('2')
        await homePage.clickCartIcon();
        await cartPage.checkoutWithoutInputPostalCode();
        await cartPage.verifyPostalCodeErrorPopup();
      });
}) 