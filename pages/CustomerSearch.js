import { expect } from '@playwright/test';

class customerSearch {
    constructor(page){
        this.page = page;
        
        this.searchBox = page.getByRole('textbox', { name: '고객명, 전화번호' });
        this.searchChartBox = page.getByRole('textbox', { name: '차트번호' });
        this.searchBirthBox = page.getByRole('textbox', { name: '생년월일 6자리' });

        this.searchButton = page.getByRole('button', { name: '조회', exact: true });
        this.closeButton = page.getByRole('button', { name: 'close' });
        // this.popupSearch = page.getByRole('button', { name: '조회' });

        this.categoryOfName = page.getByRole('cell', { name: '고객명' });
        this.resultSearchName = page.getByRole('cell', { name: '자동화_신규고객' });

        this.categoryOfChart = page.getByRole('cell', { name: '차트번호' });
        this.resultSearchChart = page.getByRole('cell', { name: '1234568' });

        this.categoryOfNumber = page.getByRole('cell', { name: '전화번호' });
        this.resultSearchNumber = page.getByRole('cell', { name: '-3535-3535' });

        this.categoryOfBirth = page.getByRole('cell', { name: '생년월일' });
        this.resultSearchBirth = page.getByRole('cell', { name: '-05-05' });

        this.notFoundMessage = page.getByRole('cell', { name: '검색된 고객이 없습니다' });

        

        
    }

    async searchCustomerName() {
        await expect(this.searchBox).toBeVisible();
        await this.searchBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBox.fill('자동화_신규고객');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        // 고객조회 팝업 등장하면서 노출 확인 
        await this.categoryOfName.waitFor();
        await this.resultSearchName.waitFor();
        // await this.page.waitForLoadState('domcontentloaded');
        await expect(this.categoryOfName).toBeVisible();
        await expect(this.resultSearchName).toBeVisible();
    }

    async searhCustomerNumber() {
        await expect(this.searchBox).toBeVisible();
        await this.searchBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBox.fill('01035353535');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        // 고객조회 팝업 등장하면서 노출 확인
        await this.categoryOfNumber.waitFor();
        await this.resultSearchNumber.waitFor();
        await expect(this.categoryOfNumber).toBeVisible();
        await expect(this.resultSearchNumber).toBeVisible();
    }

    async chartClose() {
        await expect(this.closeButton).toBeVisible();
        await this.closeButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async searchWrongChartNumber() {
        await expect(this.searchChartBox).toBeVisible();
        await this.searchChartBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchChartBox.fill('1234567');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.notFoundMessage).toBeVisible();
    }

    async searchChartNumber() {
        await expect(this.searchChartBox).toBeVisible();
        await this.searchChartBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchChartBox.fill('1234568');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.categoryOfChart.waitFor();
        await this.resultSearchChart.waitFor();
        await expect(this.categoryOfChart).toBeVisible();
        await expect(this.resultSearchChart).toBeVisible();
    }

    async searchWrongBirth() {
        await expect(this.searchBirthBox).toBeVisible();
        await this.searchBirthBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBirthBox.fill('940506');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.notFoundMessage).toBeVisible();
    }

    async searchBirth() {
        await expect(this.searchBirthBox).toBeVisible();
        await this.searchBirthBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBirthBox.fill('940505');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.categoryOfBirth).toBeVisible();
        await expect(this.resultSearchBirth).toBeVisible();
    }

    


}

export { customerSearch };