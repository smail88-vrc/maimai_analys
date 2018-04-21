javascript:

var mra_not_evaluated="", mra_evaluated="", mra_max_rating="";

(function()
{
	
function get_ratingrank(rating)
{
	return (rating>=15)?("mai_rainbow"):(rating>=14.5)?("mai_gold"):(rating>=14)?("mai_silver"):(rating>=13)?("mai_copper"):
	(rating>=12)?("mai_violet"):(rating>=10)?("mai_red"):(rating>=7)?("mai_yellow"):(rating>=4)?("mai_green"):
	(rating>=1)?("mai_blue"):("mai_white");
}
	
function print_result_sub(title, value, explain)
{
	var tmp = "";
	tmp += "<tr>";
	tmp += "<th>" + title + "<\/th>";
	tmp += "<th align=center class=tweet_info>" + value + "<\/th>"
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

function mra_add_musiclevel_unknown_list(lv_list, m_list)
{
	var liststr="";
	for(var i=0; i<lv_list.length; i++)
	{
		liststr += "<tr><th>" + lv_list[i] + "<\/th>";
		liststr += "<td>" + ((m_list[i]=="")?("（全部検証済）"):(m_list[i])) + "<\/td><\/tr>";
	}
	
	return liststr;
}

function mra_add_musiclevel_list(lv_list, m_list)
{
	var liststr="";
	for(var i=0; i<lv_list.length; i++)
	{
		liststr += "<tr><th>" + lv_list[i] + "<\/th> <td>" + m_list[i] + "<\/td><\/tr>";
	}
	
	return liststr;
}

function mra_level_lavel(lv_str)
{
	var str ="";
	str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font> ";
	str += lv_str;
	str += " <font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
	return str;
}

	
mra_not_evaluated += "<table border=1>";
mra_not_evaluated += "<tr><th colspan=2>" + mra_update_mlist + "時点での未検証譜面<\/th><\/tr>";
mra_not_evaluated += mra_add_musiclevel_unknown_list(["13", "12+", "12", "11+", "11", "10+", "10", "9+", "9"],
					     [lv13_, lv12p, lv12_, lv11p, lv11_, lv10p, lv10_, lv09p, lv09_]);
mra_not_evaluated += "<\/table>";


mra_evaluated += "<table border=1>";
mra_evaluated += "<tr><th colspan=2>" + mra_update_mlist + "時点での検証済譜面<\/th><\/tr>";
mra_evaluated += mra_level_lavel("Level 13");
mra_evaluated += "<tr><th>Lv.<br>13<\/th> <td>未検証譜面以外<\/td><\/tr>";
mra_evaluated += mra_level_lavel("Level 12+");
mra_evaluated += "<tr><th>" + lv12puls.join('<br>') + "<\/th> <td>未検証譜面以外<\/td><\/tr>";
mra_evaluated += mra_level_lavel("Level 12 上位");
mra_evaluated += "<tr><th>" + lv12equal.join('<br>') + "<\/th> <td>" + lv12e_rslt + "<\/td><\/tr>";
mra_evaluated += mra_level_lavel("Level 12 下位");
mra_evaluated += "<tr><th>" + lv12minus.join('<br>') + "<\/th> <td>" + lv12m_rslt + "<\/td><\/tr>";
mra_evaluated += mra_level_lavel("Level 11+");
mra_evaluated += mra_add_musiclevel_list(lv11plus, lv11p_rslt);
/*
mra_evaluated += mra_level_lavel("Level 11");
mra_evaluated += mra_add_musiclevel_list(lv11minus.map(String), lv11m_rslt);
mra_evaluated += mra_level_lavel("Level 10+");
mra_evaluated += mra_add_musiclevel_list(lv10plus.map(String), lv10p_rslt);
mra_evaluated += mra_level_lavel("Level 10");
mra_evaluated += mra_add_musiclevel_list(lv10minus.map(String), lv10m_rslt);
mra_evaluated += mra_level_lavel("Level 9+");
mra_evaluated += mra_add_musiclevel_list(lv9plus.map(String), lv9p_rslt);
mra_evaluated += mra_level_lavel("Level 9");
mra_evaluated += mra_add_musiclevel_list(lv9minus.map(String), lv9m_rslt);
mra_evaluated += mra_level_lavel("Level 8+");
mra_evaluated += mra_add_musiclevel_list(lv8plus.map(String), lv8p_rslt);
*/
mra_evaluated += "<\/table>"

mra_max_rating += "<table border=1>";
mra_max_rating += "<tr>";
mra_max_rating += "<th colspan=3 bgcolor=\"\#000000\"><font color=\"\#ffffff\">基本データ<\/font><\/th>";
mra_max_rating += "<\/tr>";

mra_max_rating += "<tr><th>現在の曲数<\/th><td align=center>" + mlist_length + "<\/td>";
mra_max_rating += "<td>" + mra_update_mlist + "現在の収録曲数<\/td><\/tr>";

mra_max_rating += print_result_rating("現在のRating", (s_rating.toFixed(2)) + "<br>(" + (ss_rating.toFixed(2)) + ")",
				"全S達成時<br>(全部99.5%超え) ", s_rating);

mra_max_rating += print_result_rating("BEST平均", best_ave.toFixed(2), "上位30曲の平均レート値", best_ave);
mra_max_rating += print_result_rating("BEST下限", best_limit.toFixed(2), "30位のレート値", best_limit);
mra_max_rating += print_result_sub("HIST下限", hist_limit.toFixed(2), mra_history + "位のレート値");
	
mra_max_rating += "<tr>";
mra_max_rating += "<th colspan=3 bgcolor=\"\#000000\"><font color=\"\#ffffff\">予想到達可能Rating<\/font><\/th>";
mra_max_rating += "<\/tr>";

mra_max_rating += print_result_rating("予想値", expect_max.toFixed(2), "下の3つの値の合計", expect_max);

mra_max_rating +=
	print_result_rating("BEST枠", (best_rating.toFixed(2)) + "<br>(" + (best_left.toFixed(2)) + ")",
				    "(上位30曲の合計)/44<br>()は+0.01する為の必要レート", best_ave);

mra_max_rating +=
	print_result_rating("RECENT枠", (recent_rating.toFixed(2)) + "<br>(" + (trv.toFixed(2)) + ")",
				    "レート値1位を10回達成<br>()は1位の単曲レート値", trv);
mra_max_rating +=
	print_result_sub("HISTORY枠", (hist_rating.toFixed(2)) + "<br>(" + (hist_left.toFixed(2)) + ")",
			 "(上位" + mra_history +"曲の合計)*(4/" + mra_history + ")/44<br>()は+0.01する為の必要レート");

mra_max_rating += "<\/table>";

})()
