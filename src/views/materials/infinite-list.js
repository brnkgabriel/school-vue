import util from '../../util';

export default function (listElm) {
  var count = 0;

  function loadMore() {
    var limit = count + 20;
    for (var i = count; i < limit; i++) {
      if (i === (util.bibleTimeline.length - 1)) { return }

      var time = document.createElement('div');
      time.innerText = util.bibleTimeline[i].date;
      count++;
      listElm.appendChild(time)
    }
  }

  listElm.addEventListener('scroll', function () {
    if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
      loadMore();
    }
  })

  loadMore();
}