javascript:
(function ()
{
	if(document.querySelectorAll('div.w_300').length < 2)
		{	alert('実行済みです'); return;	}

	// SETの画像を消す
	document.querySelectorAll(`button img.w_84`).forEach((x)=>x.outerHTML=``);
	
	// icon画像のclassからm_r_10, f_lを削除
	document.querySelectorAll(`div.town_block.m_t_0 img.w_80`).forEach((x)=>x.classList.remove(`m_r_10`, `f_l`));
	
	// SET中の画像の位置を調整
	document.querySelector(`div.town_block.m_t_0 img.collection_setting_img`).setAttribute(`style`, `top:-4px; left:-4px;`)
	// 未取得のiconの画像の位置を調整
		document.querySelectorAll(`div.town_block.m_t_0 img.collection_lock_img`)
			.forEach((x)=>x.setAttribute(`style`, `top:-4px; left:-4px;`));
	
	// iconのlist
	IconList = Array.from(
		document.querySelectorAll(`div.town_block.m_15.m_t_0.p_15.t_l div.see_through_block.p_r.m_t_10.p_10.f_0`));
	
	// icon listの内、form があるものについて formをappendChildして、その中に画像iconを入れる
	IconList.filter((x)=>x.querySelector(`form`)!=null)
		.forEach((y)=>{
			y.appendChild(y.querySelector(`form`));
			y.querySelector(`form button`).appendChild(y.querySelector(`img.w_80`));
		});

	// 取得条件を title属性で付与
	IconList.forEach((x)=>x.setAttribute(`title`,
					     x.querySelector(`div.w_300 div.f_14`).innerText + `\n`
					     + x.querySelector(`div.w_300 div.f_12`).innerText));
	// 説明文を削除
	document.querySelectorAll(`div.town_block.m_t_0 div.w_300`).forEach((x)=>x.outerHTML='');
	
	// icon list内の div.clearfixを削除
	document.querySelectorAll(`div.town_block.m_t_0 div.clearfix`).forEach((x)=>x.outerHTML="");
	
	// icon listのclassを調整、margin:4px, height:80pxも追加
	IconList.forEach((x)=>{
		x.classList=`f_l p_r w_80`;
		x.setAttribute(`style`, `margin:4px; height:80px;`);
	});
	
	// icon listが属する town_blockの最後にclearfix追加、合わせて、town_blockのpaddingを15->5に
	const DivClearfix=document.createElement(`div`);
	DivClearfix.classList.add(`clearfix`);
	document.querySelectorAll(`div.town_block.m_t_0`)
		.forEach((x)=>{
			x.appendChild(DivClearfix.cloneNode(true));
			x.classList.replace(`p_15`, `p_5`);
		});
	
	// 何かを消す
	document.querySelectorAll('div.spmenu_toggle').forEach((x)=>x.outerHTML="");
	document.querySelectorAll('nav.spmenu_navigation').forEach((x)=>x.outerHTML="");
	document.querySelectorAll(`[id^='page']`).forEach((x)=>x.outerHTML="");
	
	alert("画像をタップ／クリックするとセットします。");
}
)(); void(0);