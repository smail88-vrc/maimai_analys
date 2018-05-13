javascript:
(function()
{
	
var your_id="", your_rating="", your_max_rating="";
var rankicon="", rankname="";
var your_icon="", your_plate="", your_frame="";

var mainet_dom = 'https://maimai-net.com/maimai-mobile/';
var modoki_dom = 'https://sgimera.github.io/mai_RatingAnalyzer/'

/* data.htmlを使う前提 */
function get_your_id(addr)
{
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			var tmp=$(data).find('.underline');
			if(tmp.length==0)
			{
				alert('maimai.netの利用権がない模様。\n1クレ以上プレーしてから再トライしてください。');
				window.location.href=mainet_dom + "home";
			}
			your_id = tmp[0].innerText.trim();
			var ratingstr = $(data).find('.blue')[1].innerText.trim();
			your_rating = ratingstr.replace(/（.*/, "");
			your_max_rating = ratingstr.replace(/.*（MAX /, "").replace(/）/, "");
			var ri=$($(data).find('.f_r')).find('img');
			your_icon=$(data).find('img.icon_you.f_l')[0].getAttribute('src');
			rankicon=(ri.length!=0)?(ri[0].getAttribute('src')):("");
		}
	);
	return;
}
	
/* 復活の可能性あり
function get_trophy_data(addr)
{
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
		}
	);
	return;
}
*/

function get_nameplate_data(addr)
{
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			your_plate=$($(data).find('div.text_c')[2]).find('img')[0].getAttribute('src');
		}
	);
	return;
}

function get_current_frame(addr)
{
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			your_frame=$($(data).find('div.text_c')[2]).find('img')[0].getAttribute('src');
		}
	);
	return;
}
	
function current_rank()
{
	var colorlist=["", "", "", "", "", "", "", "", "", "金", "黒", "赤"];
	var ranklist=["", "初段", "二段", "三段", "四段", "五段", "六段", "七段", "八段", "九段", "十段", "皆伝"];

	if(rankicon!="")
	{
		rankname = colorlist[Number(rankicon.slice(-6, -4))];
		rankname += ranklist[Number(rankicon.slice(-9, -7))];
	}
	colorlist=null;
	ranklist=null;
	return;
}

function get_ratingrank(rating)
{
	return (rating>=15)?("mai_rainbow"):(rating>=14.5)?("mai_gold"):(rating>=14)?("mai_silver"):(rating>=13)?("mai_copper"):
	(rating>=12)?("mai_violet"):(rating>=10)?("mai_red"):(rating>=7)?("mai_yellow"):(rating>=4)?("mai_green"):
	(rating>=1)?("mai_blue"):("mai_white");
}

function print_result_sub_print_header(title)
{
	var rslt_str ="";
	rslt_str += "<head>";
	rslt_str += "<title>" + title + " | 新・CYCLES FUNの寝言</title>";
    	rslt_str += "<link rel='stylesheet' media='all' type='text/css' href='" + modoki_dom + "css/mai_rating.css'>";
 	rslt_str += "<link rel='stylesheet' media='all' type='text/css' href='" + modoki_dom + "css/display2.css'>";
  	rslt_str += "</head>";
	
	return rslt_str;
}
	
function print_result()
{
	var rslt_str="";

	rslt_str += "<html>";
	rslt_str += print_result_sub_print_header(your_id + rankname +"の上画面生成結果");
	
	rslt_str += "<body>";
	
	rslt_str += "<p align=right><a href='" + mainet_dom + "home'>maimai.net HOMEに戻る</a></p>";
	
	rslt_str += "<h2 align=center>" + your_id + rankname + "</h2>";
	rslt_str += "<center>";
	rslt_str += "<div class=game_display>";
	rslt_str += "<img src='" + your_frame + "' width=100%>";
	rslt_str += "<img src='" + your_icon + "' class=game_icon>";
	rslt_str += "<img src='" + your_plate + "' class=game_plate>";
	rslt_str += "<img src='" + rankicon + "' class=game_rank>";
	rslt_str += "<p class='game_rating " + get_ratingrank(your_rating) + "'>" + your_rating + "/" + your_max_rating + "</p>";
	rslt_str += "<p class=game_name>" + your_id + "</p>";
	rslt_str += "</center>";

	rslt_str += "</body>";
	rslt_str += "</html>";
	
	document.open();
	document.write(rslt_str);
	rslt_str=null;
	document.close();
}

/* ココからメイン */
	
get_your_id(mainet_dom + 'playerData/');	// プレイヤーデータの取得・共通処理
current_rank();	// 段位アイコンから段位名称に変更・共通処理
/*
get_trophy_data(mainet_dom + 'collection/trophy/'),
*/
get_nameplate_data(mainet_dom + 'collection/namePlate/')
get_current_frame(mainet_dom + 'collection/frame/');

print_result();	//全譜面リスト表示

})(); void(0);
