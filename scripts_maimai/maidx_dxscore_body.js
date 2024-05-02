javascript:

var test='';

const recalc_dxscdiff = (num) =>
{
	const dxsc_border = (maxdxsc, n) =>
		Math.ceil(maxdxsc * ((n==7)?1:(n==6)?0.99:(n==5)?0.97:(n==4)?0.95:(n==3)?0.93:(n==2)?0.9:0.85));

	document.querySelectorAll('.dxscdiff2').forEach((x)=>{
		const ValueArr = x.parentElement.parentElement.querySelector(`div.music_name_block`).getAttribute(`value`).split(`,`);
		x.innerText = `(` + (Number("0x" + ValueArr[5]) - dxsc_border(Number("0x" + ValueArr[6]), num)) + `)`;
	});
	return;
}

const changeVisibleData = () =>
{
	const checkVisibleData_body =
		(lblDiff, chkDiff, lblKind, chkKind, lblLv, chkLv, achiMin, achiMax, dxscMin, dxscMax, checkSync, checkCombo) =>
		(w450)=>
	{
		let shown = true;	// これがfalseなら hidden付与
		const ValueList = w450.querySelector(`div.music_name_block`).getAttribute(`value`).split(',');
		const TmpAchi = Number("0x" + ValueList[4]);
		const TmpDxsc = Number("0x" + ValueList[7]);
		
		if(lblDiff.length>0) shown &&= chkDiff[lblDiff.indexOf(ValueList[1])];	// 難易度
		if(lblKind.length>0 && shown) shown &&= chkKind[lblKind.indexOf(ValueList[2])];	// 譜面種別
		if(lblLv.length>0 && shown) shown &&= chkLv[lblLv.indexOf(ValueList[3])];	// Level
		if(shown) shown &&= (achiMin <= TmpAchi && TmpAchi <= achiMax);	// 達成率範囲
		if(shown) shown &&= (dxscMin <= TmpDxsc && TmpDxsc <= dxscMax);	// でらスコ割合範囲
		if(shown) shown &&= checkSync[Number("0x" + ValueList[8])];	// Sync Lamp
		if(shown) shown &&= checkCombo[Number("0x" + ValueList[9])];	// FC/AP Lamp

		// check後の結果、hiddenを付けるかどうか
		if(shown) w450.classList.remove(`hidden`);
		else w450.classList.add(`hidden`);

		return;
	}

	// 長さ固定の物
	const checkCombo = Array.from(lampCombo).map((x)=>x.checked);
	const checkSync = Array.from(lampSync).map((x)=>x.checked);

	// モードによって存在有無が変わる物の値を固定
	const modeDiff = document.querySelector(`#chkDiff`) != null;
	const lblDiff = (modeDiff)?Array.from(chkDiff).map((x)=>x.value):[];
	const checkDiff = (modeDiff)?Array.from(chkDiff).map((x)=>x.checked):[];

	const modeKind = document.querySelector(`#chkKind`) != null;
	const lblKind = (modeKind)?Array.from(chkKind).map((x)=>x.value):[];
	const checkKind = (modeKind)?Array.from(chkKind).map((x)=>x.checked):[];

	const modeLv = document.querySelector(`#chkLv`) != null;
	const lblLv = (modeLv)?Array.from(chkLv).map((x)=>x.value):[];
	const checkLv = (modeLv)?Array.from(chkLv).map((x)=>x.checked):[];
	
	// 範囲指定の物を整理
	const tmpAchi = Array.from(rangeAchi).map((x)=>Math.floor(Number(x.value)*10000)).sort((a,b)=>a-b);
	const minAchi = Math.max(0,tmpAchi[0]);
	const maxAchi = Math.min(tmpAchi[1], 1010000);
	const tmpDxsc = Array.from(rangeDxsc).map((x)=>Math.floor(Number(x.value)*100000)).sort((a,b)=>a-b);
	const minDxsc = Math.max(0,tmpDxsc[0]);
	const maxDxsc = Math.min(tmpDxsc[1]+999, 10000000);	// でらスコ割合は小数第5位まで保持なので、補正

	// 表示判定用関数生成
	const SubFunc = checkVisibleData_body(lblDiff,checkDiff,lblKind,checkKind,lblLv,checkLv,
				minAchi, maxAchi, minDxsc, maxDxsc, checkSync,checkCombo);

	datafield.querySelectorAll('div.w_450').forEach(SubFunc);
	change_sum_data();
}


const sortData = (cond) =>
{
	const makeValue4Cond = (cond1, org_value) =>
	{
		// 使うのは 0:index, 4:achi, 6:dxscmax, 7:dxscratio, 8:sync, 9:fcap
		const VA = org_value.split(",");
		return (cond1 == "achi")?[VA[4],VA[7],VA[6],VA[9],VA[8],VA[0]].join('')
			:(cond1 == "dxsc")?[VA[7],VA[6],VA[4],VA[9],VA[8],VA[0]].join('')
			:(cond1 == "combo")?[VA[9],VA[4],VA[8],VA[7],VA[6],VA[0]].join('')
			:(cond1 == "sync")?[VA[8],VA[9],VA[4],VA[7],VA[6],VA[0]].join('')
			: [VA[0],VA[4],VA[7],VA[6],VA[9],VA[8]].join('');
	}

	const makeCondStr = (cond1) =>
	{
		return (cond1 == "achi")?"達成率, でらスコ割合, ノーツ数, FC/AP, FSD"
			:(cond1 == "dxsc")?"でらスコ割合, ノーツ数, 達成率, FC/AP, FSD"
			:(cond1 == "combo")?"FC/AP, 達成率, FSD, でらスコ割合, ノーツ数"
			:(cond1 == "sync")?"FSD, FC/AP, 達成率, でらスコ割合, ノーツ数"
			:"元の並び順";
	}

	const start = performance.now();

	// 入力された並べ替え条件の文字列を_で分割
	const CondMode=cond.split(`_`);

	// 並べ替え条件設定
	const SortCond=(CondMode[1]=="high")?((a,b)=>(a.getAttribute(`value`)<b.getAttribute(`value`))?1:-1)
		:((a,b)=>(a.getAttribute(`value`)>b.getAttribute(`value`))?1:-1);


	// 全データに対して、並べ替え用の値を付与
	datafield.querySelectorAll('div.w_450').forEach((x)=>
		x.setAttribute(`value`, makeValue4Cond(CondMode[0], x.querySelector(`div.music_name_block`).getAttribute(`value`))));

	// 並べ替えて datafieldに順番に格納
	const CopyArray = Array.prototype.slice.call(datafield.querySelectorAll('div.w_450'));
	datafield.innerHTML = "";
	CopyArray.sort(SortCond).forEach((x)=>datafield.appendChild(x));
//	datafield.innerHTML = CopyArray.map((x)=>(x.outerHTML)).join("\n");	//重すぎて使えない。メモのためコメントで残す

/*
	// 現在の処理より遅い。メモのために残す。
	datafield.querySelectorAll('div.w_450').forEach((x)=>x.setAttribute("value", makeSortNum(x)));
	Array.from(datafield.querySelectorAll('div.w_450')).sort(condition_sort).forEach((x)=>datafield.appendChild(x));
*/	
	// 説明文入れ替え
	desc.innerText = makeCondStr(CondMode[0]);

	console.log((performance.now()-start).toFixed(1) + 'msec');
	return;
}

const change_sum_data = () => //表示譜面だけを渡して計算し、表示を変更する
{
	const QueryTarget = 'div.w_450:not(.hidden)';	//表示している譜面のquery

	const ArrayTargetValue = Array.from(datafield.querySelectorAll(QueryTarget));	// 表示対象譜面
	const CountArrayTarget = ArrayTargetValue.length;	// 表示対象譜面数

	// [idx, diff, kind, lv, achi,  dxsc分子, dxsc分母, dxscratio, sync, fcap,  rank, star]
	// 最初に使うのは 4:achi, 5:dxsc, 6:dxscmax, 7:dxscratio => slice(4,8)
	const ArrayTargetData = ArrayTargetValue
			.map((x)=>x.querySelector(`div.music_name_block`).getAttribute(`value`).split(`,`).slice(4,8).map((y)=>Number(`0x`+y)));

	// [達成率合計, でらスコ合計, でらスコmax合計(でらスコ0譜面を除く）, でらスコ割合合計]
	const SumTargetData = ArrayTargetData.reduce((a,b)=>[a[0]+b[0], a[1]+b[1], a[2]+((b[1]>0)?b[2]:0), a[3]+b[3]], [0,0,0,0]);

	// プレー済み(=達成率表示有, 捨てて0%の物も含む)譜面数
	const CountPlayed = datafield.querySelectorAll(QueryTarget + " div.achi2").length;

	// でらスコが1以上の譜面数
	const CountPlayedDxsc = ArrayTargetData.filter((x)=>x[1]>0).length;

	// fsd lamp回収 (n:13--17)
	const ArraySyncLamp = ArrayTargetValue
		.map((x)=>Number("0x" + x.querySelector(`div.music_name_block`).getAttribute(`value`).split(`,`)[8]));

	// fc,ap lamp回収 (n:8--12)
	const ArrayFcapLamp = ArrayTargetValue
		.map((x)=>Number("0x" + x.querySelector(`div.music_name_block`).getAttribute(`value`).split(`,`)[9]));

	// rank lamp回収 (n:0--7)
	const ArrayRankLamp = ArrayTargetValue
		.map((x)=>Number("0x" + x.querySelector(`div.music_name_block`).getAttribute(`value`).split(`,`)[10]));

	// dxscstar回収 (n:18--25)
	const ArrayStarLamp = ArrayTargetValue
		.map((x)=>Number("0x" + x.querySelector(`div.music_name_block`).getAttribute(`value`).split(`,`)[11]));


	// **** これより下は表示処理 ****

	//表示処理	
	disp_count.innerText = CountArrayTarget;

	// DXscore有効譜面の数
	all_dxsc_length.innerText = CountPlayedDxsc;

	// DXscoreの合計
	all_dxsc.innerText = SumTargetData[1];
	all_dxscmax.innerText = SumTargetData[2];

	// でらスコパーセントの合計　（表示対象）
	all_dxscretio.innerText = SumTargetData[3];

	// DXscore取得割合 dxsc_ratio（表示対象）
	dxsc_ratio.innerText = ((CountPlayedDxsc>0)?((Math.floor(SumTargetData[1] *10000 / SumTargetData[2] )/100).toFixed(2)):0)

	// DXscore割合平均 ave_dxscratio（表示対象）
	ave_dxscratio.innerText = ((CountPlayedDxsc>0)?((SumTargetData[3] / CountPlayedDxsc)/100000).toFixed(2):0)

	// DXscore割合合計 all_dxscretio（表示対象）
	all_dxscretio.innerText = (SumTargetData[3]/100000).toFixed(2)

	achi_list_length.innerText = CountPlayed;	// 達成率表示譜面数（未プレーはカウントしない）（表示対象）

	// 達成率の平均 ave_achi（表示対象）
	ave_achi.innerText = ((CountPlayed>0)?((Math.floor(SumTargetData[0] / CountPlayed)/10000).toFixed(4)):0)

	// 達成率の合計 total_achi（表示対象）
	total_achi.innerText  = (SumTargetData[0]/10000).toFixed(4)

	// Lamp集計表で値が表示されているtdのリスト
	const CountersOnTable = document.querySelectorAll('table.music_scorelist_table div.f_10');

	// rank lamp回収 (n:0--7)
	CountersOnTable[0].innerText = ArrayRankLamp.filter((x)=>x<6).length;	// プレー済み未clear
	CountersOnTable[1].innerText = ArrayRankLamp.filter((x)=>x>=6).length;	// clear
	for(let n=2; n<8; ++n)
		CountersOnTable[n].innerText = ArrayRankLamp.filter((x)=>x>=n+7).length;	//S以上

	// fc,ap lamp回収 (n:8--12)
	for(let n=0; n<5; ++n)
		CountersOnTable[n+8].innerText = ArrayFcapLamp.filter((x)=>x>=n).length;

	// fsd lamp回収 (n:13--18)
	for(let n=0; n<6; ++n)
		CountersOnTable[n+13].innerText = ArraySyncLamp.filter((x)=>x>=n).length;

	// dxscstar回収 (n:19--26)
	CountersOnTable[19].innerText = CountPlayedDxsc	// でらスコ1以上の数
	for(let n=1; n<8; ++n)
		CountersOnTable[n+19].innerText = ArrayStarLamp.filter((x)=>x>=n).length;
}

(function ()
{
	
	if(location.href.slice(0,46) != 'https://maimaidx.jp/maimai-mobile/record/music')
	{
		location.href = 'https://maimaidx.jp/maimai-mobile/record/musicGenre/search/?genre=99&diff=3';
		return;
	}
	
	const start = performance.now();
	
	const make_html = (tag, attr, cls, text) =>
	'<' + tag + ((attr!='')?(' ' + attr):'') + ((cls!='')?(' class="' + cls + '"'):'') + '>' + text + '</' + tag + '>\n';
	
	// 画像のURL
	const Img_Dom = "https://maimaidx.jp/maimai-mobile/img/"
	
	// 16進数後の桁数digitは8以下を想定
	// 数字numと桁数digitのチェックはないので、溢れ注意。
	const num2hexstr = (num, digit) => ("0000000" + num.toString(16)).slice(-1*digit).toUpperCase();

	// DXscore割合から星を算出
	const dxsc2DxscStar = (dxscRatio) =>
	{
		const calcLinearValue = (basis, max, gap, n) => basis+(max-basis)*n/gap;
	
		const x = dxscRatio / Math.pow(10, 5);
		const star100 = (x >= 100)?700
				:(x >= 99)?calcLinearValue(600, 700, 1, x-99)
				:(x >= 97)?calcLinearValue(500, 600, 2, x-97)
				:(x >= 95)?calcLinearValue(400, 500, 2, x-95)
				:(x >= 93)?calcLinearValue(300, 400, 2, x-93)
				:(x >= 90)?calcLinearValue(200, 300, 3, x-90)
				:(x >= 85)?calcLinearValue(100, 200, 5, x-85)
				:calcLinearValue(0,100, 85, x);
		return Math.floor(star100)/100;
	}

	// Attributesは文字列リスト [`value=0xFF`, `style="height:30px"`]
	const makeNewDiv = (Attributes, Value, ClassList, InnerText) =>
	{
		const NewDiv = document.createElement("div");
		Attributes.forEach((x)=>NewDiv.setAttribute(x.split(`=`)[0], x.split(`=`)[1]));	
		if(Value != "")	NewDiv.setAttribute("value", Value);
		if(ClassList != "") NewDiv.classList = ClassList;
		if(InnerText != "") NewDiv.innerText = InnerText;
	
		return NewDiv;
	}
	
	const makeNewSpan = (Attributes, Value, ClassList, InnerText) =>
	{
		const NewSpan = document.createElement("span");
		Attributes.forEach((x)=>NewSpan.setAttribute(x.split(`=`)[0], x.split(`=`)[1]));
		if(Value != "")	NewSpan.setAttribute("value", Value);
		if(ClassList != "") NewSpan.classList = ClassList;
		if(InnerText != "") NewSpan.innerText = InnerText;
	
		return NewSpan;		
	}

	const makeNewImg = (Value, ClassList, SrcUrl) =>
	{
		const NewImg = document.createElement("img");
	
		if(Value != "") NewImg.setAttribute("value", Value);
		if(ClassList != "") NewImg.classList = ClassList;
		if(SrcUrl != "") NewImg.setAttribute("src", SrcUrl);
	
		return NewImg;
	}

	// 元のデータボックスをベースに、表示用データボックスを生成
	const makeNewData = (w450, idx) =>
	{
		const ValueArr = [num2hexstr(idx, 3)];	// idxを16進数3桁化した物

		// 大外の枠
		const DiffStr = w450.querySelector("img.h_20.f_l").getAttribute('src').slice(43,-4);	// 難易度の画像
		const W450Block = document.createElement("div");
		W450Block.classList.add("w_450", "p_3", "music_score_back", DiffStr);

		ValueArr.push(DiffStr);	// 難易度直接

		// Level
		const LvStr = w450.querySelector("div.music_lv_block").innerText;
		W450Block.appendChild(makeNewDiv([], "", "lv_block_new f_r t_c f_12" , LvStr));

		// 宴判定を先に行う
		const UtageImgs = w450.querySelectorAll(`div.music_utage_score_back img.h_25`);
		const KindStr = (UtageImgs.length > 0)?Array.from(UtageImgs).slice(-1)[0].src.slice(44, -4)
				: w450.querySelector("[class *='music_kind_icon']:not(.pointer)").getAttribute('src').slice(44, -4);
		ValueArr.push(KindStr);	// 種類直接
		ValueArr.push(LvStr.replace(/\+/, 'p').replace(/\?/, 'utage'));	// Lv(p)かutageか 並び順都合でここに。
		
		// 曲名
		const MusicNameSpan = makeNewSpan([], "", "t_l f_12 break music_title_"+ KindStr, w450.querySelector("div.music_name_block").innerText);
		const MusicBlockDiv = makeNewDiv([], "", "music_name_block t_l music_title_back_" + KindStr, "");
		MusicBlockDiv.appendChild(MusicNameSpan);
		W450Block.appendChild(MusicBlockDiv);

		
		const ClearfixBlock = document.createElement("div");
		ClearfixBlock.classList.add("clearfix");
		W450Block.appendChild(ClearfixBlock);

		const DataArr = [];

		w450.querySelectorAll("div.music_score_block")
			.forEach((x)=>DataArr.push(x.innerText.trim().replace(/\.|%| |,/g, "")));
		w450.querySelectorAll("img.h_30.f_r")
			.forEach((x)=>DataArr.push(x.getAttribute('src').slice(49,-13)));

		if(DataArr.length > 0)
		{
			// 達成率
			W450Block.appendChild(
				makeNewDiv([], "", "music_score_block record_block achi2 f_l", 
					(DataArr[0]/10000).toFixed(4) + "%"));
			ValueArr.push(num2hexstr(Number(DataArr[0]), 5));

			// NewDxsc
			const NewDxsc = makeNewDiv([], "", "music_score_block dxsc f_l", "");
			
			// Dxsc
			NewDxsc.appendChild(
				makeNewSpan([], "", "dxsc2 f_l",DataArr[1]));

			// Dxscdiff
			const Dxsc = DataArr[1].split("/").map(Number);
			NewDxsc.appendChild(
				makeNewSpan([], "", "dxscdiff2 f_l", `(` + String(Dxsc[0]-Dxsc[1]) + `)`));

			Dxsc.forEach((x)=>ValueArr.push(num2hexstr(x, 3)));

			// DxscRatio&DxscStarNum算出
			const DxscRatio =  Math.floor(Dxsc[0]*10000000/Dxsc[1]);
			const RatioDispBase = Math.floor(DxscRatio/1000);
			const DxscStarNum = dxsc2DxscStar(DxscRatio);

			// DxscRatio
			NewDxsc.appendChild(
				makeNewSpan([], "", "dxscratio2 f_l",
					(RatioDispBase/100).toFixed(2) + "%☆" + (DxscStarNum.toFixed(2))));
			W450Block.appendChild(NewDxsc);
			ValueArr.push(num2hexstr(DxscRatio, 6));
			
			const FsdxList = ['back', 'sync', 'fs', 'fsp', 'fdx', 'fdxp'];
			W450Block.appendChild(
				makeNewImg("", "lampfsdx f_r", Img_Dom + "music_icon_" + DataArr[2] + ".png"));
			ValueArr.push(String(FsdxList.indexOf(DataArr[2])));

			const FcapList = ['back', 'fc', 'fcp', 'ap', 'app'];
			W450Block.appendChild(
				makeNewImg("", "lampfcap f_r", Img_Dom + "music_icon_" + DataArr[3] + ".png"));
			ValueArr.push(String(FcapList.indexOf(DataArr[3])));

			const RankStrList = ['back','d','c','b','bb','bbb','a','aa','aaa','s','sp','ss','ssp','sss','sssp'];
			W450Block.appendChild(
				makeNewImg("", "lamprank f_r", Img_Dom + "music_icon_" + DataArr[4] + ".png"));
			ValueArr.push(num2hexstr(RankStrList.indexOf(DataArr[4]), 1));

			if(DxscStarNum >= 1)
			{
				// DxscNum
				W450Block.appendChild(
					makeNewImg("", "dxscstar f_r",
						Img_Dom + "music_icon_dxstar_" + Math.floor(Math.min(DxscStarNum, 5)) + ".png"));
			}
			ValueArr.push(String(Math.floor(DxscStarNum)));	// pushは1未満でもやる
		}
		else
		{
			ValueArr.push("00000", "000", "000", "000000", "0", "0", "0", "0")
		}

		W450Block.appendChild(ClearfixBlock.cloneNode(false));

		MusicBlockDiv.setAttribute(`value`, ValueArr.join(","));

		return W450Block;
	}

	// 難易度チェックボックス生成用
	const make_chkbx_diff = (diffstr, maxnum) =>
	{
		const iconTag = '<img src="https://maimaidx.jp/maimai-mobile/img/btn_music_' + diffstr + '.png" class="w_71">\n'
		const chkbox =
		      '<input type="checkbox" id="chkDiff" name="diffs" value="'+ diffstr + '"  onchange="changeVisibleData()" checked>\n';
		const num = SpanDatafield.querySelectorAll('div.' + diffstr).length;
		if(num == 0 || num == maxnum)	// 全部同一か個数0の場合は何も作らない
			return '';
		else
			return make_html('td', '', 'v_m', iconTag + '<br>\n' + chkbox);
	}

	// 譜面種別チェックボックス生成用
	const make_chkbx_kind = (kindstr, maxnum) =>
	{
		const iconTag = '<img src="https://maimaidx.jp/maimai-mobile/img/music_' + kindstr + '.png" class="w_71 m_t_5 m_b_10">\n'
		const chkbox = 	'<input type="checkbox" id="chkKind" value="' + kindstr + '" onchange="changeVisibleData()" checked>\n';
		const num = SpanDatafield.querySelectorAll('div.music_title_back_'+ kindstr).length;
		if(num == 0 || num == maxnum)	// 全部同一か個数0の場合は何も作らない
			return '';
		else
			return make_html('td', '', 'v_m', iconTag + '<br>\n' + chkbox);
	}

	// Levelチェックボックス生成用
	const str2chkbx_lv = (lvstr) =>
		'<input type="checkbox" value="' + (lvstr.replace(/\+/,'p')) + '" onchange="changeVisibleData()" id="chkLv" checked>\n';
	const make_chkbx_lv = (lvstr) =>
		make_html('td', '', 'f_12 v_m', lvstr + '<br>\n' + str2chkbx_lv(lvstr));

	const makeFcapChkbx = (LampTd, n) =>
	{
		const IconName = ["fc_dummy", "fc", "fcplus", "ap", "applus"];
		LampTd.querySelector("img").setAttribute("src", "https://maimaidx.jp/maimai-mobile/img/playlog/" + IconName[n] + ".png");
		LampTd.querySelector("img").classList.replace("h_30", "h_25");
		const ChkBox = document.createElement("input");
		ChkBox.setAttribute("type", "checkbox");
		ChkBox.setAttribute("onchange", "changeVisibleData()");
		ChkBox.setAttribute("checked", "");
		ChkBox.setAttribute("id", "lampCombo");
		LampTd.appendChild(ChkBox);
		return;
	}

	const makeFsdxChkbx = (LampTd, n) =>
	{
		const IconName = ["fs_dummy", "sync", "fs", "fsplus", "fsd", "fsdplus"];
		LampTd.querySelector("img").setAttribute("src", "https://maimaidx.jp/maimai-mobile/img/playlog/" + IconName[n] + ".png");
		LampTd.querySelector("img").classList.replace("h_30", "h_25");
		const ChkBox = document.createElement("input");
		ChkBox.setAttribute("type", "checkbox");
		ChkBox.setAttribute("onchange", "changeVisibleData()");
		ChkBox.setAttribute("checked", "");
		ChkBox.setAttribute("id", "lampSync");
		LampTd.appendChild(ChkBox);
		return;
	}

	const makeSelectMode = () =>
	{
		const values=["normal_low", "achi_high", "achi_low", "dxsc_high", "dxsc_low",
				"combo_high", "combo_low", "sync_high", "sync_low"];
		const labels=['標準', '達成率 高', '達成率 低', 'DXscore% 高', 'DXscore% 低',
				'FC/AP 達成', 'FC/AP 未達成', 'FSDX 達成', 'FSDX 未達成'];

		DivSelect = document.createElement(`div`);
		DivSelect.innerHTML += "並べ替え：";

		SelectMode = document.createElement(`select`)
		SelectMode.style="border:1px solid #000; padding:2px 5px; background:unset; text-align:center"
		SelectMode.setAttribute(`onchange`, `sortData(this.value)`);

		for(let i=0; i<values.length; i++)
		{
			SelectMode.innerHTML +=
				`<option value="` + values[i] + `">` + labels[i] + `</option>`
		}

		DivSelect.appendChild(SelectMode);
		DivSelect.innerHTML += `<br>並び順：<span id="desc">元の並び順</span>`;

		return DivSelect;
	}

	const add_radiobutton = (sl, starnum)=>
		sl.innerHTML +=( '\n<div><input type=radio name=starlv value=' + starnum + ' onclick="recalc_dxscdiff(this.value)"'
			+ ((starnum==0)?" disabled='disabled'":"")
	      		+'></div>\n');

	const resetCounterTable = () =>
	{
		// 3行でない時はreturn;
		if(document.querySelectorAll("table.music_scorelist_table tr").length != 3)
			return;

		// trの親要素
		lamptable = document.querySelector(`table.music_scorelist_table tbody`);
		// FC/AP系とSYNC系のLamp行を分割するため、コピーする
		lamptable.insertBefore(lamptable.querySelectorAll(`tr`)[1].cloneNode(true),
					lamptable.querySelectorAll(`tr`)[2]);
		// FC/AP系の行からSYNC系を外す
		Array.from(lamptable.querySelectorAll(`tr`)[1].querySelectorAll(`td`)).slice(4).forEach((x)=>x.outerHTML=``);
		// SYNC系の行からFC/AP系を外す
		Array.from(lamptable.querySelectorAll(`tr`)[2].querySelectorAll(`td`)).slice(0,4).forEach((x)=>x.outerHTML=``);
		// FC/AP行用のcolspan=3のcell追加
		TdColspan3 = document.createElement(`td`); TdColspan3.setAttribute(`colspan`, 3);
		// FC/AP行の先頭に挿入
		lamptable.querySelectorAll(`tr`)[1].insertBefore(TdColspan3, lamptable.querySelectorAll(`tr`)[1].querySelector(`td`));
		// SYNC行用のcolspan=2のcell追加
		TdColspan2 = document.createElement(`td`); TdColspan2.setAttribute(`colspan`, 2);
		// SYNC行の先頭に追加
		lamptable.querySelectorAll(`tr`)[2].insertBefore(TdColspan2, lamptable.querySelectorAll(`tr`)[2].querySelector(`td`));
		// らんどりーのcellをDXSC行の前に移動
		lamptable.querySelectorAll(`tr`)[3].insertBefore(lamptable.querySelectorAll(`tr`)[0].querySelector(`td`),
							lamptable.querySelectorAll(`tr`)[3].querySelector(`td`));
		// DXSC行のすべてのcellのcolspanを1に
		lamptable.querySelectorAll(`tr`)[3].querySelectorAll(`td`).forEach((x)=>x.removeAttribute(`colspan`));
		return;
	}

	////ここから本体////
	// 楽曲レコード関連のページにいない場合、楽曲レコードをリンクした状態にする。
	if(location.href.slice(0,46) != 'https://maimaidx.jp/maimai-mobile/record/music')
	{
		alert("楽曲レコードに移動します。");
		location.href = 'https://maimaidx.jp/maimai-mobile/record/musicGenre/';
		return;
	}

	// 幅情報を追加するためのcss追加
	const linkDOM = document.createElement("link");
	linkDOM.setAttribute("rel", "stylesheet");
	linkDOM.setAttribute("media", "all");
	linkDOM.setAttribute("type", "text/css");
	linkDOM.setAttribute("href", "https://sgimera.github.io/mai_RatingAnalyzer/css/maidx_dxsc.css");
	document.querySelector('head').appendChild(linkDOM);
		
	const result_list_length = document.querySelectorAll('div.w_450.m_15').length;	// 全譜面数

	// 新しいdata置き場を生成。この時点では描画させないため、documentにはappendChildしない
	const SpanDatafield = document.createElement("span");
	SpanDatafield.setAttribute("id", "datafield");
	// 新しいdataをSpanDatafieldに格納する。この時点では描画させないように、documentのappendもouterHTML=""も実行しない。
	document.querySelectorAll("div.w_450.m_15").forEach((x,n)=>SpanDatafield.appendChild(makeNewData(x,n)));

	let tmpstr = '<div align="center">あならいざもどき2 解析結果 '
		+ '<span class="f_11 v_m">(表示対象: <span id="disp_count"></span> / ' + result_list_length + '譜面 )</span></div>\n'
		+ '<div align="right"><span class="f_11 v_m">( 処理時間 : <span id="exec_time"></span> sec )</span></div>\n' 
		+ '<div>でらっくスコア取得割合 : <span id="dxsc_ratio"></span>% '
		+ '<span class="f_11 v_m">( <span id="all_dxsc"></span> / <span id=all_dxscmax></span> )</span></div>\n'
		+ '<div>でらっくスコア割合平均 : <span id="ave_dxscratio"></span>% '
		+ '<span class="f_11 v_m">( <span id="all_dxscretio"></span>% / <span id="all_dxsc_length"></span>譜面 )</span></div>\n'
		+ '<div>達成率平均 : <span id="ave_achi"></span>% ' 
		+ '<span class="f_11 v_m">( <span id="total_achi"></span>% / <span id="achi_list_length"></span>譜面 )</span></div>\n';

	// 難易度と譜面種別のフィールドを作る
	let diff_kind_table = "";
	const diff_table = make_chkbx_diff('basic', result_list_length ) + make_chkbx_diff('advanced', result_list_length )
		+ make_chkbx_diff('expert', result_list_length ) + make_chkbx_diff('master', result_list_length )
		+ make_chkbx_diff('remaster', result_list_length );
	const kind_table = make_chkbx_kind('dx', result_list_length ) + make_chkbx_kind('standard', result_list_length);
	if(diff_table != '' || kind_table != '')
	{
		diff_kind_table += "\n<div>\n<table border=0>\n"
			+ make_html('tr', '', '', diff_table + kind_table)
			+ "</table>\n</div>\n";
	}

	// Levelフィルタを表示
	const lvlist = Array.from(new Set(
		Array.prototype.map.call(SpanDatafield.querySelectorAll('.lv_block_new'), (x)=>x.innerText)
	))
	.sort((a,b)=>a.replace(/\+/,".7") - b.replace(/\+/,".7"));
	
	const lv_table = (lvlist.length==1)?("")
		:('\n<div>\n<table>\n<tr>'
		+ make_html('td', '', '', 'Lv.')
		+ lvlist.map((x)=>make_chkbx_lv(x)).join('') 
		+ '</tr>\n</table>\n</div>\n');
	
	tmpstr += '<hr style="margin:4px 0px">'
		// 絞り込み条件
		+ make_html("form", "id=disp_cond", "",
			    '<div>'
			    + '<span class="f_10 f_l">'
			    + '達成率:<input value="0" type="number" min="0" max="101" step="0.0001" id="rangeAchi" style="width:6.5em"'
			    + ' onblur="changeVisibleData()" class="f_10">から'
			    + '<input value="101" type="number" min="0" max="101" step="0.0001" id="rangeAchi" style="width:6.5em"'
			    + ' onblur="changeVisibleData()" class="f_10">'
			    + '</span>'
			    + '<span class="f_10 f_r">'
			    + 'でらスコ割合:<input value="0" type="number" min="0" max="100" step="0.01" id="rangeDxsc" style="width:5.5em"'
			    + ' onblur="changeVisibleData()" class="f_10">から'
			    + '<input value="100" type="number" min="0" max="100" step="0.01" id="rangeDxsc" style="width:5.5em"'
			    + ' onblur="changeVisibleData()" class="f_10">'
			    + '</span>'
			    + '<div class="clearfix"></div>'
			    + '</div>'
			    + lv_table + diff_kind_table )
		+ '<hr style="margin:4px 0px">'
		+ makeSelectMode().outerHTML;

	// ジャンル以外のLamp表が3行なので、ジャンルの時と同じになるように加工する
	if(document.querySelectorAll("table.music_scorelist_table tr").length==3)
		resetCounterTable();

	// カウンター表置き場確認
	const CountTableTmp = document.querySelector("table.music_scorelist_table");

	// 宴以外の時は集計処理を実行する
	if(CountTableTmp != undefined)
	{
		const CountTable = CountTableTmp.cloneNode(true);
		
		// 各行定義
		const RankTr = CountTable.querySelectorAll(`tr`)[0];
		const FcapTr = CountTable.querySelectorAll(`tr`)[1];
		const FsdxTr = CountTable.querySelectorAll(`tr`)[2];
		const DxscTr = CountTable.querySelectorAll(`tr`)[3];

		// らん＆どりーのアイコン、RANK列先頭に移動させる
		const randory = DxscTr.querySelectorAll(`td`)[0];
		const randory_count = document.createElement(`div`);
		randory_count.classList.add(`f_10`);
		randory.appendChild(randory_count);
		RankTr.insertBefore(randory, RankTr.querySelector(`td`));

		// FCの前にBackを置く
		const BackLamp = FcapTr.querySelectorAll(`td`)[1].cloneNode(true);
		BackLamp.querySelector(`img`).src = BackLamp.querySelector(`img`).src.replace(/fc/, `back`);
		FcapTr.insertBefore(BackLamp, FcapTr.querySelectorAll(`td`)[1]);

		// FSの前にBackを置く
		const BackLamp2 = FsdxTr.querySelectorAll(`td`)[1].cloneNode(true);
		BackLamp2.querySelector(`img`).src = BackLamp2.querySelector(`img`).src.replace(/sync/, `back`);
		FsdxTr.insertBefore(BackLamp2, FsdxTr.querySelectorAll(`td`)[1]);

		// ☆1の前にBackを置く（☆0用）
		const DxscBack = BackLamp.cloneNode(true);
		DxscTr.querySelector(`td`).outerHTML = DxscBack.outerHTML;

		// ☆5の後ろに2つコピーする
		const Star5Td = DxscTr.querySelectorAll(`td`)[5].cloneNode(true);
		DxscTr.appendChild(Star5Td.cloneNode(true));
		DxscTr.appendChild(Star5Td);

		// でらスコの☆にボタン設置 
		Array.from(DxscTr.querySelectorAll('td'))
			.filter((x)=>x.innerText!='').forEach((x,n)=>add_radiobutton(x,n));
		// Lampにcheckbox追加
		Array.from(FcapTr.querySelectorAll("td")).slice(-5).forEach(makeFcapChkbx);
		Array.from(FsdxTr.querySelectorAll("td")).slice(-6).forEach(makeFsdxChkbx);

		// 設置したボタンの値を取得するため、tableをformで囲む
		const FormCountTable = document.createElement("form");
		FormCountTable.setAttribute("id", "buttonDxscStar");
		FormCountTable.appendChild(CountTable);

		// 元を消す
		document.querySelector("table.music_scorelist_table").outerHTML = "";	// 元の集計表
		// 計算結果表示
		document.querySelector('.screw_block').outerHTML += document.querySelector('.screw_block').outerHTML;
		document.querySelector('.screw_block').setAttribute("style", "padding:8px;");
		document.querySelector('.screw_block').innerHTML = tmpstr;
		// 集計表を生成物に入れ替え
		document.querySelector("div.see_through_block").appendChild(FormCountTable);
	}

	document.querySelector('.screw_block').classList.replace('p_s', 'dxscdata');
	// ジャンル、Levelなどが書いてあるscrew_blockを全部消去（軽量化）
	document.querySelectorAll('div.screw_block:not(.dxscdata)').forEach((x)=>x.outerHTML='');

	// m_15 -> m_8_15に
	document.querySelectorAll(".m_15").forEach((x)=>x.classList.replace("m_15", "m_8_15"))
	// 表示
	document.querySelectorAll("div.w_450.m_8_15").forEach((x)=>x.outerHTML="");	// 元のレコードデータ
	document.querySelector("div.dxscdata").parentElement.insertBefore(SpanDatafield, document.querySelector("footer"));

	// 集計データを再計算して、解析結果のフィールドに入れる
	if(CountTableTmp != undefined)
	{
		change_sum_data();	// 値を入れる
		// ここまでの時間を入れる
		exec_time.innerText = ((performance.now()-start)/1000).toFixed(4);
	}

	// 何かを消す
	document.querySelector('div.spmenu_toggle').outerHTML="";
	document.querySelectorAll(`[id^='page']`).forEach((x)=>x.outerHTML="");

	return;
}
)(); void(0);