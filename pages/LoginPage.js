import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", {
      name: "아이디(이메일)를 입력하세요",
    });
    this.passwordInput = page.getByRole("textbox", {
      name: "비밀번호를 입력하세요",
    });
    this.loginButton = page.getByRole("button", { name: "로그인" });
    this.logoutButton = page.getByRole("button", { name: "로그아웃" });
    this.logo = page.getByRole("img", {
      name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"',
    });
  }

  async goto() {
    await this.page.goto("https://unocare.co.kr/login");
    await this.logo.isVisible();
  }

  async login(username, password) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(username);
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
    await this.page.waitForTimeout(1000);
  }

  async isLoggedin() {
    return await this.logoutButton.isVisible();
  }
}

export { LoginPage };