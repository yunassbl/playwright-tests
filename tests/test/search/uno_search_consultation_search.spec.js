import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login');
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
  // 메인 화면 진입
  await page.waitForTimeout(3000);
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객 조회 진입
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객 조회
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명' }).nth(0)).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible(); // 통합차트 진입
  // 상담 진입
  await page.getByText('상담 (0)').click();
  await expect(page.getByRole('button', { name: '+ 상담등록' })).toBeVisible();
  // 상담 등록
  await expect(page.getByRole('button', { name: '+ 상담등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 상담등록' }).click();
  // 상담사
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '성형' }).nth(0).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 상담결과
  await expect(page.locator('label').filter({ hasText: '상담결과' })).toBeVisible();
  await page.getByRole('combobox', { name: '-' }).click();
  await page.getByRole('option', { name: '해피콜' }).click();
  // 상담내용
  await expect(page.locator('label').filter({ hasText: '상담내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('상담 내용 입력 자동화');
  // 펜차트
  await expect(page.getByText('펜차트', { exact: true }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'icon-image 펜차트 샘플함' }).click();
  await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  // 펜차트 > 펜차트 샘플함
  await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  await page.getByLabel('고객상담차트.jpg').getByRole('checkbox').check();
  await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  await expect(page.getByRole('button', { name: '불러오기' })).toBeVisible();
  await page.getByRole('button', { name: '불러오기' }).click();
  await expect(page.getByText('상담 등록')).toBeVisible();
  await expect(page.getByText('고객상담차트.jpg')).toBeVisible();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('상담을 생성했습니다')).toBeVisible();
  // 상담 등록 확인
  await expect(page.getByText('상담차트 (1)')).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담 내용 입력 자동화' })).toBeVisible(); // 상담 내용
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '해피콜' })).toBeVisible(); // 상담결과
  await expect(page.getByRole('cell', { name: '건' })).toBeVisible(); // 펜차트
  // 통합차트 닫기
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('button', { name: '상담 조회' })).toBeVisible();
  await page.getByRole('button', { name: '상담 조회' }).click();
  // 상담 조회
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 고객명 검색
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  // 고객명 검색 > 통합차트 진입
  await expect(page.getByText('통합차트', { exact: true })).toBeVisible();
  // 고객명 검색 > 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 차트번호 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '차트번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '차트번호' }).click();
  await page.getByRole('textbox', { name: '차트번호' }).fill('1234568');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '차트번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1234568' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 전화번호 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '전화번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).click();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).fill('3535');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-3535-3535' })).toBeVisible();
  // 전화번호 > 메시지 전송
  await page.getByRole('cell', { name: '-3535-3535' }).getByRole('button').click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.locator('.send-message-wrapper > div > div:nth-child(2) > .MuiButtonBase-root').click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 전화번호 > 메시지 전송 (카카오톡)
  await page.getByRole('cell', { name: '-3535-3535' }).locator('path').nth(1).click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터
  await expect(page.getByRole('button', { name: '+ 상세필터' })).toBeVisible();
  await page.getByRole('button', { name: '+ 상세필터' }).click();
  // 상세 필터 > 접수 방법 검색
  await expect(page.getByText('접수방법').first()).toBeVisible();
  await page.locator('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '접수없음' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '접수방법' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '접수없음' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 내원경로 검색
  await expect(page.getByText('내원경로').nth(1)).toBeVisible();
  await page.locator('div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '미입력' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내원경로' })).toBeVisible();
  await expect(page.locator('td:nth-child(9)').first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 의사 검색
  await expect(page.getByText('의사').nth(1)).toBeVisible();
  await page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '미입력' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '의사' })).toBeVisible();
  await expect(page.locator('td:nth-child(10)')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 상담사 검색
  await expect(page.getByText('상담사').nth(1)).toBeVisible();
  await page.locator('div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '최지안' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '상담사' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 어시스트 검색
  await expect(page.getByText('어시스트').first()).toBeVisible();
  await page.locator('div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '미입력' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '어시스트' })).toBeVisible();
  await expect(page.locator('td:nth-child(12)')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 시/수술 카테고리 검색
  await expect(page.getByText('카테고리').first()).toBeVisible();
  await page.locator('div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const inputField1 = page.locator('input[role="combobox"]').nth(5);
  await inputField1.fill('성형');
  await page.getByRole('option', { name: '성형' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '카테고리' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 시/수술명 검색
  await expect(page.getByText('시/수술명').first()).toBeVisible();
  await page.locator('.extra-filter-wrapper > div > div:nth-child(2) > div > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '성형 - 눈매교정' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '시/수술명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 상담결과 검색
  await expect(page.getByText('상담결과').first()).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '해피콜' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '상담결과' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '해피콜' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 신/구환 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.locator('.MuiFormControlLabel-root > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 신/구환 > 신환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: /^신환$/ })).toBeVisible();
  await page.getByRole('radio', { name: '신환' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 신/구환 > 구환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: /^구환$/ })).toBeVisible();
  await page.getByRole('radio', { name: '구환' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 소개자유무 검색
  await expect(page.getByText('소개자유무')).toBeVisible();
  await expect(page.locator('div:nth-child(4) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '소개자' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김정연' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 소개자유무 > 있음 검색
  await expect(page.getByText('소개자유무')).toBeVisible();
  await expect(page.getByText('있음').first()).toBeVisible();
  await page.getByRole('radio', { name: '있음' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '소개자' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김정연' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 소개자유무 > 없음 검색
  await expect(page.getByText('소개자유무')).toBeVisible();
  await expect(page.getByText('없음').first()).toBeVisible();
  await page.getByRole('radio', { name: '없음' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '소개자' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 소개자 검색
  await expect(page.getByRole('paragraph').filter({ hasText: /^소개자$/ })).toBeVisible();
  await page.getByRole('combobox', { name: '소개자' }).click();
  await page.getByRole('combobox', { name: '소개자' }).fill('김정연');
  await page.getByText('-8989-8989').click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '소개자' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김정연' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터
  await expect(page.getByRole('button', { name: '+ 고객정보 필터' })).toBeVisible();
  await page.getByRole('button', { name: '+ 고객정보 필터' }).click();
  // 상세 필터 > 고객정보 필터 > 생년 From 검색
  await expect(page.getByText('생년', { exact: true })).toBeVisible();
  const inputField = page.locator('input[aria-expanded="false"]').nth(9);
  await inputField.click();
  await page.getByRole('option', { name: '1994년' }).click();
  // 상세 필터 > 고객정보 필터 > 생년 To 검색
  await expect(page.getByText('생년', { exact: true })).toBeVisible();
  const inputField2 = page.locator('input[aria-expanded="false"]').nth(10);
  await inputField2.click();
  await page.getByRole('option', { name: '1995년' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '생년월일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-05-05' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 생일 검색
  await expect(page.getByText('생일')).toBeVisible();
  await page.getByRole('button', { name: '월' }).nth(1).click();
  await page.getByRole('option', { name: '05월' }).click();
  await expect(page.getByText('생일')).toBeVisible();
  await page.getByRole('button', { name: '일' }).nth(1).click();
  await page.getByRole('option', { name: '05일' }).click();
  await expect(page.getByText('생일')).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '생년월일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-05-05' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 성별 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.locator('.extra-filter-wrapper-2 > div > div > div:nth-child(4) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '여성' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 성별 > 여성 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '여성' })).toBeVisible();
  await page.getByRole('radio', { name: '여성' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '여성' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 성별 > 남성 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.getByText('남성')).toBeVisible();
  await page.getByRole('radio', { name: '남성' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '여성' }).first()).not.toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 내/외국인 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.locator('div:nth-child(5) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '외국인', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 내/외국인 > 내국인 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '내국인' })).toBeVisible();
  await page.getByRole('radio', { name: '내국인' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '외국인', exact: true })).not.toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 내/외국인 > 외국인 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.getByText('외국인', { exact: true }).nth(0)).toBeVisible();
  await page.getByRole('radio', { name: '외국인' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '외국인', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 신환구분일 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  await expect(page.locator('td:nth-child(21)').first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 신환구분일 > 있음 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.getByText('있음').nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^신환구분일전체있음없음$/ }).getByLabel('있음').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 신환구분일 > 없음 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.getByText('없음').nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^신환구분일전체있음없음$/ }).getByLabel('없음').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  await expect(page.locator('td:nth-child(21)')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 문자 수신 > 전체 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 문자 수신 > 수신 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.getByText('수신', { exact: true }).first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자 수신전체수신거부$/ }).getByLabel('수신').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 문자 수신 > 거부 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.getByText('거부').first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자 수신전체수신거부$/ }).getByLabel('거부').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 마케팅 수신 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div:nth-child(3) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' }).nth(1)).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 마케팅 수신 > 수신 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.getByText('수신', { exact: true }).nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^마케팅 수신전체수신거부$/ }).getByLabel('수신').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' }).nth(1)).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 마케팅 수신 > 거부 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.getByText('거부').nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^마케팅 수신전체수신거부$/ }).getByLabel('거부').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' }).nth(1)).not.toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 최초 내원경로 검색
  await expect(page.locator('span').filter({ hasText: '최초내원경로' })).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'SNS' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 담당 상담사 검색
  await expect(page.getByText('담당상담사')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '노윤이' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 담당 의사 검색
  await expect(page.getByText('담당의사')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '테스트의사' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 관심항목 검색
  await expect(page.getByText('관심항목').first()).toBeVisible();
  await page.locator('.extra-filter-wrapper-2 > div > div:nth-child(3) > div > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const inputField3 = page.locator('input[role="combobox"]').nth(14);
  await inputField3.fill('성형');
  await page.getByRole('option', { name: '보톡스' }).click(); /// 
  /////
  ///////
  ////// 여기 보톡스 오류 부터
  ////////
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 고객등급 검색
  await expect(page.getByText('고객등급').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'WELCOME', exact: true }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객등급' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'WELCOME' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 고객색상 검색
  await expect(page.getByText('고객색상').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').click();
  const option = page.locator('li[role="option"]').nth(0);
  await option.click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객색상' }).locator('div').nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객색상' })).toBeVisible();
  await expect(page.locator('td:nth-child(26)').first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 직업 검색
  await expect(page.getByText('직업').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'IT, 인터넷' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '직업' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'IT, 인터넷' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 결혼여부 > 미입력 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.getByText('미입력')).toBeVisible();
  await page.getByRole('checkbox', { name: '미입력' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 결혼여부 > 미혼 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.getByText('미혼')).toBeVisible();
  await page.getByRole('checkbox', { name: '미혼' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 결혼여부 > 기혼 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '기혼' })).toBeVisible();
  await page.getByRole('checkbox', { name: '기혼' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '기혼' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 국가/지역 검색
  await expect(page.getByText('국가/지역').nth(1)).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '한국/서울' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '국가/지역' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '한국/서울' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 불만사항 검색
  await expect(page.getByText('불만사항').first()).toBeVisible();
  await page.locator('div:nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '주차' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '불만사항' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '주차' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 주소 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '주소' })).toBeVisible();
  await page.getByRole('textbox', { name: '주소/상세주소' }).click();
  await page.getByRole('textbox', { name: '주소/상세주소' }).fill('상세주소');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '주소', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상세주소 자동화 수정' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  // 고객명 검색
  await expect(page.getByText('상담조회 내역')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 통합차트 진입
  await expect(page.getByText('통합차트', { exact: true })).toBeVisible();
  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await page.locator('tbody').getByRole('cell').filter({ hasText: /^$/ }).first().click();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // 상담 차트 삭제
  await page.getByRole('button', { name: '삭제' }).click();
  // 삭제 안내 팝업
  await expect(page.getByText('삭제 후 복구 불가능합니다. 그래도 진행하시겠습니까?')).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
});