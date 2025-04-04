import { expect } from '@playwright/test';

class WalkInReception {
    constructor(page) {
        this.page = page;

        this.receptionButton = page.getByRole('button', { name: '접수' }).nth(1);

        this.receptionMessage = page.getByText('오늘 예약이 없는 고객입니다.접수하시겠습니까?');

        this.confirmButton = page.getByRole('button', { name: '확인' });

        // this.
    }

    // 당일접수 신청까지
    async dailyReception() {
        await expect(this.receptionButton).toBeVisible();
        await this.receptionButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.receptionMessage).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async dailyReceptionChart() {


    }

}

export { WalkInReception }