import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => { 
  await page.goto('https://test.unocare.co.kr/login'); // 로그인 화면 진입
  // await page.goto('https://staging.unocare.co.kr/login');
  // 메인 화면
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await page.getByRole('button', { name: '로그인' }).click();
  // 고객 조회
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 통합차트
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 예약 진입
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.getByText('예약 (0)').click();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 예약 등록
  await page.getByRole('button', { name: '+ 예약등록' }).click();
  await expect(page.getByText('예약 등록')).toBeVisible();
  // 예약 종류
  await expect(page.locator('label').filter({ hasText: '예약종류' })).toBeVisible();
  await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click(); 
  await page.getByRole('option', { name: '상담예약' }).click();
  // 예약 부서 
  await expect(page.getByText('예약부서')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '파트-세부_일반형_1' }).click();
  // 방문 시간 선택
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '9:00' }).click();
  // 예상 소요 시간 
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^예상 소요시간시간분$/ }).getByRole('button').click();
  await page.getByRole('menuitem', { name: '1시간 0분' }).click();
  // 내원경로
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
  await page.locator('.sc-fUBkdm > .sc-iXzfSG > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '성형' }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.locator('.sc-hBtRBD > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 예약 메모
  await expect(page.getByText('예약메모')).toBeVisible();
  await page.locator('pre').getByRole('paragraph').click();
  await page.locator('pre div').first().fill('예약 메모 입력 자동화');
  // 예약 저장
  await page.getByRole('button', { name: '저장' }).click(); // 저장 
  await page.waitForTimeout(3000);
  await expect(page.getByText('예약을 등록했습니다')).toBeVisible();
  // 예약 등록 확인
  await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화' })).toBeVisible(); // 상담내용
  await expect(page.getByRole('cell', { name: '예약', exact: true })).toBeVisible(); // 예약 상태
  await expect(page.getByRole('cell', { name: '상담예약' })).toBeVisible(); // 예약 종류
  await expect(page.getByRole('cell', { name: '파트' })).toBeVisible(); // 부서
  await expect(page.getByRole('cell', { name: '세부_일반형_1' })).toBeVisible(); // 세부 부서
  await expect(page.getByRole('cell', { name: '김정연' }).nth(1)).toBeVisible(); // 상담사
  await expect(page.getByRole('cell', { name: '김정연' }).nth(2)).toBeVisible(); // 의사
  await expect(page.getByRole('cell', { name: 'nt2' }).nth(2)).toBeVisible(); // 어시스트
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '김정연' }).nth(3)).toBeVisible(); // 작성자
  // 예약 수정 
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)').click();
  await expect(page.getByText('예약 수정')).toBeVisible();
  // 예약 종류 수정
  await expect(page.locator('label').filter({ hasText: '예약종류' })).toBeVisible();
  await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '진료예약' }).click();
  // 예약 부서 수정
  await expect(page.getByText('예약부서')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '파트-세부_일반형_2' }).click();
  // 방문시간 수정
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '9:30' }).click();
  // 예상 소요시간 수정
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^예상 소요시간시간분$/ }).getByRole('button').click();
  await page.getByRole('menuitem', { name: '1시간 0분' }).click();
  // 내원경로 수정
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: 'SNS' }).click();
  // 의사 수정
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: 'nt2' }).click();
  // 상담사 수정
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '변준영' }).click();
  // 어시스트 수정
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.locator('div:nth-child(5) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '변준영' }).click();
  // 작성자 수정
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await page.locator('div:nth-child(5) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '간편접수', exact: true }).click();
  // 시/수술 카테고리 추가 및 삭제
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '-', exact: true }).nth(1).click();
  // 시/수술 카테고리 추가
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.locator('.sc-fUBkdm > div:nth-child(2) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  // 시/수술명 추가
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .sc-hBtRBD > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '인모드' }).click();
  // 예약 메모 수정
  await expect(page.getByText('예약메모')).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('예약 메모 입력 자동화').click();
  await page.locator('pre div').filter({ hasText: '예약 메모 입력 자동화' }).fill('예약 메모 입력 자동화 수정');
  // 예약 수정 > 수정완료 버튼 선택 
  await page.getByRole('button', { name: '수정완료' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('예약 및 예약문자를 변경했습니다')).toBeVisible();
  // 예약 수정 확인
  await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화 수정' })).toBeVisible(); // 예약 메모
  await expect(page.getByRole('cell', { name: '예약', exact: true })).toBeVisible(); // 예약 상태
  await expect(page.getByRole('cell', { name: '진료예약' })).toBeVisible(); // 예약 종류
  await expect(page.getByRole('cell', { name: '파트' })).toBeVisible(); // 부서
  await expect(page.getByRole('cell', { name: '세부_일반형_2' })).toBeVisible(); // 세부 부서 
  await expect(page.getByRole('cell', { name: '변준영' }).nth(2)).toBeVisible(); // 상담사
  await expect(page.getByRole('cell', { name: 'nt2' }).nth(2)).toBeVisible(); // 의사
  await expect(page.getByRole('cell', { name: '변준영' }).nth(3)).toBeVisible(); // 어시스트
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible(); // 시/수술 카테고리 추가
  await expect(page.getByRole('cell', { name: '인모드' })).toBeVisible(); // 시/수술명 추가
  await expect(page.getByRole('cell', { name: '간편접수' })).toBeVisible(); // 작성자
  // 예약 취소
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await page.getByRole('button', { name: '예약취소' }).click(); // 예약 취소 버튼 선택
  // 예약 취소 안내 팝업 진입 확인
  await expect(page.getByText('[즉시 전송 예약문자]가 있습니다.전송하시겠습니까?다른 예약문자 취소는 [문자설정]에서 가능합니다.미리보기')).toBeVisible();
  await page.getByRole('button', { name: '미전송' }).click(); // 미전송 선택
  await page.waitForTimeout(3000);
  // 예약 취소 확인
  await expect(page.getByText('예약이 취소되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '예약취소' })).toBeVisible();
  // 예약 삭제 
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('예약차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [예약취소] 로 처리 하세요')).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click(); // 삭제 안내 팝업 > 삭제 확인
  await page.waitForTimeout(3000);
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
});
