javascript:
(function ()
{
	if(document.querySelectorAll('div.m_t_0 img:not(.w_80):not(.collection_setting_img)').length < 1)
		{	alert('実行済みです'); return;	}
	
	// 称号の種類の文字列を消す
	document.querySelectorAll(`div.block_info`).forEach((x)=>x.outerHTML="");
	
	// 称号と説明の間にある画像を消す
	document.querySelectorAll(`img.w_396`).forEach((x)=>x.outerHTML="");

	// SETの画像を消す
	document.querySelectorAll(`img.w_84.m_t_5`).forEach((x)=>x.outerHTML="");

	// formを右寄せをセンタリングにして、see_through_blockの最後に持ってくる
	document.querySelectorAll(`div.see_through_block form`)
		.forEach((x)=>{
			x.classList.replace(`f_r`, `t_c`);
			x.parentElement.parentElement.appendChild(x);
		});

	// 称号のblockをform buttonに入れる
	document.querySelectorAll(`div.see_through_block form button`)
		.forEach((x)=>
			x.appendChild(x.parentElement.parentElement.querySelector(`div.collection_trophy_block`))
		);

	// 称号のblockの隙間を調整する
	document.querySelectorAll(`div.collection_trophy_block`)
		.forEach((x)=>{x.setAttribute('style', "margin:0 auto");});

	// 称号/form の下にclearfix
	document.querySelectorAll(`div.see_through_block div.clearfix`)
		.forEach((x)=>x.parentElement.appendChild(x));
	
	// see_through_blockの隙間を減らして、黒枠を消す。
	document.querySelectorAll(`div.see_through_area div.see_through_block`)
		.forEach((x)=>{
			x.classList.replace(`m_t_10`, `m_t_5`);
			x.classList.remove(`p_10`, 'see_through_block');
		});

	// SET中の称号のところの橙枠に丸みをつける
	document.querySelector(`div.see_through_area div.collection_setting_block`).setAttribute(`style`, `border-radius:5px`)

	// 称号取得条件をclearfixの下に移動、説明文の一部変更
	document.querySelectorAll(`div.gray`)
		.forEach((x)=>{
			x.classList.replace(`p_l_5`, `t_c`);
			x.classList.replace(`f_12`, `f_10`);
			x.innerText=x.innerText.replace(/\[でらっくす\]/g, `[dx]`)
				.replace(/\[スタンダード\]/g, `[std]`)
				.replace(/一回のクレジットでプレイ/, `1クレプレイ`)
				.replace(/\/FULL COMBO/, ` FC`)
				.replace(/\/ALL PERFECT/, ` AP`)
				.replace(/\/FULL SYNC DX/, ` FDX`)
				.replace(/\/FULL SYNC/, ` FS`)
				.replace(/([`BASIC`|`ADVANCED`|`EXPERT`|`MASTER`|`Re:MASTER`|`全難易度`])\/RANK /, "$1 ")
				.replace(/一回のクレジットで3回プレイ/, `1クレで3回プレイ`)
				.replace(/4人でプレイ/, `4人`)
				.replace(/2人以上でプレイ/, `2人以上`)
//				.replace(/マッチングプレイ/, `2人以上`)
				.trim()
			x.parentElement.appendChild(x);
		});

	
	// 何かを消す
	document.querySelector('div.spmenu_toggle').outerHTML="";
	document.querySelector('nav.spmenu_navigation').outerHTML=""
	document.querySelectorAll(`[id^='page']`).forEach((x)=>x.outerHTML="");
		
	alert("称号をタップ／クリックするとセットします。");
}
)(); void(0);