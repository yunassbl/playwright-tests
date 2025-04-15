import { expect } from "playwright/test";

class Payment {
    constructor(page) {
        this.page = page;
        this.paymentChart = page.locator("li span", { hasText: /^수납/ }).nth(2);

        // 시/수술, 제품 등록
        this.registPaymentButton = page.getByRole('button', { name: '+ 수납등록' });
        this.searchButton = page.getByRole('button', { name: '검색' });
        this.addingButton = page.getByRole('tooltip').getByRole('button', { name: '추가', exact: true });
        this.closePopupButton = page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button');
        this.registPaymentTitle = page.getByText('수납 등록');
        
        this.addingSurgeryButton = page.getByRole('button', { name: '+ 시/수술 추가' });
        this.addingProductionButton = page.getByRole('button', { name: '+ 제품 추가' });
        this.addingPopupTitle = page.getByRole('heading', { name: '수납항목 추가' });
        this.addingSurgeryTabTitle = page.getByRole('button', { name: '시/수술 추가', exact: true });
        this.addingProductionTabTitle = page.getByRole('button', { name: '제품 추가', exact: true });

        this.searchSurgeryCategory = page.getByRole('combobox', { name: '시/수술 카테고리를 검색하세요' });
        this.searchSurgeryName = page.getByRole('combobox', { name: '시/수술명을 검색하세요' });
        this.searchProduction = page.getByRole('textbox', { name: '제품명을 입력하세요' });
        
        this.selectOptionValue = page.getByRole("option").nth(0);
        this.searchedSurgeryCategory = '';
        this.searchedSurgeryName = '';
        this.surgeryPrice = ''; // 금액
        this.surgeryVat = ''; // vat 제외

        this.productionName = ''; // 과세
        this.productionNameFree = ''; // 비과세

        this.notFreePrice = '';
        // this.

    }

    async enterPaymentChart() {
        await expect(this.paymentChart).toBeVisible();
        await this.paymentChart.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log("수납 차트 진입 성공");
    }

    async registPayment() {
        await expect(this.registPaymentButton).toBeVisible();
        await this.registPaymentButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.registPaymentTitle).toBeVisible();
    }  
    
    async addSurgery() {
        await expect(this.addingSurgeryButton).toBeVisible();
        await this.addingSurgeryButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.addingPopupTitle).toBeVisible();
        await expect(this.addingSurgeryTabTitle).toBeVisible();
        // 시/수술 카테고리 검색 > 선택
        await expect(this.searchSurgeryCategory).toBeVisible();
        await this.searchSurgeryCategory.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.selectOptionValue).toBeVisible();
        this.searchedSurgeryCategory = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('시/수술 카테고리 :', this.searchedSurgeryCategory);
        // 시/수술명 검색 > 선택
        await expect(this.searchSurgeryName).toBeVisible();
        await this.searchSurgeryName.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.selectOptionValue).toBeVisible();
        this.searchedSurgeryName = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('시/수술명: ', this.searchedSurgeryName);
        // 검색
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        // 값 전부 넣기
        this.surgeryPrice = await this.page.getByRole('row', { name: this.searchedSurgeryCategory }).getByRole('textbox').nth(2);
        this.surgeryVat = await this.page.getByRole('row', { name: this.searchedSurgeryCategory }).getByRole('textbox').nth(3);
        await expect(this.addingButton).toBeVisible();
        await this.addingButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        // 팝업 닫기
        await expect(this.closePopupButton).toBeVisible();
        await this.closePopupButton.click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async addProduction() {
        await expect(this.addingProductionButton).toBeVisible();
        await this.addingProductionButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.addingPopupTitle).toBeVisible();
        await expect(this.addingProductionTabTitle).toBeVisible();
        // 검색 제품 입력
        await expect(this.searchProduction).toBeVisible();
        await this.searchProduction.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.searchProduction.fill('수납자동화 제품명');
        await this.page.waitForLoadState("domcontentloaded");
        // 검색
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        this.productionName = page.getByRole('cell', { name: '수납자동화 제품명 과세' }).innerText();
        this.productionNameFree = page.getByRole('cell', { name: '수납자동화 제품명 비과세' }).innerText();
        // 검색 추가
        await expect(this.addingButton.nth(0)).toBeVisible();
        await this.addingButton.nth(0).click();
        await this.page.waitForLoadState("domcontentloaded");
        await expeect(this.addingButton.nth(1)).toBeVisible();
        await this.addingButton.nth(1).click();
        await this.page.waitForLoadState("domcontentloaded");

    }

    async checkAddSurgery() {
        await expect(this.registPaymentTitle).toBeVisible();
        await expect(page.locator('#app').getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(page.locator('#app').getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();
        await expect(page.locator('#app').getByRole('cell', { name: `${this.surgeryPrice} ${this.surgeryVat}` })).toBeVisible();
        await expect(page.locator('#app').getByRole('cell', { name: this.surgeryPrice, exact: true })).toBeVisible();
        
    }

    async checkAddProduction() {
        await expect(this.registPaymentTitle).toBeVisible();
        
    }
}

export { Payment };