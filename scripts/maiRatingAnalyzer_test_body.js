javascript:
(function()
{

var ex_list=[], ma_list=[], re_list=[], datalist=[], addr="", your_id="", your_rating="";
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

function get_nextpage_address(j,html,diff)	//次の楽曲リストページを探す
{
	var nextaddr="";
	var e = $(j).find('a');	// hrefが含まれると思われるものlist
	var e_length=e.length;	// その個数
	for(var i=0; i<e_length; i++)	//楽曲リストページ用ループ
	{
		var url=e[i].getAttribute('href');	// <a>内のリンク先取得
		if(url.indexOf(html + "?d=" + diff) == 0)
		{
			return url;
		}
	}
	for(var i=0; i<e_length; i++)	//楽曲リストページ以外用ループ
	{
		var url=e[i].getAttribute('href');
		if(url.indexOf(html) == 0)
		{
			return url + "&d=" + diff;
		}
	}

	return nextaddr;
}

function get_music_mdata2(achive_list, addr, diff)	//データ取得と次のアドレス
{
	var nextaddr="";

	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			var m=$(data).find("#accordion");
			var m_length=m.find("h3").length;
			for(var i=0; i<m_length; i++)
			{
				achive_list.push(
					[m.find("h3")[i].innerText.trim(), 
					 m.find("tbody")[i].children[1].children[2].innerText.trim().replace(/[(達成率) %]/g, "")]
					);
			}
			if(diff != 6)
				nextaddr=get_nextpage_address($(data), "music.html", diff+1);
			else
				nextaddr=get_nextpage_address($(data), "home.html", 0);				
		});

	return nextaddr;
}

function data2rating(golliramode)
{
	var mlist_length=ma_list.length, re_length=re_list.length, re_count=0, lvlist_count=0;

	for(var i=0; i<mlist_length; i++)
	{
//		console.log(i + "\t" + ma_list[i][0] + "\n");
		//lv表と取得データの名前が一致なら処理を進める
		if(ma_list[i][0].indexOf(maimai_inner_lv[lvlist_count].name) == 0)
		{
			datalist.push({
				name:ma_list[i][0],
				nick:maimai_inner_lv[lvlist_count].nick,
				achive:[(golliramode == 0)?ex_list[i][1]:0,
				ma_list[i][1],
				(re_count >= re_length)?"---":
					(re_list[re_count][0]==ma_list[i][0])?re_list[re_count++][1]:"---"],
				lv:maimai_inner_lv[lvlist_count].levels,
				rate_values:[0,	0, 0],
				music_rate : 0
			});
			datalist[i].rate_values[0] =
				(golliramode == 0)?arch2rate_10000(datalist[i].achive[0], datalist[i].lv[0]):0;
			datalist[i].rate_values[1] = arch2rate_10000(datalist[i].achive[1], datalist[i].lv[1]);
			datalist[i].rate_values[2] = arch2rate_10000(datalist[i].achive[2], datalist[i].lv[2]);
			datalist[i].music_rate = Math.max.apply(null, datalist[i].rate_values);
			
			lvlist_count++;
		}
		else	// 違う場合は空データを入れて終了。
		{
			datalist.push(
				{name:ma_list[i][0],
				 nick:"",
				achive:[(golliramode == 0)?ex_list[i][1]:0,
						ma_list[i][1],
						(re_count >= re_length)?"---":
							(re_list[re_count][0]==ma_list[i][0])?re_list[re_count++][1]:"---"],
				lv:["","",""],
				rate_values:[0,	0, 0],
				music_rate : 0
			});
		}
//		console.log(datalist[i]);
	}
	datalist.sort(function(a,b){return b.music_rate-a.music_rate});
	return;
}
	
function print_result2(golliramode)
{
	var result_str="";

	result_str += "<html>";
	result_str += "<head>";
	result_str += "<title>" + your_id + "の舞レート解析結果 | CYCLES FUNの寝言<\/title>";
	result_str += "<style type='text/css'>";
	result_str += "\ttable { border-collapse: collapse; font-size:0.5em; }";
	result_str += "<\/style>";
    	result_str += "<link rel='stylesheet' media='all' type='text/css' href='https://sgimera.github.io/mai_RatingAnalyzer/css/mai_rating.css?'+Date.now() \/>";
	result_str += "<\/head>";
	result_str += "<table border=1 align=\"center\">";
	
	
	for(var i=0; i<datalist.length; i++)
	{
		var rowspan_num = 3-golliramode - ((datalist[i].lv[2] != "")?0:1);
		var tmp_rate=0;
		
		result_str += "<tr>";
		result_str += "<th colspan=5>" + datalist[i].name + "<\/th>"
		result_str += "<\/tr>"
	
		result_str += "<tr>";
		result_str += "<td align=\"center\" rowspan=" + rowspan_num + ">" + (i+1) + "<\/td>";
		result_str += "<th rowspan=" + rowspan_num + " ";
		tmp_rate = Math.round(Math.floor(datalist[i].music_rate/100))/100;
		(tmp_rate>=15)?(result_str += "class=mai_rainbow>"):
		(tmp_rate>=14.5)?(result_str += "class=mai_gold>"):
		(tmp_rate>=14)?(result_str += "class=mai_silver>"):
		(tmp_rate>=13)?(result_str += "class=mai_copper>"):
		(tmp_rate>=12)?(result_str += "class=mai_violet>"):
		(tmp_rate>=10)?(result_str += "class=mai_red>"):
		(tmp_rate>=7)?(result_str += "class=mai_yellow>"):
		(tmp_rate>=4)?(result_str += "class=mai_green>"):
		(tmp_rate>=1)?(result_str += "class=mai_blue>"):(result_str += ">");
		result_str +=  tmp_rate + "<\/th>"
		
		if(datalist[i].lv[2] != "")
		{
			result_str += "<th class=mai_remaster>";
			result_str += Math.round(Math.floor(datalist[i].rate_values[2]/100))/100;
			result_str += "<\/th>";
	
			result_str += "<th class=mai_remaster>" + datalist[i].lv[2] + "<\/th>";
			result_str += "<th class=mai_remaster>" + datalist[i].achive[2] + "%<\/th>";
			result_str += "<\/tr>";
			
			result_str += "<tr>";
		}
		
		result_str += "<th class=mai_master>";
		result_str += Math.round(Math.floor(datalist[i].rate_values[1]/100))/100;
		result_str += "<\/th>";

		result_str += "<th class=mai_master>" + datalist[i].lv[1] + "<\/th>";
		result_str += "<th class=mai_master>" + datalist[i].achive[1] + "%<\/th>";
		result_str += "<\/tr>";

		if(golliramode == 0)
		{
			result_str += "<tr>";
			result_str += "<th class=mai_expert>";
			result_str += Math.round(Math.floor(datalist[i].rate_values[0]/100))/100;
			result_str += "<\/th>";

			result_str += "<th class=mai_expert>" + datalist[i].lv[0] + "<\/th>";
			result_str += "<th class=mai_expert>" + datalist[i].achive[0] + "%<\/th>";
			result_str += "<\/tr>";
		}
	}
	
	result_str += "<\/table>";
	result_str += "<\/html>";
	document.open();
	document.write(result_str);
	document.close();
}

function print_result_short()
{
	var str="", next_count=0, dlist_length=datalist.length, tmp_rate=0;
	for(var i=0; i<30; i++)
	{
		if(datalist[i].music_rate == 0)	// 未プレー曲のみの場合、確認終了。
			break;

		if(datalist[i].nick != "")
		{
			str += (i+1) + "/" + datalist[i].nick;
		}
		else if(datalist[i].name.length < 15)
		{
			str += (i+1) + "/" + datalist[i].name;
		}
		else
		{
			str += (i+1) + "/" + datalist[i].name.slice(0, 14) + "～";
		}
		
		tmp_rate = datalist[i].music_rate;
		(datalist[i].rate_values[0] == tmp_rate)?(str+=" 赤 : "):
			(datalist[i].rate_values[2] == tmp_rate)?(str+=" 白 : "):(str+= " : ");
		str += Math.round(Math.floor(tmp_rate/100))/100 + "\n";

		if(i%10==9)
		{
			confirm(str);
			str="";
		}
	}
	
	if(str != "")
		confirm(str);

	str="";
	for(var i=30; next_count<10 && i<dlist_length; i++)
	{
		if(datalist[i].music_rate == 0)	// 未プレー曲のみの場合、確認終了。
			break;
		var max_lv = Math.max(diff2tmp(datalist[i].lv[1]), diff2tmp(datalist[i].lv[2]));
		if(datalist[29].music_rate >= arch2rate_10000(100, String(max_lv)))
			continue;
		
		if(datalist[i].nick != "")
		{
			str += (i+1) + "/" + datalist[i].nick;
		}
		else if(datalist[i].name.length < 15)
		{
			str += (i+1) + "/" + datalist[i].name;
		}
		else
		{
			str += (i+1) + "/" + datalist[i].name.slice(0, 14) + "～";
		}
		
		tmp_rate = datalist[i].music_rate;
		(datalist[i].rate_values[0] == tmp_rate)?(str+=" 赤 : "):
			(datalist[i].rate_values[2] == tmp_rate)?(str+=" 白 : "):(str+= " : ");
		str += Math.round(Math.floor(tmp_rate/100))/100 + "\n";

		if(next_count%10==9)
		{
			confirm(str);
			str="";
		}
		next_count++;
	}
	
	if(str != "")
		confirm(str);

}

function get_your_id(addr)
{
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			var m=$(data).find('.status_data')[0];
			your_id = m.children[1].innerText;
			your_rating = m.children[7].innerText.trim().replace(/MAX /g, "");
		});
	 return your_id;
}
	
function tweet_best(id)
{
	var str = ""
	str = your_id + "%0D%0A";
	for(var i=0; i<7; i++)
	{
		tmp_rate = datalist[i].music_rate;
		str += Math.round(Math.floor(tmp_rate/100))/100 + ": "
		if(datalist[i].nick != "")
		{
			str += datalist[i].nick;
		}
		else if(datalist[i].name.length < 15)
		{
			str += datalist[i].name;
		}
		else
		{
			str += datalist[i].name.slice(0, 14) + "%ef%bd%9e";
		}
		(datalist[i].rate_values[0] == tmp_rate)?(str+=" 赤"):
			(datalist[i].rate_values[2] == tmp_rate)?(str+=" 白"):(str+= "");
		str +="%0D%0A";

	}
	if(window.open
	   ("https://twitter.com/intent/tweet?hashtags=" + hashtag + "&text=" + str, '_blank') == null)
	{
		confirm("ポップアップブロックを無効にしてください。");
	}

}
	
function analyzing_rating()
{
	var best30=0, history434=0, best_ave=0, best_limit=0, hist_limit=0, tmp=0, str="";
	var best_rating=0, top_rate=0, recent_rating=0, hist_rating=0, best_left=0, hist_left=0;
	for(var i=0; i<30; i++)
	{
		tmp = Math.round(Math.floor(datalist[i].music_rate/100));
		best30+=tmp;
	}
	
	history434=best30;
	for(var i=30 ;i<434;i++)
	{
		tmp = Math.round(Math.floor(datalist[i].music_rate/100));
		history434+=tmp;
	}

	best_ave = Math.round(Math.floor(best30/30))/100;
	top_rate = Math.round(Math.floor(datalist[0].music_rate/100))/100;
	best_limit = Math.round(Math.floor(datalist[29].music_rate/100))/100;
	hist_limit = Math.round(Math.floor(datalist[433].music_rate/100))/100;
	if(hist_limit<=0)
	{
		var count=0;
		for(count=0; datalist[count].music_rate > 0; count++);
		hist_limit= "0 (あと" + (434-count) + "曲)";
	}
	
	best_rating = Math.floor(best30/44)/100;	//best30はすでにRating*100
	recent_rating = Math.floor(Math.floor(datalist[0].music_rate/100)*10/44)/100;
	hist_rating = Math.round(Math.floor(history434/(434*11)))/100;	// multiply 4/(434*44)
	
	best_left = (44 - Math.ceil(best30%44))/100;
	hist_left = (434*11 - Math.ceil(history434%(434*11)))/100;
	
	var all = Math.round((best_rating + recent_rating + hist_rating)*100)/100;
	
	str += your_id + "\n";
	str += "現在のRating : " + your_rating + "\n\n";
	str += " BEST30の平均 : " + best_ave + " (=" + best30/100 + "/30)\n";
	str += " BEST枠下限 : " + best_limit + "\n";
	str += " HISTORY枠下限 : " + hist_limit + "\n\n";
	str += "予想到達可能Rating : " + all + "\n";
	str += " BEST    : " + best_rating + "\n";
	str += "  (BEST30枠+" + best_left + "でRating+0.01)\n";
	str += " RECENT  : " + recent_rating + "\n";
	str += "  (単曲レートTOP" + top_rate + "を10回出す）\n";
	str += " HISTORY : " + hist_rating + "\n";
	str += "  (HISTORY434枠+" + hist_left + "でRating+0.01)\n";
	str += "\n\n   Supported by sgimera3.hatenablog.com\n\n";
	
	str += "結果をツイートしますか？"
	
	if(confirm(str))
	{
		// tweet用文字列
		str = your_id + " :" + your_rating + "%0D%0A";
		str += "BEST%2f平均%3a" + best_ave + " 下限:" + best_limit + "%0D%0A";
		str += "HIST下限%3a" + hist_limit + "%0D%0A";
		str += "予想到達Rating%3a" + all + "%0D%0A";
		str += "B%3a" + best_rating + " %2B R%3a" + recent_rating + " %2B H%3a" + hist_rating + "%0D%0A";
//		str += "B:" + best_rating + " (" + best_left + ")%0D%0A";
//		str += "R:" + recent_rating + " (" + Math.round(Math.floor(datalist[0].music_rate/100))/100 + ")%0D%0A";
//		str += "H:" + hist_rating + " (" + hist_left + ")%0D%0A";
		if(window.open
		   ("https://twitter.com/intent/tweet?hashtags=" + hashtag + "&text=" + str, '_blank') == null)
		{
			confirm("ポップアップブロックを無効にしてください。");
		}
	}
	
}

var tmpstr = "--舞レート解析 (trial)--\n\n";
tmpstr += maimai_inner_lv.length + "songs(2017.11.9) version\n";
tmpstr += "Last Update : 2017.11.11\n\n";
tmpstr += "Programmed by @sgimera";
if(!confirm(tmpstr))
	return;
	
var gollira = 0;
	
if(confirm('EXPERTのデータを取得しますか？'))
{
	addr=get_nextpage_address($(document), "music.html", 4);	// EXPERTリストのアドレス取得 
	addr=get_music_mdata2(ex_list, addr, 4);	// EXPERTデータ取得&MASTERリストのアドレス取得
}
else
{
	gollira = 1;
	addr=get_nextpage_address($(document), "music.html", 5);	// EXPERTリストのアドレス取得 
}
	addr=get_music_mdata2(ma_list, addr, 5);	// MASTERのデータ取得&Re:MASTERリストのアドレス取得
	addr=get_music_mdata2(re_list, addr, 6);	// Re:MASTERのデータ取得&HOMEのアドレス取得
	tmpstr = get_your_id(addr);
	data2rating(gollira);	// データ集計
		
	if(confirm("BEST枠楽曲を出力しますか？\n（キャンセル押すと、纏め画面へ）"))
	{
		print_result_short();		
		if(confirm("TOP7をtweetしますか？"))
		{
			tweet_best();
		}
	}
	
	analyzing_rating();	// 纏め出力 + tweet用文言生成
	if(confirm("全楽曲データを出力しますか？\n（試作品）"))
	{
		print_result2(gollira);
	}
	else
	{
		window.location.href = addr;	//ホームに移動
	}

})(); void(0);
