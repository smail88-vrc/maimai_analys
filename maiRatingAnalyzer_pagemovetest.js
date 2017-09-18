javascript:
function top2mlist()
{
	var eroot = document.getElementsByClassName("header").getElementsByTagName("a");
//	eroot = eroot.firstElementChild;
	confirm(eroot.length);
}

(function()
{
	top2mlist();
})()
