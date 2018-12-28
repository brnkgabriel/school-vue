(function () {
  var trigger = document.querySelector('.cd-nav-trigger');
  var mainnav = document.querySelector('#cd-main-nav');

  function toggle(el, className) {
    if (el.classList.contains(className)) {
      el.classList.remove(className)
    } else {
      el.classList.add(className)
    }
  }

  trigger.addEventListener('click', function () {
    toggle(trigger, 'menu-is-open');
    toggle(mainnav, 'is-visible')
  })
})()