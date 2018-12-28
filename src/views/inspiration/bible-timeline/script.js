(function () {
  var timelineRows = document.getElementsByTagName('tr');
  var timeline = []
  console.log(timelineRows[0].children[0].textContent);
  console.log(timelineRows[0].children[1].textContent);
  console.log(timelineRows[0].children[2].children[0].textContent);
  for (var i = 0; i < timelineRows.length; i++) {
    var time = {
      date: timelineRows[i].children[0].textContent,
      event: timelineRows[i].children[1].textContent,
      bibleRef: timelineRows[i].children[2].children[0].textContent
    }
    timeline.push(time);
  }
  var times = []
  timeline.forEach(time => {
    var foundIdx = times.findIndex(t => t.date === time.date);
    // console.log('found index', foundIdx);
    var event = { date: '', events: [] }
    if (foundIdx == -1) {
      event['date'] = time.date;
      event['events'].push(time.event + ' (' + time.bibleRef + ')')
      times.push(event);
    } else {
      times[foundIdx].events.push(time.event + ' (' + time.bibleRef + ')')
    }
  })
  localStorage.setItem('times', JSON.stringify(times))
})()