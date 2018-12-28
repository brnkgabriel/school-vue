(function () {
  var trigger = document.querySelector('.cd-nav-trigger');

  function toggle(el, className) {
    el.classList.contains(className) ? el.classList.remove(className) : el.classList.add(className)
  }

  trigger.addEventListener('click', function () {
    toggle(trigger, 'menu-is-open');
  })
})();