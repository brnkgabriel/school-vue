'use strict'

class SideNav {
  constructor() {
    this.sideNavEl = document.querySelector('.js-side-nav');
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container');
    this.showButtonEl = document.querySelector('.js-menu-open');
    this.closeButtonEl = document.querySelector('.js-menu-close');
    // this.closeEvents = document.querySelector('.close-events');
    // this.openEvents = document.querySelectorAll('.open-events');
    // this.eventsBg = document.querySelector('.side-nav-level')

    // this.openEventsBg = this.openEventsBg.bind(this);
    // this.closeEventsBg = this.closeEventsBg.bind(this);
    this.openSideNav = this.openSideNav.bind(this);
    this.closeSideNav = this.closeSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    this.showButtonEl.addEventListener('click', this.openSideNav);
    this.closeButtonEl.addEventListener('click', this.closeSideNav);
    this.sideNavEl.addEventListener('click', this.blockClicks);
    this.sideNavContainerEl.addEventListener('click', this.closeSideNav);
    // this.openEvents.forEach(openEventsEl => {
    //   openEventsEl.addEventListener('click', this.openEventsBg)
    // })
    // this.closeEvents.addEventListener('click', this.closeEventsBg)
  }

  blockClicks(evt) {
    evt.stopPropagation();
  }

  onTransitionEnd(evt) {
    this.sideNavContainerEl.classList.remove('side-nav-animatable');
    this.sideNavContainerEl.removeEventListener('transitionend', this.onTransitionEnd);
  }

  // openEventsBg() {
  //   this.eventsBg.classList.add('open')
  //   console.log('clicked open');
  // }

  // closeEventsBg() {
  //   console.log('clicked close')
  //   this.eventsBg.classList.remove('open')
  // }

  openSideNav() {
    this.sideNavContainerEl.classList.add('side-nav-animatable');
    this.sideNavContainerEl.classList.add('side-nav-visible');
    this.sideNavContainerEl.addEventListener('transitionend', this.onTransitionEnd);
  }

  closeSideNav() {
    this.sideNavContainerEl.classList.add('side-nav-animatable');
    this.sideNavContainerEl.classList.remove('side-nav-visible');
    this.sideNavContainerEl.addEventListener('transitionend', this.onTransitionEnd);
  }
}

export default SideNav;