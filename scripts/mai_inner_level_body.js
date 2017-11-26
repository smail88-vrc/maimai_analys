javascript:
(function()
{

var ex_list=[], ma_list=[], re_list=[], datalist=[], addr="", your_id="", your_rating="";
var sss_rating=0, ss_rating=0, s_rating=0;


var confirm_str = "", tweet_str = "";
var best_ave=0, best_limit=0, hist_limit=0;
var expect_max=0, best_rating=0, recent_rating=0, hist_rating=0, best_left=0, hist_left=0;
function calc_rating(rate_array, make_text)
{
	var best30=0, history434=0, top_rate=0, tmp=0, str="";
	var 
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
	hist_left = (434*11 - Math.ceil(history434%(434*11)))/100;
	
	expect_max = Math.round((best_rating + recent_rating + hist_rating)*100)/100;
	
	return expect_max;
}
	
function print_result_sub(title, value, explain)
{
	var tmp = "";
	tmp += "<tr>";
	tmp += "<th>" + title + "<\/th>";
	tmp += "<td align=center>" + value + "<\/td>"
	tmp += "<td>" + explain + "<\/td>";
	tmp += "<\/tr>";
	
	return tmp;
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
	rating_table.push(Math.max.apply(null, maimai_inner_lv[i].levels.map(mra_diff2tmp)));
	
	
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
			if(mra_diff2tmp(maimai_inner_lv[i].levels[1]) < 12.7)
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

function mra_add_musiclevel_unknown_list(lv_list, m_list)
{
	var liststr="";
	for(var i=0; i<lv_list.length; i++)
	{
		liststr += "<tr><th>" + lv_list[i] + "<\/th> <td>" + m_list[i] + "<\/td><\/tr>";
	}
	
	return liststr;
}

function mra_add_musiclevel_list(lv_list, m_list)
{
	var liststr="";
	for(var i=0; i<lv_list.length; i++)
	{
		liststr += "<tr><th>" + mra_diff2waku(lv_list[i]) + "<\/th> <td>" + m_list[i] + "<\/td><\/tr>";
	}
	
	return liststr;
}
		

rating_table = rating_table.sort(function(a,b){return b-a}).map(String);
s_rating=calc_rating(rating_table.map(function(x){return mra_arch2rate_10000(97,x);}), false);
ss_rating=calc_rating(rating_table.map(function(x){return mra_arch2rate_10000(99.5,x);}), false);
sss_rating=calc_rating(rating_table.map(function(x){return mra_arch2rate_10000(100,x);}), true);
	
var test_str="";
	
test_str += "<h2>未検証譜面<\/h2>";
test_str += "<p>現時点で”枠”の調査が完了していない譜面です。<\/p>";
test_str += "<p>調査対象は";
test_str += "<ol><li>全Master譜面、全Re:Master譜面<li>最上位譜面がLv.12+以上のExpert（作者のMaster未S譜面優先）<li>ExpertのLv.11以上<\/ol>";
test_str += "となっております。<\/p>";
test_str += "<p>更新遅れなどで新規楽曲や譜面が含まれていないことがありますが、そこはご了承ください。<\/p>";
	
test_str += "<table border=1>";
test_str += "<tr><th colspan=2>未検証譜面<\/th><\/tr>";
test_str += mra_add_musiclevel_unknown_list(["13", "12+", "12", "11+", "11", "10+", "10", "9+", "9"],
					     [lv13_, lv12p, lv12_, lv11p, lv11_, lv10p, lv10_, lv09p, lv09_]);
test_str += "<\/table>";

test_str += "<h2>検証済みの”枠”の表<\/h2>";
test_str += "<p>こちらは、検証が終了している譜面となります。楽曲名は（推測可能な範囲で）略称を使用してます。ご了承ください。<\/p>";
test_str += "<p>未検証譜面の検証条件を外れる譜面についても、データを算出した場合は記載してます。<\/p>";
test_str += "<p>内部Lv.は数えればわかると思いますので記載はしてません。レート値は別ページの計算式を見ながら自力で算出ください。<\/p>";
test_str += "<p>このページに直接リンクをはるのは構いませんが、";
test_str += "<b><font color=\"#FF0000\">画面キャプチャなどをそのままSNS等にアップするのはやめてください。<\/font><\/b><\/p>";

test_str += "<table border=1>";
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 13 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["13.6", "13.5", "13.4", "13.3", "13.2", "13.1", "13.0"],
			[lv136, lv135, lv134, lv133, lv132, lv131, lv130]);
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 12+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["12.9", "12.8", "12.7"], [lv129, lv128, lv127]);
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 12 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["12.6", "12.5", "12.4", "12.3", "12.2", "12.1", "12.0"],
			[lv126, lv125, lv124, lv123, lv122, lv121, lv120]);
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 11+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["11.9", "11.8", "11.7"], [lv119, lv118, lv117]);
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 11 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["11.6", "11.5", "11.4", "11.3", "11.2", "11.1", "11.0"],
			[lv116, lv115, lv114, lv113, lv112, lv111, lv110]);
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 10+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["10.9", "10.8", "10.7"], [lv109, lv108, lv107]);
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 10 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["10.6", "10.5", "10.4", "10.3", "10.2", "10.1", "10.0"],
			[lv106, lv105, lv104, lv103, lv102, lv101, lv100]);
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 9+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["9.9", "9.8", "9.7"], [lv099, lv098, lv097]);
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 9 "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["9.6", "9.5", "9.4", "9.3", "9.2", "9.1", "9.0"],
			[lv096, lv095, lv094, lv093, lv092, lv091, lv090]);
test_str += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font>";
test_str += " Level 8+ "
test_str += "<font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
test_str += mra_add_musiclevel_list(["8.9", "8.8", "8.7"], [lv089, lv088, lv087]);

test_str += "<\/table>"
	
test_str += "<h2>予測最大Rating<\/h2>";
test_str += "<p>算出されている内部Lv.から、現在到達可能な最大Ratingを予想します。<\/p>";
test_str += "<p>条件は以下となります。<\/p>";
test_str += "<ul>";
test_str += "<li>内部Lv.の上位434曲をSSS。譜面ではなく曲。Lv.10以上をほぼ全部とほぼ同義。";
test_str += "<li>内部Lv.最大の曲（現在はOur Wrenally）を10回SSS。";
test_str += "<\/ul>";

test_str += "<table border=1>";
test_str += "<tr>";
test_str += "<th colspan=3 bgcolor=\"\#000000\"><font color=\"\#ffffff\">基本データ<\/font><\/th>";
test_str += "<\/tr>";

test_str += "<tr><th>現在の曲数<\/th><td>" + maimai_inner_lv.length + "<\/td><\/tr>"
test_str += "<th>現在のRating<\/th>";
test_str += "<td>" + (s_rating.toFixed(2)) + "<br>(" + (ss_rating.toFixed(2)) + ")<\/td>"
test_str += "<td>全S達成時<br>(全部99.5%超え) <\/td>";
test_str += "<\/tr>";

test_str += print_result_sub("BEST平均", (best_ave.toFixed(2)), "上位30曲の平均レート値");
test_str += print_result_sub("BEST下限", (best_limit.toFixed(2)), "30位のレート値");
test_str += print_result_sub("HIST下限", (hist_limit.toFixed(2)), "434位のレート値");

test_str += "<tr>";
test_str += "<th colspan=3 bgcolor=\"\#000000\"><font color=\"\#ffffff\">予想到達可能Rating<\/font><\/th>";
test_str += "<\/tr>";

test_str += print_result_sub("予想値", (expect_max.toFixed(2)), "BEST枠、RECENT枠、HISTORY枠の合計");
test_str +=
	print_result_sub("BEST枠", (best_rating.toFixed(2)) + "<br>(" + (best_left.toFixed(2)) + ")", "(上位30曲の合計)/44<br>()は+0.01する為の必要レート");
test_str += print_result_sub("RECENT枠", (recent_rating.toFixed(2)), "レート値1位を10回達成");
test_str +=
	print_result_sub("HISTORY枠", (hist_rating.toFixed(2)) + "<br>(" + (hist_left.toFixed(2)) + ")", "(上位434曲の合計)/(434*44/4)<br>()は+0.01する為の必要レート");

test_str += "<\/table>";

document.write(test_str);

})()
