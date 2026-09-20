import { test, expect } from '@playwright/test';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

async function login(page: Parameters<typeof test>[0]['page']) {
  await page.goto('https://www.saucedemo.com');
  await page.locator('[data-test="username"]').fill(USERNAME);
  await page.locator('[data-test="password"]').fill(PASSWORD);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/\/inventory\.html$/);
}

async function addBackpack(page: Parameters<typeof test>[0]['page']) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
}

test.describe('SauceDemo checkout flow', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('happy path checkout completes with correct totals', async ({ page }) => {
    await addBackpack(page);
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.locator('[data-test="payment-info-label"]')).toContainText('Payment Information');
    await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $32.39');
    await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $29.99');
    await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax: $2.40');

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });

  test('required fields block checkout until valid data is entered', async ({ page }) => {
    await addBackpack(page);
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="error"]').first()).toContainText(/First Name|Last Name|Postal Code/);
    await expect(page.locator('[data-test="error"]').first()).toBeVisible();
  });

  test('cancel checkout returns to cart without placing an order', async ({ page }) => {
    await addBackpack(page);
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="cancel"]').click();

    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
  });

  test('back home from confirmation returns to the products page', async ({ page }) => {
    await addBackpack(page);
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await page.locator('[data-test="back-to-products"]').click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('.title')).toHaveText('Products');
  });
});
