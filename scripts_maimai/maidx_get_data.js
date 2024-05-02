javascript:

var test_get_data = '';

const LampStrList = ['　', 'FC', 'FC+', 'AP', 'AP+'];
const FsdxStrList = ['　', 'Sy', 'FS', 'FS+', 'FSD', 'FSD+'];
const VerCharList = ['鈴', '真', '超', '檄', '橙', '暁',　'桃', '櫻', '紫', '菫',
			'白', '雪', '輝', '熊', '華', '爽', '煌', '宙', '星', '祭', '祝', '双', '現'];

const MaiNet_dom = 'https://maimaidx.jp/maimai-mobile/';

// FDX表示モードの時のhtml出力
const fsdxHtmlStr_body = (className, fcap, fsdx) =>
{
	return make_html('td', '', className,
		((fsdx == 5)?"<span class=comptable_fdxp>舞</span>":(fsdx == 4)?"<span class=comptable_fdx>舞</span>":"　")
			+ ((fcap == 4)?"<span class=comptable_app>神</span>":(fcap == 3)?"<span class=comptable_app>神</span>"
			   :(fcap == 2)?"<span class=comptable_fcp>極</span>":(fcap == 1)?"<span class=comptable_fc>極</span>":"　"));
}
const myFsdxHtmlStr = (rd_data) =>	{	return fsdxHtmlStr_body("mai_diff_" + rd_data.diff, rd_data.p_fcapLamp, rd_data.p_fsdxLamp);	}
const FriendFsdxHtmlStr = (rd_data) => {	return fsdxHtmlStr_body("mai_diff_" + rd_data.diff, rd_data.fcapLamp, rd_data.fsdxLamp);	}

// Lamp表示モードの時のhtml出力 本体
const lampHtmlStr_body = (className, achi, fcap, fsdx) =>
{
	return make_html('td', '', className, (fsdx == 5)?"<span class=comptable_fdxp>舞</span>":(fsdx == 4)?"<span class=comptable_fdx>舞</span>":"　")
		+ ((fcap == 4)? make_html("td", "colspan=2", className, "<span class=comptable_app>神</span>")
		   : (fcap == 3)? make_html("td", "colspan=2", className, "<span class=comptable_ap>神</span>")
		   : make_html("td", "", className, (achi >= 1005000)?"<span class=comptable_sssp>将</span>":(achi >= 1000000)?"<span class=comptable_sss>将</span>":"　")
			+ make_html("td", "", className, (fcap == 2)?"<span class=comptable_fcp>極</span>":(fcap == 1)?"<span class=comptable_fc>極</span>":"　")
		   );
}
// 通常時のLamp表示
const lampHtmlStr = (rd_data) =>	{ 	return lampHtmlStr_body("mai_diff_" + rd_data.diff, rd_data.achi, rd_data.fcapLamp, rd_data.fsdxLamp);	}
// フレンドモード時の実行者本人のLamp表示
const myLampHtmlStr = (rd_data) =>	{	return lampHtmlStr_body("mai_diff_" + rd_data.diff, rd_data.p_achi, rd_data.p_fcapLamp, rd_data.p_fsdxLamp);	}


// Rank表示モード本体　101%の時はAP+、それ以外はrankLampStrをそのまま表示。
const rankHtmlStr_body = (className, achi, ranklamp) =>
{
	return make_html("td", "", className, ((achi >= 1010000)?"AP+":ranklamp));
}
// 通常モードのRank表示
const rankHtmlStr = (rd_data) =>	{	return rankHtmlStr_body("mai_diff_" + rd_data.diff, rd_data.achi, rd_data.rankLamp);	}
// フレンドモードにおける実行者本人のRank表示
const myRankHtmlStr = (rd_data) =>	{	return rankHtmlStr_body("mai_diff_" + rd_data.diff, rd_data.p_achi, rd_data.p_rankLamp);	}
	
// DXscore表示モードの時のhtml出力
const dxscHtmlStr = (rd_data) =>
{
	const className = "mai_diff_" + rd_data.diff;

	if(rd_data.dxscRatio < 0)	// フレンドモード
	{
		// 達成率0%なら空白、達成率not0%ならDXscore表示
		return make_html('td', '', className, (rd_data.achi == 0)?"　":(rd_data.dxsc))
			+ make_html('td', '', className, (rd_data.dxscStar >=1)?("☆" + Math.floor(rd_data.dxscStar)):"　");
	}
	else if(rd_data.maxDxsc == 0)	// 完全未プレー
	{
		return make_html('td', '', className, "　") + make_html('td', '', className, "　");
	}
	else if(rd_data.dxsc == 0)	// DX筐体未プレー
	{
		return make_html('td', '', className, "0%") + make_html('td', '', className, "　");
	}
	else
	{
		const tmp = Math.floor(rd_data.dxscRatio / 10000);
		return make_html('td', '', className, "<b>" + String(Math.floor(tmp/10)) + "</b>." + ("0"+String(tmp % 10)).slice(-1) + "%")
			+ make_html('td', '', className, (rd_data.dxscStar >= 1)?("☆" + Math.floor(rd_data.dxscStar)):"　");
	}
}

// フレンドモード時の実行者本人のDXscore表示モードの時のhtml出力
// フレンドモードで動作する前提なので、条件分岐なしで最小限の実装
const myDxscHtmlStr = (rd_data) =>
{
	return make_html('td', '', "mai_diff_" + rd_data.diff, (rd_data.p_achi == 0)?"　":(rd_data.p_dxsc))
		+ make_html('td', '', "mai_diff_" + rd_data.diff, (rd_data.p_dxscStar >= 1)?("☆" + (rd_data.p_dxscStar)):"　");
}


// 全データ一斉表示
const recordOneLineHtmlStr_body = (className, achi, dxsc, maxdxsc, dxscstar, dxscratio, fcap, fsdx) =>
{
	const AchiStr = (under) =>
		(achi == 0)?"　":('<b>' + ((achi - under)/10000).toFixed(2) + '</b>' + ('0'+String(under)).slice(-2) + "%");

	const DxscDataStr = (dxsc <= 0)?"　":("<b>" + dxsc + "</b>" + ((maxdxsc > 0)?("/" + maxdxsc):""))
	
	const DxscRatioStr = (tmp) =>
		(dxscratio <= 0)?"　":("<b>" + Math.floor(tmp/100) + "</b>." + ("0"+String(tmp % 100)).slice(-2) + "%");
	
	const DxscStarNumStr = (tmp) => 
		(dxscratio < 0)?("☆<b>" +tmp+"</b>"):("<b>"+ tmp + "</b>" + (dxscstar - tmp).toFixed(1).slice(1));
	
	return make_html('td', 'align=right', className, AchiStr(achi % 100))
		+ make_html('td', 'align=center', className, DxscDataStr)
		+ ((dxscratio < 0)?"":make_html('td', 'align=right', className, DxscRatioStr(Math.floor(dxscratio / 1000))))
		+ make_html('td', 'align=center', className, (dxsc <= 0)?"　":(DxscStarNumStr(Math.floor(dxscstar))))
		+ make_html('td', 'align=center', className, LampStrList[fcap])
		+ make_html('td', 'align=center', className, FsdxStrList[fsdx])
}

const recordOneLineHtmlStr = (rd_data) =>
{
	return recordOneLineHtmlStr_body("mai_diff_" + (rd_data.diff),
			rd_data.achi, rd_data.dxsc, rd_data.maxDxsc, rd_data.dxscStar, rd_data.dxscRatio, rd_data.fcapLamp, rd_data.fsdxLamp);
}
const myRecordOneLineHtmlStr = (rd_data) =>
{
	return recordOneLineHtmlStr_body("mai_diff_" + (rd_data.diff),
			rd_data.p_achi, rd_data.p_dxsc, -1, rd_data.p_dxscStar, rd_data.dxscRatio, rd_data.p_fcapLamp, rd_data.p_fsdxLamp);
}

// 全データ一斉表示
const recordAllHtmlStr_body = (className, achi, dxsc, maxdxsc, dxscstar, dxscratio, fcap, fsdx) =>
{
	const AchiStr = (under) =>
		(achi == 0)?"　":('<b>' + ((achi - under)/10000).toFixed(2) + '</b>' + ('0'+String(under)).slice(-2));

	const DxscDataStr = (dxsc <= 0)?"　":("<b>" + dxsc + "</b>" + ((maxdxsc > 0)?("/" + maxdxsc):""))
	
	const DxscRatioStr = (tmp) =>
		(dxscratio <= 0)?"　":("<b>" + Math.floor(tmp/10) + "</b>." + String(tmp % 10));
	
	return make_html('td', 'align=right', className, AchiStr(achi % 100))
		+ make_html('td', 'align=center', className, DxscDataStr)
		+ ((dxscratio < 0)?"":make_html('td', 'align=right', className, DxscRatioStr(Math.floor(dxscratio / 10000))))
		+ make_html('td', 'align=center', className, (dxsc <= 0)?"　":('<b>' + Math.floor(dxscstar) +'</b>'))
		+ make_html('td', 'align=center', className, LampStrList[fcap])
		+ make_html('td', 'align=center', className, FsdxStrList[fsdx])
}
const recordAllHtmlStr = (rd_data) =>
{
	return recordAllHtmlStr_body("t_10 mai_diff_" + (rd_data.diff),
			rd_data.achi, rd_data.dxsc, rd_data.maxDxsc, Math.floor(rd_data.dxscStar), rd_data.dxscRatio, rd_data.fcapLamp, rd_data.fsdxLamp);
}
const myRecordAllHtmlStr = (rd_data) =>
{
	return recordAllHtmlStr_body("t_10 mai_diff_" + (rd_data.diff),
			rd_data.p_achi, rd_data.p_dxsc, -1, rd_data.p_dxscStar, rd_data.dxscRatio, rd_data.p_fcapLamp, rd_data.p_fsdxLamp);
}

/* 謎モード本体 dispKind はkindStd/kindDxを表示するかどうか　*/
const nazoModeHtmlStr_body = ( diffNum, jacket, name, achiNum, fcap, fsdx, dxscstar, mini, kind, dispKind) =>
{
	const achi2RankLamp =
	(achiNum >= 1005000)?"sssp":(achiNum >= 1000000)?"sss":(achiNum >= 995000)?"ssp"
	:(achiNum >= 990000)?"ss":(achiNum >= 980000)?"sp":(achiNum >= 970000)?"s"
	:(achiNum >= 940000)?"aaa":(achiNum >= 900000)?"aa":(achiNum >= 800000)?"a":"";

	const mainet_dom_img = "https://maimaidx.jp/maimai-mobile/img/";
	const jacketURL = (jacket==""||achi2RankLamp=="")?"":(mainet_dom_img + "Music/" + jacket + ".png");
	const kindStd = make_html("div", "", ["music_kind", "std", mini].join(" ").trim(), "スタ");
	const kindDx = make_html("div", "", ["music_kind", "dx", mini].join(" ").trim(), 
				`<span style="color:#F00">で</span><span style="color:#00F">ら</span>`);
//	const ranklamp = (achi2RankLamp=="")?"":(mainet_dom_img + "playlog/" + achi2RankLamp + ".png");
	const ranklamp = (achi2RankLamp=="")?"":(mainet_dom_img + "music_icon_" + achi2RankLamp + ".png");
	const fcaplampcls = (["", "fc", "fc plus", "ap", "ap plus"][fcap]);
	const fcapname = (mini=="mini")?(["-", "FC", "C+", "AP", "P+"][fcap])
		:(["-", "FC", "FC<sup>+</sup>", "AP", "AP<sup>+</sup>"][fcap]);
	const fsdxlampcls = (["", "syncplay", "fs", "fs plus", "fsdx", "fsdx plus"][fsdx]);
	const fsdxname = (mini=="mini")?(["-", "Sy", "FS", "S+", "DX", "D+"][fsdx])
		:(["-", "Sy", "FS", "FS<sup>+</sup>", "DX", "DX<sup>+</sup>"][fsdx]);
	const dxscstarstr = 
	    ((mini=="mini")?((dxscstar).toFixed(1).replace(/\./, "<span class=t_11>."))
	     :((dxscstar).toFixed(1).replace(/\./, "<span class=t_16>."))) + "</span>";
	
	const makeImgDiv = (bg_url, classname, body) =>
		make_html("div",
			  'loading=lazy' + ((bg_url!="")?(' style="background-image:url(' + bg_url + ')"'):""),
			  classname, body);

	const AchiStr = (achiNum < 800000)?""
		:[make_html('span', "", ["music_achi_head", "diff_"+diffNum, mini].join(' ').trim(), (Math.floor(achiNum/1000)/10).toFixed(1)), 
		 make_html('span', "", "music_achi_tail", ("00"+String(achiNum%1000)).slice(-3))].join('').replace(/\n/g,'');

	return makeImgDiv(jacketURL, ["mai_diff_" + diffNum, "music_nazo", mini].join(" ").trim() ,
			  make_html("div", (jacketURL!="")?'style="color:transparent"':"", ["music_nazo_name", (jacketURL!="")?("diff_"+diffNum):"no_jacket", ["std", "dx"][kind], mini].join(" ").trim() , name)
			  + ((jacketURL=="" || !dispKind)?"":(kind==0)?kindStd:kindDx)
			  + makeImgDiv(ranklamp, ["music_ranklamp", mini].join(" ").trim(), AchiStr)
			  + make_html("div", (fcapname=="-")?'style="color:transparent"':"", ["music_lamp", mini, "fcap", fcaplampcls].join(" ").trim(), fcapname)
			  + make_html("div", (fsdxname=="-")?'style="color:transparent"':"", ["music_lamp", mini, "sync", fsdxlampcls].join(" ").trim(), fsdxname)
			  + ((dxscstar>0)?make_html("div", "", ["music_dxscnum", mini].join(" ").trim(), dxscstarstr):"")
			 );
}

const nazoModeHtmlStr = (rd_data, mini, titlelist, dxlist, iconlist, version) =>
{
	return nazoModeHtmlStr_body(rd_data.diff, iconlist[rd_data.idx], titlelist[rd_data.idx], 
				    rd_data.achi, rd_data.fcapLamp, rd_data.fsdxLamp, rd_data.dxscStar, ((mini)?"mini":""),
				    dxlist[rd_data.idx],
				    ((version==999) || (rd_data.ver>=13&&dxlist[rd_data.idx]==0))
				   );
}

const recordHtmlStr_single = (rd_data) =>
{
	const AchiStr = (under) =>
		("<b>" + ((rd_data.achi - under)/10000).toFixed(2) + "</b>" + ("0"+String(under)).slice(-2) +"%");
		
	const DxscRatioStr = (tmp) =>
		("<b>" + Math.floor(tmp/100) + "</b>." + ("0"+ String(tmp % 100)).slice(-2) + "%");
	
	const DxscStarNumStr = (tmp) =>
		"☆<b>" + tmp + "</b>" + ((rd_data.dxscStar - tmp).toFixed(1).slice(1));

	const verClassName = getVersionClass(rd_data.ver);
	const diffClassName = "mai_diff_" + (rd_data.diff);
	const verStr = (rd_data.ver < 0)?'追':(VerCharList[rd_data.ver]);

	const retstr = "<tr class=" + diffClassName + ">\n"
		+ make_html("td", "width=10% align=center", verClassName, "<b>" + verStr + "</b>" + (String(rd_data.lv).replace(".6","+")))
		+ make_html("td", "width=90% align=left colspan=9",  "f_bold",
			    ((m_dxlist[rd_data.idx] == 1)?"[DX]":"[Std]") + m_titlelist[rd_data.idx])	//曲名。正式名称
		+ "</tr>";

	if(rd_data.maxDxsc == 0)	// 未プレー
		return retstr;	// 2行目を表示せずに終了

	return retstr
		+ '<tr class=' + diffClassName + '>\n'
		+ make_html('th', 'width=10% align=center', 'mai_white', '達成率')
		+ make_html('td', 'width=19% align=right', '', AchiStr(rd_data.achi % 100))
		+ make_html('th', 'width=11% align=right', 'mai_white', 'DXscore')
		+ make_html('td', 'width=7.5% align=right', '', String(rd_data.dxsc))
		+ make_html('td', 'width=1.5% align=center', '', "/")
		+ make_html('td', 'width=7.5% align=left', '', String(rd_data.maxDxsc))
		+ make_html('td', 'width=15% align=right', '', DxscRatioStr(Math.floor(rd_data.dxscRatio / 1000)))
		+ make_html('td', 'width=10% align=left', '', DxscStarNumStr(Math.floor(rd_data.dxscStar)))
		+ make_html('td', 'width=8.5% align=center', '', LampStrList[rd_data.fcapLamp])
		+ make_html('td', 'width=10% align=center', '', FsdxStrList[rd_data.fsdxLamp])
		+ '</tr>\n';
}
	
const recordHtmlStr_friend = (rd_data) =>
{
	const AchiStr = (achinum) =>
	{
		const under = achinum % 100;
		return '<b>' + ((achinum - under)/10000).toFixed(2) + '</b>' + String('0'+under).slice(-2) +'%';
	}

	const makeAchiVs = (subst) =>	// score差
		(subst > 0)?('<font color=#e73f76><b>WIN!!</b> +' + ((subst/10000).toFixed(4)) + '%</font>')
		:(subst < 0)?('<font color=#39b2fe><b>LOSE..</b> ' + ((subst/10000).toFixed(4)) + '%</font>')
		:('<font color=#00ff00><b>DRAW</b> 0.0000%</font>');

	const makeDxscVs = (subst) =>
		(subst > 0)?('<font color=#e73f76><b>WIN!!</b> +' + String(subst) + '</font>')
		:(subst < 0)?('<font color=#39b2fe><b>LOSE..</b> ' + String(subst) + '</font>')
		:('<font color=#00ff00><b>DRAW</b>0</font>');

	const verClassName = getVersionClass(rd_data.ver);
	const diffClassName = "mai_diff_" + (rd_data.diff);
	const verStr = (rd_data.ver < 0)?'追':(VerCharList[rd_data.ver]);
	
	return '<tr class=' + diffClassName + '>\n'
		+ make_html('td', 'align=center width=10%', verClassName,
				    '<b>' + verStr + '</b>' + (String(rd_data.lv).replace(".6","+")))
		+ make_html('td', 'align=left colspan=5', "f_bold", m_titlelist[rd_data.idx] )	//曲名。正式名称
		+ make_html('td', 'align=center width=10%', '', (m_dxlist[rd_data.idx] == 1)?'DX':'Std')
		+ "</tr>"
		+ '<tr class=' + diffClassName + '>\n'
		+ make_html('td', 'align=center width=10%', 'f_bold', LampStrList[rd_data.p_fcapLamp])
		+ make_html('td', 'colspan=2 align=right width=20%', '', AchiStr(rd_data.p_achi))
		+ make_html('td', 'align=center style="background-color:white;"', 'f_bold', makeAchiVs(rd_data.p_achi - rd_data.achi))
		+ make_html('td', 'colspan=2 align=right width=20%', '', AchiStr(rd_data.achi))
		+ make_html('td', 'align=center width=10%', 'f_bold', LampStrList[rd_data.fcapLamp])
		+ '</tr>\n'
		+ '<tr class=' + diffClassName + '>\n'
		+ make_html('td', 'align=center width=10%', 'f_bold', FsdxStrList[rd_data.p_fsdxLamp])
		+ make_html('td', 'align=right width=10%', '', String(rd_data.p_dxsc))
		+ make_html('td', 'align=right width=10%', '', (rd_data.p_dxscStar != 0)?('☆<b>'+ String(rd_data.p_dxscStar) + '</b>'):'')
		+ make_html('td', 'align=center style="background-color:white;"', 'f_bold', makeDxscVs(rd_data.p_dxsc - rd_data.dxsc))
		+ make_html('td', 'align=right width=10%', '', String(rd_data.dxsc))
		+ make_html('td', 'align=right width=10%', '', (rd_data.dxscStar != 0)?('☆<b>'+ String(rd_data.dxscStar) + '</b>'):'')
		+ make_html('th', 'align=center width=10%', 'f_bold', FsdxStrList[rd_data.fsdxLamp])
		+ '</tr>\n';
}

const recordHtmlStr_friend_short = (rd_data) =>
{
	const AchiStr = (achinum) =>
	{
		const under = achinum % 100;
		return '<b>' + ((achinum - under)/10000).toFixed(2) + '</b>' + String('0'+under).slice(-2) +'%';
	}

	const makeAchiVs = (subst) =>	// score差
		(subst > 0)?('<font color=#e73f76>+' + ((subst/10000).toFixed(4)) + '%</font>')
		:(subst < 0)?('<font color=#39b2fe>' + ((subst/10000).toFixed(4)) + '%</font>')
		:('<font color=#00ff00>0.0000%</font>');

	const makeDxscVs = (subst) =>
		(subst > 0)?('<font color=#e73f76>+' + String(subst) + '</font>')
		:(subst < 0)?('<font color=#39b2fe>' + String(subst) + '</font>')
		:('<font color=#00ff00>0</font>');

	const verClassName = getVersionClass(rd_data.ver);
	const diffClassName = "mai_diff_" + (rd_data.diff);
	const verStr = (rd_data.ver < 0)?'追':(VerCharList[rd_data.ver]);
	
	return '<tr class=' + diffClassName + '>\n'
		+ make_html('td', 'align=center width=8%', verClassName,
				    '<b>' + verStr + '</b>' + (String(rd_data.lv).replace(".6","+")))
		+ make_html('td', 'align=left colspan=12', "f_bold", ((m_dxlist[rd_data.idx] == 1)?'[DX]':'[Std]') + m_titlelist[rd_data.idx] )	//曲名。正式名称
		+ "</tr>"
		+ '<tr class="t_12 ' + diffClassName + '">\n'
		+ make_html('td', 'align=center width=8%', '', LampStrList[rd_data.p_fcapLamp])
		+ make_html('td', 'align=center width=8%', '', FsdxStrList[rd_data.p_fsdxLamp])
		+ make_html('td', 'align=right width=13% style="padding:0 2px;"', '', AchiStr(rd_data.p_achi))
		+ make_html('td', 'align=right width=6% style="padding:0 2px;"', '', String(rd_data.p_dxsc))
		+ make_html('td', 'align=right width=4.5% style="padding:0 2px;"', '', (rd_data.p_dxscStar != 0)?('☆<b>'+ String(rd_data.p_dxscStar) + '</b>'):'')
		+ make_html('td', 'align=right width=13% style="padding:0 2px; background-color:white;"', '', makeAchiVs(rd_data.p_achi - rd_data.achi))
		+ make_html('td', 'align=center width=1.5% style="padding:0 2px; background-color:white;"', '', `/`)
		+ make_html('td', 'align=right width=6.5% style="padding:0 2px; background-color:white;"', '', makeDxscVs(rd_data.p_dxsc - rd_data.dxsc))
		+ make_html('td', 'align=right width=13% style="padding:0 2px;"', '', AchiStr(rd_data.achi))
		+ make_html('td', 'align=right width=6% style="padding:0 2px;"', '', String(rd_data.dxsc))
		+ make_html('td', 'align=right width=4.5% style="padding:0 2px;"', '', (rd_data.dxscStar != 0)?('☆<b>'+ String(rd_data.dxscStar) + '</b>'):'')
		+ make_html('td', 'align=center width=8%', '', LampStrList[rd_data.fcapLamp])
		+ make_html('td', 'align=center width=8%', '', FsdxStrList[rd_data.fsdxLamp])
		+ '</tr>\n'
}

const recordHtmlStr_single_short = (rd_data) =>
{
	const AchiStr = (under) =>
		("<b>" + ((rd_data.achi - under)/10000).toFixed(2) + "</b>" + ("0"+String(under)).slice(-2) +"%");
		
	const DxscRatioStr = (tmp) =>
		("<b>" + Math.floor(tmp/100) + "</b>." + ("0"+ String(tmp % 100)).slice(-2) + "%");
	
	const DxscStarNumStr = (tmp) =>
		"☆<b>" + tmp + "</b>" + ((rd_data.dxscStar - tmp).toFixed(1).slice(1));

	const verClassName = getVersionClass(rd_data.ver);
	const diffClassName = "mai_diff_" + (rd_data.diff);
	const verStr = (rd_data.ver < 0)?'追':(VerCharList[rd_data.ver]);

	const tmpstr = (rd_data.maxDxsc == 0)?(make_html("td", "colspan=8", "", ""))
		:(make_html('td', 'align=right width=12%', '', AchiStr(rd_data.achi % 100))
		  + make_html('td', 'align=right width=6%', '', String(rd_data.dxsc))
		  + make_html('td', 'align=center width=1.5%', '', "/")
		  + make_html('td', 'align=left width=6%', '', String(rd_data.maxDxsc))
		  + make_html('td', 'align=right width=9%', '', DxscRatioStr(Math.floor(rd_data.dxscRatio / 1000)))
		  + make_html('td', 'align=left width=6.5%', '', DxscStarNumStr(Math.floor(rd_data.dxscStar)))
		  + make_html('td', 'align=center width=5.5%', '', LampStrList[rd_data.fcapLamp])
		  + make_html('td', 'align=center width=7%', '', FsdxStrList[rd_data.fsdxLamp]));

	return retstr = "<tr class=" + diffClassName + ">\n"
		+ make_html("td", "align=center width=7.5%", verClassName, "<b>" + verStr + "</b>" + (String(rd_data.lv).replace(".6","+")))
		+ make_html("td", "align=left width=39%", "f_bold", m_nicknamelist[rd_data.idx])	//曲名。正式名称
		+ tmpstr
		+ "</tr>";

}

const recordHtmlStr_short = (rd_data, short_on) =>
{
	if(rd_data.dxscRatio < 0 && short_on)	// DXscore割合マイナスはフレンドモード
		return recordHtmlStr_friend_short(rd_data);
	else if(rd_data.dxscRatio < 0)	// DXscore割合マイナスはフレンドモード
		return recordHtmlStr_friend(rd_data);
	else if (short_on)
		return recordHtmlStr_single_short(rd_data);
	else
		return recordHtmlStr_single(rd_data);
}

const getPageFailure = ( url )=>
{
	alert('通信に失敗した模様。\n再度試してみてください。');
	window.location.href = MaiNet_dom + url ;
}

// addrのページをgetしてくる
const getPage_callback = (addr, post)=>
{
	return new Promise((resolve, reject)=>
	{
		const time = performance.now();	
		fetch(addr)
    			.then(res => res.text())
    			.then(text => new DOMParser().parseFromString(text, "text/html"))
			.then((document) => {
			      console.log(addr, Math.round((performance.now() - time)*10)/10);
			      resolve(document);
			});
	});
}

// ページからプレイヤー名を取得
const getPlayerName_callback = (AddrStr) =>
{
	return getPage_callback(AddrStr, "")
	.then((page)=>{
		return new Promise((resolve)=>
		{
			const tmp = page.querySelector('.name_block')
			if(tmp != undefined)
				resolve(tmp.innerText.trim());	//名前
			else
				resolve("");
		});
	})

}

// プレイヤーデータのページからプレイヤー名を取得
const getYourName_callback = () =>
{
	const addr = MaiNet_dom + 'playerData/';
	return getPlayerName_callback(addr)
	.catch(()=>{ getPageFailure('home/'); })
}

// プレイヤーデータのページからプレイヤー名を取得
const getPremiumName_callback = () =>
{
	const addr = MaiNet_dom + 'home/ratingTargetMusic/';
	return getPlayerName_callback(addr)
	.catch(()=>{ getPageFailure('home/'); })
}

// 各楽曲の楽曲スコアのページから、iconのファイル名を取得
// idx は、楽曲スコア全体ページの hidden要素から取得した謎の文字列そのまま
const getIconURL_callback = (idx) =>
{
	const addr = "https://maimaidx.jp/maimai-mobile/record/musicDetail/?idx=" + encodeURIComponent(idx);
	return getPage_callback(addr, "")
		.then((page)=>{
			return (page.querySelector(`img.w_180.m_5.f_l`).getAttribute(`src`).slice(44,-4));
		})
		.catch(()=>{
			alert('データの取得に失敗した模様。再度ためしてみてください。');
		})
}

// 現在設定中のフレームのURLを取得
const getFrameURL_callback = () =>
{
	return getPage_callback("https://maimaidx.jp/maimai-mobile/collection/frame/")
		.then((page) => {
			return page.querySelector(`div.see_through_block.collection_setting_block img.w_396.m_r_10`).getAttribute(`src`);
		});
}

// 現在設定中のネームプレートのURLを取得
const getNameplateURL_callback = () =>
{
	return getPage_callback("https://maimaidx.jp/maimai-mobile/collection/nameplate/")
		.then((page) => {
			return page.querySelector(`div.see_through_block.collection_setting_block img.w_396.m_r_10`).getAttribute(`src`);
		});
}

// maimaiシリーズの記録からデータを拾って来て、残り譜面数を格納
const getMaimaiSeriesData_callback = () =>
{
	const addr = MaiNet_dom + 'home/congratulations/';
	const idx = [[27, 41, 55, 69, 83, 97], [19, 33, 47, 61, 75, 89], [24, 38, 52, 66, 80, 94],
		     [15, 29, 43, 57, 71, 85], [14, 28, 42, 56, 70, 84]]

	const subfunc = (str) => str.split('/').map(Number).reduce((a,b)=>b-a, 0);

	return getPage_callback(addr, "")
	.then((page)=>{
		return new Promise((resolve)=>
		{
			const old_ver_count = page.querySelectorAll('.musiccount_counter_block');
			if(old_ver_count.length <= 0)
				resolve([]);
			else
				resolve(idx.map((x)=>(x.map((n)=>subfunc(old_ver_count[n].innerText)))));
		});
	});	
}

// 制覇系nameplate情報取得
const getCompPlateData_callback = () =>
{
	const addr = MaiNet_dom + 'collection/nameplate/';
	return getPage_callback(addr, "")
	.then((page)=>{
		return new Promise((resolve)=>
		{			
			const clct_list=[];
			// 所持中の全ネームプレートを取得
			const PlateList = Array.prototype.slice.call(
				page.querySelectorAll('div.see_through_block.p_r.m_t_10.p_10.f_0'));
			PlateList.shift();	// 先頭にある -設定中のネームプレート- を除外

			const PlateNameList = PlateList.filter((x)=>x.querySelector('div.p_5.f_14.break').innerText.length <= 3)
				.filter((x)=>x.querySelector('div.p_5.f_14.break').innerText.slice(-1) != "段")	// 真段位を除外
				.filter((x)=>x.querySelector('div.p_5.f_14.break').innerText.slice(-1) != "伝")	// 真皆伝、裏皆伝を除外
			PlateNameList.forEach((n)=>clct_list.push(
				{name:n.querySelector('div.p_5.f_14.break').innerText,
				 addr:n.querySelector('img.w_396.m_r_10').getAttribute('src')}
				)
			)
			resolve(clct_list);
		})
	})
	.catch(()=>{
		alert('データの取得に失敗した模様。再度ためしてみてください。');
	})
}

// フレンドのプレイヤー名取得
const getFriendName_callback = (frd_id) =>
{
	const addr = MaiNet_dom + 'friend/friendDetail/?idx=' + frd_id;
	return getPlayerName_callback(addr)
	.catch(()=>{ getPageFailure('friend/'); })
}

// 楽曲スコア（個人）のページから表記Lvとicoを取得
const makeNewMusicData = (idx) =>
{
	const addr = MaiNet_dom + "record/musicDetail/?idx=" + encodeURIComponent(idx);
	return getPage_callback(addr, "")
	.then((page)=>{
		const tmplvlist = Array.prototype.map.call(
			page.querySelectorAll('div.basic_block .music_lv_back'), (x)=>Number("-" + x.innerText.replace(/\+/, ".6")));
		if(tmplvlist.length == 4)
			tmplvlist.push(0);	// 4難易度用に 0を追加
		
		return {ico:page.querySelector('.w_180').getAttribute('src').slice(44,-4),
				lv:tmplvlist};

	})
}

// 曲名、譜面種別、Lvを取得する
// ランキングページで動作させる前提
const getMusicData = (diffnum) =>
{
	const getRecordData = (w450) =>
	[
		w450.querySelector(`div.music_name_block`).innerText,	// 曲名
		w450.querySelector(`img.music_kind_icon`).src.slice(44,-4),	// 譜面種別
		w450.querySelector(`div.music_lv_block`).innerText,	// Lv
		Array.from(w450.querySelectorAll(`form input`)).filter((x)=>x.name=='idx')[0].value	// リンク
	];

	return getPage_callback(MaiNet_dom + `ranking/search/?genre=99&scoreType=2&rankingType=99&diff=` + Number(diffnum) , ``)
	.then((page)=>
	{
		return new Promise((resolve) =>
		{
			resolve(Array.from(page.querySelectorAll(`div.w_450.m_15`)).map(getRecordData));
		});
	});
}

// 出力 : [曲名, 譜面種別, Lv, 達成率, でらスコ, SYNClamp, FCAPlamp, ACHIlamp] すべて文字列
// 出力例 : ['青春コンプレックス', 'dx', '11+', '100.9433%', '2332/2469', 'fdx', 'fcp', 'sssp']
// 出力例 : ['青春コンプレックス', 'dx', '11+']　(未プレー時)
const getPlayerData_solo = (diffnum) =>
{
	const getRecordData = (w450) =>
	{
		const retarr =		
		[
			w450.querySelector(`div.music_name_block`).innerText,	// 曲名
			w450.querySelector(`img[class^=music_kind_icon]:not(.pointer)`).src.slice(44,-4),	// 譜面種別
			w450.querySelector(`div.music_lv_block`).innerText	// Lv
		]
		if(w450.querySelectorAll(`div.music_score_block`).length > 0)	// プレー済みかどうか。0なら未プレー
		{
			w450.querySelectorAll(`div.music_score_block`).forEach((x)=>retarr.push(x.innerText.replace(/\n|\t|,| /g,'')));	// 達成率
			w450.querySelectorAll(`img.h_30.f_r`).forEach((x)=>retarr.push(x.src.slice(49,-13)));	// Lamp
		}
		return retarr;
	}

	return getPage_callback(MaiNet_dom + `record/musicGenre/search/?genre=99&diff=` + Number(diffnum) , ``)
	.then((page)=>
	{
		return new Promise((resolve) =>
		{
			resolve(Array.from(page.querySelectorAll(`div.w_450.m_15`)).map(getRecordData));
		});
	});
}

// getPlayerData_friend_dxsc を実行する前提
// 出力 : [曲名, 譜面種別, Lv, 自分達成率, フレ達成率, 自分達成率Lamp, 自分FCAP, 自分SYNC, フレSYNC, フレFCAP, フレ達成率Lamp]
// 例 : ['あの世行きのバスに乗ってさらば。', 'dx', '13', '100.8372%', '100.5547%', 'sssp', 'fcp', 'fsp', 'back', 'back', 'sssp']
const getPlayerData_friend = (diffnum, frnd_id) =>
{
	const getRecordData = (w450) =>
	{
		const retarr =
		[
			w450.querySelector(`div.music_name_block`).innerText,	// 曲名
			w450.querySelector(`img[class^=music_kind_icon]`).src.slice(44,-4),	// 譜面種別
			w450.querySelector(`div.music_lv_block`).innerText	// Lv
		]
		w450.querySelectorAll(`td.w_120`).forEach((x)=>retarr.push(x.innerText.replace(/\n|\t|,| /g,'')));	// 達成率
		w450.querySelectorAll(`img.h_30.f_l`).forEach((x)=>retarr.push(x.src.slice(49,-13)));	// プレイヤー側Lamp
		w450.querySelectorAll(`img.h_30.f_r`).forEach((x)=>retarr.push(x.src.slice(49,-13)));	// フレンド側Lamp

		return retarr;
	}

	return getPage_callback(MaiNet_dom + 'friend/friendGenreVs/battleStart/?scoreType=2&genre=99&diff=' + diffnum + '&idx=' + frnd_id , ``)
	.then((page)=>
	{
		return new Promise((resolve) =>
		{
			resolve(Array.from(page.querySelectorAll(`div.w_450.m_15`)).map(getRecordData));
		});
	});
}

// getPlayerData_friend を実行した結果をdatalistに渡す前提
// 出力 : [曲名, 譜面種別, Lv, 自分達成率, フレ達成率, 自分達成率Lamp, 自分FCAP, 自分SYNC, フレSYNC, フレFCAP, フレ達成率Lamp, 自分☆、フレ☆、自分DXSC、フレDXSC]
// 例 : ['あの世行きのバスに乗ってさらば。', 'dx', '13', '100.8372%', '100.5547%', 'sssp', 'fcp', 'fsp', 'back', 'back', 'sssp', '2', '4', '1945', '2013']
const getPlayerData_friend_dxsc = (diffnum, frnd_id, datalist) =>
{
	return getPage_callback(MaiNet_dom + 'friend/friendGenreVs/battleStart/?scoreType=1&genre=99&diff=' + diffnum + '&idx=' + frnd_id , ``)
	.then((page)=>
	{
		return new Promise((resolve) =>
		{
			let w120 = Array.prototype.map.call(page.querySelectorAll(`div.w_450.m_15`), (x)=>Array.from(x.querySelectorAll(`td.w_120`)));	// でらスコ＆☆
			
			w120.map((z)=>z.map((x)=>x.querySelector(`img`)).map((x)=>(x==null)?`0`:x.src.slice(56,-4)))	// ☆の数字 なければ0
				.forEach((x,n)=>x.forEach((y)=>datalist[n].push(y)));

			w120.map((z)=>z.map((x)=>x.innerText.replace(/,|\t|\n/g, '')))	// でらスコ
				.forEach((x,n)=>x.forEach((y)=>datalist[n].push(y)));

			resolve(datalist);
		});
	});
}

// 単独、フレンド、どちらも対応版
// rd : getPlayerData系の最終値
// idx : index number
// ver : 収録バージョン
// diff : 難易度の数字 0:Basic, 1:Advanced, 2:Expert, 3:Master, 4:Re:Master
const makeRecordData_new = (rd, idx, ver, diff) =>
{
	const calcLinearValue = (basis, max, gap, n) => basis+(max-basis)*n/gap;

	// DXscore割合から星を算出
	const dxsc2dxscStar = (x) =>
	{
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

	// Lamp画像から [FSD, FC/AP] lampを取得 
	const Lamps2Num = (Lamp) =>
	{
		return (Lamp == "fdxp")?5:(Lamp == "fdx")?4:(Lamp == "fsp")?3:(Lamp == "fs")?2:(Lamp == "sync")?1
		:(Lamp == "app")?4:(Lamp == "ap")?3:(Lamp == "fcp")?2:(Lamp == "fc")?1:0;
	}

	const AchiLamp2Str = (AchiLamp) =>
		AchiLamp.replace(/back|[b-f]/g, '　').replace(/p/,'+').toUpperCase();

	let retdata=
	{
		idx : idx,	// 曲リストのindex
		diff : diff,	// 難易度 サイトの数字に合わせる basic:0, ..., remaster:4
		ver : ver,		// 
		lv : Number(rd[2].replace("+", ".6")),	// Level  +は 0.6を足す 例：13+ -> 13.6
	}

	if(rd.length < 8)	// 未プレー
	{
		retdata.achi = 0; retdata.dxsc = 0; retdata.maxDxsc = 0;
		retdata.dxscRatio = 0; retdata.dxscStar = 0;
		retdata.fsdxLamp = 0; retdata.fcapLamp = 0; retdata.rankLamp = "　";
	}
	else if (rd.length < 11)	// プレー済みsolo 11はgetPlayerData_friend実行後の長さ
	{
		dxscnum = rd[4].replace(/\s|,/g, "").split("/").map(Number);
		dxscRatio = Math.floor(dxscnum[0]*10000000/dxscnum[1]);

		retdata.achi = Number(rd[3].replace(/\.|%/g, ""));	// 達成率 %表示を10000倍した物 例:100.5000% => 1005000
		retdata.dxsc = dxscnum[0];	// でらっくスコア
		retdata.maxDxsc = dxscnum[1];	// 最大でらっくスコア
		retdata.dxscRatio = dxscRatio;	// でらっくスコア割合 小数第7位（%で小数第5)まで * 10^7 例：85% => 8500000
		retdata.dxscStar = dxsc2dxscStar(dxscRatio / Math.pow(10, 5));	// でらっくスコアの星 dxscRatioから算出
		retdata.fsdxLamp = Lamps2Num(rd[5]);	// 5:FSD+, 4:FSD, 3:FS+, 2:FS, 1:Sy, 0:none
		retdata.fcapLamp = Lamps2Num(rd[6]);	// 4:AP+, 3:AP, 2:FC+, 1:FC; 0:none
		retdata.rankLamp = AchiLamp2Str(rd[7]);	// A以上ならrankそのまま BBB以下は空白
	}
	else if (rd.length < 15)	// フレンドモード 達成率のみ取得時
	{
		// フレンド側
		retdata.achi = Number(rd[4].replace(/―|\.|%/g, ""));	// 達成率 %表示を10000倍した物 例:100.5000% => 1005000
		retdata.fsdxLamp = Lamps2Num(rd[8]);	// 5:FSD+, 4:FSD, 3:FS+, 2:FS, 1:Sy, 0:none
		retdata.fcapLamp = Lamps2Num(rd[9]);	// 4:AP+, 3:AP, 2:FC+, 1:FC; 0:none
		retdata.rankLamp = AchiLamp2Str(rd[10]);	// A以上ならrankそのまま BBB以下は空白

		// 自分側
		retdata.p_achi = Number(rd[3].replace(/―|\.|%/g, ""));	// 達成率 %表示を10000倍した物 例:100.5000% => 1005000
		retdata.p_rankLamp = AchiLamp2Str(rd[5]);	// A以上ならrankそのまま BBB以下は空白 外部から直接アクセスさせない
		retdata.p_fcapLamp = Lamps2Num(rd[6]);	// 4:AP+, 3:AP, 2:FC+, 1:FC; 0:none
		retdata.p_fsdxLamp = Lamps2Num(rd[7]);	// 5:FSD+, 4:FSD, 3:FS+, 2:FS, 1:Sy, 0:none

		// フレンドモード区別用（データとしては意味なし）
		retdata.maxDxsc = -1;	// 計算不可なので。通常モード区分けで使用
		retdata.dxscRatio = -1;	// 計算不可なので。通常モード区分けで使用
	}
	else	// フレンドモード でらスコまで取得時
	{
		// フレンド側
		retdata.achi = Number(rd[4].replace(/―|\.|%/g, ""));	// 達成率 %表示を10000倍した物 例:100.5000% => 1005000
		retdata.fsdxLamp = Lamps2Num(rd[8]);	// 5:FSD+, 4:FSD, 3:FS+, 2:FS, 1:Sy, 0:none
		retdata.fcapLamp = Lamps2Num(rd[9]);	// 4:AP+, 3:AP, 2:FC+, 1:FC; 0:none
		retdata.rankLamp = AchiLamp2Str(rd[10]);	// A以上ならrankそのまま BBB以下は空白
		retdata.dxscStar = Number(rd[12]);	// でらっくスコアの星 表示された値
		retdata.dxsc = Number(rd[14].replace(/―/,"0"));	// でらっくスコア

		// 自分側
		retdata.p_achi = Number(rd[3].replace(/―|\.|%/g, ""));	// 達成率 %表示を10000倍した物 例:100.5000% => 1005000
		retdata.p_rankLamp = AchiLamp2Str(rd[5]);	// A以上ならrankそのまま BBB以下は空白 外部から直接アクセスさせない
		retdata.p_fcapLamp = Lamps2Num(rd[6]);	// 4:AP+, 3:AP, 2:FC+, 1:FC; 0:none
		retdata.p_fsdxLamp = Lamps2Num(rd[7]);	// 5:FSD+, 4:FSD, 3:FS+, 2:FS, 1:Sy, 0:none
		retdata.p_dxscStar = Number(rd[11]);	// フレンドでらっくスコアの星 表示されたものそのまま使用
		retdata.p_dxsc = Number(rd[13].replace(/―/,"0"));	// フレンドでらっくスコア

		// フレンドモード区別用（データとしては意味なし）
		retdata.maxDxsc = -1;	// 計算不可なので。通常モード区分けで使用
		retdata.dxscRatio = -1;	// 計算不可なので。通常モード区分けで使用
	}
	return retdata;
}