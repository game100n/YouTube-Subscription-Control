/* var subscriptionURL = "https://www.youtube.com/feed/subscriptions";
	chrome.tabs.create({ url: subscriptionURL }); */

function loadVids()
{
	return function()
	{
		window.scrollTo(0,document.body.scrollHeight);
		document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-default load-more-button yt-uix-load-more browse-items-load-more-button")[0].click();
	}
}

function callback()
{
	return function()
	{
		//Grabs all HTML related to subcription feed of videos
		var links = [];
		links = document.getElementsByTagName('h3');

		//Grabs all links for videos
		//Initialize list
		var ytLinks=[];
		
		/*
		if(ytLinks.length > 0)
		{
			ytLinks = [];
		}
		*/
		
		for(var ii=0; ii<links.length; ii++) 
		{
			try 
			{
				//Get all anchor tag href links
				ytLinks[ii] = links[ii].getElementsByTagName('a').item(0).href;
			}
			catch(error) 
			{
				continue;
			}
		}

		//Filters out non-video links
		for(var ii = ytLinks.length - 1; ii >= 0; ii--) 
		{
			//RegExp to test is YT link is video
			if(!(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/.test(ytLinks[ii])))
			{
				//Removes non-video links from array
				ytLinks.splice(ii, 1);
			}
		}

		//alert(ytLinks[0]);

		//Send data to back script
		var port = chrome.runtime.connect({name: "YTlinkPass"});
		port.postMessage(ytLinks);
	}
}

setTimeout(loadVids(),0);
setTimeout(loadVids(), 500);
setTimeout(callback(),1000);