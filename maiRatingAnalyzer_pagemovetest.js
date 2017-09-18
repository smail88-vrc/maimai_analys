javascript:
function top2mlist()
{
	var eroot = document.getElementsByClassName('header');
	eroot = eroot.firstElementChild.getElementsByTagName('a');
	confirm(eroot.length);
}

(function()
{
	top2mlist();
})()
