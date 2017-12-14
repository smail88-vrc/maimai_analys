javascript:
var mra_update_mlist = "2017.12.05";	/* 公式の楽曲リスト更新日 タイトルに表示*/
var mra_update_llist = "2017.12.08";	/* Lv.情報、名前変更日 */
var maimai_inner_lv = [
	{levels:["8-", "11-", ""],	name:"ようこそジャパリパークへ",	nick:""},
	{levels:["8-", "11+", ""],	name:"前前前世",	nick:""},
	{levels:["9-", "11+", ""],	name:"REVIVER オルタンシア・サーガ -蒼の騎士団- オリジナルVer.",	nick:""},
	{levels:["9-", "11+", ""], 	name:"日本の米は世界一",	nick:""},
	{levels:["9-", "11-", ""],	name:"あ・え・い・う・え・お・あお!!",	nick:""},
	{levels:["8-", "11-", ""],	name:"PERFECT HUMAN",	nick:""},
	{levels:["8+", "11+", ""],	name:"SUSHI食べたい feat.ソイソース",	nick:""},
	{levels:["8-", "11+", ""],	name:"ポップミュージックは僕のもの",	nick:""},
	{levels:["8+", "11-", ""],	name:"きらっせ☆ウッド村ファーム", nick:""},
	{levels:["8-", "11+", ""],	name:"シュガーソングとビターステップ",	nick:""},
	{levels:["9-", "11-", ""],	name:"紅蓮の弓矢", nick:""},
	{levels:["7-", "8+", ""],	name:"ようかい体操第一",	nick:""},
	{levels:["7-", "9+", ""],	name:"ゲラゲラポーのうた", nick:""},
	{levels:["7-", "10-", ""],	name:"夏祭り",	nick:""},
	{levels:["10-", "11-", ""],	name:"Scatman (Ski Ba Bop Ba Dop Bop)", nick:""},
	{levels:["8+", "11-", ""],	name:"fake!fake!",	nick:""},
	{levels:["8+", "11-", ""],	name:"HIMITSUスパーク",	nick:""},
	{levels:["8-", "11-", ""],	name:"でんでんぱっしょん",	nick:""},
	{levels:["8-", "10-", ""],	name:"Dragon Night",	nick:""},
	{levels:["7+", "10-", ""],	name:"POP STAR",	nick:""},
	{levels:["8-", "10-", ""],	name:"Love or Lies",	nick:""},
	{levels:["7+", "10-", ""], 	name:"jelly",	nick:""},
	{levels:["7+", "9+", ""],	name:"美しく燃える森",	nick:""},
	{levels:["8-", "10-", ""],	name:"Love You", nick:""},
	{levels:["8+", "10-", ""],	name:"come again",	nick:""},
	{levels:["7+", "9-", "11-"],	name:"Future",	nick:""},
	{levels:["8-", "11+", ""],	name:"ウッーウッーウマウマ(ﾟ∀ﾟ)",	nick:""},
	{levels:["8+", "10-", ""],	name:"NIGHT OF FIRE",	nick:""},
	{levels:["8-", "10-", ""],	name:"YATTA!",	nick:""},
	{levels:["8+", "10+", ""],	name:"1/3の純情な感情",	nick:""},
	{levels:["8-", "10-", ""], 	name:"バラライカ",	nick:""},
	{levels:["8-", "11-", "11+"],	name:"若い力 -SEGA HARD GIRLS MIX-",	nick:""},
	{levels:["9+", "11+", ""],	name:"セハガガガンバッちゃう！！",	nick:""},
	{levels:["8+", "10+", ""],	name:"ラブリー☆えんじぇる!!",	nick:""},
	{levels:["8+", "10+", ""],	name:"Stand Up!!!!",	nick:""},
	{levels:["8+", "12-", ""],	name:"真・ハンサム体操でズンドコホイ",	nick:""},
	{levels:["8-", "11-", ""],	name:"GET!! 夢&DREAM",	nick:""},
	{levels:["8-", "10-", ""],	name:"君の知らない物語",	nick:""},
	{levels:["7+", "10+", ""],	name:"コネクト",	nick:""},
	{levels:["9-", "12-", ""],	name:"SAVIOR OF SONG",	nick:""},
	{levels:["8-", "10-", ""],	name:"Luminize",	nick:""},
	{levels:["8-", "11-", ""],	name:"秘密の扉から会いにきて",	nick:""},
	{levels:["8-", "10+", ""],	name:"イチズレシピ",	nick:""},
	{levels:["7+", "10+", ""],	name:"Daydream café",	nick:""},
	{levels:["7-", "10-", ""],	name:"ふ・れ・ん・ど・し・た・い",	nick:""},
	{levels:["7+", "10-", ""],	name:"Touch Tap Baby",	nick:""},
	{levels:["7-", "9+", ""],	name:"極上スマイル",	nick:""},
	{levels:["8+", "10-", ""],	name:"7 Girls War",	nick:""},
	{levels:["8-", "10+", ""],	name:"Jumping!!", nick:""},
	{levels:["7-", "10-", ""],	name:"ゆりゆららららゆるゆり大事件",	nick:""},
	{levels:["9-", "11-", ""],	name:"いぇす！ゆゆゆ☆ゆるゆり♪♪",	nick:""},
	{levels:["9-", "11-", ""],	name:"ちょちょちょ！ゆるゆり☆かぷりっちょ！！！",	nick:""},
	{levels:["8-", "11-", ""],	name:"未来(ソラ)の歌",	nick:""},
	{levels:["9-", "11-", ""],	name:"ホシトハナ",	nick:""},
	{levels:["9-", "12-", ""],	name:"Paradisus-Paradoxum",	nick:""},
	{levels:["8-", "11-", ""],	name:"かくしん的☆めたまるふぉ～ぜっ！",	nick:""},
	{levels:["8+", "11+", ""],	name:"ファッとして桃源郷",	nick:""},
	{levels:["9-", "12-", ""],	name:"回レ！雪月花",	nick:""},
	{levels:["7+", "10+", ""],	name:"SAKURAスキップ",	nick:""},
	{levels:["8+", "11-", ""],	name:"Now Loading!!!!",	nick:""},

];

function mra_diff2tmp(diff)
{
	var difftable =
		[["7-", 7.0], ["7+", 7.7], ["8-", 8.0], ["8+", 8.7], ["9-", 9.0], ["9+", 9.7],["10-", 10.0], 
 		 ["10+", 10.7], ["11-", 11.0], ["11+", 11.7], ["12-", 12.0], ["12+", 12.7], ["13-", 13.0],
		 ["12.O", 12.0], ["12.I", 12.1], ["12.Z", 12.2], ["12.E", 12.3], ["12.A", 12.4],
      		 ["12.S", 12.5], ["12.b", 12.6], ["12.L", 12.7], ["12.B", 12.8], ["12.q", 12.9],
		 ["13.O", 13.0], ["13.I", 13.1], ["13.Z", 13.2], ["13.E", 13.3], ["13.A", 13.4],
		 ["13.S", 13.5], ["13.b", 13.6], ["13.L", 13.7], ["13.B", 13.8], ["13.q", 13.9]];
      		 // 'O', 'I', 'Z', 'E', 'A', 'S', 'b', 'L', 'B', 'q'
      
	for(var i=0; i< difftable.length; i++)
	{
		if(0 == diff.indexOf(difftable[i][0]))
		{
			return 1*difftable[i][1];
		}
	}
	return 1*diff;
}
