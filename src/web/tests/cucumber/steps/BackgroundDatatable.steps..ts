import { Given, When, Then } from '@cucumber/cucumber';
import loginPage from '@UIPages/login.page';
import securePage from '@UIPages/secure.page';
import FrameworkConstants from '@UIStatic/FrameworkConstants';

Given(/^I open the herokuapp login page$/, async () => {
    await loginPage.openApp();
});

When(/^I login with given username and password$/, async (dataTable) => {
    await loginPage.login(dataTable.hashes()[0].username, dataTable.hashes()[0].password)
});

Then(/^I should see a (success|failed) flash message$/, async (status: string) => {
    await expect(securePage.flashAlert).toBeExisting();

    switch (status) {
        case "success": await expect(securePage.flashAlert).toHaveTextContaining(FrameworkConstants.LOGIN_SUCCESS_MSG);
            break;
        case "failed": await expect(securePage.flashAlert).toHaveTextContaining(FrameworkConstants.LOGIN_FAILED_MSG);
            break;
    }
});
