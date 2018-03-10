javascript:
(function()
{

var ex_list=[], ma_list=[], re_list=[], clist=[], addr="", your_id="", your_rating="";

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

function get_next_collection_page_address(j,html,diff)	//次の楽曲リストページを探す
{
	var nextaddr="";
	var e = $(j).find('a');	// hrefが含まれると思われるものlist
	var e_length=e.length;	// その個数
	for(var i=0; i<e_length; i++)	//楽曲リストページ用ループ
	{
		var url=e[i].getAttribute('href');	// <a>内のリンク先取得
		if(url.indexOf(html + "?c=" + diff) == 0)
		{
			return url;
		}
	}
	for(var i=0; i<e_length; i++)	//楽曲リストページ以外用ループ
	{
		var url=e[i].getAttribute('href');
		if(url.indexOf(html) == 0)
		{
			return url + "&c=" + diff;
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
					 $(m.find('tbody')[i]).find('td')[4].innerText]
					);
			}
			if(diff != 6)
				nextaddr=get_nextpage_address($(data), "music.html", diff+1);
			else
				nextaddr=get_next_collection_page_address($(data), "collection.html", 3);				
		});

	return nextaddr;
}

function get_collection_data(collection_list, addr, number)	//データ取得と次のアドレス
{
	var nextaddr="";
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			var m=Array.prototype.slice.call($(data).find('.on')).map(function(x){ return x.innerText.trim()});
			collection_list = Array.prototype.push.apply(collection_list, m);
			if(number != 4)
				nextaddr=get_next_collection_page_address($(data), "collection.html", number+1);
			else
				nextaddr=get_nextpage_address($(data), "home.html", 0);
	});

	return nextaddr;
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

var result_page = document.open();
addr=get_nextpage_address($(document), "music.html", 4);	// EXPERTリストのアドレス取得
document.write(addr + '<br>');
addr=get_music_mdata2(ex_list, addr, 4);	// EXPERTデータ取得&MASTERリストのアドレス取得
document.write(addr + '<br>');
addr=get_music_mdata2(ma_list, addr, 5);	// MASTERのデータ取得&Re:MASTERリストのアドレス取得
document.write(addr + '<br>');
addr=get_music_mdata2(re_list, addr, 6);	// Re:MASTERのデータ取得&HOMEのアドレス取得
document.write(addr + '<br>');
addr=get_collection_data(clist, addr, 3);	// 称号データ取得＆ネームプレートアドレス取得
document.write(addr + '<br>');
addr=get_collection_data(clist, addr, 4);	// ネームプレートデータ取得＆Homeアドレス取得
document.write(addr + '<br>');
tmpstr = get_your_id(addr);
document.write(tmpstr + '<br>');
document.close();

	
})(); void(0);
