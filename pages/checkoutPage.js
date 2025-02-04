import { expect, Page } from '@playwright/test';
export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.orderConfirmation = page.locator('[data-test="complete-header"]');
        this.totalPrice = page.locator('.summary_total_label');
    }

    async completeCheckout(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();

        // Assert the total price is displayed correctly
        await expect(this.totalPrice).toBeVisible();
        await this.finishButton.click();
    }

    async isOrderComplete() {
        return await this.orderConfirmation.isVisible();
    }

}
