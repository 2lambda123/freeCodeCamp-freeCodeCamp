import translations from '../client/i18n/locales/english/translations.json';
import { test, expect, type Page } from '@playwright/test';

const runChallengeTest = async (page: Page, isMobile: boolean) => {
  if (isMobile) {
    await page.getByText('Run').click();
  } else {
    await page.getByText('Run the Tests (Ctrl + Enter)').click();
  }
};

test.beforeEach(async ({ page }) => {
  await page.goto(
    '/learn/javascript-algorithms-and-data-structures/basic-javascript/assigning-the-value-of-one-variable-to-another'
  );
});

test.describe('Challenge Test Suite Component Tests', () => {
  test('should render correctly', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: translations.learn['editor-tabs'].tests
      })
    ).toBeVisible();
    await expect(page.getByTestId('test-result')).toHaveCount(3);
    await expect(page.getByText(translations.icons.initial)).toHaveCount(3);
    await expect(
      page.getByText('You should not change code above the specified comment.')
    ).toBeVisible();
    await expect(page.getByText('b should have a value of 7.')).toBeVisible();
    await expect(
      page.getByText('a should be assigned to b with =.')
    ).toBeVisible();
  });

  test('should render one pass and two fail icon', async ({
    page,
    isMobile
  }) => {
    await runChallengeTest(page, isMobile);
    await expect(page.getByTestId('test-pass-icon')).toHaveCount(1);
    await expect(page.getByText(translations.icons.fail)).toHaveCount(2);
  });
});
