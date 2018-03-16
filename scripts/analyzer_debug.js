javascript:
(function()
{

var ex_list=[], ma_list=[], re_list=[], clist=[], addr="", your_id="", your_rating="";

function get_your_id(addr, nextpage, nextsuffix)
{
	var nextaddr="";
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			var m=$(data).find('.status_data')[0];
			your_id = m.children[1].innerText;
			your_rating = m.children[7].innerText.trim().replace(/MAX /g, "");
		});
	nextaddr=get_nextpage_address($(data), nextpage, nextsuffix);				
}

function get_nextpage_address(j,html,suffix)	//次の楽曲リストページを探す
{
	var e = $(j).find('a');	// hrefが含まれると思われるものlist
	var e_length=e.length;	// その個数
	for(var i=0; i<e_length; i++)	//楽曲リストページ用ループ
	{
		var url=e[i].getAttribute('href');	// <a>内のリンク先取得
		if(url.indexOf(html + suffix) == 0)
			return url;
	}
	for(var i=0; i<e_length; i++)	//楽曲リストページ以外用ループ
	{
		var url=e[i].getAttribute('href');
		if(url.indexOf(html) == 0)
			return url + suffix;
	}
}
	
function get_music_mdata(achive_list, addr, nextpage, nextsuffix)	//データ取得と次のアドレス
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
					 $(m.find('tbody')[i]).find('td')[4].innerText]
					);
			}
			nextaddr=get_nextpage_address($(data), nextpage, nextsuffix);				
		});

	return nextaddr;
}

function get_collection_data(collection_list, addr, nextpage, nextsuffix)	//データ取得と次のアドレス
{
	var nextaddr="";
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			var m=Array.prototype.slice.call($(data).find('.on')).map(function(x){ return x.innerText.trim()});
			collection_list = Array.prototype.push.apply(collection_list, m);
			nextaddr=get_nextpage_address($(data), nextpage, nextsuffix);				
	});

	return nextaddr;
}

addr=get_nextpage_address($(document), 'data.html', '&d=4');	// プレイヤーデータアドレス
addr=get_your_id(addr, 'music.html', '&d=4');	// プレイヤーデータの取得&EXPERTリストのアドレス取得
addr=get_music_mdata(ex_list, addr, 'music.html', '&d=5');	// EXPERTデータ取得&MASTERリストのアドレス取得
addr=get_music_mdata(ma_list, addr, 'music.html', '&d=6');	// MASTERのデータ取得&Re:MASTERリストのアドレス取得
addr=get_music_mdata(re_list, addr, 'collection.html', '&c=3');	// Re:MASTERのデータ取得&HOMEのアドレス取得
addr=get_collection_data(clist, addr, 'collection.html', '&c=4');	// 称号データ取得＆ネームプレートアドレス取得
addr=get_collection_data(clist, addr, 'home.html', '');	// ネームプレートデータ取得＆Homeアドレス取得

var result_page = document.open();
addr=get_nextpage_address($(document), 'data.html', '&d=4');	// プレイヤーデータアドレス
document.write('id addr:' + addr + '<br>');
addr=get_your_id(addr, 'music.html', '&d=4');	// プレイヤーデータの取得&EXPERTリストのアドレス取得
document.write('expert addr:' + addr + '<br>');
addr=get_music_mdata(ex_list, addr, 'music.html', '&d=5');	// EXPERTデータ取得&MASTERリストのアドレス取得
document.write('master addr:' + addr + '<br>');
addr=get_music_mdata(ma_list, addr, 'music.html', '&d=6');	// MASTERのデータ取得&Re:MASTERリストのアドレス取得
document.write('re:mas addr:' + addr + '<br>');
addr=get_music_mdata(re_list, addr, 'collection.html', '&c=3');	// Re:MASTERのデータ取得&HOMEのアドレス取得
document.write('symbol addr:' + addr + '<br>');
addr=get_collection_data(clist, addr, 'collection.html', '&c=4');	// 称号データ取得＆ネームプレートアドレス取得
document.write('symbol cnt:' + clist.length + '<br>');
document.write('nplate addr:' + addr + '<br>');
addr=get_collection_data(clist, addr, 'home.html', '');	// ネームプレートデータ取得＆Homeアドレス取得
document.write('symbol cnt:' + clist.length + '<br>');
document.write('home addr  :' + addr + '<br>');
document.write('your name : ' + your_id + ' , your rating :' + your_rating + '<br>');
document.close();

	
})(); void(0);
