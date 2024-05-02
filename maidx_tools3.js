javascript:
(
	function(f)
	{
		let j =[];
		let comment = "";
		const dom='https://smail88-vrc.github.io/maimai_analys/';

		if(location.hostname == 'maimaidx.jp')
		{
			switch(location.pathname)
			{
				alert(location.pathname);
				case "/maimai-mobile/record/playlogDetail/" :	// 内訳詳細＆旧筐体換算
					j = [
						"scripts_maimai/maidx_calc_rating.js",
						"scripts_maimai/maidx_result2oldscore.js"
					];
					break;
				
				case "/maimai-mobile/record/" : 	// 履歴ページ短縮化
					j = [	"scripts_maimai/maidx_shorten_playlog.js"	];
					break;

				case "/maimai-mobile/record/musicGenre/search/" :	// レコード（ジャンル）
				case "/maimai-mobile/record/musicWord/search/" :	// レコード（あかさたな）
				case "/maimai-mobile/record/musicLevel/" :		// レコード（Level）
				case "/maimai-mobile/record/musicLevel/search/" :	// レコード（Level 1以外）
				case "/maimai-mobile/record/musicVersion/search/" :	// レコード（version）
				case "/maimai-mobile/record/musicSort/search/" :	// 並び替え
					j = [	'scripts_maimai/maidx_dxscore_body.js'	];
					break;

				case "/maimai-mobile/record/musicDetail/" :	// 楽曲スコアページにでらスコ割合付与
					j = [	'scripts_maimai/maidx_addDxscRatio_MusicDetail.js'	];
					break;
					
				case "/maimai-mobile/home/ratingTargetMusic/" :	// でらっくすRating
					j=[
						'scripts_maimai/maidx_in_lv_buddiesplus.js',
						'scripts_maimai/maidx_get_data.js',
						'scripts_maimai/maidx_calc_rating.js',
						'scripts_maimai/html2canvas.js',
						'scripts_maimai/maidx_disp_rating.js'
					];
					break;

				case "/maimai-mobile/collection/" :	// アイコン
					j = [	'scripts_maimai/maidx_shorten_iconpage.js'	];	
					break;

				case "/maimai-mobile/collection/nameplate/" :	// ネームプレート
				case "/maimai-mobile/collection/frame/" : // フレーム
					j = [	'scripts_maimai/maidx_shorten_plate_frame_page.js'	];
					break;

				case "/maimai-mobile/collection/trophy/" :	// 称号
					j = [	'scripts_maimai/maidx_shorten_trophy_page.js'	];
					break;

				case "/maimai-mobile/collection/partner/" :	// パートナー
					j = [	'scripts_maimai/maidx_shorten_partner.js'	];	
					break;
				
				case "/maimai-mobile/collection/character/" :	// つあメン（オリジナル系ちほー）
				case "/maimai-mobile/collection/eventCharacter/" : // つあメン（イベント系ちほー）
					j = [	'scripts_maimai/maidx_shorten_chara_page.js'	];
					break;

				case "/maimai-mobile/friend/friendDetail/?idx=9085133033207" : // 薄色用
					j=[
						'scripts_maimai/maidx_in_lv_buddiesplus.js',
						'scripts_maimai/maidx_get_data.js',
						'scripts_maimai/maidx_calc_rating.js',
						'scripts_maimai/html2canvas.js',
						'scripts_maimai/maidx_disp_rating.js'
					];
					break;

				default:	
				//　制覇状況解析
					j=[
						'scripts_maimai/maidx_in_lv_buddiesplus.js',
						'scripts_maimai/maidx_get_data.js',
						'scripts_maimai/html2canvas.js',
						'scripts_maimai/maidx_comp_analyzer.js'
					];
					comment = "==あならいざもどき2==\n"
						+ "下記のページで動作させると\n"
						+ "制覇状況解析とは違う機能で動作します。\n"
						+ "　・プレイ履歴（全体、詳細）\n"
						+ "　・楽曲スコア\n"
						+ "　・でらっくすRating\n"
						+ "　・コレクション（つあメン編集以外）\n"
						+ "\n"
						+ "OKを押すと、制覇状況解析が動作します。"
			}
		}
		else if(location.hostname == 'ongeki-net.com')
		{
			switch(location.pathname)
			{
				case "/ongeki-mobile/card/" :
				case "/ongeki-mobile/card/pages/" :
				case "/ongeki-mobile/card/cardList/search/" :				
					j=[	'scripts_ongeki/ongeki_shorten_cards_page.js'	];
					break;
				case "/ongeki-mobile/record/playlogDetail/" :
					j=[	`scripts_ongeki/ongeki_score_detail.js`	];
					break;
				case "/ongeki-mobile/record/musicGenre/search/" :
				case "/ongeki-mobile/record/musicWord/search/" :
				case "/ongeki-mobile/record/musicCharacter/search/" :
				case "/ongeki-mobile/record/musicLevel/" :
				case "/ongeki-mobile/record/musicLevel/search/" :
				case "/ongeki-mobile/record/musicScoreGenre/search/" :
				case "/ongeki-mobile/record/musicScoreWord/search/" :
				case "/ongeki-mobile/record/musicScoreCharacter/search/" :
				case "/ongeki-mobile/record/musicScoreLevel/search/" :
					j=[	`scripts_ongeki/ongeki_shorten_recordpage.js`	];
					break;
				default:
					break;

			}
		}
		else if(location.hostname == 'new.chunithm-net.com')
		{
			switch(location.pathname.slice(0,38))
			{
				case "/chuni-mobile/html/mobile/record/music" :	// レコード一般
				case "/chuni-mobile/html/mobile/record/world" : // world's end
				case "/chuni-mobile/html/mobile/record/cours" : // course認定
					j=[	'scripts_chunithm/chuni_shorten_recordpage.js'	];
					break;
				default:
					break;
			}
			switch(location.pathname)
			{
				case "/chuni-mobile/html/mobile/collection/nameplate/" :	// ネームプレート
				case "/chuni-mobile/html/mobile/collection/mapIcon/" :	// マップアイコン
				case "/chuni-mobile/html/mobile/collection/systemVoice/" :	// システムボイス
					j=[	'scripts_chunithm/chuni_shorten_customizepage.js'	];
					break;
				case "/chuni-mobile/html/mobile/record/playlogDetail/" :	// 履歴詳細
					j=[	'scripts_chunithm/chuni_score_detail.js'	];
				default:
					break;
			}
		}
		
		if(j.length==0)	// 何もなければここで終了
			return;
		
		if(comment != "")
			alert(comment);
		
		f = function(s)
		{
			if(j.length==0)	{ return; }
			s=document.createElement('script');
			s.charset = 'UTF-8';
			s.src = dom + j.shift() + '?' + Date.now();
			s.addEventListener('load',f);
			document.body.appendChild(s);
		};
		(document.readyState=='loading')?document.addEventListener('DOMContentLoaded',f):f();
	}
)();