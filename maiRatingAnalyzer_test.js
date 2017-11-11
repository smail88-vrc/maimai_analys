javascript:
(function(){
	var i=0,s;
	var urls=["https://sgimera.github.io/mai_RatingAnalyzer/scripts/mai_inner_level.js",
			"https://sgimera.github.io/mai_RatingAnalyzer/scripts/maiRatingAnalyzer_body.js"];
  for(i=0;i<urls.length;i++){
    s= document.createElement("script");
    s.src=urls[i];
    s.onload=function(){return;};
    document.body.appendChild(s);
  };
})();void(0);
