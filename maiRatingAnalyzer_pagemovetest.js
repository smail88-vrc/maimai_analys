javascript:
(function()
{

var ex_list=[], ma_list=[], re_list=[], datalist=[], ratinglist=[], inner_lv=[], addr="";

function diff2tmp(diff)
{
	var difftable =
		[["7-", 7.0], ["7+", 7.7], ["8-", 8.0], ["8+", 8.7], ["9-", 9.0], ["9+", 9.7],["10-", 10.0], 
 			["10+", 10.7], ["11-", 11.0], ["11+", 11.7], ["12-", 12.0], ["12+", 12.7], ["13-", 13.0]];
	for(var i=0; i< difftable.length; i++)
	{
		if(0 == diff.localeCompare(difftable[i][0]))
		{
			return 1*difftable[i][1];
		}
	}
	return 1*diff;
}

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
			temp = rate_XtoY(diff10000*0.4, diff10000*0.5, 2000, achi_100-6000);
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

function get_levellist(inner_lv)
{
	$.ajax({type: 'GET',
		url: "https://sgimera.github.io/mai_RatingAnalyzer/maiRatingAnalyzer_lvlist.js",
		dataType: "script",
		async: false})
		.done(function()
			{
				var lvlist_len = inner_level.length;
				for(var i=0; i<lvlist_len; i++)
				{
					inner_lv.push([inner_level[i][0], inner_level[i][1], inner_level[i][2]]);
				}
		       });
	return;
}

function get_nextpage_address(j,diff)	//次の楽曲リストページを探す
{
	var nextaddr="";
	var e = $(j).find('a');	// hrefが含まれると思われるものlist
	var e_length=e.length;	// その個数
	for(var i=0; i<e_length; i++)	//楽曲リストページ用ループ
	{
		var url=e[i].getAttribute('href');	// <a>内のリンク先取得
		if(url.indexOf("music.html?d=" + diff) == 0)
		{
			return url;
		}
	}
	for(var i=0; i<e_length; i++)	//楽曲リストページ以外用ループ
	{
		var url=e[i].getAttribute('href');
		if(url.indexOf("music.html") == 0)
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
			
			nextaddr=get_nextpage_address($(data), diff+1);
		});

	return nextaddr;
}

function data2rating()
{
	var mlist_length=ma_list.length, re_length=re_list.length, re_count=0;

	for(var i=0; i<mlist_length; i++)
	{
		datalist.push([
			ma_list[i][0],
		    	ex_list[i][1],
			ma_list[i][1],
        		(re_count >= re_length)?"---":
			(re_list[re_count][0]==ma_list[i][0])?re_list[re_count++][1]:"---",
			inner_lv[i][0],
			inner_lv[i][1],
			inner_lv[i][2],
			0,
			0,
			0,
			0
			]);
		datalist[i][7]=	arch2rate_10000(datalist[i][1], inner_lv[i][0]);
		datalist[i][8]= arch2rate_10000(datalist[i][2], inner_lv[i][1]);
		if(inner_lv[i][2] != "")
		{
			datalist[i][9] = arch2rate_10000(datalist[i][3], inner_lv[i][2]);
		}
		datalist[i][10] = Math.max(datalist[i][7], datalist[i][8], datalist[i][9]);
		
//		console.log(datalist[i]);
	}
	datalist.sort(function(a,b){return b[10]-a[10]});

	return;
}
	
function print_result()
{
	var str="", next_count=0, dlist_length=datalist.length;
	for(var i=0; i<30; i++)
	{
		str+= i+1 + "/" + datalist[i][0] + " : " + datalist[i][10]/10000 + "\n";
		str+= "  EX(" + datalist[i][4] + ")/" + datalist[i][1] + " : " + datalist[i][7]/10000 + "\n"
		str+= "  MA(" + datalist[i][5] + ")/" + datalist[i][2] + " : " + datalist[i][8]/10000 + "\n"
		if(datalist[i][6] !="")
		{
			str+= "  Re(" + datalist[i][6] + ")/" + datalist[i][3] + " : " + datalist[i][9]/10000 + "\n"
		}
		if(i%6==5)
		{
			confirm(str);
			str="";
		}
	}
	
	for(var i=30; next_count<18 && i<dlist_length; i++)
	{
		if(datalist[i][10] == 0)	// 未プレー曲のみの場合、確認終了。
			break;
		
		var ex=diff2tmp(datalist[i][4]), ma=diff2tmp(datalist[i][5]);
		var re=(datalist[i][6]=="")?0:diff2tmp(datalist[i][6]);
		if(datalist[29][10] >= arch2rate_10000(100, String(Math.max(ex,ma,re))))
			continue;
		
		str+= i+1 + "/" + datalist[i][0] + " -> " + datalist[i][10]/10000 + "\n";
		str+= "  EX(" + datalist[i][4] + ")/" + datalist[i][1] + " -> " + datalist[i][7]/10000 + "\n"
		str+= "  MA(" + datalist[i][5] + ")/" + datalist[i][2] + " -> " + datalist[i][8]/10000 + "\n"
		if(datalist[i][6] !="")
		{
			str+= "  Re(" + datalist[i][6] + ")/" + datalist[i][3] + " -> " + datalist[i][9]/10000 + "\n"
		}
		if(next_count%6==5)
		{
			if(str!="")
			{
				confirm(str);
				str="";
			}
		}
		next_count++;
	}
	
	if(str != "")
		confirm(str);

}

function analyzing_rating()
{
	var best30=0, history434=0, tmp=0, str="";
	var best=0, recent=0, hist=0;
	for(var i=0; i<30; i++)
	{
		tmp = datalist[i][10]/100;
		tmp -= tmp % 1;
		best30+=tmp;
	}
	
	history434=best30;
	for(var i=30 ;i<434;i++)
	{
		tmp = datalist[i][10]/100;
		tmp -= tmp % 1;
		history434+=tmp;
	}
	
	history434 /= 434*11;	// multiply 4/(434*44)
	history434 = Math.floor(history434)/100

	best = Math.floor(best30/44)/100;
	recent = Math.floor(Math.floor(datalist[0][10]/100)*10/44)/100;
	
	var all = Math.round((best + recent + history434)*100)/100;
	
	str += "Average Rate value of BEST30 : " + Math.round(best30/30)/100 + "\n";
	str += "Rate value including BEST30 : " + Math.round(datalist[29][10]/100)/100 + "\n\n";
	str += "- Your reachable Rating expected your result -\n";
	str += "BEST    : " + best + "\n";
	str += "RECENT  : " + recent + "\n";
	str += "HISTORY : " + history434 + "\n";
	str += "Reachable Rating : " + all + "\n";
	str += "\n\n   Supported by sgimera3.hatenablog.com";
	
	confirm(str);
}
var tmpstr = "--maimai Rating Analyzer (trial)--\n\n";
tmpstr += "468songs(2017.10.3) version\n";
tmpstr += "Last Update 2017.10.3\n\n";
tmpstr += "Programmed by @sgimera";
if(confirm(tmpstr))
{
	get_levellist();
	addr=get_nextpage_address($(document), 4);
	addr=get_music_mdata2(ex_list, addr, 4);
	addr=get_music_mdata2(ma_list, addr, 5);
	addr=get_music_mdata2(re_list, addr, 6);
	data2rating();
	print_result();
	analyzing_rating();
}

})()
