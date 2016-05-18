var YTlinks = [];
var index = 0;
var activeTabId;
var autoPlay = false;
var timer;

function playNext()
{
	return function()
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
				var timeout = document.getElementsByClassName("ytp-bound-time-right")[0].innerHTML;
				var timeouttemp = timeout.split(':');
				timeout = (timeouttemp[0]*60 + timeouttemp[1])*1000;
				alert(timeout);
				timer = setTimeout(playNext(), timeout);
			}
			
		}
	}
}

function playPrev()
{
	return function()
	{
		alert("WORKING")
		clearTimeout(timer);
		index--;
		if(index < 0)
		{
			alert("No More Previous Video");
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
				var timeout = document.getElementsByClassName("ytp-bound-time-right")[0].innerHTML;
				var timeouttemp = timeout.split(':');
				timeout = (timeouttemp[0]*60 + timeouttemp[1])*1000;
				timer = setTimeout(playNext(), timeout);
			}
			
		}
	}
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
			//Toggle if user wants to autoplay videos 
			autoPlay = !autoPlay;
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
			
			chrome.tabs.query( { active: true, currentWindow: true }, function( tabs ) 
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
				var timeout = document.getElementsByClassName("ytp-bound-time-right")[0].innerHTML;
				var timeouttemp = timeout.split(':');
				timeout = (timeouttemp[0]*60 + timeouttemp[1])*1000;
				timer = setTimeout(playNext(), timeout);
			}
			
		}
	  
	});
});