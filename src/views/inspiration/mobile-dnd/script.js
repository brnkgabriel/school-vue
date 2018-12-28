(function () {
  var dragme = document.getElementById('dragme');
  var cs = dragme.style;
  var anchor = { offsetX: 0, offsetY: 0 }
  
  dragme.addEventListener('touchstart', function (ev) { 
    console.log('computed transform', getComputedStyle(dragme).transform)
    var elementRect = dragme.getBoundingClientRect();
    anchor = {
      offsetX: ev.targetTouches[0].pageX - elementRect.left,
      offsetY: ev.targetTouches[0].pageY - elementRect.top
    }

    dragme.addEventListener('touchmove', tmove, true);
  }, false)

  function tmove(touch) {
    var epY = touch.touches[0].clientY;
    var epX = touch.touches[0].clientX;
    
    cs.position = 'fixed';
    cs.top = epY + 'px';
    cs.left = epX + 'px';
    // cs.marginLeft = -anchor.offsetX + 'px';
    // cs.marginTop = -anchor.offsetY + 'px';
    cs.transform = 'translate(' + -anchor.offsetX + 'px,' + -anchor.offsetY + 'px)'
  }
  
  dragme.addEventListener('touchend', function(ev) {
    // console.log('computed top left', getComputedStyle(dragme).top, getComputedStyle(dragme).left);
    console.log('computed transform', getComputedStyle(dragme).transform)
    dragme.removeEventListener('touchmove', tmove, true);
    anchor = { offsetX: 0, offsetY: 0 } 
  }, false)

})()
