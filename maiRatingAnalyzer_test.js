javascript:
(function()
	{
		var e=document;
		var i=location.hostname.indexOf('maimai-net.com');
		if(i!=-1)
		{
			var level_js=e.createElement('script');
			level_js.src='https://sgimera.github.io/mai_RatingAnalyzer/scripts/mai_inner_level.js';
			console.log(level_js);
			e.getElementsByTagName('head')[0].appendChild(level_js);
			
			var analyzer_body=e.createElement('script');
 			analyzer_body.url='https://sgimera.github.io/mai_RatingAnalyzer/scripts/maiRatingAnalyzer_test_body.js';
			console.log(analyzer_body);
			e.getElementsByTagName('head')[0].appendChild(analyzer_body);

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
