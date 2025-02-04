# Playwright Test Automation with Page Object Model (POM)

## 📌 Project Overview
This project automates the end-to-end testing of the **SauceDemo** e-commerce platform using **Playwright** and the **Page Object Model (POM)** for improved maintainability and reusability.

## 🏗 Project Structure
```
/tests
  ├── sauceDemo.test.js   # Main test file
/pages
  ├── loginPage.js        # Login Page Object
  ├── inventoryPage.js    # Inventory Page Object
  ├── cartPage.js         # Cart Page Object
  ├── checkoutPage.js     # Checkout Page Object
```

## 🔧 Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo-url.git
   cd your-repo-folder
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

## 🚀 Running Tests
To execute the test suite, use the following command:
```sh
npx playwright test
```

Run tests in headed mode (to see the browser action):
```sh
npx playwright test --headed
```

Run tests in a specific browser:
```sh
npx playwright test --browser=chromium  # Options: chromium, firefox, webkit
```

## 🏗 Page Object Model (POM) Implementation
This project follows the **POM** approach, which helps in creating reusable and maintainable test automation.

### **1️⃣ Login Page (pages/loginPage.js)**
Handles login operations:
```javascript
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### **2️⃣ Inventory Page (pages/inventoryPage.js)**
Handles item selection and cart navigation:
```javascript
export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.addBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async addToCart() {
    await this.addBackpack.click();
  }
}
```

### **3️⃣ Cart Page (pages/cartPage.js)**
Handles cart interactions:
```javascript
export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
```

### **4️⃣ Checkout Page (pages/checkoutPage.js)**
Handles checkout details and order confirmation:
```javascript
export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async completeCheckout(firstName) {
    await this.firstNameInput.fill(firstName);
    await this.finishButton.click();
  }
}
```

## 📝 Test Case (tests/sauceDemo.test.js)
```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test('Complete purchase on SauceDemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.completeCheckout('John');
});
```

## 🎯 Key Features
✔ **Page Object Model (POM)** for maintainability and reusability  
✔ **Assertions** to validate test steps  
✔ **Cross-browser Testing** using Playwright  
✔ **Headless & Headed Execution** support  
✔ **Easy Setup & Execution**

## 📌 Additional Playwright Commands
Run a specific test:
```sh
npx playwright test tests/sauceDemo.test.js
```

Generate Playwright report:
```sh
npx playwright show-report
```

## 📄 License
This project is licensed under the MIT License.

---
Happy Testing! 🚀

