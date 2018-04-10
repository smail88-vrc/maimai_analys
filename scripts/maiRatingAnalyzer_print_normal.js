javascript:

var datalist=[], your_id="", your_rating="", your_max_rating="";
var rankicon="", rankname="";
var your_icon="", your_plate="", your_frame="";
var best_ave=0, best_limit=0, hist_limit=0;
var expect_max=0, best_rating=0, top_rate=0, recent_rating=0, hist_rating=0, best_left=0, hist_left=0;
var frd_datalist=[], frd_id="", frd_rating="", frd_max_rating="";
var frd_rankicon="", frd_rankname="";
var frd_best_ave=0, frd_best_limit=0, frd_hist_limit=0;
var frd_expect_max=0, frd_best_rating=0, frd_top_rate=0, frd_recent_rating=0, frd_hist_rating=0, frd_best_left=0, frd_hist_left=0;
var friend_id_code="";

var clist=[], ranklist=[], complist=[];	/* コレクション系 */
var tweet_rate_str="", 	tweet_best_str=""; /* ツイート系 */
var disp_all = false, friendmode = false; /* 動作モード系 */


var hashtag = "%e8%88%9e%e3%83%ac%e3%83%bc%e3%83%88%e8%a7%a3%e6%9e%90";	// 舞レート解析
var mainet_dom = 'https://maimai-net.com/maimai-mobile/';
var mra_update_algorithm = "2018.04.09";

var tweet_rate_str="", 	tweet_best_str="";

function get_ratingrank(rating)
{
	return (rating>=15)?("mai_rainbow"):(rating>=14.5)?("mai_gold"):(rating>=14)?("mai_silver"):(rating>=13)?("mai_copper"):
	(rating>=12)?("mai_violet"):(rating>=10)?("mai_red"):(rating>=7)?("mai_yellow"):(rating>=4)?("mai_green"):
	(rating>=1)?("mai_blue"):("mai_white");
}
	
function print_rank_comp(ver, background, fontcolor, rank1, rank2, comp1, comp2)
{
	var tmp = "";
	tmp += "<tr bgcolor=" + background + " align=center valign=middle>";
	tmp += "<th rowspan=2><font color='" + fontcolor + "'>" + ver + "</font></th>";
	tmp += "<th rowspan=2><font color='" + fontcolor + "'>";
	tmp += (rank2=="")?(rank1):(rank1=="")?(rank2):(rank1+"<br>"+rank2);
	tmp += "</font></th>";
	tmp += "<th><font color='" + fontcolor + "'>" + comp1 + "</th>";
	tmp += "</tr>";
	tmp += "<tr bgcolor=" + background + " align=center valign=middle>";
	tmp += "<th><font color='" + fontcolor + "'>" + comp2 + "</th>";
	tmp += "</tr>";
	
	return tmp;
}
	
function print_result_sub_print_header(title)
{
	var rslt_str ="";
	rslt_str += "<head>";
	rslt_str += "<title>" + title + " | 新・CYCLES FUNの寝言</title>";
    	rslt_str += "<link rel='stylesheet' media='all' type='text/css' href='https://sgimera.github.io/mai_RatingAnalyzer/css/mai_rating.css'>";
 	rslt_str += "<link rel='stylesheet' media='all' type='text/css' href='https://sgimera.github.io/mai_RatingAnalyzer/css/display.css'>";
  	rslt_str += "</head>";
	
	return rslt_str;
}

function print_result_sub_print_data(data, idx, classname)
{
	var str="", tmplv;
	str += "<th class=" + classname + ">" + ((data.rate_values[idx]/100).toFixed(2)) + "</th>";
	tmplv=(data.lv[idx].slice(-1)=='-')?(data.lv[idx].slice(0, -1)):
		(data.lv[idx].slice(-1)=='=')?(data.lv[idx].slice(0, -1)):data.lv[idx];
	str += "<th class=" + classname + ">" + tmplv + "</th>";
	str += "<th class=" + classname + ">" + (100*data.achive[idx]).toFixed(4) + "%</th>";
	if(hashtag.slice(-4)=="test")
		str += "<td class=" + classname + ">" + (data.shortage[idx]) + "</td>";

	return str;
}
	
function print_result_sub_print_datalist(dlist, datedata, id, dan)
{
	var rslt_str ="", tmp_rate=0, rowspan_num=3;
	var exstr="", mastr="", restr="", ex_r=0, ma_r=0, re_r=0;
	var allspan=(hashtag.slice(-4)=="test")?6:5;

	rslt_str += "<table class=alltable border=1 align=center>";
	
	rslt_str += "<tr>";
	rslt_str += "<th colspan=" + allspan + " bgcolor=\#000000><font color=\#ffffff>" + id + dan + "　全譜面データ<br>";
	rslt_str += datedata + "現在<\/font><\/th>";
	rslt_str += "<\/tr>";

	for(var i=0; i<dlist.length; i++)
	{
		rowspan_num=0;
		restr=""; mastr=""; exstr="";
		re_r=dlist[i].rate_values[2];
		ma_r=dlist[i].rate_values[1];
		ex_r=dlist[i].rate_values[0];
		
		/* タイトル */
		if(dlist[i].lv[2] != "" && dlist[i].achive[2] != "---" && dlist[i].achive[2] != 0)
		{
			rowspan_num++;
			restr = print_result_sub_print_data(dlist[i], 2, "mai_remaster");
		}
	
		if(dlist[i].achive[1] != 0)	/* 0なら未プレー */
		{
			rowspan_num++;
			mastr = print_result_sub_print_data(dlist[i], 1, "mai_master")
		}

		if(rowspan_num==0 || Math.max(re_r, ma_r) < mra_arch2rate_100(1, dlist[i].lv[0]))	/* 0なら未プレー */
		{
			rowspan_num++;
			exstr = print_result_sub_print_data(dlist[i], 0, "mai_expert");
		}

		rslt_str += "<tr><th colspan=" + allspan + " class=music_title>" + dlist[i].name + "<\/th><\/tr>"
		rslt_str += "<tr>";
		rslt_str += "<td align=center rowspan=" + rowspan_num + ">" + (i+1) + "</td>";
		rslt_str += "<th rowspan=" + rowspan_num + " ";
		rslt_str += "class=" + get_ratingrank(dlist[i].music_rate/100) + ">"
		rslt_str += (dlist[i].music_rate/100).toFixed(2)  + "</th>"
		if(restr!="")
		{
			rslt_str += restr;
			rslt_str += ((rowspan_num--) > 0)?("</tr><tr>"):"";
		}
		if(mastr!="")
		{
			rslt_str += mastr;
			rslt_str += ((rowspan_num--) > 0)?("</tr><tr>"):"";
		}
		if(exstr!="")
		{
			rslt_str += exstr
			rslt_str += ((rowspan_num--) > 0)?("</tr><tr>"):"";
		}
		rslt_str += "</tr>";
	}
	
	rslt_str += "<\/table>";
	
	return rslt_str;
}

function print_result_friend_sub(title, value, frd_value)
{
	var tmp = "";
	tmp += "<tr>";
	tmp += "<th align=center class=mai_white>" + value + "<\/th>"
	tmp += "<th>" + title + "<\/th>";
	tmp += "<th align=center class=mai_white>" + frd_value + "<\/th>"
	tmp += "<\/tr>";
	
	return tmp;
}

function print_result_rating_friend(title, value, dispbasevalue, frd_value, frd_dspbsvl)
{
	var tmp = "";
	tmp += "<tr>";
	tmp += "<th align=center class=" + get_ratingrank(dispbasevalue) + ">" + value + "<\/hd>"
	tmp += "<th>" + title + "<\/th>";
	tmp += "<th align=center class=" + get_ratingrank(frd_dspbsvl) + ">" + frd_value + "<\/hd>"
	tmp += "<\/tr>";
	
	return tmp;
}

function print_result_friend()
{
	var rslt_str="";
	rslt_str += "<html>";
	rslt_str += print_result_sub_print_header
		(your_id + rankname + "と" + frd_id + frd_rankname +"の舞レート比較結果");
	
	rslt_str += "<body>";
	rslt_str += "<p align=right><a href='" + mainet_dom + "friend/'>maimai.net HOMEに戻る<\/a><\/p>";
	rslt_str += "<h2 align=center>" + your_id + rankname + "<br>vs<br>" + frd_id + frd_rankname + "<\/h2>";
	
	var today = new Date();
	var data_str = today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate() + " ";
	data_str += (("0"+today.getHours()).slice(-2)) + ":" + (("0"+today.getMinutes()).slice(-2)) + ":" + (("0"+today.getSeconds()).slice(-2));
	
	rslt_str += "<div id=player_rating_info>";
	rslt_str += "<table class=datatable border=1 align=center>";
	rslt_str += "<tr>";
	rslt_str += "<th colspan=3 bgcolor='#000000'><font color='#ffffff'>" + data_str + "現在</font></th>";
	rslt_str += "</tr>";

	rslt_str += "<tr valign=middle bgcolor='#000000'>";
	rslt_str += "<th><font color='#ffffff'>" + your_id + "</font></th>";
	rslt_str += "<th><font color='#ffffff'> vs </font></th>";
	rslt_str += "<th><font color='#ffffff'>" + frd_id + "</font></th>";
	rslt_str += "</tr>";

	rslt_str += "<tr valign=middle bgcolor='#000000'>";
	rslt_str += "<th><img src='" + rankicon + "' height=50></th>";
	rslt_str += "<th><font color=#ffffff>段位</font></th>";
	rslt_str += "<th><img src='" + frd_rankicon + "' height=50></th>";
	rslt_str += "</tr>";

	rslt_str += print_result_rating_friend
		("現在のRating", your_rating + "<br>(" + your_max_rating + ")", your_rating,
			frd_rating + "<br>(" + frd_max_rating + ")", frd_rating);	
	rslt_str += print_result_rating_friend
		("BEST平均", best_ave, best_ave, frd_best_ave, frd_best_ave);
	rslt_str += print_result_rating_friend
		("BEST下限", best_limit, best_limit, frd_best_limit, frd_best_limit);
	rslt_str += print_result_friend_sub("HIST下限", hist_limit, frd_hist_limit);

	rslt_str += "<tr>";
	rslt_str += "<th colspan=3 bgcolor='#000000'><font color='#ffffff'>予想到達可能Rating</font></th>";
	rslt_str += "</tr>";

	rslt_str += print_result_rating_friend("予想値", expect_max, expect_max, frd_expect_max, frd_expect_max);
	rslt_str += print_result_rating_friend
		("BEST枠", best_rating + "<br>(" + best_left + ")", best_ave,
			frd_best_rating + "<br>(" + frd_best_left + ")", frd_best_ave);
	rslt_str += print_result_rating_friend
		("RECENT枠", recent_rating + "<br>(" + ((top_rate/100).toFixed(2)) + ")", top_rate/100,
			frd_recent_rating + "<br>(" + ((frd_top_rate/100).toFixed(2)) + ")", frd_top_rate/100);
	rslt_str += print_result_friend_sub
		("HISTORY枠", hist_rating + "<br>(" + (hist_left.toFixed(2)) + ")", 
		 frd_hist_rating + "<br>(" + (frd_hist_left.toFixed(2)) + ")");
	rslt_str += "</table>";

	if(hashtag.slice(-4)=="test")
	{
		rslt_str += "<h2 align=center>" + frd_id + "全譜面データ</h2>";
		rslt_str += print_result_sub_print_datalist(frd_datalist, data_str, frd_id, frd_rankname);
	}
	
	rslt_str += "</body>";
	rslt_str += "</html>";
	
	datalist=null;
	frd_datalist=null;
	document.open();
	document.write(rslt_str);
	rslt_str=null;
	document.close();
}

function print_result_sub(title, value, explain)
{
	var tmp = "";
	tmp += "<tr>";
	tmp += "<th>" + title + "<\/th>";
	tmp += "<th align=center class='tweet_info mai_white'>" + value + "<\/th>"
	tmp += "<td>" + explain + "<\/td>";
	tmp += "<\/tr>";
	
	return tmp;
}

function print_result_rating(title, value, explain, dispbasevalue)
{
	var tmp = "";
	tmp += "<tr>";
	tmp += "<th>" + title + "<\/th>";
	tmp += "<th align=center class='tweet_info " + get_ratingrank(dispbasevalue) + "'>" + value + "<\/hd>"
	tmp += "<td>" + explain + "<\/td>";
	tmp += "<\/tr>";
	
	return tmp;
}


function print_result()
{
	var rslt_str="";

	rslt_str += "<html>";
	rslt_str += print_result_sub_print_header(your_id + rankname +"の舞レート解析結果");
	
	rslt_str += "<body>";
	
	var today = new Date();
	var data_str = today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate() + " ";
	data_str += (("0"+today.getHours()).slice(-2)) + ":" + (("0"+today.getMinutes()).slice(-2)) + ":" + (("0"+today.getSeconds()).slice(-2));
	
	rslt_str += "<p align=right><a href='" + mainet_dom + "home'>maimai.net HOMEに戻る<\/a><\/p>";

	rslt_str += "<h2 align=center>" + your_id + rankname + "</h2>";

	if(hashtag.slice(-4)=="test")
	{
	rslt_str += "<center>";
	rslt_str += "<div class=game_display>";
	rslt_str += "<img src='" + your_frame + "' width=100%>";
	rslt_str += "<img src='" + your_icon + "' class=game_icon>";
	rslt_str += "<img src='" + your_plate + "' class=game_plate>";
	rslt_str += "<img src='" + rankicon + "' class=game_rank>";
	rslt_str += "<p class='game_rating " + get_ratingrank(your_rating) + "'>" + your_rating + "/" + your_max_rating + "</p>";
	rslt_str += "<p class=game_name>" + your_id + "</p>";
	rslt_str += "</center>";
	}		
	
	rslt_str += "<h2 align=center>Rating解析結果<\/h2>";

	rslt_str += "<table class=datatable border=1 align=center>";
	rslt_str += "<tr valign=middle>";
	rslt_str += "<th colspan=3 bgcolor='#000000'>";
	rslt_str += "<font color='#ffffff' class=tweet_info>" + your_id + "</font>";
	if(hashtag.slice(-4)!="test")
	{
	rslt_str += "<img src='" + rankicon + "' height=50>";
	}
	rslt_str += "</th>";
	rslt_str += "</tr>";

	rslt_str += "<tr><th colspan=3 bgcolor='#000000'><font color='#ffffff'>" + data_str + "現在</font></th></tr>";
	
	rslt_str += print_result_rating("現在のRating", your_rating + "<br>(" + your_max_rating + ")", "maimai.netで確認できるRating", 
					your_rating);
	rslt_str += print_result_rating("BEST平均", best_ave, "上位30曲の平均レート値", best_ave);
	rslt_str += print_result_rating("BEST下限", best_limit, "30位のレート値", best_limit);
	rslt_str += print_result_sub("HIST下限", hist_limit, mra_history + "位のレート値");

	rslt_str += "<tr><th colspan=3 bgcolor='#000000'><font color='#ffffff'>予想到達可能Rating</font></th></tr>";

	rslt_str += print_result_rating("予想値", expect_max, "下の3つの値の合計", expect_max);
	rslt_str +=
		print_result_rating("BEST枠", best_rating + "<br>(" + best_left + ")",
				    "(上位30曲の合計)/44<br>()は+0.01する為の必要レート", best_ave);
	rslt_str +=
		print_result_rating("RECENT枠", recent_rating + "<br>(" + ((top_rate/100).toFixed(2)) + ")",
				    "レート値1位を10回達成<br>()は1位の単曲レート値", top_rate/100);
	rslt_str +=
		print_result_sub("HISTORY枠", hist_rating + "<br>(" + (hist_left.toFixed(2)) + ")",
				 "(上位" + mra_history +"曲の合計)*(4/" + mra_history + ")/44<br>()は+0.01する為の必要レート");
	rslt_str += "</table>";

	rslt_str += "<p align=center>";
	rslt_str += "<a href='https://twitter.com/intent/tweet?hashtags=" + hashtag + "&text=" + tweet_rate_str + "' " + "target='_blank'>"
	rslt_str += "＞＞Rating情報のツイートはここをクリック＜＜<\/a><\/p>";

	rslt_str += "<p align=center>";
	rslt_str += "<a href='https://sgimera.github.io/mai_RatingAnalyzer/' target=_blank>";
	rslt_str += "＞＞解説は新・CYCLES FUNの寝言 siteへ＜＜</a></p>";

	rslt_str += "<h2 align=center>Rank/Complete情報</h2>";

	rslt_str += "<table class=complist border=1 align=center>";
	
	rslt_str += "<tr bgcolor='#000000' align=center valign=middle>";
	rslt_str += "<th colspan=3><font color='#ffffff'>" + your_id + "のRank/Complete情報<br>" + data_str + "現在</font></th>";
	rslt_str += "</tr>";

	rslt_str += "<tr bgcolor='#FFFFFF' align=center valign=middle>";
	rslt_str += "<th>ver.</th>";	
	rslt_str += "<th>段位</th>";	
	rslt_str += "<th>制覇</th>";
	rslt_str += "</tr>";

	rslt_str += print_rank_comp
		('青<br>真', '#0095d9', '#FFFFFF', ranklist[0], ranklist[1], complist[0], complist[1]);
	rslt_str += print_rank_comp
		('緑<br>檄', '#00b300', '#FFFFFF', ranklist[2], ranklist[3], complist[2], complist[3]);
	rslt_str += print_rank_comp
		('橙<br>暁', '#fab300', '#000000', ranklist[4], ranklist[5], complist[4], complist[5]);
	rslt_str += print_rank_comp
		('桃<br>櫻', '#FF83CC', '#000000', ranklist[6], "", complist[6], complist[7]);
	rslt_str += print_rank_comp
		('紫<br>菫', '#b44c97', '#FFFFFF', ranklist[7], "", complist[8], complist[9]);

	rslt_str += "</table>";
	rslt_str += "</div>";
	
	ranklist=null;
	complist=null;

	if(disp_all)
	{
	rslt_str += "<h2 align=center>全譜面レート値データ</h2>";
	rslt_str += "<p align=center>寝言サイトにも書いてますが、<b>ただの飾り</b>です。参考情報。</p>";

	if(hashtag.slice(-4)=="test")
	{
	rslt_str += "<p align=center>";
	rslt_str += "<a href='https://twitter.com/intent/tweet?hashtags=";
	rslt_str += hashtag;
	rslt_str += "&text=";
	rslt_str += tweet_best_str + "' ";
	rslt_str += "target='_blank'>＞＞TOP10のツイートはここをクリック＜＜</a></p>";
	}
	else
	{
	rslt_str += "<table class=alltable align=center border=1>";
	rslt_str += "<tr><th colspan=2></th> <td>カッコあり</td> <td>カッコなし</td></tr>";
	rslt_str += "<tr><th rowspan=2>Re:Master<br>Master</th><th>12以上</th>";
	rslt_str += "<td><font color=red>未検証</font></td><td>検証済み<br>ゲーム内表示Lv.で表記</td></tr>";
	rslt_str += "<tr><th>11+以下</th><td><font color=red>未検証</font><br>暫定で紫+ver.の値</td><td>調査済みの値</td></tr>";
	rslt_str += "<tr><th colspan=2>Expert</th><td><font color=red>未検証</font><br>暫定で紫+ver.の値</font></td>";
	rslt_str += "<td>小数点有なら検証済み<br>小数点無は<font color=red>未検証</font></td></tr>";
	rslt_str += "</table><br><br>";
	}

	rslt_str += print_result_sub_print_datalist(datalist, data_str, your_id, rankname);	/* 全譜面データ出力 */

	} // disp_allのおしまい
	rslt_str += "</body>";
	rslt_str += "</html>";
	
	datalist=null;
	document.open();
	document.write(rslt_str);
	rslt_str=null;
	document.close();
}

	
function tweet_best(dlist)
{
	tweet_best_str = your_id + rankname + "%20:" + your_rating +"(" + your_max_rating + ")" + "%0D%0A";
	tweet_best_str += "B%3a" + best_rating + "%20%2B%20R%3a";
	tweet_best_str += recent_rating + " %2B%20H%3a"
	tweet_best_str += hist_rating + "%20%3d%20" + expect_max + "%0D%0A%0D%0A";
	
	for(var i=0; i<10; i++)
	{
		var tmp_rate = dlist[i].music_rate;
		tweet_best_str += (tmp_rate/100).toFixed(2) + ": "
		if(dlist[i].nick != "")
		{
			tweet_best_str += dlist[i].nick;
		}
		else if(dlist[i].name.length < 15)
		{
			tweet_best_str += dlist[i].name;
		}
		else
		{
			tweet_best_str += dlist[i].name.slice(0, 14) + "%ef%bd%9e";
		}
		(dlist[i].rate_values[1] == tmp_rate)?(tweet_best_str+=""):
		(dlist[i].rate_values[2] == tmp_rate)?(tweet_best_str+=" 白"):(tweet_best_str+= " 赤");
		tweet_best_str +="%0D%0A";
	}

}
	
