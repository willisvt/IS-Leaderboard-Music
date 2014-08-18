jQuery('head').append('<script src="https://static.firebase.com/v0/firebase.js"></script>');

//Firebase Chrome Extension Stuff

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });


// setTimeout(function() {

//   // Firebase.enableLogging(true);
//   var myFirebaseData = new Firebase('https://is-leaderboard.firebaseio.com/');

//    // Attach an asynchronous callback to read the data at our posts reference
//    myFirebaseData.on('value', function (snapshot) {
//      console.log(snapshot.val());
//    }, function (errorObject) {
//      console.log('The read failed: ' + errorObject.code);
//    });

//   console.log('loaded '+ myFirebaseData);
// }, 2000);

$(function() {

  jQuery('body').append('<sup>Sup.</sup>');

  console.log('My Chrome extension is now running...');

    var songs = {
      "default": "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/28355071&amp;auto_play=true&amp;hide_related=true&amp;",           // Wu-Tang Clan - CREAM (instrumental)
      "Joe Caprio": "www.youtube.com/embed/yogLEyrYC48",        // Drake - Started From the Bottom
      "Randy Dehaan": "www.youtube.com/embed/xZ4tNmnuMgQ",      // Thiggy Smalls - Mo' Money Mo Problems
      "Will Smith": "www.youtube.com/embed/NOJ2mM3WH0I",        // Will Smith - Fresh Prince of Bell Air Theme Song
      "Michaela Morgan": "www.youtube.com/embed/8dAPcu_A9eE",   // Alicia Keys - Girl On Fire
      "Mike Brady": "www.youtube.com/embed/L_vpfblTqng",        // Florida State War Chant
      "Jeff Olsen": "www.youtube.com/embed/erqLnJva0HQ",        // Jet - Put Your Money Where Your Mouth Is
      "Nisha Javeri": "www.youtube.com/v/2HQaBWziYvY?t=135",
      "Dice K": "www.youtube.com/embed/3MUGAxpI0Bc?t=7",        // MOP - Ante Up
      // "Sarah Davis": "www.youtube.com/embed/gXjibzO7ios",
      // "Clark Bakstran": "www.youtube.com/embed/gXjibzO7ios",    // Dynamite Hack - Boyz In The Hood
      "Kiley Salomon": "www.youtube.com/embed/IdWB_u_FqmU",     // Coolio - Gangsta's Paradies
      "TJ Higgins": "www.youtube.com/embed/yogLEyrYC48"
    };

    var newDeal = false;
    setInterval(function() {
      if (!newDeal && jQuery('.new_deal_inner').size() > 0) {
          console.log("ACTUAKKKTHH BOTTOM");
          newDeal = true;

          var name = jQuery('.owner span.name').text();
          var url = songs[name] || songs["default"];
          url += '?autoplay=1';
          console.log(name, url);

          setTimeout(function() { playSound(url); }, 2000);
      } else if (newDeal && jQuery('.new_deal_inner').size() == 0) {
          newDeal = false;
          console.log("New deal over");
          jQuery('sup').html('');
      }

    }, 2700);

  function playSound(url) {
    console.log('Start Music');
      jQuery('sup').html('<iframe id="player" width="420" height="315" src="//' + url + '" frameborder="0" allowfullscreen></iframe>');  
      setTimeout(function() {
        jQuery('sup').html('');  
        console.log('/End Music');
      }, 30000);  // Plays for a certain amount of time
  }
});



jQuery('body').click( function(){
    playSound();

    
    // jQuery('sup').html('<iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/73637057&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>');
    // jQuery('sup').html('<iframe width="420" height="315" src="//www.youtube.com/embed/yogLEyrYC48?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
})




