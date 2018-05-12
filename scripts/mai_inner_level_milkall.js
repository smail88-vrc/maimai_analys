javascript:

var mra_not_evaluated="", mra_evaluated="", mra_max_rating="";

(function()
{
	
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

function true_level(lvlist, scorelist)
{
	var levellist=[], tmplv=0;
	for(var n=0; n<3; n++)
	{
		tmplv=mra_diff2tmp(lvlist[n]);
		(Math.floor(tmplv)<12||scorelist[n]%500==0)?(levellist.push(lvlist[n])):
		(levellist.push(Math.floor(tmplv) + "." + [20,60,30,21,17,35,50,28,55,65].indexOf((scorelist[n]/5)%100-2*Math.floor(tmplv))));
	}
	
	return levellist;
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
var tmplvlist=[];
for(var i=0; i<mlist_length; i++)
{
	tmplvlist=true_level(maimai_inner_lv[i].levels, maimai_inner_lv[i].score);
	
	// 内部lv出力用
	for(var lv=0; lv<3; lv++)
	{
		var tmplv = tmplvlist[lv];
		if(tmplv == "")
			continue;
		
		var tmpstr="";
		tmpstr += (maimai_inner_lv[i].nick != "")?maimai_inner_lv[i].nick:maimai_inner_lv[i].name;
		tmpstr += (lv==0)?"(赤)":(lv==2)?"(白)":"";
		tmpstr += "、";
		
//		console.log(tmplv + " : " + mra_diff2tmp(tmplv).toFixed(1)) + " : " + tmpstr);

		switch(tmplv.slice(-1))
		{
			case "+":
			case "-":
			case ")":
				continue;
			default:
				break;
		}
		switch(mra_diff2tmp(tmplv).toFixed(1))
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
			default:	break;
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
	
function mra_level_lavel2(lv_str)
{
  var tmp="";
  tmp += "<tr><th colspan=2><font color=\"#ff5252\">未公表データ　転載厳禁　<\/font> ";
  tmp += lv_str;
  tmp += " <font color=\"#ff5252\">　未公表データ　転載厳禁<\/font><\/th><\/tr>";
  return tmp;
}


var caution_text = "この後表示されるデータを外部に公開しないでください。\n";
caution_text += "守れない方はOKを押さず、キャンセルを押してお帰りください。";

if(location.href != 'https://sgimera.github.io/mai_RatingAnalyzer/')
{
	alert("新・CYCLES FUNのTOPページで実行してください。");
	return;
}
if(!confirm(caution_text)) return;
	
mra_evaluated = "";
mra_evaluated += "<head>";
mra_evaluated += "<link rel='stylesheet' media='all' type='text/css' href='https://sgimera.github.io/mai_RatingAnalyzer/css/result.css' />";
mra_evaluated += "</head>";

mra_evaluated += "<body onSelectStart='return false;' onMouseDown='return false;' ontouchend='return false;' >";
mra_evaluated += "<p>新・CYCLES FUNの寝言<\/p>";
mra_evaluated += "<h2>枠の表 完全版<\/h2>";
mra_evaluated += "<p>サイトに飾ってある表は、見ての通り<b>Lv.12以上の情報を出してません。<\/b><\/p>";
mra_evaluated += "<p>この表はその完全版となります。<\/p>";
mra_evaluated += "<p>このページの画面キャプチャの公開、無断でのデータ公開が確認できた時点で";
mra_evaluated += "<ul><li>botアカウント、およびメインアカウントからブロック<li>このページのアドレス変更<\/ul>";
mra_evaluated += "となりますので、ご注意ください。今回から一発とします。<\/p>"
mra_evaluated += "<p>各自がプレーしたときのリザルトの写真を公開することを止める権利は私にはありませんが、";
mra_evaluated += "私が提供しているツール（表計算、このページを表示するためのスクリプト）を使って得られる情報を公開する権利は";
mra_evaluated += "私にしかありません。ご注意ください。<\/p>";


mra_evaluated += "<table border=1 align=center class=evaluated_list>";
mra_evaluated += mra_level_lavel2("Level 13");
mra_evaluated += mra_add_musiclevel_list(["13.6", "13.5", "13.4", "13.3", "13.2", "13.1", "13.0"],
			[lv136, lv135, lv134, lv133, lv132, lv131, lv130]);
mra_evaluated += mra_level_lavel2("Level 12+");
mra_evaluated += mra_add_musiclevel_list(["12.9", "12.8", "12.7"], [lv129, lv128, lv127]);
mra_evaluated += mra_level_lavel2("Level 12");
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
mra_evaluated += "<\/body>";
	
document.open();
document.write(mra_evaluated);
document.close();

})()
