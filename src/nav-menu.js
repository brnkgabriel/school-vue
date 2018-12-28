export default function () {
  var trigger = document.querySelector('.cd-nav-trigger');
  var stcontainer = document.getElementById('st-container')
  var eventtype = 'click';
  var navlinks = document.querySelectorAll('.nav-link')

  function toggle(el, className) {
    el.classList.contains(className) ? el.classList.remove(className) : el.classList.add(className);
  }

  function toggleNavigation(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    setTimeout(() => { 
      toggle(trigger, 'menu-is-open');
      toggle(stcontainer, 'st-menu-open');
    }, 25);
  }
  navlinks.forEach(navlink => {
    navlink.addEventListener(eventtype, toggleNavigation, true)
  });
  trigger.addEventListener(eventtype, toggleNavigation)
}