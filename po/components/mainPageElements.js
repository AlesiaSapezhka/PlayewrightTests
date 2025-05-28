class TopMenuComponents {
  get hamburgerMenu() {
    return $('.hamburger-menu__button');
  }

  get menuList() {
    return $$('.item--collapsed');
  }

  get modeSwitchButton() {
    return $('(//div[@class="switch"])[2]');
  }

  get contactUsButton() {
    return $('(//span[contains(.,"CONTACT US")])[2]');
  }

  get searchButton() {
    return $('//button[contains(@class, "header-search__button header__icon")]');
  }

  get searchField() {
    return $('//div[contains(@class, "header-search__panel opened")]');
  }
}

module.exports = TopMenuComponents;
