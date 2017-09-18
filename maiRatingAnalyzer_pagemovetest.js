javascript:
function top2mlist()
{
	var eroot = document.getElementsByClassName("header");
	eroot = eroot.firstElementChild.nextElementSibling.nextElementSibling;
	confirm(eroot);
}

(function()
{
	top2mlist();
})()
