import { test, expect } from '@playwright/test';

test('Check header elements are visible', async ({ page }) => {
  await page.goto('https://www.epam.com/');
  await expect(page.locator('.hamburger-menu__button')).toBeVisible();
  await expect(page.getByRole('link', { name: 'EPAM EPAM' })).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Services Expand: Services' }).getByRole('link'),
  ).toBeVisible();
  await expect(page.locator('a').filter({ hasText: 'Industries' }).nth(2)).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Insights Expand: Insights' }).getByRole('link'),
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'About Expand: About About' }).getByRole('link'),
  ).toBeVisible();
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Careers Expand: Careers' }).getByRole('link'),
  ).toBeVisible();

  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  await expect(page.getByText('Dark Mode Light Mode').nth(1)).toBeVisible();
});

test('Check headers title', async ({ page }) => {
  await page.goto('https://www.epam.com/');
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Services Expand: Services' }).getByRole('link'),
  ).toContainText('Services');
  await expect(page.locator('a').filter({ hasText: 'Industries' }).nth(2)).toContainText(
    'Industries',
  );
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Insights Expand: Insights' }).getByRole('link'),
  ).toContainText('Insights');
  await expect(
    page.getByRole('listitem').filter({ hasText: 'About Expand: About About' }).getByRole('link'),
  ).toContainText('About');
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Careers Expand: Careers' }).getByRole('link'),
  ).toContainText('Careers');
});

test('Check attribute a href of headers elements', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  await expect(
    page.getByRole('listitem').filter({ hasText: 'Services Expand: Services' }).getByRole('link'),
  ).toHaveAttribute('href', '/services');
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Insights Expand: Insights' }).getByRole('link'),
  ).toHaveAttribute('href', '/insights');
  await expect(
    page.getByRole('listitem').filter({ hasText: 'About Expand: About About' }).getByRole('link'),
  ).toHaveAttribute('href', '/about');
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Careers Expand: Careers' }).getByRole('link'),
  ).toHaveAttribute('href', '/careers');
});

test('Check Light/Dark mode switcher', async ({ page }) => {
  await page.goto('https://www.epam.com/');
  await page
    .locator('.header__vaulting-container > .theme-switcher-ui > .theme-switcher > .switch')
    .click();
  await expect(page.locator('body')).toHaveAttribute('class', 'fonts-loaded light-mode');
});

test('Check page Title', async ({ page }) => {
  await page.goto('https://www.epam.com/');
  await expect(page).toHaveTitle('EPAM | Software Engineering & Product Development Services');
});

test('Check Contact Us button', async ({ page }) => {
  await page.goto('https://www.epam.com/');
  await expect(page.getByRole('link', { name: 'CONTACT US' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CONTACT US' })).toContainText('CONTACT US');
  await expect(page.getByRole('link', { name: 'CONTACT US' })).toHaveAttribute(
    'href',
    'https://www.epam.com/about/who-we-are/contact',
  );
});

test('Check Search button', async ({ page }) => {
  await page.goto('https://www.epam.com/');
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('searchbox', { name: 'Website search' })).toBeVisible();
  await expect(page.locator('form')).toContainText('Search');
});

test('Check Global button', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  await expect(page.getByRole('button', { name: 'Global (EN)' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Global (EN)' })).toContainText('Global (EN)');
  await expect(page.getByRole('strong')).toBeVisible();
  await expect(page.getByRole('strong')).toContainText('Select a language');
});

test('Check Hamburger menu work', async ({ page }) => {
  await page.goto('https://www.epam.com/');
  await expect(page.locator('.hamburger-menu__button')).toBeVisible();
  await page.locator('.hamburger-menu__button').click();
  await expect(page.locator('//div[@class="os-content"]')).toBeVisible();
});
