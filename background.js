var YTlinks = [];
var index = 0;
var activeTabId;
var autoPlay = false;
var timer;
//var timeout;

function setTimer(msg)
{
	console.log("Time queryed: " + msg);
	var timeoutTempString = msg.split(':');
	var timeoutTemp = [];
	
	for(var ii = 0; ii < timeoutTempString.length; ii++)
	{
		timeoutTemp[ii] = Number(timeoutTempString[ii])
	}
	
	if(timeoutTempString.length == 3)
	{
		msg = (timeoutTemp[0]*120 + timeoutTemp[1]*60 + timeoutTemp[2])*1000;
		//alert(timeoutTemp[0] + ":" + timeoutTemp[1] + ":" + timeoutTemp[2]);
	}
	else
	{
		msg = (timeoutTemp[0]*60 + timeoutTemp[1])*1000;
		//alert("BreakDown: " + timeoutTemp[0] + ":" + timeoutTemp[1] + "\n" + timeoutTemp[0]*60 + ":" + timeoutTemp[1] + "::" + (timeoutTemp[0]*60 +timeoutTemp[1]));
		//alert("Maths: " + timeoutTemp[0]*60 + ":" + timeoutTemp[1] + "::" + (timeoutTemp[0]*60 +timeoutTemp[1]))
	}
	
	console.log("Time in ms: " + msg);
	timer = setTimeout(apNext(), msg);
}

function requestTime(activeTabId)
{
	return function()
	{
		//alert("Time Requested")
		
		/* var links = document.getElementById('eow-title').title;
		alert(links); */
		
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { action: "grab_time" }, setTimer);
		});
		console.log("Requested Timer Info ... ");
		//chrome.tabs.sendMessage(activeTabId, { action: "grab_time" }, setTimer);
		
		/* //var timeout = document.getElementsByClassName("ytp-bound-time-right")[0].innerHTML;
		alert(timout);
		var timeouttemp = timeout.split(':');
		timeout = (timeouttemp[0]*60 + timeouttemp[1])*1000;
		alert(timeout); */
		
		/* chrome.tabs.executeScript(activeTabId, 
		{
			"file": "content.js"
		}, function() 
		{ 
			console.log("Firing Content Script... "); // Notification on Completion
		});
		
		chrome.runtime.onConnect.addListener(function(port) 
		{
			console.assert(port.name == "vidLen");
			port.onMessage.addListener(function(msg) 
			{
				alert(msg);
				//timer = setTimeout(playNext(), msg);
			});
		}); */
		
		//timer = setTimeout(playNext(), timeout);
	}
}

function apNext()
{
	return function()
	{
		playNext();
	}
}

function playNext()
{
	clearTimeout(timer);
	index++;
	if(index >= YTlinks.length)
	{
		alert("Reached End of List");
		index--;
	}
	else
	{
		chrome.tabs.remove(activeTabId);
		
		chrome.tabs.create({url: YTlinks[index]});
		//var win=window.open(YTlinks[index], '_blank');
		//win.focus();
		
		chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) 
		{
			 // since only one tab should be active and in the current window at once
			 // the return variable should only have one entry
			 //var activeTab = arrayOfTabs[0];
			 activeTabId = arrayOfTabs[0].id;
		});
		
		if(autoPlay)
		{
			console.log("NextVid Autoplay ... ");
			/* chrome.tabs.onUpdated.addListener(function(activeTabId, info) 
			{
				if (info.status == "complete") 
				{
					console.log("Page Loaded");
					requestTime(activeTabId);
				}
			}); */
			setTimeout(requestTime(activeTabId), 4000);
		}
	}
	
	console.log("NextVid ... " + autoPlay);
}

function playPrev()
{
	clearTimeout(timer);
	index--;
	if(index < 0)
	{
		alert("No More Previous Videos");
		index++;
	}
	else
	{
		chrome.tabs.remove(activeTabId);
		
		chrome.tabs.create({url: YTlinks[index]});
		//var win=window.open(YTlinks[index], '_blank');
		//win.focus();
		
		chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) 
		{
			activeTabId = arrayOfTabs[0].id;
		});
		
		if(autoPlay)
		{
			//alert("PrevVid Autoplay")
			//window.onload = 
			setTimeout(requestTime(activeTabId), 3000);
		}
	}
	console.log("PrevVid ... ");
}

chrome.runtime.onConnect.addListener(function(port) 
{
	console.assert(port.name == "YTlinkPass");
	port.onMessage.addListener(function(msg) 
	{
		if (msg.cmd == "NEXT")
		{
			playNext();
		}

		else if (msg.cmd == "PREV")
		{
			playPrev();
		}
		
		else if (msg.cmd == "APTOGGLE")
		{
			//Toggle if user wants to autoPlay videos 
			//autoPlay = !autoPlay;
			autoPlay = msg.state;
			//alert(msg.state);
			if(autoPlay == false)
			{
				clearTimeout(timer);
			}
			console.log("apToggle ... ");
		}
		
		else 
		{
			clearTimeout(timer);
			index = 0;
			YTlinks = [];
			YTlinks = msg;
			//alert(YTlinks);
			//alert(YTlinks[0]);
			//chrome.tabs.create({url: YTlinks[0]});
			
			chrome.tabs.query( { active: true, currentWindow: true }, function(tabs) 
			{
				chrome.tabs.update(tabs[0].id, {url: YTlinks[0]}); 
			});
			
			//var win=window.open(YTlinks[0], '_blank');
			//win.focus();
			
			chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) 
			{
				activeTabId = arrayOfTabs[0].id;
			});
			
			/*
			//You can also navigate active tab to required url ( without opening new tab )
			chrome.tabs.query( { active: true, currentWindow: true }, function( tabs ) 
			{
				chrome.tabs.update( tabs[0].id, { url: "http://stackoverflow.com//" } ); 
			});
			*/
			
			//alert(YTlinks.length);
			
			if(autoPlay)
			{
				console.log("Init Autoplay");
				//window.onload = 
				setTimeout(requestTime(activeTabId), 3000);
			}
			
		}
	  
	});
});