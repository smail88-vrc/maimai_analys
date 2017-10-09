javascript:
(function()
{

var ex_list=[], ma_list=[], re_list=[], datalist=[], ratinglist=[], addr="";
var inner_lv = [
	{levels:["8-", "11.8", ""],	name:"前前前世"},
	{levels:["9-", "12.2", ""],	name:"Paradisus-Paradoxum"},
	{levels:["7+", "10.9", ""],	name:"SAKURAスキップ"},
	{levels:["8+", "11.2", ""],	name:"Now Loading!!!!"},
	{levels:["8+", "12.0", ""],	name:"真・ハンサム体操でズンドコホイ "},
	{levels:["8-", "11-", ""],	name:"GET!! 夢&DREAM "},
	{levels:["8-", "11.2", ""],	name:"PERFECT HUMAN"},
	{levels:["8+", "11+", ""],	name:"SUSHI食べたい feat.ソイソース"},
	{levels:["8-", "11+", ""],	name:"ポップミュージックは僕のもの"},
	{levels:["8+", "11-", ""],	name:"きらっせ☆ウッド村ファーム"},
	{levels:["8-", "11+", ""],	name:"シュガーソングとビターステップ"},
	{levels:["9-", "11.1", ""],	name:"紅蓮の弓矢"},
	{levels:["7-", "8.7", ""],	name:"ようかい体操第一"},
	{levels:["7-", "9.9", ""],	name:"ゲラゲラポーのうた"},
	{levels:["7-", "10.4", ""],	name:"夏祭り"},
	{levels:["10-", "11.6", ""],	name:"Scatman (Ski Ba Bop Ba Dop Bop)"},
	{levels:["8+", "11.1", ""],	name:"fake!fake!"},
	{levels:["8+", "11-", ""],	name:"HIMITSUスパーク"},
	{levels:["8-", "11.2", ""],	name:"でんでんぱっしょん"},
	{levels:["8-", "10.2", ""],	name:"Dragon Night"},
	{levels:["9-", "11+", ""],	name:"Can Do"},
	{levels:["9-", "10.8", ""],	name:"The Other self"},
	{levels:["9-", "10.7", ""],	name:"カノン"},
	{levels:["9-", "10.4", ""],	name:"オルフェ"},
	{levels:["8-", "10.5", ""],	name:"ヘタリアン☆ジェット"},
	{levels:["7+", "10.4", ""],	name:"POP STAR"},
	{levels:["8-", "10.1", ""],	name:"Love or Lies"},
	{levels:["7+", "10.1", ""],	name:"jelly"},
	{levels:["7+", "9.7", ""],	name:"美しく燃える森"},
	{levels:["8-", "10.6", ""],	name:"Love You"},
	{levels:["8+", "10.1", ""],	name:"come again"},
	{levels:["7+", "9.5", "11.3"],	name:"Future"},
	{levels:["8-", "11+", ""],	name:"ウッーウッーウマウマ(ﾟ∀ﾟ)"},
	{levels:["8+", "10.1", ""],	name:"NIGHT OF FIRE"},
	{levels:["8-", "10.0", ""],	name:"YATTA!"},
	{levels:["8+", "10.9", ""],	name:"1/3の純情な感情"},
	{levels:["8-", "10.0", ""],	name:"バラライカ"},
	{levels:["8+", "11.5", ""],	name:"ココロオドル"},
	{levels:["8-", "11.1", "11.7"],	name:"若い力 -SEGA HARD GIRLS MIX-"},
	{levels:["9+", "12.0", ""],	name:"セハガガガンバッちゃう！！"},
	{levels:["8+", "10.8", ""],	name:"ラブリー☆えんじぇる!!"},
	{levels:["8+", "10.5", ""],	name:"Stand Up!!!!"},
	{levels:["9-", "11+", ""],	name:"naraku within"},
	{levels:["8-", "10.7", ""],	name:"ほとんど違法行為"},
	{levels:["8-", "10.4", ""],	name:"君の知らない物語"},
	{levels:["8-", "10.6", ""],	name:"シリウス"},
	{levels:["7+", "10.8", ""],	name:"コネクト"},
	{levels:["9-", "12.4", ""],	name:"SAVIOR OF SONG"},
	{levels:["8-", "9.8", ""],	name:"Luminize"},
	{levels:["8-", "11.0", ""],	name:"秘密の扉から会いにきて"},
	{levels:["9-", "11+", ""],	name:"青春はNon-Stop！"},
	{levels:["9-", "12.3", ""],	name:"Falling Roses"},
	{levels:["8-", "10.7", ""],	name:"イチズレシピ"},
	{levels:["7+", "10.2", ""],	name:"Daydream café"},
	{levels:["7-", "10.3", ""],	name:"ふ・れ・ん・ど・し・た・い"},
	{levels:["7+", "10.5", ""],	name:"Touch Tap Baby"},
	{levels:["7-", "9.8", ""],	name:"極上スマイル"},
	{levels:["8+", "10.2", ""],	name:"7 Girls War"},
	{levels:["8-", "10.7", ""],	name:"Jumping!!"},
	{levels:["7-", "10.2", ""],	name:"ゆりゆららららゆるゆり大事件"},
	{levels:["9-", "11.2", ""],	name:"いぇす！ゆゆゆ☆ゆるゆり♪♪"},
	{levels:["9-", "11-", ""],	name:"ちょちょちょ！ゆるゆり☆かぷりっちょ！！！"},
	{levels:["8-", "11.0", ""],	name:"かくしん的☆めたまるふぉ～ぜっ！"},
	{levels:["8+", "11.7", ""],	name:"ファッとして桃源郷"},
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
	{levels:["9-", "11.8", ""],	name:"チュルリラ・チュルリラ・ダッダッダ！"},
	{levels:["8-", "12.4", ""],	name:"ウミユリ海底譚"},
	{levels:["10-", "12.8", ""],	name:"初音ミクの消失"},
	{levels:["9-", "11.6", ""],	name:"天ノ弱"},
	{levels:["9-", "12.3", ""],	name:"厨病激発ボーイ"},
	{levels:["10+", "12.7", ""],	name:"脳漿炸裂ガール"},
	{levels:["9-", "12.0", ""],	name:"+♂"},
	{levels:["9-", "11+", ""],	name:"おこちゃま戦争"},
	{levels:["8+", "10.9", ""],	name:"だんだん早くなる"},
	{levels:["8-", "10.0", ""],	name:"恋愛裁判"},
	{levels:["8+", "10.6", "11+"],	name:"からくりピエロ"},
	{levels:["9-", "11.3", ""],	name:"ゴーストルール"},
	{levels:["8-", "10.9", ""],	name:"おじゃま虫"},
	{levels:["9-", "11+", ""],	name:"ストリーミングハート"},
	{levels:["9-", "10.3", ""],	name:"妄想税"},
	{levels:["9-", "12.3", ""],	name:"毒占欲"},
	{levels:["8+", "10.4", ""],	name:"むかしむかしのきょうのぼく"},
	{levels:["8+", "11+", ""],	name:"二息歩行"},
	{levels:["9-", "10.9", ""],	name:"モザイクロール"},
	{levels:["9-", "11.2", ""],	name:"弱虫モンブラン"},
	{levels:["9+", "11+", ""],	name:"39"},
	{levels:["7+", "11.0", ""],	name:"＊ハロー、プラネット。"},
	{levels:["8+", "11+", ""],	name:"Mr. Wonderland"},
	{levels:["10-", "12.3", ""],	name:"吉原ラメント"},
	{levels:["8-", "11.0", ""],	name:"ココロ"},
	{levels:["9+", "11+", ""],	name:"ゆっくりしていってね！！！"},
	{levels:["9-", "11+", ""],	name:"生きてるおばけは生きている"},
	{levels:["8-", "10.7", ""],	name:"踊れオーケストラ"},
	{levels:["9-", "11.4", ""],	name:"クノイチでも恋がしたい"},
	{levels:["7-", "10.3", "11+"],	name:"いーあるふぁんくらぶ"},
	{levels:["8-", "12.1", ""],	name:"赤心性：カマトト荒療治"},
	{levels:["8-", "11.0", ""],	name:"イノコリ先生"},
	{levels:["9+", "12.5", ""],	name:"ECHO"},
	{levels:["9-", "11.4", ""],	name:"キミノヨゾラ哨戒班"},
	{levels:["8+", "11.1", ""],	name:"しんでしまうとはなさけない！"},
	{levels:["8+", "11.4", ""],	name:"パーフェクト生命"},
	{levels:["8+", "11.4", ""],	name:"やめろ！聴くな！"},
	{levels:["7+", "9.8", ""],	name:"東京リアルワールド"},
	{levels:["8-", "11.0", ""],	name:"すろぉもぉしょん"},
	{levels:["9.7", "12.7", ""],	name:"頓珍漢の宴"},
	{levels:["8-", "12.0", ""],	name:"ありふれたせかいせいふく"},
	{levels:["8-", "11.4", ""],	name:"絵の上手かった友達"},
	{levels:["10-", "12.0", ""],	name:"腐れ外道とチョコレゐト"},
	{levels:["8+", "11+", ""],	name:"はじめまして地球人さん"},
	{levels:["8+", "10.3", ""],	name:"アゲアゲアゲイン"},
	{levels:["9-", "11-", ""],	name:"M.S.S.Planet"},
	{levels:["8+", "10.8", ""],	name:"不毛！"},
	{levels:["9-", "11+", ""],	name:"ネトゲ廃人シュプレヒコール"},
	{levels:["9+", "11-", ""],	name:"炉心融解"},
	{levels:["9-", "11-", ""],	name:"StargazeR"},
	{levels:["9-", "11+", ""],	name:"Just Be Friends"},
	{levels:["8+", "10.8", ""],	name:"LOL -lots of laugh-"},
	{levels:["7+", "10.6", ""],	name:"みくみくにしてあげる♪【してやんよ】"},
	{levels:["9+", "11.3", ""],	name:"Sweet Devil"},
	{levels:["8-", "11-", ""],	name:"クローバー♣クラブ"},
	{levels:["8-", "11+", ""],	name:"深海少女"},
	{levels:["8-", "11.3", ""],	name:"SPiCa"},
	{levels:["8-", "11.4", ""],	name:"ぽっぴっぽー"},
	{levels:["9+", "12.5", ""],	name:"Nyan Cat EX"},
	{levels:["9+", "11+", ""],	name:"どういうことなの！？"},
	{levels:["9+", "12.3", ""],	name:"どうしてこうなった"},
	{levels:["9-", "12.1", ""],	name:"ダブルラリアット"},
	{levels:["10-", "12.6", ""],	name:"magician's operation"},
	{levels:["8-", "12.3", ""],	name:"トルコ行進曲 - オワタ＼(^o^)／"},
	{levels:["8-", "9.9", ""],	name:"リリリリ★バーニングナイト"},
	{levels:["8-", "9.9", ""],	name:"イアイア★ナイトオブデザイア"},
	{levels:["7+", "10.4", ""],	name:"ルカルカ★ナイトフィーバー"},
	{levels:["7-", "9.9", ""],	name:"メグメグ☆ファイアーエンドレスナイト"},
	{levels:["8-", "9.2", ""],	name:"教えて!! 魔法のLyric"},
	{levels:["7-", "10.8", ""],	name:"おちゃめ機能"},
	{levels:["9-", "11.0", ""],	name:"BAD∞END∞NIGHT"},
	{levels:["7-", "10.8", ""],	name:"shake it!"},
	{levels:["8-", "10.3", ""],	name:"Heart Beats"},
	{levels:["7-", "9.9", ""],	name:"Sweetiex2"},
	{levels:["9-", "10.5", "12.1"],	name:"ロミオとシンデレラ"},
	{levels:["8-", "10.8", ""],	name:"ハッピーシンセサイザ"},
	{levels:["9-", "10.5", ""],	name:"ダンシング☆サムライ"},
	{levels:["8-", "10.7", ""],	name:"ハロ／ハワユ"},
	{levels:["8+", "9.7", "11-"],	name:"Tell Your World"},
	{levels:["8+", "11.2", ""],	name:"Hand in Hand"},
	{levels:["10-", "11.6", ""],	name:"アンハッピーリフレイン"},
	{levels:["9+", "12.6", ""],	name:"裏表ラバーズ"},
	{levels:["8-", "11.5", ""],	name:"ローリンガール"},
	{levels:["7-", "10.6", "12.1"],	name:"ワールズエンド・ダンスホール"},
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
	{levels:["8-", "11.3", ""],	name:"華鳥風月"},
	{levels:["8-", "11-", ""],	name:"色は匂へど散りぬるを"},
	{levels:["8+", "11+", ""],	name:"月に叢雲華に風"},
	{levels:["8+", "11+", ""],	name:"宿題が終わらないっ！"},
	{levels:["9-", "11.4", ""],	name:"東方スイーツ！～鬼畜姉妹と受難メイド～"},
	{levels:["9-", "11.7", ""],	name:"taboo tears you up"},
	{levels:["9+", "11-", ""],	name:"Starlight Vision"},
	{levels:["9-", "12.3", ""],	name:"幽闇に目醒めしは"},
	{levels:["8-", "11.6", ""],	name:"物凄い勢いでけーねが物凄いうた"},
	{levels:["9+", "11+", ""],	name:"Club Ibuki in Break All"},
	{levels:["8+", "11.7", ""],	name:"チルノのパーフェクトさんすう教室"},
	{levels:["7+", "11+", ""],	name:"魔理沙は大変なものを盗んでいきました"},
	{levels:["9-", "12.6", "12.9"],	name:"患部で止まってすぐ溶ける～狂気の優曇華院"},
	{levels:["9-", "10.9", ""],	name:"究極焼肉レストラン！お燐の地獄亭！"},
	{levels:["9-", "10.8", ""],	name:"お嫁にしなさいっ！"},
	{levels:["9+", "11+", ""],	name:"キャプテン・ムラサのケツアンカー"},
	{levels:["9-", "11.4", ""],	name:"ひれ伏せ愚民どもっ！"},
	{levels:["7-", "11+", ""],	name:"Grip & Break down !!"},
	{levels:["9-", "12.5", ""],	name:"Cosmic Magic Shooter"},
	{levels:["8-", "10.7", ""],	name:"しゅわスパ大作戦☆"},
	{levels:["8+", "10.9", ""],	name:"全人類ノ非想天則"},
	{levels:["9-", "11+", ""],	name:"Endless, Sleepless Night"},
	{levels:["9-", "12.0", ""],	name:"No Routine"},
	{levels:["10+", "12.7", ""],	name:"Scream out! -maimai SONIC WASHER Edit-"},
	{levels:["9-", "12.9", ""],	name:"幻想のサテライト"},
	{levels:["8-", "11.4", ""],	name:"待チ人ハ来ズ。"},
	{levels:["8-", "11.4", ""],	name:"響縁"},
	{levels:["9-", "11.2", ""],	name:"囲い無き世は一期の月影"},
	{levels:["9-", "12.6", ""],	name:"儚きもの人間"},
	{levels:["9-", "11.2", ""],	name:"sweet little sister"},
	{levels:["9-", "11.0", ""],	name:"ケロ⑨destiny"},
	{levels:["9+", "12.0", ""],	name:"Phantasm Brigade"},
	{levels:["9-", "12.0", ""],	name:"蒼空に舞え、墨染の桜"},
	{levels:["8-", "10.4", ""],	name:"フラグメンツ -T.V. maimai edit-"},
	{levels:["8-", "11-", ""],	name:"橙の幻想郷音頭"},
	{levels:["7+", "11.4", ""],	name:"神々の祈り"},
	{levels:["8+", "11.0", ""],	name:"願いを呼ぶ季節"},
	{levels:["8-", "10.7", "11.0"],	name:"明星ロケット"},
	{levels:["9-", "11+", "12.4"],	name:"緋色のDance"},
	{levels:["9-", "10.9", ""],	name:"YU-MU"},
	{levels:["9+", "12.0", ""],	name:"エテルニタス・ルドロジー"},
	{levels:["8-", "10.6", "11+"],	name:"エピクロスの虹はもう見えない"},
	{levels:["9-", "12.0", ""],	name:"四次元跳躍機関"},
	{levels:["9-", "12.3", ""],	name:"少女幻葬戦慄曲 ～ Necro Fantasia"},
	{levels:["8+", "11.5", ""],	name:"Jimang Shot"},
	{levels:["8-", "10.7", "11.5"],	name:"ってゐ！ ～えいえんてゐVer～"},
	{levels:["8-", "11.3", ""],	name:"東方妖々夢 ～the maximum moving about～"},
	{levels:["8+", "11.1", ""],	name:"Yet Another ”drizzly rain”"},
	{levels:["7-", "9.9", ""],	name:"シアワセうさぎ"},
	{levels:["9-", "11-", ""],	name:"最速最高シャッターガール"},
	{levels:["10-", "12.7", ""],	name:"最終鬼畜妹・一部声"},
	{levels:["9-", "12.7", ""],	name:"ウサテイ"},
	{levels:["9+", "10.4", ""],	name:"Help me, ERINNNNNN!!"},
	{levels:["10-", "11+", "13.2"],	name:"ナイト・オブ・ナイツ"},
	{levels:["8+", "10.9", "12.3"],	name:"Bad Apple!! feat nomico"},
	{levels:["9-", "10.8", ""],	name:"CALL HEAVEN!! "},
	{levels:["8+", "11.0", ""],	name:"Sunshine world tour "},
	{levels:["9-", "11.5", ""],	name:"終わりなき物語"},
	{levels:["9-", "11.1", ""],	name:"Our Fighting"},
	{levels:["8+", "11.9", "11.9"],	name:"Save This World νMIX"},
	{levels:["8+", "10.5", "11.4"],	name:"Living Universe"},
	{levels:["10-", "10.7", ""],	name:"Ignite Infinity"},
	{levels:["10-", "11.6", ""],	name:"Garden Of The Dragon"},
	{levels:["9-", "12.4", ""],	name:"Reach For The Stars"},
	{levels:["9-", "11.8", ""],	name:"Live & Learn"},
	{levels:["9-", "12.5", ""],	name:"Back 2 Back"},
	{levels:["9-", "11.3", ""],	name:"Windy Hill -Zone 1"},
	{levels:["8-", "11-", "11.3"],	name:"City Escape: Act1"},
	{levels:["9+", "10.1", "11+"],	name:"Rooftop Run: Act1"},
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
	{levels:["11-", "11+", ""],	name:"YA･DA･YO [Reborn]"},
	{levels:["10-", "10.1", ""],	name:"Natural Flow"},
	{levels:["8-", "9.9", ""],	name:"Crush On You"},
	{levels:["7+", "9.1", ""],	name:"Sun Dance"},
	{levels:["8-", "10.1", ""],	name:"In Chaos"},
	{levels:["10-", "10.5", ""],	name:"Beat Of Mind"},
	{levels:["9-", "12.1", ""],	name:"JACKY [Remix]"},
	{levels:["10-", "12.2", ""],	name:"Mysterious Destiny"},
	{levels:["9+", "10.0", ""],	name:"Riders Of The Light"},
	{levels:["7-", "11-", ""],	name:"コトバ・カラフル"},
	{levels:["8-", "11+", ""],	name:"天国と地獄"},
	{levels:["8-", "10.6", ""],	name:"きみのためなら死ねる"},
	{levels:["8+", "10.0", ""],	name:"The Great Journey"},
	{levels:["9-", "10.2", "12-"],	name:"Burning Hearts ～炎のANGEL～"},
	{levels:["8-", "10.5", ""],	name:"かせげ！ジャリンコヒーロー"},
	{levels:["9-", "12.3", ""],	name:"ココロスキャンのうた"},
	{levels:["10-", "10.8", ""],	name:"超絶！Superlative"},
	{levels:["10-", "11-", ""],	name:"采配の刻 Power of order"},
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
	{levels:["10.5", "12+", ""],	name:"デスパレイト"},
	{levels:["11-", "13-", ""],	name:"Moon of Noon"},
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
	{levels:["11-", "13.1", ""],	name:"ねぇ、壊れタ人形ハ何処へ棄テらレるノ？"},
	{levels:["10-", "12.4", ""],	name:"Imitation:Loud Lounge"},
	{levels:["10+", "12.9", ""],	name:"HERA"},
	{levels:["10-", "12.6", ""],	name:"Selector"},
	{levels:["11+", "13.3", ""],	name:"AMAZING MIGHTYYYY!!!!"},
	{levels:["10+", "13.2", ""],	name:"CITRUS MONSTER"},
	{levels:["11-", "12.8", ""],	name:"Hyper Active"},
	{levels:["10+", "12.8", ""],	name:"Jumble Rumble"},
	{levels:["10-", "12.9", ""],	name:"Nitrous Fury"},
	{levels:["10-", "12.4", ""],	name:"Revive The Rave"},
	{levels:["10-", "12.7", ""],	name:"GEMINI -M-"},
	{levels:["9-", "12.4", ""],	name:"スリップフリップ"},
	{levels:["11-", "12.9", ""],	name:"天火明命"},
	{levels:["10-", "12.8", ""],	name:"7thSense"},
	{levels:["10+", "12.9", ""],	name:"Lividi"},
	{levels:["10+", "13.3", ""],	name:"Axeria"},
	{levels:["10-", "12.7", ""],	name:"閃鋼のブリューナク"},
	{levels:["10+", "13.3", ""],	name:"ガラテアの螺旋"},
	{levels:["11-", "13.0", ""],	name:"Caliburne ～Story of the Legendary sword～"},
	{levels:["11-", "13.4", ""],	name:"Our Wrenally"},
	{levels:["11-", "13.2", ""],	name:"Contrapasso -paradiso-"},
	{levels:["10.0", "13.0", ""],	name:"Oshama Scramble!"},
	{levels:["11-", "12.8", ""],	name:"Garakuta Doll Play"},
	{levels:["10-", "11.9", "11.7"],	name:"Blew Moon"},
	{levels:["11-", "12.2", ""],	name:"We Gonna Party"},
	{levels:["10.4", "12.9", ""],	name:"MYTHOS"},
	{levels:["10+", "12.4", ""],	name:"Life Feels Good"},
	{levels:["11-", "13.1", ""],	name:"Glorious Crown"},
	{levels:["10.6", "12.9", ""],	name:"Aiolos"},
	{levels:["9+", "12.6", ""],	name:"LANCE"},
	{levels:["9-", "12.0", ""],	name:"Dragoon"},
	{levels:["10-", "12.4", ""],	name:"Death Scythe"},
	{levels:["10-", "11-", ""],	name:"LUCIA"},
	{levels:["10-", "12.7", ""],	name:"D✪N’T ST✪P R✪CKIN’"},
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
	{levels:["9-", "11+", ""],	name:"ハート・ビート"},
	{levels:["9+", "11-", ""],	name:"brilliant better"},
	{levels:["7+", "11-", ""],	name:"フォルテシモBELL"},
	{levels:["9-", "12.2", ""],	name:"DETARAME ROCK&ROLL THEORY"},
	{levels:["8-", "11+", ""],	name:"私の中の幻想的世界観及びその顕現を想起させたある現実での出来事に関する一考察"},
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
 			["10+", 10.7], ["11-", 11.0], ["11+", 11.7], ["12-", 12.5], ["12+", 12.8], ["13-", 13.3]];
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

function get_nextpage_address(j,diff)	//次の楽曲リストページを探す
{
	var nextaddr="";
	var e = $(j).find('a');	// hrefが含まれると思われるものlist
	var e_length=e.length;	// その個数
	for(var i=0; i<e_length; i++)	//楽曲リストページ用ループ
	{
		var url=e[i].getAttribute('href');	// <a>内のリンク先取得
		if(url.indexOf("music.html?d=" + diff) == 0)
		{
			return url;
		}
	}
	for(var i=0; i<e_length; i++)	//楽曲リストページ以外用ループ
	{
		var url=e[i].getAttribute('href');
		if(url.indexOf("music.html") == 0)
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
			
			nextaddr=get_nextpage_address($(data), diff+1);
		});

	return nextaddr;
}

function data2rating()
{
	var mlist_length=ma_list.length, re_length=re_list.length, re_count=0, lvlist_count=0;

	for(var i=0; i<mlist_length; i++)
	{	//lv表と取得データの名前が一致なら処理を進める
		if(ma_list[i][0].indexOf(inner_lv[lvlist_count].name) == 0)
		{
			datalist.push({
				name:ma_list[i][0],
				achive:[ex_list[i][1], ma_list[i][1],
				(re_count >= re_length)?"---":
					(re_list[re_count][0]==ma_list[i][0])?re_list[re_count++][1]:"---"],
				lv:inner_lv[lvlist_count],
				rate_values:[0,	0, 0],
				music_rate : 0
			});
			datalist.rate_values[0] = arch2rate_10000(datalist[i].achive[0], datalist[i].lv[0]);
			datalist.rate_values[1] = arch2rate_10000(datalist[i].achive[1], datalist[i].lv[1]);
			if(datalist[i].lv[2] != "")
			{
				datalist.rate_values[2] = arch2rate_10000(datalist[i].achive[2], datalist[i].lv[2]);
			}
			datalist[i].musicrate = Math.max(datalist[i].rate_values);
			
			lvlist_count++;
		}
		else
		{
			datalist.push(
				{name:ma_list[i][0],
				achive:[ex_list[i][1], ma_list[i][1],
				(re_count >= re_length)?"---":
					(re_list[re_count][0]==ma_list[i][0])?re_list[re_count++][1]:"---"],
				lv:["","",""],
				rate_values:[0,	0, 0],
				music_rate : 0
			});
		}
		console.log(datalist[i]);
	}
	datalist.sort(function(a,b){return b[10]-a[10]});

	return;
}
	
function print_result()
{
	var str="", next_count=0, dlist_length=datalist.length;
	for(var i=0; i<30; i++)
	{
		str+= i+1 + "/" + datalist[i][0] + " : " + datalist[i][10]/10000 + "\n";
		str+= "  EX(" + datalist[i][4] + ")/" + datalist[i][1] + " : " + datalist[i][7]/10000 + "\n"
		str+= "  MA(" + datalist[i][5] + ")/" + datalist[i][2] + " : " + datalist[i][8]/10000 + "\n"
		if(datalist[i][6] !="")
		{
			str+= "  Re(" + datalist[i][6] + ")/" + datalist[i][3] + " : " + datalist[i][9]/10000 + "\n"
		}
		if(i%6==5)
		{
			confirm(str);
			str="";
		}
	}
	
	for(var i=30; next_count<18 && i<dlist_length; i++)
	{
		if(datalist[i][10] == 0)	// 未プレー曲のみの場合、確認終了。
			break;
		
		var ex=diff2tmp(datalist[i][4]), ma=diff2tmp(datalist[i][5]);
		var re=(datalist[i][6]=="")?0:diff2tmp(datalist[i][6]);
		if(datalist[29][10] >= arch2rate_10000(100, String(Math.max(ex,ma,re))))
			continue;
		
		str+= i+1 + "/" + datalist[i][0] + " -> " + datalist[i][10]/10000 + "\n";
		str+= "  EX(" + datalist[i][4] + ")/" + datalist[i][1] + " -> " + datalist[i][7]/10000 + "\n"
		str+= "  MA(" + datalist[i][5] + ")/" + datalist[i][2] + " -> " + datalist[i][8]/10000 + "\n"
		if(datalist[i][6] !="")
		{
			str+= "  Re(" + datalist[i][6] + ")/" + datalist[i][3] + " -> " + datalist[i][9]/10000 + "\n"
		}
		if(next_count%6==5)
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

function analyzing_rating()
{
	var best30=0, history434=0, tmp=0, str="";
	var best=0, recent=0, hist=0;
	for(var i=0; i<30; i++)
	{
		tmp = Math.round(Math.floor(datalist[i][10]/100));
		best30+=tmp;
	}
	
	history434=best30;
	for(var i=30 ;i<434;i++)
	{
		tmp = Math.round(Math.floor(datalist[i][10]/100));
		history434+=tmp;
	}
	
	history434 /= 434*11;	// multiply 4/(434*44)
	history434 = Math.floor(history434)/100

	best = Math.floor(best30/44)/100;
	recent = Math.floor(Math.floor(datalist[0][10]/100)*10/44)/100;
	
	var all = Math.round((best + recent + history434)*100)/100;
	
	str += "Average Rate value of BEST30 : " + Math.round(best30/30)/100 + "\n";
	str += "Rate value including BEST30 : " + Math.round(datalist[29][10])/10000 + "\n\n";
	str += "- Your reachable Rating expected your result -\n";
	str += "BEST    : " + best + "\n";
	str += "RECENT  : " + recent + "\n";
	str += "HISTORY : " + history434 + "\n";
	str += "Reachable Rating : " + all + "\n";
	str += "\n\n   Supported by sgimera3.hatenablog.com\n\n";
	
	str += "   Do you want to tweet your result?"
	
	if(confirm(str))
	{
		// tweet用文字列
		str="";
		str += "BEST枠%0D%0A";
		str += " 平均:" + (Math.round(best30/30)/100) + " 下限:" + (Math.round(datalist[29][10])/10000) + "%0D%0A";
		str += "予想到達可能Rating%0D%0A  ";
		str += "B:" + best + " %2B R:" + recent + " %2B H:" + history434 + " %3D " + all + "%0D%0A";
		window.open("https://twitter.com/intent/tweet?hashtags=maiRatingAnalyzer&text=" + str);
	}
	
}

var tmpstr = "--maimai Rating Analyzer (trial)--\n\n";
tmpstr += "468songs(2017.10.3) version\n";
tmpstr += "Last Update 2017.10.8\n\n";
tmpstr += "Programmed by @sgimera";
if(confirm(tmpstr))
{
	addr=get_nextpage_address($(document), 4);	// EXPERTリストのアドレス取得 
	addr=get_music_mdata2(ex_list, addr, 4);	// EXPERTデータ取得&MASTERリストのアドレス取得
	addr=get_music_mdata2(ma_list, addr, 5);	// MASTERのデータ取得&Re:MASTERリストのアドレス取得
	addr=get_music_mdata2(re_list, addr, 6);	// Re:MASTERのデータ取得
	data2rating();	// データ集計
//	print_result();	// 上位出力
//	analyzing_rating();	// 纏め出力 + tweet用文言生成
	
}

})()
