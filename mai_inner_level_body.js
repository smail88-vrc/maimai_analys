javascript:
(function()
{

var ex_list=[], ma_list=[], re_list=[], datalist=[], addr="", your_id="", your_rating="";
var sss_rating=0, ss_rating=0, s_rating=0;
var hashtag = "%e8%88%9e%e3%83%ac%e3%83%bc%e3%83%88%e8%a7%a3%e6%9e%90test";	// 舞レート解析test

function diff2s(difficallity)
{
	var tmp = diff2tmp(difficallity),retval=0;
	switch(Math.floor(tmp))
	{
		case 13:
			retval = tmp+0.5;
			break;
		case 12:
			retval = 12.00+(tmp*1-12.00)*(3/2);
			break;
		default:
			retval = tmp;
			break;
	}
	return Math.round(retval*100)/100;
}

function diff2sss(difficallity)
{
	var tmp=diff2tmp(difficallity), retval=0;
	switch(Math.floor(tmp))
	{
		case 13:
			retval = tmp*1+3.0;
			break;
		case 12:
			retval = tmp*2-10.00;
			break;
		case 11:
			retval = 2.00+tmp*1;
			break;
		case 10:
			retval = 7.50+tmp/2;
			break;
		case 9:
		case 8:
			retval = 2.50+tmp*1;
			break;
		case 7:
		default:
			retval = 6.50+tmp/2;
			break;
	}
	return Math.round(retval*100)/100;
}

function diff2waku(difficallity)
{
	var waku=0;
	var rate_sss = Math.round(10000*diff2sss(difficallity));
	waku = Math.floor(rate_sss/4400);
	waku += Math.floor(rate_sss/440);
	return waku/100;
}
	
function rate_XtoY(basis, max, gap, n)
{
	return basis+(max-basis)*n/gap
}

function arch2rate_10000(achievement, difficallity)
{
	var temp = 0;

		var rate_sss = Math.round(10000*diff2sss(difficallity));
		var rate_ss = rate_sss - 10000;
		var rate_s = Math.round(10000*diff2s(difficallity));
		var diff10000 = Math.round(10000*diff2tmp(difficallity));
		var achi_100 = Math.round(achievement*100);
		if(achi_100 >= 10000) {
			temp = rate_sss
		} else if (achi_100 >= 9900) {
			temp = rate_XtoY(rate_ss,     rate_sss-2500,  100, achi_100-9900);
		} else if (achi_100 >= 9700) {
			temp = rate_XtoY(rate_s,      rate_ss-2500,   200, achi_100-9700);
		} else if (achi_100 >= 9400) {
			temp = rate_XtoY(diff10000-15000, rate_s-10000,   300, achi_100-9400);
		} else if (achi_100 >= 9000) {
			temp = rate_XtoY(diff10000-20000, diff10000-15000,  400, achi_100-9000);
		} else if (achi_100 >= 8000) {
			temp = rate_XtoY(diff10000-30000, diff10000-25000, 1000, achi_100-8000);
		} else if (achi_100 >= 6000) {
			temp = rate_XtoY(diff10000*0.4, diff10000-40000, 2000, achi_100-6000);
		} else if (achi_100 >= 4000) {
			temp = rate_XtoY(diff10000*0.2, diff10000*0.4, 2000, achi_100-4000);
		} else if (achi_100 >= 2000) {
			temp = rate_XtoY(diff10000*0.1, diff10000*0.2, 1000, achi_100-2000);
		} else if (achi_100 >= 1000) {
			temp = rate_XtoY(0,           diff10000*0.1, 1000, achi_100-1000);
		} else {
			temp = 0;
		}
	temp -= temp % 1.0;
	return temp;
}

var confirm_str = "", tweet_str = "";
	
function calc_rating(rate_array, make_text)
{
	var best30=0, history434=0, best_ave=0, best_limit=0, hist_limit=0, tmp=0, str="";
	var best_rating=0, top_rate=0, recent_rating=0, hist_rating=0, best_left=0, hist_left=0;
	confirm_str = "";
	tweet_str = "";
	for(var i=0; i<30; i++)
	{
		tmp = Math.round(Math.floor(rate_array[i]/100));
		best30+=tmp;
	}
	
	history434=best30;
	for(var i=30 ;i<434;i++)
	{
		tmp = Math.round(Math.floor(rate_array[i]/100));
		history434+=tmp;
	}

	best_ave = Math.round(Math.floor(best30/30))/100;
	top_rate = Math.round(Math.floor(rate_array[0]/100))/100;
	best_limit = Math.round(Math.floor(rate_array[29]/100))/100;
	hist_limit = Math.round(Math.floor(rate_array[433]/100))/100;
	if(hist_limit<=0)
	{
		var count=0;
		for(count=0; rate_array[count] > 0; count++);
		hist_limit= "0 (あと" + (434-count) + "曲)";
	}
	
	best_rating = Math.floor(best30/44)/100;	//best30はすでにRating*100
	recent_rating = Math.floor(Math.floor(rate_array[0]/100)*10/44)/100;
	hist_rating = Math.round(Math.floor(history434/(434*11)))/100;	// multiply 4/(434*44)
	
	best_left = (44 - Math.ceil(best30%44))/100;
	hist_left = (434*11 - Math.ceil(history434%44))/100;
	
	var all = Math.round((best_rating + recent_rating + hist_rating)*100)/100;
	
	if(make_text==true)
	{
		confirm_str += " BEST30の平均 : " + best_ave + " (=" + best30/100 + "/30)\n";
		confirm_str += " BEST枠下限 : " + best_limit + "\n";
		confirm_str += " HISTORY枠下限 : " + hist_limit + "\n\n";
		confirm_str += "予想到達可能Rating : " + all + "\n";
		confirm_str += " BEST    : " + best_rating + "\n";
		confirm_str += "  (BEST30枠+" + best_left + "でRating+0.01)\n";
		confirm_str += " RECENT  : " + recent_rating + "\n";
		confirm_str += "  (単曲レートTOP" + top_rate + "を10回出す）\n";
		confirm_str += " HISTORY : " + hist_rating + "\n";
		confirm_str += "  (HISTORY434枠+" + hist_left + "でRating+0.01)\n";
		confirm_str += "\n\n   Supported by sgimera3.hatenablog.com\n\n";
	
		// tweet用文字列
		tweet_str += "BEST%2f平均%3a" + best_ave + " 下限:" + best_limit + "%0D%0A";
		tweet_str += "HIST下限%3a" + hist_limit + "%0D%0A";
		tweet_str += "予想到達Rating%3a" + all + "%0D%0A";
		tweet_str += "B%3a" + best_rating + " %2B R%3a" + recent_rating + " %2B H%3a" + hist_rating + "%0D%0A";
	//	tweet_str += "B:" + best_rating + " (" + best_left + ")%0D%0A";
	//	tweet_str += "R:" + recent_rating + " (" + Math.round(Math.floor(datalist[0].music_rate/100))/100 + ")%0D%0A";
	//	tweet_str += "H:" + hist_rating + " (" + hist_left + ")%0D%0A";
	}
	return all;
}
	
function disp_result()
{
	var tmp_confirm = "とても上手い人\n";
	tmp_confirm += "現在のRating : " + s_rating + " (" + ss_rating + ")\n\n";
	confirm_str = tmp_confirm + confirm_str;

	if(confirm(confirm_str))
	{
		var tmp_tweet_str = "とても上手い人 :" + s_rating + " (" + ss_rating + ")%0D%0A";
		tweet_str = tmp_tweet_str + tweet_str;
		if(window.open
		   ("https://twitter.com/intent/tweet?hashtags=" + hashtag + "&text=" + tweet_str, '_blank') == null)
		{
			confirm("ポップアップブロックを無効にしてください。");
		}
	}	
}
	
		
var lv136="", lv135="", lv134="", lv133="", lv132="", lv131="", lv130="", lv13_="";
var lv129="", lv128="", lv127="", lv12p="";
var lv126="", lv125="", lv124="", lv123="", lv122="", lv121="", lv120="", lv12_="";
var lv119="", lv118="", lv117="", lv11p="";
var lv116="", lv115="", lv114="", lv113="", lv112="", lv111="", lv110="", lv11_="";
var lv109="", lv108="", lv107="", lv10p="";
var lv106="", lv105="", lv104="", lv103="", lv102="", lv101="", lv100="", lv10_="";
var lv099="", lv098="", lv097="", lv09p="";
var lv096="", lv095="", lv094="", lv093="", lv092="", lv091="", lv090="", lv09_="";
var lv099="", lv098="", lv097="", lv09p="";
var lv096="", lv095="", lv094="", lv093="", lv092="", lv091="", lv090="", lv09_="";
var lv089="", lv088="", lv087="", lv08p="";
var lv086="", lv085="", lv084="", lv083="", lv082="", lv081="", lv080="", lv08_="";
var lv079="", lv078="", lv077="", lv07p="";
var lv076="", lv075="", lv074="", lv073="", lv072="", lv071="", lv070="", lv07_="";

var mlist_length=maimai_inner_lv.length;
var rating_table=[];
for(var i=0; i<mlist_length; i++)
{
	//max Rating計算用
	rating_table.push(Math.max.apply(null, maimai_inner_lv[i].levels.map(diff2tmp)));
	
	
	// 内部lv出力用
	for(var lv=0; lv<3; lv++)
	{
		var tmpstr="";
		tmpstr += (maimai_inner_lv[i].nick != "")?maimai_inner_lv[i].nick:maimai_inner_lv[i].name;
		tmpstr += (lv==0)?"(赤)":(lv==2)?"(白)":"";
		tmpstr += "、";
		switch(maimai_inner_lv[i].levels[lv])
		{
			case "13.6":	lv136 += tmpstr; break;
			case "13.5":	lv135 += tmpstr; break;
			case "13.4":	lv134 += tmpstr; break;
			case "13.3":	lv133 += tmpstr; break;
			case "13.2":	lv132 += tmpstr; break;
			case "13.1":	lv131 += tmpstr; break;
			case "13.0":	lv130 += tmpstr; break;
			case "13-":	lv13_ += tmpstr; break;
			case "12.9":	lv129 += tmpstr; break;
			case "12.8":	lv128 += tmpstr; break;
			case "12.7":	lv127 += tmpstr; break;
			case "12.6":	lv126 += tmpstr; break;
			case "12.5":	lv125 += tmpstr; break;
			case "12.4":	lv124 += tmpstr; break;
			case "12.3":	lv123 += tmpstr; break;
			case "12.2":	lv122 += tmpstr; break;
			case "12.1":	lv121 += tmpstr; break;
			case "12.0":	lv120 += tmpstr; break;
			case "12+":	lv12p += tmpstr; break;
			case "12-":	lv12_ += tmpstr; break;
			case "11.9":	lv119 += tmpstr; break;
			case "11.8":	lv118 += tmpstr; break;
			case "11.7":	lv117 += tmpstr; break;
			case "11.6":	lv116 += tmpstr; break;
			case "11.5":	lv115 += tmpstr; break;
			case "11.4":	lv114 += tmpstr; break;
			case "11.3":	lv113 += tmpstr; break;
			case "11.2":	lv112 += tmpstr; break;
			case "11.1":	lv111 += tmpstr; break;
			case "11.0":	lv110 += tmpstr; break;
			case "11+":	lv11p += tmpstr; break;
			case "11-":	lv11_ += tmpstr; break;
			case "10.9":	lv109 += tmpstr; break;
			case "10.8":	lv108 += tmpstr; break;
			case "10.7":	lv107 += tmpstr; break;
			case "10.6":	lv106 += tmpstr; break;
			case "10.5":	lv105 += tmpstr; break;
			case "10.4":	lv104 += tmpstr; break;
			case "10.3":	lv103 += tmpstr; break;
			case "10.2":	lv102 += tmpstr; break;
			case "10.1":	lv101 += tmpstr; break;
			case "10.0":	lv100 += tmpstr; break;
			case "9.9":	lv099 += tmpstr; break;
			case "9.8":	lv098 += tmpstr; break;
			case "9.7":	lv097 += tmpstr; break;
			case "9.6":	lv096 += tmpstr; break;
			case "9.5":	lv095 += tmpstr; break;
			case "9.4":	lv094 += tmpstr; break;
			case "9.3":	lv093 += tmpstr; break;
			case "9.2":	lv092 += tmpstr; break;
			case "9.1":	lv091 += tmpstr; break;
			case "9.0":	lv090 += tmpstr; break;
			case "8.9":	lv089 += tmpstr; break;
			case "8.8":	lv088 += tmpstr; break;
			case "8.7":	lv087 += tmpstr; break;
		}
		
		if(lv==0)
		{
			if(diff2tmp(maimai_inner_lv[i].levels[1]) < 12.7)
				continue;
		}

		switch(maimai_inner_lv[i].levels[lv])
		{
			case "10+":	lv10p += tmpstr; break;
			case "10-":	lv10_ += tmpstr; break;
			case "9+":	lv09p += tmpstr; break;
			case "9-":	lv09_ += tmpstr; break;
			case "8+":	lv08p += tmpstr; break;
		}
	}
}


rating_table = rating_table.sort(function(a,b){return b-a}).map(String);
s_rating=calc_rating(rating_table.map(function(x){return arch2rate_10000(97,x);}), false);
ss_rating=calc_rating(rating_table.map(function(x){return arch2rate_10000(99.5,x);}), false);
sss_rating=calc_rating(rating_table.map(function(x){return arch2rate_10000(100,x);}), true);
	
var test_str="";
	

	
test_str += "<table border=1>";
test_str += "<tr><th colspan=2>未検証譜面<\/th><\/tr>";
test_str += "<tr><th>13<\/th> <td>" + lv13_ + "<\/td><\/tr>";
test_str += "<tr><th>12+<\/th> <td>" + lv12p + "<\/td><\/tr>";
test_str += "<tr><th>12<\/th> <td>" + lv12_ + "<\/td><\/tr>";
test_str += "<tr><th>11+<\/th> <td>" + lv11p + "<\/td><\/tr>";
test_str += "<tr><th>11<\/th> <td>" + lv11_ + "<\/td><\/tr>";
test_str += "<tr><th>10+<\/th> <td>" + lv10p + "<\/td><\/tr>";
test_str += "<tr><th>10<\/th> <td>" + lv10_ + "<\/td><\/tr>";
test_str += "<tr><th>9+<\/th> <td>" + lv09p + "<\/td><\/tr>";
test_str += "<tr><th>9<\/th> <td>" + lv09_ + "<\/td><\/tr>";

test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 13 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("13.6") + "<\/td> <td>" + lv136 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("13.5") + "<\/td> <td>" + lv135 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("13.4") + "<\/td> <td>" + lv134 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("13.3") + "<\/td> <td>" + lv133 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("13.2") + "<\/td> <td>" + lv132 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("13.1") + "<\/td> <td>" + lv131 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("13.0") + "<\/td> <td>" + lv130 + "<\/td><\/tr>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 12+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("12.9") + "<\/td> <td>" + lv129 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("12.8") + "<\/td> <td>" + lv128 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("12.7") + "<\/td> <td>" + lv127 + "<\/td><\/tr>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 12 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("12.6") + "<\/td> <td>" + lv126 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("12.5") + "<\/td> <td>" + lv125 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("12.4") + "<\/td> <td>" + lv124 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("12.3") + "<\/td> <td>" + lv123 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("12.2") + "<\/td> <td>" + lv122 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("12.1") + "<\/td> <td>" + lv121 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("12.0") + "<\/td> <td>" + lv120 + "<\/td><\/tr>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 11+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("11.9") + "<\/td> <td>" + lv119 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("11.8") + "<\/td> <td>" + lv118 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("11.7") + "<\/td> <td>" + lv117 + "<\/td><\/tr>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 11 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("11.6") + "<\/td> <td>" + lv116 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("11.5") + "<\/td> <td>" + lv115 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("11.4") + "<\/td> <td>" + lv114 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("11.3") + "<\/td> <td>" + lv113 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("11.2") + "<\/td> <td>" + lv112 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("11.1") + "<\/td> <td>" + lv111 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("11.0") + "<\/td> <td>" + lv110 + "<\/td><\/tr>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 10+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("10.9") + "<\/td> <td>" + lv109 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("10.8") + "<\/td> <td>" + lv108 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("10.7") + "<\/td> <td>" + lv107 + "<\/td><\/tr>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 10 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("10.6") + "<\/td> <td>" + lv106 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("10.5") + "<\/td> <td>" + lv105 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("10.4") + "<\/td> <td>" + lv104 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("10.3") + "<\/td> <td>" + lv103 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("10.2") + "<\/td> <td>" + lv102 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("10.1") + "<\/td> <td>" + lv101 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("10.0") + "<\/td> <td>" + lv100 + "<\/td><\/tr>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 9+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("9.9") + "<\/td> <td>" + lv099 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("9.8") + "<\/td> <td>" + lv098 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("9.7") + "<\/td> <td>" + lv097 + "<\/td><\/tr>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 9 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("9.6") + "<\/td> <td>" + lv096 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("9.5") + "<\/td> <td>" + lv095 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("9.4") + "<\/td> <td>" + lv094 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("9.3") + "<\/td> <td>" + lv093 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("9.2") + "<\/td> <td>" + lv092 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("9.1") + "<\/td> <td>" + lv091 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("9.0") + "<\/td> <td>" + lv090 + "<\/td><\/tr>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " 8+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += "<tr><td>" + diff2waku("8.9") + "<\/td> <td>" + lv089 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("8.8") + "<\/td> <td>" + lv088 + "<\/td><\/tr>";
test_str += "<tr><td>" + diff2waku("8.7") + "<\/td> <td>" + lv087 + "<\/td><\/tr>";

test_str += "<\/table>"
	
document.open();
document.write(test_str);
document.close();

})()
