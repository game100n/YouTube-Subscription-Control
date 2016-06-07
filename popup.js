 document.addEventListener('DOMContentLoaded', function(tab)
 {
	var checkStartButton = document.getElementById('startList');
	var checkNextButton = document.getElementById('nextVid');
	var checkPrevButton = document.getElementById('prevVid');
	var checkAutoPlay = document.getElementById('apToggle');
	
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
		var port = chrome.runtime.connect({name: "YTlinkPass"});
		port.postMessage({cmd: "NEXT"});
		console.log("Loaded Next Video ... ");
		/*
		chrome.tabs.executeScript(tab.id, 
		{
			"file": "nextVid.js"
		}, function () 
		{ 
			console.log("Loaded Next Video ... "); // Notification on Completion
		});
		*/
	}, false);
	
	checkPrevButton.addEventListener('click', function(tab) 
	{
		var port = chrome.runtime.connect({name: "YTlinkPass"});
		port.postMessage({cmd: "PREV"});
		console.log("Loaded Previous Video ... ");
		/*
		chrome.tabs.executeScript(tab.id, 
		{
			"file": "prevVid.js"
		}, function () 
		{ 
			console.log("Loaded Previous Video ... "); // Notification on Completion
		});
		*/
	}, false);
	
	//Use local storage to save apToggle state
	//Set default state
	chrome.storage.local.get({state: false}, function(data) 
	{
		checkAutoPlay.checked = data.state;
	});
	
	checkAutoPlay.addEventListener('change', function(tab) 
	{
		var port = chrome.runtime.connect({name: "YTlinkPass"});
		port.postMessage({cmd: "APTOGGLE", state: checkAutoPlay.checked});
		chrome.storage.local.set({state: checkAutoPlay.checked}, function()
		{
			console.log("Autoplay Toggled to " + checkAutoPlay.checked); // Notification on Completion
		});
		
		/* 
		chrome.tabs.executeScript(tab.id, 
		{
			"file": "apToggle.js"
		}, function () 
		{ 
			//alert("Autoplay Toggled")
			//console.log("Autoplay Toggled ... "); // Notification on Completion
			chrome.storage.local.set({state: checkAutoPlay.checked}), function()
			{
				console.log("Autoplay Toggled ... "); // Notification on Completion
			});
		});
		*/
	}, false);
	
}, false);