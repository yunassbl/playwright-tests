import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login('jwpark@v2test.com', 'uunn2345%%');

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();
  
});