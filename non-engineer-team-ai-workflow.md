---
title: "Instagram動画の制作をRunwayからKlingに移行して、初稿制作時間を42%削った話"
description: "移行で速くはなった。が、そのまま量産したら人物が破綻した。どこを自動化し、どこに人間を残したか。8週間の運用ログから、再現できる工程だけを書きます。"
category: "ai"
series: "AI Workflow"
logNo: "#018"
tags: ["AI", "Workflow", "Video", "Kling", "Automation"]
pubDate: 2026-06-18
updatedDate: 2026-06-18
readingTime: 7
featured: true
heroLog:
  - "$ migrate pipeline: runway → kling"
  - "<span class='gd'>›</span> batch 84 clips / 3 creators"
  - "<span class='ok'>✓</span> first_draft_time -42%"
  - "<span class='rd'>!</span> human figure broke on 9/84"
  - "<span class='ok'>✓</span> human QA reinstated → stable"
tldr:
  - "ツールは「速さ」ではなく「作り直しの少なさ（初稿採用率）」で選ぶ"
  - "全移行しない。1人・1週間で並走し、勝った方だけ広げる"
  - "速くなったときほど、人間の最終チェックを削らない"
  - "結果：初稿到達時間 5.2h → 3.0h（−42%）"
faq:
  - q: "RunwayよりKlingが優れているということですか？"
    a: "一般論ではありません。今回のユースケース（Instagram向けの人物が動くショート）で、初稿採用率が上がり作り直しが減った、という話です。用途が違えば結論は変わります。"
  - q: "人物の破綻はどう防いでいますか？"
    a: "一次選別をAIスコアで弾き、最終QAは必ず人が責任を持つ運用に戻しました。速くなっても人間のチェック工程は削りません。"
  - q: "同じことを自社でやるには何から始めればいいですか？"
    a: "まず1人・1週間で既存フローと並走比較し、初稿採用率・初稿到達時間・修正回数の3指標で判断するのがおすすめです。詳細は壁打ちで整理します。"
---

<p class="lead-quote" style="border-left:2px solid var(--gold);padding:6px 0 6px 24px;margin:8px 0 32px;font-size:18px;line-height:1.8;color:var(--off-white);font-weight:500;">結論から書きます。速くはなった。でも「そのまま量産」は失敗でした。どこを機械に任せ、どこを人が握るか——線引きがすべてです。</p>

アレンジでは、自社事業とクライアント向けに、Instagram用のショート動画を毎週量産しています。これまで初稿の生成はRunwayを中心に組んでいました。今回、生成エンジンをKlingに移行し、**初稿制作時間を42%削減**しました。ただし、そこに至るまでに一度こけています。その過程を、再現できる形で残します。

## なぜ移行したか

きっかけは速度ではなく、**「初稿の打率」**でした。Runwayでも品質は出せます。ただ、Instagramのショートで使う「人物が動くカット」で、採用できる初稿が出る確率が頭打ちになっていました。採用率が低いと、結局そのぶん作り直す。トータルの制作時間は、生成速度より**「一発で使えるか」**に支配されます。

- Runway：生成は安定。ただし人物モーションの初稿採用率が伸び悩み
- Kling：人物の動きの自然さで初稿採用率が上がる仮説
- 判断軸は「生成が速いか」ではなく「作り直しが減るか」

## やったこと

いきなり全移行はしません。**完成度60%で出す**のがアレンジの基本です。まず1人のクリエイターの1週間ぶんだけをKlingに切り替え、同じ企画をRunwayと並走させて比較しました。

<div class="logblock mono">
  <div class="head">EXPERIMENT SETUP — week 1</div>
  <div><span class="cmt"># 同一企画 / 同一尺 / 同一構成で並走</span></div>
  <div>runway_clips : 28</div>
  <div>kling_clips&nbsp; : 28</div>
  <div><span class="gd">metric</span> : 初稿採用率 / 初稿到達時間 / 修正回数</div>
  <div><span class="ok">→</span> 勝った方だけ翌週に拡張</div>
</div>

比較で見るのは見た目の好みではなく、**初稿採用率・初稿到達時間・修正回数**の3つだけ。主観を入れないために、採用判断は別メンバーが行いました。

> 速いツールが勝つのではない。作り直しが少ないツールが勝つ。

## 結果（数字）

1週間の並走で差が出たため、翌週から3クリエイターに拡張。8週間の運用で、初稿制作時間は安定して下がりました。

<div class="ba">
  <div class="ba__cell ba__before"><div class="ba__label mono">BEFORE — Runway</div><div class="ba__val mono">5.2h</div><div class="ba__sub">1本あたり初稿到達時間（平均）</div></div>
  <div class="ba__arrow"><div class="delta mono">-42%</div><div class="ar">→</div></div>
  <div class="ba__cell ba__after"><div class="ba__label mono">AFTER — Kling</div><div class="ba__val mono">3.0h</div><div class="ba__sub">同上 / 8週間運用後</div></div>
</div>

初稿採用率も上がり、修正回数が減ったぶん、後工程の編集者の負荷も下がりました。**速くなったのは生成ではなく、作り直しが減ったから**です。

## 失敗：量産で破綻した

ここからが本題です。速くなったので、調子に乗って量産しました。すると**84本中9本で、人物の手や顔が破綻**。しかも、そのうち2本は人間チェックをすり抜けて初稿提出まで進みました。原因ははっきりしています。速度が出たことで、**人間の確認工程を「省ける」と勘違いした**。

<div class="logblock mono">
  <div class="head">FAILURE LOG — week 4</div>
  <div><span class="rd">!</span> human figure broke : 9 / 84 clips</div>
  <div><span class="rd">!</span> passed QA by mistake : 2 clips</div>
  <div><span class="cmt"># cause</span> : 速度を理由に人間チェックを圧縮</div>
  <div><span class="ok">fix</span> : 最終QAは必ず人が責任を持つ運用に戻す</div>
</div>

これは[失敗ログ #007](/articles/ai-overuse-quality-drop/)として別途まとめています。AI化を進めるほど、最後に責任を持つ人間の判断が重要になる——という、毎回学び直す教訓でした。

<div class="inline-cta">
  <div class="inline-cta__t"><span class="mono">SAME PROBLEM?</span>AI動画の量産フローを、自社の現場に組み込みたい方へ。</div>
  <a href="https://arange.co.jp/#contact">30分の壁打ち →</a>
</div>

## 自動化と人間の線引き

失敗から、工程ごとに「機械に任せる／人が握る」を引き直しました。これが今のアレンジの標準です。

| 工程 | 担当 | 理由 |
|---|---|---|
| 企画・構成設計 | <span class="td-keep">人</span> | 何を見せ何を削るかは判断 |
| 初稿生成（素材） | <span class="td-auto">AI</span> | 速度と量はAIが圧倒的 |
| 人物カットの一次選別 | <span class="td-auto">AI</span> | 破綻候補をスコアで弾く |
| 最終QA・採用判断 | <span class="td-keep">人</span> | 責任を持つ工程は人が握る |
| クライアント提出 | <span class="td-keep">人</span> | 最後の一行は人が確認 |

ポイントは、**「AIに任せる」ではなく「AIに働かせる」**こと。人を抜くのではなく、人の判断を残す前提でフローを組む。これが量産しても崩れない条件でした。

## 学びと次の課題

- ツールは「速さ」ではなく「作り直しの少なさ」で選ぶ
- 全移行しない。1人・1週間で並走して、勝った方だけ広げる
- 速くなったときほど、人間チェックを削らない
- 次の課題：人物破綻の一次選別スコアの精度を上げる

現場ログでは、こうした検証を毎日続けています。うまくいった話も、こけた話も、そのまま残します。
