javascript:
(function()
{

var clist=[], ranklist=[], complist=[], your_id="", your_rating="";
var rankicon="", rankname="";
var mainet_dom = 'https://maimai-net.com/maimai-mobile/';

var c_rank_list =[
	["青皆伝", "青十段", "青九段", "青八段"], ["緑皆伝", "緑十段", "緑九段", "緑八段"],
	["橙皆伝", "橙十段", "橙九段", "橙八段"], ["桃皆伝", "桃十段", "桃九段", "桃八段"],
	["紫皆伝", "紫十段", "紫九段", "紫八段"]
];
var c_comp_trophy_list = [["舞舞", "神", "極", "覇者"]];

var c_comp_plate_list=[
	["真舞舞", "真神", "真将", "真極"],
	["超舞舞", "超神", "超将", "超極"], ["檄舞舞", "檄神", "檄将", "檄極"],
	["橙舞舞", "橙神", "橙将", "橙極"], ["暁舞舞", "暁神", "暁将", "暁極"],
	["桃舞舞", "桃神", "桃将", "桃極"], ["櫻舞舞", "櫻神", "櫻将", "櫻極"],
	["紫舞舞", "紫神", "紫将", "紫極"], ["菫舞舞", "菫神", "菫将", "菫極"]
];

var c_comp_list=c_comp_trophy_list.concat(c_comp_plate_list);
/* data.htmlを使う前提 */
function get_your_id(addr)
{
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			if($(data).find('.underline').length == 0)
			{
				alert('maimai.netの利用権がない模様。\n1クレ以上プレーしてから再トライしてください。');
				window.location.href=mainet_dom + "home";
			}
			your_id = $(data).find('.underline')[0].innerText.trim();
			your_rating = $(data).find('.blue')[1].innerText.trim()
				.replace(/（/g, "(").replace(/）/g, ")").replace(/MAX /g, "");
			var ri=$(data).find('.f_r');
			rankicon=(ri.length!=0)?($(ri).find('img')[0].getAttribute('src')):("");
		}
	);
	return;
}

	
function get_collection_data(collection_list, addr, dlist)
{
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			var list_bom=$(data).find('.on');
			var np_list=Array.prototype.slice.call(list_bom).map((x)=> x.innerText.trim());
			var lnum = (Array.from(new Set(dlist.map((x)=> np_list.indexOf(x)))).sort((a,b)=>a-b));
			lnum.shift();	/* lnumの先頭(-1になるはず)を削除 */
			lnum.map((n)=>(collection_list.push({name:list_bom[n].innerText.trim(),
						addr:$(list_bom[n]).find('img')[0].getAttribute('src')})));

		}
	);
	return;
}	

function collection_filter(collection_list)
{
	var new_clist=[];
	var c_length = collection_list.length;
	var cf_length;
	var check=false;

	cf_length=c_rank_list.length;
	for(var i=0; i<cf_length; i++)
	{
		var lnum = c_rank_list[i].map((x)=>collection_list.map((x)=>x.name).indexOf(x));
		var tmp=-1;
		while(tmp==-1 && lnum.length!=0)
			tmp=lnum.shift();
		ranklist.push((tmp!=-1)?"<img src='"+ collection_list[tmp].addr + "' height=40>":"");
	}

	alert("中間地点通過");
	complist.push("");	/* 無印称号からのリスト分。後で作る */

	cf_length=c_comp_plate_list.length;
	for(var i=0; i<cf_length; i++)
	{
		
		var lnum = c_comp_plate_list[i].map((x)=>collection_list.map((x)=>x.name).indexOf(x));
		console.log(lnum);
		if(lnum[0]!=-1) lnum[3]=-1; /* 舞舞なら極は出さない */
		if(lnum[1]!=-1) {lnum[2]=-1; lnum[3]=-1;} /* 神なら将、極は出さない */
		lnum.push(-1);
		lnum=Array.from(new Set(lnum)).sort((a,b)=>a-b)
		console.log(lnum);
		lnum.shift();	/* -1を出す */
		complist.push(lnum.map((x)=>"<img src='"+ collection_list[x].addr + "' height=40>").join(""));
	}
	return;
}

function print_rank_comp(ver, background, fontcolor, rank, comp1, comp2)
{
	var tmp = "";
	tmp += "<tr bgcolor=" + background + " align=center valign=middle>";
	tmp += "<th rowspan=2><font color='" + fontcolor + "'>" + ver + "</font></th>";
	tmp += "<th rowspan=2><font color='" + fontcolor + "'>" + rank + "</font></th>";
	tmp += "<th><font color='" + fontcolor + "'>" + comp1 + "</th>";
	tmp += "</tr>";
	tmp += "<tr bgcolor=" + background + " align=center valign=middle>";
	tmp += "<th><font color='" + fontcolor + "'>" + comp2 + "</th>";
	tmp += "</tr>";
	
	return tmp;
}

function print_result(golliramode, alldata, trv)
{
	var rslt_str="";

	rslt_str += "<html>";
	rslt_str += "<head>";
	rslt_str += "<title>" + your_id + rankname +"の舞レート解析結果 | 新・CYCLES FUNの寝言<\/title>";
	rslt_str += "<style type='text/css'>";
	rslt_str += ".datatable { border-collapse: collapse; font-size:0.90em; }\n";
	rslt_str += ".alltable { border-collapse: collapse; font-size:0.75em; }";
	rslt_str += "<\/style>";
    	rslt_str += "<link rel='stylesheet' media='all' type='text/css' href='https://sgimera.github.io/mai_RatingAnalyzer/css/mai_rating.css?'\/>";
	rslt_str += "<\/head>";
	
	rslt_str += "<body>";

	rslt_str += "<h2>" + your_id + rankname +"のRank/Complete情報<\/h2>";

	rslt_str += "<table class=datatable border=1 align=center>";
	rslt_str += "<tr bgcolor='#000000' align=center valign=middle>";
	rslt_str += "<th colspan=3><font color='#ffffff'>Rank/Complete情報</font></th>";
	rslt_str += "</tr>";
	
	rslt_str += "<tr bgcolor='#FFFFFF' align=center valign=middle>";
	rslt_str += "<th>ver.</th>";	
	rslt_str += "<th>段位</th>";	
	rslt_str += "<th>制覇</th>";
	rslt_str += "</tr>";

	rslt_str += print_rank_comp('青<br>真', '#0095d9', '#FFFFFF', ranklist[0], complist[0], complist[1]);
	rslt_str += print_rank_comp('緑<br>檄', '#00b300', '#FFFFFF', ranklist[1], complist[2], complist[3]);
	rslt_str += print_rank_comp('橙<br>暁', '#fab300', '#000000', ranklist[2], complist[4], complist[5]);
	rslt_str += print_rank_comp('桃<br>櫻', '#FF83CC', '#000000', ranklist[3], complist[6], complist[7]);
	rslt_str += print_rank_comp('紫<br>菫', '#b44c97', '#FFFFFF', ranklist[4], complist[8], complist[9]);

	rslt_str += "<\/table>";
	rslt_str += "<\/body>";
	rslt_str += "<\/html>";
	
	document.open();
	document.write(rslt_str);
	document.close();
}	

var tmpstr = "--舞コレクション解析・テスト用--\n(trial)\n\n";
tmpstr += "2018/3/31 14:30版";
tmpstr += "\n\n";
tmpstr += "Programmed by @sgimera";
if(!confirm(tmpstr))
	return;
	
get_your_id(mainet_dom + 'playerData/');	// プレイヤーデータの取得
get_collection_data(clist, mainet_dom + 'collection/trophy',
		   Array.prototype.concat.apply([],c_comp_trophy_list));	// 称号データ取得
get_collection_data(clist, mainet_dom + 'collection/namePlate',
		   Array.prototype.concat.apply([],c_rank_list.concat(c_comp_plate_list)));	// ネームプレートデータ取得

collection_filter(clist);
	
print_result(0, false, 0);	//全譜面リスト表示

})(); void(0);
