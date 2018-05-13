javascript:
(function()
{
var ma_list=[], ex_list=[], adv_list=[], ba_list=[];
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

function get_scoredata(addr, args, array)
{
	$.ajax({type:'POST', url:addr, data:args, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			array=Array.prototype.slice.call($(data).find('.w388')).map(function(x){return list2data(x)})
		}
	);
  return;
}

function get_musicname(array)
{
	$.ajax({type:'POST', url:addr, data:args, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			array=Array.prototype.slice.call($(data).find('.w388')).map(function(x){return list2data(x)})
		}
	);
  return;
}


})(); void(0);
