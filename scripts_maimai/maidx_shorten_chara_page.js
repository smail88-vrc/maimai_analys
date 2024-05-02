javascript:
(function ()
{
	if(document.querySelectorAll('.town_block .see_through_block:not(.collection_setting_block)').length < 1)
		{	alert('実行済みです'); return;	}

	// 2分割ちほーをくっつける
	const combineTownBlock = (name1, name2) =>
	{
		const AreaBlock = document.querySelectorAll('div.town_block');
		const TitleList = Array.from(AreaBlock).map((x)=>x.querySelector("div.f_15").innerText);

		const TmpIdx1 = TitleList.indexOf(name1);
		const TmpIdx2 = TitleList.indexOf(name2);

		if(TmpIdx1 >= 0 && TmpIdx2 >= 0)	// 両方あるときのみ処理
		{
			AreaBlock[TmpIdx1].querySelector("div.clearfix").outerHTML = "";
			AreaBlock[TmpIdx2].querySelectorAll("div.collection_chara_img_block")
				.forEach((x)=>AreaBlock[TmpIdx1].appendChild(x));
			AreaBlock[TmpIdx1].appendChild(AreaBlock[TmpIdx2].querySelector("div.clearfix"))
			AreaBlock[TmpIdx1].querySelector("div.f_15").innerText +=
				" / " + (AreaBlock[TmpIdx2].querySelector("div.f_15").innerText.split(" ").slice(-1)[0]);
			AreaBlock[TmpIdx2].outerHTML = "";
		}
		return;
	}
	
	// とくいなちほーの文言をちほーにぶら下げる
	document.querySelectorAll('div.town_block.m_t_0').forEach((x)=>x.appendChild(x.querySelector("div.f_12.gray")))
	// iconブロックにアイコンの名前をtitleとして付与
	document.querySelectorAll(`div.see_through_block.p_r.m_t_10.p_10.f_0:not(.collection_setting_block)`)
		.forEach((x)=>x.querySelector(`.collection_chara_img_block`)
			 			.setAttribute(`title`, x.querySelector(`div.p_t_10.p_b_5.f_15.break`).innerText.trim()));
	// キャラ表示部だけちほーにぶら下げる
	document.querySelectorAll('.see_through_block:not(.collection_setting_block) .collection_chara_img_block')
		.forEach((x)=>x.parentElement.parentElement.appendChild(x));
	// clearfixをちほーの最後にぶら下げる
	document.querySelectorAll('.town_block').forEach((x)=>x.appendChild(x.querySelector('.see_through_block .clearfix')));
	// キャラ表示部以外消す
	document.querySelectorAll('.town_block .see_through_block:not(.collection_setting_block)').forEach((x)=>x.outerHTML="");
	// キャラ表示部の幅を84pxにする
	document.querySelectorAll('div.town_block.m_t_0 .collection_chara_img_block.m_r_10')
		.forEach((x)=>x.setAttribute("style", "width:84px"));
	// キャラ表示部のmergin_rightを消す
	document.querySelectorAll('div.town_block.m_t_0 .collection_chara_img_block.m_r_10')
		.forEach((x)=>x.classList.remove("m_r_10"));

	// 2分割ちほーをくっつける
	combineTownBlock("メトロポリスちほー2 イーシュ襲来", "メトロポリスちほー2 黒姫の逆襲");
	combineTownBlock("みかんヶ岡ちほー 朝焼け通り", "みかんヶ岡ちほー 月夜通り");
	combineTownBlock("BLACK ROSEちほー2 黒薔薇病篇", "BLACK ROSEちほー2 二つの仮面篇");
	
	// とくいちほーが同じ物をくっつける
	while(document.querySelectorAll(`div.see_through_area div.town_block:not(.combine)`).length > 0)
	{
		const town_blocks = Array.from(document.querySelectorAll(`div.see_through_area div.town_block:not(.combine)`));
		const town_block_first = Array.from(document.querySelectorAll(`div.see_through_area div.town_block:not(.combine)`))[0];
		const new_town_block = town_block_first.cloneNode(false);
		new_town_block.classList.add("combine");
		new_town_block.setAttribute(`style`, `padding:5px 15px`);
		new_town_block.appendChild(town_block_first.querySelector(`div.gray`).cloneNode(true));
		town_blocks.filter((x)=>x.querySelector(`div.gray`).innerText.trim() == town_block_first.querySelector(`div.gray`).innerText)
			.forEach((y)=>{new_town_block.appendChild(document.createElement(`hr`));
					new_town_block.appendChild(y.querySelector(`div.t_c.f_b`));
					y.querySelectorAll(`div.collection_chara_img_block`)
						.forEach((z)=>new_town_block.appendChild(z));
					new_town_block.appendChild(y.querySelector(`div.clearfix`));
					y.outerHTML=""});
		document.querySelector(`div.see_through_area`).appendChild(new_town_block);
	}
	// とくいなちほーの文言の文字サイズを変更
	document.querySelectorAll("div.f_12.gray").forEach((x)=>x.classList.replace("f_12", "f_11"));

	// 何かを消す
	document.querySelector('div.spmenu_toggle').outerHTML="";
	document.querySelector('nav.spmenu_navigation').outerHTML=""
	document.querySelectorAll(`[id^='page']`).forEach((x)=>x.outerHTML="");
	
	return;
}
)(); void(0);