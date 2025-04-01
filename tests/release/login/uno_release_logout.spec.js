import { test, expect } from '@playwright/test';
import { LogoutPage } from '../../../pages/LogoutPage';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('logout test ', async ({ page }) => {
  const logoutPage = new LogoutPage(page);

  await logoutPage.goto();

  await logoutPage.login('jwpark@v2test.com','uunn2345%%');

  await expect(await logoutPage.isLoggedIn()).toBeTruthy();

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
  // await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  // await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // // 로그아웃
  // await page.getByRole('button', { name: '로그아웃' }).click();
  // await expect(page.getByText('로그아웃하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('로그아웃되었습니다')).toBeVisible();
  // await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
});