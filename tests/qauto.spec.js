// @ts-check
import { test, expect } from '@playwright/test';

test.describe('QAuto Main Page Tests', () => {
  test('should load main page and verify hero section', async ({ page }) => {
    // Переход на главную страницу с использованием baseURL и Basic Auth из playwright.config.js
    await page.goto('/');

    // Проверка заголовка страницы (Hillel Qauto)
    await expect(page).toHaveTitle(/Hillel Qauto/i);

    // Проверка видимости кнопки Sign In в хедере
    const signInBtn = page.locator('button.header_signin, button:has-text("Sign in"), button:has-text("Sign In")');
    await expect(signInBtn.first()).toBeVisible();
  });
});
