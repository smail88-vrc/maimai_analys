javascript:

var mai_series_data = '';
const m_titlelist = [];	// 曲名リスト。配列操作禁止。
const m_nicknamelist = []; //短縮名リスト。配列操作禁止。
const m_dxlist = [];	// 譜面種別リスト(0:std, 1:dx)。 配列操作禁止。
const m_iconlist = [];	// iconリスト 配列操作禁止
const playerdata_list=[];	//ソート用のplayerdata格納先。配列操作禁止。

const make_html = (tag, attr, cls, text) =>
	'<' + tag + ((attr!='')?(' ' + attr):'') + ((cls!='')?(' class="' + cls + '"'):'') + '>' + text + '</' + tag + '>\n';

(function ()
{
	const MAI_NEWEST_VER = 22;	// 現行verの数字
	const Img_Dom = "https://maimaidx.jp/maimai-mobile/img/";	// 画像のURL

	const DiffStr = ['basic', 'advanced', 'expert', 'master', 'remaster'];
	const KindStr = ['standard', 'dx'];
	const DiffColor = [`#45c124`, `#ffba01`, `#ff7b7b`, `#9f51dc`, `#dbaaff`];

	// addrのページをgetしてくる
	const getPage_callback = (addr, post)=>
	{
		return new Promise((resolve, reject)=>
		{
			fetch(addr)
			.then(res => res.text())
			.then(text => new DOMParser().parseFromString(text, "text/html"))
			.then((document) => {
				resolve(document);
			});
		});
	}

	// 各楽曲の楽曲スコアのページから、iconのファイル名を取得
	// idx は、楽曲スコア全体ページの hidden要素から取得した謎の文字列そのまま
	const getMusicIconURL = (idx) =>
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

	const getCollectionURL = (url, domquery) =>
	{
		return getPage_callback(url)
		.then((page) => {
			const SettingInfo = page.querySelector(`div.see_through_block.collection_setting_block`);
			const CollectionTitle = SettingInfo.querySelector(`div.f_14.break`).innerText;
			let UrlList=[];
			switch(CollectionTitle)
			{
				case "全体からランダム":
					UrlList = Array.prototype.map.call(
							page.querySelectorAll(`div.town_block.m_t_0:not([name$=genre_101])`),
							(x)=>Array.from(x.querySelectorAll(domquery))
								).flat().map((x)=>x.src);
					break;

				case "お気に入りからランダム":
					UrlList = Array.from(page.querySelector(`div.town_block[name$=genre_100]`).querySelectorAll(domquery))
							.map((x)=>x.src);
					break;

				default:
					UrlList = [SettingInfo.querySelector(domquery).src];
					break;
			}

			const now = new Date();
			const random_seed = (now.getHours())*3600 + (now.getMinutes())*60 + (now.getSeconds()) + performance.now();
			const idx = Math.floor(Math.random(random_seed)*UrlList.length);

			return UrlList[idx];
		});
	}

	const getTrophyDOM = () =>
	{
		return getPage_callback(`https://maimaidx.jp/maimai-mobile/collection/trophy/`)
		.then((page) => {
			const SettingInfo = page.querySelector(`div.see_through_block.collection_setting_block`);
			const TrophyTitle = SettingInfo.querySelector(`div.trophy_inner_block span`).innerText
			// ランダムを除くDOMリスト
			let DomList=Array.from(page.querySelectorAll(`div.trophyList.town_block div.see_through_block`));

			switch(TrophyTitle)
			{
				case "全体からランダム":
					// 最初に作ったDomListをそのまま使用
					break;

				case "お気に入りからランダム":
					// お気に入り解除になっている物のみ抽出
					DomList = DomList.filter((x)=>x.querySelector(`form`).action.split(`/`).slice(6).shift() == "favoriteOff")
					break;

				default:
					DomList = [SettingInfo];
					break;
			}

			const now = new Date();
			const random_seed = (now.getHours())*3600 + (now.getMinutes())*60 + (now.getSeconds()) + performance.now();
			const idx = Math.floor(Math.random(random_seed)*DomList.length);

			return DomList[idx].querySelector(`div.collection_trophy_block`);
		});
	}
	
	// Lvは10倍、Achiは10000倍
	const makeRateList = (Lv, Achi, Diff) =>
	{
		let RateList = [];
		const lv4calc = Math.abs(Lv);
		const roops = (Lv>0 || Diff=="basic")?1:(Lv>-7)?10:(lv4calc%10==0)?6:4;	// rating値を入れる箱の数

		for(let i=0; i<roops; ++i)
		{
			RateList.push(achi2rating_latest(lv4calc+i, Achi));
		}
		return RateList;
	}

	// B枠の達成率のページから各種データを文字列として取得
	// [難易度、譜面種別、表記レベル、曲名、Form内idx、達成率] （全部文字列）
	async function getDataBestWaku (w450)
	{
		if(w450.classList.contains("screw_block"))
			return {Name : "screw_block"};

		const Diff = w450.querySelector("img.h_20.f_l").getAttribute("src").slice(43,-4);	// 難易度
		const Kind = w450.querySelector("img.music_kind_icon").getAttribute("src").slice(44,-4);	// 種別
		const Lv = -10*Number(w450.querySelector("div.music_lv_block").innerText.trim().replace(/\+/, ".6"));	// Lv (数字化 13+ -> -136)
		const Name = w450.querySelector("div.music_name_block").innerText;	// 曲名
		const Idx = w450.querySelector("input").getAttribute("value");	// From内のidx
		const Achi = Number(w450.querySelector(`div.music_score_block`).innerText.trim().replace(/\.|%|,| /g, ""));	// 達成率 数字

		let tmp_inlv_list = in_lv.filter((x)=>KindStr[x.dx]==Kind && x.n.replace(/ +/g, ' ')==Name);

		if(tmp_inlv_list.length == 1)	// 楽曲＆譜面種別確定
		{
			const tmp_inlv = tmp_inlv_list[0];
			let tmpLv = tmp_inlv.lv[(tmp_inlv.lv.length == 6 && Diff=="remaster")?5:(DiffStr.indexOf(Diff))];
			tmpLv = (tmpLv==0)?Lv:(10*tmpLv);	// 0の時はLvを使う

			return 	{
				Diff : Diff,
				Kind : Kind,
				Name : Name,
				Nickname : (tmp_inlv.nn ==undefined)?Name:tmp_inlv.nn,
				Lv : (tmpLv<0)?(`(` + String(Math.abs(tmpLv)/10).replace(/\.6/, `+`) + `)`):((tmpLv/10).toFixed(1)),	//文字列
				Ico : tmp_inlv.ico,
				Achi : Achi,
				RateList : makeRateList(tmpLv, Achi, Diff),
				TargetAchi : [],
				OrgRateList : [],
			};
		}
		if(tmp_inlv_list.length > 1)	// 楽曲＆譜面種別が確定できない (Link問題)
		{
			return new Promise((resolved, reject) =>{
				getMusicIconURL(Idx).then((ico)=>{
					const tmp_inlv = tmp_inlv_list.filter((x)=>x.ico == ico)[0];
					let tmpLv = tmp_inlv.lv[(tmp_inlv.lv.length == 6 && Diff=="remaster")?5:(DiffStr.indexOf(Diff))];
					tmpLv = (tmpLv==0)?Lv:(10*tmpLv);	// 0の時はLvを使う

					resolved({
						Diff : Diff,
						Kind : Kind,
						Name : (tmp_inlv.nn ==undefined)?Name:tmp_inlv.nn,	// 表示上も区別可能な物に変更
						Nickname : (tmp_inlv.nn ==undefined)?Name:tmp_inlv.nn,
						Lv : (tmpLv<0)?(`(` + String(Math.abs(tmpLv)/10).replace(/\.6/, `+`) + `)`):((tmpLv/10).toFixed(1)),	//文字列
						Ico : ico,
						Achi : Achi,
						RateList : makeRateList(tmpLv, Achi, Diff),
						TargetAchi : [],
						OrgRateList : [],
					});
				});
			});
		}
		else
		{
			return 	{
				Diff : Diff,
				Kind : Kind,
				Name : Name,
				Nickname : Name,
				Lv : `(` + String(Math.abs(Lv)/10).replace(/\.6/, `+`) + `)`,	//文字列
				Ico : ``,
				Achi : Achi,
				RateList : makeRateList(Lv, Achi, Diff),
				TargetAchi : [],
				OrgRateList : [],
			};
		}		
	}

	// searchLv_calcRating で Rating値を求めたDataListを入れて、不要な値を消す
	const removeExtraValues = (DataList) =>
	{
		// Dataの中にある、MaxRatingより大きなデータを消す
		const removeOverRating = (Data, TmpAchi, MaxRating) =>
		{
			const TargetRating = (Data.Achi > TmpAchi)?(MaxRating-1):MaxRating;
			Data.RateList = Data.RateList.map((x)=> (x > TargetRating)?"":x);
			return Data;
		}

		// Dataの中にある、MinRatingより小さなデータを消す
		const removeUnderRating = (Data, TmpAchi, MinRating) =>
		{
			const TargetRating = (Data.Achi < TmpAchi)?(MinRating+1):MinRating;
			Data.RateList = Data.RateList.map((x)=> (x < TargetRating)?"":x);
			return Data;
		}

		// 上から消していく
		let TmpAchi = 1010000, TmpRatingList=[], TmpRating=500;
		for(let n = 0; n<DataList.length; n++)
		{
			DataList[n] = removeOverRating(DataList[n], TmpAchi, TmpRating);
			TmpAchi = DataList[n].Achi;
			TmpRatingList = DataList[n].RateList.filter((x)=>String(x).length > 0);
			if(TmpRatingList.length == 0)
			{
				// nより前にあるDataの中で内部確定(=RateList.length==1)しているデータの一番nに近いDataの番地
				const TmpList = DataList.slice(0,n);
				const TmpData= TmpList.reverse().find((x)=>x.RateList.length==1);
				if(TmpData != undefined) TmpData.Lv += `?`;
				DataList[n].Lv += `?`;
				break;
			}
			TmpRating = TmpRatingList.reduce((a,b)=>Math.max(a,b));
		}
		DataList.reverse();	// 逆順にする
		TmpAchi = DataList[0].Achi;
		TmpRating = DataList[0].RateList.filter((x)=>String(x).length > 0).reduce((a,b)=>Math.min(a,b));
		for(let n = 0; n<DataList.length; n++)
		{
			DataList[n] = removeUnderRating(DataList[n], TmpAchi, TmpRating);
			TmpAchi = DataList[n].Achi;
			TmpRatingList = DataList[n].RateList.filter((x)=>String(x).length > 0);
			if(TmpRatingList.length == 0)
			{
				// nより前にあるDataの中で内部確定(=RateList.length==1)しているデータの一番nに近いDataの番地
				const TmpList = DataList.slice(0,n);
				const TmpData= TmpList.reverse().find((x)=>x.RateList.length==1);
				if(TmpData != undefined) TmpData.Lv += `?`;
				DataList[n].Lv += `?`;
				break;
			}
			TmpRating = TmpRatingList.reduce((a,b)=>Math.min(a,b));
		}
		DataList.reverse();	// 逆順にする

		return;
	}	

	const removeOverShortage = (Data, Shortage) =>
	{
		const MinVal = Data.RateList.filter((x)=>String(x).length > 0)[0];	//空箱以外で最小の数字
		Data.RateList = Data.RateList.map((x)=>(String(x).length==0)?'':(x>MinVal+Shortage)?'':x);
		return;
	}

	// 候補値を一つずつ試しながら、明らかに不成立となるRate値を候補から除外する
	// num : B枠の譜面数。基本は 現行枠の最大の15か旧枠の最大の35が入る。
	// LogicalRatingMax : Dataの最低値に不足分を足した値
	const removeLogicalOverRateValue = (Data, num, LogicalMaxRating) =>
	{
		const RoopMax = [35, num, Data.length].reduce((a,b)=>Math.min(a, b));
		Data.forEach((x)=>x.OrgRateList = Array.from(x.RateList));	// 元データをコピーしておく

		for(let n=0; n < RoopMax || Data[n] != undefined ; n++)
		{
			const RateList = Data[n].RateList.filter((x)=>String(x).length > 0);	// Rate値候補
			if(RateList.length == 1)	// 内部Lv確定
				continue;	// 次の候補へ。
			else if(RateList.length == 0)	// 候補値なし
				continue;
			for(let k=0; k < RateList.length; k++)
			{
				Data.forEach((x)=>x.RateList = Array.from(x.OrgRateList));	// RateListに元の値を入れる
				Data[n].RateList = RateList.slice(k);
				removeExtraValues(Data);
				const DataRateList = Data.slice(0,num).map((x)=>x.RateList.filter((x)=>String(x).length>0)[0]);	// 現在のRate（最低値）のリスト
				const DataRatingTotal = (DataRateList.filter((x)=>x==undefined).length > 0)?-1:DataRateList.reduce((a,b)=>a+b, 0);	// 現在のRate合計
				if(LogicalMaxRating < DataRatingTotal)	// 理論最大値を上回る
				{
					const OverRate = RateList.slice(k)[0];	// その時のRate値
					Data[n].OrgRateList = Data[n].OrgRateList.map((x)=>x=(x < OverRate)?x:"");	// OrgRateListの内、OverRateを超えたものを消す
					break;	// kのループを抜ける。
				}
			}
			Data.forEach((x)=>x.Lv = x.Lv.replace(/\?+/, ""));	// ???を消す
		}
		Data.forEach((x)=>x.RateList = Array.from(x.OrgRateList));	// 候補値を元のRateListに入れる
		return;
	}

	// 終了時点で、Rating候補値だけが入っている状態にする
	const searchCandRateValue = (CurrList, PrevList, UserRating) =>
	{
		// **** 計算本体 **** 
		if(CurrList.length!=0)	// 現行ver枠の譜面が1個以上の時のみ処理
			removeExtraValues(CurrList);	// 不要な値を消す
		if(PrevList.length!=0)	// 旧ver枠の譜面が1個以上の時のみ処理
			removeExtraValues(PrevList);	// 不要な値を消す

		// この時点で候補値がなくなる譜面が出たら設定ミス有の状況なので、これ以後の操作を止める。
		// 候補値の中の最低値のリスト
		let CurrRateList = CurrList.map((x)=>x.RateList.filter((x)=>String(x).length>0)[0]);
		let PrevRateList = PrevList.map((x)=>x.RateList.filter((x)=>String(x).length>0)[0]);
		// 候補値がなくなったものがあれば以後の処理を止める。
		if (CurrRateList.filter((x)=>x==undefined).length > 0) return;
		if (PrevRateList.filter((x)=>x==undefined).length > 0) return;

		// 不足Ratingを求める
		let CurrRatingTotal = CurrRateList.slice(0,15).reduce((a,b)=>a+b, 0);	// 推定現行Rating
		let PrevRatingTotal = PrevRateList.slice(0,35).reduce((a,b)=>a+b, 0);	// 推定旧枠Rating
		let ShortageRate = UserRating - CurrRatingTotal - PrevRatingTotal;	// 推定値からの不足分

		// B枠のRateListで、RateListの最低値 + 全体の不足値より大きい数を消す （例: 不足4で ['', '', 297,299,301,303, ''] なら、303は外せる。）
		if(ShortageRate >= 0)
		{
			if(CurrList.length!=0)	// 現行ver枠の譜面が1個以上の時のみ処理
			{
				CurrList.slice(0,15).forEach((x)=>removeOverShortage(x, ShortageRate));
				removeExtraValues(CurrList);	// 消えた分を反映するため、再度removeExtraValuesを呼び出す
			}
			if(PrevList.length!=0)	// 旧ver枠の譜面が1個以上の時のみ処理
			{
				PrevList.slice(0,35).forEach((x)=>removeOverShortage(x, ShortageRate));
				removeExtraValues(PrevList);	// 消えた分を反映するため、再度removeExtraValuesを呼び出す
			}
		}

		// 複数条件から候補を外せる譜面を算出
		if(ShortageRate > 0)
		{
			if(CurrList.length > 0)
			{
				removeLogicalOverRateValue(CurrList, 15, CurrRatingTotal + ShortageRate);
				removeExtraValues(CurrList);	// 不要な値を消す
			}
			if(PrevList.length > 0)
			{
				removeLogicalOverRateValue(PrevList, 35, PrevRatingTotal + ShortageRate);
				removeExtraValues(PrevList);	// 不要な値を消す
			}
		}

	}		
	
	// Attributesは文字列リスト [`value=0xFF`, `style="height:30px"`]
	const makeNewDiv = (Attributes, ClassList, InnerText) =>
	{
		const NewDiv = document.createElement("div");
		Attributes.forEach((x)=>NewDiv.setAttribute(x.split(`=`)[0], x.split(`=`)[1]));
		if(ClassList != "") NewDiv.classList = ClassList;
		if(InnerText != "") NewDiv.innerText = InnerText;

		return NewDiv;
	}

	const makeNewImg = (Attributes, ClassList, SrcUrl) =>
	{
		const NewImg = document.createElement("img");
		Attributes.forEach((x)=>NewImg.setAttribute(x.split(`=`)[0], x.split(`=`)[1]));
		if(ClassList != "") NewImg.classList = ClassList;
		if(SrcUrl != "") NewImg.setAttribute("src", SrcUrl);

		return NewImg;
	}

	const makeNewSpan = (Attributes, ClassList, InnerText) =>
	{
		const NewSpan = document.createElement("span");
		Attributes.forEach((x)=>NewSpan.setAttribute(x.split(`=`)[0], x.split(`=`)[1]));
		if(ClassList != "") NewSpan.classList = ClassList;
		if(InnerText != "") NewSpan.innerText = InnerText;

		return NewSpan;	
	}

	const makeNewForm = (IDX, NameNode) =>
	{
		const NewForm = document.createElement("form");
		NewForm.setAttribute("action", "https://maimaidx.jp/maimai-mobile/record/musicDetail/");
		NewForm.setAttribute("method", "get");
		NewForm.setAttribute("accept-charset", "utf-8");

		NewForm.appendChild(NameNode);

		const NewInput = document.createElement("input");
		NewInput.setAttribute("type", "hidden");
		NewInput.setAttribute("name", "idx");
		NewInput.setAttribute("value", IDX);
		NewForm.appendChild(NewInput);

		return NewForm;
	}

	// 元のデータボックスをベースに、表示用データボックスを生成
	const makeNewW450 = (Data) =>
	{
		// div.clearfix のNode　2ついるので、先に定義。
		const ClearfixBlock = document.createElement("div");
		ClearfixBlock.classList.add("clearfix");

		// 大外の枠
		const W450Block = document.createElement("div");
		W450Block.classList = "w_450 p_3 music_score_back " + Data.Diff;	// 難易度の画像
		// Level
		const FixednessStr = (Data.RateList.length > 1 && Data.RateList.filter((x)=>String(x).length>0).length == 1)?" fixedness":"";
		W450Block.appendChild(makeNewDiv([], "lv_block_new" + FixednessStr + " f_r t_c f_12", String(Data.Lv).replace(/\?+/, '?')));
		// 曲名
		const MusicNameSpan = makeNewSpan([`value=`+Data.Ico], "t_l f_12 break music_title_"+ Data.Kind, Data.Name);
		const MusicBlockDiv = makeNewDiv([], "music_name_block t_l music_title_back_" + Data.Kind, "");
		MusicBlockDiv.appendChild(MusicNameSpan);
		W450Block.appendChild(MusicBlockDiv);
		// clearfix
		W450Block.appendChild(ClearfixBlock);
		// 達成率
		W450Block.appendChild(makeNewDiv([], "music_score_block t_r f_r f_12 rate_box_new", (Data.Achi/10000).toFixed(4) + "%"));
		// Rating値
		Data.RateList.forEach((x)=>W450Block.appendChild(makeNewDiv([], "music_score_block t_r f_r f_12 rate_box_new", (String(x).length>0)?String(x):"")));
		// 内部Lv.が算出で確定の場合、明示的に表示する
		if(Data.RateList.length > 1 && Data.RateList.filter((x)=>String(x).length>0).length == 1)
			W450Block.appendChild(makeNewDiv([], "music_score_block t_r f_r f_12 rate_box_new red", ((Data.Ico==``)?`新曲`:``)+`内部Lv.確定`));
		if(Data.RateList.length == 1 && Data.RateList.filter((x)=>String(x).length>0).length == 0)
			W450Block.appendChild(makeNewDiv([], "music_score_block t_r f_r f_12 rate_box_new red", `内部Lv.設定ミス？`));
		else
		// 目標値は背景を半透明に
			Data.TargetAchi.forEach((x)=>W450Block.appendChild(makeNewDiv([], "music_score_block through t_r f_r f_12 rate_box_new", x)));
		// clearfix
		W450Block.appendChild(ClearfixBlock.cloneNode(false));

		return W450Block;
	}

	// big : 文字列。基本的に、追加する".big"を入れるか""なるか
	const makeBestWakuCard = (Data) =>
	{
		// div.clearfix のNode　2ついるので、先に定義。
		const ClearfixBlock = document.createElement("div");
		ClearfixBlock.classList.add("clearfix");

		const DivCardBlock = document.createElement("div");
		DivCardBlock.classList = `music_best_waku_back ` + Data.Diff;
		const StyleStr = (Data.Ico!="" && Data.RateList.filter((x)=>String(x).length>0).length == 1)
			?("background-image:url(https://maimaidx.jp/maimai-mobile/img/Music/" + Data.Ico + ".png);"):"";
		DivCardBlock.setAttribute(`style`, StyleStr);
		// Rate
		const DivMusicData = makeNewDiv([], "music_best_waku_musicdata " + Data.Diff, "");
		const DispRate = Data.RateList.filter((x)=>String(x).length > 0)[0]
		DivMusicData.appendChild(makeNewSpan(['style=padding-right:2px;'], "f_r", (DispRate!=undefined)?String(DispRate):"???"));		
		DivMusicData.appendChild(makeNewSpan(['style=padding-left:2px;'], "f_l", "Lv" + String(Data.Lv).replace(/\?+/, '?')));
		// clearfix（dataの前）
		DivMusicData.appendChild(makeNewDiv([], "clearfix", ""));
		// RateListでRateが残っている番地をbit和で表現 内部Lv未定譜面では表示する
		const AnalysisNumberStr = (Data.RateList.length == 1 && Data.RateList.filter((x)=>String(x).length>0).length == 0)?`[0] 設定失敗？`
			:(Data.RateList.length==1)?""
			:(`[`+ (Data.RateList.map((x)=>String(x).length>0?1:0).map((x,n)=>x*Math.pow(2,n)).reduce((a,b)=>a+b)) + `]`
			  + ((Data.RateList.filter((x)=>String(x).length>0).length == 1)?` 確定`:""));
		// Title
		DivMusicData.appendChild(makeNewSpan([], "black", AnalysisNumberStr + `\n` + Data.Name));
		DivCardBlock.appendChild(DivMusicData);
		DivCardBlock.appendChild(makeNewDiv([], "clearfix", ""));		

		// Achivement
		const DivBwakuCardAchi = makeNewDiv([], "music_best_waku_achi " + Data.Kind, "");
		DivBwakuCardAchi.appendChild(makeNewSpan([], "", (Data.Achi/10000).toFixed(4) + "%"));
		DivMusicData.appendChild(DivBwakuCardAchi);
		// clearfix（achivementの後）
		DivMusicData.appendChild(makeNewDiv([], "clearfix", ""));

		return DivCardBlock;
	}

	const make_lvlist_str = (lvlist) =>
	{
		const LvRow = [];	// Lvの列
		const AchiRow = [];	// 達成率の列

		// 1つのデータに対するhtmlの生成
		const sub = (data) =>
		{
			let achistr = '';	//達成率の文字列
			let charsize = 14;	// 14 or 11, class="f_nn" の nn

			// Lvが15.0以上との時、達成率が97%未満のとき、境界達成率のデータは表示しない。
			if(data[0] > 150 || data[1] < 970000 || data[1]%1000 == 999)	return;

			// それ以外の時は表示用データを生成する。
			switch(data[1])
			{
				case 1005000 :	achistr = 'SSS+'; break;
				case 1000000 :	achistr = 'SSS'; break;
				case  995000 :	achistr = 'SS+'; break;
				case  990000 :	achistr = 'SS'; break;
				case  980000 :	achistr = 'S+';	break;
				case  970000 :	achistr = 'S';	break;
				default:
					charsize = 11;
					achistr = '.'+(("000"+(data[1]%10000)).slice(-4));
					break;
			}

			// Lvは10倍で格納されているので1/10して格納
			LvRow.push(make_html('td', 'align=center', '', make_html('span', '', ['f_' +charsize, ((charsize==14)?"f_b":"")].join(' ') , (data[0]/10).toFixed(1))));
			// 達成率は前述のswitch文内で算出された物を格納
			AchiRow.push(make_html('td', 'align=center', '', make_html('span', '', ['f_' +charsize, ((charsize==14)?"f_b":"")].join(' ') , achistr)));
			return;
		}

		// 表示用データ生成
		lvlist.forEach(sub);

		// LvRowとAchiRowをそれぞれjoinして、tableタグで囲む
		return '<table style="margin:0px auto; width:95%;" align="center">\n'
			+ '<tr>\n' + AchiRow.join('\n') + '</tr>\n'
			+ '<tr>\n' + LvRow.join('\n') + '</tr>\n'
			+ '</table>';
	}

	// ratingに渡された値をもとに、色を返却
	const Rating2Color = (rating) =>
	{
		return (rating>=15000)?'rainbow':(rating>=14500)?'platinum':(rating>=14000)?'gold'
			:(rating>=13000)?'silver':(rating>=12000)?'bronze':(rating>=10000)?'purple'
			:(rating>=7000)?'red':(rating>=4000)?'orange':(rating>=2000)?'green'
			:(rating>=1000)?'blue':'normal';
	}

	// 与えられたRatingに応じたRating背景Image
	const Rating2Img = (rating) => `https://maimaidx.jp/maimai-mobile/img/rating_base_` + Rating2Color(rating) + `.png`

	// ratingのimg srcを、ratingの値に合わせたものに変換
	const change_rating_color = (rating_base, rating)=>
	{
		return rating_base.replace(/rainbow|platinum|gold|silver|bronze|purple|red|orange|green|blue|normal/,
					   Rating2Color(rating));
	}

	// Ratingを1以上増やすために必要なresultを追加する
	// Lv未定義譜面でも、確定するケースの場合はその推定値を表記するように変更
	const addTargetAchi = (Data, Border) =>
	{
		const Achi2Rankstr = (achi) =>
		(achi==1005000)?"SSS+":(achi==1000000)?"SSS"
		:(achi==995000)?"SS+":(achi==990000)?"SS"
		:(achi==980000)?"S+":(achi==970000)?"S"
		:((achi/10000).toFixed(4) + "%");

		const targtNextRank = (achi) =>
		(achi>=1000001)?1005000:(achi>=995001)?1000000
		:(achi>=990001)?995000:(achi>=980001)?990000
		:(achi>=970001)?980000:970000;

		const addDataBox = (achi) =>
		achi2rating_latest(Math.round(Number(Data.Lv)*10), achi) + `(` + Achi2Rankstr(achi) + `)`;

		// Lv未確定譜面
		if(Data.RateList.length > 1)
		{
			//[難易度、譜面種別、表記レベル、曲名、Form内idx、達成率] 
			const TmpRateList = Data.RateList;	// Rate値の箱
			if(TmpRateList.filter((x)=>x>0).length==1)	// 内部Lv確定状態
			{
				// Lvのカッコを外して、+を.6に変換して、数字化
				let TmpLvStr = Number(Data.Lv.slice(1,-1).replace(/\+/, `.6`));
				const TmpRate = TmpRateList.filter((x)=>String(x).length>0)[0];	// 唯一残っているはずのレート値
				Data.Lv = `(` + (TmpLvStr + TmpRateList.indexOf(TmpRate) * 0.1).toFixed(1) + `)`
				return 
			}
			else
				return;
		}

		// Lv確定譜面は、1以上Ratingが上がる達成率を計算してTargetAchiに追加する

		// SSS+到達譜面もRatingがこれ以上増えることは無いので終了。
		if(Data.Achi >= 1005000)	return;

		// Ratingが1以上上がる達成率を算出する
		let tgtAchi = get_reachable_achivement_for_rate(Math.round(Number(Data.Lv)*10), Math.max(Data.RateList[0], Border)+1);

		if(tgtAchi < 970000)	tgtAchi=970000;	// S未満はSとする
		if(tgtAchi % 1000 == 999)	tgtAchi++;	// .n999は切り上げる
		if(tgtAchi <= 1005000)	Data.TargetAchi.push(addDataBox(tgtAchi));
		let NextRankAchi = targtNextRank(tgtAchi);
		if(NextRankAchi > tgtAchi)	Data.TargetAchi.push(addDataBox(NextRankAchi));
		if(1000000 > NextRankAchi)	Data.TargetAchi.push(addDataBox(1000000));
		if(1005000 > NextRankAchi)	Data.TargetAchi.push(addDataBox(1005000));
		return;
	}

	const collectPlayerBaseData = (PlayerData) =>
	{
		//オトモダチ対戦ランキング上位 src取ると無い時NGなので後で。
		ImgFrame = PlayerData.querySelector(`img.honor_frame`);	// frame <img>
		ImgFrameNum1 = PlayerData.querySelector(`img.honor_num1`);	// frameのシーズン名 十の位 <img>
		ImgFrameNum2 = PlayerData.querySelector(`img.honor_num2`);	// frameのシーズン名 一の位 <img>

		return {
			icon : PlayerData.querySelector(`img.w_112`).src,	// icon URL <string>
			trophy_color :PlayerData.querySelector(`div.trophy_block`).classList.value.split(" ")
				.find((x)=>/^trophy/.test(x) && !(/block$/.test(x))).toLowerCase(),	// trophy_color <string>
			trophy : PlayerData.querySelector(`div.trophy_inner_block`).innerText,	// 称号 <string>
			name : PlayerData.querySelector(`div.name_block`).innerText,	// player name <string>
			rating : PlayerData.querySelector(`div.rating_block`).innerText,	// Rating <string>
			grade :PlayerData.querySelector(`img.h_35.f_l:not(.p_l_10)`).src,	// grade (段位) URL <string>
			rank : PlayerData.querySelector(`img.h_35.f_l.p_l_10`).src,	// rank(オトモダチ対戦) URL <string>
			starcount : PlayerData.querySelector(`div.p_l_10.f_l.f_14`).innerText,	// ☆の数 <string>
			frame : (ImgFrame != null)?ImgFrame.src:"",	// Ranking Frame URL <string>
			framenum1 : (ImgFrameNum1 != null)?ImgFrameNum1.src:"",	// Ranking Frame Season (10の位) URL <string>
			framenum2 : (ImgFrameNum2 != null)?ImgFrameNum2.src:"",	// Ranking Frame Season (1の位) URL <string>
			};
	}

	const setPlayerDataOnFrame_withPlate = (PlayerData, args) =>
	{
		const trophy = args[3].innerText.trim();
		const trophy_color = Array.from(args[3].classList).find((x)=>/^trophy_/.test(x)).split(`_`)[1].toLowerCase();
		
		const BackgroundString = (size, position, url) =>
			(url == "")?"":(size + `/` + position + ` no-repeat url(` + url + `)`);

		const StyleBackground = [
			// ネームプレート部
			BackgroundString(`14px 30px`, `44px`, args[0]),	// icon
			BackgroundString(`58px 30px`, `72px 16px`, Rating2Img(PlayerData.rating)),	// current rate
			BackgroundString(`132px 22px`, `40px 24px`, PlayerData.rank),	// rank (otomodachi)
			BackgroundString(`58px 62px`, `112px 12px`, `https://maimaidx.jp/maimai-mobile/img/trophy_` + trophy_color + `.png`),	// trophy
			BackgroundString(`12px 28px`, `300px auto`, args[2]),	// plateは一番最後
			// ここからはplateの下
			BackgroundString(`28px 80px`, `268px 24px`, `https://maimaidx.jp/maimai-mobile/img/trophy_` + trophy_color + `.png`),	// plate下のtrophy
			BackgroundString(`192px 106px`, `92px 24px`, Rating2Img(PlayerData.rating)),	// current rate
			BackgroundString(`24px 132px`, `280px auto`, `https://maimaidx.jp/maimai-mobile/img/line_01.png`),	// 点線の画像
			BackgroundString(`32px 144px`, `auto 20px`, PlayerData.grade),	// grade (段位)
			BackgroundString(`80px 142px`, `auto 24px`, PlayerData.rank),	// rank (オトモダチ対戦)					 
			BackgroundString(`124px 144px`, `auto 20px`, `https://maimaidx.jp/maimai-mobile/img/icon_star.png`),	// rank (オトモダチ対戦)					 
			BackgroundString(`192px 140px`, `92px 24px`, Rating2Img(Number(args[7]))),	// Surmited rate
			// ここからはランキング上位者のフレーム
			BackgroundString(`260px 183px`, `auto 17px`, PlayerData.framenum1),	// ランキング上位フレーム十の位
			BackgroundString(`272px 183px`, `auto 17px`, PlayerData.framenum2),	// ランキング上位フレーム十の位
			BackgroundString(`center 8px`, `468px 200px`, PlayerData.frame),	// ランキング上位フレーム
			// 最後にフレーム
			BackgroundString(`center 16px`, `450px 188px`, args[1]) // frame
		].filter((x)=>x!="").join(",\n").replace(/,+/g, ","); // 空文字消去用にreplace

		// Frameその他、画像設定の物は殆どここで処理
		const DivNewFrame = makeNewDiv([`style=margin-top:-16px; height:204px; background:`+StyleBackground], "f_0 p_r playerdata frame", "");

		// 実施時刻
		DivNewFrame.appendChild(makeNewDiv([`style=top:16px; right:2px; line-height:12px;background-color:rgba(255,255,255,0.75);`],
  				"p_a t_r f_10 f_b", args[4]));

		// 現在Rating
		DivNewFrame.appendChild(makeNewDiv([`style=top:32px; left:88px; width:36px; color:yellow; line-height:12px;`],
  				"p_a t_r f_10 f_b", PlayerData.rating));

		// プレイヤー名と段位認定
		const DivNameBlock = makeNewDiv([`style=top:46px; left:58px; height:16px; width:112px; background-color:white; border:1px solid black; border-radius:3px; padding-left:2px`],
			"f_l t_l p_a", "");
		DivNameBlock.appendChild(makeNewSpan(["style=line-height:14px; letter-spacing:-1px;"], "f_10 f_b", PlayerData.name));
		DivNameBlock.appendChild(makeNewImg([`style=left:74px; height:14px; width:36px;`], "p_a", PlayerData.grade));
		DivNewFrame.appendChild(DivNameBlock);

		// 称号（文字列） ネームプレート上
		DivNewFrame.appendChild(makeNewDiv([`style=top:63px;left:58px;height:14px;width:112px;line-height:12px;margin:0 2px`],
						   "p_a t_c f_10 trophy_inner_block", trophy));

		// 称号（文字列） ネームプレート上
		DivNewFrame.appendChild(makeNewDiv([`style=top:84px; left:28px; height:20px;width:264px; line-height:16px; margin:0 2px`],
						   "p_a t_c f_13 trophy_inner_block", trophy));

		// プレート下のプレイヤー名
		DivNewFrame.appendChild(makeNewDiv([`style=top:108px;left:40px;height:20px;width: 144px;background-color:white;border:1px solid black;border-radius:3px;padding-left:4px; line-height:18px;`],
						   "t_l p_a f_16 f_b playername", PlayerData.name));
		// 現在Rating（プレート下）
		DivNewFrame.appendChild(makeNewDiv([`style=top:112px; left:230px; width:48px; color:yellow; line-height:12px;`],
  				"p_a t_r f_14 f_b", PlayerData.rating));

		// ☆の数
		DivNewFrame.appendChild(makeNewDiv([`style=top:148px; left:144px; line-height:12px; background-color:rgba(255,255,255,0.75);`],
  				"p_a t_l f_14 f_b", PlayerData.starcount));

		// 引継　のラベル
		DivNewFrame.appendChild(makeNewDiv([`style=top:140px;left: 192px;width:36px;line-height:12px;background-color:rgba(255,255,255,0.75);`],
  				"p_a t_c f_10 f_b", `引　継`));

		// 予想引継Rating（プレート下）
		DivNewFrame.appendChild(makeNewDiv([`style=top:146px; left:230px; width:48px; color:yellow; line-height:12px;`],
  				"p_a t_r f_14 f_b", args[7]));

		// 計算結果
		DivNewFrame.appendChild(makeNewDiv([`style=top:168px; right:148px; line-height:12px; background-color:rgba(255,255,255,0.75);`],
  				"p_a t_r f_10 f_b", args[5]));

		// 生成したhtmlツリーをcaptureに含める
		document.querySelector(`div#capture`).insertBefore(DivNewFrame, document.querySelectorAll('div.screw_block')[0]);

	}


	const setPlayerDataWithPlate = (PlayerData, args) =>
	{
		const trophy = args[3].innerText.trim();
		const trophy_color = Array.from(args[3].classList).find((x)=>/^trophy_/.test(x)).split(`_`)[1].toLowerCase();

		const BackgroundString = (size, position, url) =>
			(url == "")?"":(size + `/` + position + ` no-repeat url(` + url + `)`);

		const StyleBackground = [
			BackgroundString(`3px 13px`, `66px`, args[0]),	// icon
			BackgroundString(`69px 12px`, `110px 24px`, Rating2Img(PlayerData.rating)),	// current rate
			BackgroundString(`184px 1px`, `56px 34px`, PlayerData.rank),	// rank (otomodachi)
			BackgroundString(`69px 62px`, `168px 17px`, `https://maimaidx.jp/maimai-mobile/img/trophy_` + trophy_color + `.png`),	// trophy
			BackgroundString(`center 10px`, `450px`, args[2]) + ` rgba(255,255,255,0.6)`	// plate
		].join(",").replace(/,/g, ","); // 空文字消去用にreplace

		// Frameその他、画像設定の物は殆どここで処理
		const DivNewFrame = makeNewDiv([`style=background:`+StyleBackground], "t_l f_0 p_r playerdata plate hidden", "");

		// 現在Rating
		DivNewFrame.appendChild(makeNewDiv([`style=top:17px; left:116px; height: 13px; width:56px; color:yellow; line-height:16px;`],
  				"p_a t_r f_b f_15", PlayerData.rating));

		// プレイヤー名と段位認定
		const DivNameBlock = makeNewDiv([`style=top:35px; left:70px;height:26px;width:170px;background-color:white; border:1px solid rgba(0,0,0,0.4); border-radius:5px; padding-left:4px`],
			"t_l p_a", "");
		DivNameBlock.appendChild(makeNewSpan(["style=line-height:24px"], "f_14 f_b", PlayerData.name));
		DivNameBlock.appendChild(makeNewImg([`style=left: 115px; height:24px;width: 52px;`], "p_a", PlayerData.grade));
		DivNewFrame.appendChild(DivNameBlock);

		// 称号（文字列）
		DivNewFrame.appendChild(makeNewDiv([`style=top: 61px;left: 69px;height:16px;width:168px; line-height:20px;margin:0 2px;`],
						   "p_a t_c f_10 trophy_inner_block", trophy));

		// ☆の数
		const DivStarCount = makeNewDiv([`style=left:2px;`], "p_a", "");
		DivStarCount.appendChild(makeNewSpan([`style=line-height:12px`], "t_l f_10 f_b", `☆`+PlayerData.starcount));
		DivNewFrame.appendChild(DivStarCount);

		// 引継Rating
		const DivInheritRate = makeNewDiv([`style=left:72px;`], "p_a", "");
		DivInheritRate.appendChild(makeNewSpan([`style=line-height:12px`], "t_r f_10 f_b",`引継Rating:`+ args[7]));
		DivNewFrame.appendChild(DivInheritRate);

		// 実施時刻
		const DivExecTime = makeNewDiv([`style=right:2px;`], "p_a", "")
		DivExecTime.appendChild(makeNewSpan([`style=line-height:12px`], "t_r f_10 f_b", args[4]))
		DivNewFrame.appendChild(DivExecTime);

		// 予想Rating
		const DivSurmitedRate = makeNewDiv([`style=bottom:1px;right:0px;height: 10px;`], "p_a", "");
		DivSurmitedRate.appendChild(makeNewSpan([`style=line-height:12px`], "t_r f_10 f_b", args[5]));
		DivNewFrame.appendChild(DivSurmitedRate);

		// 生成したhtmlツリーをcaptureに含める
		document.querySelector(`div#capture`).insertBefore(DivNewFrame, document.querySelectorAll('div.screw_block')[0]);
	}

	const setPlayerDataOnNameplate4Nazonazo = (PlayerData, args) =>
	{
		const trophy = args[3].innerText.trim();
		const trophy_color = Array.from(args[3].classList).find((x)=>/^trophy_/.test(x)).split(`_`)[1].toLowerCase();

		const BackgroundString = (size, position, url) =>
			(url == "")?"":(size + `/` + position + ` no-repeat url(` + url + `)`);

		const StyleBackground = [
			BackgroundString(`6px 24px`, `72px`, args[0]),	// icon
			BackgroundString(`2px 2px`, `18px 18px`, `https://maimaidx.jp/maimai-mobile/img/icon_star.png`),	// Star
			BackgroundString(`80px 22px`, `132px 32px`, Rating2Img(PlayerData.rating)),	// current rate
			BackgroundString(`208px 8px`, `76px`, PlayerData.rank),	// rank (otomodachi)
			BackgroundString(`80px 80px`, `200px`, `https://maimaidx.jp/maimai-mobile/img/trophy_` + trophy_color + `.png`),	// trophy
			BackgroundString(`0px 19px`, `528px`, args[2]),	// plate
		].join(",").replace(/,/g, ","); // 空文字消去用にreplace

		// Frameその他、画像設定の物は殆どここで処理
		const DivNewFrame = makeNewDiv([`style=background:`+StyleBackground], "f_0 p_r nazonazo_nameplate", "");
		// 現在Rating
		DivNewFrame.appendChild(makeNewDiv([`style=top:28px; left:134px; height:20px; width:68px; font-size:18px; color:yellow; line-height:22px;`],
  				"p_a t_r f_b", PlayerData.rating));

		// プレイヤー名と段位認定
		const DivNameBlock = makeNewDiv([`style=top:52px; left:80px; height:26px; width:200px;  background-color:white; border:1px solid black; border-radius:5px; padding-left:4px`],
			"f_l t_l p_a", "");
		DivNameBlock.appendChild(makeNewSpan(["style=font-size:16px; line-height:24px;"], "f_b", PlayerData.name));
		DivNameBlock.appendChild(makeNewImg([`style=left:132px; height:24px; width:64px;`], "p_a", PlayerData.grade));
		DivNewFrame.appendChild(DivNameBlock);

		// 称号（文字列）
		DivNewFrame.appendChild(makeNewDiv([`style=top:80px; left:80px; height:16px; width:196px; line-height:20px; margin:0 2px;`],
						   "p_a t_c f_10 trophy_inner_block", trophy));

		// ☆の数
		const DivStarCount = makeNewDiv([`style=top:3px;left:22px;height:16px; line-height:16px;background-color:rgba(255,255,255,0.75);`], "p_a", "");
		DivStarCount.appendChild(makeNewSpan([], "t_l f_12 f_b", PlayerData.starcount));
		DivNewFrame.appendChild(DivStarCount);

		// 実施時刻
		const DivExecTime = makeNewDiv([`style=top:3px;left:78px;height:16px; line-height:16px;background-color:rgba(255,255,255,0.75);`], "p_a", "")
		DivExecTime.appendChild(makeNewSpan([], "t_r f_12 f_b", args[4]))
		DivNewFrame.appendChild(DivExecTime);		// 生成したhtmlツリーをcaptureに含める

		return DivNewFrame;
	}

	const makeCaptureBig = (PlayerData, args) =>
	{
		const trophy = args[3].innerText.trim();
		const trophy_color = Array.from(args[3].classList).find((x)=>/^trophy_/.test(x)).split(`_`)[1].toLowerCase();

		let ExpectedRate = args[5].split(/[^0-9]+/).filter((x)=>String(x).length>0);
		ExpectedRate = (ExpectedRate.length != 4)?["?????", "?????", "?????", "?????"]:ExpectedRate;	// 不定時の逃げ処理
		const SurmisedRate = args[7];

		const BackgroundString = (size, position, url) =>
			(url == "")?"":(size + `/` + position + ` no-repeat url(` + url + `)`);

		const StyleBackground = [
			BackgroundString(`28px 24px`, `72px`, args[0]),	// icon
			BackgroundString(`24px 2px`, `18px 18px`, `https://maimaidx.jp/maimai-mobile/img/icon_star.png`),	// Star
			BackgroundString(`102px 22px`, `132px 32px`, Rating2Img(PlayerData.rating)),	// current rate
			BackgroundString(`230px 8px`, `76px`, PlayerData.rank),	// rank (otomodachi)
			BackgroundString(`102px 80px`, `200px`, `https://maimaidx.jp/maimai-mobile/img/trophy_` + trophy_color + `.png`),	// trophy
			BackgroundString(`22px 19px`, `528px`, args[2]),	// plate
			BackgroundString(`24px 296px`, `auto 32px`, Rating2Img(Number(ExpectedRate[0])*10/3)),	// Best Current Rate
			BackgroundString(`140px 296px`, `auto 32px`, Rating2Img(Number(ExpectedRate[1])*10/7)),	// Best Previous Rate
			BackgroundString(`256px 296px`, `auto 32px`, Rating2Img(Number(ExpectedRate[2]))),	// Expected Rate
			BackgroundString(`372px 296px`, `auto 32px`, Rating2Img(Number(ExpectedRate[3]))),	// Shotage Rate
			BackgroundString(`488px 296px`, `auto 32px`, Rating2Img(Number(SurmisedRate))),	// Surmised Rate
			BackgroundString(`center center`, `100%`, args[1]) // frame
		].join(",").replace(/,/g, ","); // 空文字消去用にreplace

		// Frameその他、画像設定の物は殆どここで処理
		const DivNewFrame = makeNewDiv([`style=background:`+StyleBackground], "f_0 p_r music_best_waku_plateframe_big", "");
		// 現在Rating
		DivNewFrame.appendChild(makeNewDiv([`style=top:28px; left:156px; height:20px; width:68px; font-size:18px; color:yellow; line-height:22px;`],
  				"p_a t_r f_b", PlayerData.rating));

		// プレイヤー名と段位認定
		const DivNameBlock = makeNewDiv([`style=top:52px; left:102px; height:26px; width:200px;  background-color:white; border:1px solid black; border-radius:5px; padding-left:4px`],
			"f_l t_l p_a", "");
		DivNameBlock.appendChild(makeNewSpan(["style=font-size:16px; line-height:24px;"], "f_b", PlayerData.name));
		DivNameBlock.appendChild(makeNewImg([`style=left:132px; height:24px; width:64px;`], "p_a", PlayerData.grade));
		DivNewFrame.appendChild(DivNameBlock);

		// 称号（文字列）
		DivNewFrame.appendChild(makeNewDiv([`style=top:80px; left:102px; height:16px; width:196px; line-height:20px; margin:0 2px;`],
						   "p_a t_c f_10 trophy_inner_block", trophy));

		// ☆の数
		const DivStarCount = makeNewDiv([`style=top:3px;left:44px;height:16px; line-height:16px;background-color:rgba(255,255,255,0.75);`], "p_a", "");
		DivStarCount.appendChild(makeNewSpan([], "t_l f_12 f_b", PlayerData.starcount));
		DivNewFrame.appendChild(DivStarCount);

		// 実施時刻
		const DivExecTime = makeNewDiv([`style=top:3px;left:100px;height:16px; line-height:16px;background-color:rgba(255,255,255,0.75);`], "p_a", "")
		DivExecTime.appendChild(makeNewSpan([], "t_r f_12 f_b", args[4]))
		DivNewFrame.appendChild(DivExecTime);

		// 推測＆予想Rating表示
		const RatingLabel = [`現 行 枠`, `旧　枠`, `推　測`, `不　足`, `引　継`];
		const RatingColor = [`white`, `white`, `yellow`, `white`, `yellow`];
		const RatingDisp = [ExpectedRate[0], ExpectedRate[1], ExpectedRate[2], ExpectedRate[3], SurmisedRate];
		for(let n=0; n<5; ++n)
		{
			// RateのLavel
			DivNewFrame.appendChild(makeNewDiv([`style=top:300px; left:` + (28+116*n) + `px;`],
							   "p_a t_c music_best_waku_bigframe_rating_label", RatingLabel[n]));
			// Rating値
			DivNewFrame.appendChild(makeNewDiv([`style=top:302px; left:` + (68+116*n) + `px; color:` + RatingColor[n] +`;`],
							   "p_a t_r music_best_waku_bigframe_rating_value", RatingDisp[n]));
		}

		// 生成したhtmlツリーをcapture_bigに含める
		document.querySelector(`div#capture_big`).appendChild(DivNewFrame);

		// 謎絵モードのデータをコピーする
		const Capture_big = document.querySelectorAll(`div#capture_big`);
		const Capture = document.querySelectorAll(`div#capture`);
		Capture_big[0].appendChild(Capture[0].querySelectorAll(`div.screw_block`)[0].cloneNode(true));
		Capture_big[0].appendChild(Capture[0].querySelectorAll(`div#best_waku`)[1].cloneNode(true));
		Capture_big[0].appendChild(Capture[0].querySelectorAll(`div.screw_block`)[1].cloneNode(true));
		Capture_big[0].appendChild(Capture[0].querySelectorAll(`div#best_waku`)[3].cloneNode(true));
		Capture_big[1].appendChild(makeNewDiv([], "cleafix", "　"));
		Capture_big[1].appendChild(Capture[1].querySelectorAll(`div.screw_block`)[0].cloneNode(true));
		Capture_big[1].appendChild(Capture[1].querySelectorAll(`div#best_waku`)[1].cloneNode(true));
		Capture_big[1].appendChild(Capture[1].querySelectorAll(`div.screw_block`)[1].cloneNode(true));		
		Capture_big[1].appendChild(Capture[1].querySelectorAll(`div#best_waku`)[3].cloneNode(true));
		Capture_big[1].appendChild(Capture[1].querySelectorAll(`div.screw_block`)[2].cloneNode(true));
		Capture_big[1].appendChild(makeNewDiv([], "cleafix", "　"));

		// コピーしたデータを加工する
		document.querySelectorAll(`#capture_big div.screw_block`).forEach((x)=>x.classList.add(`middle`));
		document.querySelectorAll(`div#capture_big div#best_waku`).forEach((x)=>x.removeAttribute(`id`));
		document.querySelectorAll(`div#capture_big div.music_best_waku_back`).forEach((x)=>x.classList.add("middle"));
		document.querySelectorAll(`div#capture_big div.music_best_waku_musicdata`).forEach((x)=>x.classList.add("middle"));
		document.querySelectorAll(`div#capture_big div.music_best_waku_achi`).forEach((x)=>x.classList.add("middle"));
		document.querySelectorAll(`div#capture_big div.hidden`).forEach((x)=>x.classList.remove(`hidden`));
		document.querySelectorAll(`div#capture_big table .f_14`).forEach((x)=>x.classList.replace('f_14', 'f_20'));
		document.querySelectorAll(`div#capture_big table .f_11`).forEach((x)=>x.classList.replace('f_11', 'f_16'));
	}

	const makeSelectMode = ( border_Lv10 ) =>
	{
		const values=["idx", "achi_high", "achi_low", "dxsc_high", "dxsc_low", "fcap_high", "fcap_low"];
		const labels=['標準の並び', '達成率 高', '達成率 低', 'DXscore% 高', 'DXscore% 低', 'FC/AP 達成', 'FC/AP 未達成'];

		const DivCond = document.createElement(`div`);
		const DivCond1 = document.createElement(`div`);
		DivCond.appendChild(DivCond1);
		const DivCond2 = document.createElement(`div`);
		DivCond.appendChild(DivCond2);

		const SelectLv= document.createElement(`select`);
		SelectLv.setAttribute('id', 'lv_select');
		SelectLv.style="border:1px solid #000; padding:2px 5px; background:unset; text-align:center"
		for(let n=150; n>=border_Lv10; n--)
			{	SelectLv.innerHTML += `<option value="` + n + `">Lv` + (n/10).toFixed(1) + `</option>`;	};
		DivCond1.appendChild(SelectLv);

		DivCond1.innerHTML += "<span class='f_14'>～</span>";
		DivCond1.appendChild(SelectLv.cloneNode(true));

		const SelectMode = document.createElement(`select`);
		SelectMode.setAttribute('id', `cond_select`);
		SelectMode.style="border:1px solid #000; padding:2px 5px; background:unset; text-align:center"

		for(let i=0; i<values.length; i++)
			{	SelectMode.innerHTML += `<option value="` + values[i] + `">` + labels[i] + `</option>`;	};
		DivCond1.appendChild(SelectMode);

		const SelectColumns = document.createElement(`select`);
		SelectColumns.setAttribute('id', `column_select`);
		SelectColumns.style="border:1px solid #000; padding:2px 5px; background:unset; text-align:center"
		for(let i=14; i>=10; i-=2)
			{	SelectColumns.innerHTML += `<option value="` + i + `">` + i + `個/行</option>`;	};
		DivCond1.appendChild(SelectColumns);
		
		const ButtonPrint = document.createElement(`button`);
		ButtonPrint.setAttribute(`onclick`, `captureNazoNazoData(Number(lv_select[0].value), Number(lv_select[1].value), cond_select.value, false, column_select.value)`);
		ButtonPrint.setAttribute(`style`, `margin:4px; padding:2px; border:1px solid black;`);
		ButtonPrint.classList.add(`f_12`);
		ButtonPrint.innerText = `なぞなぞ`;
		DivCond2.appendChild(ButtonPrint);

		const ButtonPrintMini = document.createElement(`button`);
		ButtonPrintMini.setAttribute(`onclick`, `captureNazoNazoData(Number(lv_select[0].value), Number(lv_select[1].value), cond_select.value, true, column_select.value)`);
		ButtonPrintMini.setAttribute(`style`, `margin:4px; padding:2px; border:1px solid black;`);
		ButtonPrintMini.classList.add(`f_12`);
		ButtonPrintMini.innerText = `なぞなぞ(mini)`;
		if(window.innerWidth >= 1200)
			DivCond2.appendChild(ButtonPrintMini);
		

		return DivCond;
	}

	/////**** ここからが処理本体 ****////

	if(document.querySelectorAll('.rate_box_new').length ==0)
	{
		// 何かを消す
		document.querySelectorAll('div.spmenu_toggle').forEach((x)=>x.outerHTML="");
		document.querySelectorAll(`[id^='page']`).forEach((x)=>x.outerHTML="");

		// css追加
		const linkDOM = document.createElement("link");
		linkDOM.setAttribute("rel", "stylesheet");
		linkDOM.setAttribute("media", "all");
		linkDOM.setAttribute("type", "text/css");
		linkDOM.setAttribute("href", "https://sgimera.github.io/mai_RatingAnalyzer/css/maidx_best_waku.css");
		document.querySelector('head').appendChild(linkDOM);

		// std譜面の追加Remas譜面のLvを通常の白譜面の位置にもコピー）
		in_lv.forEach((x)=>(x.lv[4]=((x.lv[5]!=undefined)?x.lv[5]:x.lv[4])));

		const today = new Date(new Date - 18000000);	// 5時間マイナス
		const DateTimeStr = [today.getFullYear(), ('0'+(today.getMonth()+1)).slice(-2), ('0'+today.getDate()).slice(-2)].join('/') + " "
			+ [("0"+(today.getHours()+5)).slice(-2), ("0"+today.getMinutes()).slice(-2)].join(':')

		// データ取得
		let CurrList = [], PrevList = [], Idx=0;	// 現行枠、旧枠のデータ置き場、および、index変数
		// screw_blockとw_450から必要データを取得
		let DataList = Array.from(document.querySelectorAll("div[class*=_score_back], div.screw_block"));
		Promise.all(DataList.map(getDataBestWaku))
		.then(DataList => {

		// ---- Rate値推測 ----

			// screw_blockのデータを消した後、次のscrew_blockのindexを探す
			DataList.shift(); Idx = DataList.findIndex((x)=>x.Name=="screw_block");
			// 旧枠Bestのデータを旧枠置き場に突っ込んだ後、現行枠Bestを消す
			DataList.slice(0,Idx).forEach((x)=>CurrList.push(x)); DataList = DataList.slice(Idx);
			// screw_blockのデータを消した後、次のscrew_blockのindexを探す
			DataList.shift(); Idx = DataList.findIndex((x)=>x.Name=="screw_block");
			// 現行枠候補のデータを現行枠置き場に突っ込んだ後、旧枠Bestを消す
			DataList.slice(0,Idx).forEach((x)=>PrevList.push(x)); DataList = DataList.slice(Idx);
			// screw_blockのデータを消した後、次のscrew_blockのindexを探す
			DataList.shift(); Idx = DataList.findIndex((x)=>x.Name=="screw_block");
			// 現行枠候補のデータを現行枠置き場に突っ込んだ後、現行枠候補を消す
			DataList.slice(0,Idx).forEach((x)=>CurrList.push(x)); DataList = DataList.slice(Idx);
			// screw_blockのデータを消す
			DataList.shift();
			// 旧枠Bestのデータを旧枠置き場に突っ込んだ後、DataListを空に
			DataList.forEach((x)=>PrevList.push(x)); DataList = null;

			const UserRating = Number(document.querySelector('div.rating_block').innerText);	//表示でらっくすRating
			searchCandRateValue(CurrList, PrevList, UserRating);
			
			// レート値計算

			const CurrRateList = CurrList.slice(0,15).map((x)=>x.RateList.filter((x)=>String(x).length>0)[0]);	// 現行枠RatingList(候補最低値)
			const CurrRatingTotal = (CurrRateList.filter((x)=>x==undefined).length > 0)?-1:CurrRateList.reduce((a,b)=>a+b, 0);	// 現行枠Rating合計
			const CurrRatingButtom = (CurrList.length < 15 || CurrRatingTotal < 0)?0:CurrRateList[14];

			const PrevRateList = PrevList.slice(0,35).map((x)=>x.RateList.filter((x)=>String(x).length>0)[0]);	// 旧枠RatingList(候補最低値)
			const PrevRatingTotal = (PrevRateList.filter((x)=>x==undefined).length > 0)?-1:PrevRateList.reduce((a,b)=>a+b, 0);	// 旧枠Rating合計
			const PrevRatingButtom = (PrevList.length < 35 || PrevRatingTotal < 0)?0:PrevRateList[34];

			const SortageExpectRate = UserRating - CurrRatingTotal - PrevRatingTotal;	// 予想からの不足Rating
			const StrSurmisedRating = (CurrRatingTotal < 0 || PrevRatingTotal < 0 || SortageExpectRate < 0)?`推定失敗 内部Lv設定ミス 作者に連絡を`
				:'推定値: ' + CurrRatingTotal + '+' + PrevRatingTotal
				+ '=' + (CurrRatingTotal+PrevRatingTotal)
				+ ' (不足: ' + SortageExpectRate + ')'



			// Lv確定譜面に対して、Ratingが増える達成率の情報を付加する。
			if(CurrRatingTotal >= 0)
				CurrList.forEach((x)=>addTargetAchi(x, CurrRatingButtom));
			if(PrevRatingTotal >= 0)
				PrevList.forEach((x)=>addTargetAchi(x, PrevRatingButtom));

			// 引継ぎ対象のデータ
			const future_rating_list = (CurrRatingTotal < 0 || PrevRatingTotal < 0)?`?????`
				:CurrList.slice(0,15).map((x)=>x.RateList.filter((y)=>y!=="").reduce((a,b)=>Math.min(a,b)))
				.concat(PrevList.slice(0,35).map((x)=>x.RateList.filter((y)=>y!=="").reduce((a,b)=>Math.min(a,b))))
				.sort((a,b)=>b-a).slice(0,35);
			const future_bottom_rating = (future_rating_list.length < 35)?0:future_rating_list[34];
			// 引継対象のRating値の合計
			const future_rating = (CurrRatingTotal < 0 || PrevRatingTotal < 0)?`?????`:future_rating_list.reduce((a,b)=>a+b, 0);

			// html2canvas用に表示領域をまとめる部分を追加 各データはこの中に入れていく
			const DivDispData = document.querySelector(`div.main_wrapper`).cloneNode(false);	// 中身なしでcopy
			DivDispData.setAttribute(`id`, `capture`);
			DivDispData.setAttribute("style", "background: #51bcf3; padding:10px 0 5px 0");
			// 現時点でのプレイヤーデータはそのまま格納しておく
			DivDispData.appendChild(document.querySelector(`div.see_through_block`));

		// ----表示内容調整----

			// 最終的なデータを表示

			// プレイヤーデータの画像のmargin-bottomを5に
			document.querySelector(`img.title`).classList.add(`m_b_5`);

			// 元のデータ表示を消去
			document.querySelectorAll(`div.w_450.m_15`).forEach((x)=>x.outerHTML="");

			// 現行枠Rating値表示をDivDispDataに移動
			DivDispData.appendChild(document.querySelector('div.screw_block'));
			DivDispData.querySelectorAll('div.screw_block')[0].innerText += " 合計:" + CurrRatingTotal;

			// 現行枠ベスト（データ版）
			const DivBestDataCurrent = makeNewDiv(["id=best_waku"], "", "");
			CurrList.slice(0,15).forEach((x)=>DivBestDataCurrent.appendChild(makeNewW450(x)));
			DivBestDataCurrent.appendChild(makeNewDiv([], "clearfix", ""));
			DivDispData.appendChild(DivBestDataCurrent);	// DivDispDataに付ける

			// 現行枠ベスト（画像版）
			const DivBestPicCurrent = makeNewDiv(["id=best_waku", "style=margin:0 15px"], "hidden", "");
			DivDispData.appendChild(DivBestPicCurrent);	// DivDispDataに付ける


			// 旧枠Rating値表示をDivDispDataに移動
			DivDispData.appendChild(document.querySelector('div.screw_block'));
			DivDispData.classList.add('best');
			// 旧枠Rating値合計
			DivDispData.querySelectorAll('div.screw_block')[1].innerText += " 合計:" + PrevRatingTotal;

			// 旧枠ベスト（データ版）
			const DivBestDataPrev = makeNewDiv(["id=best_waku"], "", "");
			PrevList.slice(0,35).forEach((x)=>DivBestDataPrev.appendChild(makeNewW450(x)));
			DivBestDataPrev.appendChild(makeNewDiv([], "clearfix", ""));
			DivDispData.appendChild(DivBestDataPrev);	// DivDispDataに付ける

			// 旧枠ベスト（画像版）
			const DivBestPicPrev = makeNewDiv(["id=best_waku", "style=margin:0 15px"], "hidden", "");
			DivDispData.appendChild(DivBestPicPrev);	// DivDispDataに付ける

			// ベスト枠のRating合計のscrew_blockは細くする。p_sも外して一番上で固定表示されないようにする
			DivDispData.querySelectorAll(`div.screw_block`).forEach((x)=>x.classList.add('best'));

			// 候補枠の画像データ格納箇所
			const DivDispTarget = document.querySelector(`div.main_wrapper`).cloneNode(false);	// 中身なしでcopy
			DivDispTarget.setAttribute(`id`, `capture`);
			DivDispTarget.setAttribute("style", "background: #51bcf3;");

			// 現行枠目標Result表示をDivDispDataに移動
			DivDispTarget.appendChild(document.querySelector('div.screw_block'));
			// 現行枠目標Result
			DivDispTarget.querySelectorAll('div.screw_block')[0].innerHTML += 
				'（目標:' + (CurrRatingButtom + 1) + '）<br>' + make_lvlist_str(get_reachable_level_achi_list(Math.max(CurrRatingButtom+1,17)));

			// 現行枠候補（データ版）
			const DivTargetDataCurrent = makeNewDiv(["id=best_waku"], "", "");
			CurrList.slice(15).forEach((x)=>DivTargetDataCurrent.appendChild(makeNewW450(x)));
			DivTargetDataCurrent.appendChild(makeNewDiv([], "clearfix", ""));
			DivDispTarget.appendChild(DivTargetDataCurrent);	// DivDispDataに付ける

			// 現行枠候補（画像版）
			const DivTargetPicCurrent = makeNewDiv(["id=best_waku", "style=margin:0 15px"], "hidden", "");
			DivDispTarget.appendChild(DivTargetPicCurrent);	// DivDispDataに付ける

			// 旧枠目標Result表示をDivDispDataに移動
			DivDispTarget.appendChild(document.querySelector('div.screw_block'));
			// 旧枠目標Result
			DivDispTarget.querySelectorAll('div.screw_block')[1].innerHTML +=
				'（目標:' + (PrevRatingButtom + 1) + '）<br>' + make_lvlist_str(get_reachable_level_achi_list(Math.max(PrevRatingButtom+1,17)));

			// 旧枠候補（データ版）
			const DivTargetDataPrev = makeNewDiv(["id=best_waku"], "", "");
			PrevList.slice(35).forEach((x)=>DivTargetDataPrev.appendChild(makeNewW450(x)));
			DivTargetDataPrev.appendChild(makeNewDiv([], "clearfix", ""));
			DivDispTarget.appendChild(DivTargetDataPrev);	// DivDispDataに付ける

			// 旧枠候補（画像版）
			const DivTargetPicPrev = makeNewDiv(["id=best_waku", "style=margin:0 15px"], "hidden", "");
			DivDispTarget.appendChild(DivTargetPicPrev);	// DivDispDataに付ける

			// 引継ぎの目標値を置くところ
			const DivTargetDataTransit = DivDispTarget.querySelector('div.screw_block').cloneNode(false);
			DivTargetDataTransit.innerHTML =
				'引継RATING上昇Result（目標:' + (future_bottom_rating + 1) + '）<br>' + make_lvlist_str(get_reachable_level_achi_list(Math.max(future_bottom_rating+1,17)));
			DivDispTarget.appendChild(DivTargetDataTransit);

			// target側のscrew_blockに target を付与
			DivDispTarget.querySelectorAll('div.screw_block').forEach((x)=>x.classList.add('target'));
			DivDispTarget.appendChild(makeNewDiv([], "cleafix m_t_5", ""));

			// 画像出力モード用に、表示文言を変更
			document.querySelector(`div.container.p_10.f_13`).innerHTML =
					`<b>あならいざもどき2 でらっくすRating解析モード</b><br>・フレーム/プレートをTAPすると、表示内容が切り替わります。`
 						
			CurrList.slice(0,15).forEach((x)=>DivBestPicCurrent.appendChild(makeBestWakuCard(x)));
			DivBestPicCurrent.appendChild(makeNewDiv([], "clearfix", ""));

			PrevList.slice(0,35).forEach((x)=>DivBestPicPrev.appendChild(makeBestWakuCard(x)));
			DivBestPicPrev.appendChild(makeNewDiv([], "clearfix", ""));

			CurrList.slice(15).forEach((x)=>DivTargetPicCurrent.appendChild(makeBestWakuCard(x)));
			DivTargetPicCurrent.appendChild(makeNewDiv([], "clearfix", ""));

			PrevList.slice(35).forEach((x)=>DivTargetPicPrev.appendChild(makeBestWakuCard(x)));
			DivTargetPicPrev.appendChild(makeNewDiv([], "clearfix", ""));

			// "プレイヤーデータ"の画像に、データ版と画像版の切り替え処理を含める
			document.querySelector(`img.title.m_10`)
				.setAttribute("onclick", "document.querySelectorAll(`#best_waku`).forEach((x)=>x.classList.toggle(`hidden`))");

			// 画像出力モード用に、表示文言を変更
			document.querySelector(`div.container.p_10.f_13`).appendChild(
				makeNewImg([`style=vertical-align:top; margin-top:-4px; width:50%;`],
					   "", `https://maimaidx.jp/maimai-mobile/img/title_playerdata.png`));

			document.querySelector(`div.container.p_10.f_13`).innerHTML +=
				`をTAPすると、表示内容が切り替わります。<br><br>下のボタンを押すと、Rating対象曲を画像で保存できます。<br>`;

			const CenterButtons = document.createElement(`center`);
			document.querySelector(`div.container.p_10.f_13`).appendChild(CenterButtons);

			// データ提供を依頼する条件
			const BooleanShareMessage = 
				(CurrRatingTotal < 0 || PrevRatingTotal < 0 || SortageExpectRate < 0 || document.querySelectorAll(`div.rate_box_new.red`).length > 0)


			const ButtonNormal480f_p = document.createElement(`button`);
			ButtonNormal480f_p.setAttribute(`onclick`, `captureBwaku('capture', 480, 'frame', 'png', ` +  ((BooleanShareMessage)?"true":"false") + `)`);
			ButtonNormal480f_p.setAttribute(`style`, `margin:4px; padding:2px; border:1px solid black;`);
			ButtonNormal480f_p.classList.add(`f_12`);
			ButtonNormal480f_p.innerText = `通常版(額)`;
			CenterButtons.appendChild(ButtonNormal480f_p);

			const ButtonNormal480p_p = document.createElement(`button`);
			ButtonNormal480p_p.setAttribute(`onclick`, `captureBwaku('capture', 480, 'plate', 'png', ` +  ((BooleanShareMessage)?"true":"false") + `)`);
			ButtonNormal480p_p.setAttribute(`style`, `margin:4px; padding:2px; border:1px solid black;`);
			ButtonNormal480p_p.classList.add(`f_12`);
			ButtonNormal480p_p.innerText = `通常版(銘)`;
			CenterButtons.appendChild(ButtonNormal480p_p);

			const ButtonSpecail840_p = document.createElement(`button`);
			ButtonSpecail840_p.setAttribute(`onclick`, `captureBwaku("capture_big", 840, "frame", 'png', ` +  ((BooleanShareMessage)?"true":"false") + `)`);
			ButtonSpecail840_p.setAttribute(`style`, `margin:4px; padding:2px; border:1px solid black; background-color:yellow`);
			ButtonSpecail840_p.classList.add(`f_12`);
			ButtonSpecail840_p.innerText = `豪華版`;
			CenterButtons.appendChild(ButtonSpecail840_p);

			const ButtonSpecail1040_p = document.createElement(`button`);
			ButtonSpecail1040_p.setAttribute(`onclick`, `captureBwaku("capture_big", 1040, "frame", 'png', ` +  ((BooleanShareMessage)?"true":"false") + `)`);
			ButtonSpecail1040_p.setAttribute(`style`, `margin:4px; padding:2px; border:1px solid black; background-color:gold`);
			ButtonSpecail1040_p.classList.add(`f_12`);
			ButtonSpecail1040_p.innerText = `豪華版SP`;
			CenterButtons.appendChild(ButtonSpecail1040_p);

			// 一番下に配置
			document.body.appendChild(makeNewDiv([`style=margin:5px auto; padding:10px 0 5px 0; background: #51bcf3;`, `id=capture_big`], "t_c middle hidden", ""));
			document.body.appendChild(makeNewDiv([`style=margin:5px auto; background: #51bcf3;`, `id=capture_big`], "t_c middle hidden", ""));

			// DivDispDataをfooterの前に置く
			document.querySelector(`div.main_wrapper`).insertBefore(DivDispData, document.querySelector('footer'));
			// DivDispDataをfooterの前に置く
			document.querySelector(`div.main_wrapper`).insertBefore(DivDispTarget, document.querySelector('footer'));

			// 確定譜面がある際のメッセージ出力
			if (CurrRatingTotal < 0 || PrevRatingTotal < 0 || SortageExpectRate < 0)
			{
				document.querySelector(`div.container.p_10.f_13`).innerHTML +=
					`<br><span class="red">\n内部Lv.設定が失敗している為、通常版(銘)の送付をお願いします。\n</span><br>`;
			}	
			else if(document.querySelectorAll(`div.rate_box_new.red`).length > 0)
			{
				document.querySelector(`div.container.p_10.f_13`).innerHTML +=
					`<br><span class="red">\n内部Lv.確定があるため、通常版(銘)の送付をお願いします。\n</span><br>`;
				// スクショのボタンの色も変更
				if(document.querySelectorAll(`div.container button`).length > 0)
					document.querySelectorAll(`div.container button`)[1].setAttribute("style", "margin:4px; padding:2px; background-color:orange; border:1px solid black");
			}

			return Promise.all([
				getPlayerData_solo(2),
				getPlayerData_solo(3),
				getPlayerData_solo(4),
				getCollectionURL(`https://maimaidx.jp/maimai-mobile/collection/`, `img.w_80.m_r_10`),
				getCollectionURL(`https://maimaidx.jp/maimai-mobile/collection/frame/`, `img.w_396.m_r_10`),
				getCollectionURL(`https://maimaidx.jp/maimai-mobile/collection/nameplate/`, `img.w_396.m_r_10`),
				getTrophyDOM(),
				DateTimeStr,
				StrSurmisedRating,
				UserRating,
				future_rating
			]);
		})
		.then((md)=> {
			const ex_data=md[0], ma_data=md[1], re_data=md[2];
			const FILTER_LV=13.0;
			const args=md.slice(3);

			let IdxCount = 0;
			while(ex_data[0] != undefined)	// データが残っている間
			{
				const TmpDataName = ex_data[0][0];	// 曲名
				const TmpDataKind = (ex_data[0][1] == "dx")?1:0;	// 譜面種別
				let TmpMusicData = in_lv[0];	// 保持データの先頭

				let version;
				let icon = "";

				if(TmpMusicData.n == TmpDataName && TmpMusicData.dx == TmpDataKind)	// 新収録でない
				{
					DispName = (TmpMusicData.nn!=undefined)?TmpMusicData.nn:TmpDataName;	// 略称あるなら変更
					icon = (TmpMusicData.ico != undefined)?TmpMusicData.ico:""; // いこん
					version = TmpMusicData.v;	// version
					in_lv.shift();	// 曲データの先頭をpop
				}
				else	// 新収録譜面
				{
					DispName = TmpDataName;
					icon = ""
					version = MAI_NEWEST_VER;
					TmpMusicData = null;	// 後の処理用に
				}

				let tmp_push_data = makeRecordData_new(ex_data.shift(), IdxCount, version, 2);
				tmp_push_data.lv=(TmpMusicData==null)?0:TmpMusicData.lv[2];
				if(tmp_push_data.lv >= FILTER_LV)
					playerdata_list.push(tmp_push_data);	// 赤譜面のデータを加工して追加
				tmp_push_data = makeRecordData_new(ma_data.shift(), IdxCount, version, 3);
				tmp_push_data.lv=(TmpMusicData==null)?0:TmpMusicData.lv[3];
				if(tmp_push_data.lv >= FILTER_LV)
					playerdata_list.push(tmp_push_data);	// 紫譜面のデータを加工して追加

				// Re:Mas関連
				if(re_data[0] != undefined)
				{
					if(re_data[0][0] == TmpDataName && ((re_data[0][1] == "dx")?1:0) == TmpDataKind)	// 同じ場合のみ処理
					{
						// 旧譜面曲追加Re:Masterは、versionをマイナスにする
						const TmpVer = ((TmpMusicData.lv[5] != undefined)?-1:1) * version;
						tmp_push_data = makeRecordData_new(re_data.shift(), IdxCount, TmpVer, 4);
						tmp_push_data.lv = (TmpMusicData==null)?0:(TmpMusicData.lv[5] == undefined)?TmpMusicData.lv[4]:TmpMusicData.lv[5];
						if(tmp_push_data.lv >= FILTER_LV)
							playerdata_list.push(tmp_push_data);	// 白譜面のデータを加工して追加
					}
				}

				m_titlelist.push("");	//曲リストに追加
				m_nicknamelist.push("");
				m_dxlist.push(TmpDataKind);		//dxリストに追加
				m_iconlist.push(icon);
				IdxCount++;

			}
			
			// 条件表示追加
			document.querySelector(`div.container.p_10.f_13 center`).innerHTML += "<details><summary>なぞなぞモード</summary></details>"
			document.querySelector(`div.container.p_10.f_13 center details`).appendChild(makeSelectMode(FILTER_LV*10));

			// 表示されているPlayerData の必要データを収集
			PlayerBaseData = collectPlayerBaseData(document.querySelector(`div.see_through_block`));
			// 元のプレイヤーデータの領域を削除
			document.querySelector(`div.see_through_block`).outerHTML="";

			// プレイヤーデータ表示領域を操作
			setPlayerDataOnFrame_withPlate(PlayerBaseData, args);

			// ネームプレート版プレイヤーデータ作成
			setPlayerDataWithPlate(PlayerBaseData, args);

			// 交互表示の為の仕組みを追加
			document.querySelectorAll(`div.playerdata`)
				.forEach((x)=>x.setAttribute(`onclick`, "document.querySelectorAll(`div.playerdata`).forEach((x)=>x.classList.toggle(`hidden`))"));

			// 合体版用プレイヤーデータ作成
			if(document.querySelectorAll(`div#capture_big`).length > 0)
				makeCaptureBig(PlayerBaseData, args);

			// なぞなぞモード表示領域
			const DivNazonazo = makeNewDiv([`style=margin:5px auto; padding:5px 0; background: #51bcf3;`, `id=nazonazo`], "t_c hidden", "");
			DivNazonazo.appendChild(setPlayerDataOnNameplate4Nazonazo(PlayerBaseData, args));
			DivNazonazo.appendChild(makeNewDiv([], "nazonazoe", ""))
			document.body.appendChild(DivNazonazo);
			
			return;
		});
	}
	else
		alert('実行済み');

})(); 

const captureNazoNazoData = (LvNum1, LvNum2, CondStr, forceMini, columns) =>
{
	// 条件を満たす、なぞなぞモードの作成
	const makeNazoNazoData = (pdlist, forceMini, mini_max_count) =>
	{
		let retstr = "";
		const mini = window.innerWidth < 1200 || forceMini;
		const BORDER = (mini)?mini_max_count:Math.min((Math.floor((window.innerWidth-20) / 91)), 20);	// 1行当たりの最大個数

		if(pdlist.length <= 0){	return retstr;	}	// 何もなければ空文字で終了

		const titletxt = "なぞなぞモード"

		retstr += make_html("tr", "", "", make_html("td", "colspan=" + (BORDER+1), "", titletxt));

		for(let n=159; n>=10; n--)
		{
			let tmp_pdlist = pdlist.filter((x)=>x.lv == (n/10));
			if(tmp_pdlist.length <= 0)
				continue;	// 何もないので次に行く

			const tmp_length = tmp_pdlist.length;

			retstr += make_html("tr", "", "", 
				make_html("td", "align=center rowspan="+ (Math.ceil(tmp_length/BORDER)),
				 "", make_html("div", "", ["music_level", mini?("mini"):""].join(" ").trim(), ((n/10).toFixed(1))+"("+tmp_length+")" )) + 
				tmp_pdlist.slice(0,BORDER)
					    .map((x)=>make_html("td", "", "", nazoModeHtmlStr(x, mini, m_nicknamelist, m_dxlist, m_iconlist, 999))).join("\n"));
			for(let m=1; tmp_pdlist.slice(BORDER*m, BORDER*(m+1)).length > 0; m++)
			{
				retstr += make_html("tr", "", "", 
					tmp_pdlist.slice(BORDER*m, BORDER*(m+1))
						    .map((x)=>make_html("td", "", "", nazoModeHtmlStr(x, mini, m_nicknamelist, m_dxlist, m_iconlist, 999))).join("\n"));
			}
			retstr += make_html("tr", "", "", make_html("td", "colspan=" + (BORDER+1), "", ""));
		}
		return make_html("table", `border=1`, ["nazonazo", (mini)?"mini":""].join(' '), retstr);;
	}

	// なぞなぞモードの表出力の為の条件設定と生成処理後の表示処理
	const printNazoNazoData = (LvNum1, LvNum2, CondStr, forceMini, columns) =>
	{
		const getValue = (pd, cond) =>
		{
			const achiStr = ("0000" + pd.achi.toString(16)).slice(-5);
			const dxscStr = ("00000" + pd.dxscRatio.toString(16)).slice(-6);	// dxscratio
			const fcapStr = pd.fcapLamp	// fc/ap lamp
			const idxStr = ("00"+ pd.idx.toString(16)).slice(-3)	// index

			if(cond == "achi")	return [achiStr, dxscStr, fcapStr, idxStr].join('');
			else if(cond == "dxsc")	return [dxscStr, achiStr, fcapStr, idxStr].join('');
			else if(cond == "fcap")	return [fcapStr, achiStr, dxscStr, idxStr].join('');
			else	return idxStr;
		}

		const LvMin=Math.min(Number(LvNum1), Number(LvNum2))/10;
		const LvMax=Math.max(Number(LvNum1), Number(LvNum2))/10;
		const CondArr = CondStr.split("_");
		const SortCond = (CondArr[1]=="high")?((a,b)=>(a.value>b.value)?-1:1):((a,b)=>(a.value<b.value)?-1:1);

		const basedata = playerdata_list.filter((x)=>LvMin<=x.lv && x.lv<=LvMax);
		basedata.forEach((y)=>y.value=getValue(y, CondArr[0]));

		// データ表示場所になぞなぞモードのデータを出力する。
		document.querySelector(`#nazonazo .nazonazoe`).innerHTML = makeNazoNazoData(basedata.sort(SortCond), forceMini, Number(columns));
		// なぞなぞ内のRank画像を削除
		document.querySelectorAll(`#nazonazo .music_ranklamp`).forEach((x)=>x.removeAttribute(`style`));
		// 達成率の小数第2位以下を捨てる
		document.querySelectorAll(`span.music_achi_tail`).forEach((x)=>x.outerHTML="");
	}

	const today = new Date(new Date - 18000000);	// 5時間マイナス
	const FileName = [document.querySelector(`div.playername`).innerText, "_", today.getFullYear(),
		('0'+(today.getMonth()+1)).slice(-2), ('0'+today.getDate()).slice(-2),
		("0"+(today.getHours()+5)).slice(-2), ("0"+today.getMinutes()).slice(-2)].join("")
		+ "_NazoNazo_" + [LvNum1, LvNum2, CondStr].join("_");

	async function outputData (id)
	{
		return new Promise((resolved, reject)=>{
			let ClientWidth = Math.max(document.querySelector(`#nazonazo .nazonazo_nameplate`).clientWidth, document.querySelector(`#nazonazo table`).clientWidth ) + 32;
			ClientWidth = (((ClientWidth >> 4) + ((ClientWidth%16 != 0)?1:0)))<< 4;
			let ClientHeight = id.clientHeight;
			ClientHeight = (((ClientHeight >> 4) + ((ClientHeight%16 != 0)?1:0)))<< 4;

			html2canvas(id, {width:ClientWidth, height:ClientHeight, windowWidth:ClientWidth, windowHeight:ClientHeight, scale:1, backgroundColor:`#51bcf3` ,imageTimeout:10000})
			.then((canvas)=>{

				// 生成画像
				const PicData = canvas.toDataURL("image/png", 0.8);
				const Img = document.createElement('img');
				Img.setAttribute(`id`, `data_pic`);
				Img.setAttribute(`src`, PicData);
				Img.setAttribute(`style`, 'max-width:100%;');

				const ButtonImage = document.createElement(`button`)
				ButtonImage.setAttribute("onClick",
					"downloadPic(data_pic.getAttribute(`src`), `" + FileName + ".png`)");
				ButtonImage.setAttribute("style", `color:transparent; background: transparent; border:unset; padding:unset;`);
				ButtonImage.appendChild(Img);		

				resolved(ButtonImage);
			});
		});
	}

	if(confirm(`設定した条件でなぞなぞモードの結果を\n別タブに表示しますか？\n続ける → OK\nやめる → キャンセル`))
	{
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

			// 出力画像作成
			printNazoNazoData(LvNum1, LvNum2, CondStr, forceMini, columns);
			document.querySelector('div#nazonazo').classList.remove(`hidden`);

			// 背景色
			OutputWindow.document.body.setAttribute(`style`, `background: #51bcf3; margin:0 auto; font-family:sans-serif;`);

			const HeadMeta = document.createElement(`meta`);
			HeadMeta.setAttribute(`name`, `viewport`);
			HeadMeta.setAttribute(`content`, `user-scalable=no, width=640`);
			OutputWindow.document.head.appendChild(HeadMeta);

			// 最初のタイトルだけ表示
			const H3NazonazoTitle = document.createElement(`h3`);
			H3NazonazoTitle.setAttribute('align', 'center');
			H3NazonazoTitle.innerText = FileName + `\n生成中`;
			OutputWindow.document.body.appendChild(H3NazonazoTitle);

			// loading="lazy"を削除する
			document.querySelectorAll('div#screenshot div').forEach((y)=>y.removeAttribute(`loading`));

			// html2canvas使って画像を生成
			outputData(document.querySelector('div#nazonazo'))
			.then((nodes)=>{
				document.querySelector('div#nazonazo').classList.add(`hidden`);
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
					OutputWindow.document.querySelector(`h3`).innerText.replace(/生成中/, `画像をTAPすると保存できます。(縮小表示中)`);
				const OutputCenter = document.createElement(`center`);
				OutputCenter.appendChild(nodes);
				OutputWindow.document.body.appendChild(OutputCenter);
			});
		}
	}
}


const captureBwaku = (nazoe_id, width, mode, type, boolShareMessage) =>
{
	const today = new Date(new Date - 18000000);	// 5時間マイナス
	const FileName = [document.querySelector(`div.playername`).innerText, "_", today.getFullYear(),
		('0'+(today.getMonth()+1)).slice(-2), ('0'+today.getDate()).slice(-2),
		("0"+(today.getHours()+5)).slice(-2), ("0"+today.getMinutes()).slice(-2)].join("");
	const widthnum=Number(width);

	async function outputNazoe (id, suffix)
	{
		return new Promise((resolved, reject)=>{
			let ClientHeight = id.clientHeight;
			ClientHeight = (((ClientHeight >> 4) + ((ClientHeight%16 != 0)?1:0)))<< 4;
			html2canvas(id, {width:widthnum, height:ClientHeight, windowWidth:id.clientWidth, windowHeight:ClientHeight, scale:widthnum/id.clientWidth, backgroundColor:`#51bcf3` ,imageTimeout:10000})
			.then((canvas)=>{

				// 生成画像
				const PicData = canvas.toDataURL("image/" + type, 0.8)
				const Img = document.createElement('img');
				Img.setAttribute(`id`, `best_pic_`+suffix);
				Img.setAttribute(`src`, PicData);
				Img.setAttribute(`style`, 'max-width:100%;');

				const ButtonImage = document.createElement(`button`)
				ButtonImage.setAttribute("onClick",
					"downloadPic(best_pic_" + suffix +".getAttribute(`src`),`" + FileName + `_` + suffix + "." + type + "`)");
				ButtonImage.setAttribute("style", `color:transparent; background: transparent; border:unset; padding:unset;`);
				ButtonImage.appendChild(Img);		

				resolved(ButtonImage);
			});
		});
	}

	if(confirm(`Rating対象楽曲のデータを画像化して\n別タブに出力します。\n続ける → OK\nやめる → キャンセル`))
	{
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
			OutputWindow.document.body.setAttribute(`style`, `background: #51bcf3; margin:0 auto; font-family:sans-serif;`);
			// お試し
			const HeadMeta = document.createElement(`meta`);
			HeadMeta.setAttribute(`name`, `viewport`);
			HeadMeta.setAttribute(`content`, `width=` + widthnum +`, user-scalable=no`);
			OutputWindow.document.head.appendChild(HeadMeta);

			// 共有用ボタンを配置
			const CenterButtonShare = document.createElement(`center`);
			const ButtonShare = document.createElement(`button`);
			ButtonShare.innerHTML = "ベスト枠&候補枠<br>" + ((boolShareMessage)?"作者にXで連絡":"共有");
			ButtonShare.setAttribute(`onclick`, `shareBestTarget("` + FileName + `_Best.png", "` + FileName + `_Target.png")`);
			ButtonShare.setAttribute(`style`, `display:none`);	// 最初は消した状態で配置
			CenterButtonShare.appendChild(ButtonShare);
			OutputWindow.document.body.appendChild(CenterButtonShare);

			// 最初のタイトルだけ表示
			const H3BestWakuTitle = document.createElement(`h3`);
			H3BestWakuTitle.setAttribute(`align`, 'center');
			H3BestWakuTitle.innerText = FileName + `_Best\n生成中`;
			OutputWindow.document.body.appendChild(H3BestWakuTitle);

			// 謎絵モードになっていない場合、謎絵モードに変更
			if(document.querySelectorAll(`div#best_waku:not(.hidden) div.w_450`).length > 0)
				document.querySelectorAll(`#best_waku`).forEach((x)=>x.classList.toggle(`hidden`));

			// 通常版でモードがあってない場合はtoggleする
			if( nazoe_id == "capture" && document.querySelector(`div.`+ mode +`.hidden`) != null)
				document.querySelectorAll(`div.playerdata`).forEach((x)=>x.classList.toggle(`hidden`));

			// 表示対象が隠れている場合は表示する
			if(document.querySelector('div#'+nazoe_id).classList.contains(`hidden`))
				document.querySelectorAll(`div#`+nazoe_id).forEach((x)=>x.classList.remove(`hidden`));

			if(nazoe_id == "capture_big" && widthnum==1040)
			{
				document.querySelectorAll(`.middle`).forEach((x)=>x.classList.replace(`middle`, `big`))
			}
			// html2canvas使って画像を生成
			Promise.all([
				outputNazoe(document.querySelectorAll('div#'+nazoe_id)[0], "Best"),
				outputNazoe(document.querySelectorAll('div#'+nazoe_id)[1], "Target"),
			])
			.then((nodes)=>{
				const ScriptCodeSrc = document.createElement(`script`);
				ScriptCodeSrc.innerText = `const downloadPic = (pic, FileName) =>{` 
					+ `const ImgA=document.createElement("a");`
					+ `ImgA.setAttribute("href", pic);`
					+ `ImgA.setAttribute("download", FileName);`
					+ `ImgA.click();`
					+ `};\n`
					+ `async function shareBestTarget(name_best, name_target)`
					+ `{`
					+ `const blob_best = await (await fetch(best_pic_Best.src)).blob();`
					+ `const image_best = new File([blob_best], name_best, { type: blob_best.type });`
					+ `const blob_target = (best_pic_Target!=undefined)?(await (await fetch(best_pic_Target.src)).blob()):undefined;`
					+ `const image_target = (blob_target!=undefined)?(new File([blob_target], name_target, { type: blob_target.type })):undefined;`
					+ `navigator.share({text: `
					+ ((boolShareMessage)?`"@sgimera\\n確認して。"`:`""`)
					+ `, url: 'https://maimaidx.jp/maimai-mobile/', files: [image_best, image_target] })`
					+ `.then(()=>{console.log("");});`
					+ `};\n`

				if(nazoe_id == "capture_big" && widthnum==1040)
				{
					document.querySelectorAll(`.big`).forEach((x)=>x.classList.replace(`big`, `middle`))
				}
				document.querySelectorAll(`div#capture_big`).forEach((x)=>x.classList.add(`hidden`));

				document.body.appendChild(nodes[0]);
				// 必要要素をappendしていく
				// button化した画像をTAPしたら保存するスクリプト
				OutputWindow.document.head.appendChild(ScriptCodeSrc);
				// Best枠の画像
				OutputWindow.document.querySelector(`h3`).innerText =
					OutputWindow.document.querySelector(`h3`).innerText.replace(/生成中/, `TAPすると保存できます。`+((widthnum>640)?"(縮小表示中)":""));
				const OutputCenterBest = document.createElement(`center`);
				OutputCenterBest.appendChild(nodes[0]);
				OutputWindow.document.body.appendChild(OutputCenterBest);

				// 改行
				OutputWindow.document.body.appendChild(document.createElement(`br`));

				// Target枠の画像
				const H3TargetWakuTitle = document.createElement(`h3`);
				H3TargetWakuTitle.setAttribute(`align`, 'center');
				H3TargetWakuTitle.innerText = FileName + `_Target\nTAPすると保存できます。`+((widthnum>640)?"(縮小表示中)":"");
				OutputWindow.document.body.appendChild(H3TargetWakuTitle);
				const OutputCenterTarget = document.createElement(`center`);
				OutputCenterTarget.appendChild(nodes[1]);
				OutputWindow.document.body.appendChild(OutputCenterTarget);

				// 共有ボタンを表示状態に変更
				ButtonShare.removeAttribute(`style`);
			});
		}
	}
}
void(0);