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
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await expect(page.getByRole('textbox', { name: '비밀번호를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 확인
  await page.waitForTimeout(3000);
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // 신규 고객 등록
  await expect(page.getByRole('button', { name: '+ 신규고객등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 신규고객등록' }).click(); // 고객 등록 버튼 선택
  // 고객 등록 팝업 진입
  await expect(page.getByRole('heading', { name: '고객등록' })).toBeVisible();
  await expect(page.getByRole('button', { name: '사진 첨부하기' })).toBeVisible();
  await expect(page.getByText('사진삭제')).toBeVisible();
  await expect(page.getByText('차트번호')).toBeVisible();
  // 차트번호
  await page.getByText('직접입력').click();
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).click();
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).fill('1234567890');
  // 이름
  await page.getByRole('textbox', { name: '이름을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '이름을 입력하세요' }).fill('고객명_자동화');
  // 전화번호
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).fill('010-999-99998');
  // 주민등록번호 앞자리
  await expect(page.getByText('주민등록번호')).toBeVisible();
  await page.getByRole('textbox', { name: '앞 6자리' }).click();
  await page.getByRole('textbox', { name: '앞 6자리' }).fill('940707');
  // 주민등록번호 뒷자리
  await page.getByRole('textbox', { name: '1자리' }).click();
  await page.getByRole('textbox', { name: '1자리' }).fill('1');
  // 생년월일
  await expect(page.getByText('생년월일 (만 나이 자동계산)')).toBeVisible();
  await page.getByRole('textbox', { name: '예시)' }).click();
  await page.getByRole('option', { name: 'Choose 1994년 7월 6일 수요일' }).click();
  // 성별
  await expect(page.getByText('성별')).toBeVisible();
  await page.getByRole('radio', { name: '여성' }).check();
  // 청구번호
  await expect(page.getByText('청구번호')).toBeVisible();
  await page.getByRole('textbox', { name: '청구번호 7자리' }).click();
  await page.getByRole('textbox', { name: '청구번호 7자리' }).fill('1234567');
  // 내/외국인
  await expect(page.getByText('내/외국인')).toBeVisible();
  await page.getByRole('radio', { name: '외국인' }).check();
  // 문자 수신 동의
  await expect(page.getByText('문자수신동의')).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자수신 \(마케팅문자 포함\)$/ }).locator('label').first().click();
  // 최초 내원경로
  await expect(page.getByText('최초 내원경로 (최대 3')).toBeVisible();
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByRole('option', { name: '굿닥' }).click();
  // 소개자
  await expect(page.getByText('소개자', { exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).click();
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).fill('장지훈');
  await page.getByText('장지훈1124').click();
  // 메모
  await expect(page.getByText('메모', { exact: true })).toBeVisible();
  await page.getByRole('paragraph').click();
  await page.locator('pre div').first().fill('고객등록 메모 자동화');
  // 청구 연동 고객메모
  await expect(page.getByText('청구 연동 고객메모', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).fill('청구 연동 고객메모 자동화');
  // 상세입력 진입
  await expect(page.getByRole('button', { name: '+ 상세입력' })).toBeVisible();
  await page.getByRole('button', { name: '+ 상세입력' }).click();
  // 추가정보1 
//   await expect(page.getByText('추가정보1')).toBeVisible();
//   await page.locator('#mui-170').click();
//   await page.locator('#mui-170').fill('추가정보1 자동화');
  // 추가정보2
//   await expect(page.getByText('추가정보2')).toBeVisible();
//   await page.locator('#mui-171').click();
//   await page.locator('#mui-171').fill('추가정보2 자동화');
  // 추가정보3
//   await expect(page.getByText('추가정보3')).toBeVisible();
//   await page.locator('#mui-172').click();
//   await page.locator('#mui-172').fill('추가정보3');
  // 진료정보 영역 
  await expect(page.getByText('진료정보')).toBeVisible();
  // 담당상담사
  await expect(page.getByText('담당상담사')).toBeVisible();
  await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 담당의사
  await expect(page.getByText('담당의사')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 관심항목
  await expect(page.getByText('관심항목 (최대 3개)')).toBeVisible();
  await page.locator('.css-qz2m0v > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '성형' }).click();
  // 고객등급
  await expect(page.getByText('고객등급')).toBeVisible();
  await page.locator('div:nth-child(3) > div > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: 'WELCOME', exact: true }).click();
  // 상세정보 진입
  await expect(page.getByText('상세정보')).toBeVisible();
  // 주소
//   await expect(page.getByText('주소', { exact: true })).toBeVisible();
//   await page.getByRole('textbox', { name: '주소를 검색하세요' }).click();
//   await page.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('textbox', { name: '검색할 도로명/지번주소를 입력, 예시) 판교역로' }).click();
//   await page.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('textbox', { name: '검색할 도로명/지번주소를 입력, 예시) 판교역로' }).fill('역삼로 2길 16');
//   await page.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('button', { name: '검색' }).click();
//   await page.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('button', { name: '서울 강남구 역삼로2길 16', exact: true }).click();
//   await expect(page.getByRole('textbox', { name: '주소를 검색하세요' })).toBeVisible();
  // 상세주소
  await expect(page.getByText('상세주소')).toBeVisible();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).fill('상세주소 자동화');
  // 직업
  await expect(page.getByText('직업')).toBeVisible();
  await page.locator('.css-1xm60hv > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '기타' }).click();
  // 결혼여부
  await expect(page.getByText('결혼여부')).toBeVisible();
  await page.locator('.css-ov1ktg > div:nth-child(2) > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '미혼' }).click();
  // 국가/지역
  await expect(page.getByText('국가/지역', { exact: true })).toBeVisible();
  await page.locator('div:nth-child(3) > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '기타' }).click();
  // 불만사항
  await expect(page.getByText('불만사항')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(3) > div > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '시설' }).click();
  // 이메일
  await expect(page.getByText('이메일')).toBeVisible();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).fill('jungyun.kim@carelabs.com');
  await expect(page.getByRole('textbox', { name: '이메일을 입력하세요' })).toBeVisible();
  // 전화번호2
//   await expect(page.getByText('전화번호2')).toBeVisible();
//   await page.locator('#mui-192').click();
//   await page.locator('#mui-192').fill('010-999-99999');
  // 가족관계
  await expect(page.getByText('가족관계')).toBeVisible();
  await page.getByText('가족관계').click();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).click();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).fill('장지훈');
  await page.getByText('-8773-2277').click();
  // 신체정보 진입
  await expect(page.getByText('신체정보')).toBeVisible();
  await page.getByText('신체정보').click();
  // 키
  await expect(page.getByText('키')).toBeVisible();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).fill('180');
  // 혈액형
  await expect(page.getByText('혈액형')).toBeVisible();
  await page.locator('.sc-SrznA > .sc-dPZUQH > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: 'A', exact: true }).click();
  // 몸무게
  await expect(page.getByText('몸무게')).toBeVisible();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).fill('80');

  // 등록 완료
  await page.getByRole('button', { name: '등록완료' }).click();
  await expect(page.getByText('등록되었습니다')).toBeVisible();
});