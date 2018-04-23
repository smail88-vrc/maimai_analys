javascript:

var mra_not_evaluated="", mra_evaluated="";

function get_ratingrank(rating)
{
	return (rating>=15)?("mai_rainbow"):(rating>=14.5)?("mai_gold"):(rating>=14)?("mai_silver"):(rating>=13)?("mai_copper"):
	(rating>=12)?("mai_violet"):(rating>=10)?("mai_red"):(rating>=7)?("mai_yellow"):(rating>=4)?("mai_green"):
	(rating>=1)?("mai_blue"):("mai_white");
}

function inner_level_milk_input()
{
	var not_eval_lv_list=["13", "12+", "12", "11+", "11", "10+", "10", "9+", "9", "8+"];
	var not_eval_msc_list=[lv13_, lv12p, lv12_, lv11p, lv11_, lv10p, lv10_, lv09p, lv09_, lv08p];

	$('#not_eval_date')[0].innerText=mra_update_mlist + "追加譜面までの未検証譜面";
	for(var i=0; i<10; i++)
	{
		$('[id=not_eval_level]')[i].innerText=not_eval_lv_list[i];
		$('[id=not_eval_music]')[i].innerText=
			(not_eval_msc_list[i]=="")?("（全部検証済）"):(not_eval_msc_list[i]);
	}

	$('[id=eval_date]')[0].innerText=mra_update_llist + "時点での検証済み譜面";
	$('[id=lv13minus]')[0].innerText="Lv.\n13";
	$('[id=lv12puls]')[0].innerText=lv12puls.join('\n');
	$('[id=lv12equal]')[0].innerText=lv12equal.join('\n');
	$('[id=lv12e_rslt]')[0].innerText=lv12e_rslt;
	$('[id=lv12minus]')[0].innerText=lv12minus.join('\n');
	$('[id=lv12m_rslt]')[0].innerText=lv12m_rslt;
	for(var i=0; i<3; i++)
	{
		$('[id=lv11plus]')[i].innerText=lv11plus[i];
		$('[id=lv11p_rslt]')[i].innerText=lv11p_rslt[i];
	}
	for(var i=0; i<7; i++)
	{
		$('[id=lv11minus]')[i].innerText=lv11minus[i];
		$('[id=lv11m_rslt]')[i].innerText=lv11m_rslt[i];
	}
	for(var i=0; i<3; i++)
	{
		$('[id=lv10plus]')[i].innerText=lv10plus[i];
		$('[id=lv10p_rslt]')[i].innerText=lv10p_rslt[i];
	}
	for(var i=0; i<7; i++)
	{
		$('[id=lv10minus]')[i].innerText=lv10minus[i];
		$('[id=lv10m_rslt]')[i].innerText=lv10m_rslt[i];
	}
	for(var i=0; i<3; i++)
	{
		$('[id=lv9plus]')[i].innerText=lv9plus[i];
		$('[id=lv9p_rslt]')[i].innerText=lv9p_rslt[i];
	}
	for(var i=0; i<7; i++)
	{
		$('[id=lv9minus]')[i].innerText=lv9minus[i];
		$('[id=lv9m_rslt]')[i].innerText=lv9m_rslt[i];
	}
	for(var i=0; i<3; i++)
	{
		$('[id=lv8plus]')[i].innerText=lv8plus[i];
		$('[id=lv8p_rslt]')[i].innerText=lv8p_rslt[i];
	}

	$('[id=mlist_length]')[0].innerText=mlist_length;
	$('[id=c_rating]')[0].innerText=s_rating.toFixed(2) + '\n(' + ss_rating.toFixed(2) + ')';
	$('[id=c_rating]').addClass(get_ratingrank(s_rating));
	$('[id=best_ave]')[0].innerText=best_ave.toFixed(2);
	$('[id=best_ave]').addClass(get_ratingrank(best_ave));
	$('[id=best_limit]')[0].innerText=best_limit.toFixed(2);
	$('[id=best_limit]').addClass(get_ratingrank(best_limit));
	$('[id=hist_limit]')[0].innerText=hist_limit.toFixed(2);
	$('[id=expect_max]')[0].innerText=expect_max.toFixed(2);
	$('[id=expect_max]').addClass(get_ratingrank(expect_max));
	$('[id=best_rating]')[0].innerText=best_rating.toFixed(2) + '\n(' + best_left.toFixed(2) + ')';
	$('[id=best_rating]').addClass(get_ratingrank(best_ave));
	$('[id=recent_rating]')[0].innerText=recent_rating.toFixed(2) + '\n(' + trv.toFixed(2) + ')';
	$('[id=recent_rating]').addClass(get_ratingrank(trv));
	$('[id=hist_rating]')[0].innerText=hist_rating.toFixed(2) + '\n(' + hist_left.toFixed(2) + ')';
	
	return;
}
