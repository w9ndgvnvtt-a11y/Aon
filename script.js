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
  entranceWork: "001", // 入口に展示する作品（収蔵番号）
};

/* ---------------------------------------------------------------------
   2. 収蔵品目録（すべての作品）
   no      : 収蔵番号。ラベルに「PHOTO 001」と表示されます
   src     : 画像ファイル（images/ 以下。JPG に差し替えて構いません）
   title   : 作品名        year   : 制作年
   medium  : 技法・素材    camera : 撮影情報（任意）
   place   : 撮影地（任意） note   : 解説文（任意。作品の前に近づいたとき表示）
   展示室に置かない作品は、自動的に「収蔵庫」扱いになります。
   --------------------------------------------------------------------- */
const WORKS = [
  { no: "001", src: "images/hall/001.svg", title: "Untitled", year: 2026, medium: "Digital Photograph", camera: "35mm / Color", place: "Tokyo", note: "当館の入口に掛けている作品。午前十時、開館と同じ時刻の光。" },
  { no: "002", src: "images/hall/002.svg", title: "遠い稜線", year: 2026, medium: "Archival Pigment Print", camera: "Medium Format / Color", place: "Nagano", note: "この館の中心に置いている一枚。見えているものより、見えていない距離を撮ろうとした。" },
  { no: "003", src: "images/hall/003.svg", title: "Portrait of M.", year: 2025, medium: "Gelatin Silver Print", camera: "35mm / B&W" },
  { no: "004", src: "images/hall/004.svg", title: "Vessel", year: 2025, medium: "Digital Photograph", camera: "Medium Format / Color" },

  { no: "005", src: "images/room01/005.svg", title: "朝の壁", year: 2026, medium: "Digital Photograph", camera: "35mm / Color", place: "Tokyo", note: "東向きの部屋に、七時から十五分だけ差す光。" },
  { no: "006", src: "images/room01/006.svg", title: "Light Study No.3", year: 2025, medium: "Archival Pigment Print", camera: "Medium Format / Color" },
  { no: "007", src: "images/room01/007.svg", title: "階段の光", year: 2024, medium: "Gelatin Silver Print", camera: "35mm / B&W", place: "Kyoto" },
  { no: "008", src: "images/room01/008.svg", title: "Afternoon, Kitchen", year: 2026, medium: "Digital Photograph", camera: "35mm / Color" },

  { no: "009", src: "images/room02/009.svg", title: "K.", year: 2026, medium: "Digital Photograph", camera: "35mm / Color" },
  { no: "010", src: "images/room02/010.svg", title: "待合室", year: 2025, medium: "Digital Photograph", camera: "35mm / Color" },
  { no: "011", src: "images/room02/011.svg", title: "Untitled (Back)", year: 2024, medium: "Gelatin Silver Print", camera: "35mm / B&W" },
  { no: "012", src: "images/room02/012.svg", title: "Sister", year: 2026, medium: "Digital Photograph", camera: "Medium Format / Color" },
  { no: "013", src: "images/room02/013.svg", title: "窓辺の人", year: 2025, medium: "Digital Photograph", camera: "35mm / Color" },
  { no: "014", src: "images/room02/014.svg", title: "Two Chairs", year: 2023, medium: "Digital Photograph", camera: "35mm / Color" },
  { no: "015", src: "images/room02/015.svg", title: "Profile", year: 2026, medium: "Gelatin Silver Print", camera: "35mm / B&W" },

  { no: "016", src: "images/room03/016.svg", title: "Coastline I", year: 2026, medium: "Archival Pigment Print", camera: "Panoramic / Color", place: "Chiba" },
  { no: "017", src: "images/room03/017.svg", title: "丘陵", year: 2025, medium: "Archival Pigment Print", camera: "Panoramic / Color", place: "Hokkaido" },
  { no: "018", src: "images/room03/018.svg", title: "Coastline II", year: 2026, medium: "Archival Pigment Print", camera: "Panoramic / Color", place: "Chiba" },
  { no: "019", src: "images/room03/019.svg", title: "北の平野", year: 2024, medium: "Gelatin Silver Print", camera: "Panoramic / B&W", place: "Hokkaido" },
  { no: "020", src: "images/room03/020.svg", title: "Low Tide", year: 2025, medium: "Archival Pigment Print", camera: "Panoramic / Color" },

  { no: "021", src: "images/room04/021.svg", title: "Vase, Morning", year: 2026, medium: "Digital Photograph", camera: "Medium Format / Color" },
  { no: "022", src: "images/room04/022.svg", title: "器", year: 2025, medium: "Gelatin Silver Print", camera: "Large Format / B&W" },
  { no: "023", src: "images/room04/023.svg", title: "Still Life with Cup", year: 2024, medium: "Digital Photograph", camera: "Medium Format / Color" },

  { no: "024", src: "images/exhibition/024.svg", title: "夜の輪郭 #1", year: 2026, medium: "Archival Pigment Print", camera: "35mm / Color", place: "Tokyo" },
  { no: "025", src: "images/exhibition/025.svg", title: "夜の輪郭 #2", year: 2026, medium: "Archival Pigment Print", camera: "35mm / Color", place: "Tokyo" },
  { no: "026", src: "images/exhibition/026.svg", title: "夜の輪郭 #3", year: 2026, medium: "Archival Pigment Print", camera: "35mm / Color", place: "Osaka" },
  { no: "027", src: "images/exhibition/027.svg", title: "夜の輪郭 #4", year: 2026, medium: "Archival Pigment Print", camera: "35mm / Color", place: "Osaka" },

  { no: "028", src: "images/archive/028.svg", title: "Evening", year: 2025, medium: "Digital Photograph", camera: "35mm / Color" },
  { no: "029", src: "images/archive/029.svg", title: "Untitled", year: 2024, medium: "Gelatin Silver Print", camera: "35mm / B&W" },
  { no: "030", src: "images/archive/030.svg", title: "Table", year: 2023, medium: "Digital Photograph", camera: "Medium Format / Color" },
  { no: "031", src: "images/archive/031.svg", title: "Window", year: 2025, medium: "Digital Photograph", camera: "35mm / Color" },
  { no: "032", src: "images/archive/032.svg", title: "終電のあと", year: 2023, medium: "Digital Photograph", camera: "35mm / Color" },
  { no: "033", src: "images/archive/033.svg", title: "Bay", year: 2022, medium: "Archival Pigment Print", camera: "Medium Format / Color" },
  { no: "034", src: "images/archive/034.svg", title: "Friend", year: 2022, medium: "Digital Photograph", camera: "35mm / Color" },
  { no: "035", src: "images/archive/035.svg", title: "Object No.1", year: 2021, medium: "Gelatin Silver Print", camera: "Large Format / B&W" },
];

/* ---------------------------------------------------------------------
   3. 展示空間
   layout（掛け方）:
     "hall"     … 中央に大きく1点、左右に小さく（1〜3点）
     "large"    … 大型作品を1面に1点ずつ
     "salon"    … 小さな作品を1面にまとめて掛け、解説は横のパネルに
     "corridor" … 横長の作品を横方向の回廊に連続して
     "solo"     … 大きな余白の中に小さく1点ずつ
     "pair"     … 2点ずつ対にして
   frame（額）: "white" | "black" | "oak" | "none"
   map        : 館内案内図での位置（横12 × 縦9 のマス目）
   --------------------------------------------------------------------- */
const HALL = {
  id: "central-hall", no: "CENTRAL HALL", name: "CENTRAL HALL", ja: "中央ホール",
  layout: "hall", frame: "black",
  text: "館の中心にある吹き抜けのホール。この写真家を代表する三点を掛けています。",
  works: ["002", "003", "004"],
  map: { x: 4, y: 3, w: 4, h: 3.5 },
};

const ROOMS = [
  {
    id: "room01", no: "ROOM 01", name: "LIGHT", ja: "光",
    layout: "large", frame: "white",
    text: "壁に落ちる光は、数分ごとに形を変えます。部屋に差し込んだ光だけを主題にした作品を、一面に一点ずつ掛けました。",
    works: ["005", "006", "007", "008"],
    map: { x: 0, y: 3, w: 4, h: 3.5 },
  },
  {
    id: "room02", no: "ROOM 02", name: "PEOPLE", ja: "人",
    layout: "salon", frame: "oak",
    text: "家族、友人、偶然居合わせた人。小さな肖像を一つの壁にまとめて掛けています。作品の番号は、壁の解説パネルと対応しています。",
    works: ["009", "010", "011", "012", "013", "014", "015"],
    map: { x: 0, y: 0, w: 4, h: 3 },
  },
  {
    id: "room03", no: "ROOM 03", name: "LANDSCAPE", ja: "地形",
    layout: "corridor", frame: "none",
    text: "海岸線と平野を撮った横長の作品を、細長い回廊に続けて並べました。横に歩くようにご覧ください。",
    works: ["016", "017", "018", "019", "020"],
    map: { x: 4, y: 0, w: 4, h: 3 },
  },
  {
    id: "room04", no: "ROOM 04", name: "OBJECTS", ja: "もの",
    layout: "solo", frame: "black",
    text: "器や日用品を撮った静物。大きな壁に小さく一点ずつ。近づかないと見えない距離に置いています。",
    works: ["021", "022", "023"],
    map: { x: 8, y: 0, w: 4, h: 3 },
  },
];

/* 特別展 — 新しい展覧会を始めるときは、ここを書き換えます */
const EXHIBITION = {
  id: "exhibition", no: "SPECIAL EXHIBITION 01", name: "CONTOURS OF NIGHT", ja: "夜の輪郭",
  period: "2026.09.01 — 2026.12.20",
  layout: "pair", frame: "black",
  text: "街灯と窓明かりだけで撮影した新作のシリーズ。昼には見えない建物の輪郭を、四点で構成します。",
  works: ["024", "025", "026", "027"],
  map: { x: 8, y: 3, w: 4, h: 3.5 },
};

/* 館内記録（新しいものを上に） */
const JOURNAL = [
  { date: "2026.09.12", type: "INSTALLATION NOTE", text: "特別展「夜の輪郭」を開幕。新作4点を特別展示室に設置。" },
  { date: "2026.09.01", type: "COLLECTION", text: "PHOTO 024〜027 を収蔵。" },
  { date: "2026.08.21", type: "FIELD NOTE", text: "大阪で、夜のシリーズの追加撮影。街灯の色温度を記録しながら三晩歩く。" },
  { date: "2026.07.03", type: "INSTALLATION NOTE", text: "ROOM 03 の展示替え。「Coastline II」を回廊の中央へ移設。" },
  { date: "2026.05.15", type: "FIELD NOTE", text: "千葉の海岸線を再訪。干潮の時刻に合わせて撮影。" },
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
        <div class="corridor-track" tabindex="0" aria-label="${esc(g.name)} の回廊（横にスクロール）">
          ${g.works.map((no) => artwork(no, g.frame, { cls: "work--wide" })).join("")}
        </div>
        <div class="corridor-guide">
          <button type="button" class="corridor-step" data-dir="-1" aria-label="回廊を戻る">←</button>
          <span>回廊を横に歩く</span>
          <button type="button" class="corridor-step" data-dir="1" aria-label="回廊を進む">→</button>
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

    // 入口の作品
    const ew = byNo.get(MUSEUM.entranceWork) || WORKS[0];
    $("#entrance-work").innerHTML = artwork(ew.no, "white", { cls: "work--entrance" });
    $("#now-on-view").innerHTML = `<span class="nov-kicker">NOW ON VIEW</span>特別展「${esc(EXHIBITION.ja)}」<span class="nov-period">${esc(EXHIBITION.period)}</span>`;

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
      const onView = locationOf.has(w.no) || w.no === MUSEUM.entranceWork;
      return catalogueFilter === "all" || (catalogueFilter === "view" ? onView : !onView);
    });
    $("#catalogue-body").innerHTML = rows.map((w) => {
      const loc = w.no === MUSEUM.entranceWork ? { no: "ENTRANCE" } : locationOf.get(w.no);
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
    $("#map-plan").innerHTML = `
      <svg viewBox="${-pad} ${-pad} ${W + pad * 2} ${H + pad * 2 + 30}" role="img" aria-label="館内案内図">
        <defs><pattern id="grid" width="${U / 2}" height="${U / 2}" patternUnits="userSpaceOnUse"><path d="M${U / 2} 0H0V${U / 2}" class="plan-grid"/></pattern></defs>
        <rect x="${-pad}" y="${-pad}" width="${W + pad * 2}" height="${H + pad * 2 + 30}" fill="url(#grid)"/>
        ${rooms}
        <rect x="0" y="0" width="${W}" height="${H}" class="plan-outer"/>
        ${doorMarks}
        <line x1="${ent.x - 22}" y1="${entY}" x2="${ent.x + 22}" y2="${entY}" class="plan-door"/>
        <path d="M${ent.x - 22},${entY} A22,22 0 0 1 ${ent.x},${entY + 22}" class="plan-swing"/>
        <path d="M${ent.x + 22},${entY} A22,22 0 0 0 ${ent.x},${entY + 22}" class="plan-swing"/>
        <text x="${ent.x}" y="${entY + 44}" class="plan-sub">ENTRANCE / EXIT</text>
        <path d="${path}" class="plan-route"/>
        <g class="plan-here" id="plan-here"><circle r="9"/><circle r="16" class="ring"/></g>
      </svg>`;

    $("#map-index").innerHTML = ROUTE.map((r, i) => `
      <li><a href="#${r.id}" data-goto="${r.id}" data-index="${r.id}">
        <span class="mi-no">${String(i).padStart(2, "0")}</span>
        <span class="mi-name">${esc(r.label)}${r.sub ? ` <small>${esc(r.sub)}</small>` : ""}</span>
        <span class="mi-ja">${esc(r.ja)}</span>
      </a></li>`).join("");

    $$("#map-plan .plan-room").forEach((g) => {
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
    const here = $("#plan-here");
    if (here) here.setAttribute("transform", `translate(${c.x},${c.y + (id === "exit" ? m.h * U / 2 + 18 : -m.h * U / 2 + 22)})`);
    $$("#map-plan .plan-room").forEach((g) => g.classList.toggle("is-here", g.dataset.room === id));
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
    const loc = no === MUSEUM.entranceWork ? { no: "ENTRANCE", ja: "入口" } : locationOf.get(no);
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
    const list = space ? $$("[data-open]", space).filter((el) => el.classList.contains("frame")).map((el) => el.dataset.open) : [];
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
    const btn = document.querySelector(`.frame[data-open="${vList[vIndex]}"]`);
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
  });

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
  updateMapHere("entrance");

  const initial = location.hash.slice(1);
  if (initial && initial !== "entrance" && document.getElementById(initial)) {
    requestAnimationFrame(() => { document.getElementById(initial).scrollIntoView({ behavior: "instant" }); });
  }
})();
