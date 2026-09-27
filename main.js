(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function bi(o) {
    if (o == null) o = '';
    if (typeof o === 'string' || typeof o === 'number') o = { en: String(o), ar: String(o) };
    var en = o.en || '', ar = o.ar || o.en || '';
    return '<span data-l="en">' + esc(en) + '</span><span data-l="ar">' + esc(ar) + '</span>';
  }
  function pick(o, l) {
    if (typeof o === 'string' || typeof o === 'number') return String(o);
    if (!o) return '';
    return (l === 'ar' ? (o.ar || o.en) : o.en) || '';
  }
  function icon(name) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + esc(name || 'code') + '"/></svg>'; }
  function safeUrl(u) { return /^(https?:|mailto:|tel:|#)/i.test(u || '') ? u : '#'; }
  function extAttrs(u) { return /^https?:/i.test(u) ? ' target="_blank" rel="noopener"' : ''; }
  function tagsHTML(list) {
    return '<ul class="tags">' + (list || []).map(function (t) {
      t = String(t); var hl = t.charAt(0) === '*'; var n = hl ? t.slice(1) : t;
      return '<li class="tag' + (hl ? ' hl' : '') + '">' + esc(n) + '</li>';
    }).join('') + '</ul>';
  }
  function $(id) { return document.getElementById(id); }

  /* ---------- Render sections from the content data ---------- */
  var L_ROLE = { en: 'Role:', ar: 'الدور:' };
  var L_DONE = { en: 'Completed', ar: 'مكتمل' };
  var L_WIP = { en: 'In progress', ar: 'قيد التنفيذ' };
  var L_ALL = { en: 'All', ar: 'الكل' };

  function renderProjects() {
    $('projectsGrid').innerHTML = PROJECTS.map(function (p) {
      var wip = p.status === 'wip';
      var st = p.statusText || (wip ? L_WIP : L_DONE);
      var h = '<article class="card glass hover' + (p.featured ? ' feature' : '') + '" data-cat="' + esc((p.cats || []).join(' ')) + '">';
      h += '<div class="card-top"><div class="ico">' + icon(p.icon) + '</div><span class="status' + (wip ? ' wip' : '') + '">' + bi(st) + '</span></div>';
      h += '<h3>' + bi(p.title) + '</h3>';
      if (p.kind) h += '<div class="kind">' + bi(p.kind) + '</div>';
      if (p.desc) h += '<p>' + bi(p.desc) + '</p>';
      if (p.role) h += '<div class="role"><b>' + bi(L_ROLE) + '</b> ' + bi(p.role) + '</div>';
      if (p.roadmap && p.roadmap.length) h += '<ol class="road">' + p.roadmap.map(function (r) { return '<li>' + bi(r) + '</li>'; }).join('') + '</ol>';
      h += tagsHTML(p.tags);
      if (p.link && p.link.url) {
        h += '<a class="more" href="' + esc(safeUrl(p.link.url)) + '"' + extAttrs(p.link.url) + '>' + bi(p.link.label || { en: 'Open', ar: 'فتح' }) + icon(/^https?:/i.test(p.link.url) ? 'code' : 'down') + '</a>';
      }
      return h + '</article>';
    }).join('');

    var fh = '<button type="button" data-filter="all" aria-pressed="true">' + bi(L_ALL) + '</button>';
    fh += CATEGORIES.map(function (c) {
      return '<button type="button" data-filter="' + esc(c.id) + '" aria-pressed="false">' + bi(c.label) + '</button>';
    }).join('');
    $('filters').innerHTML = fh;
  }

  function renderSkills() {
    $('skillTabs').innerHTML = SKILLS.map(function (s, i) {
      return '<button class="tab" role="tab" id="tab-' + esc(s.id) + '" aria-selected="' + (i === 0) + '" aria-controls="panel-' + esc(s.id) + '" type="button">' + icon(s.icon) + bi(s.label) + '</button>';
    }).join('');
    $('skillPanels').innerHTML = SKILLS.map(function (s, i) {
      return '<div class="skill-panel" role="tabpanel" id="panel-' + esc(s.id) + '" aria-labelledby="tab-' + esc(s.id) + '"' + (i ? ' hidden' : '') + '>' +
        (s.groups || []).map(function (g) {
          return '<div class="skill-card glass hover"><h3>' + bi(g.title) + '</h3>' + tagsHTML(g.tags) + '</div>';
        }).join('') + '</div>';
    }).join('');
  }

  function renderBackground() {
    $('certList').innerHTML = CERTS.map(function (c) {
      return '<li><b>' + bi(c.title) + '</b><span class="d">' + bi(c.detail) + '</span></li>';
    }).join('');
    $('timeline').innerHTML = TIMELINE.map(function (t) {
      return '<li class="job"><span class="when">' + bi(t.when) + '</span><h4>' + bi(t.title) + '</h4><p>' + bi(t.text) + '</p></li>';
    }).join('');
  }

  function renderContact() {
    var m = $('mailLink');
    m.href = 'mailto:' + SITE.email; m.textContent = SITE.email;
    $('tiles').innerHTML = SITE.links.map(function (l) {
      var inner = '<div class="ico">' + icon(l.icon) + '</div><div><small>' + bi(l.label) + '</small><b' + (l.ltr ? ' class="ltr"' : '') + '>' + bi(l.text) + '</b></div>';
      return l.url
        ? '<a class="tile glass hover" href="' + esc(safeUrl(l.url)) + '"' + extAttrs(l.url) + '>' + inner + '</a>'
        : '<div class="tile glass">' + inner + '</div>';
    }).join('');
  }

  /* ---------- Language + theme ---------- */
  var TEXT = {
    en: { title: 'Mohammed Bekheit – AI, Embedded Systems & IoT Engineer', lang: 'Switch to Arabic', theme: 'Toggle light and dark mode', ph: 'type help ...' },
    ar: { title: 'محمد بخيت – مهندس ذكاء اصطناعي وأنظمة مدمجة', lang: 'التبديل إلى الإنجليزية', theme: 'تبديل الوضع الفاتح والداكن', ph: 'اكتب help ...' }
  };
  var themeBtn = $('themeBtn'), langBtn = $('langBtn'), termIn = $('termIn');
  function lang() { return root.lang === 'ar' ? 'ar' : 'en'; }

  function applyLang(l) {
    root.lang = l;
    root.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.title = TEXT[l].title;
    langBtn.setAttribute('aria-label', TEXT[l].lang); langBtn.title = TEXT[l].lang;
    themeBtn.setAttribute('aria-label', TEXT[l].theme); themeBtn.title = TEXT[l].theme;
    termIn.placeholder = TEXT[l].ph;
    resetTyping();
    termClear(); termWelcome();
  }
  langBtn.addEventListener('click', function () {
    var next = lang() === 'ar' ? 'en' : 'ar';
    applyLang(next);
    try { localStorage.setItem('lang', next); } catch (e) {}
  });
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    readColors(); if (reduce) drawFrame();
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('menuBtn'), drawer = $('drawer');
  menuBtn.addEventListener('click', function () {
    var open = drawer.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('a')) { drawer.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- Typing effect ---------- */
  var PHRASES = {
    en: ['intelligent systems', 'embedded hardware', 'IoT platforms', 'computer-vision models', '.NET backends'],
    ar: ['أنظمة ذكية', 'أنظمة مدمجة', 'منصات إنترنت الأشياء', 'نماذج رؤية حاسوبية', 'خدمات .NET الخلفية']
  };
  var typingEl = $('typing');
  var tp = { i: 0, j: 0, del: false, timer: null };
  function resetTyping() {
    clearTimeout(tp.timer);
    tp.i = 0; tp.j = 0; tp.del = false;
    if (reduce) { typingEl.textContent = PHRASES[lang()][0]; return; }
    typingEl.textContent = '';
    typeStep();
  }
  function typeStep() {
    var list = PHRASES[lang()];
    var word = Array.from(list[tp.i % list.length]);
    var delay = tp.del ? 40 : 85;
    if (!tp.del) {
      tp.j++; typingEl.textContent = word.slice(0, tp.j).join('');
      if (tp.j >= word.length) { tp.del = true; delay = 1600; }
    } else {
      tp.j--; typingEl.textContent = word.slice(0, tp.j).join('');
      if (tp.j <= 0) { tp.del = false; tp.i++; delay = 350; }
    }
    tp.timer = setTimeout(typeStep, delay);
  }

  /* ---------- Interactive terminal ---------- */
  var out = $('termOut');
  var history = [], hIdx = 0;
  var TERM = {
    en: {
      welcome: ['<span class="hl">Bekheit OS v1.0</span> <span class="dim">(portfolio shell)</span>', 'Type <span class="hl">help</span> or tap a shortcut above.'],
      help: [
        '<span class="ok">Available commands:</span>',
        '  <span class="hl">help</span>        list commands',
        '  <span class="hl">about</span>       who I am',
        '  <span class="hl">skills</span>      what I work with',
        '  <span class="hl">projects</span>    things I have built',
        '  <span class="hl">agrovision</span>  the flagship project',
        '  <span class="hl">education</span>   degree and training',
        '  <span class="hl">contact</span>     how to reach me',
        '  <span class="hl">clear</span>       clear the screen'
      ],
      about: [
        '<span class="ok">Mohammed Bekheit</span> · computer engineer · Alexandria, Egypt',
        'B.Sc. Computer Engineering (2025). I build systems where AI, embedded hardware, and enterprise software meet.',
        '<span class="dim">status:</span> open to relocation and on-site field work'
      ],
      agrovision: [
        '<span class="ok">AgroVision</span> · graduation project · 12-member team · June 2025',
        'Led AI development: 3 disease-classification models at 95–99% validation accuracy.',
        'Pipeline: 8-in-1 soil sensor → Raspberry Pi (edge) → ESP32 → Firebase → FastAPI + React/Flutter.',
        'Case study: <a href="#agrovision">scroll to #agrovision</a>'
      ],
      education: [
        '<span class="ok">B.Sc. Computer Engineering (Electrical Track)</span> · HIET Beheira · 2020–2025',
        'DEPI AI &amp; Machine Learning (completed twice) · ICS/OT Cybersecurity · PLC &amp; SCADA · HSE'
      ],
      notfound: 'command not found: ', hint: '. Type help.', sudo: 'permission granted.', sudoNext: 'Best next step: ', sudoLink: 'send me an email', inprog: 'in progress'
    },
    ar: {
      welcome: ['<span class="hl">Bekheit OS v1.0</span> <span class="dim">(portfolio shell)</span>', 'اكتب <span class="hl">help</span> أو اضغط على أحد الاختصارات بالأعلى.'],
      help: [
        '<span class="ok">الأوامر المتاحة:</span>',
        '<span class="hl">help</span> — عرض قائمة الأوامر',
        '<span class="hl">about</span> — من أنا',
        '<span class="hl">skills</span> — ما أعمل به',
        '<span class="hl">projects</span> — ما بنيته',
        '<span class="hl">agrovision</span> — المشروع الرئيسي',
        '<span class="hl">education</span> — الدرجة العلمية والتدريب',
        '<span class="hl">contact</span> — طرق التواصل',
        '<span class="hl">clear</span> — مسح الشاشة'
      ],
      about: [
        '<span class="ok">محمد بخيت</span> · مهندس حاسبات · الإسكندرية، مصر',
        'بكالوريوس هندسة الحاسبات (2025). أبني أنظمة يلتقي فيها الذكاء الاصطناعي بالأجهزة المدمجة وبرمجيات المؤسسات.',
        'الحالة: متاح للانتقال والعمل الميداني'
      ],
      agrovision: [
        '<span class="ok">AgroVision</span> · مشروع التخرج · فريق من 12 عضوًا · يونيو 2025',
        'قدتُ تطوير الذكاء الاصطناعي: 3 نماذج لتصنيف الأمراض بدقة تحقق 95–99%.',
        'مسار البيانات: حساس تربة 8 في 1 ثم Raspberry Pi ثم ESP32 ثم Firebase ثم FastAPI مع React وFlutter.',
        'دراسة الحالة: <a href="#agrovision">انتقل إلى #agrovision</a>'
      ],
      education: [
        '<span class="ok">بكالوريوس هندسة الحاسبات (المسار الكهربي)</span> · المعهد العالي بالبحيرة · 2020–2025',
        'DEPI للذكاء الاصطناعي (أنهيته مرتين) · الأمن السيبراني ICS/OT · PLC وSCADA · HSE'
      ],
      notfound: 'الأمر غير موجود: ', hint: '. اكتب help.', sudo: 'تم منح الصلاحية.', sudoNext: 'الخطوة التالية: ', sudoLink: 'أرسل لي بريدًا', inprog: 'قيد التنفيذ'
    }
  };
  var ALIASES = { whoami: 'about', ls: 'projects', '?': 'help', cv: 'education' };

  // Lines that depend on the content data, so new projects/skills show up here too.
  function dynamicTerm(l) {
    var T = TERM[l];
    var projects = PROJECTS.map(function (p) {
      return '<span class="hl">' + esc(pick(p.title, l)) + '</span> — ' + esc(pick(p.short || p.kind, l)) +
        (p.status === 'wip' ? ' <span class="warn">(' + T.inprog + ')</span>' : '');
    });
    var skills = SKILLS.map(function (s) {
      var hl = [], all = [];
      (s.groups || []).forEach(function (g) {
        (g.tags || []).forEach(function (t) {
          t = String(t); var h = t.charAt(0) === '*'; var n = h ? t.slice(1) : t;
          all.push(n); if (h) hl.push(n);
        });
      });
      var list = (hl.length ? hl : all).slice(0, 6);
      return '<span class="hl">' + esc(pick(s.label, l)) + '</span>: ' + esc(list.join(' · '));
    });
    var contact = [(l === 'ar' ? 'البريد: ' : 'email: ') + '<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + '</a>'];
    SITE.links.forEach(function (k) {
      if (!k.text) return;
      var txt = esc(pick(k.text, l)), lab = esc(pick(k.label, l));
      contact.push(lab + ': ' + (k.url ? '<a href="' + esc(safeUrl(k.url)) + '"' + extAttrs(k.url) + '>' + txt + '</a>' : txt));
    });
    var sudo = ['<span class="ok">[sudo] ' + T.sudo + '</span> ' + T.sudoNext + '<a href="mailto:' + esc(SITE.email) + '">' + T.sudoLink + '</a>.'];
    return { projects: projects, skills: skills, contact: contact, sudo: sudo };
  }

  function addLine(html, cls) {
    var d = document.createElement('div');
    d.className = 'line' + (cls ? ' ' + cls : '');
    d.setAttribute('dir', 'auto');
    d.innerHTML = html;
    out.appendChild(d);
    return d;
  }
  function termClear() { out.innerHTML = ''; }
  function termWelcome() { TERM[lang()].welcome.forEach(function (h) { addLine(h); }); }
  var COMMANDS = ['help', 'about', 'skills', 'projects', 'agrovision', 'education', 'contact'];
  function runCommand(raw) {
    var cmd = String(raw).trim();
    if (!cmd) return;
    history.push(cmd); hIdx = history.length;
    var echo = addLine('<b>$</b> ', 'cmd');
    echo.setAttribute('dir', 'ltr');
    echo.appendChild(document.createTextNode(cmd));
    var key = cmd.toLowerCase();
    if (ALIASES[key]) key = ALIASES[key];
    var l = lang(), T = TERM[l], D = dynamicTerm(l);
    if (key === 'clear') { termClear(); return; }
    if (key.indexOf('sudo') === 0) { D.sudo.forEach(function (h) { addLine(h); }); }
    else if (COMMANDS.indexOf(key) > -1) { (D[key] || T[key]).forEach(function (h) { addLine(h); }); }
    else {
      var d = addLine('', 'warn');
      d.appendChild(document.createTextNode(T.notfound + cmd + T.hint));
    }
    out.scrollTop = out.scrollHeight;
  }
  document.querySelectorAll('[data-cmd]').forEach(function (b) {
    b.addEventListener('click', function () { runCommand(b.getAttribute('data-cmd')); });
  });
  termIn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { runCommand(termIn.value); termIn.value = ''; }
    else if (e.key === 'ArrowUp') { if (hIdx > 0) { hIdx--; termIn.value = history[hIdx]; } e.preventDefault(); }
    else if (e.key === 'ArrowDown') { if (hIdx < history.length - 1) { hIdx++; termIn.value = history[hIdx]; } else { hIdx = history.length; termIn.value = ''; } e.preventDefault(); }
  });

  /* ---------- Skill tabs + project filters (bound after rendering) ---------- */
  function bindTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) {
          var on = x === t;
          x.setAttribute('aria-selected', on ? 'true' : 'false');
          $(x.getAttribute('aria-controls')).hidden = !on;
        });
      });
    });
  }
  function bindFilters() {
    var fbtns = document.querySelectorAll('[data-filter]');
    var cards = document.querySelectorAll('.card[data-cat]');
    fbtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        fbtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        cards.forEach(function (c) {
          c.hidden = !(f === 'all' || c.getAttribute('data-cat').split(' ').indexOf(f) > -1);
        });
      });
    });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = $('copyBtn'), copyLabel = $('copyLabel'), copyHTML = copyLabel.innerHTML;
  function flash(en, ar) {
    copyLabel.textContent = lang() === 'ar' ? ar : en;
    setTimeout(function () { copyLabel.innerHTML = copyHTML; }, 1800);
  }
  function fallbackCopy() {
    try {
      var ta = document.createElement('textarea');
      ta.value = SITE.email; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }
  copyBtn.addEventListener('click', function () {
    var done = function (ok) { ok ? flash('Copied!', 'تم النسخ!') : flash('Copy failed', 'تعذّر النسخ'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(SITE.email).then(function () { done(true); }, function () { done(fallbackCopy()); });
    } else { done(fallbackCopy()); }
  });

  /* ---------- Background canvas: drifting circuit nodes ---------- */
  var cv = $('bgCanvas'), ctx = cv.getContext('2d');
  var W = 0, H = 0, pts = [], col = { a: '#00f2fe', b: '#a855f7' };
  function readColors() {
    var cs = getComputedStyle(root);
    col.a = cs.getPropertyValue('--cyan').trim() || col.a;
    col.b = cs.getPropertyValue('--purple').trim() || col.b;
  }
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(70, Math.floor(W * H / 24000));
    pts = [];
    for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.5 + .8 });
    drawFrame();
  }
  function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    var i, j, p, q, dx, dy, d;
    for (i = 0; i < pts.length; i++) {
      p = pts[i];
      if (!reduce) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
    }
    ctx.lineWidth = 1; ctx.strokeStyle = col.a;
    for (i = 0; i < pts.length; i++) {
      for (j = i + 1; j < pts.length; j++) {
        p = pts[i]; q = pts[j]; dx = p.x - q.x; dy = p.y - q.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) { ctx.globalAlpha = (1 - d / 130) * .5; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
    }
    ctx.globalAlpha = .9;
    for (i = 0; i < pts.length; i++) {
      p = pts[i]; ctx.fillStyle = i % 3 === 0 ? col.b : col.a;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function loop() { drawFrame(); requestAnimationFrame(loop); }
  readColors(); resize();
  window.addEventListener('resize', resize);
  if (!reduce) requestAnimationFrame(loop);

  /* ---------- Init ---------- */
  renderProjects(); renderSkills(); renderBackground(); renderContact();
  bindTabs(); bindFilters();
  $('year').textContent = new Date().getFullYear();
  applyLang(lang());
})();
