javascript:
(function()
	{
		var e=document.createDocumentFragment();
		var i=location.hostname.indexOf('maimai-net.com');
		if(i!=-1)
		{
			var level_js=document.createElement('script');
			level_js.src='https://sgimera.github.io/mai_RatingAnalyzer/scripts/mai_inner_level.js';
			e.appendChild(level_js);
			console.log(level_js);

			var analyzer_body=document.createElement('script');
 			analyzer_body.url='https://sgimera.github.io/mai_RatingAnalyzer/scripts/maiRatingAnalyzer_test_body.js';
			e.appendChild(analyzer_body);
			console.log(analyzer_body);
			
			document.getElementsByTagName('head')[0].appendChild(e);

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
