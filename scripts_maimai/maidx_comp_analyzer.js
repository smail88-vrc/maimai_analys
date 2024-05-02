javascript:
var mai_series_data = '';
const VerStrList = 
      ['鈴 (ジングルベル)', '真 (maimai + plus)', '超 (GreeN)', '檄 (GreeN plus)', '橙 (ORANGE)', '暁 (ORANGE plus)',
       '桃 (PiNK)', '櫻 (PiNK plus)', '紫 (MURASAKi)', '菫 (MURASAKi plus)', '白 (MiLK)', '雪 (MiLK plus)', '輝 (FiNALE)',
       '熊 (でらっくす)', '華 (でらっくす plus)', '爽 (Splash)', '煌 (Splash plus)', '宙 (UNiVERSE)', '星 (UNiVERSE plus)',
       '祭 (FESTiVAL)', '祝 (FESTiVAL plus)', '双 (BUDDiES)', '現 (BUDDiES plus)'];

const MAI_NEWEST_VER = VerStrList.length-1;	// 21

const PlateName = ['舞舞', '神', '将', '極'];
const RankStr = ['AP+達成', 'SSS+達成', 'SSS達成', 'SS+達成', 'SS達成', 'S+達成', 'S達成', 'A達成'];
const DxscStr = ['☆7達成', '☆6達成', '☆5達成', '☆4達成', '☆3達成', '☆2達成', '☆1達成', 'DX未プレー'];
const FriDxscStr = ['☆5達成', '☆4達成', '☆3達成', '☆2達成', '☆1達成', 'DX未プレー'];
const ConqLampStr = ["FSD達成", "Sy達成", "AP達成", "FC達成"];
const ConqAchiStr = ["AP+達成", "SSS+達成", "SSS達成", "S達成", "A達成", "DX未プレー"];
const AllLampStr = ["FSD+達成", "FSD達成", "FS+達成", "FS達成", "Sy達成", "AP+達成", "AP達成", "FC+達成", "FC達成"];
const LampList = [' ', 'FC', 'FC+', 'AP', 'AP+'];
const FsdxList = [' ', 'Sy', 'FS', 'FS+', 'FSD', 'FSD+'];

const m_titlelist = [];	// 曲名リスト。配列操作禁止。
const m_nicknamelist = []; //短縮名リスト。配列操作禁止。
const m_dxlist = [];	// 譜面種別リスト(0:std, 1:dx)。 配列操作禁止。
const m_iconlist = [];	// iconリスト 配列操作禁止
const playerdata_list=[];	//ソート用のplayerdata格納先。配列操作禁止。

const MaiCompPlateList = [];	// 本人モードでのみ使用
var checkNazoMode = false, skipNazoMode = false;

const make_html = (tag, attr, cls, text) =>
	'<' + tag + ((attr!='')?(' ' + attr):'') + ((cls!='')?(' class="' + cls + '"'):'') + '>' + text + '</' + tag + '>\n';

const makePlateImgTd = (cols, bg_url, name) =>
	make_html("th", 'colspan=' + cols + ' loading=lazy style="background-image:url(' + bg_url + ')"', "nameplate", name);

// 現在の時刻からテキトーな値を提示
const random_seed = () =>
{
	const now = new Date();
	return (now.getHours())*3600 + (now.getMinutes())*60 + (now.getSeconds()) + performance.now();
}

// 楽曲ごとのバージョンに対するmai_ver_mmを提示
const getVersionClass = (vernum) =>
{
	if(0<=vernum && vernum<1000)	//通常の他、旧筐体全部、DX以降全部
		return 'mai_ver_' + vernum;
	else if(vernum < 0)
		return 'mai_ver_revival';	
	return 'mai_ver_white';
}

// 数える系関数の総締め
// FilterList : 条件のfilter無名関数のリスト
// DataList : 数えるデータ
const countData = (FilterList) => (DataList) =>
{
	const retArr = [];
	for(let n = 0; n<FilterList.length; ++n)
	{
		retArr.push(DataList.filter(FilterList[n]).length);
	}
	return retArr;
}

// FSD、AP, SSS, FC, クリアの数をカウントする
// DataList : 対象譜面データ
const countLampData =	// 残りが出てくる [舞, 神, 将, 極, 覇者]
	countData([
		(x)=>x.fsdxLamp < 4,	//FSD 未達成
		(x)=>x.fcapLamp < 3,	//AP 未達成
		(x)=>x.achi < 0xF4240,	//達成率100% 未達成
		(x)=>x.fcapLamp < 1,	//FC 未達成
		(x)=>x.achi < 0xC3500,	//達成率 80% 未達成
	]);

// countLampData フレンドモード時の実行者のデータ
const countLampData_m =	// 残りが出てくる [舞, 神, 将, 極, 覇者]
	countData([
		(x)=>x.p_fsdxLamp < 4,	//FSD 未達成
		(x)=>x.p_fcapLamp < 3,	//AP 未達成
		(x)=>x.p_achi < 0xF4240,	//達成率100% 未達成
		(x)=>x.p_fcapLamp < 1,	//FC 未達成
		(x)=>x.p_achi < 0xC3500,	//達成率 80% 未達成
	]);

// クリアランク到達数を数える。基準は達成率
// DataList : 対象譜面データ
const countRankData =	// 達成数が出てくる [AP+, SSS+, SSS, SS+, SS, S+, S, A]
	countData([
		(x)=>x.achi >= 0xF6950,	// AP+
		(x)=>x.achi >= 0xF55C8,	// SSS+
		(x)=>x.achi >= 0xF4240,	// SSS
		(x)=>x.achi >= 0xF2EB8,	// SS+
		(x)=>x.achi >= 0xF1B30,	// SS
		(x)=>x.achi >= 0xEF420,	// S+
		(x)=>x.achi >= 0xECD10,	// S
		(x)=>x.achi >= 0xC3500,	// A
	]);

// countRankData フレンドモード時の実行者のデータ
// DataList : 対象譜面データ
const countRankData_m =	// 達成数が出てくる [AP+, SSS+, SSS, SS+, SS, S+, S, A]
	countData([
		(x)=>x.p_achi >= 0xF6950,	// AP+
		(x)=>x.p_achi >= 0xF55C8,	// SSS+
		(x)=>x.p_achi >= 0xF4240,	// SSS
		(x)=>x.p_achi >= 0xF2EB8,	// SS+
		(x)=>x.p_achi >= 0xF1B30,	// SS
		(x)=>x.p_achi >= 0xEF420,	// S+
		(x)=>x.p_achi >= 0xECD10,	// S
		(x)=>x.p_achi >= 0xC3500,	// A
	]);

// len : 7(通常) or 5(フレンド)
// DataList : 対象譜面データ
const countDxscStarData = (len) =>	// 達成数が出てくる [☆7、☆6、…、☆1、0%]
{
	const filterList = [];
	for(let n=1; n<=len; ++n)
		filterList.push((x)=>x.dxscStar >= n);
	filterList.reverse();
	filterList.push((x)=>x.dxsc==0);
	return countData(filterList);
}

// countDxscStarData フレンドモード時の実行者のデータ
// DataList : 対象譜面データ
const countDxscStarData_m = () =>	// 達成数が出てくる [☆5、☆4、…、☆1、0%]
{
	const filterList = [];
	for(let n=1; n<=5; ++n)
		filterList.push((x)=>x.p_dxscStar >= n);
	filterList.reverse();
	filterList.push((x)=>x.p_dxsc==0);
	return countData(filterList);
}

// FC/AP, FS/FSDの数を数える
// DataList : 対象譜面データ
const countAllLampData =	// [FSD+, FSD, FS+, FS, Sy, AP+, AP, FC+, FC]
	countData([
		(x)=>x.fsdxLamp >= 5,	//FSD+ 達成
		(x)=>x.fsdxLamp >= 4,	//FSD 達成
		(x)=>x.fsdxLamp >= 3,	//FS+ 達成
		(x)=>x.fsdxLamp >= 2,	//FS 達成
		(x)=>x.fsdxLamp >= 1,	//Sy 達成
		(x)=>x.fcapLamp >= 4,	//AP+ 達成
		(x)=>x.fcapLamp >= 3,	//AP 達成
		(x)=>x.fcapLamp >= 2,	//FC+ 達成
		(x)=>x.fcapLamp >= 1,	//FC 達成
	]);

// countAllLampData フレンドモード時の実行者のデータ
const countAllLampData_m =	// [FSD+, FSD, FS+, FS, Sy, AP+, AP, FC+, FC]
	countData([
		(x)=>x.p_fsdxLamp >= 5,	//FSD+ 達成
		(x)=>x.p_fsdxLamp >= 4,	//FSD 達成
		(x)=>x.p_fsdxLamp >= 3,	//FS+ 達成
		(x)=>x.p_fsdxLamp >= 2,	//FS 達成
		(x)=>x.p_fsdxLamp >= 1,	//Sy 達成
		(x)=>x.p_fcapLamp >= 4,	//AP+ 達成
		(x)=>x.p_fcapLamp >= 3,	//AP 達成
		(x)=>x.p_fcapLamp >= 2,	//FC+ 達成
		(x)=>x.p_fcapLamp >= 1,	//FC 達成
	]);

// 制覇ページのまとめカウンター
const countConqLampData =	// [FSD, AP, FC]
	countData([
		(x)=>x.fsdxLamp >= 4,	//FSD 達成
		(x)=>x.fsdxLamp >= 1,	//Sy 達成
		(x)=>x.fcapLamp >= 3,	//AP 達成
		(x)=>x.fcapLamp >= 1,	//FC 達成
	]);
    
// countConqLampData フレンドモード時の実行者のデータ
const countConqLampData_m =	// [FSD, AP, FC]
	countData([
		(x)=>x.p_fsdxLamp >= 4,	//FSD 達成
		(x)=>x.p_fsdxLamp >= 1,	//Sy 達成
		(x)=>x.p_fcapLamp >= 3,	//AP 達成
		(x)=>x.p_fcapLamp >= 1,	//FC 達成
	]);
 
// 制覇ページのまとめカウンター
const countConqAchiData =	// [AP+, SSS+, SSS, S, A, DXSC0]
	countData([
		(x)=>x.achi >= 0xF6950,	// AP+
		(x)=>x.achi >= 0xF55C8,	// SSS+
		(x)=>x.achi >= 0xF4240,	// SSS
		(x)=>x.achi >= 0xECD10,	// S
		(x)=>x.achi >= 0xC3500,	// A
		(x)=>x.dxsc == 0	// DXscore 0
	]);
    
// countConqAchiData フレンドモード時の実行者のデータ
const countConqAchiData_m =	// [AP+, SSS+, SSS, S, A, DXSC0]
	countData([
		(x)=>x.p_achi >= 0xF6950,	// AP+
		(x)=>x.p_achi >= 0xF55C8,	// SSS+
		(x)=>x.p_achi >= 0xF4240,	// SSS
		(x)=>x.p_achi >= 0xECD10,	// S
		(x)=>x.p_achi >= 0xC3500,	// A
		(x)=>x.p_dxsc == 0		// DXscore 0
	]);

// func : 数えるためのAPI (count○○Dataなど)
// verstr:title後ろの色のclass文字列
// datalist:表示するversionのデータ
// lbllst : 左側に表示する名前
// cells : colspanの単位
// rmsflg:何を表示するか(1:re, 4:ba--ma, 5:ba--re)
// noPlate:プレート表示なし (true:なし, false:あり)
const printLampCount = (func, verstr, datalist, lbllist, rmsflg, noPlate) =>
{	
	if(datalist.length/((rmsflg==1)?1:4) < 5) return '';	//曲数5未満は表示しない

	let rslt_str = '';
	const ba_disp = ((rmsflg&0x4) == 0)?[0,0,0,0,0]:func(datalist.filter((x)=>x.diff==0));
	const ad_disp = ((rmsflg&0x4) == 0)?[0,0,0,0,0]:func(datalist.filter((x)=>x.diff==1));
	const ex_disp = ((rmsflg&0x4) == 0)?[0,0,0,0,0]:func(datalist.filter((x)=>x.diff==2));
	const ma_disp = ((rmsflg&0x4) == 0)?[0,0,0,0,0]:func(datalist.filter((x)=>x.diff==3));
	const re_disp = ((rmsflg&0x1) == 0)?[0,0,0,0,0]:func(datalist.filter((x)=>x.diff==4));

	const cp_list=MaiCompPlateList.map(function(x){return x.name;});
	
	for(let i=0; i<lbllist.length; ++i)
	{
		rslt_str += '<tr class="' + verstr + '">\n';

		if( ba_disp[i]+ad_disp[i]+ex_disp[i]+ma_disp[i]+re_disp[i] == 0 && !noPlate)
		{
			const idx = cp_list.indexOf(lbllist[i]);
			if(idx < 0)	// plate画像情報なし
				rslt_str += make_html('th', 'colspan='+(rmsflg*3+1), '', lbllist[i]);
			else	// plate画像情報あり
				rslt_str += makePlateImgTd((rmsflg*3+1), MaiCompPlateList[idx].addr, lbllist[i]);
		}
		else
		{
			rslt_str += make_html('th', '', '', lbllist[i] + "残り");
			if((rmsflg&0x4) != 0)
			{
				rslt_str += make_html('td', 'colspan=3', 'mai_diff_0', ba_disp[i])
					+ make_html('td', 'colspan=3', 'mai_diff_1', ad_disp[i])
					+ make_html('td', 'colspan=3', 'mai_diff_2', ex_disp[i])
					+ make_html('td', 'colspan=3', 'mai_diff_3', ma_disp[i]);
			}
			if((rmsflg&0x1) != 0)
				rslt_str += make_html('td', 'colspan=3', 'mai_diff_4', re_disp[i]);
		}
		rslt_str += '</tr>\n';
	}
	if(rslt_str != "")
		rslt_str += make_html('tr', '', verstr, make_html('th', 'colspan=' + (rmsflg*3+1), verstr, ''));	//空白行
	return rslt_str;
}

// func : 数えるためのAPI (count○○Dataなど)
// verstr:title後ろの色のclass文字列
// datalist:表示するversionのデータ
// lbllst : 左側に表示する名前
// cells : colspanの単位
// rmsflg:何を表示するか(1:re, 4:ba--ma, 5:ba--re)
const printCount = (func, verstr, datalist, lbllist, cells, rmsflg) =>
{	
//	if(datalist.length/((rmsflg==1)?1:4) < 5) return '';	//曲数5未満は表示しない

	let rslt_str = '';
	const ba_disp = ((rmsflg&0x4) == 0)?[]:func(datalist.filter((x)=>x.diff==0));
	const ad_disp = ((rmsflg&0x4) == 0)?[]:func(datalist.filter((x)=>x.diff==1));
	const ex_disp = ((rmsflg&0x4) == 0)?[]:func(datalist.filter((x)=>x.diff==2));
	const ma_disp = ((rmsflg&0x4) == 0)?[]:func(datalist.filter((x)=>x.diff==3));
	const re_disp = ((rmsflg&0x1) == 0)?[]:func(datalist.filter((x)=>x.diff==4));

	const tmpcolnum = 1+ cells * rmsflg;
	for(let i=0; i<lbllist.length; ++i)
	{
		rslt_str += '<tr class="'+ verstr + '">\n'
			+ make_html('th', '', '', lbllist[i] + '');
		if((rmsflg&0x4) != 0)
		{
			rslt_str += make_html('td', 'colspan='+cells, 'mai_diff_0', ba_disp[i])
				+ make_html('td', 'colspan='+cells, 'mai_diff_1', ad_disp[i])
				+ make_html('td', 'colspan='+cells, 'mai_diff_2', ex_disp[i])
				+ make_html('td', 'colspan='+cells, 'mai_diff_3', ma_disp[i]);
		}
		if((rmsflg&0x1) != 0)
			rslt_str += make_html('td', 'colspan='+cells, 'mai_diff_4', re_disp[i]);
		rslt_str += '</tr>\n';
	}
	if(rslt_str != "")
		rslt_str += make_html('tr', '', verstr, make_html('th', 'colspan=' + tmpcolnum, verstr, ''));	//空白行
	return rslt_str;
}

// pdlist : 表示したいデータ全部
// printFunc : データ表示用関数指定 RecordData内の物を指定
// cols : 1データあたりのcell数 dummy処理用
// rmsflg : 数。1(白だけ), 4(緑--紫), 5(全部) のどれか
const printData = (pdlist, printFunc, cols, rmsflg) =>
{
	const DummyCell = make_html('td', '', 'mai_gray', ''); 
	
	let rslt_str = '';
	
	pdlist.sort((a,b)=>(a.idx!=b.idx)?(a.idx - b.idx):a.diff - b.diff);	//曲id、難易度順に並べなおし

	while(pdlist[0] != undefined)	// pdlistが空になるまで続ける
	{
		// while 1回で1曲分
		const tmpidx = pdlist[0].idx;	// 曲id
		const version = pdlist[0].ver;	// その曲の収録バージョン
		const roop_max = pdlist.filter((x)=>(x.idx==tmpidx)).length;	// 条件を満たす譜面数 4or5or1
		let tmpstr = '';	// 各難易度の表示データ

		const tmpdata = [];	// 表示データの素データ一時格納用
		let n = 0;
		while(n++<roop_max)
			tmpdata.push(pdlist.shift());	// idxが同じデータがpdlistからtmpdataに移動

		tmpdata.forEach((x)=>tmpstr += printFunc(x));	// 表示データ生成
		
		if(roop_max < rmsflg)	// rmsflg=5(全部)なのに、4譜面分しかない場合
			for(let n=0; n<cols; n++) tmpstr += DummyCell;	// ダミーセルを追加
			
		rslt_str += make_html('tr', 'align=center', getVersionClass(version) , 
					make_html('th', '',
						  (printFunc==recordAllHtmlStr || printFunc==myRecordAllHtmlStr)?`t_10`:'t_13',
						  m_nicknamelist[tmpidx]) + tmpstr);
	}
	return rslt_str;
}

const print_fsd_label = (verstr, colnum) =>
{
	return '<tr style="font-size:11px" class="fdx ' + verstr +'">\n'
		+ make_html('td', '', '', ' ')
		+ make_html('td', 'colspan=' + colnum, '', '自分')
		+ make_html('td', '', '', ' ')
		+ make_html('td', 'colspan=' + colnum, '', 'フレ')
		+ '</tr>\n'
		+ make_html('tr', '', '', make_html('th', 'colspan=' + (colnum*2 + 2), verstr, ''));	//空白行
}

// pdlist : 表示したいデータ全部
// col : 数。1(白だけ), 4(緑--紫), 5(全部) のどれか
const printFsdxData = (pdlist, col) =>
{
	const DummyCell = make_html('td', '', 'mai_gray', ''); 
	
	let rslt_str = '';
	
	pdlist.sort((a,b)=>(a.idx!=b.idx)?(a.idx - b.idx):a.diff - b.diff);	//曲id、難易度順に並べなおし

	while(pdlist[0] != undefined)	// pdlistが空になるまで続ける
	{
		const tmpidx = pdlist[0].idx;
		const version = pdlist[0].ver;
		const roop_max = pdlist.filter((x)=>(x.idx==tmpidx)).length;
		let tmpstr = '';
		let n = 0;

		const tmpdata = [];
		while(n++<roop_max)
			tmpdata.push(pdlist.shift());	// idxが同じデータがpdlistからtmpdataに移動

		tmpdata.forEach((x)=>tmpstr += myFsdxHtmlStr(x));
		if(roop_max < col)	// col=5(全部)なのに、4譜面分しかない場合
			tmpstr += DummyCell;	// ダミーセルを追加
		tmpstr += '<td> </td>';
		tmpdata.forEach((x)=>tmpstr += FriendFsdxHtmlStr(x));
		if(roop_max < col)	// col=5(全部)なのに、4譜面分しかない場合
			tmpstr += DummyCell;	// ダミーセルを追加
			
		rslt_str += make_html('tr', 'align=center', getVersionClass(version), 
					make_html('td', '', '', m_nicknamelist[tmpidx]) + tmpstr);
	}
	return rslt_str;
}

const printAllLampCount = (pData, clsname, count_alllampdata, count_alllampstr, count_rankdata, count_rankstr, count_dxscstardata, dxsclbllist) =>
{
	return printCount(count_alllampdata, clsname, pData, count_alllampstr, 1, 5)	// fsd,fcap Lamp
		+ printCount(count_rankdata, clsname, pData, count_rankstr, 1, 5)	// ahivement Rank
		+ printCount(count_dxscstardata( (pData[0].p_dxsc == undefined)?7:5), clsname, pData, dxsclbllist, 1, 5);	// DxScStar
}

const printNazoData = (pdlist, mode, ver, forceMini) =>
{
	let retstr = "";
	const mini = window.innerWidth < 1200 || forceMini;
	const BORDER = (mini)?10:Math.min((Math.floor((window.innerWidth-50) / 93)), 20);	// 1行当たりの最大個数
	const iconlist = (mode.slice(-1) == "e")?m_iconlist:(Array(m_iconlist.length).fill(""));

	if(pdlist.length <= 0){	return retstr;	}	// 何もなければ空文字で終了
	
	const titletxt = Array.prototype.slice.call(comp_version.querySelectorAll('option'))
		.find((x)=>x.getAttribute('value')==(comp_version.value)).innerText;
	
	retstr += make_html("tr", "", getVersionClass(ver), make_html("td", "colspan=" + (BORDER+1), "", titletxt));
	
	for(let n=159; n>=10; n--)
	{
		let tmp_pdlist = pdlist.filter((x)=>x.lv == (n/10));
		if(tmp_pdlist.length <= 0)
			continue;	// 何もないので次に行く
		
		const tmp_length = tmp_pdlist.length;
		
		retstr += make_html("tr", "", getVersionClass(ver), 
			make_html("td", "align=center rowspan="+ (Math.ceil(tmp_length/BORDER)),
			 "", make_html("div", "", ["music_level", mini?("mini"):""].join(" ").trim(), String(n/10).replace(/\.6/, "+")+"("+tmp_length+")" )) + 
			tmp_pdlist.slice(0,BORDER)
				    .map((x)=>make_html("td", "", "", nazoModeHtmlStr(x, mini, m_nicknamelist, m_dxlist, iconlist, ver))).join("\n"));
		for(let m=1; tmp_pdlist.slice(BORDER*m, BORDER*(m+1)).length > 0; m++)
		{
			retstr += make_html("tr", "", getVersionClass(ver), 
				tmp_pdlist.slice(BORDER*m, BORDER*(m+1))
					    .map((x)=>make_html("td", "", "", nazoModeHtmlStr(x, mini, m_nicknamelist, m_dxlist, iconlist, ver))).join("\n"));
		}
		retstr += make_html("tr", "", getVersionClass(ver), make_html("td", "colspan=" + (BORDER+1), "", ""));
	}
	return retstr;
}

const change_logicalmode = (mode) =>
{
    const modevalue = mode.value;
    switch(modevalue)
    {
        case 'and':	mode.value = 'or'; mode.innerText = 'or'; break;	//and -> or
        default:	mode.value = 'and'; mode.innerText = 'and'; break;	//それ以外は全部and行
    }
    return;
}

// 各versionのまとめページ用　舞シリーズall, DXallにも対応
// pData : versionでfilter済みのplayerdata
// ver : versionの数字 
const makeVersionAllCount = (pData, ver, mode) =>
{
	let retstr = "";
	let labelList = []

	changeViewPortSize(640);	// meta の widthを変更

	if(ver>0)	// 鈴と復はプレートカウンターを作成しない。
	{
		switch(ver)
		{
			case 1:	labelList = ['真舞舞', '真神', '(真将)', '真極'];	break;
			case 50: labelList = ['舞舞舞', '舞神', '舞将', '舞極', "覇者"];	break;
			case 51: labelList = ['DX舞舞', 'DX神', 'DX将', 'DX極', "DX覇者"];	break;
			default:
				let verChar = VerStrList[ver].slice(0,1);
				labelList = PlateName.map((x)=>verChar+x);
				break;
		}
		
		retstr += '<table border=1 align=center class="compcond datatable_name_' + labelList.length + '">\n'
			+ printLampCount((mode.split("_")[0]!="m")?countLampData:countLampData_m,
					 getVersionClass(ver), pData, labelList, labelList.length, false)
			+ '</table>\n';
	}
	
	switch(mode.split("_").slice(-1).pop())
	{
		case "count":
			retstr += '<table border=1 align=center class="compcond datatable_name_5">\n'
				+ printAllLampCount(pData, getVersionClass(ver),
						    (mode.split("_")[0]!="m")?countAllLampData:countAllLampData_m,	//count_alllampdata
						    AllLampStr,	//count_alllampstr
						    (mode.split("_")[0]!="m")?countRankData:countRankData_m, //count_rankdata
						    RankStr,	//count_rankstr
						    (mode.split("_")[0]!="m")?countDxscStarData:countDxscStarData_m,	//count_dxscstardata
						    (pData[0].p_dxsc == undefined)?DxscStr:FriDxscStr)	// dxsclbllist
				+ '</table>\n';
			break;

		case "summary":
			retstr += '<table border=1 align=center class="compcond datatable_name_5">\n'
				+ printAllLampCount(pData, getVersionClass(ver),
						    (mode.split("_")[0]!= "m")?countConqLampData:countConqLampData_m,	//count_alllampdata
						    (ver<50)?ConqLampStr:[],	//count_alllampstr
						    (mode.split("_")[0]!="m")?countConqAchiData:countConqAchiData_m, //count_rankdata
						    ConqAchiStr,	//count_rankstr
						    (mode.split("_")[0]!="m")?countDxscStarData:countDxscStarData_m,//count_dxscstardata
						    [])	// dxsclbllist
				+ '</table>\n';
			break;
			
		default:
			break;
	}
	return retstr
		+ "<br>"
		+  makeTotalHighScoreTable( pData, (mode.split("_")[0]=="m"));
}

// pData : 表示させるデータ 表示範囲(version, diff)でfilter済みである事
// d_mode : 表示モード lampとかrankとか
// diff : 難易度
// rmsflg : 数。1(白だけ), 4(緑--紫), 5(全部) のどれか
// version : versionの数字 
const makeTable = (pData, d_mode, diff, rmsflg, version) =>
{
	let retstr = '';
	let labelList = [];
	let tableClass = '';	// minwidth&maxwidthを入れるかどうか
	let VPsize = 640;	// metaのviewport のwidth
	
	switch(version)
	{
		case 1: labelList = ['真舞舞', '真神', '(真将)', '真極'];	break;
		case 50: labelList = ['舞舞舞', '舞神', '舞将', '舞極', "覇者"];	break;
		case 51: labelList = ['DX舞舞', 'DX神', 'DX将', 'DX極', "DX覇者"];	break;
		case 100:
		case 101:
		case 999:
			labelList = [];	break;
			break;
		default:
			if(version <= 0) break;	// 鈴と復はカウンター作らない
			let verChar = VerStrList[version].slice(0,1);
			labelList = PlateName.map((x)=>verChar+x);
			break;
	}
	
	switch(d_mode)
	{			
		case "lamp":	// Lampモード通常
			tableClass = "compcond";
			comp_diff.value=5; comp_diff.classList="compmode mai_white";
			retstr += (labelList.length==0)?""
				:printLampCount(countLampData, getVersionClass(version), pData, labelList, rmsflg, false);
			retstr += printData(pData, lampHtmlStr, 3, rmsflg);
			break;
			
		case "m_lamp":	// Lampモード フレンド時の実行者
			tableClass = "compcond";
			comp_diff.value=5; comp_diff.classList="compmode mai_white";
			retstr += (labelList.length==0)?""
				:printLampCount(countLampData_m, getVersionClass(version), pData, labelList, rmsflg, false);
			retstr += printData(pData, myLampHtmlStr, 3, rmsflg);
			break;
			
		case "rank":	// Rankモード通常
			tableClass = "compcond";
			comp_diff.value=5; comp_diff.classList="compmode mai_white";
			retstr += printCount(countRankData, getVersionClass(version), pData, RankStr, 1, rmsflg);
			retstr += printData(pData, rankHtmlStr, 1, rmsflg);
			break;
			
		case "m_rank":	// Rankモード フレンド時の実行者
			tableClass = "compcond";
			comp_diff.value=5; comp_diff.classList="compmode mai_white";
			retstr += printCount(countRankData_m, getVersionClass(version), pData, RankStr, 1, rmsflg);
			retstr += printData(pData, myRankHtmlStr, 1, rmsflg);
			break;
			
		case "dxsc":	// DXscoreモード
			tableClass = "compcond"
			comp_diff.value=5; comp_diff.classList="compmode mai_white";
			retstr += printCount(countDxscStarData((pData[0].p_dxsc==undefined)?7:5),
					     getVersionClass(version), pData,
					     (pData[0].p_dxsc==undefined)?DxscStr:FriDxscStr,
					     2, rmsflg);
			retstr += printData(pData, dxscHtmlStr, 2, rmsflg);
			break;
			
		case "m_dxsc":	// DXscoreモード フレンド時の実行者
			tableClass = "compcond"
			comp_diff.value=5; comp_diff.classList="compmode mai_white";
			retstr += printCount(countDxscStarData_m(), getVersionClass(version), pData, FriDxscStr, 2, rmsflg);
			retstr += printData(pData, myDxscHtmlStr, 2, rmsflg);
			break;
			
		case "data":	// 難易度別全データ(単独orフレンド）
			if(diff<5)
			{
				tableClass = "compcond";
				retstr += printData(pData.filter((x)=>x.diff==diff), recordOneLineHtmlStr, 1, 1);
			}
			else
			{
				tableClass = "t_10";
				VPsize = 1080;
				retstr += printData(pData, recordAllHtmlStr, (pData[0].p_dxsc==undefined)?6:5, rmsflg);
				comp_diff.value=5; comp_diff.classList="compmode mai_white";
			}
			break;
			
		case "m_data":	// 難易度別全データ(フレンドモードの自分）
			if(diff<5)
			{
				tableClass = "compcond";
				retstr += printData(pData.filter((x)=>x.diff==diff), myRecordOneLineHtmlStr, 1, 1);
			}
			else
			{
				tableClass = "t_10";
				VPsize = 1080;
				retstr += printData(pData, myRecordAllHtmlStr, 5, rmsflg);			
				comp_diff.value=5; comp_diff.classList="compmode mai_white";
			}
			break;

		case "fsdx":
			tableClass = "t_13"
			retstr += print_fsd_label(getVersionClass(version), rmsflg);
			retstr += printFsdxData(pData, rmsflg);
			comp_diff.value=5; comp_diff.classList.add('mai_white');
			break;

		case "nazo":	// 謎モード
		case "nazoe":	// 絵付き謎モード
		case "nazo_mini":	// 謎モード（強制ミニ）
		case "nazoe_mini":	// 謎モード 
			if(skipNazoMode)
				return "";

			if(!checkNazoMode)
			{
				checkNazoMode = confirm("画像データが多いため通信量が増えます。続けますか？");
				if(!checkNazoMode)
				{
					alert("次回実行時まで謎モードを無効化します。");
					// 謎モード消滅
					skipNazoMode = true;
					document.querySelectorAll('#comp_mode option')
						.forEach((x)=>{if (x.getAttribute('value').slice(0,4)=="nazo") x.outerHTML=""});
					comp_mode.value = "data";
					document.querySelectorAll(`#nazo`).forEach((x)=>x.outerHTML="");	// 絞り込みの謎系ボタンを削除
					tableClass = "";
					retstr += printData(pData.filter((x)=>x.diff==Number((diff==5)?3:diff)), recordOneLineHtmlStr, 1, 1);
					break;
				}
			}
			
			tableClass = "nazo_table"+ ((window.innerWidth < 1200)?"_mini":"") + " " + getVersionClass(version) 
			if(window.innerWidth > 1200 && !(/_mini$/.test(d_mode))) VPsize=Math.min(1920, window.innerWidth+12);
			retstr += printNazoData((Number(diff) == 5)?[...pData]:pData.filter((x)=>x.diff==Number(diff)),
						d_mode.split('_')[0], version, d_mode.split('_')[1]=="mini");
			break;

		default:
			break;
	}
	changeViewPortSize(VPsize);
	return (retstr!="")?make_html('table', 'border=1 align=center',
				      [(rmsflg==1)?("compcond_remas " + getVersionClass(version)):tableClass,
				       "datatable_name_"+rmsflg].join(" ").trim(), retstr):"";
}

// 各バージョンのデータを作る 用
// vernum : versionの数字
// mode : 表示モード
// diff : 難易度
// pData : versionでfilter済みのplayerdata
const makeVersionData = (vernum, mode, diff, pData) =>
{	
	let str = '';
	
	switch(mode)	// まとめ系はremaster含めてまとめて表示
	{			
		case "count":
		case "m_count":
		case "summary":
		case "m_summary":
			return makeVersionAllCount(pData, vernum, mode);
			
		default:
			break;
	}
	
	if(50<=vernum && vernum<=59)
	{
		return makeTable(pData, mode, diff, 5, vernum);
	}
	
	// 緑～紫譜面までのデータ
	str += makeTable(pData.filter((x)=>(x.diff < 4)), mode, diff, 4, vernum);

	// 白譜面のデータ
	const re_pdatalist = pData.filter((x)=>(x.diff == 4));
	if(re_pdatalist.length>0)
	{
		str += (str =="")?"":"<br>\n"	// すでにデータがあれば改行、なければそのまま
		switch(mode)
		{
			// lampモードの時はcounterを付けないのでデータだけ
			case "lamp":
				str += make_html('table', 'border=1 align=center', 't_13',
					printData(re_pdatalist, lampHtmlStr, 3, 1));
				break;
				
			case "m_lamp":
				str += make_html('table', 'border=1 align=center', 't_13',
					printData(re_pdatalist, myLampHtmlStr, 3, 1));
				break;
			
			//それ以外はcounter+dataで表示
			default:
			 	str += makeTable(re_pdatalist, mode, diff, 1, vernum) + '\n';
				break;
		}
	}
	return str;
}

const makeConquestCount = (mode) =>
{
	const count_lampdata = (mode.split("_")[0] == "m")?countLampData_m:countLampData;
	const count_conqlamp = (mode.split("_")[0] == "m")?countConqLampData_m:countConqLampData;
	const count_conqachi = (mode.split("_")[0] == "m")?countConqAchiData_m:countConqAchiData;

	return mai_series_data
		+ '<table border=1 align=center class="compcond datatable_name_5">\n'
		+ printLampCount(count_lampdata, "mai_ver_50", playerdata_list.filter((x)=>0<=x.ver&&x.ver<=12),
			     ['舞舞舞', '舞神', '舞将', '舞極', "覇者"], 5, false)
		+ printLampCount(count_lampdata, "mai_ver_51", playerdata_list.filter((x)=>13<=x.ver),
			     ['DX舞舞', 'DX神', 'DX将', 'DX極', "DX覇者"], 5, false)
		+ printCount(count_conqlamp, "mai_ver_white", [...playerdata_list], ConqLampStr, 3, 5)
		+ printCount(count_conqachi, "mai_ver_white", [...playerdata_list], ConqAchiStr, 3, 5)
		+ '</table>\n'	
		+ '<br>'
		+  makeTotalHighScoreTable([...playerdata_list], mode.split("_")[0] == "m");
}

const makeAllPlateCount = (mode, noPlate) =>
{
	const count_lampdata = (mode.split("_")[0] == "m")?countLampData_m:countLampData;

	let str = '';
	str += mai_series_data
		+ '<table border=1 align=center class="compcond datatable_name_5">\n'
		+ printLampCount(count_lampdata, "mai_ver_50", playerdata_list.filter((x)=>0<=x.ver&&x.ver<=12),
			     ['舞舞舞', '舞神', '舞将', '舞極', "覇者"], 5, noPlate)
		+ printLampCount(count_lampdata, "mai_ver_51", playerdata_list.filter((x)=>13<=x.ver),
			     ['DX舞舞', 'DX神', 'DX将', 'DX極', "DX覇者"], 5, noPlate)
		+ '</table>\n';
	
	// 全versionのデータを表示
	str += '<table border=1 align=center class="compcond datatable_name_4">\n';
	for(let n=1; n<VerStrList.length; n++)
	{
		const LavelList = (n==1)?['真舞舞', '真神', '(真将)', '真極']
			:PlateName.map((x)=> VerStrList[n].slice(0,1) + x);
		str += printLampCount(count_lampdata, getVersionClass(n), playerdata_list.filter((x)=>x.ver==n), LavelList, 4, noPlate)
	}
	str += '</table>\n';

	if(noPlate)
	{
		str += "<br>\n"
			+ '<table border=1 align=center class="compcond datatable_name_5">\n'
			+ printAllLampCount([...playerdata_list], 'mai_ver_white',
					    (mode.split("_")[0]!="m")?countAllLampData:countAllLampData_m,	//count_alllampdata
					    AllLampStr,	//count_alllampstr
					    (mode.split("_")[0]!="m")?countRankData:countRankData_m, //count_rankdata
					    RankStr,	//count_rankstr
					    (mode.split("_")[0]!="m")?countDxscStarData:countDxscStarData_m,	//count_dxscstardata
					    (playerdata_list[0].p_dxsc == undefined)?DxscStr:FriDxscStr)	// dxsclbllist	
		+ '</table>\n'
		+ '<br>\n'
		+  makeTotalHighScoreTable([...playerdata_list], mode.split("_")[0] == "m");
	}

	return str;
}

const makeTotalHighScoreTable = (pData, fri) =>	// make_ths_table
{
	const diffname = ['BASIC', 'ADVANCED', 'EXPERT', 'MASTER', 'Re:MASTER'];
	const syncpoint = [0,1,2,5,10,12];
	const sub_total_achi = (i) => pData.filter((x)=>x.diff==i).map((fri)?((y)=>y.p_achi):((y)=>y.achi)).reduce((a,b)=>a+b, 0);
	const sub_total_dxsc = (i) => pData.filter((x)=>x.diff==i).map((fri)?((y)=>y.p_dxsc):((y)=>y.dxsc)).reduce((a,b)=>a+b, 0);
	const sub_total_sycpnt = (i) => pData.filter((x)=>x.diff==i).map((fri)?((y)=>syncpoint[y.p_fsdxLamp]):((y)=>syncpoint[y.fsdxLamp])).reduce((a,b)=>a+b, 0);

	const total_achi = [0,1,2,3,4].map(sub_total_achi);
	const total_dxsc = [0,1,2,3,4].map(sub_total_dxsc);
	const total_sycpnt = [0,1,2,3,4].map(sub_total_sycpnt);
	
	let str = '';
	str += '<table border=1 align=center class="compcond_remas">\n'	// compcond_remasはfont-size統一用
		+ '<tr class=mai_white>'
		+ '<td></td>'
		+ '<th align=center>達成率</th>'
		+ '<th align=center>DXscore</th>'
		+ '<th align=center>SYNC<br>POINT</th>'
		+ '</tr>'
		+ '\n'
	for(let i=0; i<5; ++i)
	{
		str += '<tr class=mai_diff_' + i + '>'
			+ make_html('th', '', '', diffname[i])
			+ make_html('td', 'align=right', '', (total_achi[i]/10000).toFixed(4) + '%%')
			+ make_html('td', 'align=right', '', total_dxsc[i])
			+ make_html('td', 'align=right', '', total_sycpnt[i])
			+ '</tr>\n';
	}
	str += '<tr class=mai_white>'
		+ make_html('th', '', '', 'TOTAL')	
		+ make_html('td', 'align=right', '', ((total_achi.reduce((a,b)=>a+b,0)/10000).toFixed(4) + '%%%'))
		+ make_html('td', 'align=right', '', total_dxsc.reduce((a,b)=>a+b,0))
		+ make_html('td', 'align=right', '', total_sycpnt.reduce((a,b)=>a+b,0))
		+ '</tr>\n';
	
	return str;
}

// 横幅ずれ対処の為、カウンター名称の横幅を統一する。
const fixedNameLabel = () =>
{
	const sub = (clsName) =>
		document.querySelectorAll("." + clsName)
			.forEach((x)=>x.classList.replace(clsName, clsName + "_fixed"));
	sub("datatable_name_4");
	sub("datatable_name_5");
	sub("datatable_name_6");
	return;
}

const changeVersionClassOnDialog = (value) =>
{
	const num_value = Number(value);
	const comp_value = (num_value==100)?50:(num_value==101)?51:num_value;

	id_version.value = num_value;
	comp_version.value = comp_value;
	
	id_version.classList = "compmode " +  ((num_value==999)?"mai_rainbow"
		:Array.from(document.querySelectorAll('#id_version option')).find((x)=>x.value == num_value).classList);
	
	comp_version.classList = "compmode " + ((comp_value==999)?"mai_rainbow"
		:Array.from(document.querySelectorAll('#comp_version option')).find((x)=>x.value == comp_value).classList);

	return;
}

const makeAllData = ( mode ) =>
{
	let modestr;
	
	switch(mode)
	{
		case "count":
		case "m_count":
		case "rank":
		case "m_rank":
		case "dxsc":
		case "m_dxsc":
			// count, rank, dxscの場合は count（plate画像なし&all lamp count）へ
			document.querySelector('#ResultTable').innerHTML = makeAllPlateCount( mode , true );
			modestr = (mode.split("_")[0] == "m")?"m_count":"count";
			break;
		
		case "summary":
		case "m_summary":
			document.querySelector('#ResultTable').innerHTML = makeConquestCount( mode );
			modestr = (mode.split("_")[0] == "m")?"m_summary":"summary";
			break;		

		case "lamp":
		case "m_lamp":
		default:
			// lamp系, nazoの場合は、画像付きplate countにする			
			document.querySelector('#ResultTable').innerHTML = makeAllPlateCount( mode, false );
			modestr = (mode.split("_")[0] == "m")?"m_lamp":"lamp";
			break;
	}

	comp_mode.value = modestr;
	comp_mode.classList = "compmode " + Array.from(document.querySelectorAll('#comp_mode  option')).find((x)=>x.value == modestr).classList
	
	// 横幅ずれ対処の為、カウンター名称の横幅を統一する。
	fixedNameLabel();
	// metaのviewport widthの変更
	changeViewPortSize(640);
	return;			
}

const makeDataTable = (VerStr, mode, diff) =>
{
	const vernum = Number(VerStr);

	const searchModeStr = (id) =>
		Array.from(document.querySelectorAll(`#` + id + ` option`))
			.find((x)=>x.value==document.querySelector(`#`+id).value).innerText;
	
	const dataFilter =
	      (vernum == 50)?((x)=>0<=x.ver && x.ver<=12)	// 旧筐体譜面
		:(vernum == 51)?((x)=>13<=x.ver && x.ver <= MAI_NEWEST_VER) // 新筐体譜面
		:(vernum<0)?((x)=>x.ver<0)	// 旧筐体曲追加白譜面&復活曲
		:(vernum>=500)?((x)=>x)		// 全譜面（使わない予定だが、保険）
		:((x)=>x.ver==vernum);	// 通常
	switch(vernum)
	{
		case 999:	// maimai制覇系
			makeAllData( mode );
			break;
		default:
			document.querySelector('#ResultTable').innerHTML = makeVersionData(vernum, mode, diff, playerdata_list.filter(dataFilter));
			switch(mode.split('_').pop())
			{
				case "count":
				case "summary":
				case "rank":
					// 横幅ずれ対処の為、カウンター名称の横幅を統一する。
					fixedNameLabel();
					break;
				default:
					break;
			}
			break;
	}

	// フレンドモード時の表示するプレイヤー名の切り替え
	if(mode.split(`_`)[0]==`m`)
	{
		document.querySelector(`span.my_name`).classList.remove(`hidden`);
		document.querySelector(`span.player_name`).classList.add(`hidden`);
	}
	else
	{
		document.querySelector(`span.my_name`).classList.add(`hidden`);
		document.querySelector(`span.player_name`).classList.remove(`hidden`);
	}

	const CompModeStrTmp = ":" + searchModeStr(`comp_diff`);
	const CompModeStr = searchModeStr(`comp_version`) + " / " + searchModeStr(`comp_mode`).replace(/→/, CompModeStrTmp);
	dispmode.innerText = "制覇状況 : " + CompModeStr;
	return;
}

const setDiffCond = (diffnum1, diffnum2) =>
{
	id_diff1[0].value = Number(diffnum1);
	id_diff1[0].setAttribute('class', 'compmode mai_diff_' + diffnum1);
	id_diff1[1].value = Number(diffnum2);
	id_diff1[1].setAttribute('class', 'compmode mai_diff_' + diffnum2);
	return;
}

const setLvCond = (min_lv_num, max_lv_num) =>
{
	if(min_lv_num == 18 && max_lv_num == 19)	// 13のボタンを押された
	{
		if(id_lv[0].value == 18 && id_lv[1].value == 19)	// 13のボタンを押した状態
			{ id_lv[1].value = 18; return; }	// 両方 13(valueで18)にする。
		else if(id_lv[0].value == 18 && id_lv[1].value == 18)	// 両方 13の状態
			{ id_lv[0].value = 19; id_lv[1].value = 19; return;}	// 両方 13+(valueで19)にする。
	}
	else if(min_lv_num == 20 && max_lv_num == 21)	// 14のボタンを押された
	{
		if(id_lv[0].value == 20 && id_lv[1].value == 21)	// 21のボタンを押した状態
			{ id_lv[1].value = 20; return; }	// 両方 14(valueで20)にする。
		else if(id_lv[0].value == 20 && id_lv[1].value == 20)	// 両方 14の状態
			{ id_lv[0].value = 21; id_lv[1].value = 21; return; }	// 両方 14+(valueで11)にする。
		
	}

	// 入力値で設定
	id_lv[0].value = min_lv_num;
	id_lv[1].value = max_lv_num;
	return;
}

const setInitialMusicCondition = () =>
	{id_version.value = 999; setDiffCond(0, 4); setLvCond(0,22); id_version.setAttribute('class', 'compmode mai_ver_white'); return;}

const setLampCondition = (id_rank, num1, num2) =>
	{id_rank[0].value = num1; id_rank[1].value = num2; return;}

const changeAchiStrs = (id, rangestr, value) => 
{
	const strList = ["未プレー", "A(80%)未達", "S(97%)未達", "SSS(100%)未達", "SSS+(100.5%)未達", "AP+未達", "全部"];
	const valueList = [0, 79.9999, 96.9999, 99.9999, 100.4999, 100.9999, 101];
	rangestr.innerText = strList[Number(value)];
	setLampCondition(id, 0, valueList[Number(value)]);
	return;
}
 
const setInitialLampCondition = (friendmode) =>
{
	changeAchiStrs(id_achi1, id_achi1rangestr, 6);
	setLampCondition(id_fclamp1, 0, 4);
	setLampCondition(id_fdxlamp1, 0, 5);
	setLampCondition(id_dxscstar1, 0, 7);
	if(friendmode)
	{
		changeAchiStrs(id_achi2, id_achi2rangestr, 6);
		setLampCondition(id_fclamp2, 0, 4);
		setLampCondition(id_fdxlamp2, 0, 5);
		setLampCondition(id_dxscstar1, 0, 5);	// friendモードの時の上限は5
		setLampCondition(id_dxscstar2, 0, 5);
		id_achi_mode.value = 'or'; change_logicalmode(id_achi_mode);
		id_fclamp_mode.value = 'or'; change_logicalmode(id_fclamp_mode);
		id_fdxlamp_mode.value = 'or'; change_logicalmode(id_fdxlamp_mode);
		id_dxscstar_mode.value = 'or'; change_logicalmode(id_dxscstar_mode);
	}
	document.querySelectorAll('.achirangebar').forEach((x)=>x.value=6)
	return;
}

// 条件にマッチする曲リストを生成する
const makeNewMulsicDatalist =
      (newmd, lv_list, diff_list, achi_list, achi2_list, fc_list, fc2_list, fdx_list, fdx2_list, dxscstar_list, dxscstar2_list, version, genre, rankmode, fcmode, fdxmode, dxscmode, sort_cond) =>
{
	const sub = (min, elm, max) => { return (elm!=undefined)?(min<=elm && elm<=max):true; }
	const sub2 = (min1, elm1, max1, min2, elm2, max2, mode) =>
	{
		return (mode == 'and')?(sub(min1,elm1,max1) && sub(min2,elm2,max2))
			:(mode == 'or')?(sub(min1,elm1,max1) || sub(min2,elm2,max2)):false;
	}
	const lv2lvvalue = (lv) =>
	{
		const tmp1 = Math.floor(lv), tmp2 = lv - tmp1;
		return (tmp1 < 7)?(tmp1-1):(6+2*(tmp1-7)+((tmp2<0.55)?0:1));
	}
	
	const condition_sort = (sort_cond) => (a, b) => 
	{
		const achi_a = a.achi;
		const achi_b = b.achi;
		const dxscper_a = a.dxscRatio;
		const dxscper_b = b.dxscRatio;
		
		switch(sort_cond)
		{
			case "achi_big":
				return (achi_a==achi_b)?(dxscper_b - dxscper_a):(achi_b - achi_a);
			case "achi_sml":
				return (achi_a==achi_b)?(dxscper_a - dxscper_b):(achi_a - achi_b);
			case "dxsc_big":
				return (dxscper_a==dxscper_b)?(achi_b - achi_a):(dxscper_b - dxscper_a);
			case "dxsc_sml":
				return (dxscper_a==dxscper_b)?(achi_a - achi_b):(dxscper_a - dxscper_b);
			default :
				return ((a,b)=>a+b)
		}
	}

	const [lv_min, lv_max] = lv_list.sort((a,b)=>a-b);
	const [diff_min, diff_max] = diff_list.sort((a,b)=>a-b);
	const [achi_min, achi_max] = achi_list.sort((a,b)=>a-b);
	const [achi2_min, achi2_max] = achi2_list.sort((a,b)=>a-b);
	const [fc_min, fc_max] = fc_list.sort((a,b)=>a-b);
	const [fc2_min, fc2_max] = fc2_list.sort((a,b)=>a-b);
	const [fdx_min, fdx_max] = fdx_list.sort((a,b)=>a-b);
	const [fdx2_min, fdx2_max] = fdx2_list.sort((a,b)=>a-b);
	const [dxscstar_min, dxscstar_max] = dxscstar_list.sort((a,b)=>a-b);
	const [dxscstar2_min, dxscstar2_max] = dxscstar2_list.sort((a,b)=>a-b);

	let tmp_md = playerdata_list.filter((md)=>sub(diff_min, md.diff, diff_max))
		.filter((md)=>sub(lv_min, lv2lvvalue(md.lv), lv_max))
	switch(version)
	{
		case 999: break;	//全譜面なのでfilter不要

		case 51:	//DX対象譜面
			tmp_md = tmp_md.filter((md)=>13<=md.ver);
			break;
		case 50:	//舞対象譜面
			tmp_md = tmp_md.filter((md)=>(0<=md.ver && md.ver<=12));
			break;
		case 100:	//全std譜面
			tmp_md = tmp_md.filter((md)=>m_dxlist[md.idx] == 0);
			break;
		case 101:	//全dx譜面
			tmp_md = tmp_md.filter((md)=>m_dxlist[md.idx] == 1);
			break;
		case -1:	//復活曲・追加std
			tmp_md = tmp_md.filter((md)=>(md.ver<0));
			break;
		default:	//それ以外
			if(0<=version && version<=MAI_NEWEST_VER)	//超から現まで
				tmp_md = tmp_md.filter((md)=>md.ver==version);
			break;			
	}

	tmp_md = tmp_md.filter((md)=>sub2(achi_min, md.achi, achi_max, achi2_min, md.p_achi, achi2_max, rankmode))
		.filter((md)=>sub2(fc_min, md.fcapLamp, fc_max, fc2_min, md.p_fcapLamp, fc2_max, fcmode))
		.filter((md)=>sub2(fdx_min, md.fsdxLamp, fdx_max, fdx2_min, md.p_fsdxLamp, fdx2_max, fdxmode))
		.filter((md)=>sub2(dxscstar_min, Math.floor(md.dxscStar), dxscstar_max, dxscstar2_min, md.p_dxscStar, dxscstar2_max, dxscmode))
		.sort(condition_sort(sort_cond));

	tmp_md.forEach((x)=>newmd.push(x));	// 条件を満たしたはずなので、リストに追加
	
	return;
}

const selectRandom = ( friendmode, short_on, nazostr ) =>
{
	const newmd = [];

	const Modes2Str = (id) => 
	{
		const searchIdsValue = (id) =>
			Array.from(document.querySelectorAll(`#`+id))
				.map((x)=>x.value).sort((a,b)=>Number(a)-Number(b));
		
		const searchValues2Strs = (values,id) =>
			values.map((x)=>Array.from(document.querySelectorAll(`#` + id + ` option`))
				.find((y)=>y.value==x).innerText);
		
		const TmpValue = searchIdsValue(id);
		const LowValue = Number(TmpValue[0]);
		const HighValue = Number(TmpValue[1]);
		
		switch(id)
		{
			case `id_version`:
				if(TmpValue[0] == `999`)	return ``;
				else	return searchValues2Strs(TmpValue, id)[0];
				
			case `id_diff1`:
				if(TmpValue[0]=='0' && TmpValue[1]=='4')	return ``;
				else if(TmpValue[0]==TmpValue[1])
					return searchValues2Strs(TmpValue, id)[0];
				else
					return searchValues2Strs(TmpValue, id).join(`～`);
				
			case `id_lv`:
				if(TmpValue[0]=='0' && TmpValue[1]=='22')	return ``;
				else if(TmpValue[0]==TmpValue[1])
					return "Lv"+searchValues2Strs(TmpValue, id)[0];
				else
					return searchValues2Strs(TmpValue, id).map((x)=>"Lv"+x).join(`～`);
				
			case `id_achi1`:
				if(LowValue==0 && HighValue==101)	return ``;
				else if(LowValue==0 && HighValue==100.9999)	return `AP+未達`;
				else if(LowValue==0 && HighValue==100.4999)	return `SSS+未達`;
				else if(LowValue==0 && HighValue==99.9999)	return `SSS未達`;
				else if(LowValue==0 && HighValue==94.9999)	return `SS+未達`;
				else if(LowValue==0 && HighValue==98.9999)	return `SS未達`;
				else if(LowValue==0 && HighValue==97.9999)	return `S+未達`;
				else if(LowValue==0 && HighValue==96.9999)	return `S未達`;
				else if(LowValue==0 && HighValue==79.9999)	return `未クリア`;
				else if(LowValue==0 && HighValue==0)	return `未プレー`;
				else	return LowValue + `%～` + HighValue + `%`;
				
			case `id_fclamp1`:
				if(LowValue==0 && HighValue==4)	return ``;
				else if(LowValue==0 && HighValue==3)	return `未AP+`;
				else if(LowValue==0 && HighValue==2)	return `未AP`;
				else if(LowValue==0 && HighValue==1)	return `未FC+`;
				else if(LowValue==0 && HighValue==0)	return `未FC`;
				else if(LowValue==HighValue)	return searchValues2Strs(TmpValue, id)[0];
				else	return searchValues2Strs(TmpValue, id).join(`～`);
				
			case `id_fdxlamp1`:
				if(LowValue==0 && HighValue==5)	return ``;
				else if(LowValue==0 && HighValue==4)	return `未FSD+`;
				else if(LowValue==0 && HighValue==3)	return `未FSD`;
				else if(LowValue==0 && HighValue==2)	return `未FS`;
				else if(LowValue==0 && HighValue==1)	return `未FS`;
				else if(LowValue==0 && HighValue==0)	return `未Sy`;
				else if(LowValue==HighValue)	return searchValues2Strs(TmpValue, id)[0];
				else	return searchValues2Strs(TmpValue, id).join(`～`);
				
			case `id_dxscstar1`:
				if(LowValue==0 && HighValue==7)	return ``;
				else if(LowValue==HighValue)	return searchValues2Strs(TmpValue, id)[0];
				else	return searchValues2Strs(TmpValue, id).join(`～`);
				
			case `sort_cond`:
				if(TmpValue[0]==`none`)	return ``;
				else	return searchValues2Strs(TmpValue, id)[0] + "い順";
			default:	return ``;
		}
	}
	
	// 対象譜面リスト作成
	if(friendmode)
	{
		makeNewMulsicDatalist(
			newmd,
			Array.prototype.map.call(id_lv, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_diff1, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_achi2, (x)=>Math.round(Number(x.value)*10000)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_achi1, (x)=>Math.round(Number(x.value)*10000)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_fclamp2, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_fclamp1, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_fdxlamp2, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_fdxlamp1, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_dxscstar2, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_dxscstar1, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Number(id_version.value),
			-1,
			id_achi_mode.value,
			id_fclamp_mode.value,
			id_fdxlamp_mode.value,
			id_dxscstar_mode.value,
			"none"	// フレンドモードではソートはやらない
		);		
	}
	else
	{
		makeNewMulsicDatalist(
			newmd,
			Array.prototype.map.call(id_lv, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_diff1, (x)=>Number(x.value)).sort((a,b)=>a-b),
			Array.prototype.map.call(id_achi1, (x)=>Math.round(Number(x.value)*10000)).sort((a,b)=>a-b),
			[0, 1010000],
			Array.prototype.map.call(id_fclamp1, (x)=>Number(x.value)).sort((a,b)=>a-b),
			[0, 5],
			Array.prototype.map.call(id_fdxlamp1, (x)=>Number(x.value)).sort((a,b)=>a-b),
			[0, 5],
			Array.prototype.map.call(id_dxscstar1, (x)=>Number(x.value)).sort((a,b)=>a-b),
			[0,7],
			Number(id_version.value),
			-1,
			'and',
			'and',
			'and',
			'and',
			sort_cond.value
		);
	}

	// フレンド名（単独モードの時はプレイヤー名）を表示
	document.querySelector(`span.my_name`).classList.add(`hidden`);
	document.querySelector(`span.player_name`).classList.remove(`hidden`);
	const ModeStr =
		[`id_version`,`id_diff1`,`id_lv`,`id_achi1`,`id_fclamp1`,`id_fdxlamp1`,`id_dxscstar1`,`sort_cond`]
			.map(Modes2Str).filter((x)=>x!=``).join(`/`);
	
	changeViewPortSize(640);
	
	// 絞り込み条件表示
	dispmode.innerText = `絞り込み：` + ((friendmode)?`フレンドモード`:(ModeStr==``)?`全譜面`:ModeStr);
	
	const newmd_length = newmd.length;
	// 対象譜面がなければ終了
	if(newmd_length ==0)
	{
		document.querySelector('#ResultTable').innerHTML = '<div align=center>条件を満たす譜面数：0個</div>\n';
		return;
	}

	const disp_trackcount = Number(id_trackcount.value)
	if(newmd_length > 31415 && disp_trackcount > 4 && sort_cond.value =="none")
	{
		document.querySelector('#ResultTable').innerHTML = '<div align=center>条件を満たす譜面数：' + newmd_length + '個</div><br>\n'
			+ '<div align=center>31415譜面以下に絞ってください。（表示不可）</div>\n';
		return;
	}

	if(nazostr != "")
	{
		document.querySelector('#ResultTable').innerHTML = 
			make_html('div', 'align=center', '', '条件を満たす譜面数：' + newmd_length + '個')
			+ ((newmd_length > 31415)?('<div align=center>31415譜面以下に絞ってください。（表示不可）</div>\n')
				:(makeTable(newmd, nazostr, 5, 5, Number(id_version.value))));
	}
	else
	{
		// 選曲用index作成 対象譜面が少ない場合に同じものが出ないように対策
		let idxlist = [];	//index置き場
		if(disp_trackcount < 5)	// 4 track分まではランダム。5以上（実質31415譜面用）はランダム掛けない
		{
			while(idxlist.length < disp_trackcount)
			{
				let tmpidxlist = [];
				const choose_track = Math.min(disp_trackcount, newmd_length);
				while(tmpidxlist.length < choose_track)
				{
					tmpidxlist.push(Math.floor(Math.random(random_seed())*newmd_length));	//適当に選んでpush
					tmpidxlist = Array.from(new Set(tmpidxlist));	//重複削除
				}
				tmpidxlist.forEach((x)=>idxlist.push(x));
				idxlist.slice(0,disp_trackcount);
			}
		}
		else
			idxlist = newmd.map((_,a)=>a);	//ランダム選曲前のリストをそのまま使用
		
		let disp_data = '';
		disp_data += '<table align=center class="t_' + ((short_on)?12:14) + ' width' + ((short_on)?600:500) + '">\n';
		const disp_length = (disp_trackcount > 4)?Math.min(idxlist.length, 31415):disp_trackcount;
		for(let n=0; n<disp_length; ++n)
		{
			disp_data += recordHtmlStr_short(newmd[idxlist[n]], short_on);
			disp_data += "<tr><td height=5px></td></tr>\n";	//空行
		}
		disp_data += '</table>\n';
		document.querySelector('#ResultTable').innerHTML = 
			make_html('div', 'align=center', '', '条件を満たす譜面数：' + newmd_length + '個') + disp_data;
		
		return;
	}
}

const changeViewPortSize = (width) =>
{
	document.head.querySelector(`meta`).content = `width=`+width;
	return;
}		

const displayDeviceInfo = () =>
{
	let tmpstr = window.parent.screen.height + ` * ` + window.parent.screen.width + ` parent.screen\n`
//		+ screen.height + ` * ` + screen.width + ` : screen\n`
//		+ screen.availHeight + ` * ` + screen.availWidth + ` : screen.avail\n`
		+ window.innerHeight + ` * ` + window.innerWidth + ` : window.inner\n`
//		+ document.body.clientHeight + ` * ` + document.body.clientWidth + ` : document.body.client\n`
		+ screen.orientation.angle + ` ` + screen.orientation.type;
	
	alert (tmpstr);
}

// 呼び出した後で自動で実行するscript

(function()
{
	const mainet_dom = 'https://maimaidx.jp/maimai-mobile/';
	let dxlist=[], titlelist=[], r_dxlist=[], r_titlelist=[];
	
	const music_ver_count=[1, 88, 58, 53, 30, 32, 36, 35, 47, 41, 50, 46, 59, 78, 58, 61, 65, 76, 76, 79, 73, 74]; //最新は計算で
	const remas_music_count=[in_lv.filter((x)=>x.dx==0 && x.lv[4]!=0).length];	// Remas譜面数
	
	const checkGotData = (ba, ad, ex, ma, re) =>
	{
		const ml_length = in_lv.filter((md)=>md.lv[3]!=0).length;	// 曲総数（stdとdxは別カウント） stdの追加白譜面を除外してカウント
		const re_ml_length = in_lv.filter((md)=>md.lv[4]!=0).length;	// 白譜面総数
				
		return (ba.length < ml_length)?false
		:(ad.length < ml_length)?false
		:(ex.length < ml_length)?false
		:(ma.length < ml_length)?false
		:(re.length < re_ml_length)?false
		:true;
	}

	const makePlayerData_new = (ba_data, ad_data, ex_data, ma_data, re_data, p_check, friendmode) =>
	{
		return new Promise((resolve) =>
		{
			// in_lvはこの後のwhile処理後に空になるので、その前に譜面数を算出
			music_ver_count.push(ba_data.length - in_lv.filter((x)=>x.v<MAI_NEWEST_VER).length);	//現行バージョンの曲数
			remas_music_count.push(re_data.filter((x)=>x==1).length);	//でらっくす譜面のReMas総数

			let IdxCount = 0;
			while(ba_data[0] != undefined)	// データが残っている間
			{
				const TmpDataName = ba_data[0][0];	// 曲名
				const TmpDataKind = (ba_data[0][1] == "dx")?1:0;	// 譜面種別
				const TmpMusicData = in_lv[0];	// 保持データの先頭

				let version;
				let icon = "";

				if(TmpMusicData.n == TmpDataName && TmpMusicData.dx == TmpDataKind)	// 新収録でない
				{
					DispName = (TmpMusicData.nn!=undefined)?TmpMusicData.nn:TmpDataName;	// 略称あるなら変更
					icon = (!p_check)?"":(TmpMusicData.ico != undefined)?TmpMusicData.ico:""; // いこん
					version = TmpMusicData.v;	// version
					in_lv.shift();	// 曲データの先頭をpop
				}
				else	// 新収録譜面
				{
					DispName = TmpDataName;
					icon = ""
					version = MAI_NEWEST_VER;
				}
				
				playerdata_list.push(makeRecordData_new(ba_data.shift(), IdxCount, version, 0));	// 緑譜面のデータを加工して追加
				playerdata_list.push(makeRecordData_new(ad_data.shift(), IdxCount, version, 1));	// 黄譜面のデータを加工して追加
				playerdata_list.push(makeRecordData_new(ex_data.shift(), IdxCount, version, 2));	// 赤譜面のデータを加工して追加
				playerdata_list.push(makeRecordData_new(ma_data.shift(), IdxCount, version, 3));	// 紫譜面のデータを加工して追加

				// Re:Mas関連
				if(re_data[0] != undefined)
				{
					if(re_data[0][0] == TmpDataName && ((re_data[0][1] == "dx")?1:0) == TmpDataKind)	// 同じ場合のみ処理
					{
						// 旧譜面曲追加Re:Masterは、versionをマイナスにする
						const TmpVer = ((TmpMusicData.lv[5] != undefined)?-1:1) * version;
						playerdata_list.push(makeRecordData_new(re_data.shift(), IdxCount, TmpVer, 4));	// 白譜面のデータを加工して追加
					}
				}

				m_titlelist.push(TmpDataName);	//曲リストに追加
				m_nicknamelist.push(DispName);
				m_dxlist.push(TmpDataKind);		//dxリストに追加
				m_iconlist.push(icon);
				IdxCount++;
			}
			resolve();
		});
	}

	const printHeader = (title) =>
	{
		return "<head>\n"
			+ `<meta name="viewport" content="width=640">`
			+ "<title>" + title + " の制覇状況解析 | あならいざもどき2</title>\n"
			+ "<link rel='stylesheet' media='all' type='text/css' href='https://sgimera.github.io/mai_RatingAnalyzer/css/maidx_negoto_analyzer.css'>\n"
			+ '<style type="text/css">\n'
			+ 'body{font-family:var(--gothic-font-families); background-color:#51bcf3;}\n'
			+ "</style>"
			+ "</head>\n";
	}
	
	const printTitle = (str, friendmode) =>
	{
		return `<div class="t_24 f_bold" align=center onclick=displayDeviceInfo()>あならいざもどき2　maimaiDX 制覇状況解析</div>\n`
			+ "<div align=center class=t_12>from 新・CYCLES FUNの寝言</div>\n"
			+ "<div align=center class=t_14>ご要望・不具合のご連絡は<a href='https://twitter.com/sgimera'>@sgimera</a>までどうぞ。</div>\n"
			+ '<div class=t_12 style="float:right">処理時間 : <span id=exec_time></span>ms</div>\n'
			+ `<div class=t_12 style="float:left; border:1px solid black; background-color:orange;" onclick="captureData();">スクショ取る</div>\n`
			+ `<div style="clear:both"></div>\n`
			+`<hr style="margin:2px 0px;">\n`
	}

	// モーダルウインドウの本体
	const putModalDialog = (name, pname, friendmode) =>
	{
		// 制覇状況のversion
		const makeCompVersionField = () =>
		{
			const sub_make_name = (n) => VerStrList[n].slice(0,1) + ' ' + music_ver_count[n] + ' ' + VerStrList[n].slice(2);
	
			return `<select id=comp_version value=999 class="compmode mai_rainbow" `
				+ `onchange="changeVersionClassOnDialog(this.value);">\n`
				+ make_html('option', 'value=999', 'mai_ver_50', 'maimai制覇')
				+ Array.from({length:(MAI_NEWEST_VER+1)})
					.map((_,n)=>make_html('option', 'value=' + n, getVersionClass(n), sub_make_name(n))).join("")
				+ make_html('option', 'value=-1', 'mai_ver_revival', '追加STD白譜面&復帰曲')
				+ make_html('option', 'value=50', 'mai_ver_50', '舞対象全STD譜面 ' + music_ver_count.slice(0,13).reduce((a,b)=>a+b, 0))
				+ make_html('option', 'value=51', 'mai_ver_51', '全DX(以降追加)譜面 ' + music_ver_count.slice(13).reduce((a,b)=>a+b, 0))
				+ '</select>\n';
		}
	
		// 制覇状況のモード
		const makeCompModeField = (friendmode, prime) =>
		{
			const makeField = (value, clsnm, name) => make_html("option", "value='" + value + "'", clsnm, name);
	
			if(friendmode)
			{
				return `<select id=comp_mode value="summary" class="compmode mai_white" style="text-align:center">\n`
					+ makeField("summary", "mai_white", "まとめ(フレンド)")
					+ makeField("count", "mai_white", "各種カウント(フレンド)")
					+ makeField("lamp", "mai_white", "制覇Lamp&Plate(フレンド)")
					+ makeField("rank", "mai_white", "達成率Rank(フレンド)")
					+ makeField("dxsc", "mai_white", "でらっくスコア(フレンド)")
					+ makeField("data", "mai_white", "レコード(フレンド)&rarr;")
					+ makeField("fsdx", "mai_white", "FullSync状況")
					+ makeField("m_summary", "mai_white", "まとめ(自分)")
					+ makeField("m_count", "mai_white", "各種カウント(自分)")
					+ makeField("m_lamp", "mai_white", "制覇Lamp&Plate(自分)")
					+ makeField("m_rank", "mai_white", "達成率Rank(自分)")
					+ makeField("m_dxsc", "mai_white", "でらっくスコア(自分)")
					+ makeField("m_data", "mai_white", "レコード(自分)&rarr;")
					+ '</select>\n';
			}
			else
			{
				return '<select id=comp_mode value="summary" class="compmode mai_white" style="text-align:center">\n'
					+ makeField("summary", "mai_white", "まとめ")
					+ makeField("count", "mai_white", "各種カウント")
					+ makeField("lamp", "mai_white", "制覇Lamp&Plate")
					+ makeField("rank", "mai_white", "達成率Rank")
					+ makeField("dxsc", "mai_white", "でらっくスコア")
					+ makeField("data", "mai_white", "レコード&rarr;")
					+ makeField("nazo", "mai_white", "謎&rarr;")
					+ ((window.innerWidth >= 1200)?makeField("nazo_mini", "mai_white", "謎(mini)&rarr;"):"")
					+ ((prime)?makeField("nazoe", "mai_white", "謎絵&rarr;"):"")
					+ ((prime && window.innerWidth >= 1200)?makeField("nazoe_mini", "mai_white", "謎絵(mini)&rarr;"):"")
					+ '</select>\n';
			}
		}

		// 制覇状況の難易度
		const makeCompDiffField = () =>
		{
			const makeField = (value, clsnm, name) => make_html("option", "value='" + value + "'", clsnm, name);
	
			return `<select id=comp_diff value=5 class="compmode mai_white" style="text-align:center" `
				+ `onchange="this.setAttribute('class', 'compmode ' + Array.from(this.querySelectorAll('option')).find((x)=>x.value == this.value).classList[0]);">\n`
				+ makeField("5", "mai_white", "全難易度")
				+ makeField("4", "mai_diff_4", "Re:MASTER")
				+ makeField("3", "mai_diff_3", "MASTER")
				+ makeField("2", "mai_diff_2", "EXPERT")
				+ makeField("1", "mai_diff_1", "ADVANCED")
				+ makeField("0", "mai_diff_0", "BASIC")
				+ '</select>\n';
		}

		const sub = (label, fieldfunc) =>
		{
			return '<th align=right>' + label + '</th>\n'
				+ '<td style="padding: 4px 4px;" align=center' + ((friendmode)?' colspan=2':'') + '>' + fieldfunc + '</td>\n';
		}
		
		const sub_andor = (label, mode_id, fieldfunc, filed_id) =>
		{
			return '<th align=right>' + label
				+ ((friendmode)?('<br><button class=select type="button" id="' + mode_id + '" value="and" onclick="change_logicalmode(' + mode_id + ')">and</button>'):'')
				+ '</th>\n'
				+ '<td style="padding: 4px 4px;" align=center>' + fieldfunc(filed_id + '1')  + '</td>\n'
				+ ((friendmode)?('<td style="padding: 4px 0px;" align=center>' + fieldfunc(filed_id + '2')  + '</td>\n'):'')
		}			

		// 絞り込み側のversion
		const makeVersionField = () =>
		{
			const sub_make_name = (n) => VerStrList[n].slice(0,1) + ' ' + music_ver_count[n] + ' ' + VerStrList[n].slice(2);
			
			return `<select id=id_version value=999 class=compmode onchange="changeVersionClassOnDialog(this.value)">\n`
				+ make_html('option', 'value=999', 'mai_ver_50', '全譜面')
				+ Array.from({length:(MAI_NEWEST_VER+1)})
					.map((_,n)=>make_html('option', 'value=' + n, getVersionClass(n), sub_make_name(n))).join("")
				+ make_html('option', 'value=-1', 'mai_ver_revival', '追加STD白譜面&復帰曲')
				+ make_html('option', 'value=50', 'mai_ver_50', '舞対象全STD譜面 ' + music_ver_count.slice(0,13).reduce((a,b)=>a+b, 0))
				+ make_html('option', 'value=51', 'mai_ver_51', '全DX(以降追加)譜面 ' + music_ver_count.slice(13).reduce((a,b)=>a+b, 0))
				+ make_html('option', 'value=100', 'mai_ver_100', '全スタンダード譜面')
				+ make_html('option', 'value=101', 'mai_ver_101', '全でらっくす譜面')
				+ '</select>\n';
		}

		// 絞り込み側の難易度
		const makeDiffField = () =>
		{
			const diffname = ['BAS', 'ADV', 'EXP', 'MAS', 'Re:M'];
			const subfunc = (idname) =>
			{
				let tmp = '';
				tmp += '<select id=id_diff' + idname
					+ ' class=compmode onchange="' + "this.setAttribute('class', 'compmode mai_diff_' + Number(this.value))" + '">\n';
				for(let n=0; n<5; n++)
					tmp += make_html('option', 'value=' + n, 'mai_diff_' + n, diffname[n]);
				tmp += '</select>\n';
				return tmp;
			}
			return  '<button type=button class="compmode mai_diff_0" onclick="setDiffCond(0,0)">緑</button>\n'
				+ '<button type=button class="compmode mai_diff_1" onclick="setDiffCond(1,1)">黄</button>\n'
				+ '<button type=button class="compmode mai_diff_2" onclick="setDiffCond(2,2)">赤</button>\n'
				+ '<button type=button class="compmode mai_diff_3" onclick="setDiffCond(3,3)">紫</button>\n'
				+ '<button type=button class="compmode mai_diff_4" onclick="setDiffCond(4,4)">白</button>\n'
				+ '<button type=button class="compmode mai_diff_4" onclick="setDiffCond(3,4)">紫白</button>\n'
				+ '<div style="height:4px"></div>'
				+ subfunc(1) + ' から ' + subfunc(1);
		}

		// 絞り込み側のLevel
		const makeLvField = () =>
		{
			const makeLvSelector = () =>
			{
				let tmp = '';
				tmp += '<select id=id_lv class="mai_white compmode">\n';
				for(let n=0; n<6; n++)
					tmp += make_html('option', 'value=' + n, '', n+1);
				for(let n=0; n<8; n++)
				{
					tmp += make_html('option', 'value=' + ((2*n)+6), '', (n+7));
					tmp += make_html('option', 'value=' + ((2*n)+7), '', (n+7)+'+');
				}
				tmp += '<option value=22>15</option>\n';
				tmp += '</select>\n';
				return tmp;
			}
				return makeLvSelector() + ' から' + makeLvSelector()
					+ '<div style="height:4px"></div>\n'
					+ '<button type=button class="compmode" onclick="setLvCond(0,22)">全部</button>\n'
					+ '<button type=button class="compmode" onclick="setLvCond(0,17)">～12+</button>\n'
					+ '<button type=button class="compmode" onclick="setLvCond(18,19)">13(+)</button>\n'
					+ '<button type=button class="compmode" onclick="setLvCond(20,21)">14(+)</button>\n';
		}

		// 達成率のスライドバー
		const makeAchiField = (idname) =>
		{
			const sub = make_html('input', 'value=0 type="number" min="0" max="101" step="0.0001" id=' + idname, 'compmode no-spin', '')
			const sub2 = (num) => make_html("option", "value="+num, "", "");
			return sub + ' から ' + sub
				+ "<div>\n"
				+ "<span id=" + idname + "rangestr>全部</span><br>\n"
				+ "0<input type=range list=achirangelist min=0 max=6 step=1 value=6 class=achirangebar onchange='changeAchiStrs(" + idname + ", " + idname + "rangestr, Number(this.value))'>101\n"
				+ "<datalist id=achirangelist> "
				+ sub2(0) + sub2(1) + sub2(2) + sub2(3) + sub2(4) + sub2(5) + sub2(6)
				+ "</datalist>\n"
				+ "</div>\n"
		}

		// lamp系のdata fieldは nameとvalue以外が共通処理の為、生成処理をまとめる。
		const makeLampField = (lavelname, valuelist, idname) =>
		{
			const subfunc = () =>
			{
				let tmp = '';
				tmp += '<select id=' + idname + ' class="mai_white compmode">\n';
				for(let n = 0; n<lavelname.length; n++)
				{
					if(lavelname[n] != '')
						tmp += make_html('option', 'value=' + valuelist[n], '', lavelname[n]);
				}
				tmp += '</select>\n';
				return tmp;
			}
			
			return subfunc() + ' から ' + subfunc();
		}

		// FC/APのフィールド
		const makeFcapField = (idname) =>
		{
			return makeLampField(['(未)'].concat(LampList.slice(1)), new Array(LampList.length).fill(0).map((x,a)=>a), idname)
				+ '<div style="height:4px"></div>'
				+ '<button class=compmode type=button onclick="setLampCondition(' + idname + ',0,0)">未FC</button>\n'
				+ '<button class=compmode type=button onclick="setLampCondition(' + idname + ',0,2)">未AP</button>\n';
		}

		// FDXのフィールド
		const makeFsdxField = (idname) =>
		{
			return makeLampField(['(未)'].concat(FsdxList.slice(1)), new Array(FsdxList.length).fill(0).map((_,a)=>a), idname)
				+ '<div style="height:4px"></div>'
				+ '<button class=compmode type=button onclick="setLampCondition(' + idname + ',0,3)">未FSD</button>\n';
		}
		
		// 絞り込みのでらスコ☆
		const makeDXscoreField = (friendmode) => (idname) =>
		{
			const dxscore = (friendmode)?[0,1,2,3,4,5]:[0, 1, 2, 3, 4, 5, 6, 7];
			return makeLampField(dxscore.map((x)=>('☆'+x)), dxscore, idname)
				+ ((friendmode)?'':('<div style="height:4px"></div>\n'
						    + '<button class=compmode type=button onclick="setLampCondition(' + idname + ',0,0)">☆0</button>\n'
						   ));	
		}

		// 絞り込み側の並び替え用field
		const makeSortField = (friendmode) =>
		{
			if(friendmode)
				return '<tr>\n' + make_html('th', 'colspan=2 align="right"', '', '並び替え')
					+ make_html('td', 'colspan=3 align=center', '',
						    make_html('select', 'id="sort_cond"', 'compmode',
							      make_html('option', 'value="none" selected', '', '標準')
							     )
						   )
					+ '</tr>\n';
			else
				return '<tr>\n' + make_html('th', 'colspan=2 align="right"', '', '並び替え')
					+ make_html('td', 'colspan=2 align=center', '',
						    make_html('select', 'id="sort_cond"', 'compmode',
							      make_html('option', 'value="none" selected', '', '標準')
							      + make_html('option', 'value="achi_big"', '', '達成率 高')
							      + make_html('option', 'value="achi_sml"', '', '達成率 低')
							      + make_html('option', 'value="dxsc_big"', '', 'DXscore% 高')
							      + make_html('option', 'value="dxsc_sml"', '', 'DXscore% 低')
							     )
						   )
					+ '</tr>\n';
		}

		// 絞りこみ側の表示track数
		const makeTrackCountField = () =>
		{
			let tmp = '';
			tmp += '<div class=t_15>';
			tmp += '<select id=id_trackcount class=compmode>\n';
			tmp += '<option value=' + 31415 + '>一覧(max 31415) </option>\n';
			for(let n = 1; n<5; n++)
				tmp += '<option value=' + n + '>' + n + ' track分</option>\n';
			tmp += '</select>\n';
			tmp += '</div>\n';
			return tmp;
		}

		// 絞り込み側のボタン
		const putSelectButtons = (friendmode) =>
		{
			const prime = (name==pname);
			const makeNaozeButton = ( shorton, nazostr, buttonName ) =>
				`<button class="compmode decide"` + ((nazostr.slice(0,4)=="nazo")?`id="nazo"`:``) + ` type=button onclick='`
				+ `selectRandom(` + friendmode + `, ` + shorton + `, "` + nazostr + `"); `
				+ `condition.close();'>` + buttonName + `</button>`;
			
			return '<div style="text-align:center">'
				+ `<span class="f_13">下のボタンを押して絞り込み</span>`
				+ `</div>`
				+ '<div style="text-align:center">'
				+ makeNaozeButton(false, "", `通常`)
				+ makeNaozeButton(true, "", `短縮`)
				+ ((!friendmode)?makeNaozeButton(false, "nazo", `謎`):"")
				+ ((!friendmode && window.innerWidth >= 1200)?makeNaozeButton(false, "nazo_mini", `謎(mini)`):"")
				+ ((!friendmode && prime)?makeNaozeButton(false, "nazoe", `謎絵`):"")
				+ ((!friendmode && prime && window.innerWidth >= 1200)?makeNaozeButton(false, "nazoe_mini", `謎絵(mini)`):"")
				+ `</div>`;
		}
				
		let colnum = (friendmode)?5:4;

		return '<dialog style="margin:auto; background-color:#f0f0f0;" id=condition autofocus>\n'
			+ make_html("div", "align=center", "t_18 f_bold", "プレート制覇状況を確認する")
			+ make_html('div', 'align=center', "",
				    makeCompVersionField() + makeCompModeField(friendmode, (name==pname)) + makeCompDiffField()
				    + `<div style="height:4px"></div>\n`
				    + make_html(`button`, 
						`onclick="makeDataTable(Number(comp_version.value), comp_mode.value, Number(comp_diff.value)); condition.close();"`,
						"compmode decide", `上記の条件で制覇状況を表示する`)
				   )
			+ make_html(`hr`, ``, ``, ``)
			+ make_html("div", "align=center", "t_18 f_bold", "条件を満たす譜面を数える")
			+ make_html('div', "align=center", "t_14", "条件を選択して、<strong>！絞り込み！</strong>ボタンを押してください。")
			+ '<table border=1 align=center class=t_14>\n'
			+ '<tr>\n'
			+ make_html('th', 'rowspan=3', '', '譜<br>面')
			+ sub('Version:', makeVersionField())
			+ '<td rowspan=3 valign=center>'
			+ '<button class=select type=button onclick="setInitialMusicCondition()">全<br>部</button></td>\n'
			+ '</tr>\n'
			+ '<tr>\n' + sub('難易度:', makeDiffField()) + '</tr>\n'
			+ '<tr>\n' + sub('Level:', makeLvField()) + '</tr>\n'
			+ '<tr>\n<td colspan=' + colnum + '></td>\n</tr>\n'	// 空白行 
			+ '<tr>\n'
			+ ((friendmode)?'<tr>\n<td colspan=2></td>\n<th align=center>自分</th>\n<th align=center>フレンド</th>\n<td></td>\n</tr>\n':'')
			+ make_html('th', 'rowspan=4', '', 'リ<br>ザ<br>ル<br>ト')
			+ sub_andor('達成率:', 'id_achi_mode', makeAchiField, 'id_achi')
			+ '<td rowspan=4 valign=center><button class=select type=button onclick="setInitialLampCondition(' + friendmode +')">全<br>部</button></td>\n'
			+ '</tr>\n'
			+ '<tr>\n' + sub_andor('FC/AP:', 'id_fclamp_mode', makeFcapField, 'id_fclamp') + '</tr>\n'
			+ '<tr>\n' + sub_andor('FS/FSD:', 'id_fdxlamp_mode', makeFsdxField, 'id_fdxlamp') + '</tr>\n'
			+ '<tr>\n' + sub_andor('DXscore:', 'id_dxscstar_mode', makeDXscoreField(friendmode), 'id_dxscstar') + '</tr>\n'
			+ makeSortField(friendmode)
			+ '<tr>\n<td align=center colspan=' + colnum + '>' + makeTrackCountField() + '</td>\n</tr>\n'
			+ '</table>\n'
			+ putSelectButtons(friendmode)
			+ `<hr>`
			+ `<div align=center>\n`
			+ '<button class="compmode decide" onclick="condition.close()">キャンセル</button></td>\n'
   			+ `<div>\n`
			+ '</dialog>\n';		
	}

	const printMaimaiCompletePlate = (maidata) =>
	{
		const diffname=['easy', 'diff_0', 'diff_1', 'diff_2', 'diff_3', 'diff_4'];
		const platename = ['舞舞舞', '舞神', '舞将', '舞極', "覇者"];
		const platename_list = MaiCompPlateList.map((x)=>x.name);

		let str ='';
		if(maidata.length <= 0)
			return '';
		
		for(let i=0; i<5; ++i)
		{
			let idx = platename_list.indexOf(platename[i]);
			let countlist = maidata.shift();
			
			str += '<tr class=mai_ver_50 align=center>\n'		
			if(countlist.reduce((a,b)=>a+b, 0) == 0)
			{
				str += (idx >= 0)?makePlateImgTd(7, MaiCompPlateList[idx].addr, platename[i])
					:("<td colspan=7><strong>" + platename[i] + "</strong></td>")
				str += "\n"
			}
			else
			{
				str += '<th>旧筐体' + platename[i] + '残り</th>\n';
				for(let n=0; n<diffname.length; n++)
					str += make_html('td', '',  'mai_' + diffname[n], countlist[n]);
			}
			str += '</tr>\n';
		}
		str += '<tr class=mai_ver_50 align=center><th colspan=7></th>\n</tr>\n'
		
		return '<table border=1 align=center class="compcond datatable_name_6">\n' + str + '</table>\n';
	}
	
	const get_justnow = ()=>
	{
		const today = new Date(new Date - 18000000);	// 5時間マイナス
		return [today.getFullYear(), ('0'+(today.getMonth()+1)).slice(-2), ('0'+today.getDate()).slice(-2)].join('/') + " "
			+ [("0"+(today.getHours()+5)).slice(-2), ("0"+today.getMinutes()).slice(-2), ("0"+today.getSeconds()).slice(-2)].join(':')
	}
	
	const print_result = (name, myname, pname, starttime, friendmode) =>
	{
		let rslt_str="";
		
		rslt_str += "<html>";
		// headの作成
		rslt_str += printHeader(name +"の制覇状況解析");
		rslt_str += "<body oncontextmenu='return false;'>\n";
		
		rslt_str += "<p align=right><a href='" + mainet_dom;
		rslt_str += (friendmode)?("friend/'>maidx.net フレンド一覧に戻る"):("home/'>maidx.net HOMEに戻る");
		rslt_str += "</a></p>\n";
		
		// titleの作成
		rslt_str += printTitle("", friendmode);
		rslt_str += putModalDialog(name, pname, friendmode) + `\n`;
		rslt_str += make_html(`div`, `style="margin:0px auto; text-align:center; background-color:#51bcf3;"`, ``, 
					make_html("span", ``, "t_11 setsumei", `&darr;&darr;&darr;これをTAPするとモード切替&darr;&darr;&darr;`));
		rslt_str += `<div id=screenshot style="margin"0 auto">`;
		rslt_str += make_html(`div`, `style="margin:0px auto; padding:2px 0px; text-align:center; background-color:#51bcf3;" `, "p_s", 
				      make_html(`span`, `onclick="condition.showModal();" style="font-size:0;"`, ``, 
						make_html("span", ``, "t_20 f_bold player_name", name)
						+ make_html("span", ``, "t_20 f_bold my_name hidden", myname)
						+ make_html(`span`, "", "t_10 f_bold", get_justnow())
						+ `<br>\n`
						+ make_html(`span`, "id=dispmode", "t_14", ``)
						)
				     )
		rslt_str += '<div id=ResultTable>\n</div>';

		rslt_str += `</div>`;	// id=screenshot
		rslt_str += "</body>\n";
		rslt_str += "</html>\n";
		
		datalist=null;
		document.open();
		document.write(rslt_str);
		document.close();

		exec_time.innerText = (performance.now() - starttime).toFixed(0);	// 処理時間格納
		
		setInitialMusicCondition();
		setInitialLampCondition(friendmode);
		rslt_str=null;
		makeDataTable(999, 'summary', Number(5));
	}
	
	/* ココからメイン */
	const start = performance.now();
	
	if(location.href.slice(0,41) == mainet_dom+"friend/" && location.href.length > 41)
	{
		let frdid = new URLSearchParams(document.location.search).get('idx');
		getPage_callback(mainet_dom + "home/", "")
		.then((_)=>{
			return Promise.all([
				getPlayerData_friend(0, frdid),
				getPlayerData_friend(1, frdid),
				getPlayerData_friend(2, frdid),
				getPlayerData_friend(3, frdid),
				getPlayerData_friend(4, frdid),
			])
		})
		.then((x)=>{
			if(!checkGotData(x[0], x[1], x[2], x[3], x[4]))
			{
				return getPageFailure('friend/');
			}			
			return Promise.all([
				getPlayerData_friend_dxsc(0, frdid, x[0]),
				getPlayerData_friend_dxsc(1, frdid, x[1]),
				getPlayerData_friend_dxsc(2, frdid, x[2]),
				getPlayerData_friend_dxsc(3, frdid, x[3]),
				getPlayerData_friend_dxsc(4, frdid, x[4]),
				getFriendName_callback(frdid),
				getYourName_callback(),
			])
		})
		.then((x)=>{
			if(!checkGotData(x[0], x[1], x[2], x[3], x[4]))
			{
				return getPageFailure('friend/');
			}			
			return Promise.all([
				makePlayerData_new(x[0], x[1], x[2], x[3], x[4], x[5]==="", true),
				x[5], 
				x[6]
			])
		})
		.then((x)=>{
			print_result('(フレンド)'+x[1], x[2], "", start, true);
		})
	}
	else
	{	//個人モード
		let name="", pname="";
		getPage_callback(mainet_dom + "home/", "")
		.then((_)=>{
			return Promise.all([
				getYourName_callback(),
				getPremiumName_callback(),
			])
		})
		.then((x)=>{
			return Promise.all([
				getPlayerData_solo(0),
				getPlayerData_solo(1),
				getPlayerData_solo(2),
				getPlayerData_solo(3),
				getPlayerData_solo(4),
				x[0],
				x[1],
			])
		})
		.then((x)=>{
			if(!checkGotData(x[0], x[1], x[2], x[3], x[4]))
			{
				return getPageFailure('home/');
			}
			return Promise.all([
				makePlayerData_new(x[0], x[1], x[2], x[3], x[4], x[5]===x[6], false),
				x[5],
				getCompPlateData_callback(),
				getMaimaiSeriesData_callback(),
				x[6],
			])
		})
		.then((x)=>{
			x[2].forEach((x)=>MaiCompPlateList.push(x));
			mai_series_data = printMaimaiCompletePlate(x[3]);
			print_result(x[1], x[1], x[4], start, false);
		})	
	}
})(); void(0);

var captureData = () =>
{
	const FileName = document.querySelector(`div.p_s`).innerText.replace(/ \/ | : |\n/g, '_').replace(/\/|:| /g, '');
	const windowWidth = Number(document.querySelector(`meta`).content.split(`=`)[1]);

	async function outputData (id)
	{
		return new Promise((resolved, reject)=>{
//			let widthnum = Array.from(id.querySelectorAll(`table`))
//				.map((x)=>x.clientWidth).reduce((a,b)=>Math.max(a,b),0);
			let widthnum = windowWidth;
			widthnum = (((widthnum >> 3) + ((widthnum%8 != 0)?1:0)))<< 3;
			let ClientHeight = id.clientHeight;
			ClientHeight = (((ClientHeight >> 3) + ((ClientHeight%8 != 0)?1:0)))<< 3;
			
			html2canvas(id, {width:widthnum, height:ClientHeight, windowWidth:widthnum, windowHeight:ClientHeight, scale:1, backgroundColor:`#51bcf3` ,imageTimeout:5000})
			.then((canvas)=>{

				// 生成画像
				const PicData = canvas.toDataURL("image/png", 0.8);
				const Img = document.createElement('img');
				Img.setAttribute(`id`, `data_pic`);
				Img.setAttribute(`src`, PicData);

				const ButtonImage = document.createElement(`button`)
				ButtonImage.setAttribute("onClick",
					"downloadPic(data_pic.getAttribute(`src`), `" + FileName + ".png`)");
				ButtonImage.setAttribute("style", `color:transparent; background: transparent; border:unset; padding:unset;`);
				ButtonImage.appendChild(Img);		

				resolved(ButtonImage);
			});
		});
	}

	if(confirm(`今表示しているデータを画像データにしますか？\n続ける → OK\nやめる → キャンセル`))
	{
		alert(`別タブに画像を出力します。`);
		// 出力用window生成
		const OutputWindow = window.open();
		if (OutputWindow == null)
			alert("出力用タブ オープン失敗\n再度実行してみてください。");
		else
		{
			OutputWindow.document.open();
			OutputWindow.document.createElement(`head`);
			OutputWindow.document.createElement(`body`);
			OutputWindow.document.close();
			
			// 背景色
			OutputWindow.document.body.setAttribute(`style`, `background: #51bcf3; margin:0 auto; width:` + windowWidth + `px; font-family:sans-serif;`);

			const HeadMeta = document.createElement(`meta`);
			HeadMeta.setAttribute(`name`, `viewport`);
			HeadMeta.setAttribute(`content`, `width=` + windowWidth +`, user-scalable=no`);
			OutputWindow.document.head.appendChild(HeadMeta);
			
			// 最初のタイトルだけ表示
			const H3BestWakuTitle = document.createElement(`h3`);
			H3BestWakuTitle.innerText = FileName + `\n生成中`;
			OutputWindow.document.body.appendChild(H3BestWakuTitle);

			// loading="lazy"を削除する
			document.querySelectorAll('div#screenshot div').forEach((y)=>y.removeAttribute(`loading`));

			// html2canvas使って画像を生成
			outputData(document.querySelector('div#screenshot'))
			.then((nodes)=>{
				const ScriptCodeSrc = document.createElement(`script`);
				ScriptCodeSrc.innerText = `const downloadPic = (pic, FileName) =>{` 
					+ `const ImgA=document.createElement("a");`
					+ `ImgA.setAttribute("href", pic);`
					+ `ImgA.setAttribute("download", FileName);`
					+ `ImgA.click();`
					+ `}`

				// 必要要素をappendしていく
				// button化した画像をTAPしたら保存するスクリプト
				OutputWindow.document.head.appendChild(ScriptCodeSrc);
				// Best枠の画像
				OutputWindow.document.querySelector(`h3`).innerText =
					OutputWindow.document.querySelector(`h3`).innerText.replace(/生成中/, `画像をTAPすると保存できます。`);
				const OutputCenter = document.createElement(`center`);
				OutputCenter.appendChild(nodes);
				OutputWindow.document.body.appendChild(OutputCenter);
			});
		}
	}
}