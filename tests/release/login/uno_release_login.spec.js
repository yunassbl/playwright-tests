import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login('jwpark@v2test.com', 'uunn2345%%');

  // 로그인 성공 여부 확인
  await expect(await loginPage.isLoggedin()).toBeTruthy();
  
  // await page.goto('https://unocare.co.kr/login');
  // // 로그인
  // await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  // await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('jwpark@v2test.com');
  // await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('unoc2024$$');
  // await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  // await page.getByRole('button', { name: '로그인' }).click();
  // await page.waitForTimeout(1000);
  // // 메인 화면 진입
  // await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
});