 document.addEventListener('DOMContentLoaded', function(tab) 
 {
	var checkStartButton = document.getElementById('startList');
	var checkNextButton = document.getElementById('nextVid');
	var checkPrevButton = document.getElementById('prevVid');
	
	checkStartButton.addEventListener('click', function(tab) 
	{
		var subscriptionURL = "https://www.youtube.com/feed/subscriptions";
		chrome.tabs.create({ url: subscriptionURL });

		chrome.tabs.executeScript(tab.id, 
		{
			"file": "createList.js"
		}, function () 
		{ 
			console.log("List Created ... "); // Notification on Completion
		});
		
	}, false);
	
	checkNextButton.addEventListener('click', function(tab) 
	{
		chrome.tabs.executeScript(tab.id, 
		{
			"file": "nextVid.js"
		}, function () 
		{ 
			console.log("Loaded Next Video ... "); // Notification on Completion
		});
	}, false);
	
	checkPrevButton.addEventListener('click', function(tab) 
	{
		chrome.tabs.executeScript(tab.id, 
		{
			"file": "prevVid.js"
		}, function () 
		{ 
			console.log("Loaded Previous Video ... "); // Notification on Completion
		});
	}, false);
	
}, false);