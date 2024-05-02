javascript:

var test='';

let disp_notes_count = [];			//ノーツ数データ
let disp_plus_rslt = [], disp_minus_rslt = [];	//リザルトに対する達成率

const change_data = (datatable) =>
{
	const data = datatable.map((x)=>x.map((y)=>y));
	const totaldata = data.map((x)=>x.pop());
	if(data[3].join("") == "00000") totaldata[3] = "";	// std譜面のtouchのtotaldataを消す
	const sub = (d, o) => ((o==''||o=='　')?o:d);	// 全角スペースはstd譜面の touch/c.perfectのところ。
	const tmptable = Array.from(document.querySelector('.playlog_notes_detail').querySelectorAll('tr')).slice(1);
	Array.from(tmptable, (x,n1)=>Array.from(x.querySelectorAll('td'), (y,n2)=>y.innerHTML=sub(data[n1][n2], y.innerText)));
	document.querySelectorAll('span.totaldata').forEach((x,n)=>x.innerHTML = totaldata[n]);

	//いったんもとに戻す。
	document.querySelectorAll('table.playlog_notes_detail tbody tr td img').forEach((x)=>x.removeAttribute('style'));

	if(data[0].join("") == disp_minus_rslt[0].slice(0,5).join(""))
		document.querySelector('table.playlog_notes_detail tbody tr td img')	// C.PERFECTの画像
			.setAttribute('style', 'display:none; min-width:0px');	// 不可視に
	
	if(data[0].join("") == disp_plus_rslt[0].slice(0,5).join(""))
		document.querySelectorAll('table.playlog_notes_detail tbody tr td img')[4] // MISSの画像
			.setAttribute('style', 'display:none; min-width:0px');	// 不可視に

	document.querySelector(`table.playlog_notes_detail`).classList.remove(`f_l`);
	document.querySelector(`table.playlog_notes_detail`).setAttribute(`style`, `margin:0 auto`);
	return;
}

(function ()
{
	const notes_weight = [[100,100,80,50,0],[100,100,80,50,0],[100,100,80,50,0],[100,100,80,50,0],[100,100,100,80,60,50,40,0]];
	const plustable = [[10,10,8,5,0], [20,20,16,10,0], [30,30,24,15,0], [10,10,8,5,0], [50,50,50,40,30,25,20,0]];
	const plustable_b = [100, 75, 50, 40, 40, 40, 30, 0];
	const minustable = [[0,0,2,5,10], [0,0,4,10,20], [0,0,6,15,30], [0,0,2,5,10], [0,0,0,10,20,25,30,50]];
	const minustable_b = [0, 25, 50, 60, 60, 60, 70, 100];
	
	// 操作用radio button用HTML
	const radiobuttons = 
	      '<div class="f_12 v_m"><form>'
		+ '<input type="radio" name="mode" value="disp_notes_count" onclick="change_data(disp_notes_count)" checked="">ノーツ詳細　'
		+ '<input type="radio" name="mode" value="disp_plus_rslt" onclick="change_data(disp_plus_rslt)">得点(/ノーツ)　'
		+ '<input type="radio" name="mode" value="disp_minus_rslt" onclick="change_data(disp_minus_rslt)">失点(/ノーツ)　'
    		+ '</form></div>'

	/* Fverの50点を1点とするカウントで100%score */
	const score100per = (datat) =>
	{
		let notes = datat.map((x)=>x.reduce((a,b)=>a+b, 0));	//ノーツ数
		return notes[0]*10 + notes[1]*20 + notes[2]*30 + notes[3]*10 + notes[4]*50;
	}
	
	// l:note list [c.perf, perf, great, good, miss]
	const nts2scr = (l) => l[0]*10 + l[1]*10 + l[2]*8 + l[3]*5	// calcNormalNotesScore
	
	
	// brk_lst:break内訳, [2600, 2550, 2500, 2000, 1500, 1250, 1000, 0]の個数
	// returnは%表示の10000倍
	const calcBreakBonus = (brk_list) =>
	{
		const break_count = brk_list.reduce((a,b)=>a+b, 0);	//break数
		let tmp = brk_list[0]*10000+brk_list[1]*7500+brk_list[2]*5000
		+ (brk_list.slice(3,6).reduce((a,b)=>a+b,0))*4000+brk_list[6]*3000;
		return tmp/break_count;
	}

	// brk_lst:break内訳, [2600, 2550, 2500, 2000, 1500, 1250, 1000, 0]の個数
	// return は dxのbreak score (/50)
	const calcBreakScore = (brk_lst) =>
	{
		return brk_lst.slice(0,3).reduce((a,b)=>a+b, 0)*50 + brk_lst[3]*40+brk_lst[4]*30+brk_lst[5]*25+brk_lst[6]*20;
	}


	// returnは%表示の10000倍
	const calcAchiPercent = (nrml_nts_scr, brk_lst, score100) =>
	{
		// dxのbreak score (/50) perfect以上は一律2500で数える
		// brk_lst:break内訳, [2600, 2550, 2500, 2000, 1500, 1250, 1000, 0]の個数	
		return (nrml_nts_scr + calcBreakScore(brk_lst))*1000000/score100 + calcBreakBonus(brk_lst);
	}
	
	// 各種スコアデータから、breakの内訳を”総当たりで”割り出す
	// 表示のBreak内訳からあり得る詳細Break内訳に対して一つずつ達成率を計算し、一致する詳細Break内訳を見つける
	const search_brk_cnt = (score_normal_notes, blk_lst, achi, score100) =>
	{
		let b2550 = blk_lst[1];
		let b2000 = blk_lst[2];
		let b1500 = 0;
		let tmp_achi = 0;
		
		for(b2550=blk_lst[1]; b2550>=0; --b2550)
		{
			for(b2000=blk_lst[2]; b2000>=0; --b2000)
			{
				for(b1500 = blk_lst[2]-b2000; b1500>=0; --b1500)
				{
					let brk_lst = [blk_lst[0], b2550, blk_lst[1]-b2550, b2000, b1500, blk_lst[2]-b2000-b1500, blk_lst[3], blk_lst[4]];
					tmp_achi = Math.floor(calcAchiPercent(score_normal_notes,brk_lst, score100));
					if(achi >= tmp_achi) break;
				}
				if(achi == tmp_achi) break;
			}
			if(achi == tmp_achi) break;
		}
		return new Array(blk_lst[0], b2550, blk_lst[1]-b2550, b2000, b1500, blk_lst[2]-b2000-b1500, blk_lst[3], blk_lst[4]);	
	}

	// 有効桁数処理。切り捨て。
	const disp_sigdigits = (keta) => (n)=> ((n==0)?"0":((Math.floor(n*Math.pow(10, keta))/Math.pow(10, keta)).toFixed(keta)))
	
	const data2disp = (data, disp, keta) =>
	{
		const brklst2brkdata = (n) => [n[0], n[1]+'<br>'+n[2], n[3]+'<br>'+n[4]+'<br>'+n[5], n[6], n[7]];

		let data_break = data.pop();
		data.forEach((x)=>disp.push(x.map(disp_sigdigits(keta))));	//break以外の表示dataを確定
		disp.push(brklst2brkdata(data_break.map(disp_sigdigits(keta))));
		data.push(data_break);
	}

	const data2disp_subscript_count = (base, achi, count) => (base==0)?"0"
		:("<span class='f_12' style='line-height:0'>" + base + "</span><span class='f_11' style='line-height:0; color:black'> <br>× " + count + "</span>"
		  + '<hr style="border-top:1px solid #888; margin:0 -3px">'
		  + "<span class='f_15' style='line-height:1.2em'>" + achi + "</span>");
	
	const data2disp_with_notes = (NoteScore, NoteCount, ScoreData, keta, DispTable) =>
	{
		const HrStr = `<hr style="border:1px solid #c0e5f7; margin:7px -6px">`;
		const brklst2brkdata = (n) => [n[0], n[1]+HrStr+n[2], n[3]+HrStr+n[4]+HrStr+n[5], n[6], n[7]];

		let data_break = ScoreData.pop();	// breakのデータを一時退避
		ScoreData.forEach((x,n1)=>DispTable
				  	.push(x.map((y,n2)=>
						    data2disp_subscript_count(disp_sigdigits(keta+1)(NoteScore[n1][n2]), disp_sigdigits(keta)(y), NoteCount[n1][n2]))));	//break以外の表示dataを確定
		DispTable.push(brklst2brkdata(
			data_break.map((x, n)=>data2disp_subscript_count(disp_sigdigits(keta+1)(NoteScore[4][n]), disp_sigdigits(keta)(x), NoteCount[4][n]))));	//breakの表示dataを確定
		ScoreData.push(data_break);	//breakのデータを元に戻す
	}

	// 履歴ページの短縮化ベース 100%score、通常ノーツ(Break以外)のscore、Break内訳を引数に持つ
	// Score100, ScoreNormalNotes は /50相当の値。
	const transformResultData = (Score100, ScoreNormalNotes, TrueBreakList) =>
	{
		// 各種スコアデータから、表示内容の数字を算出
		const YourScore = ScoreNormalNotes + calcBreakScore(TrueBreakList);	// 100%scoreに対するscore (/50相当)
		const AchiveScore100 = 10000000 * YourScore / Score100;	// 100%scoreに対する達成率 (100% => 10000000)
		const AchiveBreakBonus = calcBreakBonus(TrueBreakList) * 10;	// BreakBonusの達成率  (*100000相当、 1%=>100000)
		const ScoreOldBreak = TrueBreakList[0]*52+TrueBreakList[1]*51+TrueBreakList[2]*50
			+ TrueBreakList[3]*40+TrueBreakList[4]*30+TrueBreakList[5]*25+TrueBreakList[6]*20;	// 旧筐体換算のbreak score (/50)
		const ScoreYourPrev = ScoreNormalNotes + ScoreOldBreak;	// 旧筐体でのscore (/50相当)
		const AchiveOldStyle = 1000000 * ScoreYourPrev / Score100;	// 100%scoreに対する割合 (100% => 1000000)
		const ScoreOver100per = ScoreYourPrev - Score100;	// 100%scoreに対する超過分score (/50相当 100%未満ならマイナス)
		const DXscoreStr = `<span class="f_16 bold" style="font-family:impact; color:green; -webkit-text-stroke:1px white; text-stroke:1px white">DX score</span>`;
		
		const AchiveCarryOn = 100 + (ScoreOver100per / (TrueBreakList.reduce((a,b)=>a+b,0) * 2));

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
		
		// DX score割合計算式
		const dxscstr2ratio = (qs_dxsc) =>
		{
			qs_dxsc.classList.replace("f_15", "f_12");
			qs_dxsc.classList.remove("p_r_5");		
			const dxscstr = qs_dxsc.innerText.replace(/ |,/g, '');
			const dxscper = (Math.floor(dxscstr.split('/').map(Number).reduce((a,b)=>a*10000/b))/100).toFixed(2);
			qs_dxsc.innerText = dxscstr + '(' + dxscper + '%☆' + (dxsc2DxscStar(Number(dxscper)).toFixed(1)) + ')';
		
			return;
		}

		const getPage_callback = (addr, post)=>
		{
			return new Promise((resolve, reject)=>
			{
//				const time = performance.now();
				fetch(addr)
					.then(res => res.text())
					.then(text => new DOMParser().parseFromString(text, "text/html"))
					.then((document) => {
//						console.log(addr, Math.round((performance.now() - time)*10)/10);
						resolve(document);
					});
			});
		}
		
		const getRecodeData = (idx, diffstr) =>
		{
			const addr = "https://maimaidx.jp/maimai-mobile/record/musicDetail/?idx=" + encodeURIComponent(idx);
			return getPage_callback(addr, "")
			.then((page)=>{
					return (page.querySelector(`#` + diffstr));
			})
			.catch(()=>{
				alert('データの取得に失敗した模様。再度ためしてみてください。');
			})
		}
			
		// 幅情報を追加するためのcss追加
		const linkDOM = document.createElement("link");
		linkDOM.setAttribute("rel", "stylesheet");
		linkDOM.setAttribute("media", "all");
		linkDOM.setAttribute("type", "text/css");
		linkDOM.setAttribute("href", "https://sgimera.github.io/mai_RatingAnalyzer/css/maidx_dxsc.css");
		document.querySelector('head').appendChild(linkDOM);
		
		// プレイ履歴のmerginを消す
		document.querySelector("img.title.m_10").classList.remove("m_10");
		
		// VS mark/BOSS markにattribute付与
		document.querySelectorAll("img.playlog_vs")
			.forEach((x)=>x.setAttribute("style", "max-inline-size:16px;"));

		// VS result画像にattributeを付与
		document.querySelectorAll("img.playlog_vs_result")
			.forEach((x)=>x.setAttribute("style", "max-height:16px;"));
		
		// track毎データの上にある難易度やtimestampの情報を加工する
		document.querySelector("img.playlog_diff").setAttribute("style", "max-height:16px");
		document.querySelector("div.sub_title").classList.replace("f_11", "f_10");
		document.querySelector("div.sub_title").setAttribute("style", "line-height: 0.9rem;");
		document.querySelector("div.sub_title").classList.replace("sub_title", "white");
		document.querySelector("span.red.f_b.v_b").classList.remove("red");
		
		// 加工したものをtrack毎データの先頭に移す
		document.querySelectorAll('.playlog_top_container')
			.forEach((x)=>Array.from(x.children)
				 .forEach((y)=>x.parentElement.querySelector("[class$='container']:not(p_r)")
					  .insertBefore(y, x.parentElement.querySelector("div.basic_block"))));
		
		// 元々の難易度やtimestampの情報が置いてあったblockを消す
		document.querySelector('div.playlog_top_container').outerHTML="";

		// 曲名の隙間を調整
		document.querySelector('.basic_block.break')
			.setAttribute("style", "padding: 2px;margin: 2px;");

		// ジャケットの画像サイズ変更
		document.querySelector('.p_r.f_0 img.music_img')
			.setAttribute("style", "width:80px");
		// オトモダチ対戦BOSSの時の枠の画像のサイズを変更
		document.querySelectorAll('.p_r.f_0 img.playlog_music_effect')
			.forEach((x)=>x.setAttribute("style", "width:80px"));
		
		// 新たな曲名要素
		const TitleNode = document.createElement(`span`);
		TitleNode.innerText = document.querySelector(`.basic_block`).innerText;

		// でらっくす/スタンダード種別を画像から取得後、その画像を消す
		const kind_img = document.querySelector('.p_r.f_0 img.playlog_music_kind_icon');
		if(kind_img != null)	// 通常譜面（standard or dx）
		{
			const kind = kind_img.getAttribute(`src`).slice(44,-4)
			// 曲名の背景に譜面種別用の色を付ける
			document.querySelector(`.basic_block.m_5.p_5.p_l_10.f_13.break`).classList.add(`music_title_back_`+ kind);
			// 曲名にclass情報を付与
			TitleNode.classList.add(`music_title_`+ kind);
			// でらっくす/スタンダードの区分の画像を消す
			kind_img.outerHTML = ``;
		}
		else	// 宴譜面
		{
			const utage_kind_block = document.querySelector(`div.playlog_music_kind_icon_utage`);
			// 宴種別とバディ有無 後ろ（バディのはず）の方が強い
			const utage_kind = Array.from(utage_kind_block.querySelectorAll(`img.h_25`)).slice(-1)[0].getAttribute(`src`).slice(44,-4);
			// 曲名の背景に譜面種別用の色を付ける
			document.querySelector(`.basic_block.m_5.p_5.p_l_10.f_13.break`).classList.add(`music_title_back_`+ utage_kind);	// 後ろの方の種別
			// 曲名にclass情報を付与
			TitleNode.classList.add(`music_title_`+ utage_kind);
			// 宴種別のアイコンを消す
			utage_kind_block.outerHTML=``;
		}
		
		// 空にしてから新たな曲名要素を追加
		document.querySelector(`.basic_block`).innerHTML = "";
		document.querySelector(`.basic_block`).appendChild(TitleNode);

		// Rank new recordの画像を祖要素に紐づけ
		document.querySelectorAll('.p_r.f_0 img.playlog_achievement_newrecord')
			.forEach((x)=>{x.setAttribute("style","top: 4px; left: 125px; right:unset;");
				       x.parentElement.parentElement.appendChild(x);});
		
		// Rankの画像を祖要素に紐づけ
		document.querySelectorAll('.p_r.f_0 img.playlog_scorerank')
			.forEach((x)=>{x.setAttribute("style","top:20px; left:104px; right:unset;");
				       x.parentElement.parentElement.appendChild(x);});
		
		// 達成率の文字列を祖要素に紐づけ
		document.querySelectorAll('.p_r.f_0 div.playlog_achievement_txt')
			.forEach((x)=>{x.setAttribute("style","top:32px; left:92px; right:unset; width:104px; font-size:25px;");
				       x.querySelector("span.f_20").classList.replace("f_20", "f_15");
				       x.parentElement.parentElement.appendChild(x);});
		
		// 段位認定&Perfect ChallengeのLife表示を新規生成 (Lifeの画像は使わない）
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
		document.querySelector('.p_r.f_0 div.playlog_score_block ')
			.setAttribute("style","width: 235px;");
		
		// ”でらっくスコア”の画像を文字に変更
		document.querySelectorAll(`img.w_80:not(.m_t_10):not(.f_r)`).forEach((x)=>x.outerHTML= DXscoreStr);

		// DXscoreの星の表示位置を変更
		document.querySelectorAll('.p_r.f_0 img.playlog_deluxscore_star')
			.forEach((x)=>x.setAttribute("style","top: 32px; right: 4px;"));
		
		// DXsocre new recordの画像の表示位置を変更
		document.querySelectorAll('.p_r.f_0 img.playlog_deluxscore_newrecord')
			.forEach((x)=>x.setAttribute("style","top: -4px; right: 10px;"));
		
		// 不要なblockを消去
		document.querySelector(".p_r.f_0 div.playlog_result_block").outerHTML="";
		
		
		// DX score割合計算
		dxscstr2ratio(document.querySelector('.p_r_5.f_15.f_r'));

		// バディ譜面以外の時は、旧筐体換算の計算を行う。
		if(document.querySelector(`div.music_title_back_utage_buddy`) == null)
		{
			// 点線を追加
			const new_hr = document.createElement("hr");
			new_hr.setAttribute("style", "margin:5px; border:1px dashed #FFFFFF;");
			document.querySelector("[class$='container']").appendChild(new_hr);
			
			// スコア内訳表示部追加
			const Div_AchiField = document.createElement("div");
			Div_AchiField.classList.add("playlog_achievement_txt", "t_c");
			Div_AchiField.setAttribute("style", "position:unset; width:unset; font-size:unset");
			// 表示内容生成
			const Span_AchiText = document.createElement("span");
			Span_AchiText.setAttribute("style", "line-height:1.0rem; font-size:13px");
			let Text_Achi = "内訳 : "
				+ disp_sigdigits(5)(Math.floor(AchiveScore100+AchiveBreakBonus)/100000) + "% = "
				+ disp_sigdigits(5)(Math.floor(AchiveScore100)/100000) + "% [" + (YourScore*50) + "/" + (Score100*50) + "] + "
				+ disp_sigdigits(5)(Math.floor(AchiveBreakBonus)/100000) + "%";
			// スタンダード譜面の時は旧筐体換算を表示する
			if(document.querySelector(`div.music_title_back_standard`) != null)
			{
				Text_Achi += "<hr style='margin:5px; border:1px dashed #FFFFFF;'>"
					+ "旧筐体 : "
					+ disp_sigdigits(4)(Math.floor(AchiveOldStyle)/10000) + "% [" + (ScoreYourPrev*50) + "/" + (Score100*50) + "]";
				if(ScoreOver100per >= 0)	// 旧筐体換算が100%越えの時は、引継達成率を計算した物を表示
				{
					Text_Achi += "<br>引継 : "
						+ disp_sigdigits(4)(AchiveCarryOn) + "% [" + (ScoreOver100per/2) + "/" + (TrueBreakList.reduce((a,b)=>a+b,0)) + "]";
				}
			}
			Span_AchiText.innerHTML = Text_Achi;
			// 表示
			Div_AchiField.appendChild(Span_AchiText);
			document.querySelector("[class$='container']").appendChild(Div_AchiField);
		}
		
		// Best Recodeデータを表示
		getRecodeData(document.querySelector(`form.d_ib input`).value, document.querySelector("img.playlog_diff").src.slice(43,-4))
  		.then((data)=>
    		{
			// 点線の準備
			const HrDash=document.createElement(`hr`);
			HrDash.setAttribute(`style`, "margin:5px; border:1px dashed #FFFFFF;")
			// 点線の追加
			document.querySelector("[class$='container']").appendChild(HrDash);

			// 必要データの追加
			data.querySelector(`img.h_20.f_l`).outerHTML="";
			data.querySelectorAll(`img.music_kind_icon`).forEach((x)=>x.outerHTML="");	// 通常譜面用
			data.querySelectorAll(`div.music_kind_icon_utage`).forEach((x)=>x.outerHTML="");	// 宴譜面用
			data.querySelector(`div.clearfix`).outerHTML=""
			Array.from(data.children).forEach((x)=>document.querySelector("[class$='container']").appendChild(x));

			const BestDxsc = document.querySelector(`div.w_310`);
			const DxscStr = BestDxsc.innerText.replace(/ |,|\(.+\)/g, ``).trim();	// 表示されているでらっくスコアを加工
			const DxscRatioStr = DxscStr.split(`/`).map(Number).reduce((a,b)=>Math.floor(a*10000/b)/100);	// でらっくスコア割合算出して、%に加工
			const TxtDxscStr = document.createTextNode(DxscStr + `(` + DxscRatioStr.toFixed(2) + `% ☆`
								   + dxsc2DxscStar(DxscStr.split(`/`).map(Number).reduce((a,b)=>a*100/b)).toFixed(1) + `)`);	// 格納文字列に変更
			const ImgDxsc = BestDxsc.querySelector("img.v_m").cloneNode(false);	// でらっくスコアの画像をコピー
			const ImgDxscstar = BestDxsc.querySelector(".w_80.f_r");	// 星の画像（☆0はその分の空白div）をコピー

			BestDxsc.innerHTML = "";	// 一旦中身を消す
			BestDxsc.appendChild(ImgDxsc);	// でらっくスコアの画像を格納
			BestDxsc.appendChild(ImgDxscstar);	// ☆の画像を格納
			BestDxsc.appendChild(TxtDxscStr);	// でらっくスコアのデータを格納

			// 表示幅の変更
			document.querySelector(`div.music_score_block.w_120.d_ib`).classList.replace(`w_120`, `w_96`);
			document.querySelector(`div.music_score_block.w_310.d_ib`).classList.replace(`w_310`, `w_340`);
      		});
		return;	
	}

	if(document.querySelector('.oldstyle') != null)
		return;	//実行済みなので何もせずに終了。


	let datatable = Array.from(document.querySelector('.playlog_notes_detail').querySelectorAll('tr'),
			   (x)=>Array.from(x.querySelectorAll('td'), (y)=>Number(y.innerText))).slice(1)
	const notes_count = datatable.map((x)=>x.reduce((a,b)=>a+b));	// 全ノーツ数
	
	let achivement = Number(document.querySelector('.playlog_achievement_txt').innerText.replace(/\.|%/g, ''));	//小数点無の最大1010000表示

	const score_tap = nts2scr(datatable[0]);
	const score_hold = nts2scr(datatable[1]) * 2;
	const score_slide = nts2scr(datatable[2]) * 3;
	const score_touch = nts2scr(datatable[3]);
	const nrml_nts_scr = score_tap+score_hold+score_slide+score_touch;
	const score100 = score100per(datatable);
	const true_brk_lst = search_brk_cnt(score_tap+score_hold+score_slide+score_touch, datatable[4], achivement, score100);	//break個数詳細

	// 達成率部分（とその上）の表示内容変更
	transformResultData(score100, nrml_nts_scr, true_brk_lst);

	// バディ譜面以外の時は、ノーツ詳細の計算を行う。
	if(document.querySelector(`div.music_title_back_utage_buddy`) == null)
	{
		// ノーツ数の処理
		datatable.pop();	// 元々のbreak個数データは捨てる
		datatable.push(true_brk_lst);	// break詳細データを追加 表示ノーツ数確定
		data2disp(datatable, disp_notes_count, 0);	// 確定したノーツ数を disp_notes_countにコピー
		
		datatable.map((x,n1)=>(x.map((y,n2)=>y*notes_weight[n1][n2])).reduce((a,b)=>a+b)/100)
			.forEach((x,n)=> disp_notes_count[n].push(x + '/' + notes_count[n]));
		disp_notes_count[4][5] += "\n\+" + disp_sigdigits(5)(calcBreakBonus(true_brk_lst)/10000);
		
		// 得点関連の処理
		// ノーツあたりの達成率+ 
		let plus_table_data = plustable.map((x)=>x.map((n)=>n*100/score100));
		let plus_table_break_data = plustable_b.map((n)=>n/(true_brk_lst.reduce((a,b)=>a+b,0))/100);	// break bonus分の達成率計算
		plus_table_break_data = plus_table_data[4].map((x,n)=>x+plus_table_break_data[n]);	// breakの達成率のデータを合計する
		plus_table_data.pop();	//元々のbreak数データを捨てる
		plus_table_data.push(plus_table_break_data);	//plus_table_dataにbreak詳細のdataを追加
		// break bonusを含む 得点/ノーツ
		let plus_table_rslt = datatable.map((x,n1)=>(x.map((y,n2)=>y*plus_table_data[n1][n2])));
		data2disp_with_notes(plus_table_data, datatable, plus_table_rslt, 5, disp_plus_rslt);
		disp_plus_rslt.map((x,n)=>x.push(disp_sigdigits(5)(plus_table_rslt[n].reduce((a,b)=>a+b,0))
						 + `<hr style="border-top:1px solid #888; margin:0 -3px">`
						 + 　disp_sigdigits(5)(((n!=4)?0:1) + notes_count[n]*plustable[n][0]*100/score100)));	/* tete */
	
		// 失点関連の処理
		let minus_table_data = minustable.map((x)=>x.map((n)=>n*100/score100));
		let minus_table_break_data = minustable_b.map((n)=>n/(true_brk_lst.reduce((a,b)=>a+b,0))/100);	// break bonus分の達成率計算
		minus_table_break_data = minus_table_data[4].map((x,n)=>x+minus_table_break_data[n]);	// breakの達成率のデータを合計する
		minus_table_data.pop();	//元々のbreak数データを捨てる
		minus_table_data.push(minus_table_break_data);	//minus_table_dataにbreak詳細のdataを追加
		// break bonusを加味した 失点/ノーツ
		let minus_table_rslt = datatable.map((x,n1)=>(x.map((y,n2)=>y*minus_table_data[n1][n2])));
		data2disp_with_notes(minus_table_data, datatable, minus_table_rslt, 5, disp_minus_rslt);
		disp_minus_rslt.map((x,n)=>x.push(disp_sigdigits(5)(minus_table_rslt[n].reduce((a,b)=>a+b,0))))
	
		// radio button追加
		let tablearea = document.querySelector('div.p_5 > table.playlog_notes_detail').outerHTML;
		document.querySelector('div.p_5 > table.playlog_notes_detail').outerHTML = radiobuttons + tablearea;
	
		// C.perfect列の最低幅定義を無効化
		document.querySelectorAll('.playlog_notes_detail tbody tr')
			.forEach((x)=>x.querySelectorAll('td').forEach((y)=>y.setAttribute('style', 'min-width:30px')))
	
		// note数表示の文字サイズを変更
		document.querySelector('.playlog_notes_detail').classList.replace("f_11", "f_15");
		// note種別の下に表示データを格納するためのspanを追加
		document.querySelector('.playlog_notes_detail').querySelectorAll('th.f_0')
			.forEach((x)=>{x.innerHTML += "<br><span class='totaldata'></span>"; x.classList.replace("f_0", "f_10");});
		
		change_data(disp_notes_count);	// ノーツ数データ
	}
	
	// 通常譜面の時はノーツ内訳の計算／表示や境界達成率レポートのボタンの表示を行う。
	if(document.querySelector(`img.playlog_diff`).src.slice(43,-4) != "utage")
	{
		// このblockは宴譜面のnoteの計算が成功しても無効化
		document.querySelector('div.playlog_rating_detail_block').outerHTML +=
			'<div class=clearfix></div>'
			+ '<div class="f_13">'
			+ '<button class="f_13" onClick="makeReportOfBorderAchivements('
			+ '[' + notes_count.join(", ")
			+ '])">境界達成率レポート生成</button>'
			+ '</div>';
	}
	

	document.querySelector('div.spmenu_toggle').outerHTML="";
	document.querySelectorAll(`[id^='page']`).forEach((x)=>x.outerHTML="");	
	
	return;
}
)(); void(0);

const makeReportOfBorderAchivements = (note_count) =>
{
	const notification = "別ウインドウに境界達成率を出すためのノーツデータを表示させます。\n"
		+ "境界達成率とは、clear Rankが変わる寸前の達成率を意味します。\n"
		+ "検証用データであり、普通は意味がありません。\n"
		+ "OKで続けます。キャンセルで止めます。" 

	if(!confirm(notification)) return;	// 処理中止
	const score100 = note_count[0]*10 + note_count[1]*20 + note_count[2]*30 + note_count[3]*10 + note_count[4]*50;   

	// tgtachi:目標達成率、%を10000倍にした数字 101.0000% => 1010000
	const sub = (tgtachi) =>
	{
		// data配列を文字列化
		//[失点, Perfect数, 50落ち数, Great数, Good数, Miss数, ノーツ達成割合, BreakBonus達成割合]
		// 割合の物は%ではなく小数
		const sub2 = (arr) =>
		{
			// Perf/Missのみと、Great/Good入りの境目
			if(arr.length==0) return "<tr><td colspan=11></td></tr>\n";

			return `<tr style="text-align:right;">`
			+ `<td>` + arr[0] + `</td>\n`
			+ `<td>[</td>\n`
			+ `<td>` + arr[1] + `</td>\n`
			+ `<td>(` + (arr[2]*50) + `),</td>\n`
			+ `<td>` + arr[3] + `,</td>\n`
			+ `<td>` + arr[4] + `,</td>\n`
			+ `<td>` + arr[5] + `</td>`
			+ `<td>]</td>\n`
			+ `<td>` + (Math.round(arr[6]*10000000)/100000).toFixed(5) + `%</td><td>+</td>\n`
			+ `<td>` + (arr[7].toFixed(5)) + `%</td>`
			+ `</tr>`			
		}
		
		return `<table style="font-size:14px;">`
			+ ScoreData4TgtAchi(note_count, tgtachi).map(sub2).join("\n")
			+ `</table>`;
	}

	const DivTitle = document.querySelector(`[class^=music_title]`);
	const TitleStr = DivTitle.innerText.trim() + `[` + DivTitle.classList[0].slice(12) + `]`;

	const report_top_comment = `<meta name="viewport" content="width=480, user-scalable=no">`
		+ '<style type="text/css">'
		+ 'body{font-family:sans-serif; background-color:#51bcf3; font-size:14px;}'
		+ '</style>'
	        + "境界達成率レポート<br><br>"
		+ "Rankの境界となる達成率を出すために必要なResultです。<br>"
		+ "境界の達成率は、Rating算出時の係数が変わることが知られています。<br>"
		+ "何も記載がなければ（基本的に）達成不可能です。<br>"
		+ "普通には実現不可能な物も含みますが、計算結果ということでご了承を。<br><hr>"
		+ DivTitle.innerText.trim() + `[` + DivTitle.classList[0].slice(12) + `]`
		+ "<br>"
		+ "難易度 "
		+ document.querySelector('img.playlog_diff').getAttribute("src").slice(43,-4) + "<br>"
		+ "TAP   : " + note_count[0] + "<br>"
		+ "HOLD  : " + note_count[1] + "<br>"
		+ "SLIDE : " + note_count[2] + "<br>"
		+ "TOUCH : " + note_count[3] + "<br>"
		+ "BREAK : " + note_count[4] + "<br>"
		+ "<br>"
		+ "旧筐体 100% score : " + (score100 * 50) + "<br>"
		+ "<hr>"
		+ "失点 :<br> Break以外のノーツと<b>Break Great</b>合計失点（旧筐体換算）<br>"
		+ "Break内訳 :<br> [C.PerfectとPerfect (旧筐体換算の失点）, Great, Good, ,Miss]<hr>";
	
	const resultAchieve = document.querySelector("div.playlog_achievement_txt.t_r").innerText;
	const AchiNum = Number(resultAchieve.replace(/\.|%/g, ""));
	
	const ReportWindow = window.open();
	ReportWindow.document.write(report_top_comment);
	ReportWindow.document.write("目標達成率 : 100.4999%<br>通常ノーツ失点, Break内訳<br>" + sub(1004999) + "<hr>");	// SSS+寸
	ReportWindow.document.write("目標達成率 :  99.9999%<br>通常ノーツ失点, Break内訳<br>" + sub( 999999) + "<hr>");	// SSS寸
	ReportWindow.document.write("目標達成率 :  99.4999%<br>通常ノーツ失点, Break内訳<br>" + sub( 994999) + "<hr>");	// SS+寸
	ReportWindow.document.write("目標達成率 :  98.9999%<br>通常ノーツ失点, Break内訳<br>" + sub( 989999) + "<hr>");	// SS寸
	ReportWindow.document.write("目標達成率 :  97.9999%<br>通常ノーツ失点, Break内訳<br>" + sub( 979999) + "<hr>");	// S+寸
	ReportWindow.document.write("目標達成率 :  96.9999%<br>通常ノーツ失点, Break内訳<br>" + sub( 969999) + "<hr>");	// S寸
	ReportWindow.document.write("目標達成率 :  93.9999%<br>通常ノーツ失点, Break内訳<br>" + sub( 939999) + "<hr>");	// AAA寸
	ReportWindow.document.write("目標達成率 :  89.9999%<br>通常ノーツ失点, Break内訳<br>" + sub( 899999) + "<hr>");	// AA寸
	ReportWindow.document.write("目標達成率 :  79.9999%<br>通常ノーツ失点, Break内訳<br>" + sub( 799999) + "<hr>");	// A寸
	ReportWindow.document.write("今回達成率 : " + resultAchieve + "<br>通常ノーツ失点, Break内訳<br>" + sub(AchiNum) + "<hr>");	// 今回のデータ
	ReportWindow.document.close();
	return;
}