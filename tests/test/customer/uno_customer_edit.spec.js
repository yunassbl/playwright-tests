import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login'); // 메인 화면 진입
  // 로그인 진행
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await page.getByRole('button', { name: '로그인' }).click();
  // 고객 조회 메뉴 진입
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객조회 > 고객명 입력 
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  // 고객조회 > 필터 > 조회 버튼 선택
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  // 고객명 선택 > 통합차트 진입
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 고객 수정 진입
//   await page.getByText('수정').nth(0).click(); // 여기 수정 하자 정연아
  await page.getByText('수정', { exact: true }).click();
  await expect(page.getByRole('heading', { name: '고객수정' })).toBeVisible();
  // 주민등록번호 앞자리
  await expect(page.getByText('주민등록번호')).toBeVisible();
  await page.getByRole('textbox', { name: '앞 6자리' }).click();
  await page.getByRole('textbox', { name: '앞 6자리' }).press('ArrowRight');
  await page.getByRole('textbox', { name: '앞 6자리' }).fill('940706');
  // 주민등록번호 뒷자리 
  await page.getByRole('textbox', { name: '1자리' }).click();
  await page.getByRole('textbox', { name: '1자리' }).fill('2');
  // 청구번호
  await expect(page.getByText('청구번호')).toBeVisible();
  await page.getByRole('textbox', { name: '청구번호 7자리' }).click();
  await page.getByRole('textbox', { name: '청구번호 7자리' }).fill('1234568');
  // 내/외국인
  await page.getByRole('radio', { name: '내국인' }).check();
  // 문자수신 선택
  await expect(page.getByText('문자수신동의')).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자수신 \(마케팅문자 포함\)$/ }).locator('label').first().click();
  // 마케팅문자 선택
  await page.locator('div').filter({ hasText: /^문자수신 \(마케팅문자 포함\)$/ }).locator('label').nth(2).click();
  // 최초 내원경로
  await expect(page.getByText('최초 내원경로 (최대 3')).toBeVisible();
  await page.locator('.MuiAutocomplete-endAdornment > button:nth-child(2)').first().click();
  await page.getByRole('option', { name: 'SNS' }).click();
  await page.getByRole('option', { name: '병원홈페이지' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  // 메모
  await expect(page.getByRole('dialog').getByText('메모', { exact: true })).toBeVisible();
  await page.getByRole('paragraph').click();
  await page.locator('pre div').filter({ hasText: '고객등록 메모 자동화' }).fill('고객등록 메모 자동화 수정');
  // 청구 연동 고객메모
  await expect(page.getByRole('dialog').getByText('청구 연동 고객메모', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).fill('청구 연동 고객메모 자동화 수정');
  // 진료정보 영역
  await expect(page.getByText('진료정보')).toBeVisible();
  // 담당상담사
  await expect(page.getByRole('dialog').getByText('담당상담사')).toBeVisible();
  await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '변준영' }).click();
  // 담당의사
  await expect(page.getByRole('dialog').getByText('담당의사')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: 'nt2' }).click();
  // 관심항목
  await expect(page.getByText('관심항목 (최대 3개)')).toBeVisible();
  await page.locator('.css-qz2m0v > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > button:nth-child(2)').click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  await page.getByRole('option', { name: '리프팅' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  // 상세주소
  await expect(page.getByText('상세주소', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).fill('상세주소 자동화 수정');
  // 직업
  await expect(page.getByRole('dialog').getByText('직업')).toBeVisible();
  await page.locator('.css-1xm60hv > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: 'IT, 인터넷' }).click();
  // 결혼여부
  await expect(page.getByRole('dialog').getByText('결혼여부')).toBeVisible();
  await page.locator('.css-ov1ktg > div:nth-child(2) > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '기혼' }).click();
  // 국가/지역
  await expect(page.getByRole('dialog').getByText('국가/지역')).toBeVisible();
  await page.locator('div:nth-child(3) > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '한국/서울' }).click();
  // 불만사항
  await expect(page.getByRole('dialog').getByText('불만사항')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(3) > div > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '주차' }).click();
  // 이메일
  await expect(page.getByRole('dialog').getByText('이메일')).toBeVisible();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).fill('jungyun.kim@carelabs.co.kr');
  // 가족관계 진입
  await expect(page.getByRole('list').getByText('가족관계')).toBeVisible();
  await page.getByRole('list').getByText('가족관계').click();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).click();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).fill('김정연');
  await page.getByText('-8989-8989').click();
  // 신체정보 진입
  await expect(page.getByText('신체정보')).toBeVisible();
  await page.getByText('신체정보').click();
  // 키
  await expect(page.getByRole('dialog').getByText('키')).toBeVisible();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).fill('170');
  // 혈액형
  await expect(page.getByRole('dialog').getByText('혈액형')).toBeVisible();
  await page.locator('.sc-SrznA > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: 'B', exact: true }).click();
  // 몸무게
  await expect(page.getByRole('dialog').getByText('몸무게')).toBeVisible();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).fill('70');
  // 수정완료
  await page.getByRole('button', { name: '수정완료' }).click();
  await expect(page.getByText('수정되었습니다')).toBeVisible();
});