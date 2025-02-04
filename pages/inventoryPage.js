import { expect, Page } from '@playwright/test';
export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.addBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.addBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.addOnesie = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('.shopping_cart_badge'); // Badge should update
    }

    async addItemsToCart() {
        await this.addBackpack.click();
        await this.addBikeLight.click();
        await this.addOnesie.click();

        // Assert cart has 3 items
        await expect(this.cartBadge).toHaveText('3');
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}
