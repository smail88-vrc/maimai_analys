javascript:

var mra_not_evaluated="", mra_evaluated="", mra_max_rating="";

var datalist=[], sss_rating=0, ss_rating=0, s_rating=0;

var best_ave=0, best_limit=0, hist_limit=0;
var expect_max=0, best_rating=0, recent_rating=0, hist_rating=0, best_left=0, hist_left=0;


function calc_rating(rate_array, make_text)
{
	var tmp=0, str="", best30=0, history473=0;
	for(var i=0; i<30; i++)
	{
		best30 += rate_array[i];
	}	
	history473=best30;
	for(var i=30 ;i<mra_history;i++)
	{
		history473 += rate_array[i];
	}

	best_ave = Math.floor(best30/30)/100;
	best_limit = Math.floor(rate_array[29])/100;
	hist_limit = Math.floor(rate_array[mra_history-1])/100;
	if(Number(hist_limit)<=0)
	{
		var count=0;
		for(count=0; rate_array[count] > 0; count++);
		hist_limit= (mra_history-count) + "曲不足";
	}
	
	best_rating = Math.floor(best30/44);	//best30はすでにRating*100
	recent_rating = Math.floor(rate_array[0]*10/44);
	hist_rating = Math.floor(history473/(mra_history*11));	// multiply 4/(473*44)
	
	best_left = (44 - Math.ceil(best30%44))/100;
	hist_left = (mra_history*11 - Math.ceil(history473%(mra_history*11)))/100;

	expect_max = (Math.floor(best_rating + recent_rating + hist_rating)/100);

	best_rating /= 100;
	recent_rating /= 100;
	hist_rating /= 100;
	
	return expect_max;
}
	

function tl(l, s)
{
	var ll=[], tmp=0;
	for(var n=0; n<3; n++)
	{
		tmp=mra_diff2tmp(l[n]);
		(Math.floor(tmp)<12||s[n]%500==0)?(ll.push(l[n])):
		(ll.push(Math.floor(tmp) + "." + [20,60,30,21,17,35,50,28,55,65].indexOf((s[n]/5)%100-2*Math.floor(tmp))));
	}
	
	return ll;
}

//未検証
var lv13_=[], lv12p=[], lv12_=[], lv11p=[], lv11_=[];
var lv10p=[], lv10_=[], lv09p=[], lv09_=[], lv08p=[];
	
//検証済み
var lv13minus=[13.6, 13.5, 13.4, 13.3, 13.2, 13.1, 13.0];
var lv12puls=[12.9, 12.8, 12.7];
var lv12equal=[12.6, 12.5, 12.4, 12.3];
var lv12e_rslt=[];
var lv12minus=[12.2, 12.1, 12.0];
var lv12m_rslt=[];
var lv11plus=[11.9, 11.8, 11.7];
var lv11p_rslt=[[],[],[]];
var lv11minus=[11.6, 11.5, 11.4, 11.3, 11.2, 11.1, 11.0];
var lv11m_rslt=[[],[],[],[],[],[],[]];
var lv10plus=[10.9, 10.8, 10.7];
var lv10p_rslt=[[],[],[]];
var lv10minus=[10.6, 10.5, 10.4, 10.3, 10.2, 10.1, 10.0];
var lv10m_rslt=[[],[],[],[],[],[],[]];
var lv9plus=[9.9, 9.8, 9.7];
var lv9p_rslt=[[],[],[]];
var lv9minus=[9.6, 9.5, 9.4, 9.3, 9.2, 9.1, 9.0];
var lv9m_rslt=[[],[],[],[],[],[],[]];
var lv8plus=[8.9, 8.8, 8.7];
var lv8p_rslt=[[],[],[]];


var mlist_length=maimai_inner_lv.length;
var rt=[];

for(var i=0; i<mlist_length; i++)
{
	var lt=tl(maimai_inner_lv[i].levels, maimai_inner_lv[i].score);
	var ml=mra_diff2tmp(lt[1]);
	
	//max Rating計算用
	rt.push(Math.max.apply(null, lt.map(mra_diff2tmp)));
	
	
	// 内部lv出力用
	for(var lv=0; lv<3; lv++)
	{
		var tmpl=0, tn="";
		tn += (maimai_inner_lv[i].nick != "")?maimai_inner_lv[i].nick:maimai_inner_lv[i].name;
		tn += (lv==0)?"(赤)":(lv==2)?"(白)":"";
		
		if(maimai_inner_lv[i].score[lv]==0)
			continue;

		tmpl=mra_diff2tmp(maimai_inner_lv[i].levels[lv]);
		if(maimai_inner_lv[i].score[lv]%500==0) //未検証
		{	
			if(tmpl>=13) lv13_.push(tn);
			else if(tmpl>=12.7) lv12p.push(tn);
			else if(tmpl>=12) lv12_.push(tn);
			else if(tmpl>=11.7) lv11p.push(tn);
			else if(tmpl>=11) lv11_.push(tn);
			
			if((lv==0&&ml<12.7) || tmpl>=11) continue;
			
			if(tmpl>=10.7) lv10p.push(tn);
			else if(tmpl>=10) lv10_.push(tn);
			else if(tmpl>=9.7) lv09p.push(tn);
			else if(tmpl>=9) lv09_.push(tn);
			else if(tmpl>=8.7) lv08p.push(tn);
		}
		else //検証済
		{
			tmpl=mra_diff2tmp(lt[lv]);
			if(tmpl>=12.7) continue;
			if(lv12equal.indexOf(tmpl)!=-1) lv12e_rslt.push(tn);
			if(lv12minus.indexOf(tmpl)!=-1) lv12m_rslt.push(tn);
			if(lv11plus.indexOf(tmpl)!=-1) 	lv11p_rslt[lv11plus.indexOf(tmpl)].push(tn);
			if(lv11minus.indexOf(tmpl)!=-1) lv11m_rslt[lv11minus.indexOf(tmpl)].push(tn);
			if(lv10plus.indexOf(tmpl)!=-1) 	lv10p_rslt[lv10plus.indexOf(tmpl)].push(tn);
			if(lv10minus.indexOf(tmpl)!=-1) lv10m_rslt[lv10minus.indexOf(tmpl)].push(tn);
			if(lv9plus.indexOf(tmpl)!=-1) lv9p_rslt[lv9plus.indexOf(tmpl)].push(tn);
			if(lv9minus.indexOf(tmpl)!=-1) lv9m_rslt[lv9minus.indexOf(tmpl)].push(tn);
			if(lv8plus.indexOf(tmpl)!=-1) lv8p_rslt[lv8plus.indexOf(tmpl)].push(tn);
		}
	}
}

rt = rt.sort(function(a,b){return b-a;}).map(String);
s_rating=calc_rating(rt.map(function(x){return mra_arch2rate_100(0.97,x);}), false);
ss_rating=calc_rating(rt.map(function(x){return mra_arch2rate_100(0.995,x);}), false);
sss_rating=calc_rating(rt.map(function(x){return mra_arch2rate_100(1,x);}), true);
var trv=mra_arch2rate_100(1, rt[0]);
var test_str="";

document.open();
document.write('javascript:<br>');
document.write('var lv13minus=[' + lv13minus.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv12puls=[' + lv12puls.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv12equal=[' + lv12equal.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv12minus=[' + lv12minus.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv11plus=[' + lv11plus.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv11minus=[' + lv11minus.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv10plus=[' + lv10plus.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv10minus=[' + lv10minus.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv9plus=[' + lv9plus.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv9minus=[' + lv9minus.map(mra_diff2sss).join(', ') + '];<br>');
document.write('var lv8plus=[' + lv9minus.map(mra_diff2sss).join(', ') + '];<br>');
document.write('<br>');

document.write('var lv13_="' + lv13_.join('、 ') + '";<br>');
document.write('var lv12p="' + lv12p.join('、 ') + '";<br>');
document.write('var lv12_="' + lv12_.join('、 ') + '";<br>');
document.write('var lv11p="' + lv11p.join('、 ') + '";<br>');
document.write('var lv11_="' + lv11_.join('、 ') + '";<br>');
document.write('var lv10p="' + lv10p.join('、 ') + '";<br>');
document.write('var lv10_="' + lv10_.join('、 ') + '";<br>');
document.write('var lv09p="' + lv09p.join('、 ') + '";<br>');
document.write('var lv09_="' + lv09_.join('、 ') + '";<br>');
document.write('<br>');

document.write('var lv12e_rslt="' + lv12e_rslt.join('、 ') + '";<br>');
document.write('var lv12m_rslt="' + lv12m_rslt.join('、 ') + '";<br>');
document.write('var lv11p_rslt=[' + lv11p_rslt.map((x)=>'"' + x.join('、 ') + '"').join('、 ') + '];<br>');
document.write('var lv11m_rslt=[' + lv11m_rslt.map((x)=>'"' + x.join('、 ') + '"').join('、 ') + '];<br>');
document.write('var lv10p_rslt=[' + lv10p_rslt.map((x)=>'"' + x.join('、 ') + '"').join('、 ') + '];<br>');
document.write('var lv10m_rslt=[' + lv10m_rslt.map((x)=>'"' + x.join('、 ') + '"').join('、 ') + '];<br>');
document.write('var lv9p_rslt=[' + lv9p_rslt.map((x)=>'"' + x.join('、 ') + '"').join('、 ') + '];<br>');
document.write('var lv9m_rslt=[' + lv9m_rslt.map((x)=>'"' + x.join('、 ') + '"').join('、 ') + '];<br>');
document.write('var lv8p_rslt=[' + lv8p_rslt.map((x)=>'"' + x.join('、 ') + '"').join('、 ') + '];<br>');
document.write('<br>');

document.write('var mlist_length=' + mlist_length + ';<br>');
document.write('var mra_update_mlist=' + mra_update_mlist + ';<br>');
document.write('var mra_update_llist=' + mra_update_llist + ';<br>');

document.write('var s_rating=' + s_rating.toFixed(2) + ';<br>');
document.write('var ss_rating=' + ss_rating.toFixed(2) + ';<br>');

document.write('var best_ave=' + best_ave.toFixed(2) + ';<br>');
document.write('var best_limit=' + best_limit.toFixed(2) + ';<br>');
document.write('var hist_limit=' + hist_limit.toFixed(2) + ';<br>');
document.write('var expect_max=' + expect_max.toFixed(2) + ';<br>');
document.write('var best_rating=' + best_rating.toFixed(2) + ';<br>');
document.write('var recent_rating=' + recent_rating.toFixed(2) + ';<br>');
document.write('var hist_rating=' + hist_rating.toFixed(2) + ';<br>');
document.write('var best_left=' + best_left.toFixed(2) + ';<br>');
document.write('var trv=' + (trv/100).toFixed(2) + ';<br>');
document.write('var hist_left=' + hist_left.toFixed(2) + ';<br>');


document.close();
