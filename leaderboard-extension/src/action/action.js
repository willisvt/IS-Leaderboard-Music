//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });


Firebase.enableLogging(true);
var fb = new Firebase("https://is-leaderboard.firebaseio.com");

$(function() {
	function displaySongs(songs) {
		/*
		 * var source   = $("#song_template").html(),
		template = Handlebars.compile(source);
		$('#song_container').html(template(songs));
		 */
		var users = songs;
		var $container = $('#song_container ul').empty(),
			key, user, $line;

		for (key in users) {
			user = users[key];
			$line = $('<li></li>');
			$line.append($('<span></span>').text(user.name));
			$line.append($('<a></a>').attr('href', user.url).text(user.url));
			$line.append($('<a>X</a>').click(function(name) {
				return function() {
					fb.child(name).set(null);
				};
			}(user.name)));
			$container.append($line);
		}
	}
	fb.on('value', function (snapshot) {
		console.log(snapshot.val());
		var songs = snapshot.val();
		displaySongs(songs);
	}, function (errorObject) {
		console.log('The read failed: ' + errorObject.code);
	});

	$('#add').click(function() {
		console.log("Clicked");
		var name = $('#name').val(),
			url = $('#url').val(),
            start_time = $('#start_time').val(),
            duration = $('#duration').val();
		var ref = fb.child(name);
		ref.set({
			'name': name,
			'url': url,
            'start_time': start_time || 0,
            'duration': duration || 30
		});
	});
});
