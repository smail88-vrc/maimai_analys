javascript:
(function ()
{
	if(document.querySelectorAll('div.p_r.f_0 img.w_84').length < 1)
		{	alert('実行済みです'); return;	}

	// DX score割合計算式
	const dxscstr2ratio = (qs_dxsc) =>
	{
		// DxscRatioからDxscStarを算出 argsは%の値そのまま　5以上も出す。(99%:6, 100%:7) 
		const dxsc2DxscStar = (x) =>
		{
			const calcLinearValue = (basis, max, gap, n) => basis+(max-basis)*n/gap;
			const star10 = (x >= 100)?70
					:(x >= 99)?calcLinearValue(60, 70, 1, x-99)
					:(x >= 97)?calcLinearValue(50, 60, 2, x-97)
					:(x >= 95)?calcLinearValue(40, 50, 2, x-95)
					:(x >= 93)?calcLinearValue(30, 40, 2, x-93)
					:(x >= 90)?calcLinearValue(20, 30, 3, x-90)
					:(x >= 85)?calcLinearValue(10, 20, 5, x-85)
					:calcLinearValue(0,10, 85, x);
			return Math.floor(star10)/10;
		}
		
		qs_dxsc.classList.replace("f_15", "f_12");
		qs_dxsc.classList.remove("p_r_5");		
		const dxscstr = qs_dxsc.innerText.replace(/ |,/g, '');
		const dxscper = (Math.floor(dxscstr.split('/').map(Number).reduce((a,b)=>a*10000/b))/100).toFixed(2);
		qs_dxsc.innerText = dxscstr + '(' + dxscper + '%☆' + (dxsc2DxscStar(Number(dxscper)).toFixed(1)) + ')';
		
		return;
	}
	
	if(document.querySelectorAll('div.spmenu_toggle').length == 0)
		return;	// 実行済みのはずなので、何もせずに終了

	// 幅情報を追加するためのcss追加
	const linkDOM = document.createElement("link");
	linkDOM.setAttribute("rel", "stylesheet");
	linkDOM.setAttribute("media", "all");
	linkDOM.setAttribute("type", "text/css");
	linkDOM.setAttribute("href", "https://sgimera.github.io/mai_RatingAnalyzer/css/maidx_dxsc.css");
	document.querySelector('head').appendChild(linkDOM);
	
	// DX score割合計算
	document.querySelectorAll('.p_r_5.f_15.f_r').forEach((x)=>dxscstr2ratio(x));

	// 譜面データ間の隙間を調整
	document.querySelectorAll('div.p_10.t_l.f_0.v_b')
		.forEach((x)=>{x.setAttribute("style", "padding: 2px 10px 2px 10px"); x.classList.toggle("p_10");});

	// 曲名の隙間を調整
	document.querySelectorAll('.basic_block.break')
		.forEach((x)=>x.setAttribute("style", "padding: 2px;margin: 2px;"));

	// 詳細のボタンを不可視に
	document.querySelectorAll('div.p_r.f_0 img.w_84')
		.forEach((x)=>x.toggleAttribute("src"));

	// 元達成率Blockを不可視に
	document.querySelectorAll(".p_r.f_0 div.playlog_result_block")
		.forEach((x)=>x.setAttribute("style", "display:none"));


	// formを祖要素に紐づけ
	document.querySelectorAll(".p_r.f_0 form")
		.forEach((x)=>{x.toggleAttribute("class"); x.parentElement.parentElement.appendChild(x);})

	// jacket関連の画像をformのbutton内に移動
	document.querySelectorAll('.p_r.f_0 img.music_img')
		.forEach((x)=>{x.setAttribute("style", "width:80px");
				x.parentElement.querySelector("button").appendChild(x);});
	document.querySelectorAll('.p_r.f_0 img.playlog_music_effect')
		.forEach((x)=>{x.setAttribute("style", "width:80px");
				x.parentElement.querySelector("button").appendChild(x);});
	
	// 曲名に飾り付けを行う
	document.querySelectorAll(`.basic_block.m_5.p_5.p_l_10.f_13.break`).forEach((x)=>{
		// 新たな曲名要素
		const TitleNode = document.createElement(`span`);
		TitleNode.innerText = x.innerText;

		const kind_img = x.parentElement.querySelector('.p_r.f_0 img.playlog_music_kind_icon')
		if(kind_img != null)	// 通常譜面（standard or dx）
		{
			const kind = kind_img.getAttribute(`src`).slice(44,-4)
			// 曲名の背景に譜面種別用の色を付ける
			x.classList.add(`music_title_back_`+ kind);
			// 曲名にclass情報を付与
			TitleNode.classList.add(`music_title_`+ kind);
			// でらっくす/スタンダードの区分の画像を消す
			kind_img.outerHTML = ``;
		}
		else	// 宴譜面
		{
			const utage_kind_block = x.parentElement.parentElement.querySelector(`div.playlog_music_kind_icon_utage`);
			// 宴種別とバディ有無 後ろ（バディのはず）の方が強い
			const utage_kind = Array.from(utage_kind_block.querySelectorAll(`img.h_25`)).slice(-1)[0].getAttribute(`src`).slice(44,-4);
			// 曲名の背景に譜面種別用の色を付ける
			x.classList.add(`music_title_back_`+ utage_kind);	// 後ろの方の種別
			// 曲名にclass情報を付与
			TitleNode.classList.add(`music_title_`+ utage_kind);
			// 宴種別のアイコンを消す
			utage_kind_block.outerHTML=``;
		}

		// 空にしてから新たな曲名要素を追加
		x.innerHTML = "";
		x.appendChild(TitleNode);
		
	});
	
	// でらっくす/スタンダード種別を画像を消す

		// Rankの画像を祖要素に紐づけ
	document.querySelectorAll('.p_r.f_0 img.playlog_scorerank')
		.forEach((x)=>{x.setAttribute("style","top:20px; left:104px; right:unset;");
				x.parentElement.parentElement.appendChild(x);});
	
	// 達成率の文字列を祖要素に紐づけ
	document.querySelectorAll('.p_r.f_0 div.playlog_achievement_txt')
		.forEach((x)=>{x.setAttribute("style","top:32px; left:92px; right:unset; width:104px; font-size:25px;");
			x.querySelector("span.f_20").classList.replace("f_20", "f_15");
			x.parentElement.parentElement.appendChild(x);});

	// Rank new recordの画像を祖要素に紐づけ
	document.querySelectorAll('.p_r.f_0 img.playlog_achievement_newrecord')
		.forEach((x)=>{x.setAttribute("style","top: 4px; left: 125px; right:unset;");
				x.parentElement.parentElement.appendChild(x);});

	// Lifeの画像を不可視に
	document.querySelectorAll("img.w_96.m_b_3").forEach((x)=>x.toggleAttribute("src"));


	// 段位認定&Perfect ChallengeのLife表示を新規生成 
	document.querySelectorAll('div.playlog_life_block')
		.forEach((x)=>{x.classList.add("p_a");
			       x.setAttribute('style',
					      "top: 60px;left: 130px;height:24px;width: 72px;background:rgba(32,32,32,0.7);\
						line-height:24px;text-align:right;border-radius:14px;padding-right:8px;");
			       x.parentElement.parentElement.parentElement.appendChild(x);});


	// 段位認定&Perfect Challengeの画像を移動
	document.querySelectorAll('img.h_30.p_l_5')
		.forEach((x)=>{x.classList.add("p_a");
			       x.setAttribute('style', "top:56px; left:80px");
			       x.parentElement.parentElement.parentElement.appendChild(x);});


	// score blockを祖要素に紐づけ
	document.querySelectorAll('.p_r.f_0 div.playlog_result_innerblock')
		.forEach((x)=>{x.setAttribute("style","margin: 0px 0px 3px 5px; position:absolute; top:5px; left:200px");
			x.parentElement.parentElement.appendChild(x);});

	// DXscoreの領域の横幅を固定
	document.querySelectorAll('.p_r.f_0 div.playlog_score_block ')
		.forEach((x)=>x.setAttribute("style","width: 235px;"))
	
	// ”でらっくスコア”の画像を文字に変更
	document.querySelectorAll(`img.w_80:not(.f_r)`)
		.forEach((x)=>x.outerHTML=
			 `<span class="f_16 bold" style="font-family:impact; color:green; -webkit-text-stroke:1px white; text-stroke:1px white">DX score</span>`);
	
	// DXscoreの星の表示位置を変更
	document.querySelectorAll('.p_r.f_0 img.playlog_deluxscore_star')
		.forEach((x)=>x.setAttribute("style","top: 32px; right: 4px;"));
	
	// DXsocre new recordの画像の表示位置を変更
	document.querySelectorAll('.p_r.f_0 img.playlog_deluxscore_newrecord')
		.forEach((x)=>x.setAttribute("style","top: -4px; right: 10px;"));

	// VS mark/BOSS markにattribute付与
	document.querySelectorAll("img.playlog_vs")
		.forEach((x)=>x.setAttribute("style", "max-inline-size:16px;"));

	// VS result画像にattributeを付与
	document.querySelectorAll("img.playlog_vs_result")
		.forEach((x)=>x.setAttribute("style", "max-height:16px;"));

	// データの枠の下だけpaddingを0pxにする
	document.querySelectorAll(`[class$='container']`).forEach((x)=>x.setAttribute("style", "padding:4px 4px 0px 4px"));	

	// play時のtimestampを加工
	document.querySelectorAll("img.playlog_diff").forEach((x)=>x.setAttribute("style", "max-height:16px"));
	document.querySelectorAll("div.sub_title").forEach((x)=>x.classList.replace("f_11", "f_10"));
	document.querySelectorAll("div.sub_title").forEach((x)=>x.setAttribute("style", "line-height: 0.9rem;"));
	document.querySelectorAll("div.sub_title").forEach((x)=>x.classList.replace("sub_title", "white"));
	document.querySelectorAll("span.red.f_b.v_b").forEach((x)=>x.classList.toggle("red"));

	// 加工したものをtrack毎データの先頭に移す
	document.querySelectorAll('.playlog_top_container')
		.forEach((x)=>Array.from(x.children)
			 .forEach((y)=>x.parentElement.querySelector("[class$='container']:not(p_r)")
				  .insertBefore(y, x.parentElement.querySelector("div.basic_block"))));

	// 元々の難易度やtimestampの情報が置いてあったblockを不可視に
	document.querySelectorAll('div.playlog_top_container')
		.forEach((x)=>x.setAttribute("style", "display:none"));

	// 何かを消す
	document.querySelectorAll('div.spmenu_toggle').forEach((x)=>x.outerHTML="");
	document.querySelectorAll(`[id^='page']`).forEach((x)=>x.outerHTML="");
	
	alert ("アイコンをTAPすると、詳細ページに移動します。\n");
	
	return;
}
)(); void(0);