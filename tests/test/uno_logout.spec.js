import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login'); // 로그인 화면 
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  // 로그인
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // 로그아웃
  await page.getByRole('button', { name: '로그아웃' }).click();
  await expect(page.getByText('로그아웃하시겠습니까?')).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('로그아웃되었습니다')).toBeVisible();
  // 로그인 화면 
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
});