import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login'); // 로그인 화면 진입
  // 로그인 
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객 조회
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.getByText('처방전 (0)').click();
  // 처방전
  await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 처방전 작성
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: '처방전 작성' }).click();
  const page1 = await page1Promise;
  // 처방전 작성 > 안내 팝업
  await expect(page1.getByRole('heading', { name: '안내' })).toBeVisible();
  // 처방전 작성 > 안내 팝업 닫기
  await page1.getByRole('heading', { name: '안내' }).getByRole('button').click();
  await expect(page1.getByRole('button', { name: '[ ]본인보관용' })).toBeVisible(); // 처방전 제출 용도
  await expect(page1.getByRole('button', { name: '[V]약국제출용' })).toBeVisible();
  await expect(page1.getByRole('heading', { name: '처    방    전' })).toBeVisible(); // 처방전
  await expect(page1.getByRole('button', { name: '[ ]건강보험' })).toBeVisible(); // 처방전 종류
  await expect(page1.getByRole('button', { name: '[ ]의료급여' })).toBeVisible();
  await expect(page1.getByRole('button', { name: '[ ]산업재해보험' })).toBeVisible();
  await expect(page1.getByRole('button', { name: '[ ]자동차보험' })).toBeVisible();
  await expect(page1.getByRole('button', { name: '[V]기타 ( )' })).toBeVisible();
  await expect(page1.getByText('* [ ]에는 해당되는 곳에 "V"표시를 합니다')).toBeVisible(); // 처방전 종류 선택 안내
  await expect(page1.getByRole('cell', { name: '요양기관기호 :' })).toBeVisible(); // 요양기관기호
  await expect(page1.getByRole('cell', { name: '고객명_자동화' })).toBeVisible(); // 성명
  await expect(page1.getByRole('cell', { name: '- 1234568' }).getByRole('textbox').first()).toBeVisible(); // 주민등록번호 앞
  await expect(page1.getByRole('cell', { name: '- 1234568' }).getByRole('textbox').nth(1)).toBeVisible(); 
  await expect(page1.getByRole('cell', { name: '의료기관' })).toBeVisible(); // 의료기관
  await expect(page1.getByRole('cell', { name: 'dev', exact: true })).toBeVisible(); // 명칭
  await expect(page1.getByRole('cell', { name: '543234' })).toBeVisible(); // 전화번호
  await expect(page1.getByRole('cell', { name: '-6929-2341' })).toBeVisible(); // 팩스 번호
  await expect(page1.getByRole('cell', { name: '환자가 요구하면 질병분류기호를 적지 않습니다' })).toBeVisible();
  // 묶음 처방 리스트
  await expect(page1.getByText('묶음 처방 리스트')).toBeVisible();
  // 의약품 등록
  await page1.getByRole('row', { name: '등록 1 -1 루루카캡슐75밀리그램(프레가발린)_(' }).getByRole('button').click();
  // 작성 완료
  await page1.waitForTimeout(2000);
  await page1.getByRole('button', { name: '작성완료' }).click();
  await expect(page1.getByText('저장되었습니다')).toBeVisible();
  await page.bringToFront();
  await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  // 처방전 작성 확인
  await expect(page.getByRole('cell', { name: 'dev' }).first()).toBeVisible(); // 작성자
  await expect(page.getByRole('cell', { name: '기타' })).toBeVisible(); // 보험종류
  await expect(page.getByRole('cell', { name: 'dev' }).nth(1)).toBeVisible(); // 처방의사 
  await expect(page.getByRole('cell', { name: '루루카캡슐75밀리그램(프레가발린)_(75mg/1' })).toBeVisible(); // 처방내역
  await expect(page.getByRole('cell', { name: '작성완료' })).toBeVisible();
  // 처방전 수정
  const page3Promise = page.waitForEvent('popup');
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(3)').click();
  const page3 = await page3Promise;
  // 처방전 수정 > 안내 팝업
  await expect(page3.getByRole('heading', { name: '안내' })).toBeVisible();
  await page3.getByRole('heading', { name: '안내' }).getByRole('button').click();
  // 처방전 수정
  await expect(page3.getByRole('heading', { name: '처    방    전' })).toBeVisible();
  // 처방전 의약품 첫번째 항목 삭제
  await page3.locator('.btn').first().click();
  // 처방전 용법 첫번째 항목 입력
  await page3.getByRole('row', { name: '- [641602030]우루사100' }).getByPlaceholder('입력하세요').click();
  await page3.getByRole('row', { name: '- [641602030]우루사100' }).getByPlaceholder('입력하세요').fill('용법 자동화');
  // 작성완료
  await page3.waitForTimeout(2000);
  await page3.getByRole('button', { name: '작성완료' }).click();
  await expect(page3.getByText('저장되었습니다')).toBeVisible();
  await page.bringToFront();
  await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'dev' }).first()).toBeVisible(); // 작성자
  await expect(page.getByRole('cell', { name: '기타' })).toBeVisible(); // 보험종류
  await expect(page.getByRole('cell', { name: 'dev' }).nth(1)).toBeVisible(); // 처방의사
  await expect(page.getByRole('cell', { name: '우루사100밀리그램연질캡슐(우르소데옥시콜산) 외 13건' })).toBeVisible(); // 처방내역
  await expect(page.getByRole('cell', { name: '작성완료' })).toBeVisible(); // 상태
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  // 처방전 삭제
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
});