var test = '';

// 旧筐体 Sの時のレート値	lvは小数で入れる (Lv12.2なら 12.2)
const lv2s_100 = (lv) =>
{
	const inner_lv=Math.abs(lv);
	const tmp = Math.round(100*inner_lv);
	const disp_lv=Math.floor(inner_lv);
	switch(disp_lv)
	{
		case 15:
		case 14:
		case 13:
		case 12:
			return tmp*3/2-600;
		case 7:
			return tmp/2 + 400;
		default:
			return tmp;
	}
}

// 旧筐体 SSの時のレート値	lvは小数で入れる (Lv12.2なら 12.2)
// 旧筐体のSSSは SS+1、SSS+(=AP+)はSS+2
const lv2ss_100 = (lv) =>
{
	const inner_lv=Math.abs(lv);
	const tmp = Math.round(100*inner_lv);
	const disp_lv=Math.floor(inner_lv);
	switch(disp_lv)
	{
		case 15:
		case 14:
		case 13:
		case 12:
			return tmp*2-1100;
		case 11:
			return tmp+100;
		case 10:
			return 650+tmp/2;
		case 9:
		case 8:
			return 150+tmp;
		case 7:
		default:
			return 550+tmp/2;
	}
}

const mra_rate_XtoY = (basis, max, gap, n) =>
{
	return basis+(max-basis)*n/gap
}

// 旧筐体の計算式
const achi2oldrate_100 = (achi, lv) =>	//achiは百分率ではなく小数。99%なら0.99
{
	let temp = 0;
	const rate_ss = lv2ss_100(lv);
	const rate_s = lv2s_100(lv);
	const lv100 = Math.round(100*Math.abs(lv));
	temp =  (achi >= 1005000)?(mra_rate_XtoY(rate_ss+100, rate_ss+200,   5000, achi-1005000)):
		(achi >= 1000000)?(mra_rate_XtoY(rate_ss,     rate_ss+75,    5000, achi-1000000)):
		(achi >=  970000)?(mra_rate_XtoY(rate_s,      rate_ss-25,   30000, achi- 970000)):
		(lv100 < 900)?0:	// Lv9未満のS落ちは0とする。暫定。
		(achi >=  940000)?(mra_rate_XtoY(lv100-150,   rate_s-100,   30000, achi- 940000)):
		(achi >=  900000)?(mra_rate_XtoY(lv100-200,   lv100-150,    40000, achi- 900000)):
		(achi >=  800000)?(mra_rate_XtoY(lv100-300,   lv100-200,   100000, achi- 800000)):
		(achi >=  600000)?(mra_rate_XtoY(lv100*0.4,   lv100-300,   200000, achi- 600000)):
		(achi >=  400000)?(mra_rate_XtoY(lv100*0.2,   lv100*0.4,   200000, achi- 400000)):
		(achi >=  200000)?(mra_rate_XtoY(lv100*0.1,   lv100*0.2,   200000, achi- 200000)):
		(achi >=  100000)?(mra_rate_XtoY(0,           lv100*0.1,   100000, achi- 100000)):0;
	return Math.floor(temp);
}

// DX ver.用。
const achi2rating_dx = (lv, achi) =>	//lvは10倍、achiは%を10000倍で入力
{
	const rate =
	(achi >= 1005000)?15:
	(achi >= 1000000)?14:
	(achi >=  999900)?13.5:
	(achi >=  995000)?13:
	(achi >=  990000)?12:
	(achi >=  980000)?11:
	(achi >=  970000)?10:
	(achi >=  940000)?9.4:
	(achi >=  900000)?9:
	(achi >=  800000)?8:
	(achi >=  750000)?7.5:
	(achi >=  700000)?7:
	(achi >=  600000)?6:
	(achi >=  500000)?5:
	(achi >=  400000)?4:
	(achi >=  300000)?3:
	(achi >=  200000)?2:
	(achi >=  100000)?1:0
	
	const tmp = Math.min(achi, 1005000)*lv*rate;
	const tmpmod = tmp % 10000000;
	return (tmp - tmpmod)/10000000;	//戻りのRatingは整数値
}

// DX+ ver., Splash ver.用
const achi2rating_dxplus = (lv, achi) =>	//lvは10倍、achiは%を10000倍で入力
{
	const rate =
	(achi >= 1005000)?14:	//SSS+
	(achi >= 1000000)?13.5:	//SSS
	(achi >=  995000)?13.2:	//SS+
	(achi >=  990000)?13:	//SS
	(achi >=  980000)?12.7:	//S+
	(achi >=  970000)?12.5:	//S
	(achi >=  940000)?10.5:	//AAA
	(achi >=  900000)?9.5:	//AA
	(achi >=  800000)?8.5:	//A
	(achi >=  750000)?7.5:	//BBB
	(achi >=  700000)?7:	//BB
	(achi >=  600000)?6:	//B
	(achi >=  500000)?5:	//C
	(achi >=  400000)?4:	//D
	(achi >=  300000)?3:	//D
	(achi >=  200000)?2:	//D
	(achi >=  100000)?1:	//D
	0;
	
	const tmp = Math.min(achi, 1005000)*lv*rate;
	const tmpmod = tmp % 10000000;
	return (tmp - tmpmod)/10000000;	//戻りのRatingは整数値
}

// Splash+ ver.用（現在最新）
const achi2rating_splashplus = (lv, achi) =>	//lvは10倍、achiは%を10000倍で入力
{
	const rate =
	(achi >= 1005000)?22.4:	//SSS+
	(achi >= 1004999)?22.2: //100.4999専用
	(achi >= 1000000)?21.6:	//SSS
	(achi >=  999999)?21.4: // 99.9999専用
	(achi >=  995000)?21.1:	//SS+
	(achi >=  990000)?20.8:	//SS
	(achi >=  989999)?20.6:	// 98.9999専用(未調査)
	(achi >=  980000)?20.3:	//S+
	(achi >=  970000)?20.0:	//S
	(achi >=  969999)?17.6: // 96.9999専用
	(achi >=  940000)?16.8:	//AAA
	(achi >=  900000)?15.2:	//AA
	(achi >=  800000)?13.6:	//A
	(achi >=  750000)?12:	//BBB
	(achi >=  700000)?11.2:	//BB
	(achi >=  600000)?9.6:	//B
	(achi >=  500000)?8:	//C
	(achi >=  400000)?6.4:	//D
	(achi >=  300000)?4.8:	//D
	(achi >=  200000)?3.2:	//D
	(achi >=  100000)?1.6:	//D
	0;
	
	const tmp = Math.min(achi, 1005000)*lv*rate;
	const tmpmod = tmp % 10000000;
	return (tmp - tmpmod)/10000000;	//戻りのRatingは整数値
}

// 最新の計算式。通常時はこちらを読み込むようにする
const achi2rating_latest = achi2rating_splashplus;

// 過去バージョンの計算がしたい場合。
const achi2rating_choice = (vername) =>
{
	switch(vername)
	{
		case "buddies":
		case "universe":
		case "splashplus":
			return achi2rating_splashplus;
		case 'splash':
		case 'dxplus':
			return achi2rating_dxplus;
		case 'dx':
			return achi2rating_dx;
		default :
			return achi2rating_latest;
	}	
}

const get_overlevel = (start_lv, rate, achi) =>
{
	let tmplv = Math.round(start_lv*10);
	while(rate >= (achi2rating_latest(++tmplv, achi)));
	tmplv /= 10;
	tmplv = (tmplv < 5)?(Math.ceil(tmplv)):tmplv;
	return tmplv;	      
}

const get_overlevel_list = (rate, lvlist) =>
{
	let tmplv=0;
	tmplv = get_overlevel(tmplv, rate, 1005000);
	lvlist.push(tmplv);
	tmplv = get_overlevel(tmplv-1, rate, 1000000);
	lvlist.push(tmplv);
	tmplv = get_overlevel(tmplv-1, rate, 995000);
	lvlist.push(tmplv);
	tmplv = get_overlevel(tmplv-1, rate, 990000);
	lvlist.push(tmplv);
	tmplv = get_overlevel(tmplv-1, rate, 980000);
	lvlist.push(tmplv);
	tmplv = get_overlevel(tmplv-1, rate, 970000);
	lvlist.push(tmplv);
	return;
}

// 与えられたlvで与えられたrateに到達するための達成率を二分岐探索で求める。
// lv : 内部lvの10倍
// 返り : 達成率(%)の10000倍の値 ex:100% => 1000000
// 1010001が返却されたら到達不能の意味
const get_reachable_achivement_for_rate = (lv, rate) =>
{
	let tmpmaxachi = 1010000
	let tmpminachi = 0
	let tmpachi=0, n=0;

	if(achi2rating_latest(lv, 1005000) < rate)	//SSS+で越せない
		return 1010001;	//到達不可能
	
	while(tmpmaxachi - tmpminachi >= 2 && n++<20)
	{
		tmpachi = Math.floor((tmpmaxachi + tmpminachi)/2);
		
		if(achi2rating_latest(lv, tmpachi) < rate)
			tmpminachi = tmpachi;
		else
			tmpmaxachi = tmpachi;
	}
	return tmpmaxachi;
}

// 与achiのとき、与rateに到達できる最小のLvを求める。
// achi : 達成率(%)の10000倍
// 返 : Lvの10倍
const get_reachable_level = (rate, achi) =>
{
	let tmplv = 10;
	for(; rate > (achi2rating_latest(tmplv, achi)); tmplv++)
	;
	return tmplv;
}

// 与rateに到達できる lvとachivementのリストを提示。
const get_reachable_level_achi_list = (rate) =>
{
	let lvmin = get_reachable_level(rate, 1005000);	// SSS+で到達できる最低Lv
	let achi_lv_map = new Map();
	let retarr = [];

	for(let n=150; n>=lvmin; n--)	//最大Lv(=15)からlvminまでを捜索
	{
		if(n<=50) n=Math.floor(n/10)*10;
		let tmpachi = get_reachable_achivement_for_rate(n, rate);
		switch(tmpachi)
		{
			case 800000:
			case 900000:
			case 940000:
				achi_lv_map.set(tmpachi, n);
				break;
			case 1010001:	//unreachable
				break;
			default:
				if(tmpachi>=970000 || tmpachi>=800000 && achi_lv_map.size == 0)
					achi_lv_map.set(tmpachi, n);
				break;
		}			
	}

	achi_lv_map.forEach((key, value)=>retarr.push([key,value]));
	return retarr.reverse();
}
const get_over_achivement_for_rate =  (lv, rate) =>
{
	return get_reachable_achivement_for_rate(lv, rate+1);
}

// 与lvに対して、A以上のrating値と、その時の最低achivementのMapを算出
// 戻りは rate=>achi　のMap。
const achilist_for_level = (lv) =>
{
	const tmplv = Math.floor(Number(lv)*10);
	let rate_achi_map = new Map();	// rate=>achi
	for(let tmpachi = 1005000; tmpachi>=800000; --tmpachi)
		rate_achi_map.set(achi2rating_latest(tmplv, tmpachi), tmpachi);

	return rate_achi_map;
}

// lvは10倍の値
const get_lv2achilist = (lv)=>
{
	let retarr = []
	let achimap = new Map();
	for(let tmpachi=1010000; tmpachi>=970000; tmpachi--)
	{
		achimap.set(achi2rating_latest(lv, tmpachi), tmpachi)
	}

	achimap.set(achi2rating_latest(lv, 969999), 969999)
	achimap.set(achi2rating_latest(lv, 940000), 940000)
	achimap.set(achi2rating_latest(lv, 939999), 939999)
	achimap.set(achi2rating_latest(lv, 900000), 900000)
	achimap.set(achi2rating_latest(lv, 899999), 899999)
	achimap.set(achi2rating_latest(lv, 800000), 800000)

	achimap.forEach((key, value)=>retarr.push([key,value]));
	return retarr;
}

// 与ratingとなるlvとachivementのリストを提示。
// [SSS+, SSS, SS+, SS, S+, S, AAA]の順に入っている、同じratingにならなければ空
const rate2lv_achi_list = (rate) =>
{
	const sssp_filter = ((x)=>1005000<=x[1] && achi2rating_latest(x[0], x[1])==rate);
	const  sss_filter = ((x)=>1000000<=x[1] && x[1]<1005000 && achi2rating_latest(x[0], x[1])==rate);
	const  ssp_filter = ((x)=> 995000<=x[1] && x[1]<1000000 && achi2rating_latest(x[0], x[1])==rate);
	const   ss_filter = ((x)=> 990000<=x[1] && x[1]< 995000 && achi2rating_latest(x[0], x[1])==rate);
	const   sp_filter = ((x)=> 980000<=x[1] && x[1]< 990000 && achi2rating_latest(x[0], x[1])==rate);
	const    s_filter = ((x)=> 970000<=x[1] && x[1]< 980000 && achi2rating_latest(x[0], x[1])==rate);
	const  aaa_filter = ((x)=> 940000<=x[1] && x[1]< 970000 && achi2rating_latest(x[0], x[1])==rate);

	// rateとなるlv, achiの組み合わせリストを得る
	const tmplist = get_reachable_level_achi_list(rate).filter((x)=>x[1]%500!=499);

	return [sssp_filter, sss_filter, ssp_filter, ss_filter, sp_filter, s_filter, aaa_filter].map((x)=>tmplist.filter(x));
}

// notes:[TAP, HOLD, SLIDE, TOUCH, BREAK]
// tgtachi:目標達成率、%を10000倍にした数字 101.0000% => 1010000
// return 
const ScoreData4TgtAchi = (note_count, tgtachi) =>
{
	let retlist = [];
	const score100 = (note_count[0]*10 + note_count[1]*20 + note_count[2]*30 + note_count[3]*10 + note_count[4]*50);
	const tgtscore = score100 * tgtachi / 1000000;
	let loop_breakcount = 0, loop_grgdcount = 0, loop_allcount = 0;
	const MAX_BC = 10, MAX_GG = 2, MAX_AC = 100;
	
	// 先にPerfect(とmiss)だけの時を出力
	for(let n = 0; n<=note_count[4]*2; n++){	// break内訳を落とした点数でloop
	for(let p=note_count[4]; p>=Math.ceil(n/2) ; p--){	// perfect
		const m = note_count[4] - p;	// miss
		const bb = (10000*p-2500*n)/note_count[4];	// break bonus
		const RA = tgtachi - bb;	// 残り達成率
		if(RA > 1000000)	continue;	// 100%以上は出せないので次に
		const NS = Math.ceil(score100*RA/1000000);	// BreakBonus無視した通常score
		if(NS < 0) continue;
		const RS = score100 - NS - m*50;	// 通常ノーツの失点合計
		if((RS < 0) || (RS==1) || (RS==3) || Math.floor(NS/score100*1000000+bb)!=tgtachi) continue;	//不足達成率が負の数字は達成不可
		retlist.push([RS*50, p, n, 0, 0, m, NS/score100, bb/10000]);
		++loop_allcount;
	}}
	
	if(retlist.length!=0)	retlist.push([]);
	
	// Breakを1個以上
	for(let n = 0; n<=note_count[4]*2; n++){	// break内訳を落とした点数でloop
		for(let p=note_count[4]; p>=Math.ceil(n/2); p--){	// perfect
			if(loop_breakcount >= MAX_BC) {	loop_breakcount = 0; continue;}	// 既にMAX_BC個あるなら次に
			for(let m=note_count[4]-(p); m>=0; m--){	// miss
				if(loop_grgdcount >= MAX_GG) {	loop_grgdcount = 0; continue;}	// 既にMAX_GG個あるなら次に
				if(p+m == note_count[4])	continue;	// 既に処理済みなので次の値に
				for(let gr=note_count[4]-(p+m); gr>=0; gr--){	// great
					const gd = note_count[4]-(p+m+gr);	// goodは残り
					const bb = ((10000*p-2500*n) + 4000*gr + 3000*gd)/note_count[4];	// break bonus
					const RA = tgtachi - bb;	// 残り達成率
					if(RA > 1000000)	continue;	// 100%以上は出せないので次に
					const NS = Math.ceil(score100*RA/1000000);	// BreakBonus無視した通常score
					if(NS < 0) continue;	//必要な物以外捨てる
					const RS = score100 - NS - m*50 - gd*30;	// 通常ノーツ+BreakGreatの失点合計
					if((RS-10*gr < 0) || (RS==1) || (RS==3) ||  Math.floor(NS/score100*1000000+bb)!=tgtachi) continue;	//不足達成率が負の数字は達成不可
					retlist.push([RS*50, p, n, gr, gd, m, NS/score100, bb/10000]);
				
					++loop_breakcount; ++loop_allcount;
					if(gr + gd > 0) ++loop_grgdcount;
					if(loop_breakcount >= MAX_BC || loop_grgdcount >= MAX_GG || loop_allcount >= MAX_AC)	break;
				}
				if(loop_breakcount >= MAX_BC || loop_grgdcount >= MAX_GG || loop_allcount >= MAX_AC)	break;
			}
		if(loop_breakcount >= MAX_BC || loop_grgdcount >= MAX_GG || loop_allcount >= MAX_AC)	break;
		}
		if(loop_allcount >= MAX_AC)	break;	// 全部でMAX_AC個越えたらbreak;
	}
	
	return retlist;
}