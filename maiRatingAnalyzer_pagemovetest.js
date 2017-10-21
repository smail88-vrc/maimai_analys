javascript:
(function()
{

var ex_list=[], ma_list=[], re_list=[], datalist=[], addr="", your_id="", your_rating="";
var inner_lv = [
	{levels:["8-", "11.8", ""],	name:"前前前世"},
	{levels:["9-", "12.2", ""],	name:"Paradisus-Paradoxum", nickname:"Reゼロ"},
	{levels:["7+", "10.9", ""],	name:"SAKURAスキップ"},
	{levels:["8+", "11.2", ""],	name:"Now Loading!!!!"},
	{levels:["8+", "12.0", ""],	name:"真・ハンサム体操でズンドコホイ", nickname:"ハンサム体操"}, 
	{levels:["8-", "11.0", ""],	name:"GET!! 夢&DREAM", nickname:"夢&DREAM"},
	{levels:["8-", "11.2", ""],	name:"PERFECT HUMAN"},
	{levels:["8+", "11+", ""],	name:"SUSHI食べたい feat.ソイソース", nickname:"SUSHI食べたい"},
	{levels:["8-", "11+", ""],	name:"ポップミュージックは僕のもの", nickname:"ポップミュージック"},
	{levels:["8+", "11-", ""],	name:"きらっせ☆ウッド村ファーム", nickname:"ウッド村"},
	{levels:["8-", "11+", ""],	name:"シュガーソングとビターステップ", nickname:"シュガビタ"},
	{levels:["9-", "11.1", ""],	name:"紅蓮の弓矢"},
	{levels:["7-", "8.7", ""],	name:"ようかい体操第一", nickname:"ようかい体操"},
	{levels:["7-", "9.9", ""],	name:"ゲラゲラポーのうた", nickname:"ゲラゲラポー"},
	{levels:["7-", "10.4", ""],	name:"夏祭り"},
	{levels:["10-", "11.6", ""],	name:"Scatman (Ski Ba Bop Ba Dop Bop)", nickname:"Scatman"},
	{levels:["8+", "11.1", ""],	name:"fake!fake!"},
	{levels:["8+", "11-", ""],	name:"HIMITSUスパーク"},
	{levels:["8-", "11.2", ""],	name:"でんでんぱっしょん"},
	{levels:["8-", "10.2", ""],	name:"Dragon Night"},
	{levels:["9-", "11+", ""],	name:"Can Do"},
	{levels:["9-", "10.8", ""],	name:"The Other self"},
	{levels:["9-", "10.7", ""],	name:"カノン"},
	{levels:["9-", "10.4", ""],	name:"オルフェ"},
	{levels:["8-", "10.5", ""],	name:"ヘタリアン☆ジェット", nickname:"ヘタリアン"},
	{levels:["7+", "10.4", ""],	name:"POP STAR"},
	{levels:["8-", "10.1", ""],	name:"Love or Lies"},
	{levels:["7+", "10.1", ""],	name:"jelly"},
	{levels:["7+", "9.7", ""],	name:"美しく燃える森"},
	{levels:["8-", "10.6", ""],	name:"Love You"},
	{levels:["8+", "10.1", ""],	name:"come again"},
	{levels:["7+", "9.5", "11.3"],	name:"Future"},
	{levels:["8-", "11+", ""],	name:"ウッーウッーウマウマ(ﾟ∀ﾟ)", nickname:"ウマウマ"},
	{levels:["8+", "10.1", ""],	name:"NIGHT OF FIRE"},
	{levels:["8-", "10.0", ""],	name:"YATTA!"},
	{levels:["8+", "10.9", ""],	name:"1/3の純情な感情"},
	{levels:["8-", "10.0", ""],	name:"バラライカ"},
	{levels:["8+", "11.5", ""],	name:"ココロオドル"},
	{levels:["8-", "11.1", "11.7"],	name:"若い力 -SEGA HARD GIRLS MIX-", nickname:"若い力"},
	{levels:["9+", "12.0", ""],	name:"セハガガガンバッちゃう！！", nickname:"セハガール"},
	{levels:["8+", "10.8", ""],	name:"ラブリー☆えんじぇる!!"},
	{levels:["8+", "10.5", ""],	name:"Stand Up!!!!"},
	{levels:["9-", "11+", ""],	name:"naraku within"},
	{levels:["8-", "10.7", ""],	name:"ほとんど違法行為"},
	{levels:["8-", "10.4", ""],	name:"君の知らない物語"},
	{levels:["8-", "10.6", ""],	name:"シリウス"},
	{levels:["7+", "10.8", ""],	name:"コネクト"},
	{levels:["9-", "12.4", ""],	name:"SAVIOR OF SONG", nickname:"SAVIOR"},
	{levels:["8-", "9.8", ""],	name:"Luminize"},
	{levels:["8-", "11.0", ""],	name:"秘密の扉から会いにきて", nickname:"秘密の扉"},
	{levels:["9-", "11+", ""],	name:"青春はNon-Stop！"},
	{levels:["9-", "12.3", ""],	name:"Falling Roses"},
	{levels:["8-", "10.7", ""],	name:"イチズレシピ"},
	{levels:["7+", "10.2", ""],	name:"Daydream café"},
	{levels:["7-", "10.3", ""],	name:"ふ・れ・ん・ど・し・た・い", nickname:"ふれんどしたい"},
	{levels:["7+", "10.5", ""],	name:"Touch Tap Baby"},
	{levels:["7-", "9.8", ""],	name:"極上スマイル"},
	{levels:["8+", "10.2", ""],	name:"7 Girls War"},
	{levels:["8-", "10.7", ""],	name:"Jumping!!"},
	{levels:["7-", "10.2", ""],	name:"ゆりゆららららゆるゆり大事件", nickname:"ゆるゆり大事件"},
	{levels:["9-", "11.2", ""],	name:"いぇす！ゆゆゆ☆ゆるゆり♪♪", nickname:"ゆゆゆゆるゆり"},
	{levels:["9-", "11-", ""],	name:"ちょちょちょ！ゆるゆり☆かぷりっちょ！！！", nickname:"かぶりっちょ"},
	{levels:["8-", "11.0", ""],	name:"かくしん的☆めたまるふぉ～ぜっ！", nickname:"うまる"},
	{levels:["8+", "11.7", ""],	name:"ファッとして桃源郷", nickname:"桃源郷"},
	{levels:["9-", "12.5", ""],	name:"回レ！雪月花"},
	{levels:["9+", "12.4", ""],	name:"リンカーネイション"},
	{levels:["9-", "12.5", ""],	name:"六兆年と一夜物語"},
	{levels:["9-", "12.0", ""],	name:"ちがう!!!"},
	{levels:["9+", "11.8", ""],	name:"バッド・ダンス・ホール"},
	{levels:["8-", "10.5", ""],	name:"東京レトロ"},
	{levels:["10-", "12.3", ""],	name:"ARROW"},
	{levels:["9+", "11.7", ""],	name:"ヘルシーエンド"},
	{levels:["8-", "10.7", ""],	name:"ラブチーノ"},
	{levels:["9-", "12.2", "12.9"],	name:"ロストワンの号哭"},
	{levels:["9-", "12.2", ""],	name:"千本桜"},
	{levels:["9-", "11.8", ""],	name:"チュルリラ・チュルリラ・ダッダッダ！", nickname:"チュルリラ"},
	{levels:["8-", "12.4", ""],	name:"ウミユリ海底譚", nickname:"ウミユリ"},
	{levels:["10-", "12.8", ""],	name:"初音ミクの消失", nickname:"消失"},
	{levels:["9-", "11.6", ""],	name:"天ノ弱"},
	{levels:["9-", "12.3", ""],	name:"厨病激発ボーイ", nickname:"厨病"},
	{levels:["10+", "12.7", ""],	name:"脳漿炸裂ガール", nickname:"脳漿"},
	{levels:["9-", "12.0", ""],	name:"+♂"},
	{levels:["9-", "11+", ""],	name:"おこちゃま戦争"},
	{levels:["8+", "10.9", ""],	name:"だんだん早くなる"},
	{levels:["8-", "10.0", ""],	name:"恋愛裁判"},
	{levels:["8+", "10.6", "11.8"],	name:"からくりピエロ"},
	{levels:["9-", "11.3", ""],	name:"ゴーストルール"},
	{levels:["8-", "10.9", ""],	name:"おじゃま虫"},
	{levels:["9-", "11+", ""],	name:"ストリーミングハート"},
	{levels:["9-", "10.3", ""],	name:"妄想税"},
	{levels:["9-", "12.3", ""],	name:"毒占欲"},
	{levels:["8+", "10.4", ""],	name:"むかしむかしのきょうのぼく"},
	{levels:["8+", "11+", ""],	name:"二息歩行"},
	{levels:["9-", "10.9", ""],	name:"モザイクロール"},
	{levels:["9-", "11.2", ""],	name:"弱虫モンブラン", nickname:"モンブラン"},
	{levels:["9+", "11+", ""],	name:"39"},
	{levels:["7+", "11.0", ""],	name:"＊ハロー、プラネット。", nickname:"ハロプラ"},
	{levels:["8+", "11+", ""],	name:"Mr. Wonderland"},
	{levels:["10-", "12.3", ""],	name:"吉原ラメント", nickname:"ラメント"},
	{levels:["8-", "11.0", ""],	name:"ココロ"},
	{levels:["9+", "11+", ""],	name:"ゆっくりしていってね！！！"},
	{levels:["9-", "11+", ""],	name:"生きてるおばけは生きている", nickname:"生きてるおばけ"},
	{levels:["8-", "10.7", ""],	name:"踊れオーケストラ"},
	{levels:["9-", "11.4", ""],	name:"クノイチでも恋がしたい", nickname:"クノイチ"},
	{levels:["7-", "10.3", "11+"],	name:"いーあるふぁんくらぶ", nickname:"いーある"},
	{levels:["8-", "12.1", ""],	name:"赤心性：カマトト荒療治", nickname:"カマトト"},
	{levels:["8-", "11.0", ""],	name:"イノコリ先生"},
	{levels:["9+", "12.5", ""],	name:"ECHO"},
	{levels:["9-", "11.4", ""],	name:"キミノヨゾラ哨戒班", nickname:"キミノヨゾラ"},
	{levels:["8+", "11.1", ""],	name:"しんでしまうとはなさけない！"},
	{levels:["8+", "11.4", ""],	name:"パーフェクト生命"},
	{levels:["8+", "11.4", ""],	name:"やめろ！聴くな！"},
	{levels:["7+", "9.8", ""],	name:"東京リアルワールド"},
	{levels:["8-", "11.0", ""],	name:"すろぉもぉしょん"},
	{levels:["9.7", "12.7", ""],	name:"頓珍漢の宴"},
	{levels:["8-", "12.0", ""],	name:"ありふれたせかいせいふく", nickname:"せかいせいふく"},
	{levels:["8-", "11.4", ""],	name:"絵の上手かった友達"},
	{levels:["10-", "12.0", ""],	name:"腐れ外道とチョコレゐト", nickname:"腐れ外道"},
	{levels:["8+", "11+", ""],	name:"はじめまして地球人さん", nickname:"地球人さん"},
	{levels:["8+", "10.3", ""],	name:"アゲアゲアゲイン"},
	{levels:["9-", "11.5", ""],	name:"M.S.S.Planet"},
	{levels:["8+", "10.8", ""],	name:"不毛！"},
	{levels:["9-", "11+", ""],	name:"ネトゲ廃人シュプレヒコール", nickname:"ネトゲ廃人"},
	{levels:["9+", "11.3", ""],	name:"炉心融解"},
	{levels:["9-", "11.0", ""],	name:"StargazeR"},
	{levels:["9-", "11+", ""],	name:"Just Be Friends"},
	{levels:["8+", "10.8", ""],	name:"LOL -lots of laugh-", nickname:"LOL"},
	{levels:["7+", "10.6", ""],	name:"みくみくにしてあげる♪【してやんよ】", nickname:"みくみく"},
	{levels:["9+", "11.3", ""],	name:"Sweet Devil"},
	{levels:["8-", "11.6", ""],	name:"クローバー♣クラブ", nickname:"クローバークラブ"},
	{levels:["8-", "11.7", ""],	name:"深海少女"},
	{levels:["8-", "11.3", ""],	name:"SPiCa"},
	{levels:["8-", "11.4", ""],	name:"ぽっぴっぽー"},
	{levels:["9+", "12.5", ""],	name:"Nyan Cat EX"},
	{levels:["9+", "11+", ""],	name:"どういうことなの！？"},
	{levels:["9+", "12.3", ""],	name:"どうしてこうなった"},
	{levels:["9-", "12.1", ""],	name:"ダブルラリアット"},
	{levels:["10-", "12.6", ""],	name:"magician's operation", nickname:"マジオペ"},
	{levels:["8-", "12.3", ""],	name:"トルコ行進曲 - オワタ＼(^o^)／", nickname:"オワタ"},
	{levels:["8-", "9.9", ""],	name:"リリリリ★バーニングナイト", nickname:"リリリリ"},
	{levels:["8-", "9.9", ""],	name:"イアイア★ナイトオブデザイア", nickname:"イアイア"},
	{levels:["7+", "10.4", ""],	name:"ルカルカ★ナイトフィーバー", nickname:"ルカルカ"},
	{levels:["7-", "9.9", ""],	name:"メグメグ☆ファイアーエンドレスナイト", nickname:"メグメグ"},
	{levels:["8-", "9.2", ""],	name:"教えて!! 魔法のLyric", nickname:"魔法のLyric"},
	{levels:["7-", "10.8", ""],	name:"おちゃめ機能"},
	{levels:["9-", "11.0", ""],	name:"BAD∞END∞NIGHT", nickname:"バドエン"},
	{levels:["7-", "10.8", ""],	name:"shake it!"},
	{levels:["8-", "10.3", ""],	name:"Heart Beats"},
	{levels:["7-", "9.9", ""],	name:"Sweetiex2"},
	{levels:["9-", "10.5", "12.1"],	name:"ロミオとシンデレラ", nickname:"ロミシン"},
	{levels:["8-", "10.8", ""],	name:"ハッピーシンセサイザ", nickname:"ハピシン"},
	{levels:["9-", "10.5", ""],	name:"ダンシング☆サムライ"},
	{levels:["8-", "10.7", ""],	name:"ハロ／ハワユ"},
	{levels:["8+", "9.7", "11-"],	name:"Tell Your World"},
	{levels:["8+", "11.2", ""],	name:"Hand in Hand"},
	{levels:["10-", "11.6", ""],	name:"アンハッピーリフレイン", nickname:"アンハッピー"},
	{levels:["9+", "12.6", ""],	name:"裏表ラバーズ"},
	{levels:["8-", "11.5", ""],	name:"ローリンガール"},
	{levels:["7-", "10.6", "12.1"],	name:"ワールズエンド・ダンスホール", nickname:"ワールズエンド"},
	{levels:["8-", "9.9", "11+"],	name:"マトリョシカ"},
	{levels:["8-", "9.7", ""],	name:"パンダヒーロー"},
	{levels:["9+", "10.6", ""],	name:"ゴーゴー幽霊船"},
	{levels:["9-", "11.2", ""],	name:"セツナトリップ"},
	{levels:["9-", "11-", ""],	name:"放課後ストライド"},
	{levels:["9+", "11.0", ""],	name:"カゲロウデイズ"},
	{levels:["10-", "12.0", ""],	name:"夜咄ディセイブ"},
	{levels:["7+", "10.1", ""],	name:"メランコリック"},
	{levels:["7+", "9.2", "11-"],	name:"ZIGG-ZAGG"},
	{levels:["7+", "10.6", ""],	name:"I ♥"},
	{levels:["9-", "10.5", ""],	name:"スイートマジック"},
	{levels:["9-", "10.7", ""],	name:"林檎華憐歌"},
	{levels:["9-", "12.3", ""],	name:"木彫り鯰と右肩ゾンビ"},
	{levels:["9-", "12.4", ""],	name:"デッドレッドガールズ"},
	{levels:["9-", "10.6", ""],	name:"One Step Ahead"},
	{levels:["7-", "10.5", ""],	name:"Link"},
	{levels:["7+", "9.8", ""],	name:"ひみつをちょーだい"},
	{levels:["7+", "10.2", ""],	name:"夏にキスしていいですか？"},
	{levels:["9-", "12.0", ""],	name:"すーぱーぬこになりたい"},
	{levels:["9-", "12.2", ""],	name:"チルノのパーフェクトさんすう教室　⑨周年バージョン", nickname:"チルノ⑨周年"},
	{levels:["8-", "11.3", ""],	name:"華鳥風月"},
	{levels:["8-", "11-", ""],	name:"色は匂へど散りぬるを", nickname:"色は匂へど"},
	{levels:["8+", "11+", ""],	name:"月に叢雲華に風", nickname:"月に叢雲"},
	{levels:["9-", "11.9", ""],	name:"オーディエンスを沸かす程度の能力 feat.タイツォン", nickname:"オーディエンス"},
	{levels:["9-", "11.7", ""],	name:"妖精村の月誕祭 ～Lunate Elf", nickname:"妖精村"},
	{levels:["8+", "11.1", ""],	name:"Starlight Dance Floor"},
	{levels:["8+", "11+", ""],	name:"宿題が終わらないっ！"},
	{levels:["9-", "11.4", ""],	name:"東方スイーツ！～鬼畜姉妹と受難メイド～"},
	{levels:["9-", "11.7", ""],	name:"taboo tears you up"},
	{levels:["9+", "11.4", ""],	name:"Starlight Vision"},
	{levels:["9-", "12.3", ""],	name:"幽闇に目醒めしは", nickname:"幽闇"},
	{levels:["8-", "11.6", ""],	name:"物凄い勢いでけーねが物凄いうた", nickname:"けーね"},
	{levels:["9+", "11+", ""],	name:"Club Ibuki in Break All", nickname:"Club Ibuki"},
	{levels:["8+", "11.7", ""],	name:"チルノのパーフェクトさんすう教室", nickname:"チルノ"},
	{levels:["7+", "11+", ""],	name:"魔理沙は大変なものを盗んでいきました", nickname:"魔理沙"},
	{levels:["9-", "12.6", "12.9"],	name:"患部で止まってすぐ溶ける～狂気の優曇華院", nickname:"患部～優曇華"},
	{levels:["9-", "10.9", ""],	name:"究極焼肉レストラン！お燐の地獄亭！", nickname:"焼肉レストラン"},
	{levels:["9-", "10.8", ""],	name:"お嫁にしなさいっ！"},
	{levels:["9+","11+", ""],	name:"キャプテン・ムラサのケツアンカー", nickname:"ケツアンカー"},
	{levels:["9-", "11.4", ""],	name:"ひれ伏せ愚民どもっ！", nickname:"愚民ども"},
	{levels:["7-", "11+", ""],	name:"Grip & Break down !!", nickname:"Grip"},
	{levels:["9-", "12.5", ""],	name:"Cosmic Magic Shooter"},
	{levels:["8-", "10.7", ""],	name:"しゅわスパ大作戦☆", nickname:"しゅわスパ"},
	{levels:["8+", "10.9", ""],	name:"全人類ノ非想天則", nickname:"非想天則"},
	{levels:["9-", "11+", ""],	name:"Endless, Sleepless Night", nickname:"かにぱん"},
	{levels:["9-", "12.0", ""],	name:"No Routine"},
	{levels:["10+", "12.7", ""],	name:"Scream out! -maimai SONIC WASHER Edit-", nickname:"Scream out"},
	{levels:["9-", "12.9", ""],	name:"幻想のサテライト"},
	{levels:["8-", "11.4", ""],	name:"待チ人ハ来ズ。"},
	{levels:["8-", "11.4", ""],	name:"響縁"},
	{levels:["9-", "11.2", ""],	name:"囲い無き世は一期の月影", nickname:"囲い無き世は"},
	{levels:["9-", "12.6", ""],	name:"儚きもの人間"},
	{levels:["9-", "11.2", ""],	name:"sweet little sister"},
	{levels:["9-", "11.0", ""],	name:"ケロ⑨destiny"},
	{levels:["9+", "12.0", ""],	name:"Phantasm Brigade"},
	{levels:["9-", "12.0", ""],	name:"蒼空に舞え、墨染の桜", nickname:"墨染の桜"},
	{levels:["8-", "10.4", ""],	name:"フラグメンツ -T.V. maimai edit-", nickname:"フラグメンツ"},
	{levels:["8-", "11-", ""],	name:"橙の幻想郷音頭", nickname:"幻想郷音頭"},
	{levels:["7+", "11.4", ""],	name:"神々の祈り"},
	{levels:["8+", "11.0", ""],	name:"願いを呼ぶ季節"},
	{levels:["8-", "10.7", "11.0"],	name:"明星ロケット"},
	{levels:["9-", "11+", "12.4"],	name:"緋色のDance"},
	{levels:["9-", "10.9", ""],	name:"YU-MU"},
	{levels:["9+", "12.0", ""],	name:"エテルニタス・ルドロジー"},
	{levels:["8-", "10.6", "11+"],	name:"エピクロスの虹はもう見えない", nickname:"エピクロス"},
	{levels:["9-", "12.0", ""],	name:"四次元跳躍機関", nickname:"四次元"},
	{levels:["9-", "12.3", ""],	name:"少女幻葬戦慄曲 ～ Necro Fantasia", nickname:"ネクロ"},
	{levels:["8+", "11.5", ""],	name:"Jimang Shot", nickname:"じまんぐ"},
	{levels:["8-", "10.7", "11.5"],	name:"ってゐ！ ～えいえんてゐVer～", nickname:"てゐ"},
	{levels:["8-", "11.3", ""],	name:"東方妖々夢 ～the maximum moving about～", nickname:"東方妖々夢"},
	{levels:["8+", "11.1", ""],	name:"Yet Another ”drizzly rain”", nickname:"drizzly"},
	{levels:["7-", "9.9", ""],	name:"シアワセうさぎ"},
	{levels:["9-", "11-", ""],	name:"最速最高シャッターガール", nickname:"シャッターガール"},
	{levels:["10-", "12.7", ""],	name:"最終鬼畜妹・一部声", nickname:"最終鬼畜妹"},
	{levels:["9-", "12.7", ""],	name:"ウサテイ"},
	{levels:["9+", "10.4", ""],	name:"Help me, ERINNNNNN!!", nickname:"えーりん"},
	{levels:["10-", "11+", "13.2"],	name:"ナイト・オブ・ナイツ", nickname:"ナイツ"},
	{levels:["8+", "10.9", "12.3"],	name:"Bad Apple!! feat nomico", nickname:"Bad Apple"},
	{levels:["9-", "10.8", ""],	name:"CALL HEAVEN!!"},
	{levels:["8+", "11.0", ""],	name:"Sunshine world tour"},
	{levels:["9-", "11.5", ""],	name:"終わりなき物語"},
	{levels:["9-", "11.1", ""],	name:"Our Fighting"},
	{levels:["8+", "11.9", "11.9"],	name:"Save This World νMIX"},
	{levels:["8+", "10.5", "11.4"],	name:"Living Universe"},
	{levels:["10-", "10.7", ""],	name:"Ignite Infinity"},
	{levels:["10-", "11.6", ""],	name:"Garden Of The Dragon"},
	{levels:["9-", "12.4", ""],	name:"Reach For The Stars", nickname:"リーチ"},
	{levels:["9-", "11.8", ""],	name:"Live & Learn"},
	{levels:["9-", "12.5", ""],	name:"Back 2 Back"},
	{levels:["9-", "11.3", ""],	name:"Windy Hill -Zone 1"},
	{levels:["8-", "11-", "11.3"],	name:"City Escape: Act1"},
	{levels:["9+", "10.1", "11.8"],	name:"Rooftop Run: Act1"},
	{levels:["8+", "11-", ""],	name:"時空を超えて久しぶり！"},
	{levels:["9-", "10.3", ""],	name:"Her Dream Is To Be A Fantastic Sorceress"},
	{levels:["7-", "11.8", ""],	name:"キズナの物語"},
	{levels:["9+", "12.2", ""],	name:"STAIRWAY TO GENERATION"},
	{levels:["10-", "12.5", ""],	name:"Last Brave ～ Go to zero"},
	{levels:["11.5", "11.5", ""],	name:"Urban Crusher [Remix]"},
	{levels:["9-", "10.6", ""],	name:"Catch The Future"},
	{levels:["8-", "11.7", ""],	name:"awake"},
	{levels:["9+", "12.1", ""],	name:"Terminal Storm"},
	{levels:["10-", "11+", ""],	name:"After Burner"},
	{levels:["9+", "12.5", ""],	name:"Space Harrier Main Theme [Reborn]"},
	{levels:["10-", "11.6", ""],	name:"Quartet Theme [Reborn]"},
	{levels:["9-", "11.2", ""],	name:"Sky High [Reborn]"},
	{levels:["9+", "12.5", ""],	name:"Like the Wind [Reborn]"},
	{levels:["11-", "11.7", ""],	name:"YA･DA･YO [Reborn]"},
	{levels:["10-", "10.1", ""],	name:"Natural Flow"},
	{levels:["8-", "9.9", ""],	name:"Crush On You"},
	{levels:["7+", "9.1", ""],	name:"Sun Dance"},
	{levels:["8-", "10.1", ""],	name:"In Chaos"},
	{levels:["10-", "10.5", ""],	name:"Beat Of Mind"},
	{levels:["9-", "12.1", ""],	name:"JACKY [Remix]"},
	{levels:["10-", "12.2", ""],	name:"Mysterious Destiny"},
	{levels:["9+", "10.0", ""],	name:"Riders Of The Light"},
	{levels:["7-", "11.5", ""],	name:"コトバ・カラフル"},
	{levels:["8-", "11+", ""],	name:"天国と地獄"},
	{levels:["8-", "10.6", ""],	name:"きみのためなら死ねる"},
	{levels:["8+", "10.0", ""],	name:"The Great Journey"},
	{levels:["9-", "10.2", "12.5"],	name:"Burning Hearts ～炎のANGEL～"},
	{levels:["8-", "10.5", ""],	name:"かせげ！ジャリンコヒーロー"},
	{levels:["9-", "12.3", ""],	name:"ココロスキャンのうた"},
	{levels:["10-", "10.8", ""],	name:"超絶！Superlative"},
	{levels:["10-", "11.2", ""],	name:"采配の刻 Power of order"},
	{levels:["11-", "12.0", ""],	name:"DO RORO DERODERO ON DO RORO"},
	{levels:["9-", "10.8", ""],	name:"源平大戦絵巻テーマソング"},
	{levels:["8+", "11.3", ""],	name:"怪盗Rのテーマ"},
	{levels:["7-", "10.1", ""],	name:"マリアをはげませ"},
	{levels:["7+", "10.1", ""],	name:"SHOW TIME"},
	{levels:["9+", "11+", ""],	name:"円舞曲、君に"},
	{levels:["10-", "11-", ""],	name:"御旗のもとに"},
	{levels:["9-", "10.7", ""],	name:"地上の戦士"},
	{levels:["8-", "8.7", "11.0"],	name:"檄！帝国華撃団(改)"},
	{levels:["9-", "12.9", ""],	name:"Outlaw's Lullaby"},
	{levels:["9-", "11+", ""],	name:"Brand-new Japanesque"},
	{levels:["9-", "12.6", ""],	name:"鼓動"},
	{levels:["10-", "11.1", ""],	name:"神室雪月花"},
	{levels:["7-", "12.1", ""],	name:"KONNANじゃないっ！"},
	{levels:["9-", "11.6", ""],	name:"セガサターン起動音[H.][Remix]"},
	{levels:["10-", "12.8", ""],	name:"GO BACK 2 YOUR RAVE"},
	{levels:["10-", "12.9", ""],	name:"B.B.K.K.B.K.K."},
	{levels:["11.0", "12.8", ""],	name:"人里に下ったアタイがいつの間にか社畜になっていた件"},
	{levels:["10+", "12.8", ""],	name:"Maxi"},
	{levels:["9+", "12.1", ""],	name:"KISS CANDY FLAVOR"},
	{levels:["8+", "11+", ""],	name:"H-A-J-I-M-A-R-I-U-T-A-!!"},
	{levels:["9-", "11-", ""],	name:"Star☆Glitter"},
	{levels:["10+", "12.9", ""],	name:"conflict"},
	{levels:["10-", "12.5", ""],	name:"Party 4U ”holy nite mix”"},
	{levels:["9+", "11.8", ""],	name:"GOODMEN"},
	{levels:["10+", "12.6", ""],	name:"Sakura Fubuki"},
	{levels:["10-", "12.8", ""],	name:"METATRON"},
	{levels:["9-", "11.5", ""],	name:"オモイヨシノ"},
	{levels:["9-", "12.5", ""],	name:"L9"},
	{levels:["10-", "12.9", ""],	name:"Jack-the-Ripper◆"},
	{levels:["11.4", "12.8", ""],	name:"DRAGONLADY"},
	{levels:["9+", "11.4", ""],	name:"Pursuing My True Self"},
	{levels:["9+", "11.7", ""],	name:"Signs Of Love (“Never More” ver.)"},
	{levels:["9-", "11.4", ""],	name:"specialist (“Never More” ver.)"},
	{levels:["9-", "12.3", ""],	name:"Time To Make History (AKIRA YAMAOKA Remix)"},
	{levels:["8-", "11+", ""],	name:"レッツゴー!陰陽師"},
	{levels:["9-", "11+", ""],	name:"オパ! オパ! RACER -GMT mashup-"},
	{levels:["10-", "12.6", ""],	name:"電車で電車でOPA!OPA!OPA! -GMT mashup-"},
	{levels:["10-", "11.7", ""],	name:"リッジでリッジでGO!GO!GO! -GMT mashup-"},
	{levels:["7+", "11.3", ""],	name:"電車で電車でGO!GO!GO!GC! -GMT remix-"},
	{levels:["10-", "11.7", ""],	name:"RIDGE RACER STEPS -GMT remix-"},
	{levels:["9-", "11.5", ""],	name:"ファンタジーゾーン OPA-OPA! -GMT remix-"},
	{levels:["10-", "12.5", ""],	name:"DADDY MULK -Groove remix-"},
	{levels:["10-", "13.1", ""],	name:"FUJIN Rumble"},
	{levels:["10+", "12.7", ""],	name:"Got more raves？"},
	{levels:["11.0", "12.9", ""],	name:"夜明けまであと３秒"},
	{levels:["10+", "12.9", ""],	name:"Ignis Danse"},
	{levels:["11-", "12.8", ""],	name:"きたさいたま2000"},
	{levels:["9-", "12.7", ""],	name:"Scars of FAUNA"},
	{levels:["10-", "12.6", ""],	name:"FLOWER"},
	{levels:["10.5", "12.8", ""],	name:"デスパレイト"},
	{levels:["11-", "13.3", ""],	name:"Moon of Noon"},
	{levels:["11-", "12.9", ""],	name:"Ultranova"},
	{levels:["10-", "12.8", ""],	name:"KING is BACK!!"},
	{levels:["10-", "12.0", ""],	name:"曖昧mind"},
	{levels:["9+", "11.9", ""],	name:"Limit Break"},
	{levels:["10.0", "12.0", ""],	name:"ユビキリ"},
	{levels:["9+", "11+", ""],	name:"オトヒメモリー☆ウタゲーション"},
	{levels:["9+", "12.7", ""],	name:"夢花火"},
	{levels:["9+", "11+", ""],	name:"いっしそう電☆舞舞神拳！"},
	{levels:["11-", "13.2", ""],	name:"Panopticon"},
	{levels:["10+", "12.9", ""],	name:"四月の雨"},
	{levels:["11.5", "13.1", ""],	name:"ねぇ、壊れタ人形ハ何処へ棄テらレるノ？"},
	{levels:["10-", "12.4", ""],	name:"Imitation:Loud Lounge"},
	{levels:["10+", "12.9", ""],	name:"HERA"},
	{levels:["10-", "12.6", ""],	name:"Selector"},
	{levels:["11+", "13.3", ""],	name:"AMAZING MIGHTYYYY!!!!"},
	{levels:["10+", "13.2", ""],	name:"CITRUS MONSTER"},
	{levels:["11.0", "12.8", ""],	name:"Hyper Active"},
	{levels:["10+", "12.8", ""],	name:"Jumble Rumble"},
	{levels:["10-", "12.9", ""],	name:"Nitrous Fury"},
	{levels:["10-", "12.4", ""],	name:"Revive The Rave"},
	{levels:["10-", "12.7", ""],	name:"GEMINI -M-"},
	{levels:["9-", "12.4", ""],	name:"スリップフリップ"},
	{levels:["11.3", "12.9", ""],	name:"天火明命"},
	{levels:["10-", "12.8", ""],	name:"7thSense"},
	{levels:["10+", "12.9", ""],	name:"Lividi"},
	{levels:["10+", "13.3", ""],	name:"Axeria"},
	{levels:["10-", "12.7", ""],	name:"閃鋼のブリューナク"},
	{levels:["10+", "13.3", ""],	name:"ガラテアの螺旋"},
	{levels:["11.0", "13.0", ""],	name:"Caliburne ～Story of the Legendary sword～"},
	{levels:["11-", "13.4", ""],	name:"Our Wrenally"},
	{levels:["11-", "13.2", ""],	name:"Contrapasso -paradiso-"},
	{levels:["10.0", "13.0", ""],	name:"Oshama Scramble!"},
	{levels:["11.0", "12.8", ""],	name:"Garakuta Doll Play"},
	{levels:["10-", "11.9", "11.7"],	name:"Blew Moon"},
	{levels:["11-", "12.2", ""],	name:"We Gonna Party"},
	{levels:["10.4", "12.9", ""],	name:"MYTHOS"},
	{levels:["10+", "12.4", ""],	name:"Life Feels Good"},
	{levels:["11-", "13.1", ""],	name:"Glorious Crown"},
	{levels:["10.6", "12.9", ""],	name:"Aiolos"},
	{levels:["9+", "12.6", ""],	name:"LANCE"},
	{levels:["9-", "12.0", ""],	name:"Dragoon"},
	{levels:["10-", "12.4", ""],	name:"Death Scythe"},
	{levels:["10-", "11.1", ""],	name:"LUCIA"},
	{levels:["10-", "12.7", ""],	name:"DON’T  STOP  ROCKIN’"},
	{levels:["10-", "12.5", ""],	name:"oboro"},
	{levels:["9.2", "12.6", ""],	name:"CYCLES"},
	{levels:["9+", "12.3", ""],	name:"Lionheart"},
	{levels:["10-", "11-", ""],	name:"Heartbeats"},
	{levels:["10-", "11+", ""],	name:"Acceleration"},
	{levels:["10-", "11.3", ""],	name:"End of Twilight"},
	{levels:["9-", "11.3", ""],	name:"JUMPIN' JUMPIN'"},
	{levels:["9+", "12.4", ""],	name:"L'épilogue"},
	{levels:["10-", "12.6", ""],	name:"FEEL ALIVE"},
	{levels:["9+", "12.2", ""],	name:"FEEL the BEATS"},
	{levels:["9-", "11+", ""],	name:"BREAK YOU!!"},
	{levels:["10+", "12.2", ""],	name:"Streak"},
	{levels:["10+", "12.2", ""],	name:"Spin me harder"},
	{levels:["11-", "12.2", ""],	name:"Turn around"},
	{levels:["10+", "10.9", ""],	name:"Link"},
	{levels:["11.6", "11-", ""],	name:"Black Out"},
	{levels:["11-", "13.1", ""],	name:"Fragrance"},
	{levels:["10-", "12.8", ""],	name:"Nerverakes"},
	{levels:["9-", "11.2", ""],	name:"Sprintrances"},
	{levels:["9+", "12.2", ""],	name:"air's gravity"},
	{levels:["9+", "11.5", ""],	name:"Night Fly"},
	{levels:["9+", "11+", ""],	name:"Feel My Fire"},
	{levels:["10-", "10.6", "11-"],	name:"Starlight Disco"},
	{levels:["9-", "11+", ""],	name:"記憶、記録"},
	{levels:["9-", "11.1", ""],	name:"connecting with you"},
	{levels:["9-", "11.1", ""],	name:"アージェントシンメトリー"},
	{levels:["9+", "11.2", ""],	name:"Dreampainter"},
	{levels:["9-", "11.0", ""],	name:"Monochrome Rainbow"},
	{levels:["10-", "12.1", ""],	name:"Beat of getting entangled"},
	{levels:["9-", "11.3", ""],	name:"MIRROR of MAGIC"},
	{levels:["9-", "10.9", ""],	name:"Cosmic Train"},
	{levels:["9+", "11+", ""],	name:"高気圧ねこロック"},
	{levels:["10-", "13.3", ""],	name:"Prophesy One"},
	{levels:["9-", "10.7", ""],	name:"BETTER CHOICE"},
	{levels:["10+", "12.2", ""],	name:"Get Happy"},
	{levels:["11-", "13.0", ""],	name:"System “Z”"},
	{levels:["10-", "13.2", ""],	name:"VERTeX"},
	{levels:["9-", "13.1", ""],	name:"ジングルベル"},
	{levels:["10-", "12.3", ""],	name:"火炎地獄"},
	{levels:["9-", "11+", ""],	name:"Danza zandA"},
	{levels:["9+", "11+", ""],	name:"planet dancer"},
	{levels:["9-", "10.6", ""],	name:"ナミダと流星"},
	{levels:["9+", "12.2", ""],	name:"ピーマンたべたら"},
	{levels:["8-", "9.9", ""],	name:"maimaiちゃんのテーマ"},
	{levels:["8-", "10.9", ""],	name:"Pixel Voyage"},
	{levels:["8-", "9.7", ""],	name:"Sweets×Sweets"},
	{levels:["9-", "10.8", ""],	name:"虹と太陽"},
	{levels:["8-", "10.1", ""],	name:"Color My World"},
	{levels:["8+", "9.8", ""],	name:"True Love Song"},
	{levels:["7+", "9.3", ""],	name:"デコボコ体操第二"},
	{levels:["9+", "11.7", ""],	name:"ソーラン☆節"},
	{levels:["8+", "11+", ""],	name:"おても☆Yan"},
	{levels:["8-", "11.7", ""],	name:"炭★坑★節"},
	{levels:["7-", "10.6", ""],	name:"ネコ日和。"},
	{levels:["8+", "10.1", ""],	name:"犬日和。"},
	{levels:["9+", "10.7", ""],	name:"Endless World"},
	{levels:["10-", "11.0", ""],	name:"Backyun! －悪い女－"},
	{levels:["10-", "10.1", ""],	name:"BaBan!! －甘い罠－"},
	{levels:["8+", "10.3", ""],	name:"オレンジの夏"},
	{levels:["9-", "10.8", ""],	name:"ぴぴぱぷぅ！"},
	{levels:["10-", "12.3", ""],	name:"炎歌 -ほむらうた-"},
	{levels:["9-", "10.6", ""],	name:"泣き虫O'clock"},
	{levels:["9+", "11.3", ""],	name:"maiム・maiム feat.週刊少年マガジン"},
	{levels:["8-", "11.5", ""],	name:"タカハせ！名人マン"},
	{levels:["9-", "11.5", ""],	name:"みんなのマイマイマー"},
	{levels:["8-", "11.2", ""],	name:"welcome to maimai!! with マイマイマー"},
	{levels:["8-", "10.7", ""],	name:"ぐるぐるWASH！コインランドリー・ディスコ"},
	{levels:["9-", "12.0", ""],	name:"Infantoon Fantasy"},
	{levels:["9-", "11+", ""],	name:"幾四音-Ixion-"},
	{levels:["9-", "10.7", ""],	name:"Counselor"},
	{levels:["8-", "11-", ""],	name:"Invitation"},
	{levels:["9-", "11-", ""],	name:"その群青が愛しかったようだった"},
	{levels:["11-", "13.0", ""],	name:"The wheel to the right"},
	{levels:["9+", "12.0", ""],	name:"光線チューニング"},
	{levels:["9-", "12.4", ""],	name:"心象蜃気楼"},
	{levels:["9-", "11.7", ""],	name:"ハート・ビート"},
	{levels:["9+", "11-", ""],	name:"brilliant better"},
	{levels:["7+", "11-", ""],	name:"フォルテシモBELL"},
	{levels:["9-", "12.2", ""],	name:"DETARAME ROCK&ROLL THEORY"},
	{levels:["8-", "11.7", ""],	name:"私の中の幻想的世界観及びその顕現を想起させたある現実での出来事に関する一考察"},
	{levels:["8+", "12.0", ""],	name:"無敵We are one!!"},
	{levels:["9-", "11+", ""],	name:"Change Our MIRAI！"},
	{levels:["9+", "11-", ""],	name:"ドキドキDREAM!!!"},
	{levels:["9-", "11+", ""],	name:"言ノ葉カルマ"},
	{levels:["8+", "11-", ""],	name:"悪戯"},
	{levels:["9-", "11-", ""],	name:"言ノ葉遊戯"},
	{levels:["8-", "10.4", ""],	name:"りばーぶ"},
	{levels:["9-", "10.3", "10.7"],	name:"洗脳"},
	{levels:["9-", "11-", ""],	name:"Barbed Eye"},
	{levels:["9-", "12.0", ""],	name:"空威張りビヘイビア"},
	{levels:["9+", "12.8", ""],	name:"分からない"},
	{levels:["9+", "11.8", ""],	name:"天国と地獄 -言ノ葉リンネ-"},
	{levels:["9+", "12.2", ""],	name:"相思創愛"}
];

function diff2tmp(diff)
{
	var difftable =
		[["7-", 7.0], ["7+", 7.7], ["8-", 8.0], ["8+", 8.7], ["9-", 9.0], ["9+", 9.7],["10-", 10.0], 
 			["10+", 10.7], ["11-", 11.0], ["11+", 11.7], ["12-", 12.0], ["12+", 12.7], ["13-", 13.0]];
	for(var i=0; i< difftable.length; i++)
	{
		if(0 == diff.indexOf(difftable[i][0]))
		{
			return 1*difftable[i][1];
		}
	}
	return 1*diff;
}

function diff2s(difficallity)
{
	var tmp = diff2tmp(difficallity),retval=0;
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

function diff2sss(difficallity)
{
	var tmp=diff2tmp(difficallity), retval=0;
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

function rate_XtoY(basis, max, gap, n)
{
	return basis+(max-basis)*n/gap
}

function arch2rate_10000(achievement, difficallity)
{
	var temp = 0;

		var rate_sss = Math.round(10000*diff2sss(difficallity));
		var rate_ss = rate_sss - 10000;
		var rate_s = Math.round(10000*diff2s(difficallity));
		var diff10000 = Math.round(10000*diff2tmp(difficallity));
		var achi_100 = Math.round(achievement*100);
		if(achi_100 >= 10000) {
			temp = rate_sss
		} else if (achi_100 >= 9900) {
			temp = rate_XtoY(rate_ss,     rate_sss-2500,  100, achi_100-9900);
		} else if (achi_100 >= 9700) {
			temp = rate_XtoY(rate_s,      rate_ss-2500,   200, achi_100-9700);
		} else if (achi_100 >= 9400) {
			temp = rate_XtoY(diff10000-15000, rate_s-10000,   300, achi_100-9400);
		} else if (achi_100 >= 9000) {
			temp = rate_XtoY(diff10000-20000, diff10000-15000,  400, achi_100-9000);
		} else if (achi_100 >= 8000) {
			temp = rate_XtoY(diff10000-30000, diff10000-25000, 1000, achi_100-8000);
		} else if (achi_100 >= 6000) {
			temp = rate_XtoY(diff10000*0.4, diff10000-40000, 2000, achi_100-6000);
		} else if (achi_100 >= 4000) {
			temp = rate_XtoY(diff10000*0.2, diff10000*0.4, 2000, achi_100-4000);
		} else if (achi_100 >= 2000) {
			temp = rate_XtoY(diff10000*0.1, diff10000*0.2, 1000, achi_100-2000);
		} else if (achi_100 >= 1000) {
			temp = rate_XtoY(0,           diff10000*0.1, 1000, achi_100-1000);
		} else {
			temp = 0;
		}
	temp -= temp % 1.0;
	return temp;
}

function get_nextpage_address(j,html,diff)	//次の楽曲リストページを探す
{
	var nextaddr="";
	var e = $(j).find('a');	// hrefが含まれると思われるものlist
	var e_length=e.length;	// その個数
	for(var i=0; i<e_length; i++)	//楽曲リストページ用ループ
	{
		var url=e[i].getAttribute('href');	// <a>内のリンク先取得
		if(url.indexOf(html + "?d=" + diff) == 0)
		{
			return url;
		}
	}
	for(var i=0; i<e_length; i++)	//楽曲リストページ以外用ループ
	{
		var url=e[i].getAttribute('href');
		if(url.indexOf(html) == 0)
		{
			return url + "&d=" + diff;
		}
	}

	return nextaddr;
}

function get_music_mdata2(achive_list, addr, diff)	//データ取得と次のアドレス
{
	var nextaddr="";

	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			var m=$(data).find("#accordion");
			var m_length=m.find("h3").length;
			for(var i=0; i<m_length; i++)
			{
				achive_list.push(
					[m.find("h3")[i].innerText.trim(), 
					 m.find("tbody")[i].children[1].children[2].innerText.trim().replace(/[(達成率) %]/g, "")]
					);
			}
			if(diff != 6)
				nextaddr=get_nextpage_address($(data), "music.html", diff+1);
			else
				nextaddr=get_nextpage_address($(data), "home.html", 0);				
		});

	return nextaddr;
}

function data2rating(golliramode)
{
	var mlist_length=ma_list.length, re_length=re_list.length, re_count=0, lvlist_count=0;

	for(var i=0; i<mlist_length; i++)
	{
//		console.log(i + "\t" + ma_list[i][0] + "\n");
		//lv表と取得データの名前が一致なら処理を進める
		if(ma_list[i][0].indexOf(inner_lv[lvlist_count].name) == 0)
		{
			datalist.push({
				name:ma_list[i][0],
				achive:[(golliramode == 0)?ex_list[i][1]:0,
				ma_list[i][1],
				(re_count >= re_length)?"---":
					(re_list[re_count][0]==ma_list[i][0])?re_list[re_count++][1]:"---"],
				lv:inner_lv[lvlist_count].levels,
				rate_values:[0,	0, 0],
				music_rate : 0
			});
			datalist[i].rate_values[0] =
				(golliramode == 0)?arch2rate_10000(datalist[i].achive[0], datalist[i].lv[0]):0;
			datalist[i].rate_values[1] = arch2rate_10000(datalist[i].achive[1], datalist[i].lv[1]);
			datalist[i].rate_values[2] = arch2rate_10000(datalist[i].achive[2], datalist[i].lv[2]);
			datalist[i].music_rate = Math.max.apply(null, datalist[i].rate_values);
			
			lvlist_count++;
		}
		else	// 違う場合は空データを入れて終了。
		{
			datalist.push(
				{name:ma_list[i][0],
				achive:[(golliramode == 0)?ex_list[i][1]:0,
						ma_list[i][1],
						(re_count >= re_length)?"---":
							(re_list[re_count][0]==ma_list[i][0])?re_list[re_count++][1]:"---"],
				lv:["","",""],
				rate_values:[0,	0, 0],
				music_rate : 0
			});
		}
//		console.log(datalist[i]);
	}
	datalist.sort(function(a,b){return b.music_rate-a.music_rate});
	return;
}
	
function print_result(golliramode)
{
	var str="", next_count=0, dlist_length=datalist.length;
	for(var i=0; i<30; i++)
	{
		str+= i+1 + "/" + datalist[i].name + " : ";
		str+= Math.round(Math.floor(datalist[i].music_rate/100))/100 + "\n";
		if(golliramode == 0)
		{
			str+= "  EX(" + datalist[i].lv[0] + ")/" + datalist[i].achive[0] + " : ";
			str+= Math.round(Math.floor(datalist[i].rate_values[0]/100))/100 + "\n"
		}
		str+= "  MA(" + datalist[i].lv[1] + ")/" + datalist[i].achive[1] + " : "
		str+= Math.round(Math.floor(datalist[i].rate_values[1]/100))/100 + "\n";
		if(datalist[i].lv[2] !="")
		{
			str+= "  Re(" + datalist[i].lv[2] + ")/" + datalist[i].achive[2] + " : ";
			str+= Math.round(Math.floor(datalist[i].rate_values[2]/100))/100 + "\n"
		}
		if(i%5==4)
		{
			confirm(str);
			str="";
		}
	}
	
	for(var i=30; next_count<15 && i<dlist_length; i++)
	{
		if(datalist[i].music_rate == 0)	// 未プレー曲のみの場合、確認終了。
			break;
		var max_lv = Math.max(diff2tmp(datalist[i].lv[1]), diff2tmp(datalist[i].lv[2]));
		if(datalist[29].music_rate >= arch2rate_10000(100, String(max_lv)))
			continue;
		
		str+= i+1 + "/" + datalist[i].name + " : ";
		str+= Math.round(Math.floor(datalist[i].music_rate/100))/100 + "\n";
		if(golliramode == 0)
		{
			str+= "  EX(" + datalist[i].lv[0] + ")/" + datalist[i].achive[0] + " : ";
			str+= Math.round(Math.floor(datalist[i].rate_values[0]/100))/100 + "\n";
		}
		str+= "  MA(" + datalist[i].lv[1] + ")/" + datalist[i].achive[1] + " : "
		str+= Math.round(Math.floor(datalist[i].rate_values[1]/100))/100 + "\n";
		if(datalist[i].lv[2] !="")
		{
			str+= "  Re(" + datalist[i].lv[2] + ")/" + datalist[i].achive[2] + " : ";
			str+= Math.round(Math.floor(datalist[i].rate_values[2]/100))/100 + "\n";
		}
		if(next_count%5==4)
		{
			if(str!="")
			{
				confirm(str);
				str="";
			}
		}
		next_count++;
	}
	
	if(str != "")
		confirm(str);

}

function get_your_id(addr)
{
	$.ajax({type:'GET', url:addr, async: false})
		.done(function(data)
		{
			//成功時の処理本体
			var m=$(data).find('.status_data')[0];
			your_id = m.children[1].innerText;
			your_rating = m.children[7].innerText.trim().replace(/MAX /g, "");
		});
	 return your_id;
}
	
function tweet_best(id)
{
	var str = ""
	str = your_id + " :" + your_rating + "%0D%0A";
	for(var i=0; i<5; i++)
	{
		if(datalist[i].name.length < 13)
		{
			str += datalist[i].name;
		}
		else
		{
			str += datalist[i].name.slice(0, 12) + "%ef%bd%9e";
		}
		str += " : " + Math.round(Math.floor(datalist[i].music_rate/100))/100 + "%0D%0A";
	}
	var hashtag = "%e8%88%9e%e3%83%ac%e3%83%bc%e3%83%88%e8%a7%a3%e6%9e%90test";	// 舞レート解析test
	if(window.open
	   ("https://twitter.com/intent/tweet?hashtags=" + hashtag + "&text=" + str, '_blank') == null)
	{
		confirm("ポップアップブロックを無効にしてください。");
	}

}
	
function analyzing_rating()
{
	var best30=0, history434=0, best_ave=0, best_limit=0, hist_limit=0, tmp=0, str="";
	var best_rating=0, recent_rating=0, hist_rating=0, best_left=0, hist_left=0;
	for(var i=0; i<30; i++)
	{
		tmp = Math.round(Math.floor(datalist[i].music_rate/100));
		best30+=tmp;
	}
	
	history434=best30;
	for(var i=30 ;i<434;i++)
	{
		tmp = Math.round(Math.floor(datalist[i].music_rate/100));
		history434+=tmp;
	}

	best_ave = Math.round(Math.floor(best30/30))/100;
	best_limit = Math.round(Math.floor(datalist[29].music_rate/100))/100;
	hist_limit = Math.round(Math.floor(datalist[433].music_rate/100))/100;
	if(hist_limit<=0)
	{
		var count=0;
		for(count=0; datalist[count].music_rate > 0; count++)
		{
			console.log(count + " : " + datalist[count].music_rate);	
		}
		hist_limit= "0 (あと" + (434-count) + "曲)";
	}
	
	best_rating = Math.floor(best30/44)/100;	//best30はすでにRating*100
	recent_rating = Math.floor(Math.floor(datalist[0].music_rate/100)*10/44)/100;
	hist_rating = Math.round(Math.floor(history434/(434*11)))/100;	// multiply 4/(434*44)
	
	best_left = (44 - Math.ceil(best30%44))/100;
	hist_left = (434*11 - Math.ceil(history434%44))/100;
	
	var all = Math.round((best_rating + recent_rating + hist_rating)*100)/100;
	
	str += your_id + "\n";
	str += "現在のRating : " + your_rating + "\n\n";
	str += " BEST30の平均 : " + best_ave + " (=" + best30/100 + "/30)\n";
	str += " BEST枠下限 : " + best_limit + "\n";
	str += " HISTORY枠下限 : " + hist_limit + "\n\n";
	str += "予想到達可能Rating : " + all + "\n";
	str += " BEST    : " + best_rating + "\n";
	str += "  (BEST30枠+" + best_left + "でRating+0.01)\n";
	str += " RECENT  : " + recent_rating + "\n";
	str += "  (単曲レートTOP" + Math.round(Math.floor(datalist[0].music_rate/100))/100 + "を10回出す）\n";
	str += " HISTORY : " + hist_rating + "\n";
	str += "  (HISTORY434枠+" + hist_left + "でRating+0.01)\n";
	str += "\n\n   Supported by sgimera3.hatenablog.com\n\n";
	
	str += "結果をツイートしますか？"
	
	if(confirm(str))
	{
		// tweet用文字列
		str = your_id + " :" + your_rating + "%0D%0A";
		str += "BEST%2f平均%3a" + best_ave + " 下限:" + best_limit + "%0D%0A";
		str += "HIST下限%3a" + hist_limit + "%0D%0A";
		str += "予想到達Rating%3a" + all + "%0D%0A";
		str += "B%3a" + best_rating + " %2B R%3a" + recent_rating + " %2B H%3a" + hist_rating + "%0D%0A";
//		str += "B:" + best_rating + " (" + best_left + ")%0D%0A";
//		str += "R:" + recent_rating + " (" + Math.round(Math.floor(datalist[0].music_rate/100))/100 + ")%0D%0A";
//		str += "H:" + hist_rating + " (" + hist_left + ")%0D%0A";
		var hashtag = "%e8%88%9e%e3%83%ac%e3%83%bc%e3%83%88%e8%a7%a3%e6%9e%90test";	// 舞レート解析test
		if(window.open
		   ("https://twitter.com/intent/tweet?hashtags=" + hashtag + "&text=" + str, '_blank') == null)
		{
			confirm("ポップアップブロックを無効にしてください。");
		}
	}
	
}

var tmpstr = "--舞レート解析 (trial)--\n\n";
tmpstr += inner_lv.length + "songs(2017.10.17) version\n";
tmpstr += "Last Update 2017.10.19\n\n";
tmpstr += "Programmed by @sgimera";
if(!confirm(tmpstr))
	return;
	
tmpstr = "EXPERTのデータを取得しますか？"
var gollira = 0;
	
if(confirm(tmpstr))
{
	addr=get_nextpage_address($(document), "music.html", 4);	// EXPERTリストのアドレス取得 
	addr=get_music_mdata2(ex_list, addr, 4);	// EXPERTデータ取得&MASTERリストのアドレス取得
}
else
{
	gollira = 1;
	addr=get_nextpage_address($(document), "music.html", 5);	// EXPERTリストのアドレス取得 
}
	addr=get_music_mdata2(ma_list, addr, 5);	// MASTERのデータ取得&Re:MASTERリストのアドレス取得
	addr=get_music_mdata2(re_list, addr, 6);	// Re:MASTERのデータ取得&HOMEのアドレス取得
	tmpstr = get_your_id(addr);
	data2rating(gollira);	// データ集計
		
	if(confirm("BEST枠楽曲を出力しますか？\n（キャンセル押すと、纏め画面へ）"))
	{
		print_result(gollira);	// 上位出力
		if(confirm("TOP5をtweetしますか？"))
		{
			tweet_best();
		}
	}
	analyzing_rating();	// 纏め出力 + tweet用文言生成
	window.location.href = addr;	//ホームに移動

})()
