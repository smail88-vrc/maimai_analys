javascript:

var mra_history = 473;

function mra_diff2tmp(diff)
{
	var difftable =
		[["7-", 7.0], ["7+", 7.7], ["8-", 8.0], ["8+", 8.7], ["9-", 9.0], ["9+", 9.7],["10-", 10.0], 
 		 ["10+", 10.7], ["11-", 11.0], ["11+", 11.7], ["12-", 12.0], ["12+", 12.7], ["13-", 13.0],
		 ["12.O", 12.0], ["12.I", 12.1], ["12.Z", 12.2], ["12.E", 12.3], ["12.A", 12.4],
      		 ["12.S", 12.5], ["12.b", 12.6], ["12.L", 12.7], ["12.B", 12.8], ["12.q", 12.9],
		 ["13.O", 13.0], ["13.I", 13.1], ["13.Z", 13.2], ["13.E", 13.3], ["13.A", 13.4],
		 ["13.S", 13.5], ["13.b", 13.6], ["13.L", 13.7], ["13.B", 13.8], ["13.q", 13.9]];
      	var tmpdiff=(diff.slice(0,1)=="(")?(diff.slice(1,-1)):diff;
	
	for(var i=0; i< difftable.length; i++)
	{
		if(tmpdiff == difftable[i][0])
		{
			return 1*difftable[i][1];
		}
	}
	return 1*diff;
}

function mra_diff2s(difficallity)
{
	var tmp = mra_diff2tmp(difficallity),retval=0;
	switch(Math.floor(tmp))
	{
		case 13:
			retval = tmp+0.5;
			break;
		case 12:
			retval = 12.00+(tmp*1-12.00)*(3/2);
			break;
		default:
			retval = tmp;
			break;
	}
	return Math.round(retval*100)/100;
}

function mra_diff2sss(difficallity)
{
	var tmp=mra_diff2tmp(difficallity), retval=0;
	switch(Math.floor(tmp))
	{
		case 13:
			retval = tmp*1+3.0;
			break;
		case 12:
			retval = tmp*2-10.00;
			break;
		case 11:
			retval = 2.00+tmp*1;
			break;
		case 10:
			retval = 7.50+tmp/2;
			break;
		case 9:
		case 8:
			retval = 2.50+tmp*1;
			break;
		case 7:
		default:
			retval = 6.50+tmp/2;
			break;
	}
	return Math.round(retval*100)/100;
}

function mra_rate_XtoY(basis, max, gap, n)
{
	return basis+(max-basis)*n/gap
}

function mra_diff2waku(difficallity)
{
	var waku=0;
	var rate_sss = Math.round(10000*mra_diff2sss(difficallity));
	waku = Math.floor(rate_sss/4400);
	waku += Math.floor(rate_sss/440);
	return (waku/100).toFixed(2);
}

function mra_arch2rate_10000(achievement, difficallity)
{
	var temp = 0;

		var rate_sss = Math.round(10000* mra_diff2sss(difficallity));
		var rate_ss = rate_sss - 10000;
		var rate_s = Math.round(10000* mra_diff2s(difficallity));
		var diff10000 = Math.round(10000*mra_diff2tmp(difficallity));
		var achi_100 = Math.round(achievement*100);
//		console.log("SSS:" + rate_sss + " S:" + rate_s + " Lv.:" + diff10000 + " " + achi_100 + "%");
		if(achi_100 >= 10000) {
			temp = rate_sss
		} else if (achi_100 >= 9900) {
			temp = mra_rate_XtoY(rate_ss,     rate_sss-2500,  100, achi_100-9900);
		} else if (achi_100 >= 9700) {
			temp = mra_rate_XtoY(rate_s,      rate_ss-2500,   200, achi_100-9700);
		} else if (achi_100 >= 9400) {
			temp = mra_rate_XtoY(diff10000-15000, rate_s-10000,   300, achi_100-9400);
		} else if (achi_100 >= 9000) {
			temp = mra_rate_XtoY(diff10000-20000, diff10000-15000,  400, achi_100-9000);
		} else if (achi_100 >= 8000) {
			temp = mra_rate_XtoY(diff10000-30000, diff10000-20000, 1000, achi_100-8000);
		} else if (achi_100 >= 6000) {
			temp = mra_rate_XtoY(diff10000*0.4, diff10000-40000, 2000, achi_100-6000);
		} else if (achi_100 >= 4000) {
			temp = mra_rate_XtoY(diff10000*0.2, diff10000*0.4, 2000, achi_100-4000);
		} else if (achi_100 >= 2000) {
			temp = mra_rate_XtoY(diff10000*0.1, diff10000*0.2, 1000, achi_100-2000);
		} else if (achi_100 >= 1000) {
			temp = mra_rate_XtoY(0,           diff10000*0.1, 1000, achi_100-1000);
		} else {
			temp = 0;
		}
//	console.log("achivement:" + achievement + " Lv." + difficallity + " rate value:" + temp + "/" + (Math.floor(temp/100)*100));
	temp = Math.round(Math.floor(temp/100))*100;
		
	return temp;
}
