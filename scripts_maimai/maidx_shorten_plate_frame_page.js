javascript:

// 多重実行回避
if(document.querySelectorAll('div.m_t_0 img:not(.w_396):not(.collection_setting_img)').length < 1)
{	alert('実行済みです');	}

(function ()
{
	// 多重実行回避
	if(document.querySelectorAll('div.m_t_0 img:not(.w_396):not(.collection_setting_img)').length < 1)
		return;

	// 制覇系と判断する物の条件 return は true/false
	const checkPlateName = (NameStr) =>
	{
		if(NameStr.match(/Thank you for playing/)) return true;
		if(NameStr.match(/Jewel/)) return true;
		if(NameStr.toLowerCase().match(/king of performai/)) return true;
		if(NameStr.toLowerCase().match(/kop/)) return true;
		
		switch(NameStr.slice(-2))
		{
			case "舞舞":
			case "覇者":
			case "皆伝":
				return true;
			default:
				break;
		}
		switch(NameStr.slice(-1))
		{
			case "極":
			case "将":
			case "神":
			case "段":
				return true;
			default:
				break;
		}

		return false;
	}

	// 表示数変更RadioButton生成用
	const makeDivRadioButtons = () =>
	{
		const DivElm = document.createElement(`div`);
		DivElm.classList.add(`p_b_5`);
		DivElm.innerText = "1行当たりの表示数";
		for(let n=1; n<=5; n++)
		{
			const InputElm = document.createElement(`input`);
			InputElm.setAttribute(`name`, `LineCount`);
			InputElm.setAttribute(`type`, `radio`);
			InputElm.setAttribute(`value`, n);
			InputElm.setAttribute(`onchange`, `changeSize(this.value)`);
			if(n==3)
				InputElm.setAttribute(`checked`, ``);
			DivElm.appendChild(InputElm);
			DivElm.innerHTML += n + '\n';
		}
		return DivElm;
	}

	//// 実績の内、制覇ジャンル系の物を分離する

	// "実績"の存在確認
	const genre3 = Array.from(document.querySelectorAll(`div.see_through_area select option`))
		.filter((x)=>x.getAttribute(`value`)=="3")[0];

	if (genre3 != undefined)
	{
		// 実績ジャンルの部分
		achivement = Array.from(document.querySelectorAll(`div.town_block`))
				.filter((x)=>x.getAttribute(`name`)=="genre_3")[0];

		// 制覇ジャンル用にcopyる
		complete = achivement.cloneNode(true);

		// 制覇ジャンルcompleteから、名前の条件を満たさない物を消す
		Array.from(complete.querySelectorAll(`div.see_through_block`))
			.filter((x)=>!checkPlateName(x.querySelector(`div.p_5.f_14.break`).innerText))
				.forEach((x)=>x.outerHTML="");

		// 制覇ジャンルの数が1つ以上の場合のみ、続きの処理を進める
		if(complete.querySelectorAll(`div.see_through_block`).length > 0)
		{
			// 制覇ジャンルのgenre numberを2に変更
			complete.setAttribute(`name`, `genre_2`);

			// 実績ジャンルから制覇ジャンルに移動する物を削除
			Array.from(achivement.querySelectorAll(`div.see_through_block`))
				.filter((x)=>checkPlateName(x.querySelector(`div.p_5.f_14.break`).innerText))
					.forEach((x)=>x.outerHTML="");

			// 制覇ジャンルの名前を"制覇"に変更
			complete.querySelector(`div.t_c.f_15.f_b`).innerText = "制覇";

			// 制覇ジャンルを実績ジャンルの前に置く
			document.querySelector(`div.see_through_area`).insertBefore(complete, achivement);

			// select上に"制覇"を作るため、"実績"をcopyる
			const genre2 = genre3.cloneNode(true);

			// 以下略の処理
			genre2.innerText = "制覇";
			genre2.value = "2";

			// "実績"の前に"制覇"を配置
			document.querySelector(`div.see_through_area select`).insertBefore(genre2, genre3);
		}
	}

	// 称号の種類の文字列を消す
	document.querySelectorAll(`div.see_through_area div.block_info`).forEach((x)=>x.outerHTML="");

	// 称号と説明の間にある画像を消す
	document.querySelectorAll(`div.see_through_area img.w_396:not(.m_r_10)`).forEach((x)=>x.outerHTML="");

	// SETの画像を消す
	document.querySelectorAll(`div.see_through_area img.w_84.m_t_5`).forEach((x)=>x.outerHTML="");

	// plate/frameに名前と条件をtitleとして付与, サイズも変更(行あたり3個)
	document.querySelectorAll(`div.see_through_area img.w_396`)
		.forEach((x)=>{
			x.classList.remove(`m_r_10`);
			const tmpParent = x.parentElement.parentElement;
			x.setAttribute(`title`, tmpParent.querySelector(`div.p_5.f_14.break`).innerText.trim() + `\n`
						+ tmpParent.querySelector(`div.p_l_5.f_12.gray.break`).innerText.trim())
			x.setAttribute("style", "width:132px; margin:4px 2px 0px");
		});

	// buttonの中にnameplate/frameを移動
	document.querySelectorAll('div.see_through_area div.see_through_block form.f_r button')
		.forEach((x)=>x.appendChild(x.parentElement.parentElement.parentElement.querySelector(`img.w_396`)));

	// SET中のsee_through_blockのnameplate/frameを単独でappendして、枠線ルールを付与して一部class削除
	document.querySelectorAll('div.see_through_area div.see_through_block.collection_setting_block')
		.forEach((x)=>{
			x.appendChild(x.querySelector(`img.w_396`));
			x.setAttribute("style", "outline:orange solid 2px; border-radius:5px");
			x.classList.remove(`collection_setting_block`);
		});


	// お気に入りのボタンのサイズを小さくする。
	document.querySelectorAll('div.see_through_area div.see_through_block form.f_l button img')
	        .forEach((x)=>{
			x.setAttribute(`style`, `width:80px; height:22px; margin:0px auto 4px;`);
			x.classList.remove(`m_t_5`, `m_r_5`);
		});

	// nameplate/frameが入ったフォームをrootにappend
	document.querySelectorAll('div.see_through_area div.see_through_block form.f_r')
		.forEach((x)=>{
			x.parentElement.parentElement.appendChild(x);
			x.classList.remove(`f_r`);
		});

	// clearfixをrootに移動
	document.querySelectorAll('div.see_through_area div.see_through_block')
		.forEach((x)=>x.appendChild(x.querySelector(`div.clearfix`)));

	// お気に入り登録／解除が入ったフォームをrootにappend
	document.querySelectorAll('div.see_through_area div.see_through_block form.f_l')
		.forEach((x)=>{
			x.parentElement.parentElement.appendChild(x);
			x.classList.remove(`f_l`, `t_r`);
		});

	// nameplate/frameの名称と取得条件、元々nameplate/frameが入ってたdivを消す
	document.querySelectorAll(`div.see_through_area div.see_through_block div.p_5.f_14`).forEach((x)=>x.outerHTML="");
	document.querySelectorAll(`div.see_through_area div.see_through_block div.p_l_5.f_12`).forEach((x)=>x.outerHTML="");
	document.querySelectorAll(`div.see_through_area div.see_through_block div.p_r`).forEach((x)=>x.outerHTML="");
	document.querySelectorAll(`div.see_through_area div.see_through_block div.f_r`).forEach((x)=>x.outerHTML="");

	// 要素数が0になるtown_blockを削除　残ったtown_blockにclearfixつけてブロックの高さを拡張
	document.querySelectorAll('div.see_through_area div.town_block')
		.forEach((x)=>{
			if (x.childElementCount < 2) x.outerHTML="";
			x.appendChild(document.querySelector(`div.clearfix`).cloneNode(false));
		});

	// 不要な要素を削除する。
	document.querySelectorAll('div.see_through_area div.see_through_block')
		.forEach((x)=>{
			x.classList.add(`f_l`);
			x.classList.remove(`m_t_10`, `p_10`, `p_r`, `see_through_block`);
		});

	// 個数選択用のradio buttonを追加
	document.querySelector(`div.see_through_area`)
		.insertBefore(makeDivRadioButtons(), document.querySelector(`div.see_through_area div.town_block`));

	// 何かを消す
	document.querySelector('div.spmenu_toggle').outerHTML="";
	document.querySelector('nav.spmenu_navigation').outerHTML=""
	document.querySelectorAll(`img[id^='page']`).forEach((x)=>x.outerHTML="");

	alert("画像をタップ／クリックするとセットします。\n1行当たりの表示個数も変更可能です。");
}
)(); void(0);

// サイズ切り替え用
const changeSize = (num) =>
{
	const addStyle = (num==2)?("width:198px; margin:4px 3px 0px")
			:(num==3)?("width:132px; margin:4px 2px 0px")
			:(num==4)?("width:99px; margin:4px 2px 0px 1px")
			:(num==5)?("width:80px; margin:4px 2px 0px")
			:"width:396px; margin:4px 6px 0px";

	document.querySelectorAll('div.see_through_area img.w_396')
		.forEach((x)=>x.setAttribute("style", addStyle));
	return;
}