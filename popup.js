 document.addEventListener('DOMContentLoaded', function() 
 {
	var checkPageButton = document.getElementById('nextVid');
	checkPageButton.addEventListener('click', function() 
	{
		window.alert("WORKING");
		
		var subscriptionURL = "https://www.youtube.com/feed/subscriptions";
		chrome.tabs.create({ url: subscriptionURL });
		window.alert("HI");  //This is not showing up
		 
		 
		 //Trying to test this part out
		 //Will try YouTube API
		 /*
		var newURL = html($('.yt-lockup-title'));
		window.alert(newURL);
		chrome.tabs.create({ url: newURL });
		*/
		 
	}, false);
}, false);