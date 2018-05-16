import $ from "jquery";

class MobileMenu {
  constructor() {
    this.siteHeader = $(".site-header");
    this.menuIcon = $(".site-header__menu-icon");
    this.menuContent = $(".site-header__menu-content");
    this.nav = $(".primary-nav");
    this.navLink = $(".primary-nav li a");
    this.events();
  }

  events() {
    this.menuIcon.click(this.toggleTheMenu.bind(this));
    this.navLink.click(this.checkforSmallScreen.bind(this));
  }

  checkforSmallScreen() {
    if ($(this.nav).hasClass("primary-nav--is-visible")) {
      console.log(this);
      this.toggleTheMenu.bind(this)();
    }
  }

  toggleTheMenu() {
    this.menuContent.toggleClass("site-header__menu-content--is-visible");
    this.siteHeader.toggleClass("site-header--is-expanded");
    this.nav.toggleClass("primary-nav--is-visible");
  }
}

export default MobileMenu;
