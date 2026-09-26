(function () {
  "use strict";

  var works = window.WORKS || [];
  var gallery = document.getElementById("gallery");
  var filtersEl = document.querySelector(".filters");
  var visible = works.slice();

  // ---- ギャラリー ----
  function renderGallery(category) {
    visible = category === "All" ? works.slice() : works.filter(function (w) { return w.category === category; });
    gallery.innerHTML = "";
    visible.forEach(function (w, i) {
      var btn = document.createElement("button");
      btn.className = "tile";
      btn.type = "button";
      btn.setAttribute("aria-label", w.title + " を拡大表示");
      btn.innerHTML =
        '<img src="' + w.src + '" alt="' + escapeHtml(w.title) + '" loading="lazy">' +
        '<span class="tile-info"><span class="tile-title">' + escapeHtml(w.title) + "</span>" +
        '<span class="tile-meta">' + escapeHtml(w.category) + " / " + w.year + "</span></span>";
      btn.addEventListener("click", function () { openLightbox(i); });
      gallery.appendChild(btn);
    });
    observeTiles();
  }

  function renderFilters() {
    var cats = ["All"];
    works.forEach(function (w) { if (cats.indexOf(w.category) === -1) cats.push(w.category); });
    cats.forEach(function (c, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = c;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        filtersEl.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-selected", "false"); });
        b.setAttribute("aria-selected", "true");
        renderGallery(c);
      });
      filtersEl.appendChild(b);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---- スクロールでフェードイン ----
  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -10% 0px" })
    : null;

  function observeTiles() {
    document.querySelectorAll(".tile, .reveal").forEach(function (el) {
      if (io) io.observe(el); else el.classList.add("is-visible");
    });
  }

  // ---- ライトボックス ----
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector("figcaption");
  var current = 0;
  var lastFocus = null;

  function openLightbox(i) {
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    show(i);
    lb.querySelector(".lb-close").focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function show(i) {
    current = (i + visible.length) % visible.length;
    var w = visible[current];
    lbImg.src = w.src;
    lbImg.alt = w.title;
    lbCap.textContent = w.title + " — " + w.category + ", " + w.year + "  (" + (current + 1) + " / " + visible.length + ")";
  }

  lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // スワイプ操作（スマホ）
  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  // ---- ヒーロースライドショー ----
  function initHero() {
    var wrap = document.querySelector(".hero-slides");
    var slides = works.filter(function (w) { return w.hero; });
    if (!slides.length) slides = works.slice(0, 1);
    slides.forEach(function (w, i) {
      var d = document.createElement("div");
      d.className = "hero-slide" + (i === 0 ? " active" : "");
      d.style.backgroundImage = "url('" + w.src + "')";
      wrap.appendChild(d);
    });
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (slides.length < 2 || reduce) return;
    var idx = 0;
    var els = wrap.children;
    setInterval(function () {
      els[idx].classList.remove("active");
      idx = (idx + 1) % els.length;
      els[idx].classList.add("active");
    }, 6000);
  }

  // ---- ヘッダー / メニュー ----
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  toggle.addEventListener("click", function () {
    var open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- お問い合わせフォーム ----
  // 送信先メールアドレス。サーバーを使わずにメールソフトを起動します。
  // Formspree 等を使う場合は form に action / method を設定し、この処理を外してください。
  var CONTACT_EMAIL = "hello@example.com";
  var form = document.getElementById("contact-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var subject = "【撮影のご相談】" + d.get("type") + " / " + d.get("name");
    var body = "お名前: " + d.get("name") + "\nメール: " + d.get("email") + "\nご依頼内容: " + d.get("type") + "\n\n" + d.get("message");
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    form.querySelector(".form-status").textContent = "メールソフトが起動します。そのまま送信してください。";
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  document.querySelectorAll(".section-head, .about-photo, .about-body, .service, .contact-form").forEach(function (el) {
    el.classList.add("reveal");
  });

  renderFilters();
  renderGallery("All");
  initHero();
})();
