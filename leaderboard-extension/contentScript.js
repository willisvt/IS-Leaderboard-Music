//Firebase Chrome Extension Stuff

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse) {
			chrome.pageAction.show(sender.tab.id);
			sendResponse();
		});



$(function() {

	var fb = new Firebase("https://is-leaderboard.firebaseio.com");

	$('body').append('<sup style="display:none;">Sup.</sup>');

	console.log('My Chrome extension is now running...');

    /*
	//Add to simulate/spoof deal
	var name = "Will Smith";
	$('body').append('<div class="new_deal_inner owner"><span class="name">' + name + '</span></div>');
	//Reset defaults to db XXX Careful will wipe db
	var songs = {
			"default": "www.youtube.com/embed/yogLEyrYC48",           // Wu-Tang Clan - CREAM (instrumental)
			"Joe Caprio": "www.youtube.com/embed/yogLEyrYC48",        // Drake - Started From the Bottom
			"Randy Dehaan": "www.youtube.com/embed/xZ4tNmnuMgQ",      // Thiggy Smalls - Mo' Money Mo Problems
			"Will Smith": "www.youtube.com/embed/NOJ2mM3WH0I",        // Will Smith - Fresh Prince of Bell Air Theme Song
			"Michaela Morgan": "www.youtube.com/embed/8dAPcu_A9eE",   // Alicia Keys - Girl On Fire
			"Mike Brady": "www.youtube.com/embed/L_vpfblTqng",        // Florida State War Chant
			"Jeff Olsen": "www.youtube.com/embed/erqLnJva0HQ",        // Jet - Put Your Money Where Your Mouth Is
			"Nisha Javeri": "www.youtube.com/v/2HQaBWziYvY?t=135",
			"Dice K": "www.youtube.com/embed/3MUGAxpI0Bc?t=7",        // MOP - Ante Up
			"Sarah Davis": "www.youtube.com/embed/gXjibzO7ios",
			"Clark Bakstran": "www.youtube.com/embed/gXjibzO7ios",    // Dynamite Hack - Boyz In The Hood
			"Kiley Salomon": "www.youtube.com/embed/IdWB_u_FqmU",     // Coolio - Gangsta's Paradies
			"TJ Higgins": "www.youtube.com/embed/yogLEyrYC48"
	};
	var db_defaults = {};
	for (key in songs) {
		var url = songs[key];
		db_defaults[key] = {
			'name': key,
			'url': url
		};
	}
	fb.set(db_defaults);
	*/

	var default_users = {
			"default": {
				name: "default",
				url: "www.youtube.com/embed/yogLEyrYC48"
			}
	};
	var users = default_users;
	fb.on('value', function (snapshot) {
		//console.log(snapshot.val());
		users = snapshot.val();
	}, function (errorObject) {
		console.log('The read failed: ' + errorObject.code);
	});

	var newDeal = false;
	setInterval(function() {
		if (!newDeal && $('.new_deal_inner').size() > 0) {
			newDeal = true;

			var name = $('.owner span.name').text();

            var url = users.default && users.default.url
				|| default_users.default.url;

            var uri = URI(url),
                duration = 30;
            if (users[name]) {
                var user = users[name];
                console.log("User", user);
                uri = URI(user.url);
                uri.setQuery('start', parseInt(user.start_time));
                duration = parseInt(user.duration);
            }

            uri.setQuery('autoplay', 1);

			console.log(name, uri.toString());

			setTimeout(function() { playSound(uri.toString(), duration); }, 2000);
		} else if (newDeal && $('.new_deal_inner').size() == 0) {
			newDeal = false;
			console.log("New deal over");
			$('sup').html('');
		}

	}, 2700);

	function playSound(url, duration) {
		console.log('Start Music');
		$('sup').html('<iframe id="player" width="420" height="315" src="//' + url + '" frameborder="0" allowfullscreen></iframe>');
		setTimeout(function() {
			$('sup').html('');
			console.log('/End Music');
		}, duration * 1000);  // Plays for a certain amount of time
	}
});




