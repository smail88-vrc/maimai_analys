javascript:
(function()
{
var ma_list=[], ex_list=[], adv_list=[], ba_list=[], mname_list=[];
var chuni_dom='https://chunithm-net.com/mobile/';
var genre_number=[0, 2, 3, 6, 7, 8, 5];
var genre_name=["POPS & ANIME", "niconico", "東方Project", "VARIETY", "イロドリミドリ", "言ノ葉Project", "ORIGINAL"]
var name_init=["あ行", "か行", "さ行", "た行", "な行", "は行", "ま行", "や行", "ら行", "わ行", "A～G", "H～N", "O～U", "V～Z", "数字"];
var lv_name=['1','2','3','4','5','6','7','7+','8','8+','9','9+','10','10+','11','11+','12','12+','13','13+','14'];

function score2eval(score)
{
	return  (score>=1010000)?{rank:'SSS', achi:1.00}:
		(score>=1007500)?{rank:'SSS', achi:(score-1007500)*0.75/ 2500}:
		(score>=1005000)?{rank:'SS', achi:0.5+(score-1005000)*0.5 / 2500}:
		(score>=1000000)?{rank:'SS' , achi:(score-1000000)*0.5 / 5000}:
		(score>= 975000)?{rank:'S'  , achi:(score- 975000)/ 25000}:
		(score>= 950000)?{rank:'AAA', achi:(score- 950000)*1.5 /25000}:
		(score>= 925000)?{rank:'AA' , achi:(score- 925000)*1.5/ 25000}:
		(score>= 900000)?{rank:'A'  , achi:(score- 900000)*2.0/ 25000}:
		(score>= 800000)?{rank:'BBB', achi:(score- 800000)/100000}:
		(score>= 500000)?{rank:'C'  , achi:(score- 500000)/100000}:
		{rank:'D', achi:score/500000};
}

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
  score=score2eval((tmp.length!=0)?(Number(tmp[0].innerText.replace(/,/g, ""))):0);
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
			clr=lamp_rslt[idx];
			break;
		case 'FC':
		case 'AJ':
			fcaj=lamp_rslt[idx];
			break;
		case 'FCh':
		case 'FCh-':
			fch=lamp_rslt[idx];
			break;
		default: break;
	}
  }
  return {rank:score.rank, achi:score.achi, lamp0:clr, lamp1:fcaj, lamp2:fch};
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

function lv2idx(lv)	//
{
	var i_part=0, d_part=0;
	var d_part_c=lv.slice(-1);
	switch(d_part_c)
	{
		case '+':
			i_part=Number(lv.slice(0,-1));
			d_part=1;
			break;
		case '-':
			i_part=Number(lv.slice(0,-1));
			d_part=0;
			break;
		default:
			i_part=Number(lv.slice(0,2));
			d_part=(Number(d_part_c)>6)?1:0;
			break;
	}
	if(Number(i_part < 7))
		return i_part-1;
	return 6 + (i_part-7)*2 + d_part;		
}
	
function eval2pdata(l,d)
{
	var tmp ="";
	
	switch(d.rank)
	{
		case 'SSS':
		case 'SS':
		case 'S':
		case 'AAA':
		case 'AA':
		case 'A':
			tmp += l + '/ ' + d.rank + '+' + (Math.floor(d.achi * 100)/100).toFixed(2);
			break;
		case 'BBB':
		case 'C':
		case 'D' :
			tmp += l + '/ ' + d.rank + '+' + (Math.floor(d.achi *10000)/100).toFixed(2) + '%';
			break;
		default:
			break;
	}
	if(d.lamp1!="")
		tmp += '+' + d.lamp1;
	return tmp;
}

function eval2op(l,d)	//100倍で計算。A未満は0になる。
{
	var base = (l.slice(-1)=='+')?Number(l.slice(0,-1) + '70'):
		(l.slice(-1)=='-')?Number(l.slice(0,-1) + '00'):
		Number(l.slice(0,-2) + l.slice(-1) + '0');
	
	var rank_v=0, lamp_v=0, achi_v=0;

	switch(d.rank)
	{
		case 'SSS':	rank_v=200; break;
		case 'SS':	rank_v=100; break;
		case 'S':	rank_v=0; break;
		case 'AAA':	rank_v=-150; break;
		case 'AA':	rank_v=-300; break;
		case 'A':	rank_v=-500; break;
		default:
			return 0;	// A未満は考察外。
	}
	switch(d.lamp1)
	{
		case 'FC':	lamp_v=10; break;
		case 'AJ':	lamp_v=20; break;
		default:	lamp_v=0; break;
	}
	
	achi_v = Math.floor(100*d.achi);

	return Math.max(5*(base + rank_v + achi_v + lamp_v), 0)
}

//メインはここから
get_musicname(chuni_dom + 'MusicRanking.html', 'master', mname_list);
get_scoredata(chuni_dom + 'MusicGenre.html', 'master', ma_list);
get_scoredata(chuni_dom + 'MusicGenre.html', 'expert', ex_list);
get_scoredata(chuni_dom + 'MusicGenre.html', 'advanced', adv_list);
get_scoredata(chuni_dom + 'MusicGenre.html', 'basic', ba_list);
	
var scoretable="";
var w_idx, g_idx, ma_op, ex_op, adv_op, ba_op;
var w_ma_op=new Array(name_init.length).fill(0);
var w_ex_op=new Array(name_init.length).fill(0);
var w_adv_op=new Array(name_init.length).fill(0);
var w_ba_op=new Array(name_init.length).fill(0);
var g_ma_op=new Array(genre_number.length).fill(0);
var g_ex_op=new Array(genre_number.length).fill(0);
var g_adv_op=new Array(genre_number.length).fill(0);
var g_ba_op=new Array(genre_number.length).fill(0);
var l_op=new Array(lv2idx("14+")).fill(0);

/*
for(var g=0; g<genre_list.length; g++)
{
	var g_num=genre_list[g];
	scoretable += "<table border=1 align=center>";
	for(var i=0; i<mname_list.length; i++)
	{
		if(chuni_music_list[i].genre != g_num) continue;
		var musicname=(chuni_music_list[i].nick!="")?chuni_music_list[i].nick:chuni_music_list[i].name
		scoretable += "<tr><th>" + musicname + "</th>";
		scoretable += "<td>" + eval2pdata(chuni_music_list[i].lv[3], ma_list[i]) + "</td>";
		scoretable += "<td>" + eval2pdata(chuni_music_list[i].lv[2], ex_list[i]) + "</td>";
		scoretable += "<td>" + eval2pdata(chuni_music_list[i].lv[1], adv_list[i]) + "</td>";
		scoretable += "<td>" + eval2pdata(chuni_music_list[i].lv[0], ba_list[i]) + "</td>";
		scoretable += "</tr>";
	}
	scoretable += "</table>";
}
*/

for(var i=0; i<mname_list.length; i++)
{
	ma_op = eval2op(chuni_music_list[i].lv[3], ma_list[i]);
	ex_op = eval2op(chuni_music_list[i].lv[2], ex_list[i]);
	adv_op = eval2op(chuni_music_list[i].lv[1], adv_list[i]);
	ba_op = eval2op(chuni_music_list[i].lv[0], ba_list[i]);
	w_idx=chuni_music_list[i].word;
	g_idx=genre_number.indexOf(chuni_music_list[i].genre);
	w_ma_op[w_idx] += ma_op;
	w_ex_op[w_idx] += ex_op;
	w_adv_op[w_idx] += adv_op;
	w_ba_op[w_idx] += ba_op;
	g_ma_op[g_idx] += ma_op;
	g_ex_op[g_idx] += ex_op;
	g_adv_op[g_idx] += adv_op;
	g_ba_op[g_idx] += ba_op;
	l_op[lv2idx(chuni_music_list[i].lv[3])] += ma_op;
	l_op[lv2idx(chuni_music_list[i].lv[2])] += ex_op;
	l_op[lv2idx(chuni_music_list[i].lv[1])] += adv_op;
	l_op[lv2idx(chuni_music_list[i].lv[0])] += ba_op;
}

scoretable += "<table border=1 align=center>";
for(var i=0; i<name_init.length; i++)
{
	scoretable += "<tr><th>" + name_init[i] + "</th>";
	scoretable += "<td align=right>" + (w_ma_op[i]/100).toFixed(2) + "</td>";
	scoretable += "<td align=right>" + (w_ex_op[i]/100).toFixed(2) + "</td>";
	scoretable += "<td align=right>" + (w_adv_op[i]/100).toFixed(2) + "</td>";
	scoretable += "<td align=right>" + (w_ba_op[i]/100).toFixed(2) + "</td>";
	scoretable += "</tr>";
}
for(var i=0; i<genre_number.length; i++)
{
	scoretable += "<tr><th>" + genre_name[i] + "</th>";
	scoretable += "<td align=right>" + (g_ma_op[i]/100).toFixed(2) + "</td>";
	scoretable += "<td align=right>" + (g_ex_op[i]/100).toFixed(2) + "</td>";
	scoretable += "<td align=right>" + (g_adv_op[i]/100).toFixed(2) + "</td>";
	scoretable += "<td align=right>" + (g_ba_op[i]/100).toFixed(2) + "</td>";
	scoretable += "</tr>";
}
for(var i=0; i<lv_name.length; i++)
{
	scoretable += "<tr><th>Level" + lv_name[i] + "</th>";
	scoretable += "<td align=right colspan=4>" + (l_ma_op[i]/100).toFixed(2) + "</td>";
	scoretable += "</tr>";
}
scoretable += "</table>";

document.open();
document.write(scoretable);
document.close();

})(); void(0);
