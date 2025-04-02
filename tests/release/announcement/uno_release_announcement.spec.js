import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Announcement } from '../../../pages/Announcement';
import { Exception } from '../../../pages/Exception';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Announcement Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const announcement = new Announcement(page);
  // const exception = new Exception(page);

  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login('jwpark@v2test.com', 'uunn2345%%');

  const popupButton = page.getByText('오늘하루 보지않기');
  
  await page.waitForTimeout(2000);
  if (await popupButton.isVisible()) {
    await popupButton.click();
  }
  // await page.waitForTimeout(2000);
  // await exception.closePopupIfExists();

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();

  // 공지사항 영역 접기
  await announcement.foldAnnounce();
  
  // 공지사항 영역 펴기
  await announcement.spreadAnnounce();
  
  // 공지사항 작성 > 취소
  await announcement.clickCreate();
  await announcement.cancelCreate();
  
  // 공지사항 작성 > 일일 공지
  await announcement.clickCreate();

  await announcement.selectDaily();

  await announcement.writeDaily();
  await announcement.saveAnnounce();
  await announcement.saveSuccessCheck();

  await announcement.editDailyAnnounce();

  await announcement.editAnnounce();

  await announcement.saveAnnounce();

  await announcement.checkAnnounceEdit();

  await announcement.fixDailyAnnounce();

  await announcement.deleteDailyAnnounce();

  // 공지사항 작성 > 전체 공지
  await announcement.clickCreate();

  await announcement.selectFull();
  
  await announcement.writeFull();
  await announcement.saveAnnounce();
  // announcement.saveSuccessCheck();

  // // 전체공지 작성 확인
  // await expect(page.getByText('전체공지 작성 자동화')).toBeVisible();
  // await page.getByText('전체공지 작성 자동화').hover();
  // await page.waitForTimeout(2000);
  // await expect(page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(3)).toBeVisible();
  // await page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(3).click();
  // await page.waitForTimeout(1000);
  // // 전체공지 수정
  // await expect(page.getByText('종류선택')).toBeVisible();
  // await expect(page.getByRole('button', { name: '전체공지' })).toBeVisible();
  // await expect(page.getByText('전체공지 작성 자동화')).toBeVisible();
  // await expect(page.getByText('전체공지 작성 자동화')).toBeVisible();
  // await page.getByText('전체공지 작성 자동화').click();
  // await page.waitForTimeout(1000);
  // await page.locator('pre div').filter({ hasText: '전체공지 작성 자동화' }).fill('전체공지 작성 자동화 수정');
  // await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  // await page.getByRole('button', { name: '저장' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('전체공지 작성 자동화 수정')).toBeVisible();
  // // 전체공지 고정
  // await expect(page.getByText('전체공지 작성 자동화')).toBeVisible();
  // await page.getByText('전체공지 작성 자동화').hover();
  // await page.waitForTimeout(2000);
  // await expect(page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(5)).toBeVisible();
  // await page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(5).click();
  // await page.waitForTimeout(1000);
  // // 전체공지 고정 확인
  // await expect(page.getByText('전체공지 작성 자동화 수정')).toBeVisible();
  // // 전체공지 삭제
  // await expect(page.getByText('전체공지 작성 자동화')).toBeVisible();
  // await page.getByText('전체공지 작성 자동화').hover();
  // await page.waitForTimeout(2000);
  // await expect(page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(4)).toBeVisible();
  // await page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(4).click();
  // // 전체공지 삭제 안내 팝업
  // await expect(page.getByText('게시글을 삭제하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();


  







});