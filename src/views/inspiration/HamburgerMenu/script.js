(function() {

  var navicon = document.querySelector('.navicon');
  var toggle = document.querySelector('.toggle');

  function toggleClass(el, className) {
    if (!el.classList.contains(className + '--active')) {
      el.classList.add(className + '--active')
    } else {
      el.classList.remove(className + '--active')
    }
  }
  navicon.addEventListener('click', function (e) {
    e.preventDefault();
    toggleClass(navicon, 'navicon');
    toggleClass(toggle, 'toggle')
  })
})()