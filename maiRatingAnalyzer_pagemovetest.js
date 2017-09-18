javascript:
function top2mlist()
{
	var eroot = document.getElementsByClassName("header");
	eroot = eroot.firstElementChild;
	confirm(eroot.children[1]);
}

(function()
{
	top2mlist();
})()
