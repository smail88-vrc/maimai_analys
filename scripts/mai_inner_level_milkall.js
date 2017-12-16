javascript:

var mra_not_evaluated="", mra_evaluated="", mra_max_rating="";

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
			case "13-":	lv13_ += tmpstr; continue;
			case "12+":	lv12p += tmpstr; continue;
			case "12-":	lv12_ += tmpstr; continue;
			case "11+":	lv11p += tmpstr; continue;
			case "11-":	lv11_ += tmpstr; continue;
		}
		
		console.log(maimai_inner_lv[i].name + " : " + String(mra_diff2tmp(maimai_inner_lv[i].levels[lv]));

		switch(String(mra_diff2tmp(maimai_inner_lv[i].levels[lv])))
		{
			case "13.6":	lv136 += tmpstr; continue;
			case "13.5":	lv135 += tmpstr; continue;
			case "13.4":	lv134 += tmpstr; continue;
			case "13.3":	lv133 += tmpstr; continue;
			case "13.2":	lv132 += tmpstr; continue;
			case "13.1":	lv131 += tmpstr; continue;
			case "13.0":	lv130 += tmpstr; continue;
			case "12.9":	lv129 += tmpstr; continue;
			case "12.8":	lv128 += tmpstr; continue;
			case "12.7":	lv127 += tmpstr; continue;
			case "12.6":	lv126 += tmpstr; continue;
			case "12.5":	lv125 += tmpstr; continue;
			case "12.4":	lv124 += tmpstr; continue;
			case "12.3":	lv123 += tmpstr; continue;
			case "12.2":	lv122 += tmpstr; continue;
			case "12.1":	lv121 += tmpstr; continue;
			case "12.0":	lv120 += tmpstr; continue;
			case "11.9":	lv119 += tmpstr; continue;
			case "11.8":	lv118 += tmpstr; continue;
			case "11.7":	lv117 += tmpstr; continue;
			case "11.6":	lv116 += tmpstr; continue;
			case "11.5":	lv115 += tmpstr; continue;
			case "11.4":	lv114 += tmpstr; continue;
			case "11.3":	lv113 += tmpstr; continue;
			case "11.2":	lv112 += tmpstr; continue;
			case "11.1":	lv111 += tmpstr; continue;
			case "11.0":	lv110 += tmpstr; continue;
			case "10.9":	lv109 += tmpstr; continue;
			case "10.8":	lv108 += tmpstr; continue;
			case "10.7":	lv107 += tmpstr; continue;
			case "10.6":	lv106 += tmpstr; continue;
			case "10.5":	lv105 += tmpstr; continue;
			case "10.4":	lv104 += tmpstr; continue;
			case "10.3":	lv103 += tmpstr; continue;
			case "10.2":	lv102 += tmpstr; continue;
			case "10.1":	lv101 += tmpstr; continue;
			case "10.0":	lv100 += tmpstr; continue;
			case "9.9":	lv099 += tmpstr; continue;
			case "9.8":	lv098 += tmpstr; continue;
			case "9.7":	lv097 += tmpstr; continue;
			case "9.6":	lv096 += tmpstr; continue;
			case "9.5":	lv095 += tmpstr; continue;
			case "9.4":	lv094 += tmpstr; continue;
			case "9.3":	lv093 += tmpstr; continue;
			case "9.2":	lv092 += tmpstr; continue;
			case "9.1":	lv091 += tmpstr; continue;
			case "9.0":	lv090 += tmpstr; continue;
			case "8.9":	lv089 += tmpstr; continue;
			case "8.8":	lv088 += tmpstr; continue;
			case "8.7":	lv087 += tmpstr; continue;
		}
		
		if(lv==0)
		{
			if(mra_diff2tmp(maimai_inner_lv[i].levels[1]) < 12.7)
				continue;
		}

		switch(maimai_inner_lv[i].levels[lv])
		{
			case "10+":	lv10p += tmpstr; continue;
			case "10-":	lv10_ += tmpstr; continue;
			case "9+":	lv09p += tmpstr; continue;
			case "9-":	lv09_ += tmpstr; continue;
			case "8+":	lv08p += tmpstr; continue;
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

function mra_level_lavel(lv_str)
{
  var tmp="";
  tmp += "<tr><th colspan=2><font color=\"#ff5252\">転載禁止<\/font> ";
  tmp += lv_str;
  tmp += " <font color=\"#ff5252\">転載禁止<\/font><\/th><\/tr>";
  return tmp;
}

mra_evaluated += "";
mra_evaluated += "<table border=1>";
mra_evaluated += mra_level_lavel("Level 13");
mra_evaluated += mra_add_musiclevel_list(["13.6", "13.5", "13.4", "13.3", "13.2", "13.1", "13.0"],
			[lv136, lv135, lv134, lv133, lv132, lv131, lv130]);
mra_evaluated += mra_level_lavel("Level 12+");
mra_evaluated += mra_add_musiclevel_list(["12.9", "12.8", "12.7"], [lv129, lv128, lv127]);
mra_evaluated += mra_level_lavel("Level 12");
mra_evaluated += mra_add_musiclevel_list(["12.6", "12.5", "12.4", "12.3", "12.2", "12.1", "12.0"],
			[lv126, lv125, lv124, lv123, lv122, lv121, lv120]);
mra_evaluated += mra_level_lavel("Level 11+");
mra_evaluated += mra_add_musiclevel_list(["11.9", "11.8", "11.7"], [lv119, lv118, lv117]);
mra_evaluated += mra_level_lavel("Level 11");
mra_evaluated += mra_add_musiclevel_list(["11.6", "11.5", "11.4", "11.3", "11.2", "11.1", "11.0"],
			[lv116, lv115, lv114, lv113, lv112, lv111, lv110]);
mra_evaluated += mra_level_lavel("Level 10+");
mra_evaluated += mra_add_musiclevel_list(["10.9", "10.8", "10.7"], [lv109, lv108, lv107]);
mra_evaluated += mra_level_lavel("Level 10");
mra_evaluated += mra_add_musiclevel_list(["10.6", "10.5", "10.4", "10.3", "10.2", "10.1", "10.0"],
			[lv106, lv105, lv104, lv103, lv102, lv101, lv100]);
mra_evaluated += mra_level_lavel("Level 9+");
mra_evaluated += mra_add_musiclevel_list(["9.9", "9.8", "9.7"], [lv099, lv098, lv097]);
mra_evaluated += mra_level_lavel("Level 9");
mra_evaluated += mra_add_musiclevel_list(["9.6", "9.5", "9.4", "9.3", "9.2", "9.1", "9.0"],
			[lv096, lv095, lv094, lv093, lv092, lv091, lv090]);
mra_evaluated += mra_level_lavel("Level 8+");
mra_evaluated += mra_add_musiclevel_list(["8.9", "8.8", "8.7"], [lv089, lv088, lv087]);
mra_evaluated += "<\/table>"
	
document.open();
document.write(mra_evaluated);
document.close();

})()
