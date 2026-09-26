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
    text: "海沿いを走る電車、浜辺に停めた車、線路の向こうの海。回廊を横に歩くように、海辺の線路をたどってください。",
    works: ["016", "017", "018", "019", "020"],
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

    // 入口の作品
    const ew = byNo.get(MUSEUM.entranceWork) || WORKS[0];
    $("#entrance-work").innerHTML = artwork(ew.no, "white", { cls: "work--entrance" });
    $("#now-on-view").innerHTML = `<span class="nov-kicker">NOW ON VIEW</span>特別展「${esc(EXHIBITION.name)}」${esc(EXHIBITION.ja)}<span class="nov-period">${esc(EXHIBITION.period)}</span>`;

    // 回廊の送り
    $$(".corridor-step").forEach((b) => b.addEventListener("click", () => {
      const wall = b.closest(".wall--corridor");
      const track = wall.querySelector(".corridor-track");
      const dir = Number(b.dataset.dir);
      if (document.documentElement.classList.contains("walk")) {
        const n = track.querySelectorAll(".work").length || 1;
        window.scrollBy({ top: dir * (wall._dist || track.clientWidth) / (n - 1 || 1), behavior: "smooth" });
      } else {
        track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" });
      }
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

  /* ---------------- 歩く（スクロールに合わせて館内が動く） ----------------
     ・作品：遠くでは小さく傾き、正面に来るとまっすぐ大きくなり、通り過ぎると上へ抜ける
     ・視線：歩くたびに、ごくわずかに上下左右に揺れる（止まると静まる）
     ・床：歩いた分だけ床板が流れる
     ・通路：扉に近づくと扉が大きくなり、くぐり抜ける
     ・回廊（横長の部屋）：下へスクロールすると横へ歩く
     「動きを減らす」設定の端末では何もしません。 */
  function initWalk() {
    if (reduceMotion) return;
    root.classList.add("walk");
    const museumEl = $("#museum");
    const header = () => $("#signage").getBoundingClientRect().height;
    const STEP = 360; // 一歩ぶんのスクロール量（px）

    const works = $$(".work").filter((w) => !w.closest(".wall--corridor") && !w.closest(".entrance"));
    const signs = $$(".room-sign .sign-name");
    const passages = $$(".passage");
    const corridors = $$(".wall--corridor");
    const floors = $$(".baseboard");
    const entFloor = $(".entrance .floor");
    const entWall = $(".entrance-wall");
    const ceiling = $(".entrance .ceiling");
    const entrance = $("#entrance");

    // 回廊の長さは作品の幅で決まるので、回廊の写真だけは先に読み込んでおく
    corridors.forEach((c) => $$("img", c).forEach((img) => (img.loading = "eager")));

    let cache = [];
    function measure() {
      const sy = window.scrollY;
      [...works, ...signs].forEach((el) => (el.style.transform = ""));
      corridors.forEach((c) => {
        const track = $(".corridor-track", c);
        track.style.transform = "";
        const last = track.lastElementChild;
        const pad = parseFloat(getComputedStyle(track).paddingRight) || 0;
        const dist = last ? Math.max(0, last.offsetLeft + last.offsetWidth + pad - track.clientWidth) : 0;
        c._dist = dist;
        c.style.height = `calc(${dist}px + 100svh)`;
      });
      const at = (el) => { const r = el.getBoundingClientRect(); return { el, top: r.top + sy, h: r.height }; };
      cache = {
        works: works.map(at),
        signs: signs.map(at),
        passages: passages.map(at),
        corridors: corridors.map(at),
        entranceH: entrance.offsetHeight,
      };
      frame(true);
    }

    let lastY = window.scrollY, activity = 0, lastStep = Math.floor(lastY / (STEP / 2)), running = false;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    function frame(force) {
      const sy = window.scrollY, vh = window.innerHeight, vc = sy + vh / 2;
      const v = sy - lastY; lastY = sy;
      activity += (Math.min(1, Math.abs(v) / 12) - activity) * 0.12;

      // 視線の揺れ（歩行のリズム）
      const phase = sy / STEP;
      const bob = Math.sin(phase * Math.PI * 2) * 3.2 * activity;
      const sway = Math.sin(phase * Math.PI) * 1.6 * activity;
      museumEl.style.transform = activity > 0.01 ? `translate3d(${sway.toFixed(2)}px, ${bob.toFixed(2)}px, 0)` : "";

      // 足音：半歩ごと
      const half = Math.floor(sy / (STEP / 2));
      if (half !== lastStep) { if (activity > 0.2) playStep(Math.min(1, activity)); lastStep = half; }

      // 作品に近づき、通り過ぎる
      for (const it of cache.works) {
        const d = (it.top + it.h / 2 - vc) / vh;
        if (Math.abs(d) > 1.4 && !force) continue;
        const a = clamp(d, -1.2, 1.2);
        const s = 1 - 0.1 * Math.min(1, a * a * 1.6);
        it.el.style.transform = `perspective(1400px) translate3d(0, ${(-a * 46).toFixed(1)}px, ${(-Math.abs(a) * 60).toFixed(1)}px) rotateX(${(a * 7).toFixed(2)}deg) scale(${s.toFixed(4)})`;
      }
      // 部屋の名前：歩くと横に流れていく
      for (const it of cache.signs) {
        const d = (it.top + it.h / 2 - vc) / vh;
        if (Math.abs(d) > 1.5 && !force) continue;
        it.el.style.transform = `translate3d(${(clamp(d, -1.5, 1.5) * 70).toFixed(1)}px, 0, 0)`;
      }
      // 通路：扉が近づいてきて、くぐる
      for (const it of cache.passages) {
        const p = clamp((sy + vh - it.top) / (it.h + vh), 0, 1);
        const door = $(".passage-door", it.el), text = $(".passage-text", it.el);
        const k = Math.max(0, p - 0.25) / 0.75;
        door.style.transform = `translateX(-50%) scale(${(1 + k * k * 5.5).toFixed(3)})`;
        door.style.opacity = (1 - Math.max(0, k - 0.7) / 0.3).toFixed(3);
        text.style.transform = `scale(${(1 + k * 0.25).toFixed(3)})`;
        text.style.opacity = (1 - Math.max(0, k - 0.45) / 0.35).toFixed(3);
      }
      // 回廊：縦に歩くと、横へ進む
      const hh = header();
      for (const it of cache.corridors) {
        const dist = it.el._dist || 0;
        const q = dist ? clamp((sy + hh - it.top) / dist, 0, 1) : 0;
        $(".corridor-track", it.el).style.transform = `translate3d(${(-q * dist).toFixed(1)}px, 0, 0)`;
        $(".corridor-progress span", it.el).style.transform = `scaleX(${q.toFixed(4)})`;
      }
      // 床板
      floors.forEach((f) => (f.style.backgroundPositionX = `${(-sy * 0.55).toFixed(1)}px`));
      // 入口：奥へ歩いて入っていく
      if (sy < cache.entranceH * 1.2 || force) {
        const e = clamp(sy / (cache.entranceH * 0.85), 0, 1);
        entWall.style.transform = `translate3d(0, ${(e * 40).toFixed(1)}px, 0) scale(${(1 + e * 0.16).toFixed(4)})`;
        ceiling.style.transform = `translate3d(0, ${(-e * 70).toFixed(1)}px, 0)`;
        if (entFloor) entFloor.style.setProperty("--walk", (sy * 1.4).toFixed(1));
      }

      if (activity > 0.005 || Math.abs(v) > 0.5) requestAnimationFrame(() => frame(false));
      else { running = false; museumEl.style.transform = ""; }
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(() => frame(false)); } }

    window.addEventListener("scroll", kick, { passive: true });
    let rt = null;
    const remeasure = () => { clearTimeout(rt); rt = setTimeout(measure, 120); };
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    $$("#museum img").forEach((img) => { if (!img.complete) img.addEventListener("load", remeasure, { once: true }); });
    measure();
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
  initWalk();
  updateMapHere("entrance");

  const initial = location.hash.slice(1);
  if (initial && initial !== "entrance" && document.getElementById(initial)) {
    requestAnimationFrame(() => { document.getElementById(initial).scrollIntoView({ behavior: "instant" }); });
  }
})();
