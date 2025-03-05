import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login'); // 로그인 화면 진입
  // 로그인 > 메인 화면 진입
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).press('Tab');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await page.getByRole('button', { name: '로그인' }).click();
  // 고객 조회 진입
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 통합차트 진입
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화'); // 고객명 검색
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click(); // 조회 버튼 선택
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  await expect(page.getByText('통합차트')).toBeVisible();
  // 상담 진입
  await page.getByText('상담 (0)').click();
  await expect(page.getByText('상담차트 (0)')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 상담 등록
  await page.getByRole('button', { name: '+ 상담등록' }).click();
  // 상담사
  await page.getByRole('button', { name: 'Open' }).first().click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '성형' }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 상담결과
  await expect(page.locator('label').filter({ hasText: '상담결과' })).toBeVisible();
  await page.getByRole('button', { name: 'Open' }).nth(3).click();
  await page.getByRole('option', { name: '테스트결과3000' }).click();
  // 상담내용
  await expect(page.locator('label').filter({ hasText: '상담내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('상담 내용 입력 자동화');
  // 펜차트
  await expect(page.getByText('펜차트', { exact: true }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'icon-image 펜차트 샘플함' }).click();
  await page.getByLabel('ㅋ다운로드 (4).jpeg').getByRole('checkbox').check();
  // 펜차트 > 펜차트 샘플함
  await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  await page.getByRole('button', { name: '불러오기' }).click();
  await expect(page.getByText('ㅋ다운로드 (4).jpeg')).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('상담을 생성했습니다')).toBeVisible();
  // 상담 등록 확인
  await expect(page.getByText('상담차트 (1)')).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담 내용 입력 자동화' })).toBeVisible(); // 상담 내용
  await expect(page.getByRole('cell', { name: '김정연' }).nth(1)).toBeVisible(); // 상담사
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '테스트결과' })).toBeVisible(); // 상담결과
  await expect(page.getByRole('cell', { name: '건' })).toBeVisible(); // 펜차트
  // 상담 수정 진입
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)').click();
  await expect(page.getByText('상담 수정')).toBeVisible();
  // 상담사 수정
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '변준영' }).click();
  // 시/수술 카테고리 수정
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  // 시/수술명 수정
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '써마지' }).click();
  // 시/수술 카테고리 추가 및 삭제
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '+', exact: true }).click(); // 추가
  await page.getByRole('button', { name: '-', exact: true }).nth(1).click(); // 삭제
  // 시/수술 카테고리 추가 
  await page.locator('div:nth-child(2) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '성형' }).click();
  // 시/수술명 추가
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .sc-hBtRBD > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '눈수술' }).click();
  // 상담 결과 수정
  await expect(page.locator('label').filter({ hasText: '상담결과' })).toBeVisible();
  await page.locator('div:nth-child(3) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '테스트결과2999' }).click();
  // 상담 내용 수정
  await expect(page.locator('label').filter({ hasText: '상담내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('상담 내용 입력 자동화').click();
  await page.locator('pre div').filter({ hasText: '상담 내용 입력 자동화' }).fill('상담 내용 입력 자동화 수정');
  // 펜차트
  await expect(page.getByText('펜차트', { exact: true }).nth(1)).toBeVisible();
  // 펜차트 > 펜차트 샘플함
  await page.getByRole('button', { name: 'icon-image 펜차트 샘플함' }).click();
  await page.getByLabel('pantheon(6).png').getByRole('checkbox').check();
  await page.getByLabel('fizz(9).png').getByRole('checkbox').check();
  await page.getByLabel('kha copy 3(2).png').getByRole('checkbox').check();
  await page.getByRole('button', { name: '불러오기' }).click();
  // 펜차트 이미지 삭제
  await page.locator('div').filter({ hasText: /^ㅋ다운로드 \(4\)\.jpeg$/ }).getByRole('button').nth(1).click();
  // 수정 완료
  await page.getByRole('button', { name: '수정완료' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('상담을 수정했습니다. 연결된 접수정보가 업데이트 됩니다')).toBeVisible();
  // 상담 수정 확인
  await expect(page.getByRole('cell', { name: '상담 내용 입력 자동화 수정' })).toBeVisible(); // 상담내용
  await expect(page.getByRole('cell', { name: '변준영' }).nth(2)).toBeVisible(); // 상담사
  await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '써마지' })).toBeVisible(); // 시/수술 카테고리 추가
  await expect(page.getByRole('cell', { name: '눈수술' })).toBeVisible(); // 시/수술명 추가
  await expect(page.getByRole('cell', { name: '테스트결과' })).toBeVisible(); // 상담결과
  await expect(page.getByRole('cell', { name: '건' })).toBeVisible(); // 펜차트
  // 상담 삭제
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click(); // 차트 선택
  await page.getByRole('button', { name: '삭제' }).nth(1).click(); // 삭제 버튼 선택
  // 삭제 안내 팝업
  await expect(page.getByText('연동된 펜차트를 함께 삭제 하시겠습니까?')).toBeVisible();
  await expect(page.getByText('펜차트 포함 삭제')).toBeVisible(); // 삭제 옵션1
  await expect(page.getByText('차트만 삭제')).toBeVisible(); // 삭제 옵션2
  // 확인 버튼 선택
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
});