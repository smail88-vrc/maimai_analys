javascript:
(function ()
{
	const addDxscRatio = (w310) =>
	{
		const DxscStr = w310.innerText.replace(/ |,|\(.+\)/g, ``).trim();	// 表示されているでらっくスコアを加工
		const DxscRatioStr = DxscStr.split(`/`).map(Number).reduce((a,b)=>Math.floor(a*10000/b)/100);	// でらっくスコア割合算出して、%に加工
		const TxtDxscStr = document.createTextNode(DxscStr + `(` + DxscRatioStr.toFixed(2) + `%)`);	// 格納文字列に変更
		const ImgDxsc = w310.querySelector("img.v_m").cloneNode(false);	// でらっくスコアの画像をコピー
		const ImgDxscstar = w310.querySelector(".w_80.f_r");	// 星の画像（☆0はその分の空白div）をコピー

		w310.innerHTML = "";	// 一旦中身を消す
		w310.appendChild(ImgDxsc);	// でらっくスコアの画像を格納
		w310.appendChild(ImgDxscstar);	// ☆の画像を格納
		w310.appendChild(TxtDxscStr);	// でらっくスコアのデータを格納
		
		return;
	}
	// でらっくスコアのblockを探して addDxscRatioを実行
	document.querySelectorAll(`div.w_310`).forEach(addDxscRatio);

	// 何かを消す
	document.querySelectorAll('div.spmenu_toggle').forEach((x)=>x.outerHTML="");
	document.querySelectorAll('nav.spmenu_navigation').forEach((x)=>x.outerHTML="");
	document.querySelectorAll(`img[id^='page']`).forEach((x)=>x.outerHTML="");
}
)(); void(0);