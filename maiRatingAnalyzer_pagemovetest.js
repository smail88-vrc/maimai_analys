javascript:
function top2mlist()
{
	var eroot = document.getElementsByClassName('header');
	eroot = eroot.firstElementChild;
	
	while(eroot.nodeName="center")
	{
		eroot = eroot.nextElementSibling;
	}
	
	confirm(eroot);
}

(function()
{
	top2mlist();
})()
