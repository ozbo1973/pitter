import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";
import smoothScroll from "jquery-smooth-scroll";

class StickyHeader {
  constructor() {
    this.lazyLoading = $(".lazyload");
    this.siteHeader = $(".site-header");
    this.siteHeaderTitle = $(".site-header__title");
    this.siteHeaderSubTitle = $(".site-header__subtitle");
    this.siteHeaderIcon = $(".site-header__logo .icon");
    this.headerTriggerElement = $(".large-hero__description");
    this.headerLinks = $(".primary-nav a");
    this.pageSections = $(".page-section");
    this.createWayPointHeader();
    this.addSmoothScrolling();
    this.createPageSectionWaypoint();
    this.refreshWaypoints();
  }

  refreshWaypoints() {
    this.lazyLoading.on("load", () => {
      Waypoint.refreshAll();
    });
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createWayPointHeader() {
    const me = this;
    new Waypoint({
      element: this.headerTriggerElement[0],
      handler: function(direction) {
        const objs = [
          { elem: me.siteHeader, cls: "site-header--scrolling-down" },
          { elem: me.siteHeaderIcon, cls: "site-header__icon--scrolling-down" },
          {
            elem: me.siteHeaderTitle,
            cls: "site-header__title--scrolling-down"
          },
          {
            elem: me.siteHeaderSubTitle,
            cls: "site-header__subtitle--scrolling-down"
          }
        ];
        handleClassSwitch(direction, objs);
      }
    });
  }

  createPageSectionWaypoint() {
    const me = this;
    this.pageSections.each(function() {
      const currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === "down") {
            const matchHeaderLink = currentPageSection.getAttribute(
              "data-match-link"
            );
            me.headerLinks.removeClass("is-current-link");
            $(matchHeaderLink).addClass("is-current-link");
          }
        },
        offset: "5%"
      });

      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === "up") {
            const matchHeaderLink = currentPageSection.getAttribute(
              "data-match-link"
            );
            me.headerLinks.removeClass("is-current-link");
            $(matchHeaderLink).addClass("is-current-link");
          }
        },
        offset: "-25%"
      });
    });
  }
}

function handleClassSwitch(direction, objs) {
  return objs.forEach(obj => {
    if (direction === "down") {
      obj.elem.addClass(obj.cls);
    } else {
      obj.elem.removeClass(obj.cls);
    }
  });
}

export default StickyHeader;
