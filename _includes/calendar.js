// REQUIRES MOMENT.JS AND UNDERSCORE.JS
// This still needs to be templated and cleaned up and commented.
// original idea  came from (I think) seattlehacks.com
// you will need to add events via a JSON file
// OR use this YAML to have content people create lists of events https://gist.github.com/budparr/5b21dccf318e723834e9
// use this JSON generator to create JSON for list below https://gist.github.com/budparr/ee901ba06f29cf1db637

var timing = function(start, end) {
  return moment(start).format('MM/DD/YYYY h:mma') + ' - ' + moment(end).format('MM/DD/YYYY h:mma');
};
$(document).ready(function() {
  $.getJSON('/calendar.json', null, function(response) {
    var groups = _.groupBy(response.events, function(event) { return moment(event.start).format('YYYY-MM-DD'); });
    days = _.sortBy(Object.keys(groups), function(day) { return day});

    //sort past event groups in descending order

      days_desc = _.sortBy(Object.keys(groups), function(day) { return day}) .reverse();
    days.forEach(function(day) {
      if (moment(day).isAfter(moment().subtract('days', 1))) {
        $('<h3><time class="dt-start dtstart">' + moment(day).format('MMMM Do, YYYY') + '</time></h3>').appendTo('#calendar');
        groups[day].forEach(function(event) {
          $('<div class="event" id="' + event.citystate + '"><h4><span class="title">' + event.citystate + '</span></h4>').appendTo('#calendar');
      if(event.name) {
            $('<span><strong>' + event.name + '</strong>  </span>').appendTo('#calendar');
          }
       if(event.allday != 'true') {
            $('<span><strong>' + event.starttime + '</strong>  </span>').appendTo('#calendar');
          }
          if(event.venue) {
            $('<br /><span class="p-location location h-card vcard"><span>' + event.venue + '</span> ' + '<span class="address">' + event.address + '</span>' + '</span>').appendTo('#calendar');
          }
          if(event.summary) {
            $('<br /><span class="p-name summary">' + event.summary + '</span>').appendTo('#calendar');
            }
          if(event.website) {
            $('<a href="' + event.website + '" class="ml small"> <i class="icon-link-ext"></i> website</a>').appendTo('#calendar');
          }
        $('</div>').appendTo('#calendar');
        });
      }
  });

// USING days_desc to give us the reverse chron to show most recent past event at the top of the list.
days_desc.forEach(function(day) {
 if (moment(day).isBefore(moment().subtract('days', 1))) {
        $('<h5><time class="dt-start dtstart">' + moment(day).format('MMMM Do, YYYY') + '</time></h5>').appendTo('#calendar-past');
        groups[day].forEach(function(event) {
          $('<div class="event" id="' + event.citystate + '"><h4><span class="title">' + event.citystate + '</span></h4>').appendTo('#calendar-past');
      if(event.name) {
            $('<span><strong>' + event.name + '</strong>  </span>').appendTo('#calendar-past');
          }
         if(event.allday != 'true') {
            $('<span><strong>' + event.starttime + '</strong>  </span>').appendTo('#calendar-past');
          }
          if(event.venue) {
            $('<br /><span class="p-location location h-card vcard"><span>' + event.venue + '</span> ' + '<span class="address">' + event.address + '</span>' + '</span>').appendTo('#calendar-past');
          }
          if(event.summary) {
            $('<br /><span class="p-name summary">' + event.summary + '</span>').appendTo('#calendar-past');
            }
          if(event.website) {
            $('<a href="' + event.website + '" class="ml small"><i class="icon-link-ext"></i> website</a>').appendTo('#calendar-past');
          }
        $('</div>').appendTo('#calendar-past');
        });
        }
  });
  });
});