javascript:
(function ()
{
	if(document.querySelectorAll('div.w_300').length < 2)
		{	alert('実行済みです'); return;	}

	const moveIcon = (stb) =>
	{
		const ImgIcon = stb.querySelector(`img.w_80`);
		ImgIcon.classList.remove('m_r_10');
		const ImgInSet = stb.querySelector(`img.collection_setting_img`);
	
		const FormFavo = stb.querySelector(`form#form`);
		const FormSet = stb.querySelector(`form:not(#form)`);
	
		const expression = stb.querySelector(`div.p_t_10.p_b_5.f_14`).innerText.trim() + `\n`
			+ stb.querySelector(`div.f_12.gray.break`).innerText.trim();
	
		// 名前と取得条件をIcon画像のtitleに設定
		ImgIcon.setAttribute(`title`, expression);
	
		if(FormSet != null) // set中以外
		{
			// setするの代わりにIconを入れて、rootにappend
			FormSet.querySelector(`img`).outerHTML=""
			FormSet.querySelector(`button`).appendChild(ImgIcon);
			stb.appendChild(FormSet);
		}
		else	// set中
		{
			// Iconとset中の画像をrootにappend
			stb.appendChild(ImgIcon);
			if (ImgInSet != null)	// お気に入り設定なしのランダムを回避
			{
				ImgInSet.setAttribute(`style`, `top:0px; left:0px;`);
				stb.appendChild(ImgInSet);
			}
		}
	
		// clearfixをrootにappend
		stb.appendChild(stb.querySelector(`div.clearfix`));
		// Favoのformをrootにappend
		if(FormFavo != null)
			stb.appendChild(FormFavo);
	
		// 元のデータを削除
		stb.querySelector(`div.w_300`).outerHTML="";
		// float: leftを付与
		stb.classList.add(`f_l`);
		stb.classList.replace(`p_10`, `p_4`);
		stb.classList.replace(`m_t_10`, `m_t_5`);
	}
	
	// class名称変更
	document.querySelectorAll(`div.see_through_area div.see_through_block`)
		.forEach((x)=>x.classList.replace(`see_through_block`, `icon_block`));
	// ジャンルを削除
	document.querySelectorAll(`div.icon_block div.block_info.orange`).forEach((x)=>x.outerHTML="");
	// 点線を削除
	document.querySelectorAll(`div.icon_block div.w_300 img.w_300`).forEach((x)=>x.outerHTML="");
	// set中のiconの黄色枠を外す
	document.querySelectorAll(`div.icon_block.collection_setting_block`)
		.forEach((x)=>x.classList.remove(`collection_setting_block`));
	// お気に入り登録の画像サイズを変更
	document.querySelectorAll(`div.icon_block form#form img`)
		.forEach((x)=>{x.classList.replace(`h_38`, `w_80`); x.classList.remove(`m_r_5`);});

	// 各icon_block（元 see_through_block）に操作を加える
	document.querySelectorAll(`div.icon_block`).forEach(moveIcon);
	// 各ジャンルの最後にclearfixを入れて整える
	document.querySelectorAll(`div.see_through_area div.town_block`)
		.forEach((x)=>{
			x.appendChild(document.querySelector(`.clearfix`).cloneNode(false));
			x.classList.replace(`p_15`, `p_5`);
		});

	// 何かを消す
	document.querySelectorAll('div.spmenu_toggle').forEach((x)=>x.outerHTML="");
	document.querySelectorAll('nav.spmenu_navigation').forEach((x)=>x.outerHTML="");
	document.querySelectorAll(`[id^='page']`).forEach((x)=>x.outerHTML="");
	
	alert("画像をタップ／クリックするとセットします。");
}
)(); void(0);