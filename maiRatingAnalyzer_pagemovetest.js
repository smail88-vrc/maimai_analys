javascript:
function top2mlist()
{
	var eroot = document.getElementsByTagName("a");
	eroot = eroot.firstElementChild;
	confirm(eroot.getAttribute("href"));
}

(function()
{
	top2mlist();
})()
