javascript:
(function()
	{
		var d=document;
		var i=location.hostname.indexOf('maimai-net.com');
		if(i!=-1)
		{
			var url='https://sgimera.github.io/mai_RatingAnalyzer/scripts/mai_inner_level.js';
			var e=d.createElement('script');
			e.src=url;
 			if(e == d.getElementsByTagName('head')[0].appendChild(e));
			{
				alert("動かない時は2回連続で呼び出してみてください。");
 				url='https://sgimera.github.io/mai_RatingAnalyzer/scripts/maiRatingAnalyzer_body.js';
				e=d.createElement('script');
				e.src=url;
 				d.getElementsByTagName('head')[0].appendChild(e);
			}
 		}
		else
		{
			if(confirm('Do you open maimai.net?'))
			{
				window.open('https://maimai-net.com/');
			}
		}
	})();
void(0);
