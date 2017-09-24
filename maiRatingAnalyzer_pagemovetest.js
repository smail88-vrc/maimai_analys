javascript:

function address_musiclist(diff)
{
	var eroot = document.getElementsByTagName('a');
	for(var i=0; i<eroot.length; i++)
	{
		var url=eroot[i].getAttribute('href');
		if(url.indexOf("music.html") == 0)
		{
			return url+"&d="+diff;
		}
	}
}

(function()
{
	var url = address_musiclist(5);
	var master_window = window.open(url);
	confirm(master_window);
})()
