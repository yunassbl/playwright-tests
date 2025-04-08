import { expect } from '@playwright/test';

class Exception {
    constructor(page) {
        this.page = page;
    }

    async closePopupIfExists() {
        const popupButton = this.page.getByText('오늘하루 보지않기');

        if (await popupButton.isVisible()) {
            await popupButton.click();
        }
    }

}



export { Exception };