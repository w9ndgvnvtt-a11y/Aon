/* =====================================================================
   AON 写真収蔵館 — script.js

   前半「収蔵品データ」を編集するだけで、作品・展示室・特別展・館内記録を
   差し替えられます。後半は館内を組み立てるプログラムです。
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. 館の基本情報
   --------------------------------------------------------------------- */
const MUSEUM = {
  photographer: "AON",
  hours: { open: "10:00", close: "18:00", timeZone: "Asia/Tokyo" },
  email: "hello@example.com",
};

/* ---------------------------------------------------------------------
   2. 収蔵品目録（すべての作品）
   no      : 収蔵番号。ラベルに「PHOTO 001」と表示されます
   src     : 画像ファイル（images/ 以下）
   title   : 作品名        year   : 制作年（不明なときは "n.d." ＝ 制作年不詳）
   medium  : 技法・素材    camera : 撮影情報（任意）
   place   : 撮影地（任意） note   : 解説文（任意。作品の前に近づいたとき表示）
   展示室に置かない作品は、自動的に「収蔵庫」扱いになります。
   --------------------------------------------------------------------- */
const WORKS = [
  { no: "001", src: "images/hall/001.jpg", title: "島", year: "n.d.", medium: "Photograph", note: "海に浮かぶ小さな島と、その上の夏の雲。当館の入口に掛けている一枚。" },
  { no: "002", src: "images/hall/002.jpg", title: "海へ続く踏切", year: "n.d.", medium: "Photograph", place: "Kanagawa", note: "踏切を渡った先に、そのまま海がある。この館の中心に置いている作品。" },
  { no: "003", src: "images/hall/003.jpg", title: "空に掲げる", year: "n.d.", medium: "Photograph", note: "青い空に、青いラベルのボトルを重ねて。" },
  { no: "004", src: "images/hall/004.jpg", title: "くらげ", year: "n.d.", medium: "Photograph" },

  { no: "005", src: "images/room01/005.jpg", title: "白い雲", year: "n.d.", medium: "Photograph" },
  { no: "006", src: "images/room01/006.jpg", title: "薄青", year: "n.d.", medium: "Photograph" },
  { no: "007", src: "images/room01/007.jpg", title: "かもめ", year: "n.d.", medium: "Photograph", note: "雲のあいだを一羽だけ横切っていく。" },
  { no: "008", src: "images/room01/008.jpg", title: "昼の月", year: "n.d.", medium: "Photograph", note: "青一色の空の、ほんの小さな白い点。" },

  { no: "009", src: "images/room02/009.jpg", title: "横断歩道", year: "n.d.", medium: "Photograph" },
  { no: "010", src: "images/room02/010.jpg", title: "進行方向", year: "n.d.", medium: "Photograph" },
  { no: "011", src: "images/room02/011.jpg", title: "横断歩道（冬）", year: "n.d.", medium: "Photograph" },
  { no: "012", src: "images/room02/012.jpg", title: "30", year: "n.d.", medium: "Photograph" },
  { no: "013", src: "images/room02/013.jpg", title: "塔", year: "n.d.", medium: "Photograph", place: "Kyoto" },
  { no: "014", src: "images/room02/014.jpg", title: "編隊", year: "n.d.", medium: "Photograph" },
  { no: "015", src: "images/room02/015.jpg", title: "ヘリコプター", year: "n.d.", medium: "Photograph" },

  { no: "016", src: "images/room03/016.jpg", title: "海沿いの電車", year: "n.d.", medium: "Photograph", place: "Kanagawa" },
  { no: "017", src: "images/room03/017.jpg", title: "浜辺の車", year: "n.d.", medium: "Photograph" },
  { no: "018", src: "images/room03/018.jpg", title: "線路のある町", year: "n.d.", medium: "Photograph", place: "Kanagawa" },
  { no: "019", src: "images/room03/019.jpg", title: "海面", year: "n.d.", medium: "Photograph" },
  { no: "020", src: "images/room03/020.jpg", title: "富士の見える線路", year: "n.d.", medium: "Photograph", place: "Kanagawa" },

  { no: "021", src: "images/room04/021.jpg", title: "かき氷", year: "n.d.", medium: "Photograph" },
  { no: "022", src: "images/room04/022.jpg", title: "カメラ", year: "n.d.", medium: "Photograph" },
  { no: "023", src: "images/room04/023.jpg", title: "白鳥", year: "n.d.", medium: "Photograph" },

  { no: "024", src: "images/exhibition/024.jpg", title: "-blur-", year: "n.d.", medium: "Photograph", note: "ピントを外した街の灯り。この特別展の表題作。" },
  { no: "025", src: "images/exhibition/025.jpg", title: "青い時間のビル", year: "n.d.", medium: "Photograph" },
  { no: "026", src: "images/exhibition/026.jpg", title: "電話ボックス", year: 2024, medium: "Film Photograph" },
  { no: "027", src: "images/exhibition/027.jpg", title: "雲間の月", year: "n.d.", medium: "Photograph" },

  { no: "028", src: "images/archive/028.jpg", title: "一匹のくらげ", year: "n.d.", medium: "Photograph" },
  { no: "029", src: "images/archive/029.jpg", title: "水に映る階段", year: "n.d.", medium: "Photograph" },
  { no: "030", src: "images/archive/030.jpg", title: "階段の影", year: "n.d.", medium: "Photograph" },
  { no: "031", src: "images/archive/031.jpg", title: "公衆電話", year: "n.d.", medium: "Photograph" },
  { no: "032", src: "images/archive/032.jpg", title: "らせん", year: "n.d.", medium: "Photograph" },
  { no: "033", src: "images/archive/033.jpg", title: "夜の池", year: "n.d.", medium: "Photograph" },
  { no: "034", src: "images/archive/034.jpg", title: "夕方の建築", year: "n.d.", medium: "Photograph", place: "Tokyo" },
  { no: "035", src: "images/archive/035.jpg", title: "白い軌跡", year: "n.d.", medium: "Photograph" },
  { no: "036", src: "images/archive/036.jpg", title: "川とタワー", year: "n.d.", medium: "Photograph", place: "Tokyo" },
  { no: "037", src: "images/archive/037.jpg", title: "夏の花", year: "n.d.", medium: "Photograph" },
  { no: "038", src: "images/archive/038.jpg", title: "日の入り", year: "n.d.", medium: "Photograph" },
  { no: "039", src: "images/archive/039.jpg", title: "満月", year: "n.d.", medium: "Photograph" },
  { no: "040", src: "images/archive/040.jpg", title: "ビル群", year: "n.d.", medium: "Photograph" },
  { no: "041", src: "images/archive/041.jpg", title: "霧の町", year: "n.d.", medium: "Photograph" },
  { no: "042", src: "images/archive/042.jpg", title: "木漏れ日", year: "n.d.", medium: "Photograph" },
  { no: "043", src: "images/archive/043.jpg", title: "鳳凰", year: "n.d.", medium: "Photograph", place: "Kyoto" },
  { no: "044", src: "images/archive/044.jpg", title: "塔のある坂道", year: "n.d.", medium: "Photograph", place: "Kyoto" },
  { no: "045", src: "images/archive/045.jpg", title: "狐", year: "n.d.", medium: "Photograph", place: "Kyoto" },
  { no: "046", src: "images/archive/046.jpg", title: "朱の御堂", year: "n.d.", medium: "Photograph", place: "Kyoto" },
  { no: "047", src: "images/archive/047.jpg", title: "金の楼閣", year: "n.d.", medium: "Photograph", place: "Kyoto" },
  { no: "048", src: "images/archive/048.jpg", title: "舞台", year: "n.d.", medium: "Photograph", place: "Kyoto" },
  { no: "049", src: "images/archive/049.jpg", title: "灯台", year: "n.d.", medium: "Photograph" },
  { no: "050", src: "images/archive/050.jpg", title: "夕暮れのタワー", year: "n.d.", medium: "Photograph", place: "Tokyo" },
  { no: "051", src: "images/archive/051.jpg", title: "月食", year: "n.d.", medium: "Photograph" },
];

/* ---------------------------------------------------------------------
   3. 展示空間
   layout（掛け方）:
     "hall"     … 中央に大きく1点、左右に小さく（1〜3点）
     "large"    … 大型作品を1面に1点ずつ
     "salon"    … 小さな作品を1面にまとめて掛け、解説は横のパネルに
     "corridor" … 作品を横方向の回廊に連続して
     "solo"     … 大きな余白の中に小さく1点ずつ
     "pair"     … 2点ずつ対にして
   frame（額）: "white" | "black" | "oak" | "none"
   map        : 館内案内図での位置（横12 × 縦9 のマス目）
   --------------------------------------------------------------------- */
const HALL = {
  id: "central-hall", no: "CENTRAL HALL", name: "CENTRAL HALL", ja: "中央ホール",
  layout: "hall", frame: "white",
  text: "館の中心にあるホール。この写真家の「青」を代表する三点を掛けています。海へ続く踏切、空に掲げたボトル、水槽のくらげ。",
  works: ["002", "003", "004"],
  map: { x: 4, y: 3, w: 4, h: 3.5 },
};

const ROOMS = [
  {
    id: "room01", no: "ROOM 01", name: "SKY", ja: "空",
    layout: "large", frame: "white",
    text: "見上げた先にあるのは、雲と、ときどき鳥や昼の月だけ。何も写っていないように見える空を、一面に一点ずつ掛けました。",
    works: ["005", "006", "007", "008"],
    map: { x: 0, y: 3, w: 4, h: 3.5 },
  },
  {
    id: "room02", no: "ROOM 02", name: "SIGNS", ja: "空に立つもの",
    layout: "salon", frame: "white",
    text: "標識、塔、飛行機。青い空を背にして立つものを、小さな額にまとめて一つの壁に掛けています。作品の番号は、壁の解説パネルと対応しています。",
    works: ["009", "010", "011", "012", "013", "014", "015"],
    map: { x: 0, y: 0, w: 4, h: 3 },
  },
  {
    id: "room03", no: "ROOM 03", name: "COASTLINE", ja: "海沿い",
    layout: "corridor", frame: "none",
    text: "海に浮かぶ島、海沿いを走る電車、浜辺に停めた車、線路の向こうの海。回廊を横に歩くように、海辺の線路をたどってください。",
    works: ["001", "016", "017", "018", "019", "020"],
    map: { x: 4, y: 0, w: 4, h: 3 },
  },
  {
    id: "room04", no: "ROOM 04", name: "SMALL THINGS", ja: "小さなもの",
    layout: "solo", frame: "black",
    text: "かき氷、デジタルカメラ、白鳥のキーホルダー。手のひらに乗るくらいのものを、広い壁に一点ずつ掛けました。",
    works: ["021", "022", "023"],
    map: { x: 8, y: 0, w: 4, h: 3 },
  },
];

/* 特別展 — 新しい展覧会を始めるときは、ここを書き換えます */
const EXHIBITION = {
  id: "exhibition", no: "SPECIAL EXHIBITION 01", name: "-blur-", ja: "にじむ夜",
  period: "2026.09.26 — 2026.12.27",
  layout: "pair", frame: "black",
  text: "ピントを外した街の灯り、青い時間のビル、夜の電話ボックス、雲間の月。輪郭がにじむ夜の光を集めました。企画：Aon&filosofia",
  works: ["024", "025", "026", "027"],
  map: { x: 8, y: 3, w: 4, h: 3.5 },
};

/* 館内記録（新しいものを上に） */
const JOURNAL = [
  { date: "2026.09.26", type: "INSTALLATION NOTE", text: "特別展「-blur-」を開幕。夜の光を撮った4点を特別展示室に設置。" },
  { date: "2026.09.26", type: "INSTALLATION NOTE", text: "常設展示室を SKY／SIGNS／COASTLINE／SMALL THINGS の4室に再構成。" },
  { date: "2026.09.26", type: "COLLECTION", text: "PHOTO 001〜051 を収蔵品目録に登録。京都の寺社や夜の街の作品は収蔵庫に保管。" },
];

/* 館内案内図に載せる、展示室以外の場所の位置 */
const PLACES = {
  entrance: { label: "ENTRANCE", ja: "入口", map: { x: 4, y: 6.5, w: 4, h: 2.5 } },
  archive: { label: "ARCHIVE", ja: "収蔵庫", map: { x: 8, y: 6.5, w: 4, h: 2.5 } },
  journal: { label: "JOURNAL", ja: "記録室", map: { x: 2, y: 6.5, w: 2, h: 2.5 } },
  about: { label: "ABOUT", ja: "案内所", map: { x: 0, y: 6.5, w: 2, h: 2.5 } },
  exit: { label: "EXIT", ja: "出口", map: null },
};

/* =====================================================================
   ここから下は館内を組み立てるプログラムです
   ===================================================================== */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const byNo = new Map(WORKS.map((w) => [w.no, w]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const GALLERIES = [HALL, ...ROOMS, EXHIBITION];

  // 作品がどこに展示されているか
  const locationOf = new Map();
  GALLERIES.forEach((g) => g.works.forEach((no) => locationOf.set(no, g)));

  // 見学順路
  const ROUTE = [
    { id: "entrance", label: "ENTRANCE", ja: "入口", map: PLACES.entrance.map },
    ...GALLERIES.map((g) => ({ id: g.id, label: g.id === "exhibition" ? "SPECIAL EXHIBITION" : g.no, sub: g.id === "central-hall" ? "" : g.name, ja: g.ja, map: g.map })),
    { id: "archive", label: "ARCHIVE", ja: PLACES.archive.ja, map: PLACES.archive.map },
    { id: "journal", label: "JOURNAL", ja: PLACES.journal.ja, map: PLACES.journal.map },
    { id: "about", label: "ABOUT", ja: PLACES.about.ja, map: PLACES.about.map },
    { id: "exit", label: "EXIT", ja: PLACES.exit.ja, map: null },
  ];
  const routeById = new Map(ROUTE.map((r) => [r.id, r]));

  /* ---------------- 作品（額装） ---------------- */
  function label(w, opts = {}) {
    const lines = [
      `<span class="l-no">PHOTO ${esc(w.no)}</span>`,
      `<span class="l-title">${esc(w.title)}</span>`,
      `<span class="l-year">${esc(w.year)}</span>`,
      opts.short ? "" : `<span class="l-medium">${esc(w.camera || w.medium)}</span>`,
    ];
    return lines.join("");
  }

  function artwork(no, frame, opts = {}) {
    const w = byNo.get(no);
    if (!w) return "";
    const key = opts.key ? `<span class="work-key" aria-hidden="true">${opts.key}</span>` : "";
    const caption = opts.noLabel ? "" : `<figcaption class="label">${label(w)}</figcaption>`;
    return `
      <figure class="work ${opts.cls || ""}" data-no="${esc(w.no)}">
        <button class="frame frame--${frame}" type="button" data-open="${esc(w.no)}" aria-label="PHOTO ${esc(w.no)}「${esc(w.title)}」を間近で見る">
          <span class="mat"><img src="${esc(w.src)}" alt="${esc(w.title)}（${esc(w.year)}）" loading="lazy" decoding="async"></span>
        </button>
        ${key}${caption}
      </figure>`;
  }

  /* ---------------- 展示室 ---------------- */
  function roomSign(g) {
    const period = g.period ? `<p class="sign-period">${esc(g.period)}</p>` : "";
    const nameLine = g.id === "central-hall"
      ? `<h2 class="sign-name">${esc(g.ja)}</h2>`
      : `<h2 class="sign-name">${esc(g.name)}<span class="sign-ja">${esc(g.ja)}</span></h2>`;
    return `
      <header class="room-sign">
        <p class="sign-no">${esc(g.no)}</p>
        ${nameLine}
        ${period}
        <p class="sign-text">${esc(g.text)}</p>
        <p class="sign-count">展示作品 ${g.works.length} 点</p>
      </header>`;
  }

  const LAYOUTS = {
    hall(g) {
      const [main, ...side] = g.works;
      return `<div class="wall wall--hall">
        ${side[0] ? artwork(side[0], g.frame, { cls: "work--side" }) : ""}
        ${artwork(main, g.frame, { cls: "work--main" })}
        ${side[1] ? artwork(side[1], g.frame, { cls: "work--side" }) : ""}
      </div>`;
    },
    large(g) {
      return g.works.map((no, i) => `<div class="wall wall--large"><span class="wall-mark" aria-hidden="true">WALL ${String.fromCharCode(65 + i)}</span>${artwork(no, g.frame)}</div>`).join("");
    },
    salon(g) {
      const hung = g.works.map((no, i) => artwork(no, g.frame, { noLabel: true, key: i + 1, cls: `work--salon s${i % 4}` })).join("");
      const panel = g.works.map((no, i) => {
        const w = byNo.get(no);
        return `<li><span class="p-key">${i + 1}</span><span>${label(w)}</span></li>`;
      }).join("");
      return `<div class="wall wall--salon"><div class="salon-hang">${hung}</div><ol class="label-panel" aria-label="作品解説">${panel}</ol></div>`;
    },
    corridor(g) {
      return `<div class="wall wall--corridor">
        <div class="corridor-stage">
          <div class="corridor-track" tabindex="0" aria-label="${esc(g.name)} の回廊（横にスクロール）">
            ${g.works.map((no) => artwork(no, g.frame, { cls: "work--wide" })).join("")}
          </div>
          <div class="corridor-guide">
            <button type="button" class="corridor-step" data-dir="-1" aria-label="回廊を戻る">←</button>
            <span class="corridor-hint">回廊を横に歩く</span>
            <span class="corridor-progress" aria-hidden="true"><span></span></span>
            <button type="button" class="corridor-step" data-dir="1" aria-label="回廊を進む">→</button>
          </div>
        </div>
      </div>`;
    },
    solo(g) {
      return g.works.map((no) => `<div class="wall wall--solo">${artwork(no, g.frame, { cls: "work--solo" })}</div>`).join("");
    },
    pair(g) {
      const out = [];
      for (let i = 0; i < g.works.length; i += 2) {
        out.push(`<div class="wall wall--pair">${artwork(g.works[i], g.frame)}${g.works[i + 1] ? artwork(g.works[i + 1], g.frame) : ""}</div>`);
      }
      return out.join("");
    },
  };

  function passage(next) {
    if (!next) return "";
    const name = next.sub ? `${next.label} — ${next.sub}` : next.label;
    return `<a class="passage" href="#${next.id}" data-goto="${next.id}">
      <span class="passage-door" aria-hidden="true"></span>
      <span class="passage-text"><span class="passage-kicker">次の展示室へ</span>${esc(name)}<span class="passage-ja">${esc(next.ja)}</span></span>
    </a>`;
  }

  function renderGalleries() {
    const html = GALLERIES.map((g) => {
      const idx = ROUTE.findIndex((r) => r.id === g.id);
      const kind = g.id === "central-hall" ? "hall" : g.id === "exhibition" ? "special" : "room";
      return `<section class="space gallery gallery--${kind} layout-${g.layout}" id="${g.id}" data-space="${g.id}" aria-label="${esc(g.no)} ${esc(g.ja)}">
        ${roomSign(g)}
        ${LAYOUTS[g.layout] ? LAYOUTS[g.layout](g) : LAYOUTS.large(g)}
        <div class="baseboard" aria-hidden="true"></div>
      </section>${passage(ROUTE[idx + 1])}`;
    }).join("");
    $("#galleries").innerHTML = html;

    $("#now-on-view").innerHTML = `<span class="nov-kicker">NOW ON VIEW</span>特別展「${esc(EXHIBITION.name)}」${esc(EXHIBITION.ja)}<span class="nov-period">${esc(EXHIBITION.period)}</span>`;

    // 回廊の送り
    $$(".corridor-step").forEach((b) => b.addEventListener("click", () => {
      const track = b.closest(".wall--corridor").querySelector(".corridor-track");
      track.scrollBy({ left: Number(b.dataset.dir) * track.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" });
    }));
  }

  /* ---------------- 収蔵品目録 ---------------- */
  let catalogueFilter = "all";
  function renderCatalogue() {
    const rows = WORKS.filter((w) => {
      const onView = locationOf.has(w.no);
      return catalogueFilter === "all" || (catalogueFilter === "view" ? onView : !onView);
    });
    $("#catalogue-body").innerHTML = rows.map((w) => {
      const loc = locationOf.get(w.no);
      const where = loc ? `<span class="loc loc--view">${esc(loc.id === "exhibition" ? "SPECIAL EXH." : loc.no)}</span>` : `<span class="loc">収蔵庫</span>`;
      return `<tr data-open="${esc(w.no)}" data-list="catalogue">
        <td class="c-no">${esc(w.no)}</td>
        <td class="c-title"><button type="button" data-open="${esc(w.no)}" data-list="catalogue">${esc(w.title)}</button></td>
        <td class="c-year">${esc(w.year)}</td>
        <td class="c-medium">${esc(w.medium)}</td>
        <td class="c-loc">${where}</td>
      </tr>`;
    }).join("");
    $("#catalogue-count").textContent = `${rows.length} 点`;
    catalogueList = rows.map((w) => w.no);
  }
  let catalogueList = [];

  $$(".catalogue-filter [data-filter]").forEach((b) => b.addEventListener("click", () => {
    catalogueFilter = b.dataset.filter;
    $$(".catalogue-filter [data-filter]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    renderCatalogue();
  }));

  // 目録の行にカーソルを重ねると、小さく作品が見える
  const peek = $("#catalogue-peek");
  const peekImg = $("img", peek);
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (finePointer) {
    $("#catalogue-body").addEventListener("mousemove", (e) => {
      const tr = e.target.closest("tr");
      if (!tr) return;
      const w = byNo.get(tr.dataset.open);
      if (peekImg.getAttribute("src") !== w.src) peekImg.src = w.src;
      peek.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 60}px)`;
      peek.classList.add("on");
    });
    $("#catalogue-body").addEventListener("mouseleave", () => peek.classList.remove("on"));
  }

  /* ---------------- 館内記録 ---------------- */
  function renderJournal() {
    $("#logbook").innerHTML = JOURNAL.map((j) => `
      <li class="log">
        <time class="log-date">${esc(j.date)}</time>
        <p class="log-type">${esc(j.type)}</p>
        <p class="log-text">${esc(j.text)}</p>
      </li>`).join("");
  }

  /* ---------------- 館内案内図 ---------------- */
  const U = 50; // 1マス = 50px
  function center(m) { return { x: (m.x + m.w / 2) * U, y: (m.y + m.h / 2) * U }; }
  function sharedDoor(a, b) {
    const eps = 0.001;
    const ov = (a1, a2, b1, b2) => [Math.max(a1, b1), Math.min(a2, b2)];
    if (Math.abs(a.x + a.w - b.x) < eps || Math.abs(b.x + b.w - a.x) < eps) {
      const x = Math.abs(a.x + a.w - b.x) < eps ? b.x : a.x;
      const [y1, y2] = ov(a.y, a.y + a.h, b.y, b.y + b.h);
      if (y2 - y1 > eps) return { x: x * U, y: ((y1 + y2) / 2) * U, v: true };
    }
    if (Math.abs(a.y + a.h - b.y) < eps || Math.abs(b.y + b.h - a.y) < eps) {
      const y = Math.abs(a.y + a.h - b.y) < eps ? b.y : a.y;
      const [x1, x2] = ov(a.x, a.x + a.w, b.x, b.x + b.w);
      if (x2 - x1 > eps) return { x: ((x1 + x2) / 2) * U, y: y * U, v: false };
    }
    return null;
  }

  function renderMap() {
    const spaces = ROUTE.filter((r) => r.map);
    const W = Math.max(...spaces.map((s) => s.map.x + s.map.w)) * U;
    const H = Math.max(...spaces.map((s) => s.map.y + s.map.h)) * U;
    const pad = 28;
    const lobby = routeById.get("entrance").map;

    // 順路と扉
    const doors = [];
    let path = "";
    for (let i = 0; i < spaces.length - 1; i++) {
      const a = spaces[i].map, b = spaces[i + 1].map;
      const pts = [center(a)];
      const d = sharedDoor(a, b);
      if (d) { doors.push(d); pts.push(d); }
      else {
        const d1 = sharedDoor(a, lobby), d2 = sharedDoor(lobby, b);
        if (d1 && d2) { doors.push(d1, d2); pts.push(d1, center(lobby), d2); }
      }
      pts.push(center(b));
      path += pts.map((p, j) => `${i === 0 && j === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " ";
    }

    const rooms = spaces.map((s) => {
      const m = s.map, c = center(m);
      const small = m.w < 3;
      return `<g class="plan-room" data-room="${s.id}">
        <rect x="${m.x * U}" y="${m.y * U}" width="${m.w * U}" height="${m.h * U}"/>
        <text x="${c.x}" y="${c.y - (small ? 2 : 6)}" class="plan-label${small ? " sm" : ""}">${esc(s.label)}</text>
        ${s.sub && !small ? `<text x="${c.x}" y="${c.y + 10}" class="plan-sub">${esc(s.sub)}</text>` : ""}
        <text x="${c.x}" y="${c.y + (small ? 12 : 26)}" class="plan-ja">${esc(s.ja)}</text>
      </g>`;
    }).join("");

    const doorMarks = doors.map((d) => d.v
      ? `<line x1="${d.x}" y1="${d.y - 11}" x2="${d.x}" y2="${d.y + 11}" class="plan-door"/>`
      : `<line x1="${d.x - 11}" y1="${d.y}" x2="${d.x + 11}" y2="${d.y}" class="plan-door"/>`).join("");

    const ent = center(lobby);
    const entY = (lobby.y + lobby.h) * U;
    const svg = (key) => `
      <svg viewBox="${-pad} ${-pad} ${W + pad * 2} ${H + pad * 2 + 30}" role="img" aria-label="館内案内図">
        <defs><pattern id="grid-${key}" width="${U / 2}" height="${U / 2}" patternUnits="userSpaceOnUse"><path d="M${U / 2} 0H0V${U / 2}" class="plan-grid"/></pattern></defs>
        <rect x="${-pad}" y="${-pad}" width="${W + pad * 2}" height="${H + pad * 2 + 30}" fill="url(#grid-${key})"/>
        ${rooms}
        <rect x="0" y="0" width="${W}" height="${H}" class="plan-outer"/>
        ${doorMarks}
        <line x1="${ent.x - 22}" y1="${entY}" x2="${ent.x + 22}" y2="${entY}" class="plan-door"/>
        <path d="M${ent.x - 22},${entY} A22,22 0 0 1 ${ent.x},${entY + 22}" class="plan-swing"/>
        <path d="M${ent.x + 22},${entY} A22,22 0 0 0 ${ent.x},${entY + 22}" class="plan-swing"/>
        <text x="${ent.x}" y="${entY + 44}" class="plan-sub">ENTRANCE / EXIT</text>
        <path d="${path}" class="plan-route"/>
        <g class="plan-here"><circle r="9"/><circle r="16" class="ring"/><text y="-24" class="plan-here-label">現在地</text></g>
      </svg>`;
    $("#map-plan").innerHTML = svg("dialog");
    const intro = $("#intro-plan");
    if (intro) {
      intro.innerHTML = svg("intro");
      const hall = routeById.get("central-hall");
      if (hall && hall.map) {
        const c = center(hall.map);
        intro.style.setProperty("--zoom-x", `${((c.x + pad) / (W + pad * 2)) * 100}%`);
        intro.style.setProperty("--zoom-y", `${((c.y + pad) / (H + pad * 2 + 30)) * 100}%`);
      }
    }

    $("#map-index").innerHTML = ROUTE.map((r, i) => `
      <li><a href="#${r.id}" data-goto="${r.id}" data-index="${r.id}">
        <span class="mi-no">${String(i).padStart(2, "0")}</span>
        <span class="mi-name">${esc(r.label)}${r.sub ? ` <small>${esc(r.sub)}</small>` : ""}</span>
        <span class="mi-ja">${esc(r.ja)}</span>
      </a></li>`).join("");

    $$(".plan-room").forEach((g) => {
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "link");
      const go = () => goTo(g.dataset.room);
      g.addEventListener("click", go);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  }

  function updateMapHere(id) {
    const r = routeById.get(id);
    const m = (r && r.map) || PLACES.entrance.map;
    const c = center(m);
    $$(".plan-here").forEach((here) => here.setAttribute("transform", `translate(${c.x},${c.y + (id === "exit" ? m.h * U / 2 + 18 : -m.h * U / 2 + 22)})`));
    $$(".plan-room").forEach((g) => g.classList.toggle("is-here", g.dataset.room === id));
    $$("#map-index a").forEach((a) => a.toggleAttribute("aria-current", a.dataset.index === id));
  }

  /* ---------------- 現在地 ---------------- */
  const hereEl = $("#here");
  let currentSpace = "entrance";
  function setHere(id) {
    if (id === currentSpace) return;
    currentSpace = id;
    const r = routeById.get(id);
    hereEl.textContent = r ? (r.sub ? `${r.label} — ${r.sub}` : r.label) : id.toUpperCase();
    updateMapHere(id);
  }
  function watchSpaces() {
    const spaces = $$("[data-space]");
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let found = spaces[0];
      for (const s of spaces) { if (s.getBoundingClientRect().top <= line) found = s; }
      setHere(found.dataset.space);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- 照明（作品が静かに現れる） ---------------- */
  function watchLights() {
    const els = $$(".work, .room-sign, .log, .passage");
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach((e) => e.classList.add("lit")); return; }
    document.documentElement.classList.add("lights-managed");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("lit"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------------- 展示室の移動（暗転） ---------------- */
  const curtain = $("#curtain");
  const curtainText = $("#curtain-text");
  let moving = false;
  function goTo(id, { push = true } = {}) {
    const target = document.getElementById(id);
    if (!target || moving) return;
    closeMap(false);
    const r = routeById.get(id);
    const jump = () => {
      target.scrollIntoView({ behavior: "instant", block: "start" });
      if (push) history.replaceState(null, "", `#${id}`);
      setHere(id);
    };
    if (reduceMotion) { jump(); return; }
    moving = true;
    curtainText.innerHTML = r ? `<span>${esc(r.label)}</span>${r.sub ? esc(r.sub) : esc(r.ja)}` : "";
    curtain.classList.add("on");
    setTimeout(() => {
      jump();
      setTimeout(() => { curtain.classList.remove("on"); moving = false; }, 380);
    }, 520);
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-goto]");
    if (!a) return;
    e.preventDefault();
    goTo(a.dataset.goto);
  });

  /* ---------------- 館内案内図の開閉 ---------------- */
  const map = $("#map");
  const mapBtn = $("#map-btn");
  function openMap() {
    updateMapHere(currentSpace);
    map.hidden = false;
    requestAnimationFrame(() => map.classList.add("open"));
    document.body.classList.add("locked");
    $(".map-close", map).focus();
  }
  function closeMap(restore = true) {
    if (map.hidden) return;
    map.classList.remove("open");
    map.hidden = true;
    document.body.classList.remove("locked");
    if (restore) mapBtn.focus();
  }
  mapBtn.addEventListener("click", openMap);
  map.addEventListener("click", (e) => { if (e.target === map || e.target.closest("[data-close-map]")) closeMap(); });

  /* ---------------- 作品の前まで近づく ---------------- */
  const viewer = $("#viewer");
  const vFrame = $("#viewer-frame");
  const vImg = $("#viewer-img");
  let vList = [], vIndex = 0, vSource = null, lastFocus = null;

  function fillViewer(no) {
    const w = byNo.get(no);
    const loc = locationOf.get(no);
    vImg.src = w.src;
    vImg.alt = `${w.title}（${w.year}）`;
    $("#vl-no").textContent = `PHOTO ${w.no}`;
    $("#vl-title").textContent = w.title;
    $("#vl-year").textContent = w.year;
    const meta = [["Medium", w.medium], ["Camera", w.camera], ["Place", w.place], ["Photograph by", MUSEUM.photographer]].filter((m) => m[1]);
    $("#vl-meta").innerHTML = meta.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
    $("#vl-note").textContent = w.note || "";
    $("#vl-note").hidden = !w.note;
    $("#vl-where").textContent = loc ? `${loc.id === "exhibition" ? "SPECIAL EXHIBITION" : loc.no} ${loc.ja ? "／" + loc.ja : ""} にて展示中` : "収蔵庫に保管中";
    $("#vl-count").textContent = `${vIndex + 1} / ${vList.length}`;
    const one = vList.length < 2;
    $("#vl-prev").disabled = one; $("#vl-next").disabled = one;
    vFrame.className = `frame viewer-frame frame--${(loc && loc.frame) || "white"}`;
  }

  function listFor(trigger, no) {
    if (trigger.dataset.list === "catalogue") return catalogueList.slice();
    const space = trigger.closest("[data-space]");
    const list = space ? $$("[data-open]", space).filter((el) => el.classList.contains("frame") && el.offsetParent !== null).map((el) => el.dataset.open) : [];
    return list.length ? list : [no];
  }

  function flip(fromEl, toEl, reverse) {
    if (reduceMotion || !fromEl) return Promise.resolve();
    const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
    if (!a.width || !b.width || a.bottom < 0 || a.top > window.innerHeight) return Promise.resolve();
    const t = `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
    toEl.style.transformOrigin = "0 0";
    const frames = reverse ? [{ transform: "none" }, { transform: t }] : [{ transform: t }, { transform: "none" }];
    return toEl.animate(frames, { duration: reverse ? 420 : 720, easing: "cubic-bezier(.2,.7,.1,1)", fill: reverse ? "forwards" : "none" }).finished.catch(() => {});
  }

  async function openViewer(trigger) {
    const no = trigger.dataset.open;
    lastFocus = trigger;
    vSource = trigger.classList.contains("frame") ? trigger : null;
    vList = listFor(trigger, no);
    vIndex = Math.max(0, vList.indexOf(no));
    fillViewer(no);
    viewer.hidden = false;
    document.body.classList.add("locked");
    try { await vImg.decode(); } catch (e) { /* 画像が読めない場合もそのまま開く */ }
    viewer.classList.add("open");
    flip(vSource, vFrame, false);
    $("#vl-back").focus();
  }

  async function closeViewer() {
    if (viewer.hidden) return;
    const current = vList[vIndex];
    const src = vSource && vSource.dataset.open === current ? vSource : null;
    viewer.classList.remove("open");
    viewer.classList.add("closing");
    await Promise.all([flip(src, vFrame, true), new Promise((r) => setTimeout(r, reduceMotion ? 0 : 380))]);
    vFrame.getAnimations().forEach((a) => a.cancel());
    viewer.classList.remove("closing");
    viewer.hidden = true;
    document.body.classList.remove("locked");
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function step(d) {
    if (vList.length < 2) return;
    vIndex = (vIndex + d + vList.length) % vList.length;
    vSource = null;
    const btn = $$(`.frame[data-open="${vList[vIndex]}"]`).find((el) => el.offsetParent !== null);
    if (btn) { vSource = btn; lastFocus = btn; }
    viewer.classList.add("stepping");
    setTimeout(() => { fillViewer(vList[vIndex]); viewer.classList.remove("stepping"); }, reduceMotion ? 0 : 220);
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (!t || viewer.contains(t)) return;
    const trigger = t.tagName === "TR" ? t.querySelector("button[data-open]") : t;
    openViewer(trigger);
  });
  $("#vl-back").addEventListener("click", closeViewer);
  $("#vl-prev").addEventListener("click", () => step(-1));
  $("#vl-next").addEventListener("click", () => step(1));
  viewer.addEventListener("click", (e) => { if (e.target === viewer || e.target.classList.contains("viewer-stage") || e.target.classList.contains("viewer-work")) closeViewer(); });

  let touchX = null;
  viewer.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
    touchX = null;
  });

  document.addEventListener("keydown", (e) => {
    if (!viewer.hidden) {
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "Tab") trapFocus(e, viewer);
    } else if (!map.hidden) {
      if (e.key === "Escape") closeMap();
      else if (e.key === "Tab") trapFocus(e, map);
    }
  });
  function trapFocus(e, root) {
    const f = $$("button:not([disabled]), a[href], [tabindex='0']", root).filter((el) => el.offsetParent !== null || el instanceof SVGElement);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------------- 開館時間と照明 ---------------- */
  const root = document.documentElement;
  let lightsOverride = null; // null = 時刻に従う
  function museumTime() {
    try {
      const p = new Intl.DateTimeFormat("en-GB", { timeZone: MUSEUM.hours.timeZone, hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      const h = Number(p.find((x) => x.type === "hour").value) % 24, m = Number(p.find((x) => x.type === "minute").value);
      return h * 60 + m;
    } catch (e) { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
  }
  const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
  function isOpenNow() { const t = museumTime(); return t >= toMin(MUSEUM.hours.open) && t < toMin(MUSEUM.hours.close); }
  function applyHours() {
    const open = isOpenNow();
    const lit = lightsOverride === null ? open : lightsOverride;
    root.dataset.hours = lit ? "open" : "closed";
    $("#hours-text").textContent = open ? "OPEN" : "CLOSED";
    $("#hours-btn").setAttribute("aria-pressed", String(!lit));
    $("#hours-btn").title = lit ? "照明を落とす（閉館後の館内）" : "照明をつける";
    $("#closed-note").hidden = open;
  }
  $("#hours-btn").addEventListener("click", () => {
    const lit = root.dataset.hours === "open";
    lightsOverride = !lit;
    applyHours();
  });
  $("#hours-range").textContent = `${MUSEUM.hours.open} — ${MUSEUM.hours.close}`;

  /* ---------------- 館内環境音（ONにしたときだけ） ---------------- */
  let audio = null;
  let soundOn = false;
  function startAmbience() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    // 空調のような低いノイズ
    const len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.2; }
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 380;
    const gain = ctx.createGain(); gain.gain.value = 0;
    src.connect(lp).connect(gain).connect(ctx.destination);
    src.start();
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2.5);
    return { ctx, gain };
  }
  $("#sound-btn").addEventListener("click", () => {
    const btn = $("#sound-btn");
    if (!audio) { audio = startAmbience(); if (!audio) return; }
    const on = btn.getAttribute("aria-pressed") !== "true";
    if (on) { audio.ctx.resume(); audio.gain.gain.cancelScheduledValues(audio.ctx.currentTime); audio.gain.gain.linearRampToValueAtTime(0.05, audio.ctx.currentTime + 1.5); }
    else { audio.gain.gain.cancelScheduledValues(audio.ctx.currentTime); audio.gain.gain.linearRampToValueAtTime(0, audio.ctx.currentTime + 0.8); }
    btn.setAttribute("aria-pressed", String(on));
    $("#sound-state").textContent = on ? "ON" : "OFF";
    soundOn = on;
  });

  // 足音（SOUND が ON のときだけ）。短く低いノイズを、床の硬さくらいに絞る
  let stepBuf = null;
  function playStep(strength) {
    if (!soundOn || !audio) return;
    const ctx = audio.ctx;
    if (!stepBuf) {
      const len = Math.floor(ctx.sampleRate * 0.14);
      stepBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = stepBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    const src = ctx.createBufferSource(); src.buffer = stepBuf;
    src.playbackRate.value = 0.85 + Math.random() * 0.3;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 170 + Math.random() * 60; bp.Q.value = 0.9;
    const g = ctx.createGain(); g.gain.value = 0.35 * strength;
    src.connect(bp).connect(g).connect(ctx.destination);
    src.start();
  }

  /* ---------------- 受付 ---------------- */
  const emailEl = $("#email");
  emailEl.textContent = MUSEUM.email;
  emailEl.href = `mailto:${MUSEUM.email}`;
  $("#copy-btn").addEventListener("click", () => {
    const status = $("#copy-status");
    const done = () => { status.textContent = "コピーしました"; setTimeout(() => (status.textContent = ""), 2400); };
    const fallback = () => {
      const range = document.createRange(); range.selectNodeContents(emailEl);
      const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      status.textContent = "選択しました。コピーしてお使いください";
    };
    if (navigator.clipboard) navigator.clipboard.writeText(MUSEUM.email).then(done, fallback); else fallback();
  });

  /* ---------------- 歩く：展示室を 3D で歩き、作品の前で立ち止まる ----------------
     ストリートビューのように、スクロールすると視点（カメラ）が部屋の中を進みます。
       前を向いて歩く → 壁の作品へ向き直って近づく → 作品の前で立ち止まる → 次へ
     ・ドラッグ（スマホは横スワイプ）で見回せます。手を離すと正面に戻ります
     ・画面下の矢印で、前後の作品へ移動できます
     ・掛け方（layout）ごとに、歩き方と作品の大きさが変わります
         large：左右の壁に大きく交互　 salon：片側の壁に小品を並べて横歩き
         corridor：反対側の壁に続けて横歩き　 solo：小さな作品を長い間隔で
         pair：同じ場所で左右を振り返る　 hall：左右を見てから正面の壁の大作へ
     「動きを減らす」設定の端末では、通常の縦に並んだ展示になります。 */
  const SV_LAYOUT = {
    large: (i) => ({ side: i % 2 ? "R" : "L", d: 1.25 + i * 1.0, h: 0.56, y: -0.02 }),
    salon: (i) => ({ side: "L", d: 1.1 + i * 0.72, h: [0.4, 0.3, 0.36, 0.28][i % 4], y: [-0.05, 0.07, -0.09, 0.04][i % 4] }),
    corridor: (i) => ({ side: "R", d: 1.1 + i * 0.95, h: 0.44, y: 0 }),
    solo: (i) => ({ side: i % 2 ? "R" : "L", d: 1.35 + i * 1.6, h: 0.26, y: -0.03 }),
    pair: (i) => ({ side: i % 2 ? "R" : "L", d: 1.2 + Math.floor(i / 2) * 1.3, h: 0.5, y: -0.02 }),
  };

  function planStops(g) {
    if (g.layout === "hall") {
      const [main, ...sides] = g.works;
      const stops = sides.slice(0, 2).map((no, i) => ({ no, side: i ? "R" : "L", d: 1.15, h: 0.44, y: -0.02 }));
      const len = 1.15 + 1.75;
      stops.push({ no: main, side: "E", d: len - 1, h: 0.62, y: -0.03 });
      return { stops, len };
    }
    const f = SV_LAYOUT[g.layout] || SV_LAYOUT.large;
    const stops = g.works.map((no, i) => ({ no, ...f(i) }));
    const len = Math.max(...stops.map((s) => s.d)) + 1.4;
    return { stops, len };
  }

  // カメラの通り道（z：歩いた距離［壁までの距離を 1 とする単位］、yaw：向き［左 +90 / 右 -90］、w：スクロール量［画面の高さ単位］）
  function planKeys(stops, len) {
    const keys = [{ z: 0.15, yaw: 0, w: 0 }];
    let cur = keys[0];
    const push = (k) => { keys.push(k); cur = k; };
    stops.forEach((s, i) => {
      const yaw = s.side === "L" ? 90 : s.side === "R" ? -90 : 0;
      const z = s.d;
      const dz = Math.abs(z - cur.z);
      if (cur.yaw === yaw && cur.stop !== undefined) {
        push({ z, yaw, w: 0.35 + dz * 0.4 });                    // 同じ壁に沿って横へ歩く
      } else if (dz > 0.35) {
        push({ z: z - 0.3, yaw: 0, w: 0.3 + dz * 0.4 });         // 前を向いて歩く
        push({ z, yaw, w: 0.45 });                               // 作品へ向き直る
      } else {
        push({ z, yaw, w: 0.5 });                                // その場で振り返る
      }
      push({ z, yaw, w: 0.55, stop: i });                        // 立ち止まって見る
    });
    push({ z: len - 1.05, yaw: 0, w: 0.3 + Math.abs(len - 1.05 - cur.z) * 0.4 });
    push({ z: len - 1.05, yaw: 0, w: 0.3, end: true });
    return keys;
  }

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const clampN = (v, a, b) => Math.min(b, Math.max(a, v));

  function buildScene(g) {
    const section = document.getElementById(g.id);
    if (!section) return null;
    const { stops, len } = planStops(g);
    const keys = planKeys(stops, len);
    const total = keys.reduce((a, k) => a + k.w, 0);
    const idx = ROUTE.findIndex((r) => r.id === g.id);
    const next = ROUTE[idx + 1];
    const chevron = (d) => `<svg viewBox="0 0 40 24" aria-hidden="true"><path d="${d}"/></svg>`;

    const el = document.createElement("div");
    el.className = `sv sv--${g.layout}`;
    el.innerHTML = `
      <div class="sv-sticky">
        <div class="sv-view">
          <div class="sv-world">
            <div class="sv-plane sv-floor"></div>
            <div class="sv-plane sv-ceil"><span></span><span></span></div>
            <div class="sv-plane sv-wall sv-left"></div>
            <div class="sv-plane sv-wall sv-right"></div>
            <div class="sv-plane sv-wall sv-end">
              ${next ? `<a class="sv-door" href="#${next.id}" data-goto="${next.id}"><span class="sv-door-kicker">NEXT</span><span class="sv-door-name">${esc(next.sub ? `${next.label} — ${next.sub}` : next.label)}</span><span class="sv-door-ja">${esc(next.ja)}</span></a>` : ""}
            </div>
          </div>
        </div>
        <div class="sv-shade" aria-hidden="true"></div>
        <div class="sv-hud">
          <div class="sv-card"><p class="sv-room">${esc(g.no)}${g.id === "central-hall" ? "" : ` — ${esc(g.name)}`}<span>${esc(g.ja)}</span></p><p class="sv-now" aria-live="polite"></p></div>
          <div class="sv-nav">
            <button type="button" class="sv-arrow" data-dir="-1" aria-label="前の作品へ戻る">${chevron("M4 20 L20 6 L36 20")}</button>
            <span class="sv-count"></span>
            <button type="button" class="sv-arrow" data-dir="1" aria-label="次の作品へ進む">${chevron("M4 4 L20 18 L36 4")}</button>
          </div>
          <div class="sv-compass" aria-hidden="true"><span class="sv-needle"></span><span class="sv-n">N</span></div>
          <p class="sv-hint">スクロールで進む ・ ドラッグで見回す</p>
        </div>
      </div>`;
    $(".room-sign", section).after(el);
    // 3D の部屋は大きいので、近くにいるときだけ描く（スマホのメモリを使いすぎないように）
    $(".sv-world", el).style.display = "none";

    const walls = { L: $(".sv-left", el), R: $(".sv-right", el), E: $(".sv-end", el) };
    const items = stops.map((s, i) => {
      const wrap = document.createElement("div");
      wrap.className = "sv-work";
      wrap.innerHTML = artwork(s.no, g.frame);
      $(".work", wrap).classList.add("lit");
      $("img", wrap).loading = "eager";
      walls[s.side].appendChild(wrap);
      if (s.side === "E") walls.E.classList.add("has-work");
      return { ...s, el: wrap, i };
    });

    return {
      g, el, section, stops: items, keys, total, len,
      sticky: $(".sv-sticky", el), view: $(".sv-view", el), world: $(".sv-world", el), shade: $(".sv-shade", el),
      floor: $(".sv-floor", el), ceil: $(".sv-ceil", el), walls,
      now: $(".sv-now", el), count: $(".sv-count", el), needle: $(".sv-needle", el), hint: $(".sv-hint", el),
      focus: -2, top: 0, height: 0, lastZ: null, walked: 0, activity: 0, shown: false,
    };
  }

  function initWalk() {
    if (reduceMotion || !(window.CSS && CSS.supports("transform-style", "preserve-3d"))) return;
    root.classList.add("walk");
    const scenes = GALLERIES.map(buildScene).filter(Boolean);
    const passages = $$(".passage").map((el) => ({ el, door: $(".passage-door", el), text: $(".passage-text", el), top: 0, h: 0 }));
    const intro = $("#entrance");
    const introPlan = $("#intro-plan");
    const signs = $$(".room-sign .sign-name").map((el) => ({ el, top: 0, h: 0 }));
    let vw = 0, vh = 0, H = 0, P = 0, D = 0, kD = 1, headerH = 0, introH = 0;
    let look = { yaw: 0, pitch: 0, tYaw: 0, tPitch: 0 };
    let running = false, lastHalf = null;

    function layout() {
      vw = window.innerWidth; vh = window.innerHeight;
      headerH = $("#signage").getBoundingClientRect().height;
      H = vh - headerH; P = H;
      kD = clampN(vw / H, 0.55, 1);            // 狭い画面では、壁までの距離を縮める
      D = P * kD;
      const fy = 0.43 * H * kD, cy = 0.47 * H * kD, E = D * 0.9;
      const narrow = vw < 700;
      scenes.forEach((s) => {
        const L = s.len * D;
        s.el.classList.toggle("sv-narrow", narrow);
        s.el.style.height = `${s.total * vh + H}px`;
        s.view.style.perspective = `${P}px`;
        const set = (el, w, h, t) => { el.style.width = `${w}px`; el.style.height = `${h}px`; el.style.transform = t; };
        set(s.floor, 2 * D, L + E, `translate3d(${-D}px, ${fy}px, ${E}px) rotateX(-90deg)`);
        set(s.ceil, 2 * D, L + E, `translate3d(${-D}px, ${-cy}px, ${E}px) rotateX(-90deg)`);
        set(s.walls.L, L + E, fy + cy, `translate3d(${-D}px, ${-cy}px, ${E}px) rotateY(90deg)`);
        set(s.walls.R, L + E, fy + cy, `translate3d(${D}px, ${-cy}px, ${-L}px) rotateY(-90deg)`);
        set(s.walls.E, 2 * D, fy + cy, `translate3d(${-D}px, ${-cy}px, ${-L}px)`);
        s.stops.forEach((st) => {
          const x = st.side === "L" ? E + st.d * D : st.side === "R" ? L - st.d * D : D;
          st.el.style.left = `${x}px`;
          st.el.style.top = `${cy + st.y * H * kD}px`;
          st.el.style.setProperty("--h", `${st.h * H * kD * (narrow ? 0.62 : 1)}px`);
          st.el.style.setProperty("--wmax", `${(narrow ? 0.64 : 0.5) * vw * kD}px`);
        });
      });
      const sy = window.scrollY;
      scenes.forEach((s) => { const r = s.el.getBoundingClientRect(); s.top = r.top + sy; s.height = r.height; });
      passages.forEach((p) => { const r = p.el.getBoundingClientRect(); p.top = r.top + sy; p.h = r.height; });
      signs.forEach((t) => { t.el.style.transform = ""; const r = t.el.getBoundingClientRect(); t.top = r.top + sy; t.h = r.height; });
      introH = intro ? intro.offsetHeight : 0;
      scenes.forEach((s) => (s.focus = -2));
      frame();
    }

    function camera(s, u) {
      let acc = 0;
      for (let i = 1; i < s.keys.length; i++) {
        const a = s.keys[i - 1], b = s.keys[i];
        if (u <= acc + b.w || i === s.keys.length - 1) {
          const t = b.w ? ease(clampN((u - acc) / b.w, 0, 1)) : 1;
          const hold = b.stop !== undefined && a.z === b.z && a.yaw === b.yaw ? b.stop : (t > 0.92 && s.keys[i + 1] && s.keys[i + 1].stop !== undefined ? s.keys[i + 1].stop : -1);
          return { z: a.z + (b.z - a.z) * t, yaw: a.yaw + (b.yaw - a.yaw) * t, stop: hold, end: !!b.end && t > 0.5, start: i === 1 && t < 0.4 };
        }
        acc += b.w;
      }
      return { z: 0, yaw: 0, stop: -1 };
    }

    function holdScroll(s, stopIndex) {
      let acc = 0;
      for (let i = 1; i < s.keys.length; i++) {
        acc += s.keys[i].w;
        if (s.keys[i].stop === stopIndex && s.keys[i - 1].z === s.keys[i].z && s.keys[i - 1].yaw === s.keys[i].yaw) {
          const u = acc - s.keys[i].w / 2;
          return s.top - headerH + (u / s.total) * (s.height - H);
        }
      }
      return null;
    }

    function frame() {
      const sy = window.scrollY;
      look.yaw += (look.tYaw - look.yaw) * 0.14;
      look.pitch += (look.tPitch - look.pitch) * 0.14;
      let busy = Math.abs(look.tYaw - look.yaw) > 0.05 || Math.abs(look.tPitch - look.pitch) > 0.05;

      for (const s of scenes) {
        const near = !(sy + vh < s.top - vh * 0.5 || sy > s.top + s.height + vh * 0.5);
        if (near !== s.shown) { s.shown = near; s.world.style.display = near ? "" : "none"; }
        if (!near) continue;
        const prog = clampN((sy + headerH - s.top) / Math.max(1, s.height - H), 0, 1);
        // スクロールにそのまま追従させず、少しだけ遅れて滑らかについていく（カクつきを抑える）
        const target = prog * s.total;
        if (s.u === undefined || Math.abs(target - s.u) > 1.5) s.u = target;
        else s.u += (target - s.u) * 0.2;
        if (Math.abs(target - s.u) > 0.0008) busy = true;
        const cam = camera(s, s.u);
        const zpx = cam.z * D;
        // 歩行のリズム（上下の揺れ）と足音
        const dz = s.lastZ === null ? 0 : Math.abs(zpx - s.lastZ);
        s.lastZ = zpx;
        s.walked += dz;
        s.activity += (Math.min(1, dz / 9) - s.activity) * 0.18;
        if (s.activity > 0.01) busy = true;
        const bob = Math.sin((s.walked / (D * 0.55)) * Math.PI * 2) * 5 * s.activity * kD;
        const half = Math.floor(s.walked / (D * 0.275));
        if (lastHalf !== null && half !== lastHalf && s.activity > 0.25) playStep(Math.min(1, s.activity));
        lastHalf = half;

        const yaw = cam.yaw + look.yaw;
        s.world.style.transform = `translateZ(${P}px) rotateX(${look.pitch.toFixed(2)}deg) rotateY(${(-yaw).toFixed(2)}deg) translate3d(0, ${(-bob).toFixed(2)}px, ${zpx.toFixed(1)}px)`;
        s.needle.style.transform = `rotate(${yaw.toFixed(1)}deg)`;

        if (cam.stop !== s.focus || s._end !== cam.end) {
          s.focus = cam.stop; s._end = cam.end;
          s.stops.forEach((st) => st.el.classList.toggle("is-focus", st.i === cam.stop));
          if (cam.stop >= 0) {
            const w = byNo.get(s.stops[cam.stop].no);
            s.now.innerHTML = `<b>PHOTO ${esc(w.no)}</b>「${esc(w.title)}」<span>${esc(w.year)}</span>`;
          } else if (cam.end) {
            s.now.textContent = "この部屋の展示はここまで。扉の先が次の展示室です。";
          } else {
            s.now.textContent = prog < 0.02 ? "展示室に入りました。スクロールで進みます。" : "次の作品へ歩いています…";
          }
          const shown = cam.stop >= 0 ? cam.stop + 1 : s.stops.filter((st) => (holdScroll(s, st.i) ?? 0) <= sy + 1).length;
          s.count.textContent = `${shown} / ${s.stops.length}`;
        }
        s.hint.classList.toggle("off", prog > 0.04);
      }

      // 部屋の名前：歩くと横に流れる
      for (const t of signs) {
        const d = (t.top + t.h / 2 - (sy + vh / 2)) / vh;
        if (Math.abs(d) < 1.6) t.el.style.transform = `translate3d(${(clampN(d, -1.5, 1.5) * 60).toFixed(1)}px, 0, 0)`;
      }
      // 通路：扉が近づいてきて、くぐる
      for (const p of passages) {
        const q = clampN((sy + vh - p.top) / (p.h + vh), 0, 1);
        const k = Math.max(0, q - 0.25) / 0.75;
        p.door.style.transform = `translateX(-50%) scale(${(1 + k * k * 5.5).toFixed(3)})`;
        p.door.style.opacity = (1 - Math.max(0, k - 0.7) / 0.3).toFixed(3);
        p.text.style.transform = `scale(${(1 + k * 0.25).toFixed(3)})`;
        p.text.style.opacity = (1 - Math.max(0, k - 0.45) / 0.35).toFixed(3);
      }
      // 入口の案内図：下へ進むと、中央ホールへ吸い込まれるように近づく
      if (introPlan && sy < introH * 1.2) {
        const e = clampN(sy / (introH * 0.9), 0, 1);
        introPlan.style.transform = `scale(${(1 + e * e * 2.2).toFixed(4)})`;
        introPlan.style.opacity = (1 - Math.max(0, e - 0.55) / 0.45).toFixed(3);
      }

      if (busy) requestAnimationFrame(frame); else running = false;
    }
    const kick = () => { if (!running) { running = true; requestAnimationFrame(frame); } };

    // 見回す：ドラッグ（スマホは横スワイプ）。離すと正面に戻る
    scenes.forEach((s) => {
      let start = null;
      s.view.addEventListener("pointerdown", (e) => { start = { x: e.clientX, y: e.clientY, id: e.pointerId, dragging: false }; });
      s.view.addEventListener("pointermove", (e) => {
        if (!start || e.pointerId !== start.id) return;
        const dx = e.clientX - start.x, dy = e.clientY - start.y;
        if (!start.dragging && Math.hypot(dx, dy) > 6) { start.dragging = true; s.view.setPointerCapture(e.pointerId); s.view.classList.add("dragging"); }
        if (start.dragging) {
          look.tYaw = clampN(dx * 0.14, -55, 55);
          look.tPitch = e.pointerType === "touch" ? 0 : clampN(-dy * 0.06, -12, 12);
          kick();
        }
      });
      const end = (e) => {
        if (start && start.dragging) {
          // ドラッグの直後に作品が開かないようにする
          s.view.addEventListener("click", (ev) => { ev.stopPropagation(); ev.preventDefault(); }, { capture: true, once: true });
        }
        start = null; look.tYaw = 0; look.tPitch = 0; s.view.classList.remove("dragging"); kick();
      };
      s.view.addEventListener("pointerup", end);
      s.view.addEventListener("pointercancel", end);
      $$(".sv-arrow", s.el).forEach((b) => b.addEventListener("click", () => {
        const dir = Number(b.dataset.dir);
        const sy = window.scrollY;
        const targets = s.stops.map((st) => holdScroll(s, st.i)).filter((v) => v !== null);
        const nextY = dir > 0 ? targets.find((y) => y > sy + 4) : [...targets].reverse().find((y) => y < sy - 4);
        const fallback = dir > 0 ? s.top + s.height - H - headerH + 2 : s.top - headerH - vh * 0.6;
        window.scrollTo({ top: nextY ?? fallback, behavior: "smooth" });
      }));
    });

    // ← → キーでも作品を移動できる（作品を間近で見ているときを除く）
    document.addEventListener("keydown", (e) => {
      if (!$("#viewer").hidden || !$("#map").hidden || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
      const s = scenes.find((sc) => window.scrollY + headerH >= sc.top - 2 && window.scrollY + headerH < sc.top + sc.height - H);
      if (!s) return;
      e.preventDefault();
      $(`.sv-arrow[data-dir="${e.key === "ArrowRight" ? 1 : -1}"]`, s.el).click();
    });

    window.addEventListener("scroll", kick, { passive: true });
    let rt = null;
    const relayout = () => { clearTimeout(rt); rt = setTimeout(layout, 120); };
    window.addEventListener("resize", relayout);
    window.addEventListener("load", relayout);
    $$("#museum img").forEach((img) => { if (!img.complete) img.addEventListener("load", relayout, { once: true }); });
    layout();
  }

  /* ---------------- 起動 ---------------- */
  renderGalleries();
  renderCatalogue();
  renderJournal();
  renderMap();
  $("#fact-count").textContent = `${WORKS.length} 点`;
  $("#year").textContent = new Date().getFullYear();
  applyHours();
  setInterval(applyHours, 60000);
  watchLights();
  watchSpaces();
  try {
    initWalk();
  } catch (err) {
    // 3D の展示室が使えない環境では、通常の縦に並んだ展示に戻す
    console.error(err);
    root.classList.remove("walk");
    $$(".sv").forEach((el) => el.remove());
  }
  updateMapHere("entrance");

  const initial = location.hash.slice(1);
  if (initial && initial !== "entrance" && document.getElementById(initial)) {
    requestAnimationFrame(() => { document.getElementById(initial).scrollIntoView({ behavior: "instant" }); });
  }
})();
