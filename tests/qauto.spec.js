// @ts-check
import { test, expect } from '@playwright/test';

test.describe('QAuto Main Page Tests', () => {
  test('should load main page and verify hero section', async ({ page }) => {
    
    await page.goto('/');

   
    await expect(page).toHaveTitle(/Hillel Qauto/i);

    const signInBtn = page.locator('button.header_signin, button:has-text("Sign in"), button:has-text("Sign In")');
    await expect(signInBtn.first()).toBeVisible();
  });
});
