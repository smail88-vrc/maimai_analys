javascript:
(function()
{

var ex_list=[], ma_list=[], re_list=[], nextaddr="";

function address_musiclist(j,diff)
{
	var e = $(j).find('a');
	var e_length=e.length;
	for(var i=0; i<e_length; i++)
	{
		var url=e[i].getAttribute('href');
		if(url.indexOf("music.html?d=" + diff) == 0)
		{
			nextaddr=url;
			return;
		}
	}
	for(var i=0; i<e_length; i++)
	{
		var url=e[i].getAttribute('href');
		if(url.indexOf("music.html") == 0)
		{
			nextaddr=url + "&d=" + diff;
			return;
		}
	}
}

function get_music_mdata(achive_list) 
{
	$.post(nextaddr).done(function(data)
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
	});

	return;
}

address_musiclist($(document),4);
get_music_mdata(ex_list);
address_musiclist($(document),5);
get_music_mdata(ma_list);
address_musiclist($(document),6);
get_music_mdata(re_list);
})()
