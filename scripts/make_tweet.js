javascript:

function make_tweet()
{
	var t_str="";
	var dlist=$.find('.tweet_info').map(function(x){return x.innerText.trim().replace(/\n/g, "")})

	t_str += dlist[0] + "%0D%0A";
	t_str += "Rating%3a"+ dlist[1] + "%0D%0A";
	t_str += "BEST平均%3a" + dlist[2] + "%0D%0A";
	t_str += "BEST下限%3a" + dlist[3] + "%0D%0A";
	t_str += "HIST下限%3a" + dlist[4] + "%0D%0A";
	t_str += "予想到達Rating%3a" + dlist[5] + "%0D%0A";
	t_str += "B%3a" + dlist[6].replace(/\(.*?\)/, "") + "%20%2B%20";		t_str += "R%3a" + dlist[7].replace(/\(.*?\)/, "") + "%20%2B%20";
	t_str += "H%3a" + dlist[8].replace(/\(.*?\)/, "") + "%0D%0A";

	return t_str;
}
