import propsData from "../data/props.json";

export type Firm = (typeof propsData)[number];

export interface Ranking {
  slug: string;
  title: string;
  headline: string;
  description: string;
  intro: string;
  filter: (f: Firm) => boolean;
  sort: (a: Firm, b: Firm) => number;
}

const maxSplit = (f: Firm) =>
  Math.max(...f.challenge_types.map((c) => c.profit_split_pct));
const minFee = (f: Firm) =>
  Math.min(...f.challenge_types.map((c) => c.fee_usd));

export const rankings: Ranking[] = [
  {
    slug: "beginner",
    title: "初心者におすすめのプロップファーム",
    headline: "初心者向け",
    description:
      "日本語サポート・信頼性・ルールの分かりやすさで選んだ、はじめてのプロップに最適な業者ランキング。",
    intro:
      "プロップファームは数十社あって最初は迷うもの。ここでは「日本語サポートあり」「設立から3年以上」「ルールがシンプル」の3条件で絞り込み、初心者でも安心して挑戦できる業者だけを評価順に並べました。",
    filter: (f) =>
      f.features.japanese_support || new Date().getFullYear() - f.founded_year >= 5,
    sort: (a, b) => b.review_score - a.review_score,
  },
  {
    slug: "high-split",
    title: "高プロフィットスプリットのプロップファーム",
    headline: "高スプリット重視",
    description:
      "プロフィットスプリット90%以上で選ぶ、リターン最大化を狙うトレーダー向けランキング。",
    intro:
      "プロフィットスプリットは「あなたの取り分の割合」。90%なら$10,000利益のうち$9,000があなたの手元に。同じ実力なら、スプリットが高いプロップで戦った方が手取りは大きくなります。",
    filter: (f) => maxSplit(f) >= 90,
    sort: (a, b) => maxSplit(b) - maxSplit(a),
  },
  {
    slug: "ea-friendly",
    title: "EA・自動売買OKのプロップファーム",
    headline: "EA・自動売買OK",
    description:
      "EA・スキャルピング・ニュース時取引が全て可能な、自動売買トレーダー向けのプロップ業者ランキング。",
    intro:
      "EA運用や高頻度スキャル、指標時の取引は禁止されているプロップも多くあります。ここではEA・スキャル・ニュース全てがクリアで使える業者だけを抽出しました。",
    filter: (f) =>
      f.features.ea_allowed &&
      f.features.scalping_allowed &&
      f.features.news_trading_allowed,
    sort: (a, b) => b.review_score - a.review_score,
  },
  {
    slug: "low-budget",
    title: "低予算で始められるプロップファーム",
    headline: "低予算スタート",
    description:
      "チャレンジ料金$500以下で始められる、コスパ重視・テスト運用におすすめのプロップ業者ランキング。",
    intro:
      "プロップ挑戦は失敗しても料金が戻らないため、最初の出費は抑えたいもの。ここでは最安プランが$500以下の業者だけを抽出し、コスパで比較できるようにしました。",
    filter: (f) => minFee(f) <= 500,
    sort: (a, b) => minFee(a) - minFee(b),
  },
  {
    slug: "japanese",
    title: "日本語対応のプロップファーム",
    headline: "日本語サポートあり",
    description:
      "日本語サポートがあるプロップファームだけを集めた、英語が苦手な日本人トレーダー向けのランキング。",
    intro:
      "プロップファームは海外業者がほとんど。トラブル時のサポートやルール確認で英語の壁にぶつかると致命的です。日本語で公式サポートを受けられる業者だけをここに集めました。",
    filter: (f) => f.features.japanese_support,
    sort: (a, b) => b.review_score - a.review_score,
  },
];

export const getRanking = (slug: string): Ranking | undefined =>
  rankings.find((r) => r.slug === slug);
