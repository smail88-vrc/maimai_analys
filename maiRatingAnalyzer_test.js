javascript:
(function()
	{
		var e=document.createDocumentFragment();
		var i=location.hostname.indexOf('maimai-net.com');
		if(i!=-1)
		{
			var level_js=$("<script>", {src:"https://sgimera.github.io/mai_RatingAnalyzer/scripts/mai_inner_level.js"});
			$.find('head')[0].append(level_js);
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
