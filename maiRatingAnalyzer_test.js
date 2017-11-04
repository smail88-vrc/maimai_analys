javascript:
(function()
	{
		var i=location.hostname.indexOf('maimai-net.com');
		if(i!=-1)
		{
			var e=document.createElement('script');
			var url='https://sgimera.github.io/mai_RatingAnalyzer/scripts/mai_inner_level.js';
			e.src=url;
 			if(e == document.getElementsByTagName('head')[0].appendChild(e));
			{
 				url='https://sgimera.github.io/mai_RatingAnalyzer/scripts/maiRatingAnalyzer_test_body.js';
				e.src=url;
 				document.getElementsByTagName('head')[0].appendChild(e);
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
