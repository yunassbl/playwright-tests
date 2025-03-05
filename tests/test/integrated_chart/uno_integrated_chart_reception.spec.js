import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login'); // 메인 화면 진입
  // 로그인
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await page.getByRole('button', { name: '로그인' }).click();
  // 통합차트 진입
  await expect(page.getByRole('button', { name: 'icon-home 현황판 (홈)' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'icon-search 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click(); // 고객 조회 진입
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click(); // 통합차트 진입
  // 통합차트 > 접수 진입
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.getByText('접수 (0)').click();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 통합차트 > 접수 등록
  await page.getByRole('button', { name: '+ 접수등록' }).click();
  // 접수 등록
  await expect(page.getByText('접수 등록')).toBeVisible();
  // 접수 종류
  await expect(page.locator('label').filter({ hasText: '접수종류' })).toBeVisible();
  await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '상담접수' }).click();
  // 접수 부서
  await expect(page.getByText('접수부서')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '파트-세부_일반형_1' }).click();
  // 일자
  await expect(page.getByText('일자')).toBeVisible(); 
  await page.getByRole('textbox', { name: '날짜선택' }).click();
  await page.getByTestId('previous-month').click(); // 이전 달
  await page.getByTestId('next-month').click(); // 다음 달
  await page.getByRole('option', { name: 'Choose 2025년 2월 11일 화요일' }).click();
  // 방문 시간
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '9:00' }).click();
  // 예상 소요 시간
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^예상 소요시간시간분$/ }).getByRole('button').click();
  await page.getByRole('menuitem', { name: '0시간 30분' }).click();
  // 내원 경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '굿닥' }).click();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 어시스트
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.locator('div:nth-child(5) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: 'nt2' }).click();
  // 작성자
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await page.locator('div:nth-child(5) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '성형' }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 접수 메모
  await expect(page.getByText('접수메모')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('접수 메모 입력 자동화');
  // 저장
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('접수를 생성했습니다')).toBeVisible(); // 저장 완료 안내 팝업 메시지
  // 저장 확인
  await expect(page.getByRole('cell', { name: '상담대기' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '당일접수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담접수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '파트' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '세부_일반형_1' })).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(10)')).toBeVisible(); // 의사
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(11)')).toBeVisible(); // 상담사
  await expect(page.getByRole('cell', { name: 'nt2' }).nth(2)).toBeVisible(); // 어시스트
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(13)')).toBeVisible(); // 내원경로
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible(); // 시/수술명
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(16)')).toBeVisible(); // 작성자
  await expect(page.getByRole('cell', { name: '접수 메모 입력 자동화' })).toBeVisible(); // 접수 메모
  // 접수 수정
  await page.getByRole('row', { name: '1 2025-02-11 09:00-09:30' }).getByRole('button').first().click();
  await expect(page.getByText('접수 수정')).toBeVisible();
  // 접수 종류
  await expect(page.locator('label').filter({ hasText: '접수종류' })).toBeVisible();
  await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '진료접수' }).click();
  // 접수 부서
  await expect(page.getByText('접수부서')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '파트-세부_일반형_2' }).click();
  // 방문 시간
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '9:30' }).click();
  // 예상 소요시간
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^예상 소요시간시간분$/ }).getByRole('button').click();
  await page.getByRole('menuitem', { name: '1시간 0분' }).click();
  // 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: 'SNS' }).click();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: 'nt2' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '변준영' }).click();
  // 어시스트
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.locator('div:nth-child(5) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '변준영' }).click();
  // 작성자
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await page.locator('div:nth-child(5) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '간편접수', exact: true }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  // 시/수술 카테고리 추가 버튼
  await page.getByRole('button', { name: '+', exact: true }).click();
  // 시/수술 카테고리 추가
  await page.locator('.sc-fUBkdm > div:nth-child(2) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  // 시/수술명 추가
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .sc-hBtRBD > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '인모드' }).click();
  // 접수 메모
  await expect(page.getByText('접수메모')).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('접수 메모 입력 자동화').click();
  await page.locator('pre div').filter({ hasText: '접수 메모 입력 자동화' }).fill('접수 메모 입력 자동화 수정');
  // 수정 완료
  await page.getByRole('button', { name: '수정완료' }).click();
  await expect(page.getByText('접수를 변경했습니다')).toBeVisible();
  // 수정 확인
  await expect(page.getByRole('cell', { name: '상담대기' })).toBeVisible(); // 접수상태
  await expect(page.getByRole('cell', { name: '당일접수' })).toBeVisible(); // 접수방법
  await expect(page.getByRole('cell', { name: '진료접수' })).toBeVisible(); // 접수종류
  await expect(page.getByRole('cell', { name: '파트' })).toBeVisible(); // 부서
  await expect(page.getByRole('cell', { name: '세부_일반형_2' })).toBeVisible(); // 세부부서
  await expect(page.getByRole('cell', { name: 'nt2' }).nth(2)).toBeVisible(); // 의사
  await expect(page.getByRole('cell', { name: '변준영' }).nth(2)).toBeVisible(); // 상담사
  await expect(page.getByRole('cell', { name: '변준영' }).nth(3)).toBeVisible(); // 어시스트
  await expect(page.getByRole('cell', { name: 'SNS' })).toBeVisible(); // 내원경로
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '인모드' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '간편접수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '접수 메모 입력 자동화 수정' })).toBeVisible(); // 접수 메모
  // 접수 차트 선택
  await page.getByRole('row', { name: '1 2025-02-11 09:30-10:30' }).getByRole('checkbox').check();
  // 접수취소 
  await page.getByRole('button', { name: '접수취소' }).click();
  await expect(page.getByText('접수가 취소됩니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요')).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('접수가 취소되었습니다')).toBeVisible();
  // 접수 취소 확인
  await expect(page.getByRole('cell', { name: '접수취소' })).toBeVisible();
  // 접수 차트 선택
  await page.getByRole('row', { name: '1 2025-02-11 09:30-10:30' }).getByRole('checkbox').check();
  // 삭제
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  await expect(page.getByText('접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요')).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('접수가 삭제되었습니다')).toBeVisible();
  await expect(page.getByText('접수차트 (0)')).toBeVisible();
});