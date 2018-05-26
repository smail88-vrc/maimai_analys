javascript:
(function()
{
var chuni_dom='https://chunithm-net.com/mobile/';
var last_update_data="2018.05.24";
var genre_number=[0, 2, 3, 6, 7, 8, 5];
var genre_name=["POPS & ANIME", "niconico", "東方Project", "VARIETY", "イロドリミドリ", "言ノ葉Project", "ORIGINAL"]
var name_init=["あ行", "か行", "さ行", "た行", "な行", "は行", "ま行", "や行", "ら行", "わ行", "A～G", "H～N", "O～U", "V～Z", "数字"];
var lv_name=['1','2','3','4','5','6','7','7+','8','8+','9','9+','10','10+','11','11+','12','12+','13','13+','14','14+'];

var your_id="", your_rating="", your_max_rating="";
var your_best_rating, your_best_ave, your_max_recent, your_reachable;
var ma_list=[], ex_list=[], adv_list=[], ba_list=[], mname_list=[], rate_array=[];
var w_ma_op=new Array(name_init.length).fill(0);
var w_ex_op=new Array(name_init.length).fill(0);
var w_adv_op=new Array(name_init.length).fill(0);
var w_ba_op=new Array(name_init.length).fill(0);
var g_ma_op=new Array(genre_number.length).fill(0);
var g_ex_op=new Array(genre_number.length).fill(0);
var g_adv_op=new Array(genre_number.length).fill(0);
var g_ba_op=new Array(genre_number.length).fill(0);
var not_eval_ma=[], not_eval_ex=[], not_eval_adv=[], not_eval_ba=[];
var l_op=new Array(lv_name.length).fill(0);

function list2data(x)
{
  var lamplist=[
	'common/images/icon_clear.png',
	'common/images/icon_fullcombo.png',
	'common/images/icon_alljustice.png',
	'common/images/icon_fullchain.png',
	'common/images/icon_fullchain2.png'
  ]
  var lamp_rslt=['Clr', 'FC', 'AJ', 'FCh', 'FCh-'];
  var name, score, clr="", fcaj="", fch="", tmp;
  name=$(x).find('.music_title')[0].innerText.trim();
  tmp=$(x).find('.text_b');
  score=(tmp.length!=0)?(Number(tmp[0].innerText.replace(/,/g, ""))):0;
  var lamp=Array.prototype.slice.call($(x).find('img')).map(function(x){return x.getAttribute('src')})
  
  for(var i=0; i<lamp.length; i++)
  {
  	var idx=lamplist.indexOf(lamp[i])
	switch(idx)
	{
		case -1: continue;
		default: break;
	}
	switch(lamp_rslt[idx])
	{
		case 'Clr':
			clr=lamp_rslt[idx]; break;
		case 'FC':
		case 'AJ':
			fcaj=lamp_rslt[idx]; break;
		case 'FCh':
		case 'FCh-':
			fch=lamp_rslt[idx]; break;
		default: break;
	}
  }
  return {score:score, lamp0:clr, lamp1:fcaj, lamp2:fch};
}

function get_your_id(addr)
{
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			your_id=$(data).find('.player_name')[0].innerText.replace(/ /g, "").replace(/Lv.[0-9]*/, "");
			var rating_str=$(data).find('.player_rating')[0].innerText.replace(/ /g, "");
			your_rating=rating_str.replace(/RATING:|\/.*/g, "");
			your_max_rating=rating_str.replace(/.*MAX|\)/g, "");
		}
	);
	return;
}

function get_scoredata(addr, diff, array)
{
	$.ajax({type:'POST', url:addr, data:'genre=99&level=' + diff + '&music_genre=music_genre', async: false})
		.done(function(data)
		{
			//成功時の処理本体
			Array.prototype.slice.call($(data).find('.w388')).map(list2data).map(function(x){array.push(x)});
		}
	);
	return;
}

function get_musicname(addr, diff, array)
{
	$.ajax({type:'POST', url:addr, data:'genre=99&music_genre=level_' + diff, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			Array.prototype.slice.call($(data).find('.music_title'))
				.map(function(x){return x.innerText.trim().replace(/\n/, "");}).map(function(x){array.push(x)});
		}
	);
	return;
}


function lv2eval(lv)
{
	switch(lv.slice(-1))
	{
		case '+':
		case '-':
			return 1;
		default:
			return 0;
	}
}
	
	
function soft_condition_sub_level(l)
{
	return (l.slice(-1)=='+')?Number(l.slice(0,-1) + '.7'):
		(l.slice(-1)=='-')?Number(l.slice(0,-1) + '.0'):
		Number(l);
}
	
function sort_condition(a,b)
{
	if(b.rate != a.rate)
	{
		return b.rate - a.rate;
	}
	var a_lv=soft_condition_sub_level(a.lv);
	var b_lv=soft_condition_sub_level(b.lv);
	if(b_lv != a_lv)
	{
		return b_lv - a_lv;
	}
	return b.score - a.score;
}


function lv2idx(lv)
{
	var i_part=0, d_part=0, d_part_c=lv.slice(-1);

	switch(d_part_c)
	{
		case '+':
			i_part=Number(lv.slice(0,-1)); d_part=1; break;
		case '-':
			i_part=Number(lv.slice(0,-1)); d_part=0; break;
		default:
			i_part=Number(lv.slice(0,2)); d_part=(Number(d_part_c)>6)?1:0; break;
	}
	if(Number(i_part < 7))
		return i_part-1;
	return 6 + (i_part-7)*2 + d_part;		
}
	
function overpower_analyze()
{
	var w_idx, g_idx, ma_op, ex_op, adv_op, ba_op;
	
	for(var i=0; i<name_init.length; i++)
	{
		not_eval_ma.push(new Array(genre_name.length).fill(0));
		not_eval_ex.push(new Array(genre_name.length).fill(0));
		not_eval_adv.push(new Array(genre_name.length).fill(0));
		not_eval_ba.push(new Array(genre_name.length).fill(0));
	}

	for(var i=0; i<mname_list.length; i++)
	{
		//各難易度のOverPower算出
		ma_op = chuni_data2op(chuni_music_list[i].lv[3], ma_list[i]);	ex_op = chuni_data2op(chuni_music_list[i].lv[2], ex_list[i]);
		adv_op = chuni_data2op(chuni_music_list[i].lv[1], adv_list[i]); ba_op = chuni_data2op(chuni_music_list[i].lv[0], ba_list[i]);
		
		//レベル毎OverPowerに加算
		l_op[lv2idx(chuni_music_list[i].lv[3])] += ma_op; l_op[lv2idx(chuni_music_list[i].lv[2])] += ex_op;
		l_op[lv2idx(chuni_music_list[i].lv[1])] += adv_op; l_op[lv2idx(chuni_music_list[i].lv[0])] += ba_op;
		//ジャンル毎のOverPowerに加算
		g_idx=genre_number.indexOf(chuni_music_list[i].genre);
		g_ma_op[g_idx] += ma_op; g_ex_op[g_idx] += ex_op; g_adv_op[g_idx] += adv_op; g_ba_op[g_idx] += ba_op;
		//頭文字毎のOverPowerに加算
		w_idx=chuni_music_list[i].word;
		w_ma_op[w_idx] += ma_op; w_ex_op[w_idx] += ex_op; w_adv_op[w_idx] += adv_op; w_ba_op[w_idx] += ba_op;

		//未検証譜面カウント
		not_eval_ma[w_idx][g_idx] += lv2eval(chuni_music_list[i].lv[3]);
		not_eval_ex[w_idx][g_idx] += lv2eval(chuni_music_list[i].lv[2]);
		not_eval_adv[w_idx][g_idx] += lv2eval(chuni_music_list[i].lv[1]);
		not_eval_ba[w_idx][g_idx] += lv2eval(chuni_music_list[i].lv[0]);
		
	}
	return;
}

function reachable_rating_analyze()
{
	var ma_rate, ex_rate, adv_rate, ba_rate, best30=0;

	for(var i=0; i<mname_list.length; i++)
	{
		//各難易度のレート値算出
		ma_rate = chuni_score2rate(chuni_music_list[i].lv[3], ma_list[i].score);
		rate_array.push({id:chuni_music_list[i].id, diff:'M', rate:ma_rate, lv:chuni_music_list[i].lv[3], str:chuni_data2pdata(ma_list[i])});
		ex_rate = chuni_score2rate(chuni_music_list[i].lv[2], ex_list[i].score);
		rate_array.push({id:chuni_music_list[i].id, diff:'E', rate:ex_rate, lv:chuni_music_list[i].lv[2], str:chuni_data2pdata(ex_list[i])});
		adv_rate = chuni_score2rate(chuni_music_list[i].lv[1], adv_list[i].score);
		rate_array.push({id:chuni_music_list[i].id, diff:'A', rate:adv_rate, lv:chuni_music_list[i].lv[1], str:chuni_data2pdata(adv_list[i])});
		ba_rate = chuni_score2rate(chuni_music_list[i].lv[0], ba_list[i].score);
		rate_array.push({id:chuni_music_list[i].id, diff:'B', rate:ba_rate, lv:chuni_music_list[i].lv[0], str:chuni_data2pdata(ba_list[i])});
	}
	rate_array.sort(sort_condition);	
	for(var i = 0; i < 30 ; i++)
	{
		best30 += rate_array[i].rate;
	}
	your_best_ave = Math.floor(best30 / 30);
	your_best_rating = Math.floor(best30 / 40);
	your_max_recent = Math.floor(rate_array[0].rate / 4);

	return;
}

function mid2mtitle(mid, nick)
{
	for(var i=0; i<chuni_music_list.length; i++)
	{
		if(chuni_music_list[i].id == mid)
		{
			var tmp=chuni_music_list[i].nick;
			return (nick!=0&&tmp!="")?tmp:chuni_music_list[i].name;
		}
	}
	return "unknown music";
}

function lv2num(l)
{
	return (l.slice(-1)=='+')?Number(l.slice(0,-1) + '.7'):
		(l.slice(-1)=='-')?Number(l.slice(0,-1) + '.0'):
		Number(l);
}

function print_result_sub_print_header(title)
{
	var rslt_str ="";
	rslt_str += "<head>";
	rslt_str += "<title>" + title + " | 新・CYCLES FUNの寝言</title>";
    	rslt_str += "<link rel='stylesheet' media='all' type='text/css' href='https://sgimera.github.io/mai_RatingAnalyzer/css/mai_rating.css'>";
 	rslt_str += "<link rel='stylesheet' media='all' type='text/css' href='https://sgimera.github.io/mai_RatingAnalyzer/css/display.css'>";
 	rslt_str += "<link rel='stylesheet' media='all' type='text/css' href='https://sgimera.github.io/mai_RatingAnalyzer/css/result.css'>";
  	rslt_str += "</head>";
	
	return rslt_str;
}

function print_result()
{
	var str="";
	var today = new Date();
	var data_str = today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate() + " ";
	data_str += (("0"+today.getHours()).slice(-2)) + ":" + (("0"+today.getMinutes()).slice(-2)) + ":" + (("0"+today.getSeconds()).slice(-2));
	
	str += "<html>";
	str += print_result_sub_print_header("あならいざもどき for chunithm")

	str += "<body>";
	str += "<p align=right><a href='" + chuni_dom + "Home.html'>chunithm-netに戻る</a></p>";

	str += "<h2 align=center>あならいざもどき for chunithm<br>(eternity trial)</h2>";
	str += "<p align=center>Last Update : " + last_update_data + "<br>";
	str += "Programmed by <a href='https://twitter.com/sgimera'>@sgimera</a></p><hr>";

	str += "<h2 align=center>OverPower解析結果</h2>";
	str += "<table border=1 align=center class=datatable>";
	str += "<tr><th colspan=5 bgcolor='#000000'><font color='#ffffff'>" + your_id + "のOverPower<br>" + data_str + "現在</font></th></tr>";

	str += "<tr><th colspan=5>Level</th></tr>";
	for(var i=0; i<6; i++)
	{
		str += "<tr><th>Level" + lv_name[i] + "</th>";
		str += "<td align=right colspan=4>" + (l_op[i]/100).toFixed(2) + "</td>";
		str += "</tr>";
	}
	for(var i=6; i<lv_name.length; i++)
	{
		str += "<tr><th>Level" + lv_name[i] + "/" + lv_name[i+1] + "</th>";
		str += "<td align=right colspan=2>" + (l_op[i++]/100).toFixed(2) + "</td>";
		str += "<td align=right colspan=2>" + (l_op[i]/100).toFixed(2) + "</td>";
		str += "</tr>";
	}
	
	str += "<tr><th colspan=5>ジャンル</th></tr>";
	for(var i=0; i<genre_number.length; i++)
	{
		str += "<tr><th>" + genre_name[i] + "</th>";
		str += "<td align=right class=mai_master>" + (g_ma_op[i]/100).toFixed(2) + "</td>";
		str += "<td align=right class=mai_expert>" + (g_ex_op[i]/100).toFixed(2) + "</td>";
		str += "<td align=right class=mai_advanced>" + (g_adv_op[i]/100).toFixed(2) + "</td>";
		str += "<td align=right class=mai_basic>" + (g_ba_op[i]/100).toFixed(2) + "</td>";
		str += "</tr>";
	}

	str += "<tr><th colspan=5>頭文字</th></tr>";
	for(var i=0; i<name_init.length; i++)
	{
		str += "<tr><th>" + name_init[i] + "</th>";
		str += "<td class=mai_master align=right>" + (w_ma_op[i]/100).toFixed(2) + "</td>";
		str += "<td class=mai_expert align=right>" + (w_ex_op[i]/100).toFixed(2) + "</td>";
		str += "<td class=mai_advanced align=right>" + (w_adv_op[i]/100).toFixed(2) + "</td>";
		str += "<td class=mai_basic align=right>" + (w_ba_op[i]/100).toFixed(2) + "</td>";
		str += "</tr>";
	}
	
	str += "<tr><th colspan=5>参考値（全曲合計）</th></tr>";
	str += "<th align=center>全曲合計</th>";
	str += "<td class=mai_master align=right>" + (g_ma_op.reduce(function(x,y){return x+y;})/100).toFixed(2) + "</td>";
	str += "<td class=mai_expert align=right>" + (g_ex_op.reduce(function(x,y){return x+y;})/100).toFixed(2) + "</td>";
	str += "<td class=mai_advanced align=right>" + (g_adv_op.reduce(function(x,y){return x+y;})/100).toFixed(2) + "</td>";
	str += "<td class=mai_basic align=right>" + (g_ba_op.reduce(function(x,y){return x+y;})/100).toFixed(2) + "</td>";
	str += "</tr>";
	str += "</table>";

	str += "<h2 align=center>未検証カウント</h2>";
	str += "<table border=1 align=center class=datatable>";
	str += "<tr align=center>";
	str += "<th>Master</th><th>POPS<br>ANIME</th><th>nico<br>nico</th><th>東方</th>"
	str += "<th>VARI<br>ETY</th><th>イロドリ<br>ミドリ</th><th>言ノ葉</th><th>ORG</th>"
	str += "</tr>"
	for(var i=0; i<name_init.length; i++)
	{
		str += "<tr>";
		str += "<th>" + name_init[i] + "</th>";
		for(var j=0; j<genre_name.length; j++)
		{
			str += "<td class=mai_master>" + not_eval_ma[i][j] + "</td>";
		}
		str += "</tr>";
	}
	str += "<tr align=center>";
	str += "<th>Expert</th><th>POPS<br>ANIME</th><th>nico<br>nico</th><th>東方</th>"
	str += "<th>VARI<br>ETY</th><th>イロドリ<br>ミドリ</th><th>言ノ葉</th><th>ORG</th>"
	str += "</tr>"
	for(var i=0; i<name_init.length; i++)
	{
		str += "<tr>";
		str += "<th>" + name_init[i] + "</th>";
		for(var j=0; j<genre_name.length; j++)
		{
			str += "<td class=mai_expert>" + not_eval_ex[i][j] + "</td>";
		}
		str += "</tr>";
	}
	str += "<tr align=center>";
	str += "<th>Advanced</th><th>POPS<br>ANIME</th><th>nico<br>nico</th><th>東方</th>"
	str += "<th>VARI<br>ETY</th><th>イロドリ<br>ミドリ</th><th>言ノ葉</th><th>ORG</th>"
	str += "</tr>"
	for(var i=0; i<name_init.length; i++)
	{
		str += "<tr>";
		str += "<th>" + name_init[i] + "</th>";
		for(var j=0; j<genre_name.length; j++)
		{
			str += "<td class=mai_advanced>" + not_eval_adv[i][j] + "</td>";
		}
		str += "</tr>";
	}
	str += "</table>";
	
	str += "<h2 align=center>Rating解析結果</h2>";
	str += "<table border=1 align=center class=datatable>";
	str += "<tr><th colspan=3 bgcolor='#000000'><font color='#ffffff'>" + your_id + "のRating<br>" + data_str + "現在</font></th></tr>";
	str += "<tr><th>現在のRating</th><td align=center>" + your_rating + "<br>(" + your_max_rating + ")</td>";
	str += "<td>chunithm-netでみられるデータ</td></tr>";
	str += "<tr><th>BEST30平均</th><td align=center>" + (your_best_ave/100).toFixed(2) + "</td><td>上位30譜面のレート値平均</td></tr>";
	str += "<tr><th>到達可能</th><td align=center>" + ((your_best_rating+your_max_recent)/100).toFixed(2) + "</td>";
	str += "<td>B:" + (your_best_rating/100).toFixed(2) + " + R:" + (your_max_recent/100).toFixed(2) + "</td></tr>";
	str += "</table>";
	
	str += "<h2 align=center>TOP30解析結果</h2>";
	str += "<table border=1 align=center class=datatable>";
	str += "<tr><th colspan=5 bgcolor='#000000'><font color='#ffffff'>" + your_id + "のTOP30<br>" + data_str + "現在</font></th></tr>";
	for(var i=0; i<30; i++)
	{
		str += "<tr class=";
		str += (rate_array[i].diff=='M')?'mai_master':(rate_array[i].diff=='E')?'mai_expert':
			(rate_array[i].diff=='A')?'mai_advanced':(rate_array[i].diff=='B')?'mai_basic':'mai_easy';
		str += ">";
		str += "<td>" + (i+1) + "</td>";
		str += "<th>" + mid2mtitle(rate_array[i].id, 1) + "</th>";
		str += "<td align=left>" + Number((rate_array[i].rate/100).toFixed(6)) + "</td>";
		str += "<td>" + rate_array[i].lv + "</td>";
		str += "<td align=left>" + rate_array[i].str + "</td>";
		str += "</tr>";
	}
	var limit_rating=Number((rate_array[29].rate/100).toFixed(6));
	for(var n=0; n<20 && i<rate_array.length; i++)
	{
		if( lv2num(rate_array[i].lv)+2 < limit_rating )
			continue;

		str += "<tr class=";
		str += (rate_array[i].diff=='M')?'mai_master':(rate_array[i].diff=='E')?'mai_expert':
			(rate_array[i].diff=='A')?'mai_advanced':(rate_array[i].diff=='B')?'mai_basic':'mai_easy';
		str += ">";
		str += "<td>" + (i+1) + "</td>";
		str += "<th>" + mid2mtitle(rate_array[i].id, 1) + "</th>";
		str += "<td align=left>" + Number((rate_array[i].rate/100).toFixed(6)) + "</td>";
		str += "<td>" + rate_array[i].lv + "</td>";
		str += "<td align=left>" + rate_array[i].str + "</td>";
		str += "</tr>";
		n++;
	}

	str += "</body>";
	str += "</html>";
	
	document.open(); document.write(str); document.close();

}
//メインはここから
get_your_id(chuni_dom + 'Home.html');	//名前、Rating取得
get_musicname(chuni_dom + 'MusicRanking.html', 'master', mname_list);	//現在の楽曲取得
get_scoredata(chuni_dom + 'MusicGenre.html', 'master', ma_list);	//Masterのスコアデータ取得
get_scoredata(chuni_dom + 'MusicGenre.html', 'expert', ex_list);	//Expertのスコアデータ取得
get_scoredata(chuni_dom + 'MusicGenre.html', 'advanced', adv_list);	//Advancedのスコアデータ取得
get_scoredata(chuni_dom + 'MusicGenre.html', 'basic', ba_list);		//Basicのスコアデータ取得
	
overpower_analyze();
reachable_rating_analyze();

print_result();

})(); void(0);
