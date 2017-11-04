javascript:
(function()
	{
		var i=location.hostname.indexOf('maimai-net.com');
		if(i!=-1)
		{
			var level_js=document.createElement('script');
			level_js.src='https://sgimera.github.io/mai_RatingAnalyzer/scripts/mai_inner_level.js';
			document.getElementsByTagName('head')[0].appendChild(level_js);

			var analyzer_body=level_js.createElement('script');
 			analyzer_body.url='https://sgimera.github.io/mai_RatingAnalyzer/scripts/maiRatingAnalyzer_test_body.js';
			document.getElementsByTagName('head')[0].appendChild(analyzer_body);

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
