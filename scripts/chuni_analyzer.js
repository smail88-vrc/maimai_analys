javascript:
(function()
{
var ma_list=[], ex_list=[], adv_list=[], ba_list=[], mname_list=[];
var chuni_dom='https://chunithm-net.com/mobile/';

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
	lamp=Array.prototype.slice.call($(x).find('img')).map(function(x){return x.getAttribute('src')})
  
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
	return {score:score, lamp0:clr, lamp1:fcaj, lamp2:fch};
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

function score2eval(score)
{
	return (score>=1007500)?{rank:'SSS', achi:(score-1007500)*0.75/ 2500}:
	       (score>=1005000)?{rank:'SS+', achi:(score-1005000)*0.5 / 2500}:
	       (score>=1000000)?{rank:'SS' , achi:(score-1000000)*0.5 / 5000}:
	       (score>= 975000)?{rank:'S'  , achi:(score- 975000)/ 25000}:
	       (score>= 950000)?{rank:'AAA', achi:(score- 950000)*1.5 /25000}:
	       (score>= 925000)?{rank:'AA' , achi:(score- 925000)*1.5/ 25000}:
	       (score>= 900000)?{rank:'A'  , achi:(score- 900000)*2.0/ 25000}:
	       (score>= 800000)?{rank:'BBB', achi:(score- 800000)/100000}:
	       (score>= 500000)?{rank:'C'  , achi:(score- 500000)/100000}:
	       {rank:'D', achi:score/500000};
}

function eval2pdata(l,d)
{
	switch(d.rank)
	{
		case 'SSS':
		case 'SS+':
		case 'SS':
		case 'S':
		case 'AAA':
		case 'AA':
		case 'A':
			return l + '/ ' + d.rank + ' / +' + (Math.floor(d.achi * 100)/100).toFixed(2);
		case 'BBB':
		case 'C':
		case 'D' :
			return l + '/ ' + d.rank + ' / ' + (Math.floor(d.achi *10000)/100).toFixed(2) + '%';
		default:
			return "";
	}
}

//メインはここから
get_musicname(chuni_dom + 'MusicRanking.html', 'master', mname_list);
get_scoredata(chuni_dom + 'MusicGenre.html', 'master', ma_list);
get_scoredata(chuni_dom + 'MusicGenre.html', 'expert', ex_list);
get_scoredata(chuni_dom + 'MusicGenre.html', 'advanced', adv_list);
get_scoredata(chuni_dom + 'MusicGenre.html', 'basic', ba_list);
	
var scoretable="";

scoretable += "<table border=1 align=center>";
for(var i=0; i<mname_list.length; i++)
{
	scoretable += "<tr><th>" + chuni_music_list[i].name + "</th>";
	scoretable += "<td>" + eval2pdata(chuni_music_list[i].lv[3], score2eval(ma_list[i].score)) + "</td>";
	scoretable += "<td>" + eval2pdata(chuni_music_list[i].lv[2], score2eval(ex_list[i].score)) + "</td>";
	scoretable += "<td>" + eval2pdata(chuni_music_list[i].lv[1], score2eval(adv_list[i].score)) + "</td>";
	scoretable += "<td>" + eval2pdata(chuni_music_list[i].lv[0], score2eval(ba_list[i].score)) + "</td></tr>";
}
scoretable += "</table>";

document.open();
document.write(scoretable);
document.close();

})(); void(0);
