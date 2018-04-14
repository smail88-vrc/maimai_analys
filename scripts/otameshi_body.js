javascript:
(function()
{

var hashtag = "%e8%88%9e%e3%83%ac%e3%83%bc%e3%83%88%e8%a7%a3%e6%9e%90lite";	// 舞レート解析lite
var mainet_dom = 'https://maimai-net.com/maimai-mobile/';
var mra_update_algorithm = "2018.04.09";


/* ココからメイン */

var tmpstr = "--舞レート解析・あならいざもどき--\n";
tmpstr += maimai_inner_lv.length + "songs(" + mra_update_mlist + ") version\n";
tmpstr += "Last Update : ";
tmpstr += (mra_update_algorithm >= mra_update_llist)?mra_update_algorithm:mra_update_llist;
tmpstr += "\n\n";
tmpstr += "Programmed by @sgimera";
if(!confirm(tmpstr))
	return;


})(); void(0);
