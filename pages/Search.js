class Search {
    constructor(page){
        this.page = page;
        
        this.searchBox = page.getByRole('textbox', { name: '고객명, 전화번호' });

        this.searchButton = page.getByRole('button', { name: '조회', exact: true });

        this.resultSearchName = page.getByRole('cell', { name: '자동화_신규고객' });
        this.categoryOfName = page.getByRole('cell', { name: '고객명' });

        
    }

    async searchCustomerName() {
        await expect(this.searchBox).toBeVisible();
        await this.searchBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBox.fill('자동화_신규고객');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.categoryOfName).toBeVisible();
        await expect(this.resultSearchName).toBeVisible();


    }
}

export { Search };