javascript:
(function()
{
var mlist=[],ex_achive=[],ma_achive=[],re_achive=[],nextaddr="";
var protocol=location.protocol,host=location.host,path=location.pathname,uid=location.search;

var inner_lv = [
	["8-", "11.8", ""],	//前前前世
	["9-", "12.2", ""],	//Paradisus-Paradoxum
	["7+", "10.9", ""],	//SAKURAスキップ
	["8+", "11.2", ""],	//Now Loading!!!!
	["8+-", "12-", ""],	//真・ハンサム体操でズンドコホイ 
	["8-", "11-", ""],	//GET!! 夢&DREAM 
	["8-", "11.2", ""],	//PERFECT HUMAN
	["8+", "11+", ""],	//SUSHI食べたい feat.ソイソース
	["8-", "11+", ""],	//ポップミュージックは僕のもの
	["8+", "11-", ""],	//きらっせ☆ウッド村ファーム
	["8-", "11+", ""],	//シュガーソングとビターステップ
	["9-", "11.1", ""],	//紅蓮の弓矢
	["7-", "8+", ""],	//ようかい体操第一
	["7-", "9+", ""],	//ゲラゲラポーのうた
	["7-", "10.4", ""],	//夏祭り
	["10-", "11.6", ""],	//Scatman (Ski Ba Bop Ba Dop Bop)
	["8+", "11.1", ""],	//fake!fake!
	["8+", "11-", ""],	//HIMITSUスパーク
	["8-", "11.2", ""],	//でんでんぱっしょん
	["8-", "10.2", ""],	//Dragon Night
	["9-", "11+", ""],	//Can Do
	["9-", "10.8", ""],	//The Other self
	["9-", "10.7", ""],	//カノン
	["9-", "10.4", ""],	//オルフェ
	["8-", "10.5", ""],	//ヘタリアン☆ジェット
	["7+", "10.4", ""],	//POP STAR
	["8-", "10.1", ""],	//Love or Lies
	["7+", "10.1", ""],	//jelly
	["7+", "9+", ""],	//美しく燃える森
	["8-", "10.6", ""],	//Love You
	["8+", "10.1", ""],	//come again
	["7+", "9-", "11.3"],	//Future
	["8-", "11+", ""],	//ウッーウッーウマウマ(ﾟ∀ﾟ)
	["8+", "10.1", ""],	//NIGHT OF FIRE
	["8-", "10.0", ""],	//YATTA!
	["8+", "10.9", ""],	//1/3の純情な感情
	["8-", "10.0", ""],	//バラライカ
	["8+", "11.5", ""],	//ココロオドル
	["8-", "11.1", "11.7"],	//若い力 -SEGA HARD GIRLS MIX-
	["9+", "12.0", ""],	//セハガガガンバッちゃう！！
	["8+", "10.8", ""],	//ラブリー☆えんじぇる!!
	["8+", "10.5", ""],	//Stand Up!!!!
	["9-", "11+", ""],	//naraku within
	["8-", "10.7", ""],	//ほとんど違法行為
	["8-", "10.4", ""],	//君の知らない物語
	["8-", "10.6", ""],	//シリウス
	["7+", "10.8", ""],	//コネクト
	["9-", "12.4", ""],	//SAVIOR OF SONG
	["8-", "9+", ""],	//Luminize
	["8-", "11.0", ""],	//秘密の扉から会いにきて
	["9-", "11+", ""],	//青春はNon-Stop！
	["9-", "12.3", ""],	//Falling Roses
	["8-", "10.7", ""],	//イチズレシピ
	["7+", "10.2", ""],	//Daydream café
	["7-", "10.3", ""],	//ふ・れ・ん・ど・し・た・い
	["7+", "10.5", ""],	//Touch Tap Baby
	["7-", "9+", ""],	//極上スマイル
	["8+", "10.2", ""],	//7 Girls War
	["8-", "10.7", ""],	//Jumping!!
	["7-", "10.2", ""],	//ゆりゆららららゆるゆり大事件
	["9-", "11.2", ""],	//いぇす！ゆゆゆ☆ゆるゆり♪♪
	["9-", "11-", ""],	//ちょちょちょ！ゆるゆり☆かぷりっちょ！！！
	["8-", "11.0", ""],	//かくしん的☆めたまるふぉ～ぜっ！
	["8+", "11.7", ""],	//ファッとして桃源郷
	["9-", "12.5", ""],	//回レ！雪月花
	["9+", "12.4", ""],	//リンカーネイション
	["9-", "12.5", ""],	//六兆年と一夜物語
	["9-", "12.0", ""],	//ちがう!!!
	["9+", "11.8", ""],	//バッド・ダンス・ホール
	["8-", "10.5", ""],	//東京レトロ
	["10-", "12.3", ""],	//ARROW
	["9+", "11.7", ""],	//ヘルシーエンド
	["8-", "10.7", ""],	//ラブチーノ
	["9-", "12.2", "12.9"],	//ロストワンの号哭
	["9-", "12.2", ""],	//千本桜
	["9-", "11.8", ""],	//チュルリラ・チュルリラ・ダッダッダ！
	["8-", "12.4", ""],	//ウミユリ海底譚
	["10-", "12.8", ""],	//初音ミクの消失
	["9-", "11.6", ""],	//天ノ弱
	["9-", "12.3", ""],	//厨病激発ボーイ
	["10+", "12.7", ""],	//脳漿炸裂ガール
	["9-", "12.0", ""],	//+♂
	["9-", "11+", ""],	//おこちゃま戦争
	["8+", "10.9", ""],	//だんだん早くなる
	["8-", "10.0", ""],	//恋愛裁判
	["8+", "10-", "11+"],	//からくりピエロ
	["9-", "11.3", ""],	//ゴーストルール
	["8-", "10.9", ""],	//おじゃま虫
	["9-", "11+", ""],	//ストリーミングハート
	["9-", "10.3", ""],	//妄想税
	["9-", "12.3", ""],	//毒占欲
	["8+", "10.4", ""],	//むかしむかしのきょうのぼく
	["8+", "11+", ""],	//二息歩行
	["9-", "10.9", ""],	//モザイクロール
	["9-", "11.2", ""],	//弱虫モンブラン
	["9+", "11+", ""],	//39
	["7+", "11.0", ""],	//＊ハロー、プラネット。
	["8+", "11+", ""],	//Mr. Wonderland
	["10-", "12.3", ""],	//吉原ラメント
	["8-", "11.0", ""],	//ココロ
	["9+", "11+", ""],	//ゆっくりしていってね！！！
	["9-", "11+", ""],	//生きてるおばけは生きている
	["8-", "10.7", ""],	//踊れオーケストラ
	["9-", "11.4", ""],	//クノイチでも恋がしたい
	["7-", "10-", "11+"],	//いーあるふぁんくらぶ
	["8-", "12.1", ""],	//赤心性：カマトト荒療治
	["8-", "11.0", ""],	//イノコリ先生
	["9+", "12.5", ""],	//ECHO
	["9-", "11.4", ""],	//キミノヨゾラ哨戒班
	["8+", "11.1", ""],	//しんでしまうとはなさけない！
	["8+", "11.4", ""],	//パーフェクト生命
	["8+", "11.4", ""],	//やめろ！聴くな！
	["7+", "9+", ""],	//東京リアルワールド
	["8-", "11.0", ""],	//すろぉもぉしょん
	["9+", "12.7", ""],	//頓珍漢の宴
	["8-", "12.0", ""],	//ありふれたせかいせいふく
	["8-", "11.4", ""],	//絵の上手かった友達
	["10-", "12.0", ""],	//腐れ外道とチョコレゐト
	["8+", "11+", ""],	//はじめまして地球人さん
	["8+", "10.3", ""],	//アゲアゲアゲイン
	["9-", "11-", ""],	//M.S.S.Planet
	["8+", "10.8", ""],	//不毛！
	["9-", "11+", ""],	//ネトゲ廃人シュプレヒコール
	["9+", "11-", ""],	//炉心融解
	["9-", "11-", ""],	//StargazeR
	["9-", "11+", ""],	//Just Be Friends
	["8+", "10.8", ""],	//LOL -lots of laugh-
	["7+", "10.6", ""],	//みくみくにしてあげる♪【してやんよ】
	["9+", "11.3", ""],	//Sweet Devil
	["8-", "11-", ""],	//クローバー♣クラブ
	["8-", "11+", ""],	//深海少女
	["8-", "11.3", ""],	//SPiCa
	["8-", "11.4", ""],	//ぽっぴっぽー
	["9+", "12.5", ""],	//Nyan Cat EX
	["9+", "11+", ""],	//どういうことなの！？
	["9+", "12.3", ""],	//どうしてこうなった
	["9-", "12.1", ""],	//ダブルラリアット
	["10-", "12.6", ""],	//magician's operation
	["8-", "12.3", ""],	//トルコ行進曲 - オワタ＼(^o^)／
	["8-", "9+", ""],	//リリリリ★バーニングナイト
	["8-", "9+", ""],	//イアイア★ナイトオブデザイア
	["7+", "10-", ""],	//ルカルカ★ナイトフィーバー
	["7-", "9+", ""],	//メグメグ☆ファイアーエンドレスナイト
	["8-", "9-", ""],	//教えて!! 魔法のLyric
	["7-", "10.8", ""],	//おちゃめ機能
	["9-", "11.0", ""],	//BAD∞END∞NIGHT
	["7-", "10.8", ""],	//shake it!
	["8-", "10.3", ""],	//Heart Beats
	["7-", "9+", ""],	//Sweetiex2
	["9-", "10-", "12.1"],	//ロミオとシンデレラ
	["8-", "10.8", ""],	//ハッピーシンセサイザ
	["9-", "10.5", ""],	//ダンシング☆サムライ
	["8-", "10.7", ""],	//ハロ／ハワユ
	["8+", "9+", "11-"],	//Tell Your World
	["8+", "11.2", ""],	//Hand in Hand
	["10-", "11.6", ""],	//アンハッピーリフレイン
	["9+", "12.6", ""],	//裏表ラバーズ
	["8-", "11.5", ""],	//ローリンガール
	["7-", "10-", "12-"],	//ワールズエンド・ダンスホール
	["8-", "9+", "11+"],	//マトリョシカ
	["8-", "9+", ""],	//パンダヒーロー
	["9+", "10.6", ""],	//ゴーゴー幽霊船
	["9-", "11.2", ""],	//セツナトリップ
	["9-", "11-", ""],	//放課後ストライド
	["9+", "11.0", ""],	//カゲロウデイズ
	["10-", "12.0", ""],	//夜咄ディセイブ
	["7+", "10.1", ""],	//メランコリック
	["7+", "9-", "11-"],	//ZIGG-ZAGG
	["7+", "10.6", ""],	//I ♥
	["9-", "10.5", ""],	//スイートマジック
	["9-", "10.7", ""],	//林檎華憐歌
	["9-", "12.3", ""],	//木彫り鯰と右肩ゾンビ
	["9-", "12.4", ""],	//デッドレッドガールズ
	["9-", "10.6", ""],	//One Step Ahead
	["7-", "10.5", ""],	//Link
	["7+", "9+", ""],	//ひみつをちょーだい
	["7+", "10.2", ""],	//夏にキスしていいですか？
	["9-", "12.0", ""],	//すーぱーぬこになりたい
	["8-", "11.3", ""],	//華鳥風月
	["8-", "11-", ""],	//色は匂へど散りぬるを
	["8+", "11+", ""],	//月に叢雲華に風
	["8+", "11+", ""],	//宿題が終わらないっ！
	["9-", "11.4", ""],	//東方スイーツ！～鬼畜姉妹と受難メイド～
	["9-", "11.7", ""],	//taboo tears you up
	["9+", "11-", ""],	//Starlight Vision
	["9-", "12.3", ""],	//幽闇に目醒めしは
	["8-", "11.6", ""],	//物凄い勢いでけーねが物凄いうた
	["9+", "11+", ""],	//Club Ibuki in Break All
	["8+", "11.7", ""],	//チルノのパーフェクトさんすう教室
	["7+", "11+", ""],	//魔理沙は大変なものを盗んでいきました
	["9-", "12.6", "12.9"],	//患部で止まってすぐ溶ける～狂気の優曇華院
	["9-", "10.9", ""],	//究極焼肉レストラン！お燐の地獄亭！
	["9-", "10.8", ""],	//お嫁にしなさいっ！
	["9+", "11+", ""],	//キャプテン・ムラサのケツアンカー
	["9-", "11.4", ""],	//ひれ伏せ愚民どもっ！
	["7-", "11+", ""],	//Grip & Break down !!
	["9-", "12.5", ""],	//Cosmic Magic Shooter
	["8-", "10+", ""],	//しゅわスパ大作戦☆
	["8+", "10.9", ""],	//全人類ノ非想天則
	["9-", "11+", ""],	//Endless, Sleepless Night
	["9-", "12.0", ""],	//No Routine
	["10+", "12.7", ""],	//Scream out! -maimai SONIC WASHER Edit-
	["9-", "12.9", ""],	//幻想のサテライト
	["8-", "11.4", ""],	//待チ人ハ来ズ。
	["8-", "11.4", ""],	//響縁
	["9-", "11.2", ""],	//囲い無き世は一期の月影
	["9-", "12.6", ""],	//儚きもの人間
	["9-", "11.2", ""],	//sweet little sister
	["9-", "11.0", ""],	//ケロ⑨destiny
	["9+", "12.0", ""],	//Phantasm Brigade
	["9-", "12.0", ""],	//蒼空に舞え、墨染の桜
	["8-", "10.4", ""],	//フラグメンツ -T.V. maimai edit-
	["8-", "11-", ""],	//橙の幻想郷音頭
	["7+", "11.4", ""],	//神々の祈り
	["8+", "11.0", ""],	//願いを呼ぶ季節
	["8-", "10+", "11.0"],	//明星ロケット
	["9-", "11+", "12.4"],	//緋色のDance
	["9-", "10.9", ""],	//YU-MU
	["9+", "12.0", ""],	//エテルニタス・ルドロジー
	["8-", "10-", "11+"],	//エピクロスの虹はもう見えない
	["9-", "12.0", ""],	//四次元跳躍機関
	["9-", "12.3", ""],	//少女幻葬戦慄曲 ～ Necro Fantasia
	["8+", "11.5", ""],	//Jimang Shot
	["8-", "10+", "11.5"],	//ってゐ！ ～えいえんてゐVer～
	["8-", "11.3", ""],	//東方妖々夢 ～the maximum moving about～
	["8+", "11.1", ""],	//Yet Another ”drizzly rain”
	["7-", "9+", ""],	//シアワセうさぎ
	["9-", "11-", ""],	//最速最高シャッターガール
	["10-", "12.7", ""],	//最終鬼畜妹・一部声
	["9-", "12.7", ""],	//ウサテイ
	["9+", "10.4", ""],	//Help me, ERINNNNNN!!
	["10-", "11+", "13.2"],	//ナイト・オブ・ナイツ
	["8+", "10+", "12.3"],	//Bad Apple!! feat nomico
	["9-", "10.8", ""],	//CALL HEAVEN!! 
	["8+", "11.0", ""],	//Sunshine world tour 
	["9-", "11.5", ""],	//終わりなき物語
	["9-", "11.1", ""],	//Our Fighting
	["8+", "11.9", "11.9"],	//Save This World νMIX
	["8+", "10-", "11.4"],	//Living Universe
	["10-", "10.7", ""],	//Ignite Infinity
	["10-", "11.6", ""],	//Garden Of The Dragon
	["9-", "12.4", ""],	//Reach For The Stars
	["9-", "11.8", ""],	//Live & Learn
	["9-", "12.5", ""],	//Back 2 Back
	["9-", "11.3", ""],	//Windy Hill -Zone 1
	["8-", "11-", "11.3"],	//City Escape: Act1
	["9+", "10-", "11+"],	//Rooftop Run: Act1
	["8+", "11-", ""],	//時空を超えて久しぶり！
	["9-", "10.3", ""],	//Her Dream Is To Be A Fantastic Sorceress
	["7-", "11.8", ""],	//キズナの物語
	["9+", "12.2", ""],	//STAIRWAY TO GENERATION
	["10-", "12.5", ""],	//Last Brave ～ Go to zero
	["11.5", "11.5", ""],	//Urban Crusher [Remix]
	["9-", "10.6", ""],	//Catch The Future
	["8-", "11.7", ""],	//awake
	["9+", "12.1", ""],	//Terminal Storm
	["10-", "11+", ""],	//After Burner
	["9+", "12.5", ""],	//Space Harrier Main Theme [Reborn]
	["10-", "11.6", ""],	//Quartet Theme [Reborn]
	["9-", "11.2", ""],	//Sky High [Reborn]
	["9+", "12.5", ""],	//Like the Wind [Reborn]
	["11-", "11+", ""],	//YA･DA･YO [Reborn]
	["10-", "10-", ""],	//Natural Flow
	["8-", "9+", ""],	//Crush On You
	["7+", "9-", ""],	//Sun Dance
	["8-", "10-", ""],	//In Chaos
	["10-", "10-", ""],	//Beat Of Mind
	["9-", "12.1", ""],	//JACKY [Remix]
	["10-", "12.2", ""],	//Mysterious Destiny
	["9+", "10-", ""],	//Riders Of The Light
	["7-", "11-", ""],	//コトバ・カラフル
	["8-", "11+", ""],	//天国と地獄
	["8-", "10.6", ""],	//きみのためなら死ねる
	["8+", "10.0", ""],	//The Great Journey
	["9-", "10.2", ""],	//Burning Hearts ～炎のANGEL～
	["8-", "10.5", ""],	//かせげ！ジャリンコヒーロー
	["9-", "12.3", ""],	//ココロスキャンのうた
	["10-", "10.8", ""],	//超絶！Superlative
	["10-", "11-", ""],	//采配の刻 Power of order
	["11-", "12.0", ""],	//DO RORO DERODERO ON DO RORO
	["9-", "10.8", ""],	//源平大戦絵巻テーマソング
	["8+", "11.3", ""],	//怪盗Rのテーマ
	["7-", "10.1", ""],	//マリアをはげませ
	["7+", "10.1", ""],	//SHOW TIME
	["9+", "11+", ""],	//円舞曲、君に
	["10-", "11-", ""],	//御旗のもとに
	["9-", "10.7", ""],	//地上の戦士
	["8-", "8+", "11.0"],	//檄！帝国華撃団(改)
	["9-", "12.9", ""],	//Outlaw's Lullaby
	["9-", "11+", ""],	//Brand-new Japanesque
	["9-", "12.6", ""],	//鼓動
	["10-", "11.1", ""],	//神室雪月花
	["7-", "12.1", ""],	//KONNANじゃないっ！
	["9-", "11.6", ""],	//セガサターン起動音[H.][Remix]
	["10-", "12.8", ""],	//GO BACK 2 YOUR RAVE
	["10-", "12.9", ""],	//B.B.K.K.B.K.K.
	["11.0", "12.8", ""],	//人里に下ったアタイがいつの間にか社畜になっていた件
	["10+", "12.8", ""],	//Maxi
	["9+", "12.1", ""],	//KISS CANDY FLAVOR
	["8+", "11+", ""],	//H-A-J-I-M-A-R-I-U-T-A-!!
	["9-", "11-", ""],	//Star☆Glitter
	["10+", "12.9", ""],	//conflict
	["10-", "12.5", ""],	//Party 4U ”holy nite mix”
	["9+", "11.8", ""],	//GOODMEN
	["10+", "12.6", ""],	//Sakura Fubuki
	["10-", "12.8", ""],	//METATRON
	["9-", "11.5", ""],	//オモイヨシノ
	["9-", "12.5", ""],	//L9
	["10-", "12.9", ""],	//Jack-the-Ripper◆
	["11.4", "12.8", ""],	//DRAGONLADY
	["9+", "11.4", ""],	//Pursuing My True Self
	["9+", "11.7", ""],	//Signs Of Love (“Never More” ver.)
	["9-", "11.4", ""],	//specialist (“Never More” ver.)
	["9-", "12.3", ""],	//Time To Make History (AKIRA YAMAOKA Remix)
	["8-", "11+", ""],	//レッツゴー!陰陽師
	["9-", "11+", ""],	//オパ! オパ! RACER -GMT mashup-
	["10-", "12.6", ""],	//電車で電車でOPA!OPA!OPA! -GMT mashup-
	["10-", "11.7", ""],	//リッジでリッジでGO!GO!GO! -GMT mashup-
	["7+", "11.3", ""],	//電車で電車でGO!GO!GO!GC! -GMT remix-
	["10-", "11.7", ""],	//RIDGE RACER STEPS -GMT remix-
	["9-", "11.5", ""],	//ファンタジーゾーン OPA-OPA! -GMT remix-
	["10-", "12.5", ""],	//DADDY MULK -Groove remix-
	["10-", "13.1", ""],	//FUJIN Rumble
	["10+", "12.7", ""],	//Got more raves？
	["11.0", "12.9", ""],	//夜明けまであと３秒
	["10+", "12.9", ""],	//Ignis Danse
	["11-", "12.8", ""],	//きたさいたま2000
	["9-", "12.7", ""],	//Scars of FAUNA
	["10-", "12.6", ""],	//FLOWER
	["11-", "12.9", ""],	//Ultranova
	["10-", "12.8", ""],	//KING is BACK!!
	["10-", "12.0", ""],	//曖昧mind
	["9+", "11.9", ""],	//Limit Break
	["10.0", "12.0", ""],	//ユビキリ
	["9+", "11+", ""],	//オトヒメモリー☆ウタゲーション
	["9+", "12.7", ""],	//夢花火
	["9+", "11+", ""],	//いっしそう電☆舞舞神拳！
	["11-", "13.2", ""],	//Panopticon
	["10+", "12.9", ""],	//四月の雨
	["11-", "13.1", ""],	//ねぇ、壊れタ人形ハ何処へ棄テらレるノ？
	["10-", "12.4", ""],	//Imitation:Loud Lounge
	["10+", "12.9", ""],	//HERA
	["10-", "12.6", ""],	//Selector
	["11+", "13.3", ""],	//AMAZING MIGHTYYYY!!!!
	["10+", "13.2", ""],	//CITRUS MONSTER
	["11-", "12.8", ""],	//Hyper Active
	["10+", "12.8", ""],	//Jumble Rumble
	["10-", "12.9", ""],	//Nitrous Fury
	["10-", "12.4", ""],	//Revive The Rave
	["10-", "12.7", ""],	//GEMINI -M-
	["9-", "12.4", ""],	//スリップフリップ
	["11-", "12.9", ""],	//天火明命
	["10-", "12.8", ""],	//7thSense
	["10+", "12.9", ""],	//Lividi
	["10+", "13.3", ""],	//Axeria
	["10-", "12.7", ""],	//閃鋼のブリューナク
	["10+", "13.3", ""],	//ガラテアの螺旋
	["11-", "13.0", ""],	//Caliburne ～Story of the Legendary sword～
	["11-", "13.4", ""],	//Our Wrenally
	["11-", "13.2", ""],	//Contrapasso -paradiso-
	["10-", "13.0", ""],	//Oshama Scramble!
	["11-", "12.8", ""],	//Garakuta Doll Play
	["10-", "11.9", "11.7"],	//Blew Moon
	["11-", "12.2", ""],	//We Gonna Party
	["10-", "12.9", ""],	//MYTHOS
	["10+", "12.4", ""],	//Life Feels Good
	["11-", "13.1", ""],	//Glorious Crown
	["10-", "12.9", ""],	//Aiolos
	["9+", "12.6", ""],	//LANCE
	["9-", "12.0", ""],	//Dragoon
	["10-", "12.4", ""],	//Death Scythe
	["10-", "11-", ""],	//LUCIA
	["10-", "12.7", ""],	//D✪N’T ST✪P R✪CKIN’
	["10-", "12.5", ""],	//oboro
	["9-", "12.6", ""],	//CYCLES
	["9+", "12.3", ""],	//Lionheart
	["10-", "11-", ""],	//Heartbeats
	["10-", "11+", ""],	//Acceleration
	["10-", "11.3", ""],	//End of Twilight
	["9-", "11.3", ""],	//JUMPIN' JUMPIN'
	["9+", "12.4", ""],	//L'épilogue
	["10-", "12.6", ""],	//FEEL ALIVE
	["9+", "12.2", ""],	//FEEL the BEATS
	["9-", "11+", ""],	//BREAK YOU!!
	["10+", "12.2", ""],	//Streak
	["10+", "12.2", ""],	//Spin me harder
	["11-", "12.2", ""],	//Turn around
	["10+", "10.9", ""],	//Link
	["11.6", "11-", ""],	//Black Out
	["11-", "13.1", ""],	//Fragrance
	["10-", "12.8", ""],	//Nerverakes
	["9-", "11.2", ""],	//Sprintrances
	["9+", "12.2", ""],	//air's gravity
	["9+", "11.5", ""],	//Night Fly
	["9+", "11+", ""],	//Feel My Fire
	["10-", "10.6", "11-"],	//Starlight Disco
	["9-", "11+", ""],	//記憶、記録
	["9-", "11.1", ""],	//connecting with you
	["9-", "11.1", ""],	//アージェントシンメトリー
	["9+", "11.2", ""],	//Dreampainter
	["9-", "11.0", ""],	//Monochrome Rainbow
	["10-", "12.1", ""],	//Beat of getting entangled
	["9-", "11.3", ""],	//MIRROR of MAGIC
	["9-", "10.9", ""],	//Cosmic Train
	["9+", "11+", ""],	//高気圧ねこロック
	["10-", "13.3", ""],	//Prophesy One
	["9-", "10.7", ""],	//BETTER CHOICE
	["10+", "12.2", ""],	//Get Happy
	["11-", "13.0", ""],	//System “Z”
	["10-", "13.2", ""],	//VERTeX
	["9-", "13.1", ""],	//ジングルベル
	["10-", "12.3", ""],	//火炎地獄
	["9-", "11+", ""],	//Danza zandA
	["9+", "11+", ""],	//planet dancer
	["9-", "10.6", ""],	//ナミダと流星
	["9+", "12.2", ""],	//ピーマンたべたら
	["8-", "9+", ""],	//maimaiちゃんのテーマ
	["8-", "10+", ""],	//Pixel Voyage
	["8-", "9+", ""],	//Sweets×Sweets
	["9-", "10.8", ""],	//虹と太陽
	["8-", "10.1", ""],	//Color My World
	["8+", "9+", ""],	//True Love Song
	["7+", "9-", ""],	//デコボコ体操第二
	["9+", "11+", ""],	//ソーラン☆節
	["8+", "11+", ""],	//おても☆Yan
	["8-", "11+", ""],	//炭★坑★節
	["7-", "10.6", ""],	//ネコ日和。
	["8+", "10.1", ""],	//犬日和。
	["9+", "10.7", ""],	//Endless World
	["10-", "11.0", ""],	//Backyun! －悪い女－
	["10-", "10.1", ""],	//BaBan!! －甘い罠－
	["8+", "10.3", ""],	//オレンジの夏
	["9-", "10.8", ""],	//ぴぴぱぷぅ！
	["10-", "12.3", ""],	//炎歌 -ほむらうた-
	["9-", "10.6", ""],	//泣き虫O'clock
	["9+", "11.3", ""],	//maiム・maiム feat.週刊少年マガジン
	["8-", "11.5", ""],	//タカハせ！名人マン
	["9-", "11.5", ""],	//みんなのマイマイマー
	["8-", "11.2", ""],	//welcome to maimai!! with マイマイマー
	["8-", "10.7", ""],	//ぐるぐるWASH！コインランドリー・ディスコ
	["9-", "12.0", ""],	//Infantoon Fantasy
	["9-", "11+", ""],	//幾四音-Ixion-
	["9-", "10.7", ""],	//Counselor
	["8-", "11-", ""],	//Invitation
	["9-", "11-", ""],	//その群青が愛しかったようだった
	["11-", "13.0", ""],	//The wheel to the right
	["9+", "12.0", ""],	//光線チューニング
	["9-", "12.4", ""],	//心象蜃気楼
	["9-", "11+", ""],	//ハート・ビート
	["9+", "11-", ""],	//brilliant better
	["7+", "11-", ""],	//フォルテシモBELL
	["9-", "12.2", ""],	//DETARAME ROCK&ROLL THEORY
	["8-", "11+", ""],	//私の中の幻想的世界観及びその顕現を想起させたある現実での出来事に関する一考察
	["8+", "12.0", ""],	//無敵We are one!!
	["9-", "11+", ""],	//Change Our MIRAI！
	["9+", "11-", ""],	//ドキドキDREAM!!!
	["9-", "11+", ""],	//言ノ葉カルマ
	["8+", "11-", ""],	//悪戯
	["9-", "11-", ""],	//言ノ葉遊戯
	["8-", "10-", ""],	//りばーぶ
	["9-", "10-", "10+"],	//洗脳
	["9-", "11-", ""],	//Barbed Eye
	["9-", "12.0", ""],	//空威張りビヘイビア
	["9+", "12.8", ""],	//分からない
	["9+", "11+", ""],	//天国と地獄 -言ノ葉リンネ-
	["9+", "12.2", ""]	//相思創愛
];

function diff2tmp(diff)
{
	var difftable =
		[["7-", 7.0], ["7+", 7.7], ["8-", 8.0], ["8+", 8.7], ["9-", 9.0], ["9+", 9.7],["10-", 10.0], 
 			["10+", 10.7], ["11-", 11.0], ["11+", 11.7], ["12-", 12.0], ["12+", 12.7], ["13-", 13.0]];
	for(var i=0; i< difftable.length; i++)
	{
		if(0 == diff.localeCompare(difftable[i][0]))
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

function get_music_mdata(music_list, achive_list) 
{
	var i = 0, m_name = "", achivement = "", eroot = document.getElementById("accordion"), result_str = "";
	if(eroot) 
	{
		eroot = eroot.firstElementChild.nextElementSibling;
	}
	while(eroot) 
	{
		if(eroot.nodeName == "H3") 
		{
			m_name = eroot.innerText.trim();
			eroot = eroot.nextElementSibling;
			if(!eroot) 
			{
				break;
			}
		}
		if(eroot.nodeName == "UL") 
		{
			achivement = eroot.children[0].children[0].children[0].children[1].children[2].innerText.trim()
			achivement = achivement.replace(/[(達成率) %]/g, "");
		}
		if((m_name != "") && (achivement != "")) 
		{
			music_list.push(m_name);
			m_name = "";
			achive_list.push(achivement);
			achivement = "";
		}
		eroot = eroot.nextElementSibling;
	}
	return;
}

function alist2rlist(mlist, ma_achive)
{
	var result_list =[], result_str="", i=0, best30=0, history434=0;
	for(i=0; i<mlist.length; i++) 
	{
		result_list.push(
			[	mlist[i] + " (" + inner_lv[i][1] + ")" + ma_achive[i] + "% ",
				arch2rate_10000(ma_achive[i], inner_lv[i][1])
			]);
	}
	result_list.sort(function(a,b){return b[1]-a[1]});

	for(i=0; i<40; i++)
	{
		if(i<30)
		{
			best30+=result_list[i][1];
		}
		if(i<40)
		{
			history434+=result_list[i][1];
		}		
		result_str += (i+1) + "/" + result_list[i][0] + " : " + result_list[i][1]/10000 + "\n";
		if(i % 15 == 14)
		{
			confirm(result_str);
			result_str = "";
		}
	}
	
	for( ;i<434; i++)
	{
		history434+=result_list[i][1];
	}
	
	best30 /= 30;	// average of best30
	best30 -= best30 % 100;	// xx.yy
	best30 /= 10000;
	
	history434 /= 434*11;	// multiply 4/(434*44)
	history434 -= history434 % 100;
	history434 /= 10000;
	
	result_str += "\nAverage of BEST30 :" + best30 + "\n";
	result_str += "history :" + history434 + "\n";
	
	confirm(result_str);
	return;
}	

function address_musiclist(diff)
{
	var eroot = document.getElementsByTagName('a');
	for(var i=0; i<eroot.length; i++)
	{
		var url=eroot[i].getAttribute('href');
		if(url.indexOf("music.html") == 0)
		{
			return url+"&d="+diff;
		}
	}
}

function address_musiclist2(j,diff)
{
	var e = $(j).find('a');	// hrefが含まれると思われるものlist
	var e_length=e.length;	// その個数
	for(var i=0; i<e_length; i++)	//楽曲リストページ用ループ
	{
		var url=e[i].getAttribute('href');	// <a>内のリンク先取得
		if(url.indexOf("music.html?d=" + diff) == 0)
		{
			nextaddr=url;
			return;
		}
	}
	for(var i=0; i<e_length; i++)	//楽曲リストページ以外用ループ
	{
		var url=e[i].getAttribute('href');
		if(url.indexOf("music.html") == 0)
		{
			nextaddr=url + "&d=" + diff;
			return;
		}
	}
}

function get_music_mdata2(achive_list) 
{
	$.get(nextaddr).done(function(data)
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
	});

	return;
}

function combine_3lists()
{
	var mlist_length=ma_list.length, re_length=re_list.length, re_count=0;

	(ma_list==[])?alert('Not found : Master result'):
	(re_list==[])?alert('Not found : Re:Master result'):
	(ex_list==[])?alert('Not found : Expert result'):re_count=0;

	for(var i=0; i<mlist_length; i++)
	{
		datalist.push([
		        ma_list[i][0],
		        ex_list[i][1],
		        ma_list[i][1],
        		(re_count >= re_length)?"---":
			(re_list[re_count][0]==ma_list[i][0])?re_list[re_count++][1]:"---"
			]);
	}
	return;
}
	
		get_music_mdata(mlist, ma_achive);
		alist2rlist(mlist, ma_achive);
	}
)()
