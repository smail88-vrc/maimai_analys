javascript:

var mra_not_evaluated="", mra_evaluated="";

function get_ratingrank(rating)
{
	return (rating>=15)?("mai_rainbow"):(rating>=14.5)?("mai_gold"):(rating>=14)?("mai_silver"):(rating>=13)?("mai_copper"):
	(rating>=12)?("mai_violet"):(rating>=10)?("mai_red"):(rating>=7)?("mai_yellow"):(rating>=4)?("mai_green"):
	(rating>=1)?("mai_blue"):("mai_white");
}


function mra_add_musiclevel_list(lv_list, m_list)
{
	var liststr="";
	for(var i=0; i<lv_list.length; i++)
	{
		liststr += "<tr><th>" + lv_list[i] + "<\/th> <td>" + m_list[i] + "<\/td><\/tr>";
	}
	
	return liststr;
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

	$('#lv13minus')[0].innerText=lv13minus.join('<br>');
	$('#lv12puls')[0].innerText=lv12puls.join('<br>');
	
	$('#lv12equal')[0].innerText=lv12equal.join('<br>');
	$('#lv12e_rslt')[0].innerText=lv12e_rslt;
	$('#lv12minus')[0].innerText=lv12minus.join('<br>');
	$('#lv12m_rslt')[0].innerText=lv12m_rslt;
	
/*
	mra_evaluated += mra_level_lavel("Level 11+");
	mra_evaluated += mra_add_musiclevel_list(lv11plus, lv11p_rslt);
	mra_evaluated += mra_level_lavel("Level 11");
	mra_evaluated += mra_add_musiclevel_list(lv11minus, lv11m_rslt);
	mra_evaluated += mra_level_lavel("Level 10+");
	mra_evaluated += mra_add_musiclevel_list(lv10plus, lv10p_rslt);
	mra_evaluated += mra_level_lavel("Level 10");
	mra_evaluated += mra_add_musiclevel_list(lv10minus, lv10m_rslt);
	mra_evaluated += mra_level_lavel("Level 9+");
	mra_evaluated += mra_add_musiclevel_list(lv9plus, lv9p_rslt);
	mra_evaluated += mra_level_lavel("Level 9");
	mra_evaluated += mra_add_musiclevel_list(lv9minus, lv9m_rslt);
	mra_evaluated += mra_level_lavel("Level 8+");
	mra_evaluated += mra_add_musiclevel_list(lv8plus, lv8p_rslt);
	mra_evaluated += "<\/table>"
*/
	
//	$('#mra_evaluated')[0].innerText=mra_evaluated;
	$('#mlist_length')[0].innerText=mlist_length;
	$('#s_rating')[0].innerText=s_rating.toFixed(2);
	$('#ss_rating')[0].innerText='(' + ss_rating.toFixed(2) + ')';
	$('#best_ave')[0].innerText=best_ave.toFixed(2);
	$('#best_limit')[0].innerText=best_limit.toFixed(2);
	$('#hist_limit')[0].innerText=hist_limit.toFixed(2);
	$('#expect_max')[0].innerText=expect_max.toFixed(2);
	$('#best_rating')[0].innerText=best_rating.toFixed(2);
	$('#best_left')[0].innerText='(' + best_left.toFixed(2) + ')';
	$('#recent_rating')[0].innerText=recent_rating.toFixed(2);
	$('#trv')[0].innerText='(' + trv.toFixed(2) + ')';
	$('#hist_rating')[0].innerText=hist_rating.toFixed(2);
	$('#hist_left')[0].innerText='(' + hist_left.toFixed(2) + ')';
	$('#r_color').addClass(get_ratingrank(s_rating));
	$('#best_ave').addClass(get_ratingrank(best_ave));
	$('#best_limit').addClass(get_ratingrank(best_limit));
	$('#expect_max').addClass(get_ratingrank(expect_max));
	$('#b_color').addClass(get_ratingrank(best_ave));
	$('#rcnt_color').addClass(get_ratingrank(trv));
	
	return;
}
