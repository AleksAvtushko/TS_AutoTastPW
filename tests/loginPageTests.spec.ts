import { test, expect } from "@playwright/test";
import { logInPageData } from "../fixstures/logInPageData";

test.describe("Check LogIn page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(logInPageData.urlMarketingPage);
    });

    test.only("Check: Login page is opened", async ({ page }) => {
        const signInPopup = page.locator('[class="login-form"]');
        await page.getByRole("button", { name: "Login" }).click();
        await page.waitForTimeout(150);
        await expect(signInPopup).toBeHidden();
    });

    test("Check: Login to site if Email and Password are valid", async ({ page }) => {
        await page.getByRole("button", { name: "Login" }).click();
        await page.getByTestId("username").fill(logInPageData.validEmail);
        await page.getByTestId("password").fill(logInPageData.validPassword);
        await page.getByRole("button", { name: "Sign In" }).click();
        await expect(page).toHaveURL(logInPageData.urlCalendarPage, { timeout: 20000 });
    });

    test("Check: Error message is displayed if Email is invalid", async ({ page }) => {
        await page.getByRole("button", { name: "Login" }).click();
        await page.getByTestId("username").fill(logInPageData.invalidEmail);
        await page.getByTestId("password").fill(logInPageData.validPassword);
        await page.getByRole("button", { name: "Sign In" }).click();
        await expect(page.getByRole("dialog")).toContainText("Incorrect username or password.");
    });

    test("Check: Error message is displayed if Password is invalid", async ({ page }) => {
        await page.getByRole("button", { name: "Login" }).click();
        await page.getByTestId("username").fill(logInPageData.validEmail);
        await page.getByTestId("password").fill(logInPageData.invalidPassword);
        await page.getByRole("button", { name: "Sign In" }).click();
        await expect(page.getByRole("dialog")).toContainText("Incorrect username or password.");
    });

    test("Check: Error message is displayed if Email and Password are invalid", async ({ page }) => {
        await page.getByRole("button", { name: "Login" }).click();
        await page.getByTestId("username").fill(logInPageData.invalidEmail);
        await page.getByTestId("password").fill(logInPageData.invalidPassword);
        await page.getByRole("button", { name: "Sign In" }).click();
        await expect(page.getByRole("dialog")).toContainText("Incorrect username or password.");
    });

    test("Check: Sign In button is disabled if Email field is empty", async ({ page }) => {
        await page.getByRole("button", { name: "Login" }).click();
        await page.getByTestId("password").fill(logInPageData.invalidPassword);
        await expect(page.getByRole("button", { name: "Sign In" })).toHaveAttribute("disabled");
    });

    test("Check: Sign In button is disabled if Password field is empty", async ({ page }) => {
        await page.getByRole("button", { name: "Login" }).click();
        await page.getByTestId("username").fill(logInPageData.invalidEmail);
        await expect(page.getByRole("button", { name: "Sign In" })).toHaveAttribute("disabled");
    });
});
