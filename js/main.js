/* Portfolio renderer. No dependencies, no innerHTML: everything goes through textContent/DOM APIs,
   and every URL is validated by safeUrl(), so config values can never inject markup or scripts. */
(() => {
  'use strict';
  const C = window.SITE_CONFIG;
  if (!C) { console.error('config.js failed to load'); return; }

  const $ = (s, r = document) => r.querySelector(s);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- safe helpers ---------- */
  const safeUrl = (u) => {
    if (typeof u !== 'string') return '';
    u = u.trim();
    if (!u) return '';
    if (u[0] === '#' || /^[\w\-./]+$/.test(u)) return u;            // in-page or relative path
    try { const x = new URL(u); return (x.protocol === 'https:' || x.protocol === 'mailto:') ? x.href : ''; }
    catch { return ''; }
  };
  const isExternal = (u) => /^https:/i.test(u);

  const h = (tag, props = {}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'href' || k === 'src') {
        const s = safeUrl(v);
        if (s) el.setAttribute(k, s);
        if (k === 'href' && isExternal(s)) { el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer'); }
      } else if (/^(data-|aria-)/.test(k) || ['id', 'role', 'alt', 'type', 'loading', 'decoding', 'width', 'height', 'title', 'tabindex'].includes(k)) {
        el.setAttribute(k, v);
      }
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return el;
  };
  const stagger = (el, i) => { el.style.setProperty('--i', String(Math.min(i, 8))); return el; };

  /* ---------- simple text binding ---------- */
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const v = C[el.dataset.bind];
    if (typeof v === 'string') el.textContent = v;
  });
  $('#firstName').textContent = C.name.split(' ')[0] + '.';
  $('#year').textContent = new Date().getFullYear();
  document.title = `${C.name} — AI/ML & Full-stack Engineer`;

  /* ---------- links ---------- */
  const L = C.links || {};
  const mailto = C.email ? 'mailto:' + C.email : '';
  const setLink = (el, url, text) => {
    const s = safeUrl(url);
    if (!s) { el.hidden = true; return; }
    el.href = s; el.hidden = false;
    if (isExternal(s)) { el.target = '_blank'; el.rel = 'noopener noreferrer'; }
    if (text) el.textContent = text;
  };
  setLink($('#resumeBtn'), L.resume);
  setLink($('#ctaLinkedin'), L.linkedin);
  setLink($('#ctaGithub'), L.github);
  setLink($('#sayHello'), mailto);
  setLink($('#mailLink'), mailto, C.email);
  const soc = $('#socials');
  [['GitHub', L.github], ['LinkedIn', L.linkedin], ['HackerRank', L.hackerrank]].forEach(([t, u]) => {
    if (safeUrl(u)) soc.append(h('a', { href: u, text: t }));
  });

  /* ---------- about + ID card ---------- */
  const about = $('#aboutText');
  (C.about || []).forEach((p) => about.append(h('p', { text: p })));
  const I = C.idCard || {};
  $('#idNo').textContent = I.id || '';
  $('#idDept').textContent = I.department || '';
  $('#idValid').textContent = I.valid || '';
  $('#idQuote').textContent = I.quote ? `“${I.quote}”` : '';
  $('#idAm').append(...(I.whatIAm || []).map((t) => h('li', { text: t })));
  $('#idFacts').append(...(I.facts || []).map(([k, v]) => h('div', {}, h('dt', { text: k }), h('dd', { text: v }))));
  const photo = $('#photo');
  const ps = safeUrl(C.photo);
  if (ps) photo.src = ps;
  photo.addEventListener('error', () => { photo.src = 'assets/photo.svg'; }, { once: true });

  /* tilt (fine pointers only) */
  const card = $('#idcard');
  if (!reduceMotion && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 10 + 'deg');
      card.style.setProperty('--rx', (-((e.clientY - r.top) / r.height - .5)) * 10 + 'deg');
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  }

  /* ---------- ticker (duplicated for a seamless loop) ---------- */
  const tick = $('#ticker');
  for (let n = 0; n < 2; n++) (C.ticker || []).forEach((t) => tick.append(h('span', { text: t })));

  /* ---------- skills + filters ---------- */
  const elList = $('#elements');
  const tiles = (C.skills || []).map(([sym, name, cat], i) => {
    const li = h('li', { class: 'el reveal', 'data-cat': cat }, h('small', { text: String(i + 1).padStart(2, '0') }), h('b', { text: sym }), h('span', { text: name }));
    return stagger(li, i % 6);
  });
  elList.append(...tiles);
  const filters = $('#filters');
  ['All', ...(C.skillCategories || [])].forEach((cat, i) => {
    const b = h('button', { class: 'chip', type: 'button', role: 'tab', 'aria-selected': i === 0 ? 'true' : 'false', text: cat });
    b.addEventListener('click', () => {
      filters.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-selected', String(c === b)));
      tiles.forEach((t) => t.classList.toggle('off', cat !== 'All' && t.dataset.cat !== cat));
    });
    filters.append(b);
  });

  /* ---------- projects (lazy images) ---------- */
  const proj = $('#projects');
  (C.projects || []).forEach((p, i) => {
    const links = h('div', { class: 'card-links' });
    if (safeUrl(p.repo)) links.append(h('a', { href: p.repo, text: 'View on GitHub ↗' }));
    if (safeUrl(p.demo)) links.append(h('a', { href: p.demo, text: 'Live demo ↗' }));
    const body = h('div', { class: 'card-body' },
      h('span', { class: 'num', text: String(i + 1).padStart(2, '0') }),
      h('span', { class: 'type', text: p.type }),
      h('h3', { text: p.title }),
      h('p', { text: p.description }),
      (p.highlights || []).length ? h('ul', { class: 'hl' }, p.highlights.map((t) => h('li', { text: t }))) : null,
      h('ul', { class: 'tags' }, (p.tags || []).map((t) => h('li', { text: t }))),
      links.childElementCount ? links : null);
    const img = safeUrl(p.image)
      ? h('img', { src: p.image, alt: `${p.title} screenshot`, loading: 'lazy', decoding: 'async', width: '640', height: '360' })
      : null;
    proj.append(stagger(h('article', { class: 'card reveal' }, img, body), i % 3));
  });

  /* ---------- certifications ---------- */
  $('#certList').append(...(C.certifications || []).map((c, i) => stagger(h('li', { class: 'cert reveal' },
    h('h3', { text: c.title }),
    h('p', { text: [c.issuer, c.date].filter(Boolean).join(' · ') }),
    safeUrl(c.url) ? h('a', { href: c.url, text: 'Verify credential ↗' }) : null), i % 4)));

  /* ---------- timeline ---------- */
  $('#timeline').append(...(C.timeline || []).map((t) => h('li', { class: 'tl reveal' },
    h('time', { text: t.when }), h('h3', { text: t.title }),
    h('p', { class: 'where', text: t.where }), h('p', { class: 'note', text: t.note }))));

  /* ---------- stats ---------- */
  const statEls = (C.stats || []).map((s, i) => {
    const b = h('b', { text: format(0, s), 'aria-hidden': 'true' });
    b.dataset.target = String(s.value);
    const li = h('li', { class: 'stat reveal' }, b, h('span', { text: s.label }));
    li.setAttribute('aria-label', `${format(s.value, s)} ${s.label}`);
    return stagger(li, i);
  });
  function format(v, s) { return (s.prefix || '') + Number(v).toFixed(s.decimals || 0) + (s.suffix || ''); }
  $('#stats').append(...statEls);
  const countUp = (el, s) => {
    const target = Number(s.value);
    if (reduceMotion) { el.textContent = format(target, s); return; }
    const t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * e, s);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- scroll reveal (one shared observer) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
      const idx = statEls.indexOf(en.target);
      if (idx > -1) countUp(en.target.querySelector('b'), C.stats[idx]);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------- nav: stuck bar, active link, progress, mobile menu ---------- */
  const nav = $('#nav'), bar = $('#progress');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      nav.classList.toggle('stuck', scrollY > 24);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = [...document.querySelectorAll('#navlinks a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a) => { const t = $(a.getAttribute('href')); if (t) spy.observe(t); });

  const menu = $('#menu'), list = $('#navlinks');
  const setMenu = (open) => {
    list.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  list.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- theme toggle ---------- */
  $('#theme').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* ignore */ }
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = next === 'dark' ? '#0f0f0d' : '#f4f1ea';
    window.dispatchEvent(new Event('themechange'));
  });

  /* ---------- copy email ---------- */
  const copyBtn = $('#copyMail'), status = $('#copyStatus');
  if (!C.email) copyBtn.hidden = true;
  copyBtn.addEventListener('click', async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(C.email); ok = true; }
    catch {
      const ta = h('textarea', { 'aria-hidden': 'true', tabindex: '-1' });
      ta.value = C.email; document.body.append(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch { /* ignore */ }
      ta.remove();
    }
    copyBtn.textContent = ok ? 'Copied ✓' : 'Press Ctrl/Cmd+C';
    status.textContent = ok ? 'Email copied to clipboard' : 'Copy failed';
    setTimeout(() => { copyBtn.textContent = 'Copy email'; }, 2000);
  });

  /* ---------- hero typing effect ---------- */
  const typed = $('#typed'), roles = C.roles || [];
  if (roles.length) {
    if (reduceMotion) typed.textContent = roles[0];
    else {
      let r = 0, c = 0, del = false;
      const loop = () => {
        const word = roles[r];
        c += del ? -1 : 1;
        typed.textContent = word.slice(0, c);
        let wait = del ? 28 : 55;
        if (!del && c === word.length) { del = true; wait = 1700; }
        else if (del && c === 0) { del = false; r = (r + 1) % roles.length; wait = 350; }
        setTimeout(loop, wait);
      };
      loop();
    }
  }

  /* ---------- hero canvas: light particle network ---------- */
  const cv = $('#bg'), ctx = cv.getContext('2d');
  let W = 0, H = 0, pts = [], raf = 0, visible = true, mouse = { x: -999, y: -999 };
  const col = () => getComputedStyle(document.documentElement).getPropertyValue('--acc').trim() || '#d9411e';
  let color = col();
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(70, Math.round((W * H) / 16000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
    if (reduceMotion) draw();
  };
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = color; ctx.strokeStyle = color;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (!reduceMotion) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 14000) { p.x += dx * .002; p.y += dy * .002; }
      }
      ctx.globalAlpha = .55; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 6.283); ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
        if (d < 14400) { ctx.globalAlpha = (1 - d / 14400) * .22; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
    }
    ctx.globalAlpha = 1;
  };
  const frame = () => { draw(); raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0; };
  const start = () => { if (!raf && !reduceMotion) raf = requestAnimationFrame(frame); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(cv);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
  addEventListener('resize', (() => { let t; return () => { clearTimeout(t); t = setTimeout(resize, 150); }; })());
  addEventListener('themechange', () => { color = col(); if (reduceMotion) draw(); });
  cv.parentElement.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
  resize(); start();

  /* ---------- optional live GitHub repos ---------- */
  const G = C.github || {};
  if (G.autoFetch && /^[A-Za-z0-9-]{1,39}$/.test(G.username || '')) {
    const sec = $('#github');
    const lazy = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return;
      lazy.disconnect();
      try {
        const key = 'gh:' + G.username;
        let data = null;
        try { const c = JSON.parse(sessionStorage.getItem(key) || 'null'); if (c && Date.now() - c.t < 6e5) data = c.d; } catch { /* ignore */ }
        if (!data) {
          const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 6000);
          const res = await fetch(`https://api.github.com/users/${G.username}/repos?sort=pushed&per_page=30`, { signal: ctrl.signal, headers: { Accept: 'application/vnd.github+json' } });
          clearTimeout(to);
          if (!res.ok) throw new Error(String(res.status));
          data = (await res.json()).filter((r) => !r.fork).slice(0, Math.min(G.maxRepos || 6, 12))
            .map((r) => ({ name: String(r.name), desc: String(r.description || ''), lang: String(r.language || ''), stars: Number(r.stargazers_count) || 0, url: String(r.html_url) }));
          try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data })); } catch { /* ignore */ }
        }
        if (!data.length) return;
        $('#repos').append(...data.map((r, i) => stagger(h('li', { class: 'reveal in' }, h('a', { href: r.url },
          h('strong', { text: r.name }), h('p', { text: r.desc || 'No description yet.' }),
          h('small', { text: [r.lang, r.stars ? `★ ${r.stars}` : ''].filter(Boolean).join(' · ') }))), i)));
        sec.hidden = false;
      } catch { /* offline or rate-limited: just keep the section hidden */ }
    }, { rootMargin: '300px' });
    lazy.observe($('#work'));
  }
})();
