class LoginPage {
    constructor(page){
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' });
        this.passwordInput = page.getByRole('textbox', { name: '비밀번호를 입력하세요' });
        this.loginButton = page.getByRole('button', { name: '로그인' });
        this.logoutButton = page.getByRole('button', { name: '로그아웃' });
    }

    async goto() {
        await this.page.goto('https://unocare.co.kr/login');
    }

    async login(username, password) {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForTimeout(1000);
    }

    async isLoggedin() {
        return await this.logoutButton.isVisible();
    }
}

export { LoginPage };