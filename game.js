/* ---- core.js ---- */
// core.js — 공통 도구: 화면 크기 맞추기(기획안 8-11), 게임 시계, 움직임(tween), 파일 주소, 교사용 설정 여는 방법
'use strict';
const G = window.G = {
  D: window.GAME_DATA || {},       // data/*.json (build가 합쳐 넣음)
  st: null,                        // 지금 저장 칸의 진행 상태
  settings: null,
  paused: false, t: 0, busy: 0,
  screen: '', stage: { W: 1920, H: 1080, ws: 1, u: 1 },
};

// ---------- 파일 주소 (한 파일 버전은 EMBED 안의 data: 주소) ----------
G.asset = (p) => (window.EMBED && window.EMBED[p]) || p;
G.voiceUrl = (id) => G.asset('assets/voice/' + id + '.mp3');

// ---------- DOM 도구 ----------
G.el = (tag, cls, parent, html) => {
  const e = document.createElement(tag); if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html; if (parent) parent.appendChild(e); return e;
};
G.$ = (s) => document.querySelector(s);
G.btn = (cls, label, parent, onTap, aria) => {
  const b = G.el('button', cls, parent, label); b.type = 'button'; if (aria) b.setAttribute('aria-label', aria);
  if (onTap) G.onTap(b, onTap); return b;
};
// 누르기: 짧게 누르면 실행 (끌기·길게 누르기와 구분), 키보드 Enter/Space 도 됨
G.onTap = (elm, fn) => {
  elm.addEventListener('click', (ev) => {
    if (G._suppressClick) { ev.preventDefault(); ev.stopPropagation(); return; }
    if (G.paused) return;
    ev.stopPropagation(); G.help && G.help.poke(); fn(ev);
  });
};
// 아이콘 그림 (9/29: 이모지 대신 그림). 지금은 임시 그림이고, 선생님 그림이 오면 assets/ui/icons/ 의 같은 이름 파일만 바꿈
G.icon = (name, cls = '') => `<img class="ico${cls ? ' ' + cls : ''}" src="${G.asset('assets/ui/icons/' + name + '.png')}" alt="">`;
G.svgStar = (fill, stroke, sw = 6) => `<svg viewBox="0 0 100 100"><path d="M50 6 L62 37 L95 38 L69 58 L78 91 L50 72 L22 91 L31 58 L5 38 L38 37 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;

// ---------- 화면 크기: 기준 1920x1080, 비율이 달라도 검은 띠 없이 채움 ----------
G.layout = () => {
  const vv = window.visualViewport;
  const W = Math.round(vv ? vv.width : window.innerWidth), H = Math.round(vv ? vv.height : window.innerHeight);
  const game = G.$('#game'); game.style.width = W + 'px'; game.style.height = H + 'px';
  const ws = Math.max(H / 1080, W / 2400);                 // 세계(지도·장면) 배율: 높이 1080을 채움
  // 글자·버튼 배율: 전자칠판은 세계와 같게, 휴대폰은 손가락 크기(약 11mm)를 위해 더 크게, 그러나 화면을 넘지 않게
  let u = Math.max(H / 1080, 0.6); u = Math.min(u, W / 1500, H / 640);
  // 버튼 단위: 휴대폰(터치, 낮은 화면)에서는 누를 곳이 약 11mm(≈70px) 이상 되게 키움 (GDD 1-3)
  const bu = G.isTouch && H < 700 ? Math.max(u, 0.72) : u;
  G.stage = { W, H, ws, u, bu, portrait: H > W * 1.05 };
  document.documentElement.style.setProperty('--u', u + 'px');
  document.documentElement.style.setProperty('--bu', bu + 'px');
  G.$('#rotate').classList.toggle('on', G.stage.portrait && G.isTouch);
  if (G.stage.portrait && G.isTouch && G.audio && G.audio.ready && !G._rotSaid) { G._rotSaid = 1; G.audio.voice('S92_rotate'); }
  if (G.onResize) G.onResize();
  for (const f of G.resizers) { try { f(); } catch (e) { console.error(e); } }
};
G.resizers = new Set();
G.isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

// ---------- 게임 시계 (교사용 설정이 열리면 멈춤) ----------
const updaters = new Set();
G.every = (fn) => { updaters.add(fn); return () => updaters.delete(fn); };
let last = performance.now();
function tick(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (!G.paused) { G.t += dt; for (const f of [...updaters]) { try { f(dt); } catch (e) { console.error(e); } } }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
G.wait = (sec) => new Promise(res => { let t = 0; const off = G.every(dt => { t += dt; if (t >= sec) { off(); res(); } }); });
G.ease = { lin: t => t, io: t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, out: t => 1 - Math.pow(1 - t, 3), in: t => t * t * t };
// 숫자 움직이기: G.tween(0, 1, 2, v => ..., 'io')
G.tween = (a, b, dur, fn, ease = 'io') => new Promise(res => {
  if (dur <= 0) { fn(b); res(); return; }
  let t = 0; fn(a);
  const off = G.every(dt => { t += dt; const k = Math.min(1, t / dur); fn(a + (b - a) * G.ease[ease](k)); if (k >= 1) { off(); res(); } });
});
G.reduced = () => G.settings && (G.settings.reduceMotion || (G.settings.reduceAuto && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches));

// ---------- 저장소 (학교 PC에서 막혀 있어도 게임은 돌아가게) ----------
G.store = {
  get(k, d) { try { const v = localStorage.getItem('starvillage.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('starvillage.' + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem('starvillage.' + k); } catch (e) { } },
};

// ---------- 교사용 설정 여는 방법: ESC, 또는 왼쪽 위 구석을 3초 길게 누르기 ----------
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { e.preventDefault(); G.teacher && G.teacher.toggle(); return; }
  if (G.paused) return;
  if (G.cut && G.cut.onKey && G.cut.onKey(e)) { e.preventDefault(); return; }
  if (G.dialog && G.dialog.onKey && G.dialog.onKey(e)) e.preventDefault();
});
(() => {
  let timer = null, sx = 0, sy = 0;
  window.addEventListener('pointerdown', (e) => {
    if (e.clientX > 130 || e.clientY > 130) return;
    sx = e.clientX; sy = e.clientY; clearTimeout(timer);
    timer = setTimeout(() => { timer = null; G._suppressClick = true; setTimeout(() => G._suppressClick = false, 700); G.teacher && G.teacher.show(); }, 3000);
  }, true);
  const cancel = () => { clearTimeout(timer); timer = null; };
  window.addEventListener('pointerup', cancel, true); window.addEventListener('pointercancel', cancel, true);
  window.addEventListener('pointermove', (e) => { if (timer && Math.hypot(e.clientX - sx, e.clientY - sy) > 30) cancel(); }, true);
})();
// 두 손가락 확대, 길게 눌러 메뉴 막기 (7-1)
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });

/* ---- audio.js ---- */
// audio.js — 소리 (GDD 10장): 대사 100%, 효과음 60%, 환경음 30%, 음악 35% → 대사 중 20%
// 대사·효과음은 짧아서 Web Audio로 풀어서 재생, 긴 음악은 <audio>로 흘려 재생(메모리 절약)
'use strict';
G.audio = (() => {
  const A = { ready: false, ctx: null, buffers: new Map(), speaking: 0 };
  let master, gVoice, gSfx, gAmb, gMusic, musicEl = null, musicName = '', musicNode = null, ambs = {};
  const VOL = { voice: 1.0, sfx: 0.6, amb: 0.3, music: 0.35, duck: 0.2 };
  const S = () => G.settings || { volume: 0.9, voiceOn: true };

  // 시작하기 버튼(첫 누르기) 안에서 불러야 아이폰·안드로이드에서 소리가 남
  A.unlock = () => {
    if (A.ready) { if (A.ctx.state === 'suspended' && !G.paused) A.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    try {
      A.ctx = new AC(); master = A.ctx.createGain(); master.connect(A.ctx.destination);
      gVoice = A.ctx.createGain(); gSfx = A.ctx.createGain(); gAmb = A.ctx.createGain(); gMusic = A.ctx.createGain();
      for (const g of [gVoice, gSfx, gAmb, gMusic]) g.connect(master);
      gVoice.gain.value = VOL.voice; gSfx.gain.value = VOL.sfx; gAmb.gain.value = VOL.amb; gMusic.gain.value = VOL.music;
      const b = A.ctx.createBuffer(1, 1, 22050); const s = A.ctx.createBufferSource(); s.buffer = b; s.connect(A.ctx.destination); s.start(0);
      A.ctx.resume && A.ctx.resume();
      A.ready = true; A.setVolume();
    } catch (e) { console.warn('소리 준비 실패', e); }
    // 브라우저 음성(TTS)도 첫 누르기에서 깨워 둠
    try { if (window.speechSynthesis) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch (e) { }
  };
  A.setVolume = () => { if (!A.ready) return; master.gain.value = S().volume ?? 0.9; };
  A.pause = () => { if (A.ready && A.ctx.state === 'running') A.ctx.suspend(); if (musicEl) musicEl.pause(); try { speechSynthesis.pause(); } catch (e) { } };
  A.resume = () => { if (A.ready) A.ctx.resume(); if (musicEl && musicName) musicEl.play().catch(() => { }); try { speechSynthesis.resume(); } catch (e) { } };

  async function loadBuf(url) {
    if (A.buffers.has(url)) { const b = A.buffers.get(url); A.buffers.delete(url); A.buffers.set(url, b); return b; }
    const r = await fetch(url); if (!r.ok) throw new Error('없음 ' + url);
    const ab = await r.arrayBuffer();
    const buf = await new Promise((ok, no) => A.ctx.decodeAudioData(ab, ok, no));
    A.buffers.set(url, buf);
    while (A.buffers.size > 24) A.buffers.delete(A.buffers.keys().next().value);   // 오래된 것부터 버림
    return buf;
  }
  A.preload = (ids) => { if (!A.ready) return; for (const id of ids) loadBuf(G.voiceUrl(id)).catch(() => { }); };

  // ---- 대사 음성: 끝나면 resolve. 파일이 없으면 브라우저 음성 → 그것도 안 되면 3초 ----
  let cur = null;
  A.stopVoice = () => { if (cur) { try { cur.stop(); } catch (e) { } cur = null; } try { speechSynthesis.cancel(); } catch (e) { } };
  A.voice = (id, textFallback) => new Promise(async (done) => {
    A.stopVoice();
    const line = G.D.dialogues && G.D.dialogues[id];
    const text = textFallback || (line && line.text) || '';
    let finished = false; const fin = () => { if (finished) return; finished = true; A.speaking = Math.max(0, A.speaking - 1); if (!A.speaking) duck(false); done(); };
    A.speaking++; duck(true);
    if (!S().voiceOn) { await G.wait(Math.max(1.2, text.length * 0.09)); return fin(); }
    if (!A.ready) { await G.wait(1.5); return fin(); }
    try {
      const buf = await loadBuf(G.voiceUrl(id));
      const src = A.ctx.createBufferSource(); src.buffer = buf; src.connect(gVoice); cur = src;
      src.onended = () => { if (cur === src) cur = null; fin(); };
      src.start();
      // 혹시 끝 알림이 안 오면 (탭 전환 등) 길이+1.5초 뒤 진행
      G.wait(buf.duration + 1.5).then(fin);
    } catch (e) {
      if (text && tts(text, fin)) return;
      await G.wait(3); fin();
    }
  });
  function tts(text, fin) {
    try {
      if (!window.speechSynthesis) return false;
      const u = new SpeechSynthesisUtterance(text.replace(/[「」“”]/g, '')); u.lang = 'ko-KR'; u.rate = 0.9; u.volume = S().volume ?? 0.9;
      const ko = speechSynthesis.getVoices().find(v => /ko/i.test(v.lang)); if (ko) u.voice = ko;
      u.onend = fin; u.onerror = () => G.wait(1).then(fin);
      speechSynthesis.speak(u); G.wait(Math.max(4, text.length * 0.35)).then(fin); return true;
    } catch (e) { return false; }
  }
  function duck(on) {
    if (!A.ready) return; const t = A.ctx.currentTime;
    gMusic.gain.cancelScheduledValues(t); gMusic.gain.setValueAtTime(gMusic.gain.value, t);
    gMusic.gain.linearRampToValueAtTime(on ? VOL.duck : VOL.music, t + 0.4);
    if (musicEl && !musicNode) musicEl.volume = (on ? VOL.duck : VOL.music) * (S().volume ?? 0.9);
  }

  // ---- 효과음 ----
  A.sfx = async (name, vol = 1) => {
    if (!A.ready) return;
    try { const buf = await loadBuf(G.asset('assets/audio/' + name + '.mp3')); const s = A.ctx.createBufferSource(); s.buffer = buf; const g = A.ctx.createGain(); g.gain.value = vol; s.connect(g); g.connect(gSfx); s.start(); } catch (e) { }
  };

  // ---- 음악 (반복). <audio>가 막힌 환경이면 풀어서 재생으로 바꿈 ----
  const blobUrls = {};
  async function mediaUrl(p) {
    const u = G.asset(p); if (!u.startsWith('data:')) return u;
    if (!blobUrls[p]) { const r = await fetch(u); blobUrls[p] = URL.createObjectURL(await r.blob()); }
    return blobUrls[p];
  }
  A.music = async (name) => {
    if (!A.ready || name === musicName) return;
    const old = musicEl, oldNode = musicNode; musicName = name; musicEl = null; musicNode = null;
    if (old) fadeOutEl(old, oldNode);
    if (!name) return;
    const p = 'assets/audio/' + name + '.mp3';
    try {
      const el = new Audio(); el.loop = true; el.preload = 'auto'; el.src = await mediaUrl(p);
      if (musicName !== name) return;
      try { const node = A.ctx.createMediaElementSource(el); node.connect(gMusic); musicNode = node; } catch (e) { el.volume = VOL.music * (S().volume ?? 0.9); }
      musicEl = el;
      el.addEventListener('error', () => { if (musicEl === el) { musicEl = null; loopBuffer(p, gMusic, name); } }, { once: true });
      await el.play();
    } catch (e) { if (musicName === name && !musicEl) loopBuffer(p, gMusic, name); }
  };
  function fadeOutEl(el, node) { let v = 1; const off = G.every(dt => { v -= dt / 0.8; if (v <= 0) { off(); el.pause(); el.src = ''; if (node) try { node.disconnect(); } catch (e) { } } else if (!node) el.volume = Math.max(0, el.volume * 0.9); }); if (!G.paused) { } }
  const loops = {};
  async function loopBuffer(p, gain, key) {
    try { const buf = await loadBuf(G.asset(p)); if (key === musicName || ambs[key]) { const s = A.ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.connect(gain); s.start(); loops[key] = s; } } catch (e) { }
  }
  // ---- 환경음 (여러 개 겹침) ----
  A.ambient = async (names = []) => {
    if (!A.ready) return;
    for (const k of Object.keys(ambs)) if (!names.includes(k)) { const a = ambs[k]; delete ambs[k]; try { a.g.gain.linearRampToValueAtTime(0, A.ctx.currentTime + 0.8); setTimeout(() => { try { a.s.stop(); } catch (e) { } }, 900); } catch (e) { } }
    for (const n of names) {
      if (ambs[n]) continue;
      const g = A.ctx.createGain(); g.gain.value = 0; g.connect(gAmb); ambs[n] = { g, s: null };
      try {
        const buf = await loadBuf(G.asset('assets/audio/' + n + '.mp3')); if (!ambs[n]) continue;
        const s = A.ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.connect(g); s.start(); ambs[n].s = s;
        g.gain.linearRampToValueAtTime(n === 'amb_crickets' ? 0.5 : 1, A.ctx.currentTime + 1.2);
      } catch (e) { }
    }
  };
  A.ambientBoost = (name, on) => { const a = ambs[name]; if (!a || !A.ready) return; const t = A.ctx.currentTime; a.g.gain.cancelScheduledValues(t); a.g.gain.setValueAtTime(a.g.gain.value, t); a.g.gain.linearRampToValueAtTime(on ? 3 : 1, t + 0.5); };
  return A;
})();

/* ---- save.js ---- */
// save.js — 저장 칸 (U2, GDD 6-4·11-6). 자동 저장만 있음. 칸 지우기·늘리기는 교사용 설정에서만
'use strict';
G.save = (() => {
  const S = {};
  const PLACES = ['home', 'plaza', 'market', 'library', 'forest'];   // 칸에 보이는 마지막 장소 그림 (assets/ui/icons/place_*.png)
  S.count = () => Math.max(12, Math.min(24, (G.settings && G.settings.slotCount) || 12));
  S.load = (slot) => G.store.get('slot' + slot, null);
  S.fresh = (slot) => ({
    slot, name: '', stars: 0, place: 'home', chapter: 'start',
    done: [], items: [], mood: 0, env: { board: false, guide: false }, seenCutscenes: [],
    quest: 0, cleared: [], visited: [], seen: [], started: false, updated: new Date().toISOString(),
  });
  S.del = (slot) => G.store.del('slot' + slot);
  // 할 일 하나 끝낼 때, 장소를 나갈 때 부름. 구석의 작은 별이 한 번 반짝 (소리 없음)
  S.write = () => {
    if (!G.st) return;
    G.st.updated = new Date().toISOString();
    const ok = G.store.set('slot' + G.st.slot, G.st);
    const s = G.$('#savedStar'); if (s && ok) { s.classList.remove('blink'); void s.offsetWidth; s.classList.add('blink'); }
    return ok;
  };

  // ---- U2 저장 칸 고르기: 번호 칸 (9/29 선생님 요청으로 그림 고르기를 뺌). 고른 칸 번호를 돌려줌 ----
  S.screen = () => new Promise((done) => {
    const ov = G.$('#overlay'); ov.innerHTML = '';
    const scr = G.el('div', 'slots-screen', ov);
    const head = G.el('div', 's-head', scr);
    G.el('h2', '', head, G.D.dialogues.S92_pick_slot ? G.D.dialogues.S92_pick_slot.text.replace(/\.$/, '') : '내 번호를 눌러 주세요');
    const say = G.btn('pill round', G.icon('icon_sound'), head, () => G.audio.voice('S92_pick_slot'), '다시 듣기');
    say.style.cssText = 'width:calc(var(--bu)*100);height:calc(var(--bu)*100);min-width:0;min-height:0';
    const grid = G.el('div', 'slots-grid', scr);
    let busy = false;
    for (let i = 1; i <= S.count(); i++) {
      const data = S.load(i);
      const card = G.el('button', 'slot-card' + (data ? '' : ' empty'), grid); card.type = 'button';
      card.setAttribute('aria-label', i + '번' + (data && data.name ? ' ' + data.name : ''));
      G.el('div', 'bn', card, String(i));
      G.el('div', 'nm', card, data ? (data.name ? esc(data.name) : '이어 하기') : '새로 하기');
      if (data) {
        G.el('div', 'meta', card, G.icon('icon_star') + (data.stars || 0) + '/8');
        card.insertAdjacentHTML('beforeend', G.icon('place_' + (PLACES.includes(data.place) ? data.place : 'home'), 'pl'));
      }
      G.onTap(card, async () => {
        if (busy) return; busy = true;
        grid.querySelectorAll('.picked').forEach(e => e.classList.remove('picked')); card.classList.add('picked');
        G.audio.stopVoice(); G.audio.sfx('sfx_tap', 0.7);
        await G.wait(0.35);
        done({ slot: i, data: S.load(i) });
      });
    }
    // 카드 높이: 3줄이 한 화면에 들어가게
    const fit = () => {
      const gh = grid.clientHeight, gw = grid.clientWidth; if (!gh) return;
      const gap = parseFloat(getComputedStyle(grid).rowGap) || 16;
      const cw = (gw - gap * 3 - 16) / 4;
      const ch = Math.max(64, Math.min((gh - gap * 2 - 16) / 3, cw * 0.85));
      grid.style.setProperty('--cardH', ch + 'px'); grid.classList.toggle('wide', cw / ch > 1.7);
    };
    G.onResize = fit; requestAnimationFrame(fit);
    G.audio.voice('S92_pick_slot');
  });
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  S.esc = esc;

  // ---- 이름 쓰기 (선택, 건너뛰기 크게) ----
  S.askName = () => new Promise((done) => {
    const ov = G.$('#overlay');
    const m = G.el('div', 'modal', ov); const sh = G.el('div', 'sheet', m);
    G.el('h3', '', sh, '이름을 써도 되고, 안 써도 돼요');
    const row = G.el('div', 'name-row', sh);
    const inp = G.el('input', '', row); inp.type = 'text'; inp.maxLength = 8; inp.placeholder = '이름'; inp.autocomplete = 'off'; inp.enterKeyHint = 'done';
    const br = G.el('div', 'btn-row', row);
    const finish = (name) => { m.remove(); G.onResize = null; done(name); };
    G.btn('pill gold', G.icon('icon_skip') + ' 건너뛰기', br, () => { G.audio.voice('S92_btn_skip'); finish(''); }).style.minWidth = 'calc(var(--u)*360)';
    G.btn('pill', G.icon('icon_ok') + ' 다 썼어요', br, () => finish(inp.value.trim().slice(0, 8)));
    inp.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') finish(inp.value.trim().slice(0, 8)); if (e.key === 'Escape') G.teacher.toggle(); });
    G.audio.voice('S92_name');
  });
  return S;
})();

/* ---- hud.js ---- */
// hud.js — 화면 모서리 버튼과 표시 (U3·U4): 퀘스트, 이곳에서 할 일 ☆☆☆, 가방, 지도로, 루미(도움), 건너뛰기, 루미 말풍선
// 모든 버튼 = 그림 + 짧은 글자 + 누르면 읽어 줌 (GDD 1-3)
'use strict';
G.hud = (() => {
  const H = {};
  let root, tl, tr, bl, br, bubble, bubbleTok = 0, taskEl = null;
  H.init = () => {
    root = G.$('#hud'); root.innerHTML = '';
    tl = G.el('div', 'hud-tl', root); tr = G.el('div', 'hud-tr', root); bl = G.el('div', 'hud-bl', root); br = G.el('div', 'hud-br', root);
    bubble = G.el('div', 'bubble', root); bubble.style.display = 'none';
    const sv = G.el('div', 'saved', root); sv.id = 'savedStar'; sv.innerHTML = G.svgStar('#FFD66B', '#FFF6D6', 6);
  };
  H.clear = () => { if (!root) H.init(); tl.innerHTML = tr.innerHTML = bl.innerHTML = br.innerHTML = ''; H.hideBubble(); taskEl = null; };
  H.hide = (on) => { if (!root) H.init(); root.style.visibility = on ? 'hidden' : ''; };

  // ---- 지금 할 일: 열려 있고 아직 안 끝낸 첫 장소 ----
  H.nextPlace = () => G.D.places.places.find(p => G.map.state(p) === 'open') || null;
  function questCard() {
    const q = G.el('button', 'quest', tl); q.type = 'button';
    const np = H.nextPlace();
    G.el('div', 'q1', q, '★ 사라진 별 ' + (G.st.quest || 0) + '/5');
    G.el('div', 'q2', q, np ? '지금 할 일: ' + np.name + '에 가 보자' : '다음 이야기를 기다려요');
    G.onTap(q, () => { if (np) G.audio.voice('S92_now_' + np.id); });
    return q;
  }
  function bagBtn() { return G.btn('pill', G.icon('icon_bag') + ' 가방', tr, () => { G.audio.voice('S92_btn_bag'); H.bag(); }, '가방'); }
  function lumiBtn(onTap) {
    const b = G.el('button', 'lumi-btn', bl); b.type = 'button'; b.setAttribute('aria-label', '루미 도움');
    const im = G.el('img', '', b); im.src = G.asset('assets/chars/lumi.png'); im.alt = '';
    G.el('span', '', b, '루미');
    G.onTap(b, onTap);
  }

  H.map = () => {
    H.clear();
    if (!G.st.done.includes('meet_lumi')) return;
    H.questEl = questCard();
    bagBtn();
    lumiBtn(() => G.help.now());
  };
  H.refreshQuest = () => { if (H.questEl && H.questEl.isConnected) { const n = questCard(); H.questEl.replaceWith(n); H.questEl = n; } };

  H.scene = (def, onMap) => {
    H.clear();
    taskEl = G.el('button', 'quest tasks', tl); taskEl.type = 'button';
    G.onTap(taskEl, () => G.audio.voice('S03_rumi_03'));
    H.tasks(def);
    G.btn('pill', G.icon('icon_map') + ' 지도로', tr, () => { G.audio.voice('S92_btn_map'); onMap(); }, '지도로');
    bagBtn();
    lumiBtn(() => G.help.now());
  };
  H.tasks = (def, flash) => {
    if (!taskEl) return;
    const n = def.missions.length, d = def.missions.filter(m => G.st.done.includes(m)).length;
    taskEl.innerHTML = '<span>이곳에서 할 일</span> <span class="stars">' + '<b>★</b>'.repeat(d) + '☆'.repeat(n - d) + '</span>';
    if (flash) { taskEl.classList.remove('flash'); void taskEl.offsetWidth; taskEl.classList.add('flash'); }
  };
  H.keepTasks = (on) => { tl && tl.classList.toggle('keep', !!on); };

  // ---- 건너뛰기 (지도 이동·연출) ----
  H.skip = (fn) => {
    br.innerHTML = ''; if (!fn) return;
    G.btn('pill skip', '건너뛰기 ' + G.icon('icon_skip'), br, () => { G.audio.voice('S92_btn_skip'); br.innerHTML = ''; fn(); }, '건너뛰기');
  };

  // ---- 루미 말풍선: 대사를 읽어 주고 끝나면 사라짐 (대화창을 열지 않음) ----
  H.say = async (id) => {
    const L = G.D.dialogues[id]; if (!L) return;
    const my = ++bubbleTok;
    bubble.textContent = L.text; bubble.style.display = '';
    await G.audio.voice(id);
    await G.wait(1.2);
    if (my === bubbleTok) bubble.style.display = 'none';
  };
  H.hideBubble = () => { bubbleTok++; if (bubble) bubble.style.display = 'none'; };

  // ---- 가방: 5칸, 누르면 이름과 설명을 읽어 줌 ----
  H.bag = () => {
    const ov = G.$('#overlay');
    const m = G.el('div', 'modal', ov); const sh = G.el('div', 'sheet', m);
    G.busy++;
    G.el('h3', '', sh, G.icon('icon_bag') + ' 가방');
    const slots = G.el('div', 'bag-slots', sh);
    const nm = G.el('div', 'bag-name', sh, G.st.items.length ? '' : '아직 가방이 비어 있어요');
    for (let i = 0; i < 5; i++) {
      const it = G.D.items.find(x => x.id === G.st.items[i]);
      const s = G.el('button', 'bag-slot' + (it ? ' has' : ''), slots, it ? G.icon(it.icon) : ''); s.type = 'button';
      if (it) G.onTap(s, () => { nm.textContent = it.name; G.audio.voice(it.voice); });
    }
    const row = G.el('div', 'btn-row', sh);
    G.btn('pill gold', G.icon('icon_ok') + ' 닫기', row, () => { m.remove(); G.busy = Math.max(0, G.busy - 1); G.audio.stopVoice(); });
  };
  return H;
})();

/* ---- help.js ---- */
// help.js — 도움 3단계 (GDD 6-1): 30초 질문 → 60초 화살표 → 90초(또는 [루미]) 반짝이는 길
// 대화·연출·이동 중(G.busy)과 교사용 설정이 열려 있을 때는 시간을 세지 않음
'use strict';
G.help = (() => {
  const Hp = {};
  let t = 0, level = 0, h = null;
  const TIMES = { short: [20, 40, 60], normal: [30, 60, 90], long: [45, 90, 135] };
  const times = () => TIMES[(G.settings && G.settings.help) || 'normal'];
  G.every(dt => {
    if (!h || G.busy > 0 || (G.dialog && G.dialog.active) || (G.settings && G.settings.help === 'off')) return;
    t += dt; const T = times();
    if (level < 1 && t >= T[0]) { level = 1; h.l1 && h.l1(); }
    if (level < 2 && t >= T[1]) { level = 2; h.l2 && h.l2(); }
    if (level < 3 && t >= T[2]) { level = 3; h.l3 && h.l3(); }
  });
  // 무엇이든 누르면 시간을 처음부터 (보이던 도움 표시는 지움)
  Hp.poke = () => { t = 0; if (level > 0) { level = 0; h && h.clear && h.clear(); } };
  Hp.set = (handlers) => { if (h && h.clear) h.clear(); h = handlers; t = 0; level = 0; };
  Hp.off = () => Hp.set(null);
  // [루미] 버튼: 바로 3단계 (질문도 같이 읽어 줌)
  Hp.now = () => { if (!h) return; t = times()[2]; level = 3; h.l1 && h.l1(); h.l2 && h.l2(); h.l3 && h.l3(); };
  Hp.level = () => level;
  return Hp;
})();

/* ---- mapview.js ---- */
// mapview.js — 마을 지도 그림 한 벌 (지도 화면과 연출 C1·C7이 같이 씀)
// 먹색 지도 위에 컬러 지도를 겹치고, 구역마다 둥근 물감 번짐(마스크)으로 색이 돌아옴 (GDD 7-5, 8장)
'use strict';
G.mapView = (parent, o = {}) => {
  const M = G.D.places.map, MOOD = G.D.mood;
  const V = { W: M.width, H: M.height, cam: { x: 1400, y: 860, z: 1 }, alpha: {}, grow: {}, lamps: [], markers: {} };
  const el = V.el = G.el('div', 'world', parent);
  el.style.width = V.W + 'px'; el.style.height = V.H + 'px';
  V.imgs = G.el('div', 'layer', el);
  const mono = G.el('img', 'bg', V.imgs); mono.src = G.asset(M.mono); mono.width = V.W; mono.height = V.H; mono.alt = '';
  const col = V.colorImg = G.el('img', 'bg map-color', V.imgs); col.src = G.asset(M.color); col.width = V.W; col.height = V.H; col.alt = '';
  V.fx = G.el('div', 'layer', el);        // 불빛, 표시, 인물 (위치는 지도 px)
  V.ready = Promise.all([mono, col].map(i => i.decode ? i.decode().catch(() => { }) : Promise.resolve()));

  // ---- 가로등 불빛 ----
  for (const L of MOOD.lamps) {
    const g = G.el('div', 'lamp-glow', V.fx); g.style.left = L.at[0] + 'px'; g.style.top = (L.at[1] - 4) + 'px';
    V.lamps.push({ def: L, el: g });
  }
  V.setLamps = (stage, all) => { for (const l of V.lamps) l.el.classList.toggle('on', !!all || l.def.from <= stage); };

  // ---- 색 번짐: 구역마다 타원 물감 자국 ----
  V.applyMask = () => {
    const parts = [];
    for (const z of MOOD.zones) {
      const a = V.alpha[z.id] || 0; if (a < 0.003) continue;
      const k = V.grow[z.id] ?? 1, rx = Math.max(1, z.r[0] * k), ry = Math.max(1, z.r[1] * k);
      parts.push(`radial-gradient(ellipse ${rx.toFixed(0)}px ${ry.toFixed(0)}px at ${z.center[0]}px ${z.center[1]}px, rgba(0,0,0,${a.toFixed(3)}) 0%, rgba(0,0,0,${a.toFixed(3)}) 42%, rgba(0,0,0,${(a * .55).toFixed(3)}) 72%, rgba(0,0,0,0) 100%)`);
    }
    if (!parts.length) { col.style.visibility = 'hidden'; return; }
    col.style.visibility = '';
    const m = parts.join(',');
    col.style.webkitMaskImage = m; col.style.maskImage = m;
  };
  V.setMood = (stage) => {
    for (const z of MOOD.zones) { V.alpha[z.id] = z.alpha[Math.max(0, Math.min(5, stage))]; V.grow[z.id] = 1; }
    V.applyMask(); V.setLamps(stage);
  };
  V.fullColor = (a) => { col.style.webkitMaskImage = 'none'; col.style.maskImage = 'none'; col.style.visibility = ''; col.style.opacity = a; };

  // ---- 장소 표시(별)와 이름표 ----
  V.addMarkers = () => {
    for (const p of G.D.places.places) {
      const m = G.el('div', 'marker', V.fx); m.style.left = p.marker[0] + 'px'; m.style.top = p.marker[1] + 'px';
      const lb = G.el('div', 'plabel', V.fx, p.name); lb.style.left = p.marker[0] + 'px'; lb.style.top = (p.marker[1] + 62) + 'px';
      V.markers[p.id] = { m, lb, p, state: '' };
    }
  };
  // state: open(반짝) / locked(흐림) / done(작은 별) / hidden
  V.setMarker = (id, state, showLabel) => {
    const k = V.markers[id]; if (!k) return;
    if (k.state !== state) {
      k.state = state; k.m.className = 'marker ' + state;
      k.m.innerHTML = state === 'hidden' ? '' :
        state === 'locked' ? G.svgStar('rgba(190,196,214,.55)', 'rgba(90,96,120,.8)', 5) :
        state === 'done' ? G.svgStar('#FFE9A8', '#C98F14', 6) : G.svgStar('#FFD66B', '#FFF6D6', 6);
      if (state === 'done') k.m.style.transform = 'scale(.62)'; else k.m.style.transform = '';
    }
    k.lb.style.display = showLabel && state !== 'hidden' ? '' : 'none';
    k.lb.classList.toggle('locked', state === 'locked');
  };

  // ---- 걷는 인물 (4방향 x 걷기 8장 + 서 있기) ----
  const ROW = { SE: 0, SW: 1, NW: 2, NE: 3 };
  V.walker = (sheet, cls) => {
    const w = { x: 0, y: 0, dir: 'SE', frame: 8 };
    w.el = G.el('div', 'walker' + (cls ? ' ' + cls : ''), V.fx);
    G.el('div', 'shadow', w.el);
    w.spr = G.el('div', 'sprite', w.el); w.spr.style.backgroundImage = `url("${G.asset(sheet)}")`;
    w.set = (x, y) => { w.x = x; w.y = y; w.el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`; w.el.style.zIndex = Math.round(y); };
    w.draw = () => { w.spr.style.backgroundPosition = `${-w.frame * 100}px ${-ROW[w.dir] * 130}px`; };
    w.face = (dx, dy) => { w.dir = dy >= 0 ? (dx >= 0 ? 'SE' : 'SW') : (dx >= 0 ? 'NE' : 'NW'); };
    w.draw();
    return w;
  };

  // ---- 카메라: 가운데 (x,y), 확대 z. 지도 밖이 보이지 않게 막음 (free면 안 막음) ----
  V.setCam = (x, y, z = V.cam.z) => {
    const { W, H, ws, u } = G.stage, s = ws * z;
    if (!o.free) {
      const vw = W / s, vh = H / s;
      x = vw >= V.W ? V.W / 2 : Math.max(vw / 2, Math.min(V.W - vw / 2, x));
      y = vh >= V.H ? V.H / 2 : Math.max(vh / 2, Math.min(V.H - vh / 2, y));
    }
    V.cam = { x, y, z };
    el.style.transform = `translate(${(W / 2 - x * s).toFixed(1)}px,${(H / 2 - y * s).toFixed(1)}px) scale(${s.toFixed(4)})`;
    el.style.setProperty('--k', (u / s).toFixed(3));   // 지도 위 글자·말풍선을 화면 크기에 맞게
  };
  V.toScreen = (x, y) => { const s = G.stage.ws * V.cam.z; return [G.stage.W / 2 + (x - V.cam.x) * s, G.stage.H / 2 + (y - V.cam.y) * s]; };
  return V;
};

// 길 찾기: 노드 이름 목록 (places.json의 edges)
G.mapPath = (from, to) => {
  if (from === to) return [from];
  const adj = {}; for (const [a, b] of G.D.places.edges) { (adj[a] = adj[a] || []).push(b); (adj[b] = adj[b] || []).push(a); }
  const prev = { [from]: null }, q = [from];
  while (q.length) { const n = q.shift(); if (n === to) break; for (const m of adj[n] || []) if (!(m in prev)) { prev[m] = n; q.push(m); } }
  if (!(to in prev)) return [from, to];
  const out = []; for (let n = to; n; n = prev[n]) out.unshift(n); return out;
};

/* ---- dialogue.js ---- */
// dialogue.js — 대화창(U5)과 선택지(U6)
// 음성이 끝나야 [다음]이 켜짐. 대화창 바깥을 눌러도 [다음]과 같음. [다시 듣기]는 언제나 누를 수 있음
// 인물 그림: 왼쪽 = 주인공 + 루미, 오른쪽 = 상대. 말하는 사람은 밝게, 듣는 사람은 조금 어둡게 (기획안 16-10)
// 9/29: 선생님 캐릭터 일러스트. 대사마다 동작 그림을 바꿈 (data/poses.json, 적지 않으면 기본 01)
// 9/29 밤: 상반신 위주로 크게, 서로 마주 보게 (왼쪽 인물은 오른쪽을, 오른쪽 인물은 왼쪽을 봄)
//   상대가 없으면 주인공(왼쪽)과 루미(오른쪽)가 마주 봄. 상대가 있으면 루미는 주인공 어깨 옆에서 상대 쪽을 봄
//   인물 그림은 #portraits 층(장면 바로 위, 버튼·할 일 표시·대화창보다 아래)에만 그려 버튼을 가리지 않음
'use strict';
G.dialog = (() => {
  const Dl = { active: false };
  const BAND = { lumi: '#FFD66B', hero: '#7FB77E', chief: '#A0764F', post: '#5B8FD0', villager: '#B58BC4', nar: '', ui: '' };
  let wrap, box, nameEl, textEl, nextBtn, replayBtn, pgL, pgR, heroImg, lumiImg, partnerImg, choicesEl;
  let ready = false, vtok = 0, curId = null, waiter = null, blinkOff = null, lastLine = false;

  function build(partner) {
    const root = G.$('#dialog'); root.innerHTML = '';
    wrap = G.el('div', 'dlg-wrap', root);
    const hit = G.el('div', 'dlg-hit', wrap);
    hit.addEventListener('click', (e) => {
      if (G.paused || G._suppressClick) return;
      const through = lastLine && ready;   // 마지막 대사에서 장면 속 누를 곳(장소·반짝이는 곳)을 누르면 대화를 닫고 그곳을 바로 누름
      press();
      if (through) setTimeout(() => tapThrough(e.clientX, e.clientY), 80);
    });
    const P = G.D.portraits, pr = G.$('#portraits'); pr.innerHTML = ''; pr.classList.add('on');
    pgL = G.el('div', 'pgroup L enter', pr);
    heroImg = portrait(pgL, 'pmain', 'hero', 'L');
    if (partner && P[partner]) {
      lumiImg = portrait(pgL, 'plumi', 'lumi', 'L');
      pgR = G.el('div', 'pgroup R enter', pr);
      partnerImg = portrait(pgR, 'pmain', partner, 'R');
    } else {
      pgR = G.el('div', 'pgroup R solo enter', pr);
      lumiImg = portrait(pgR, 'plumi', 'lumi', 'R');
      partnerImg = null;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => { pgL.classList.remove('enter'); pgR && pgR.classList.remove('enter'); }));
    box = G.el('div', 'dlg-box', wrap);
    nameEl = G.el('div', 'dlg-name', box);
    textEl = G.el('div', 'dlg-text', box);
    const btns = G.el('div', 'dlg-btns', box);   // 9/29: 버튼을 옆으로 나란히 놓아 대화창을 낮게
    replayBtn = G.btn('pill dlg-replay', G.icon('icon_sound'), btns, () => { if (curId) speak(curId); }, '다시 듣기');
    nextBtn = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), btns, () => press(), '다음');
    choicesEl = null;
    // 루미 눈 깜박임 (깜박임 그림이 있을 때만)
    if (P.lumi.blink) {
      let t = 0, next = 2.5 + Math.random() * 2;
      blinkOff = G.every(dt => {
        t += dt; if (t > next) { lumiImg.src = G.asset(P.lumi.blink); if (t > next + 0.14) { lumiImg.src = G.asset(P.lumi.img); t = 0; next = 2.5 + Math.random() * 2.5; } }
      });
    }
  }
  function portrait(parent, cls, key, side) {
    const P = G.D.portraits[key], img = G.el('img', cls, parent); img.alt = ''; img.dataset.who = key; img.dataset.side = side;
    if (P.scale && cls === 'pmain') img.style.setProperty('--ps', P.scale);
    Object.values(P.poses || {}).forEach(src => { const pre = new Image(); pre.src = G.asset(src); });   // 동작이 바뀔 때 깜박이지 않게 미리 읽음
    setPose(img, '01'); return img;
  }
  // 동작 그림 바꾸기. 그림이 보는 쪽(face)과 선 자리(side)를 맞춰 뒤집음: 왼쪽 자리는 오른쪽을, 오른쪽 자리는 왼쪽을 보게
  function setPose(img, q) {
    if (!img) return;
    const P = G.D.portraits[img.dataset.who], src = (P.poses && P.poses[q]) || P.img;
    if (img.dataset.src !== src) { img.dataset.src = src; img.src = G.asset(src); }
    const face = (P.faces || {})[q] || P.face || 'L';
    img.classList.toggle('flip', face === img.dataset.side);
  }
  function poseFor(key, id) { return ((G.D.poses || {})[id] || {})[key] || '01'; }
  function tapThrough(x, y) {
    if (Dl.active || G.busy > 0 || G.paused) return;
    const t = document.elementFromPoint(x, y), b = t && t.closest('#world .place, #world .hot');
    if (b) b.click();
  }
  function setSpeaker(sp) {
    const inL = sp === 'hero' || sp === 'lumi';
    heroImg.classList.toggle('dim', sp !== 'hero'); heroImg.classList.toggle('speak', sp === 'hero');
    lumiImg.classList.toggle('dim', sp !== 'lumi'); lumiImg.classList.toggle('speak', sp === 'lumi');
    if (partnerImg) { const me = !inL && sp !== 'nar'; partnerImg.classList.toggle('dim', !me); partnerImg.classList.toggle('speak', me); }
    if (Dl.onSpeaker) Dl.onSpeaker(sp);
  }
  function setNext() { if (!nextBtn) return; nextBtn.classList.toggle('wait', !ready); nextBtn.classList.toggle('ready', ready); nextBtn.disabled = !ready; }
  function speak(id) {
    const my = ++vtok; ready = false; setNext();
    return G.audio.voice(id).then(() => { if (my === vtok) { ready = true; setNext(); } });
  }
  function press() { if (!ready || !waiter) return; G.audio.sfx('sfx_tap', 0.5); const w = waiter; waiter = null; w(); }
  function show(id) {
    const L = G.D.dialogues[id] || { speaker: 'nar', name: '', text: '' };
    curId = id;
    nameEl.textContent = L.name || ''; nameEl.style.setProperty('--band', BAND[L.speaker] || 'var(--star)');
    textEl.textContent = L.text; setSpeaker(L.speaker);
    // "…을 눌러 봐" 대사에서는 인물 그림이 비켜서 장면 속 누를 곳(장소·반짝이는 곳)을 가리지 않음. 마지막 대사면 그곳을 바로 눌러도 됨
    G.$('#portraits').classList.toggle('look', /눌러/.test(L.text));
    setPose(heroImg, poseFor('hero', id)); setPose(lumiImg, poseFor('lumi', id));
    if (partnerImg) setPose(partnerImg, poseFor(Dl.partner, id));
    return L;
  }

  // ---- 대사 여러 개를 차례로 ----
  // opts.partner: 오른쪽 인물 ('chief', 'post'), opts.keep: 끝나도 창을 닫지 않음
  Dl.play = async (ids, opts = {}) => {
    if (!ids || !ids.length) return;
    open(opts.partner);
    G.audio.preload(ids.slice(0, 3));
    for (let i = 0; i < ids.length; i++) {
      G.audio.preload(ids.slice(i + 1, i + 3));
      lastLine = i === ids.length - 1 && !opts.keep;
      show(ids[i]); if (Dl.onLine) Dl.onLine(ids[i]);
      await new Promise(res => { waiter = res; speak(ids[i]); });
    }
    if (!opts.keep) Dl.close();
  };
  function open(partner) {
    if (!Dl.active || (partner || null) !== Dl.partner) {
      if (blinkOff) blinkOff();
      build(partner);
    }
    Dl.partner = partner || null;
    if (!Dl.active) { Dl.active = true; G.busy++; G.$('#game').classList.add('talking'); }
  }
  Dl.close = () => {
    if (!Dl.active) return;
    Dl.active = false; G.busy = Math.max(0, G.busy - 1); waiter = null; curId = null; vtok++; lastLine = false;
    G.audio.stopVoice(); if (blinkOff) blinkOff(); blinkOff = null;
    G.$('#dialog').innerHTML = ''; G.$('#game').classList.remove('talking');
    const pr = G.$('#portraits'); pr.innerHTML = ''; pr.classList.remove('on');
    if (Dl.onSpeaker) Dl.onSpeaker(null);
  };

  // ---- 선택지 (U6): 처음 누르면 읽어 주고 테두리, 한 번 더 누르면 선택. 버튼이 하나면 바로 선택 ----
  // opts: [{label, icon, voice}] → 고른 번호. 고른 말은 주인공 대사로 한 번 나옴
  Dl.choose = (options, keep) => new Promise((done) => {
    open(Dl.partner); lastLine = false;
    nextBtn.style.visibility = 'hidden';
    choicesEl = G.el('div', 'choices', wrap);
    const one = options.length === 1 || (G.settings && G.settings.choiceOne);
    let armed = -1;
    options.forEach((o, i) => {
      const b = G.btn('pill gold choice', (o.icon ? G.icon(o.icon) + ' ' : '') + o.label, choicesEl, async () => {
        if (one || armed === i) {
          choicesEl.remove(); choicesEl = null; nextBtn.style.visibility = '';
          G.audio.sfx('sfx_tap', 0.6);
          if (o.voice) { show(o.voice); await speak(o.voice); await G.wait(0.3); }
          if (!keep) Dl.close();
          done(i); return;
        }
        armed = i; choicesEl.querySelectorAll('.armed').forEach(e => e.classList.remove('armed')); b.classList.add('armed');
        if (o.voice) G.audio.voice(o.voice, o.label);
      });
    });
  });

  Dl.onKey = (e) => {
    if (!Dl.active) return false;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
      if (choicesEl) { const a = choicesEl.querySelector('.armed') || (choicesEl.children.length === 1 && choicesEl.children[0]); if (a) a.click(); return true; }
      press(); return true;
    }
    if (e.key === 'r' || e.key === 'R') { if (curId) speak(curId); return true; }
    return false;
  };
  return Dl;
})();

/* ---- cutscene.js ---- */
// cutscene.js — 연출 (U8, 기획안 7-12). 층(하늘·별·마을·인물·빛·입자·글자)을 따로 움직임
// 처음 보는 연출은 2초 뒤 [건너뛰기]. 건너뛰면 모든 움직임이 바로 끝 모습으로 감 (그래서 끝 상태가 항상 맞음)
// 움직임 줄이기: 카메라 이동·흔들림 없이 천천히 바뀌는 그림으로
'use strict';
G.cut = (() => {
  const C = { active: null };
  const TEXT = (id) => (G.D.dialogues[id] || {}).text || '';

  function ctx(root) {
    const c = { skipped: false, rm: !!G.reduced(), light: !!(G.settings && G.settings.light), t0: G.t, root };
    let skipRes; c.skipP = new Promise(r => skipRes = r);
    c.skip = () => { if (c.skipped) return; c.skipped = true; G.audio.stopVoice(); skipRes(); };
    c.wait = (s) => c.skipped || s <= 0 ? Promise.resolve() : Promise.race([G.wait(s), c.skipP]);
    c.until = (t) => c.wait(t - (G.t - c.t0));
    c.tween = (a, b, dur, fn, ease = 'io') => new Promise(res => {
      if (c.skipped || dur <= 0) { fn(b); res(); return; }
      let t = 0; fn(a);
      const off = G.every(dt => { t += dt; const k = c.skipped ? 1 : Math.min(1, t / dur); fn(a + (b - a) * G.ease[ease](k)); if (k >= 1) { off(); res(); } });
    });
    c.sfx = (n, v) => { if (!c.skipped) G.audio.sfx(n, v); };
    let sub = null;
    c.sub = (text) => {
      if (!text) { if (sub) sub.style.display = 'none'; return; }
      if (!sub) sub = G.el('div', 'subtitle', root);
      sub.textContent = text; sub.style.display = '';
    };
    c.voice = (id, withSub = true) => {
      if (c.skipped) return Promise.resolve();
      if (withSub) c.sub(TEXT(id));
      return Promise.race([G.audio.voice(id), c.skipP]).then(() => { if (withSub) c.sub(''); });
    };
    return c;
  }

  // ---- 연출 틀: 겹 하나 만들고, 건너뛰기, 본 연출 기록 ----
  C.play = async (id, opts = {}) => {
    const fn = SCRIPTS[id]; if (!fn) return;
    const ov = G.$('#overlay');
    const root = G.el('div', 'cut', ov);
    const c = ctx(root); C.active = c;
    G.busy++; G.hud.hide(true); G.help.poke();
    const g = G.gen, st0 = G.st;
    const seen = opts.replay || (st0 && st0.seenCutscenes.includes(id));
    let done = false;
    const skipBox = G.el('div', 'skipbox', root);
    const showSkip = () => {
      if (done || c.skipped || (G.settings && G.settings.hideSkip)) return;
      skipBox.innerHTML = '';
      G.btn('pill skip', '건너뛰기 ' + G.icon('icon_skip'), skipBox, () => { skipBox.innerHTML = ''; G.audio.voice('S92_btn_skip'); c.skip(); }, '건너뛰기');
      c.skipShown = true;
    };
    if (seen) showSkip(); else c.wait(2).then(showSkip);
    try { await fn(c, root, opts); } catch (e) { console.error('연출 오류', id, e); }
    done = true;
    if (st0 && !st0.seenCutscenes.includes(id) && !opts.replay) { st0.seenCutscenes.push(id); if (st0 === G.st) G.save.write(); }
    root.remove(); if (C.active === c) C.active = null;
    if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.hide(false); }
  };
  C.onKey = (e) => {
    if (!C.active) return false;
    if ((e.key === 'Enter' || e.key === ' ') && C.active.skipShown) { C.active.skip(); return true; }
    return true;   // 연출 중에는 다른 키를 먹음
  };

  const fadeIn = (c, el, d = 0.8) => c.tween(0, 1, d, v => el.style.opacity = v);
  const fadeOut = (c, el, d = 0.6) => c.tween(1, 0, d, v => el.style.opacity = v);
  const sparkSvg = G.svgStar('#FFF1B8', '#FFD66B', 4);

  // 반짝이 가루가 한 점에서 퍼짐 (화면 좌표)
  function burst(c, root, x, y, n = 14) {
    if (c.skipped) return;
    if (c.light) n = Math.min(n, 6);
    for (let i = 0; i < n; i++) {
      const s = G.el('div', 'spk', root, sparkSvg); s.style.left = x + 'px'; s.style.top = y + 'px';
      const a = Math.PI * 2 * i / n + Math.random() * 0.4, R = G.stage.u * (160 + Math.random() * 180);
      c.tween(0, 1, 1.2 + Math.random() * 0.5, k => { s.style.transform = `translate(${Math.cos(a) * R * k}px,${Math.sin(a) * R * k - 40 * G.stage.u * k}px) scale(${1 - k * 0.6}) rotate(${k * 180}deg)`; s.style.opacity = 1 - k; }, 'out').then(() => s.remove());
    }
  }

  const SCRIPTS = {
    // ---- C1 인트로 (약 16초): 별 반짝이는 하늘 → 별이 떨어짐 → 카메라가 마을로 → 빛이 퍼짐 → 가로등이 꺼지고 먹색으로 → 루미 등장 ----
    async C1(c, root) {
      root.style.opacity = 0;
      const V = G.mapView(root, { free: true });
      const sky = G.el('img', 'bg', null); sky.src = G.asset('assets/ui/sky.jpg'); sky.alt = '';
      Object.assign(sky.style, { top: '-1300px', width: V.W + 'px', height: '1600px' }); V.el.insertBefore(sky, V.el.firstChild);
      V.imgs.style.webkitMaskImage = V.imgs.style.maskImage = 'linear-gradient(to bottom, transparent 0, #000 320px)';
      V.fullColor(1); V.setLamps(5, true);
      // 별 (반짝이는 작은 별 + 별자리)
      const starL = G.el('div', 'layer', V.el);
      for (let i = 0; i < (c.light ? 14 : 40); i++) {
        const d = G.el('div', 'dot twinkle', starL), r = 6 + Math.random() * 12;
        Object.assign(d.style, { left: Math.random() * V.W + 'px', top: (-1250 + Math.random() * 1000) + 'px', width: r + 'px', height: r + 'px', animationDelay: (-Math.random() * 2.2) + 's' });
      }
      const CON = [[1380, -1080], [1520, -960], [1700, -1010], [1840, -900], [1960, -1060]];
      const ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'); svg.setAttribute('class', 'cline'); svg.setAttribute('width', 1); svg.setAttribute('height', 1);
      const pth = document.createElementNS(ns, 'path'); pth.setAttribute('d', 'M' + CON.map(p => p.join(' ')).join(' L')); svg.appendChild(pth); starL.appendChild(svg);
      const bigs = CON.map(([x, y], i) => { const b = G.el('div', 'bigstar twinkle', starL, G.svgStar('#FFF6D6', '#FFD66B', 5)); Object.assign(b.style, { left: x + 'px', top: y + 'px', animationDelay: -i * 0.4 + 's' }); if (i !== 2) b.style.transform = 'scale(.6)'; return b; });
      const fallen = bigs[2];
      const fall = G.el('div', 'star-fall', V.fx, '<div class="tail"></div><div class="head"></div>');
      Object.assign(fall.style, { position: 'absolute', left: '0', top: '0', transformOrigin: '480px 40px', opacity: 0, zIndex: 4000 });
      const P = G.D.places.nodes, land = [P.PLAZA[0], P.PLAZA[1] - 70];
      const flare = G.el('div', 'flare', V.fx); Object.assign(flare.style, { position: 'absolute', left: (land[0] - 450) + 'px', top: (land[1] - 300) + 'px', opacity: 0, zIndex: 3990 });
      const lumi = G.el('img', '', V.fx); lumi.src = G.asset('assets/chars/lumi_big.png'); lumi.alt = '';
      Object.assign(lumi.style, { position: 'absolute', left: (land[0] - 70) + 'px', top: (land[1] - 150) + 'px', width: '140px', height: '140px', opacity: 0, zIndex: 4001 });
      await Promise.all([V.ready, sky.decode ? sky.decode().catch(() => { }) : 0]);
      V.setCam(1440, -760, 1);
      const onR = () => V.setCam(V.cam.x, V.cam.y, V.cam.z); G.resizers.add(onR);
      c.t0 = G.t;
      await Promise.all([
        fadeIn(c, root, 1.0),
        (async () => { await c.until(0.3); await c.voice('S01_nar_01'); await c.until(5.3); await c.voice('S01_nar_02'); await c.until(9.9); await c.voice('S01_nar_03'); })(),
        (async () => {   // 별이 흔들리다 떨어짐
          await c.until(3.0);
          if (!c.rm) await c.tween(0, 1, 2.0, k => { fallen.style.transform = `rotate(${Math.sin(k * Math.PI * 6) * 14}deg) scale(${1 + Math.sin(k * Math.PI * 4) * 0.25})`; });
          await c.until(5.2);
          c.sfx('sfx_starfall', 0.8); c.sfx('sfx_sparkle', 0.5);
          fallen.style.opacity = 0; fall.style.opacity = 1;
          const p0 = CON[2], p1 = [2050, -250], p2 = land;
          await c.tween(0, 1, 3.4, k => {
            const q = 1 - k, x = q * q * p0[0] + 2 * q * k * p1[0] + k * k * p2[0], y = q * q * p0[1] + 2 * q * k * p1[1] + k * k * p2[1];
            const dx = 2 * q * (p1[0] - p0[0]) + 2 * k * (p2[0] - p1[0]), dy = 2 * q * (p1[1] - p0[1]) + 2 * k * (p2[1] - p1[1]);
            fall.style.transform = `translate(${x - 480}px,${y - 40}px) rotate(${Math.atan2(dy, dx)}rad)`;
          }, 'in');
          fall.style.opacity = 0; c.sfx('sfx_chime', 0.5);
          await c.tween(0, 1, 0.6, k => { flare.style.opacity = k; flare.style.transform = `scale(${0.3 + k * 0.7})`; }, 'out');
          await c.tween(1, 0.45, 1.8, k => flare.style.opacity = k);
        })(),
        (async () => {   // 카메라가 하늘에서 마을로 내려옴
          if (c.rm) { await c.until(8.4); root.style.opacity = 0.2; V.setCam(1400, 700, 1.1); await fadeIn(c, root, 0.6); return; }
          await c.until(5.4);
          await c.tween(0, 1, 3.6, k => V.setCam(1440 - 40 * k, -760 + 1460 * k, 1 + 0.1 * k), 'io');
        })(),
        (async () => {   // 가로등이 광장 가까운 것부터 하나씩 꺼짐, 색이 빠짐
          await c.until(10.2);
          const ls = [...V.lamps].sort((a, b) => Math.hypot(a.def.at[0] - land[0], a.def.at[1] - land[1]) - Math.hypot(b.def.at[0] - land[0], b.def.at[1] - land[1]));
          const colT = c.tween(1, 0, 3.2, v => V.colorImg.style.opacity = v);
          for (const l of ls) { l.el.classList.remove('on'); c.sfx('sfx_click', 0.15); await c.wait(0.28); }
          await colT;
        })(),
        (async () => {   // 빛 속에서 루미가 나타나 두리번거림
          await c.until(13.8);
          c.sfx('sfx_sparkle', 0.7);
          await c.tween(0, 1, 0.9, k => { lumi.style.opacity = k; lumi.style.transform = c.rm ? '' : `scale(${k}) rotate(${(1 - k) * 360}deg)`; }, 'out');
          c.tween(0.45, 0, 1.2, v => flare.style.opacity = v);
          await c.until(14.9); if (!c.rm) lumi.style.transform = 'scaleX(-1)';
          await c.until(15.6); lumi.style.transform = '';
          await c.until(16.2);
        })(),
      ]);
      await fadeOut(c, root, 0.6);
      G.resizers.delete(onR);
    },

    // ---- C2 광장 도착 (6초): 카메라가 광장으로 다가감 → 촌장이 돌아봄 → 「광장」 ----
    async C2(c, root, opts) {
      root.style.opacity = 0;
      const V = G.sceneView(root, 'plaza', { chiefBack: true }); V.setMood(opts.replay ? 0 : (G.st ? G.st.mood : 0));
      await V.ready;
      const onR = () => V.setCam(V.cam.x, V.cam.y, V.cam.z); G.resizers.add(onR);
      if (c.rm) V.setCam(1200, 540, 1); else V.setCam(1000, 560, 1.3);
      c.t0 = G.t;
      const title = G.el('div', 'cut-title', root, '광장'); title.style.opacity = 0;
      await Promise.all([
        fadeIn(c, root, 0.5),
        (async () => { if (!c.rm) await c.tween(0, 1, 3.4, k => V.setCam(1000 + 200 * k, 560 - 20 * k, 1.3 - 0.3 * k), 'io'); })(),
        (async () => {
          await c.until(2.3); V.showBack(false);
          const ch = V.spr.chief.img;
          if (!c.rm) await c.tween(0, 1, 0.5, k => ch.style.marginTop = (-Math.sin(k * Math.PI) * 10) + 'px');
        })(),
        (async () => {
          await c.until(3.3);
          c.voice('S92_place_plaza', false);
          await c.tween(0, 1, 0.6, k => { title.style.opacity = k; title.style.transform = `translate(-50%,-50%) scale(${0.8 + 0.2 * k})`; }, 'out');
          await c.until(5.3);
          await c.tween(1, 0, 0.5, v => title.style.opacity = v);
          await c.until(5.9);
        })(),
      ]);
      V.setCam(1200, 540, 1); V.showBack(false);
      G.resizers.delete(onR);
    },

    // ---- C7 장소 클리어: "이곳 완료!" → 별빛이 위로 날아감 → 지도에서 금빛 물감이 번지며 색이 돌아옴 → 다음 장소에 불 ----
    async C7(c, root, opts) {
      const live = opts.live;
      const place = live ? live.place : 'plaza', from = live ? live.from : 0, to = live ? live.to : 1, unlock = live ? live.unlock : 'market';
      let SV = null;
      if (live) root.style.background = 'transparent';
      else { SV = G.sceneView(root, place); SV.setMood(0); await SV.ready; }
      c.t0 = G.t;
      // (가) 장면 위
      const big = G.el('div', 'cut-big', root, '이곳 완료!'); big.style.opacity = 0;
      c.sfx('sfx_clear', 0.8); c.voice('S92_clear', false);
      const { W, H, u } = G.stage;
      burst(c, root, W / 2, H * 0.4, 16);
      await c.tween(0, 1, 0.5, k => { big.style.opacity = Math.min(1, k * 2); big.style.transform = `translate(-50%,-50%) scale(${c.rm ? 1 : 0.5 + 0.6 * k})`; }, 'out');
      await c.tween(1.1, 1, 0.2, k => { if (!c.rm) big.style.transform = `translate(-50%,-50%) scale(${k})`; });
      await c.until(1.2);
      const orb = G.el('div', 'orb', root);
      const sv = live ? G.scene.view() : SV; const pp = sv ? sv.toScreen(1200, 560) : [W / 2, H / 2];
      c.sfx('sfx_sparkle', 0.6);
      await c.tween(0, 1, 1.3, k => { orb.style.left = pp[0] + 'px'; orb.style.top = (pp[1] - (pp[1] + 120 * u) * k) + 'px'; orb.style.transform = `scale(${1 + k * 0.6})`; }, 'in');
      orb.remove();
      await c.tween(1, 0, 0.4, v => big.style.opacity = v);
      // (나) 지도로
      G.$('#fade').classList.add('on'); await c.wait(0.45); if (c.skipped) await G.wait(0.05);
      big.remove(); if (SV) { SV.el.remove(); SV = null; }
      let MV;
      if (live) { await G.map.show({ mood: from, lockedOverride: [unlock] }); MV = G.map.V; G.hud.hide(true); G.map.camFree = true; }
      else {
        root.style.background = '#1b2146';
        MV = G.mapView(root, {}); MV.setMood(from); MV.addMarkers();
        for (const p of G.D.places.places) MV.setMarker(p.id, p.id === place ? 'done' : 'locked', p.labelAlways);
        await MV.ready;
      }
      const z = G.D.mood.zones.find(q => q.id === place) || G.D.mood.zones[0];
      MV.setCam(z.center[0], z.center[1] + 20);
      G.$('#fade').classList.remove('on');
      await c.wait(0.4);
      await bloom(c, MV, from, to, z, unlock, live);
      G.map.camFree = false;
      await c.wait(1.0);
      if (!live) await fadeOut(c, root, 0.5);
    },
  };

  // 금빛 물감 번짐: 바뀌는 구역의 색이 작은 자국에서 크게 번짐, 가로등이 켜지고 다음 장소 표시가 반짝
  async function bloom(c, V, from, to, z, unlock, live) {
    const ring = G.el('div', 'bloom-ring', V.fx);
    Object.assign(ring.style, { left: (z.center[0] - z.r[0]) + 'px', top: (z.center[1] - z.r[1]) + 'px', width: z.r[0] * 2 + 'px', height: z.r[1] * 2 + 'px', zIndex: 3500 });
    c.sfx('sfx_sparkle', 0.7);
    const zones = G.D.mood.zones.map(q => ({ id: q.id, a0: q.alpha[from], a1: q.alpha[to] }));
    const lampsOn = V.lamps.filter(l => l.def.from > from && l.def.from <= to);
    await Promise.all([
      c.tween(0, 1, 2.2, k => { ring.style.transform = `scale(${c.rm ? 1 : 0.2 + k * 1.1})`; ring.style.opacity = c.rm ? 1 - k : Math.min(1, 3 * (1 - k)); }, 'out'),
      c.tween(0, 1, 2.6, k => {
        for (const q of zones) { V.alpha[q.id] = q.a0 + (q.a1 - q.a0) * k; V.grow[q.id] = q.a1 > q.a0 && !c.rm ? 0.25 + 0.75 * k : 1; }
        V.applyMask();
      }, 'out'),
      (async () => { await c.wait(1.4); for (const l of lampsOn) { l.el.classList.add('on'); c.sfx('sfx_chime', 0.45); await c.wait(0.3); } })(),
      (async () => {
        await c.wait(2.2);
        if (unlock) {
          const p = G.D.places.places.find(q => q.id === unlock);
          V.setMarker(unlock, 'open', p && (p.labelAlways || (G.st && G.st.items.includes('map'))));
          c.sfx('sfx_sparkle', 0.6);
          if (live) G.map.camFree = false;
          const k = V.markers[unlock]; if (k && !c.skipped && k.m.animate) k.m.animate([{ transform: 'scale(.3)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 900, easing: 'ease-out' });
        }
      })(),
    ]);
    ring.remove();
    V.setMood(to);
  }
  return C;
})();

/* ---- worldmap.js ---- */
// worldmap.js — 마을 지도 (U3): 장소를 누르면 주인공이 정해진 길로 걸어감 (3~5초, 4방향), 배경 주민이 돌아다님
'use strict';
G.map = (() => {
  const Mp = {};
  const NODE = { home: 'HOME', plaza: 'PLAZA', market: 'MARKET', library: 'LIB', forest: 'FOREST' };
  let V = null, hero = null, lumi = null, offs = [], walking = null, trailEl = null, arrowEl = null, vills = [];
  const lumiPos = { x: 0, y: 0 };
  Mp.node = (placeId) => NODE[placeId] || 'HOME';
  Mp.state = (p) => {
    const st = G.st; if (!st) return 'locked';
    if (st.cleared.includes(p.id)) return 'done';
    const u = p.unlock;
    const open = u === 'start' ? st.done.includes('meet_lumi') : (u.startsWith('clear:') && st.cleared.includes(u.slice(6)));
    return open ? 'open' : 'locked';
  };
  const hasMapItem = () => G.st.items.includes('map');

  Mp.hide = () => {
    offs.forEach(f => f()); offs = []; vills = [];
    G.resizers.delete(onResize);
    if (V) { V.el.remove(); V = null; }
    walking = null; hero = null; lumi = null; trailEl = null; arrowEl = null;
    G.help.off();
  };
  function onResize() { if (V) V.setCam(V.cam.x, V.cam.y); }

  // ---- 지도 보이기 ----
  // o.mood: 이 단계로 그림 (C7에서 번지기 전 모습), o.noLumi: 루미를 아직 안 보임 (인트로)
  Mp.show = async (o = {}) => {
    G.scene.hide(); Mp.hide();
    G.screen = 'map';
    const world = G.$('#world'); world.innerHTML = '';
    V = Mp.V = G.mapView(world, {});
    V.setMood(o.mood ?? G.st.mood);
    V.addMarkers(); Mp.refresh(o.lockedOverride);
    // 장소 누르는 곳
    for (const p of G.D.places.places) {
      const b = G.el('button', 'place', V.fx); b.type = 'button'; b.setAttribute('aria-label', p.name);
      const [x, y, w, h] = p.hit; Object.assign(b.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', zIndex: 2990 });
      G.onTap(b, () => tapPlace(p));
    }
    // 주인공과 루미
    hero = V.walker('assets/chars/walk_hero.png', 'hero');
    const n = G.D.places.nodes[Mp.node(G.st.place)]; hero.set(n[0], n[1]); hero.frame = 8; hero.dir = 'SE'; hero.draw();
    lumi = G.el('div', 'lumi-f', V.fx); const li = G.el('img', '', lumi); li.src = G.asset('assets/chars/lumi.png'); li.alt = '';
    lumiPos.x = hero.x + 60; lumiPos.y = hero.y - 150; lumi.style.display = o.noLumi ? 'none' : '';
    placeLumi();
    // 배경 주민
    const stage = G.st.mood;
    for (const d of G.D.mood.villagers) if (d.from <= stage && !(G.settings.light && vills.length >= 2)) vills.push(makeVillager(d, stage));
    // 카메라는 주인공을 따라감 (갈 곳 쪽으로 조금 치우침)
    V.setCam(hero.x, hero.y - 40);
    offs.push(G.every(update)); update(10);
    G.resizers.add(onResize);
    G.hud.map();
    G.audio.music('music_night'); G.audio.ambient(['amb_crickets']);
    setHelp();
    await V.ready;
  };
  Mp.refresh = (lockedOverride = []) => {
    if (!V) return;
    for (const p of G.D.places.places) {
      let s = Mp.state(p); if (lockedOverride.includes(p.id)) s = 'locked';
      if (!G.st.done.includes('meet_lumi')) s = 'hidden';
      V.setMarker(p.id, s, p.labelAlways || hasMapItem());
    }
  };

  function placeLumi() { if (lumi) lumi.style.transform = `translate(${lumiPos.x.toFixed(1)}px,${lumiPos.y.toFixed(1)}px)`; }
  function update(dt) {
    if (!V) return;
    // 루미는 주인공 오른쪽 위를 살짝 늦게 따라옴
    if (hero && lumi && !Mp.lumiFree) {
      const tx = hero.x + 60, ty = hero.y - 150, k = Math.min(1, dt * 4);
      lumiPos.x += (tx - lumiPos.x) * k; lumiPos.y += (ty - lumiPos.y) * k; placeLumi();
    }
    for (const v of vills) v.update(dt);
    // 카메라
    if (hero && !Mp.camFree) {
      let fx = hero.x, fy = hero.y - 40;
      // 갈 곳 표시가 화면 모서리 버튼에 가리지 않게, 주인공과 함께 안전한 가운데 영역에 들어오도록 카메라를 옮김
      const np = !walking && G.hud.nextPlace && G.st.done.includes('meet_lumi') ? G.hud.nextPlace() : null;
      if (np) {
        const s = G.stage.ws * V.cam.z, vw = G.stage.W / s, vh = G.stage.H / s;
        const hx = vw / 2 - vw * 0.14, top = vh / 2 - vh * 0.2, bot = vh / 2 - vh * 0.14;
        const tx = np.marker[0], ty = np.marker[1] - 60;
        if (tx < fx - hx) fx = tx + hx; if (tx > fx + hx) fx = tx - hx;
        if (ty < fy - top) fy = ty + top;
        if (hero.y > fy + bot) fy = hero.y - bot;            // 주인공이 먼저
        if (hero.x < fx - hx) fx = hero.x + hx; if (hero.x > fx + hx) fx = hero.x - hx;
      }
      const k = Math.min(1, dt * 3);
      V.setCam(V.cam.x + (fx - V.cam.x) * k, V.cam.y + (fy - V.cam.y) * k);
    }
  }

  // ---- 장소 누르기 ----
  function tapPlace(p) {
    if (walking || G.busy > 0 || !G.st.done.includes('meet_lumi')) return;
    const s = Mp.state(p);
    if (s === 'locked') { G.audio.sfx('sfx_tap', 0.5); G.hud.say(G.D.story.lock); return; }
    G.audio.sfx('sfx_tap', 0.6);
    Mp.walkTo(p);
  }
  Mp.walkTo = async (p) => {
    clearHint();
    const from = Mp.node(G.st.place), to = p.node, g = G.gen;
    const names = G.mapPath(from, to), pts = names.map(nm => G.D.places.nodes[nm]);
    if (names.length > 1) {
      let len = 0; for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const W = G.D.places.walk, dur = Math.max(W.minSec, Math.min(W.maxSec, len / W.speed)), speed = len / dur;
      G.busy++;
      const visited = G.st.visited.includes(p.id);
      walking = { skip: false };
      if (visited) G.hud.skip(() => { if (walking) walking.skip = true; });
      if (p.walkLine) G.hud.say(p.walkLine);
      await new Promise(res => {
        let seg = 1, d = 0, t = 0, stepT = 0, stepN = 0;
        const off = G.every(dt => {
          if (!walking) { off(); res(); return; }
          if (walking.skip) { const e = pts[pts.length - 1]; hero.set(e[0], e[1]); off(); res(); return; }
          t += dt; d += speed * dt; stepT += dt;
          while (seg < pts.length) {
            const a = pts[seg - 1], b = pts[seg], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
            if (d <= L) { const k = d / L; hero.set(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k); hero.face(b[0] - a[0], b[1] - a[1]); break; }
            d -= L; seg++;
          }
          if (seg >= pts.length) { const e = pts[pts.length - 1]; hero.set(e[0], e[1]); off(); res(); return; }
          hero.frame = Math.floor(t * 10) % 8; hero.draw();
          if (stepT > 0.4) { stepT = 0; G.audio.sfx(stepN++ % 2 ? 'sfx_step2' : 'sfx_step1', 0.35); }
        });
        offs.push(off);
      });
      if (!V || g !== G.gen) return;
      hero.frame = 8; hero.dir = 'SE'; hero.draw();
      G.hud.skip(null); walking = null; G.busy = Math.max(0, G.busy - 1);
    }
    G.st.place = p.id; if (!G.st.visited.includes(p.id)) G.st.visited.push(p.id);
    G.save.write();
    await G.wait(0.25);
    if (g !== G.gen) return;
    if (p.scene && G.D.scenes[p.scene]) { G.$('#fade').classList.add('on'); await G.wait(0.45); G.scene.enter(p.scene); }
    else notReady(p);
  };

  // 시장부터는 다음 프로토타입: 안내 카드
  function notReady(p) {
    const ov = G.$('#overlay'); const m = G.el('div', 'modal', ov); const sh = G.el('div', 'sheet placeholder', m);
    G.busy++;
    G.el('div', '', sh, G.icon('place_' + p.id, 'big'));
    G.el('h3', '', sh, p.name);
    G.el('p', '', sh, p.name + ' 장면은 다음 프로토타입에서 이어져요.');
    const row = G.el('div', 'btn-row', sh);
    G.btn('pill gold', G.icon('icon_map') + ' 지도로', row, () => { m.remove(); G.busy = Math.max(0, G.busy - 1); G.audio.voice('S92_btn_map'); });
    G.audio.voice(p.voice.replace('.mp3', ''));
  }

  // ---- 인트로: 광장 쪽 빛 속에서 루미가 날아옴 ----
  Mp.lumiArrive = async () => {
    const from = G.D.places.nodes.PLAZA;
    Mp.lumiFree = true; lumi.style.display = '';
    lumiPos.x = from[0]; lumiPos.y = from[1] - 180; placeLumi();
    G.audio.sfx('sfx_sparkle', 0.7);
    const tx = hero.x + 60, ty = hero.y - 150, sx = lumiPos.x, sy = lumiPos.y;
    await G.tween(0, 1, G.reduced() ? 0.3 : 2.2, k => {
      lumiPos.x = sx + (tx - sx) * k; lumiPos.y = sy + (ty - sy) * k - Math.sin(k * Math.PI) * 160; placeLumi();
    }, 'io');
    Mp.lumiFree = false;
  };

  // ---- 배경 주민 (GDD 8장): 단계마다 걷는 속도·멈춤·한숨 구름 ----
  function makeVillager(d, stage) {
    const w = V.walker(d.sheet, 'villager');
    const pts = d.path; w.set(pts[0][0], pts[0][1]);
    const sigh = G.el('div', 'sigh', w.el, '<svg viewBox="0 0 40 26"><path d="M8 20a7 7 0 0 1 2-13 9 9 0 0 1 17-1 7 7 0 0 1 5 14z" fill="#d9dcea" stroke="#6b7090" stroke-width="2"/></svg>');
    const hit = G.el('button', 'whit', w.el); hit.type = 'button'; hit.setAttribute('aria-label', G.D.dialogues[d.line]?.name || '마을 사람');
    let bub = null;
    G.onTap(hit, async () => {
      if (bub || G.busy > 0) return;
      const id = stage >= 5 ? d.line.replace(/_a$/, '_b') : d.line; const L = G.D.dialogues[id]; if (!L) return;
      v.pause = Math.max(v.pause, 5); w.frame = 8; w.face(hero.x - w.x, hero.y - w.y); w.draw();
      bub = G.el('div', 'wbubble', w.el, L.text);
      await G.audio.voice(id); await G.wait(0.8); if (bub) bub.remove(); bub = null;
    });
    const speed = G.D.mood.speed[stage];
    const v = { w, i: 1, step: 1, pause: Math.random() * 2, look: 0, sighT: Math.random() * 4 };
    v.update = (dt) => {
      if (stage === 0) { v.sighT += dt; sigh.classList.toggle('on', (v.sighT % 7) < 2.4); }
      if (v.pause > 0) {
        v.pause -= dt; w.frame = 8;
        if (stage === 0 && !bub) { v.look += dt; if (v.look > 0.9) { v.look = 0; const ds = ['SE', 'SW', 'NE', 'NW']; w.dir = ds[(ds.indexOf(w.dir) + 1) % 4]; } }
        w.draw(); return;
      }
      const tgt = pts[v.i], dx = tgt[0] - w.x, dy = tgt[1] - w.y, dist = Math.hypot(dx, dy), mv = speed * dt;
      if (dist <= mv) {
        w.set(tgt[0], tgt[1]);
        if (d.pingpong) { if (v.i + v.step < 0 || v.i + v.step >= pts.length) v.step *= -1; v.i += v.step; }
        else v.i = (v.i + 1) % pts.length;
        v.pause = stage === 0 ? (Math.random() < 0.7 ? 1.5 + Math.random() * 2.5 : 0) : (Math.random() < 0.3 ? 0.8 + Math.random() : 0);
        return;
      }
      w.set(w.x + dx / dist * mv, w.y + dy / dist * mv); w.face(dx, dy);
      w.walkT = (w.walkT || 0) + dt; w.frame = Math.floor(w.walkT * (4 + speed * 0.03)) % 8; w.draw();
    };
    return v;
  }

  // ---- 도움 ----
  function target() { return G.hud.nextPlace(); }
  function clearHint() { if (trailEl) trailEl.remove(); trailEl = null; if (arrowEl) arrowEl.remove(); arrowEl = null; }
  function showArrow(p) {
    if (arrowEl || !V) return;
    arrowEl = G.el('div', 'arrow', V.fx, '<svg viewBox="0 0 90 110"><path d="M45 104 L8 58 H30 V6 H60 V58 H82 Z" fill="#FFD66B" stroke="#8a5a0a" stroke-width="5" stroke-linejoin="round"/></svg>');
    arrowEl.style.left = p.marker[0] + 'px'; arrowEl.style.top = (p.marker[1] - 60) + 'px'; arrowEl.style.zIndex = 3002;
  }
  function showTrail(p) {
    if (trailEl || !V || !hero) return;
    const names = G.mapPath(Mp.node(G.st.place), p.node); const pts = names.map(n => G.D.places.nodes[n]);
    pts[0] = [hero.x, hero.y]; pts.push([p.marker[0], p.marker[1] + 70]);
    const ns = 'http://www.w3.org/2000/svg';
    trailEl = document.createElementNS(ns, 'svg'); trailEl.setAttribute('class', 'trail'); trailEl.setAttribute('width', V.W); trailEl.setAttribute('height', V.H); trailEl.style.zIndex = 2998;
    const path = document.createElementNS(ns, 'path'); path.setAttribute('d', 'M' + pts.map(q => q[0] + ' ' + q[1]).join(' L')); trailEl.appendChild(path);
    V.fx.appendChild(trailEl);
    if (V.markers[p.id]) V.markers[p.id].m.style.transform = 'scale(1.25)';
  }
  function setHelp() {
    if (!G.st.done.includes('meet_lumi')) { G.help.off(); return; }
    const practice = !G.st.visited.includes('plaza');   // 첫 지도 연습: 30초에 말과 길을 함께 (여기만 바로 알려 줌)
    G.help.set({
      l1: () => { const p = target(); if (!p) return; if (practice) { G.hud.say(G.D.story.practice_hint); showTrail(p); } else G.hud.say(G.D.story.map_hint); },
      l2: () => { const p = target(); if (p) showArrow(p); },
      l3: () => { const p = target(); if (p) { showArrow(p); showTrail(p); } },
      clear: () => { clearHint(); const p = target(); if (p && V && V.markers[p.id]) V.markers[p.id].m.style.transform = ''; },
    });
  }
  Mp.setHelp = setHelp;
  Mp.hero = () => hero;
  return Mp;
})();

/* ---- scene.js ---- */
// scene.js — 장소 장면 (U4): 장소 그림 한 장에서 사람·물건 누르기. 할 일(☆)을 모두 하면 장소 클리어 (C7)
// 장면 그림은 2400x1080: 가운데 1920 = 16:9, 가운데 1440 = 4:3 핵심 영역 (누를 곳은 모두 여기)
'use strict';
// ---- 장면 그림 한 벌 (연출 C2·C7도 같이 씀) ----
G.sceneView = (parent, id, o = {}) => {
  const S = G.D.scenes[id], [W, H] = S.size;
  const V = { W, H, S, cam: { x: W / 2, y: H / 2, z: 1 }, spr: {} };
  const el = V.el = G.el('div', 'world', parent); el.style.width = W + 'px'; el.style.height = H + 'px';
  const mono = G.el('img', 'bg', el); mono.src = G.asset(S.image.mono); mono.width = W; mono.height = H; mono.alt = '';
  const col = V.colorImg = G.el('img', 'bg', el); col.src = G.asset(S.image.color); col.width = W; col.height = H; col.alt = ''; col.style.transition = 'opacity .8s';
  V.ready = Promise.all([mono, col].map(i => i.decode ? i.decode().catch(() => { }) : Promise.resolve()));
  V.lamps = (S.lamps || []).map((p, i) => { const g = G.el('div', 'lamp-glow', el); g.style.left = p[0] + 'px'; g.style.top = p[1] + 'px'; g.style.transform = 'scale(1.5)'; return { el: g, from: (S.lampFrom || [])[i] ?? 5 }; });
  V.fx = G.el('div', 'layer', el);
  const addImg = (src, r) => { const i = G.el('img', 'scene-sprite idle', V.fx); i.src = G.asset(src); i.alt = ''; Object.assign(i.style, { left: r[0] + 'px', top: r[1] + 'px', width: r[2] + 'px', height: r[3] + 'px', animationDelay: (-Math.random() * 3).toFixed(2) + 's' }); return i; };
  for (const sp of S.sprites) {
    const v = V.spr[sp.id] = { img: addImg(sp.img, sp.rect), def: sp };
    if (sp.back) { v.back = addImg(sp.back.img, sp.back.rect); v.back.style.transition = v.img.style.transition = 'opacity .5s'; }
    if (sp.lumi) {
      const l = V.lumi = G.el('div', 'scene-sprite', V.fx); const li = G.el('img', '', l); li.src = G.asset('assets/chars/lumi.png'); li.alt = '';
      Object.assign(l.style, { left: (sp.lumi[0] - 55) + 'px', top: (sp.lumi[1] - 55) + 'px', width: '110px', height: '110px' });
      li.style.cssText = 'width:100%;height:100%;animation:bob 2.4s ease-in-out infinite';
    }
  }
  V.showBack = (on) => { const c = V.spr.chief; if (c && c.back) { c.back.style.opacity = on ? 1 : 0; c.img.style.opacity = on ? 0 : 1; } };
  V.showBack(!!o.chiefBack);
  V.setMood = (stage) => {
    const z = G.D.mood.zones.find(q => q.id === id); const a = z ? z.alpha[Math.max(0, Math.min(5, stage))] : 0;
    col.style.opacity = a; col.style.visibility = a > 0.003 ? '' : 'hidden';
    for (const l of V.lamps) l.el.classList.toggle('on', l.from <= stage);
  };
  V.setCam = (x, y, z = V.cam.z) => {
    const { W: sw, H: sh, ws } = G.stage, s = ws * z;
    const vw = sw / s, vh = sh / s;
    x = vw >= W ? W / 2 : Math.max(vw / 2, Math.min(W - vw / 2, x));
    y = vh >= H ? H / 2 : Math.max(vh / 2, Math.min(H - vh / 2, y));
    V.cam = { x, y, z };
    el.style.transform = `translate(${(sw / 2 - x * s).toFixed(1)}px,${(sh / 2 - y * s).toFixed(1)}px) scale(${s.toFixed(4)})`;
  };
  V.toScreen = (x, y) => { const s = G.stage.ws * V.cam.z; return [G.stage.W / 2 + (x - V.cam.x) * s, G.stage.H / 2 + (y - V.cam.y) * s]; };
  V.setCam(W / 2, H / 2, 1);
  return V;
};

G.scene = (() => {
  const Sc = {};
  let V = null, S = null, hots = [], arrowEl = null, trailEl = null, busy = false, closeup = null;
  Sc.hide = () => {
    if (!V) return;
    G.resizers.delete(onResize); G.dialog.onSpeaker = null;
    V.el.remove(); V = null; S = null; hots = []; arrowEl = trailEl = null;
    const cu = G.$('#closeup'); if (cu) cu.innerHTML = '';
    G.help.off(); G.audio.ambientBoost('amb_fountain', false);
  };
  function onResize() { if (!V) return; V.setCam(V.cam.x, V.cam.y); sizeHots(); }
  // 휴대폰에서도 누를 곳이 손가락 크기(약 11mm ≈ 72px) 이상이 되게 넓힘
  function sizeHots() {
    const min = 72 / G.stage.ws;
    for (const h of hots) {
      const [x, y, w, hh] = h.def.rect, W = Math.max(w, min), HH = Math.max(hh, min);
      Object.assign(h.btn.style, { left: (x - (W - w) / 2) + 'px', top: (y - (HH - hh) / 2) + 'px', width: W + 'px', height: HH + 'px' });
    }
  }

  Sc.enter = async (id) => {
    G.map.hide(); Sc.hide();
    const def = G.D.scenes[id]; S = def; const g = G.gen;
    G.screen = 'scene';
    const first = !G.st.seenCutscenes.includes(def.arrive);
    const world = G.$('#world'); world.innerHTML = '';
    V = G.sceneView(world, id, { chiefBack: false });   // 돌아보는 모습은 연출 C2가 따로 그림
    V.setMood(G.st.mood);
    // 누를 곳: 별빛 테두리 + 할 일에는 ☆
    for (const h of def.hotspots) {
      const glow = G.el('img', 'hot-glow', V.fx); glow.src = G.asset(h.img); glow.alt = '';
      Object.assign(glow.style, { left: h.glow[0] + 'px', top: h.glow[1] + 'px', width: h.glow[2] + 'px', height: h.glow[3] + 'px' });
      if (G.st.seen.includes(id + ':' + h.id)) glow.classList.add('seen');
      let star = null;
      if (h.mission) {
        star = G.el('div', 'mstar', V.fx); star.style.left = (h.rect[0] + h.rect[2] / 2) + 'px'; star.style.top = (h.rect[1] - 6) + 'px';
        setStar(star, G.st.done.includes(h.mission));
      }
      const btn = G.el('button', 'hot', V.fx); btn.type = 'button'; btn.setAttribute('aria-label', h.label);
      btn.style.zIndex = h.mission ? 20 : 10;
      const H = { def: h, glow, star, btn };
      G.onTap(btn, () => tapHot(H));
      hots.push(H);
    }
    sizeHots();
    G.resizers.add(onResize);
    G.dialog.onSpeaker = (sp) => { for (const k in V?.spr || {}) { const s = V.spr[k]; s.img.classList.toggle('talking', k === sp); } };
    G.hud.scene(def, () => Sc.leave());
    G.audio.music(def.music); G.audio.ambient(def.ambient);
    G.st.place = id; if (!G.st.visited.includes(id)) G.st.visited.push(id);
    G.save.write();
    await V.ready;
    if (g !== G.gen) return;
    G.$('#fade').classList.remove('on');
    if (first) {
      G.hud.hide(true);
      await G.cut.play(def.arrive);
      if (g !== G.gen) return;
      G.hud.hide(false);
    }
    if (!V) return;
    if (!G.st.done.includes(id + '_intro')) {
      await playIntro(def);
      if (g !== G.gen) return;
      G.st.done.push(id + '_intro'); G.save.write();
    }
    setHelp();
  };
  function setStar(el, done) { el.innerHTML = done ? G.svgStar('#FFD66B', '#C98F14', 7) : G.svgStar('rgba(255,248,236,.9)', '#C98F14', 7); }

  // 처음 방문: "여기가 광장이야" → "위를 봐, 할 일이 세 개" (☆☆☆ 반짝) → "반짝이는 곳을 눌러 봐" (테두리 한 번 밝아짐)
  async function playIntro(def) {
    const ids = def.intro;
    G.dialog.onLine = (lid) => {
      if (lid === ids[1]) { G.hud.keepTasks(true); G.hud.tasks(def, true); }
      if (lid === ids[2]) { G.hud.keepTasks(false); hots.forEach(h => { h.glow.classList.add('strong'); }); }
    };
    await G.dialog.play(ids);
    G.dialog.onLine = null; G.hud.keepTasks(false);
    hots.forEach(h => h.glow.classList.remove('strong'));
  }

  async function tapHot(H) {
    if (busy || G.busy > 0 || !V) return;
    busy = true; clearHint();
    const h = H.def, id = S.id, g = G.gen;
    G.audio.sfx(h.sfx || 'sfx_tap', h.sfx ? 0.9 : 0.5);
    if (!G.st.seen.includes(id + ':' + h.id)) G.st.seen.push(id + ':' + h.id);
    H.glow.classList.add('seen');
    if (h.louder) G.audio.ambientBoost(h.louder, true);
    if (h.closeup) showCloseup(h.closeup);
    await G.dialog.play(h.lines, { partner: h.partner });
    if (g !== G.gen) { busy = false; return; }
    hideCloseup();
    if (h.louder) G.audio.ambientBoost(h.louder, false);
    if (!V) { busy = false; return; }
    if (h.mission && !G.st.done.includes(h.mission)) {
      G.st.done.push(h.mission);
      G.audio.sfx('sfx_star', 0.9);
      setStar(H.star, true); popStar(H.star);
      G.hud.tasks(S, true);
      G.save.write();
      if (S.missions.every(m => G.st.done.includes(m)) && !G.st.cleared.includes(id)) { await G.wait(0.9); busy = false; if (g !== G.gen) return; return clear(); }
    }
    busy = false;
  }
  function popStar(el) { el.animate && el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 700, easing: 'ease-out' }); }

  function showCloseup(kind) {
    const cu = G.$('#closeup'); cu.innerHTML = '';
    closeup = G.el('div', 'closeup', cu);
    const b = G.el('div', 'board-big', closeup);
    for (let i = 0; i < 4; i++) { const n = G.el('div', 'note', b); for (let j = 0; j < 4; j++) { const l = G.el('i', '', n); l.style.width = (55 + Math.random() * 40) + '%'; } }
    closeup.animate && closeup.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
  }
  function hideCloseup() { const cu = G.$('#closeup'); if (cu) cu.innerHTML = ''; closeup = null; }

  // ---- 장소 클리어 → C7 → 지도 ----
  async function clear() {
    const id = S.id, on = S.onClear, from = G.st.mood, g = G.gen;
    G.help.off();
    G.st.cleared.push(id); G.st.mood = Math.max(G.st.mood, on.mood); G.st.quest = Math.max(G.st.quest, on.quest);
    G.save.write();
    await G.cut.play(on.cutscene, { live: { place: id, from, to: G.st.mood, unlock: on.unlock } });
    if (g !== G.gen) return;
    G.map.refresh();
    await G.dialog.play(on.after);
    if (g !== G.gen) return;
    G.hud.refreshQuest();
    const q = G.hud.questEl; if (q) { q.classList.remove('flash'); void q.offsetWidth; q.classList.add('flash'); }
    await G.audio.voice(on.now);
    G.map.setHelp();
  }
  Sc.leave = async () => {
    if (!V || busy) return;
    const id = S.id;
    G.save.write();
    G.$('#fade').classList.add('on'); await G.wait(0.45);
    await G.map.show();
    G.$('#fade').classList.remove('on');
  };

  // ---- 도움: 첫 번째로 안 한 할 일 ----
  function target() { return hots.find(h => h.def.mission && !G.st.done.includes(h.def.mission)); }
  function clearHint() {
    if (arrowEl) arrowEl.remove(); if (trailEl) trailEl.remove(); arrowEl = trailEl = null;
    hots.forEach(h => h.glow.classList.remove('strong'));
  }
  function setHelp() {
    if (S && S.missions.every(m => G.st.done.includes(m))) { G.help.off(); return; }
    G.help.set({
      l1: () => { const t = target(); if (t && t.def.hint) G.hud.say(t.def.hint); },
      l2: () => {
        const t = target(); if (!t || arrowEl || !V) return; const r = t.def.rect;
        arrowEl = G.el('div', 'arrow', V.fx, '<svg viewBox="0 0 90 110"><path d="M45 104 L8 58 H30 V6 H60 V58 H82 Z" fill="#FFD66B" stroke="#8a5a0a" stroke-width="5" stroke-linejoin="round"/></svg>');
        Object.assign(arrowEl.style, { left: (r[0] + r[2] / 2) + 'px', top: (r[1] - 40) + 'px', zIndex: 30 });
      },
      l3: () => {
        const t = target(); if (!t || !V) return;
        t.glow.classList.remove('seen'); t.glow.classList.add('strong');
        if (trailEl) return;
        const hs = S.sprites.find(s => s.lumi), a = hs ? hs.lumi : [1200, 800], r = t.def.rect, b = [r[0] + r[2] / 2, r[1] + r[3] * 0.75];
        const ns = 'http://www.w3.org/2000/svg';
        trailEl = document.createElementNS(ns, 'svg'); trailEl.setAttribute('class', 'trail'); trailEl.setAttribute('width', S.size[0]); trailEl.setAttribute('height', S.size[1]); trailEl.style.zIndex = 5;
        const p = document.createElementNS(ns, 'path'); const mx = (a[0] + b[0]) / 2, my = Math.max(a[1], b[1]) + 60;
        p.setAttribute('d', `M${a[0]} ${a[1] + 40} Q${mx} ${my} ${b[0]} ${b[1]}`); trailEl.appendChild(p); V.fx.appendChild(trailEl);
      },
      clear: clearHint,
    });
  }
  Sc.view = () => V;
  return Sc;
})();

/* ---- teacher.js ---- */
// teacher.js — 교사용 설정 (U10, 기획안 7-10). ESC 또는 왼쪽 위 3초. 열려 있는 동안 게임은 멈춤
// 순서: 음성·음량 → 글자 크기 → 도움 시간 → 선택지 누르기 → 챕터 바로 가기 → 연출 → 저장 칸 → 가벼운 모드 → 전체 화면
'use strict';
G.teacher = (() => {
  const T = { open: false };
  let layer = null, lastFsExit = 0, wantFs = false;
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) lastFsExit = performance.now(); });
  document.addEventListener('webkitfullscreenchange', () => { if (!document.webkitFullscreenElement) lastFsExit = performance.now(); });
  T.toggle = () => (T.open ? T.close() : T.show());
  T.show = () => {
    if (T.open) return;
    T.open = true; G.paused = true; G.audio.pause();
    wantFs = performance.now() - lastFsExit < 4000;   // 전체 화면에서 ESC로 빠져나왔으면 닫을 때 되돌림
    layer = G.$('#teacher'); layer.innerHTML = '';
    render();
  };
  T.close = (after) => {
    if (!T.open) return;
    T.open = false; layer.innerHTML = '';
    if (wantFs) fullscreen(true);
    G.paused = false; G.audio.resume(); G.help.poke();
    if (after) setTimeout(after, 30);
  };
  // 누르기: 게임이 멈춰 있어도 동작해야 하므로 G.onTap을 쓰지 않음
  const tb = (label, parent, fn, cls = '') => { const b = G.el('button', 't-btn ' + cls, parent, label); b.type = 'button'; b.addEventListener('click', (e) => { e.stopPropagation(); fn(b); }); return b; };
  const sec = (panel, title) => { const s = G.el('div', 't-sec', panel); G.el('h4', '', s, title); return s; };
  const row = (s) => G.el('div', 't-row', s);
  const set = (k, v) => { G.settings[k] = v; G.applySettings(); render(); };
  function choice(s, key, opts) { const r = row(s); for (const [v, label] of opts) tb(label, r, () => set(key, v), G.settings[key] === v ? 'on' : ''); return r; }

  function render() {
    const scroll = layer.querySelector('.t-panel')?.scrollTop || 0;
    layer.innerHTML = '';
    const bg = G.el('div', 'teacher', layer);
    bg.addEventListener('click', (e) => { if (e.target === bg) T.close(); });
    const p = G.el('div', 't-panel', bg);
    const h = G.el('h2', '', p, '<span>교사용 설정</span>');
    tb('닫기 (ESC)', h, () => T.close(), 'on t-close');
    G.el('div', 't-help', p, '게임은 잠시 멈춰 있어요. ' + (G.st ? `지금 칸: ${G.st.slot}번${G.st.name ? ' (' + G.save.esc(G.st.name) + ')' : ''}` : '아직 칸을 고르지 않았어요.') + ' (프로토타입 1)');

    let s = sec(p, '1. 음성과 음량');
    let r = row(s);
    tb(G.settings.voiceOn ? '음성 켜짐' : '음성 꺼짐', r, () => set('voiceOn', !G.settings.voiceOn), G.settings.voiceOn ? 'on' : '');
    const lab = G.el('label', '', r, '음량 '); const rg = G.el('input', '', lab); rg.type = 'range'; rg.min = 0; rg.max = 100; rg.value = Math.round(G.settings.volume * 100);
    const vv = G.el('span', '', lab, rg.value + '%');
    rg.addEventListener('input', () => { G.settings.volume = rg.value / 100; vv.textContent = rg.value + '%'; G.applySettings(); });

    s = sec(p, '2. 글자 크기');
    choice(s, 'textBig', [[false, '보통'], [true, '크게']]);

    s = sec(p, '3. 도움 시간 (루미가 알려 주기까지)');
    choice(s, 'help', [['short', '짧게 20, 40, 60초'], ['normal', '보통 30, 60, 90초'], ['long', '길게 45, 90, 135초'], ['off', '끄기']]);
    G.el('div', 't-note', s, '1단계 질문, 2단계 화살표, 3단계 반짝이는 길. [루미] 버튼을 누르면 바로 3단계.');

    s = sec(p, '4. 선택지 누르기');
    choice(s, 'choiceOne', [[false, '두 번 누르면 선택 (읽어 주고 확인)'], [true, '한 번 누르면 선택']]);

    s = sec(p, '5. 챕터 바로 가기');
    r = row(s);
    for (const ch of G.D.story.chapters) {
      const b = tb(ch.label, r, () => { T.close(() => G.flow.chapter(ch.id)); });
      if (!ch.ready || !G.st) b.disabled = true;
    }
    G.el('div', 't-note', s, G.st ? '고른 곳 앞까지의 할 일, 아이템, 마을 단계가 채워진 채로 시작해요. 4~7은 다음 프로토타입에서 열려요.' : '먼저 저장 칸 번호를 고른 뒤에 쓸 수 있어요.');

    s = sec(p, '6. 연출');
    r = row(s); G.el('span', '', r, '다시 보기:');
    for (const [id, label] of [['C1', 'C1 인트로'], ['C2', 'C2 광장 도착'], ['C7', 'C7 장소 완료']]) tb(label, r, () => T.close(() => { if (!G.cut.active) G.cut.play(id, { replay: true }); }));
    r = row(s); G.el('span', '', r, '움직임 줄이기:');
    const rmv = G.settings.reduceMotion ? 'on' : (G.settings.reduceAuto ? 'auto' : 'off');
    for (const [v, label] of [['auto', '기기 설정 따르기'], ['on', '켜기'], ['off', '끄기']]) tb(label, r, () => { G.settings.reduceMotion = v === 'on'; G.settings.reduceAuto = v === 'auto'; G.applySettings(); render(); }, rmv === v ? 'on' : '');
    r = row(s);
    tb(G.settings.hideSkip ? '건너뛰기 버튼 숨김' : '건너뛰기 버튼 보임', r, () => set('hideSkip', !G.settings.hideSkip), G.settings.hideSkip ? 'on' : '');

    s = sec(p, '7. 저장 칸');
    G.el('div', 't-note', s, `지금 ${G.save.count()}칸. 저장은 이 기기, 이 브라우저에만 돼요. 학교 PC가 초기화되면 5. 챕터 바로 가기로 이어 하세요.`);
    r = row(s);
    tb('칸 4개 늘리기', r, () => set('slotCount', Math.min(24, G.save.count() + 4))).disabled = G.save.count() >= 24;
    tb('늘린 칸 줄이기', r, () => set('slotCount', Math.max(12, G.save.count() - 4))).disabled = G.save.count() <= 12;
    r = row(s); G.el('span', '', r, '지우기:');
    let any = false;
    for (let i = 1; i <= G.save.count(); i++) {
      const d = G.save.load(i); if (!d) continue; any = true;
      const b = tb(`${i}번${d.name ? ' ' + G.save.esc(d.name) : ''}`, r, () => confirmDel(s, i));
      if (G.st && G.st.slot === i) { b.disabled = true; b.title = '지금 쓰는 칸'; }
    }
    if (!any) G.el('span', 't-note', r, '지울 칸이 없어요.');
    else if (G.st) G.el('div', 't-note', s, '지금 쓰는 칸은 지울 수 없어요.');

    s = sec(p, '8. 가벼운 모드');
    choice(s, 'light', [[false, '끄기'], [true, '켜기 (느린 태블릿용: 빛과 반짝이 효과 줄임)']]);

    s = sec(p, '9. 화면');
    r = row(s);
    const fsOn = !!(document.fullscreenElement || document.webkitFullscreenElement);
    tb(fsOn ? '전체 화면 끄기' : '전체 화면', r, () => { wantFs = false; fullscreen(!fsOn).then(render); });
    G.el('div', 't-note', s, '전체 화면에서는 ESC를 한 번 더 눌러야 이 설정이 열려요 (브라우저 규칙). 아이폰은 “홈 화면에 추가”로 쓰면 전체 화면이 돼요.');
    const pn = layer.querySelector('.t-panel'); if (pn) pn.scrollTop = scroll;
  }
  function confirmDel(s, i) {
    const box = G.el('div', 't-row', s);
    box.style.cssText = 'background:#fde9e2;border-radius:14px;padding:8px 12px';
    G.el('span', '', box, `${i}번 칸을 정말 지울까요? 되돌릴 수 없어요.`);
    tb('지우기', box, () => { G.save.del(i); render(); }, 'warn');
    tb('그만두기', box, () => box.remove());
    box.scrollIntoView && box.scrollIntoView({ block: 'nearest' });
  }
  function fullscreen(on) {
    const d = document, el = d.documentElement;
    try {
      if (on) return Promise.resolve((el.requestFullscreen || el.webkitRequestFullscreen || (() => { })).call(el)).catch(() => { });
      return Promise.resolve((d.exitFullscreen || d.webkitExitFullscreen || (() => { })).call(d)).catch(() => { });
    } catch (e) { return Promise.resolve(); }
  }
  return T;
})();

/* ---- main.js ---- */
// main.js — 시작과 흐름: 타이틀(U1) → 저장 칸 번호 고르기(U2) → 이름 → 인트로 C1 → 루미 만남 → 마을 지도
'use strict';
G.VERSION = '프로토타입 1 (2026-09-29 고침)';
G.defaults = { volume: 0.9, voiceOn: true, textBig: false, help: 'normal', choiceOne: false, reduceMotion: false, reduceAuto: true, hideSkip: false, slotCount: 12, light: false };
G.applySettings = () => {
  const s = G.settings;
  document.documentElement.style.setProperty('--ts', s.textBig ? 1.2 : 1);
  G.$('#game').classList.toggle('reduce', !!G.reduced());
  G.$('#game').classList.toggle('light', !!s.light);
  G.store.set('settings', s);
  G.audio.setVolume();
};

G.flow = (() => {
  const F = {};
  // 다른 흐름으로 건너갈 때 (챕터 바로 가기) 지금 진행 중인 대화·연출·이동을 모두 멈춤
  F.reset = () => {
    G.gen = (G.gen || 0) + 1;
    G.dialog.close(); if (G.cut.active) G.cut.active.skip();
    G.$('#overlay').innerHTML = ''; G.$('#closeup').innerHTML = ''; G.$('#dialog').innerHTML = '';
    G.map.hide(); G.scene.hide(); G.$('#world').innerHTML = '';
    G.hud.clear(); G.hud.hide(false); G.help.off(); G.audio.stopVoice();
    G.busy = 0; G.map.camFree = false; G.map.lumiFree = false;
    G.$('#fade').classList.remove('on');
  };

  // ---- U1 타이틀 ----
  F.title = () => {
    F.reset(); G.screen = 'title'; G.st = null;
    const ov = G.$('#overlay');
    const t = G.el('div', 'title-screen', ov); t.style.backgroundImage = `url("${G.asset('assets/ui/title_bg.jpg')}")`;
    const m = G.el('div', 't-main', t);
    G.el('h1', '', m, '별이 사라진 마을'); G.el('div', 't-sub', m, '길의 별');
    const lu = G.el('img', 't-lumi', t); lu.src = G.asset('assets/chars/lumi_big.png'); lu.alt = '';
    const b = G.btn('pill gold t-start', G.icon('icon_star') + ' 시작하기', t, () => F.start(), '시작하기');
    if (G.isTouch) G.el('div', 't-note', t, '소리가 안 들리면 옆의 무음 스위치를 확인해 주세요.');
    G.el('div', 't-ver', t, G.VERSION + '<br>선생님 설정: ESC 또는 왼쪽 위 3초 누르기');
    setTimeout(() => { try { b.focus({ preventScroll: true }); } catch (e) { } }, 100);
  };

  // 시작하기 = 소리 켜기 (브라우저 규칙상 첫 누르기에서만 소리를 켤 수 있음)
  F.start = async () => {
    G.audio.unlock(); G.audio.sfx('sfx_tap', 0.6); G.audio.music('music_title');
    const g = G.gen;
    await G.audio.voice('S92_btn_start');
    if (g !== G.gen) return;
    const pick = await G.save.screen();
    if (g !== G.gen) return;
    G.onResize = null;
    let st = pick.data;
    if (!st) {
      const name = await G.save.askName();
      if (g !== G.gen) return;
      st = G.save.fresh(pick.slot); st.name = name;
    }
    G.st = st; G.save.write();
    G.$('#overlay').innerHTML = '';
    if (!st.done.includes('meet_lumi')) F.intro();
    else F.resume();
  };
  // 쓰던 칸: 마지막으로 간 곳의 마을 지도
  F.resume = async () => {
    G.$('#fade').classList.add('on'); await G.wait(0.3);
    await G.map.show();
    G.$('#fade').classList.remove('on');
  };

  // ---- 새 칸: C1 → 집 앞 지도에서 루미 만남 → [좋아!] → 광장이 반짝 ----
  F.intro = async () => {
    const g = G.gen, S = G.D.story;
    G.audio.music('music_night'); G.audio.ambient([]);
    await G.cut.play('C1');
    if (g !== G.gen) return;
    G.st.place = 'home';
    await G.map.show({ noLumi: true });
    if (g !== G.gen) return;
    G.busy++;
    await G.wait(0.4);
    await G.map.lumiArrive();
    if (g !== G.gen) return;
    await G.dialog.play(S.meet_lumi, { keep: true });
    if (g !== G.gen) return;
    const L = G.D.dialogues[S.accept.button];
    await G.dialog.choose([{ label: L.text, icon: 'icon_good', voice: S.accept.button }], true);
    if (g !== G.gen) return;
    G.dialog.onLine = (id) => {
      if (id === S.after_accept[S.after_accept.length - 1] && !G.st.done.includes('meet_lumi')) {
        G.st.done.push('meet_lumi'); G.st.started = true; G.map.refresh(); G.audio.sfx('sfx_sparkle', 0.6);
      }
    };
    await G.dialog.play(S.after_accept);
    G.dialog.onLine = null;
    if (g !== G.gen) return;
    if (!G.st.done.includes('meet_lumi')) G.st.done.push('meet_lumi');
    G.st.started = true; G.save.write();
    G.busy = Math.max(0, G.busy - 1);
    G.hud.map(); G.map.setHelp();
  };

  // ---- 챕터 바로 가기 (교사용): 그 앞까지 모두 채운 상태로 ----
  F.chapter = async (id) => {
    if (!G.st) return;
    const keep = { slot: G.st.slot, name: G.st.name };
    F.reset();
    const st = G.st = Object.assign(G.save.fresh(keep.slot), { name: keep.name });
    G.audio.music('music_night');
    if (id === 'start') { G.save.write(); return F.intro(); }
    st.done.push('meet_lumi'); st.started = true; st.seenCutscenes.push('C1');
    if (id === 'plaza') { st.place = 'plaza'; G.save.write(); G.$('#fade').classList.add('on'); await G.wait(0.3); return G.scene.enter('plaza'); }
    if (id === 'market') {
      st.done.push('plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post'); st.cleared.push('plaza');
      st.seenCutscenes.push('C2', 'C7'); st.visited.push('plaza'); st.mood = 1; st.quest = 1; st.place = 'plaza';
      st.seen.push('plaza:chief', 'plaza:board', 'plaza:post');
      G.save.write(); return F.resume();
    }
  };
  return F;
})();

// ---- 처음 켜기 ----
(function boot() {
  G.settings = Object.assign({}, G.defaults, G.store.get('settings', {}));
  G.hud.init();
  G.applySettings();
  G.layout();
  window.addEventListener('resize', G.layout);
  if (window.visualViewport) visualViewport.addEventListener('resize', G.layout);
  window.addEventListener('orientationchange', () => setTimeout(G.layout, 300));
  // 다른 탭으로 가면 소리를 멈춤
  document.addEventListener('visibilitychange', () => { if (document.hidden) G.audio.pause(); else if (!G.paused) G.audio.resume(); });
  const ld = G.$('#loading'); if (ld) ld.remove();
  G.flow.title();
})();
