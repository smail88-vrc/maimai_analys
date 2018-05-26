javascript:

function rate_XtoY(basis, max, gap, n)
{
	return basis+(max-basis)*n/gap;
}

function chuni_data2pdata(data)
{
	var score=data.score;
	var tmp;
	var tmp=(score>=1010000)?'SSS+0.8':
		(score>=1007500)?'SSS+' + rate_XtoY(0, 0.75, 2500, score-1007500).toFixed(4) :
		(score>=1005000)?'SS+' + rate_XtoY(0.5, 1, 2500, score-1005000).toFixed(4) :
		(score>=1000000)?'SS+' + rate_XtoY(0, 0.5, 5000, score-1000000).toFixed(4) :
		(score>= 975000)?'S+' + rate_XtoY(0, 1, 25000, score-975000).toFixed(5) :
		(score>= 950000)?'AAA+' + rate_XtoY(0, 1.5, 25000, score-950000).toFixed(5) :
		(score>= 925000)?'AA+' + rate_XtoY(0, 1.5, 25000, score-925000).toFixed(5):
		(score>= 900000)?'A+' + rate_XtoY(0, 2, 25000, score-900000).toFixed(5):
		'under A+' + (Math.floor(rate_XtoY(0,1, 900000, score)*1000000)/100).toFixed(4) + '%';
	if(data.lamp1 != "")
		tmp += '+' + data.lamp1;
	return tmp;
}

function chuni_score2rate(l, score)
{
	var base = (l.slice(-1)=='+')?Number(l.slice(0,-1) + '70'):
		(l.slice(-1)=='-')?Number(l.slice(0,-1) + '00'):
		Number(l.slice(0,-2) + l.slice(-1) + '0');

	return (score>=1007500)?base+200:
		(score>=1005000)?rate_XtoY(base+150, base+200, 2500, score-1005000):
		(score>=1000000)?rate_XtoY(base+100, base+150, 5000, score-1000000):
		(score>= 975000)?rate_XtoY(base+  0, base+100, 25000, score- 975000):
		(score>= 925000)?rate_XtoY(Math.max(base-300, 0), base+  0, 50000, score- 925000):
		(score>= 900000)?rate_XtoY(Math.max(base-500, 0), Math.max(base-300, 0),  25000, score- 900000):
		(score>= 800000)?rate_XtoY(Math.max((base-500)/2, 0), Math.max(base-500, 0), 100000, score- 800000):
		(score>= 500000)?rate_XtoY(0,                     Math.max((base-500)/2, 0), 300000, score- 500000):
		0;
}

function chuni_data2op(l, d)
{
	var score=d.score;
	var op_tmp=0;
	var base = (l.slice(-1)=='+')?Number(l.slice(0,-1) + '70'):
		(l.slice(-1)=='-')?Number(l.slice(0,-1) + '00'):
		Number(l.slice(0,-2) + l.slice(-1) + '0');
	base *= 5;

	op_tmp =(score>=1010000)?base+1400:
		(score>=1007500)?rate_XtoY(base+1000, base+1375, 2500, score-1007500):
		(score>=1005000)?rate_XtoY(base+750, base+1000, 2500, score-1005000):
		(score>=1000000)?rate_XtoY(base+500, base+750, 5000, score-1000000):
		(score>= 975000)?rate_XtoY(base+  0, base+500, 25000, score- 975000):
		(score>= 925000)?rate_XtoY(Math.max(base-1500, 0), base+  0, 50000, score- 925000):
		(score>= 900000)?rate_XtoY(Math.max(base-2500, 0), Math.max(base-1500, 0),  25000, score- 900000):
		(score>= 800000)?rate_XtoY(Math.max((base-2500)/2, 0), Math.max(base-2500, 0), 100000, score- 800000):
		(score>= 500000)?rate_XtoY(0, Math.max((base-2500)/2, 0), 300000, score- 500000):
		0;

	switch(d.lamp1)
	{
		case 'FC':	op_tmp+=50; break;
		case 'AJ':	op_tmp+=100; break;
		default:	break;
	}
	return op_tmp;
}
