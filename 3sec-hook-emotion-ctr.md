---
const items = [
  '[2分前] <b>AI Workflow #018</b> 公開 ／ Instagram動画フローをKlingへ移行',
  '[1時間前] <b>Creative Test #044</b> CTR 1.2% → 2.8%',
  '[3時間前] <b>HYROX Log #012</b> 2週間継続率 +18%',
  '[今日] <b>Failure Log #007</b> AI化しすぎて品質低下',
];
const loop = [...items, ...items];
---
<div class="ticker" aria-hidden="true">
  <div class="ticker__track mono">
    <span><span class="dot"></span>LIVE</span>
    {loop.map((t) => <span set:html={t} />)}
  </div>
</div>
