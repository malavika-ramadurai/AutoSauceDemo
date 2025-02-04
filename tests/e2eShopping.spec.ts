import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
//const testData = require('../data/testData.json');
import * as fs from 'fs';
const rawData = fs.readFileSync('./data/testData.json', 'utf-8');
const testData = JSON.parse(rawData);

test.describe('Checkout Flow - SauceDemo', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    // 🔹 **xUnit Setup: Runs before each test**
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        // Navigate to login page
        await loginPage.goto();
    });

    // 🔹 **xUnit Data-Driven Tests**
    testData.forEach((data) => {
        test(`Checkout Flow for ${data.username}`, async ({ page }) => {
            // Step 1: Log in
            await loginPage.login(data.username, data.password);

            // Step 2: Add items to cart
            await inventoryPage.addItemsToCart();
            await inventoryPage.goToCart();

            // Modify cart and assert item count
            await cartPage.removeItem();
            await cartPage.proceedToCheckout();

            // Step 4: Enter checkout details and complete order
           await checkoutPage.completeCheckout(data.firstName, data.lastName, data.postalCode);

            // Verify order completion
            expect(await checkoutPage.isOrderComplete()).toBeTruthy();
        });
    });

    // 🔹 **xUnit Cleanup: Runs after each test**
    test.afterEach(async ({ page }) => {
        console.log('Test case completed. Cleaning up...');
        //await page.close(); // Ensures proper session cleanup
    });
});
