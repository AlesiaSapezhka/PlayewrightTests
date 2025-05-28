import { test, expect } from '@playwright/test';

const elements = [
  {
    locator: (page) => page.locator('.hamburger-menu__button'),
    name: 'Hamburger menu button',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'EPAM EPAM' }),
    name: 'EPAM link',
  },
  {
    locator: (page) =>
      page.getByRole('listitem').filter({ hasText: 'Services Expand: Services' }).getByRole('link'),
    name: 'Services link',
    text: 'Services',
    attribute: {
      type: 'href',
      value: '/services',
    },
  },
  {
    locator: (page) => page.locator('a').filter({ hasText: 'Industries' }).nth(2),
    name: 'Industries',
    text: 'Industries',
  },
  {
    locator: (page) =>
      page.getByRole('listitem').filter({ hasText: 'Insights Expand: Insights' }).getByRole('link'),
    name: 'Insights link',
    text: 'Insights',
    attribute: {
      type: 'href',
      value: '/insights',
    },
  },
  {
    locator: (page) =>
      page.getByRole('listitem').filter({ hasText: 'About Expand: About About' }).getByRole('link'),
    name: 'About link',
    text: 'About',
    attribute: {
      type: 'href',
      value: '/about',
    },
  },
  {
    locator: (page) =>
      page.getByRole('listitem').filter({ hasText: 'Careers Expand: Careers' }).getByRole('link'),
    name: 'Careers link',
    text: 'Careers',
    attribute: {
      type: 'href',
      value: '/careers',
    },
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Search' }),
    name: 'Search button',
  },
  {
    locator: (page) => page.getByText('Dark Mode Light Mode').nth(1),
    name: 'Mode switcher button',
  },
];

test.describe('Main Page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.epam.com/');
  });

  test('Check header elements are visible', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Check header element: ${name} is visible`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('Check headers title', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Check title element: ${name} contains correct text`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('Check attribute a href of headers elements', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Check a href attribute of ${name} element`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test('Check Light/Dark mode switcher', async ({ page }) => {
    await page
      .locator('.header__vaulting-container > .theme-switcher-ui > .theme-switcher > .switch')
      .click();
    await expect(page.locator('body')).toHaveAttribute('class', 'fonts-loaded light-mode');
  });

  test('Check page Title', async ({ page }) => {
    await expect(page).toHaveTitle('EPAM | Software Engineering & Product Development Services');
  });

  test('Check Contact Us button', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'CONTACT US' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CONTACT US' })).toContainText('CONTACT US');
    await expect(page.getByRole('link', { name: 'CONTACT US' })).toHaveAttribute(
      'href',
      'https://www.epam.com/about/who-we-are/contact',
    );
  });

  test('Check Search button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('searchbox', { name: 'Website search' })).toBeVisible();
    await expect(page.locator('form')).toContainText('Search');
  });

  test('Check Global button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Global (EN)' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Global (EN)' })).toContainText('Global (EN)');
    await page.getByRole('button', { name: 'Global (EN)' }).click();
    await expect(page.getByRole('strong')).toBeVisible();
    await expect(page.getByRole('strong')).toContainText('Select a language');
  });

  test('Check Hamburger menu work', async ({ page }) => {
    await expect(page.locator('.hamburger-menu__button')).toBeVisible();
    await page.locator('.hamburger-menu__button').click();
    await expect(page.locator('//div[@class="os-content"]')).toBeVisible();
  });
});
