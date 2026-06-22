// IndexNow 送信スクリプト
// 公開中の sitemap-0.xml の全URLを IndexNow に通知する（Bing / Yandex / Seznam 等が対応）。
// ※ Google は IndexNow を採用していないため、これはBing系の発見を速める用途。
//
// 実行タイミング:
//   - Vercel 本番ビルド時に自動実行（vercel.json の buildCommand から呼ばれる）。
//     VERCEL_ENV=production のときだけ送信。preview/ローカルでは何もしない。
//   - 手動catch-up: `node scripts/indexnow-submit.mjs --now`（環境に関係なく即送信）

const KEY = "2a943f6d15955cdf9a9c8bfdc2ac80eb";
const HOST = "propfxnavi.com";
const SITEMAP = `https://${HOST}/sitemap-0.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const force = process.argv.includes("--now");
if (!force && process.env.VERCEL_ENV !== "production") {
  console.log("[indexnow] skip（本番ビルドでも --now でもないため送信しない）");
  process.exit(0);
}

try {
  const xml = await fetch(SITEMAP).then((r) => r.text());
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) {
    console.log("[indexnow] sitemap にURLが無いので中断");
    process.exit(0);
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });
  console.log(`[indexnow] ${urls.length}件のURLを送信 → ${res.status} ${res.statusText}`);
  // 200=受領 / 202=受領(キー検証は非同期)。それ以外はログだけ残してビルドは止めない。
  if (res.status !== 200 && res.status !== 202) {
    console.log(`[indexnow] 警告: 想定外のステータス。送信本文の先頭=${(await res.text()).slice(0, 200)}`);
  }
} catch (e) {
  // IndexNow送信失敗でビルドを落とさない（あくまでおまけ）
  console.log(`[indexnow] 送信エラー（ビルドは継続）: ${e.message}`);
}
