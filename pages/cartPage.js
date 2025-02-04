import { expect, Page } from '@playwright/test';
export class CartPage {
    constructor(page) {
        this.page = page;
        this.removeBikeLight = page.locator('[data-test="remove-sauce-labs-bike-light"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item'); // Assert number of items
    }

    async removeItem() {
        await this.removeBikeLight.click();

        // Assert only 2 items remain in the cart
        await expect(this.cartItems).toHaveCount(2);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
