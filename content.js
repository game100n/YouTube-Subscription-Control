//Listen for messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
    //If the received message has the expected format...
    if (request.action == "grab_time")
	{
		//alert("RX Request")
		var timeout = document.getElementsByClassName("ytp-time-duration")[0].innerHTML;
		//alert("Content: " + timeout);
		//Call the specified callback, passing the video length content as argument
		sendResponse(timeout);
    }
});



//div.ytp-time-display.notranslate
	//span.ytp-time-current



//alert("CMD RX")

/* var links = document.getElementById('eow-title').title;
alert(links); */

/* //Grabs HTML related to length of video
var timeout = document.getElementsByClassName("ytp-bound-time-right")[0].innerHTML;
//alert(timeout);
var timeouttemp = timeout.split(':');
if(timeouttemp.length == 3)
{
	timeout = (timeouttemp[0]*120 + timeouttemp[1]*60 + timeouttemp[2])*1000;
	//alert(timeouttemp[0] + ":" + timeouttemp[1] + ":" + timeouttemp[2]);
}
else
{
	timeout = (timeouttemp[0]*60 + timeouttemp[1])*1000;
	//alert(timeouttemp[0] + ":" + timeouttemp[1]);
}
alert(timeout);

//Send data to back script
var port = chrome.runtime.connect({name: "vidLen"});
port.postMessage(timeout); */