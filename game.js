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
// 9/30 새 세계관: 별 모양은 진짜 별(8개 + 마지막 별)에만 씀. 할 일 표시는 동그라미, 장소 표시는 동그란 핀, 반짝이는 4갈래 빛
// 9/30 선생님: 코드로 그린 그림은 최소화 → 그림 파일(assets/ui/art/<이름>)이 있으면 그 주소, 없으면 null (코드 그림을 씀)
G.art = (name) => { const p = ((G.D.story || {}).art || {})[name]; return p ? G.asset(p) : null; };
G.artImg = (name, cls = '') => { const u = G.art(name); return u ? `<img class="art ${cls}" src="${u}" alt="" draggable="false">` : null; };
G.svgDot = (done) => G.artImg(done ? 'mark_done' : 'mark_todo') || (done
  ? '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#FFD66B" stroke="#C98F14" stroke-width="9"/><path d="M31 51 L45 64 L70 37" fill="none" stroke="#FFF8EC" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  : '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="rgba(255,248,236,.9)" stroke="#C98F14" stroke-width="9"/></svg>');
G.sparkle = (fill = '#FFF1B8', stroke = '#FFD66B', sw = 4) => G.artImg('sparkle') || G.svgTwinkle(fill, stroke, sw);
G.arrowHtml = () => G.artImg('hint_arrow') || '<svg viewBox="0 0 90 110"><path d="M45 104 L8 58 H30 V6 H60 V58 H82 Z" fill="#FFD66B" stroke="#8a5a0a" stroke-width="5" stroke-linejoin="round"/></svg>';
G.svgPin = (fill, stroke, sw = 6) => `<svg viewBox="0 0 100 100"><path d="M50 96 C38 76 16 62 16 40 A34 34 0 1 1 84 40 C84 62 62 76 50 96 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/><circle cx="50" cy="40" r="13" fill="${stroke}" opacity=".55"/></svg>`;
G.svgTwinkle = (fill, stroke, sw = 4) => `<svg viewBox="0 0 100 100"><path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;
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
// 빠르게 모드 (교사용 설정, 9/30): 음성을 기다리지 않고 [다음]·[건너뛰기]가 바로 켜짐. 선생님이 시연하거나 확인할 때
// 9/30 난이도 (선생님 설정): easy 쉽게(9/29까지의 난이도) / normal 보통(기본) / hard 어렵게
G.level = () => (G.settings && G.settings.level) || 'normal';
G.lv = (min) => ({ easy: 0, normal: 1, hard: 2 })[G.level()] >= ({ easy: 0, normal: 1, hard: 2 })[min || 'easy'];
G.fast = () => !!(G.settings && G.settings.fast);
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
  let cur = null, vseq = 0;
  A.stopVoice = () => { vseq++; if (cur) { try { cur.stop(); } catch (e) { } cur = null; } try { speechSynthesis.cancel(); } catch (e) { } };
  // 9/30: 음성 파일을 불러오는 사이에 다음 음성이 시작되면, 늦게 도착한 앞 음성은 틀지 않음 (음성 두 개가 겹치던 문제)
  A.voice = (id, textFallback) => new Promise(async (done) => {
    A.stopVoice(); const my = vseq;
    const line = G.D.dialogues && G.D.dialogues[id];
    const text = textFallback || (line && line.text) || '';
    let finished = false; const fin = () => { if (finished) return; finished = true; A.speaking = Math.max(0, A.speaking - 1); if (!A.speaking) duck(false); done(); };
    A.speaking++; duck(true);
    if (!S().voiceOn) { await G.wait(Math.max(1.2, text.length * 0.09)); return fin(); }
    if (!A.ready) { await G.wait(1.5); return fin(); }
    try {
      const buf = await loadBuf(G.voiceUrl(id));
      if (my !== vseq) return fin();
      const src = A.ctx.createBufferSource(); src.buffer = buf; src.connect(gVoice); cur = src;
      src.onended = () => { if (cur === src) cur = null; fin(); };
      src.start();
      // 혹시 끝 알림이 안 오면 (탭 전환 등) 길이+1.5초 뒤 진행
      G.wait(buf.duration + 1.5).then(fin);
    } catch (e) {
      if (my !== vseq) return fin();
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
    gAmb.gain.cancelScheduledValues(t); gAmb.gain.setValueAtTime(gAmb.gain.value, t);
    gAmb.gain.linearRampToValueAtTime(on ? VOL.amb * 0.3 : VOL.amb, t + 0.3);
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
        g.gain.linearRampToValueAtTime(n === 'amb_crickets' ? 0.5 : n === 'amb_market' ? 0.6 : 1, A.ctx.currentTime + 1.2);
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

  // ---- U2 저장 칸 고르기 (9/30 선생님): [시작하기] → [새로 하기] / [이어 하기] → 번호 카드가 빙글 돌아가는 고르기 ----
  // 새로 하기: 빈 번호만, 이어 하기: 저장된 번호만. 가운데 카드를 누르거나 [이 번호로]를 누르면 고름. 양옆 화살표·밀기·방향키로 돌림
  // 고른 칸 번호를 돌려줌 { slot, data } (새로 하기는 data 없음)
  S.screen = () => new Promise(async (done) => {
    for (;;) {
      const mode = await chooseMode();
      const list = [];
      for (let i = 1; i <= S.count(); i++) { const d = S.load(i); if (mode === 'new' ? !d : !!d) list.push({ slot: i, data: d }); }
      const r = await revolver(mode, list);
      if (r) { done(r); return; }
    }
  });
  function screenBase(cls) {
    const ov = G.$('#overlay'); ov.innerHTML = ''; G.onResize = null;
    const scr = G.el('div', 'slots-screen ' + cls, ov);
    return scr;
  }
  function head(scr, text, voice) {
    const h = G.el('div', 's-head', scr);
    G.el('h2', '', h, text);
    const say = G.btn('pill round', G.icon('icon_sound'), h, () => G.audio.voice(voice, text), '다시 듣기');
    say.style.cssText = 'width:calc(var(--bu)*100);height:calc(var(--bu)*100);min-width:0;min-height:0';
    return h;
  }
  const say = (id, fb) => G.audio.voice(id, (G.D.dialogues[id] || {}).text || fb);
  // 새로 하기 / 이어 하기
  function chooseMode() {
    return new Promise((pick) => {
      const scr = screenBase('mode-screen');
      head(scr, '새로 할까요, 이어 할까요?', 'S92_mode');
      const row = G.el('div', 'mode-row', scr);
      let saved = 0; for (let i = 1; i <= S.count(); i++) if (S.load(i)) saved++;
      const card = (cls, ico, label, sub, voice, fb, v) => {
        const b = G.el('button', 'mode-card ' + cls, row); b.type = 'button'; b.setAttribute('aria-label', label);
        G.el('div', 'mc-ico', b, G.icon(ico)); G.el('div', 'mc-label', b, label); G.el('div', 'mc-sub', b, sub);
        G.onTap(b, () => { if (b.disabled) return; G.audio.stopVoice(); G.audio.sfx('sfx_tap', 0.7); say(voice, fb); pick(v); });
        return b;
      };
      card('new', 'icon_star', '새로 하기', '처음부터 시작해요', 'S92_btn_new', '새로 하기', 'new');
      const c = card('cont', 'icon_next', '이어 하기', saved ? '하던 곳부터 해요' : '아직 저장된 게임이 없어요', 'S92_btn_continue', '이어 하기', 'cont');
      if (!saved) { c.disabled = true; c.classList.add('off'); }
      say('S92_mode', '새로 할까요, 이어 할까요?');
    });
  }
  // 번호 카드 돌려 고르기. 카드가 둥글게 돌아가며 가운데 카드가 크게 보임
  function revolver(mode, list) {
    return new Promise((pick) => {
      const scr = screenBase('rv-screen ' + (mode === 'new' ? 'rv-new' : 'rv-cont'));
      head(scr, ((G.D.dialogues.S92_pick_slot || {}).text || '내 번호를 눌러 주세요').replace(/\.$/, ''), 'S92_pick_slot');
      const stage = G.el('div', 'rv-stage', scr);
      const ring = G.el('div', 'rv-ring', stage);
      const N = list.length; let cur = 0, busy = false;
      if (!N) G.el('div', 'rv-empty', stage, mode === 'new' ? '빈 번호가 없어요. 선생님께 말해 주세요.' : '아직 저장된 게임이 없어요.');
      const cards = list.map((it, k) => {
        const d = it.data, c = G.el('button', 'rv-card' + (d ? '' : ' empty'), ring); c.type = 'button';
        c.setAttribute('aria-label', it.slot + '번' + (d && d.name ? ' ' + d.name : ''));
        G.el('div', 'bn', c, String(it.slot));
        G.el('div', 'nm', c, d ? (d.name ? esc(d.name) : '이어 하기') : '새로 하기');
        if (d) {
          G.el('div', 'meta', c, G.icon('icon_star') + (d.stars || 0) + '/8');
          c.insertAdjacentHTML('beforeend', G.icon('place_' + (PLACES.includes(d.place) ? d.place : 'home'), 'pl'));
        }
        G.onTap(c, () => { if (moved) return; if (k === cur) choose(); else go(k); });
        return c;
      });
      const nav = G.el('div', 'rv-nav', scr);
      const back = G.btn('pill', '돌아가기', nav, () => { cleanup(); pick(null); }, '돌아가기');
      const prev = G.btn('pill round rv-arrow prev', G.icon('icon_next'), nav, () => go(cur - 1), '앞 번호');
      const ok = G.btn('pill gold rv-ok', G.icon('icon_ok') + ' 이 번호로', nav, () => choose(), '이 번호로');
      const next = G.btn('pill round rv-arrow', G.icon('icon_next'), nav, () => go(cur + 1), '다음 번호');
      back.classList.add('rv-back');
      if (N < 2) { prev.style.visibility = next.style.visibility = 'hidden'; }
      if (!N) ok.disabled = true;
      // 카드 자리: 가운데에서 떨어진 칸 수(원처럼 이어짐)에 따라 옆으로, 뒤로, 살짝 돌려서
      const layout = (instant) => {
        const w = stage.clientWidth, cw = cards[0] ? cards[0].offsetWidth : 0;
        const gapX = Math.min(cw * 0.78, w * 0.26), show = N <= 3 ? 1 : 2;
        cards.forEach((c, k) => {
          let d = k - cur; if (N > 2) { d = ((d % N) + N) % N; if (d > N / 2) d -= N; }
          const a = Math.abs(d), vis = a <= show + 0.5;
          c.style.transition = instant ? 'none' : '';
          c.style.transform = `translate(-50%,-50%) translateX(${d * gapX}px) translateZ(${-a * cw * 0.55}px) rotateY(${-d * 28}deg) scale(${a ? 0.82 : 1})`;
          c.style.opacity = vis ? (a ? (a > 1 ? 0.35 : 0.7) : 1) : 0;
          c.style.zIndex = 100 - a; c.style.pointerEvents = vis ? '' : 'none';
          c.classList.toggle('front', a === 0); c.tabIndex = a === 0 ? 0 : -1;
        });
      };
      const go = (k) => { if (!N || busy) return; cur = ((k % N) + N) % N; G.audio.sfx('sfx_page', 0.35); layout(); };
      const choose = async () => {
        if (!N || busy) return; busy = true;
        const c = cards[cur]; c.classList.add('picked'); G.audio.stopVoice(); G.audio.sfx('sfx_tap', 0.7);
        await G.wait(0.35); cleanup(); pick(list[cur]);
      };
      // 밀어서 돌리기
      let sx = null, moved = false;
      stage.addEventListener('pointerdown', (e) => { sx = e.clientX; moved = false; });
      stage.addEventListener('pointermove', (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 40) moved = true; });
      stage.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); setTimeout(() => moved = false, 50); } });
      const key = (e) => { if (e.key === 'ArrowLeft') go(cur - 1); else if (e.key === 'ArrowRight') go(cur + 1); else if (e.key === 'Enter') choose(); };
      window.addEventListener('keydown', key);
      const cleanup = () => { window.removeEventListener('keydown', key); G.onResize = null; };
      G.onResize = () => layout(true); requestAnimationFrame(() => layout(true));
      say('S92_pick_slot', '내 번호를 눌러 주세요.');
    });
  }
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
    const sv = G.el('div', 'saved', root); sv.id = 'savedStar'; sv.innerHTML = G.sparkle('#FFD66B', '#FFF6D6', 6);
  };
  H.clear = () => { if (!root) H.init(); tl.innerHTML = tr.innerHTML = bl.innerHTML = br.innerHTML = ''; H.hideBubble(); taskEl = null; };
  H.hide = (on) => { if (!root) H.init(); root.style.visibility = on ? 'hidden' : ''; };

  // ---- 지금 할 일: 열려 있고 아직 안 끝낸 첫 장소 ----
  H.nextPlace = () => G.D.places.places.find(p => G.map.state(p) === 'open') || null;
  function questCard() {
    const q = G.el('button', 'quest', tl); q.type = 'button';
    const np = H.nextPlace();
    G.el('div', 'q1', q, '길의 별 찾기 ' + (G.st.quest || 0) + '/5');   // 9/30: 별 모양·"사라진 별"은 진짜 별에만
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
    taskEl.innerHTML = '<span>이곳에서 할 일</span> <span class="stars">' + G.svgDot(true).repeat(d) + G.svgDot(false).repeat(n - d) + '</span>';
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
      if (it) G.onTap(s, () => { nm.textContent = it.name; G.audio.sfx('sfx_page', 0.4); H.itemPop(it); });
    }
    const row = G.el('div', 'btn-row', sh);
    G.btn('pill gold', G.icon('icon_ok') + ' 닫기', row, () => { m.remove(); G.busy = Math.max(0, G.busy - 1); G.audio.stopVoice(); });
  };
  // ---- 9/30 선생님: 가방의 아이템을 누르면 큰 그림이 팝업 (마을 지도·촉각 지도 등). 그림 파일 art/popup_<id>가 없으면 아이콘을 크게 ----
  H.itemPop = (it) => {
    const ov = G.$('#overlay');
    const m = G.el('div', 'modal item-pop', ov); const sh = G.el('div', 'sheet', m);
    const big = G.art('popup_' + it.id);
    const pic = G.el('div', 'item-pop-pic' + (big ? ' art' : ''), sh, big ? `<img src="${big}" alt="">` : G.icon(it.icon));
    G.el('div', 'get-title', sh, it.name);
    G.el('div', 'get-desc', sh, G.txt(it.voice));
    pic.animate && pic.animate([{ transform: 'scale(.6)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: 350, easing: 'ease-out' });
    G.audio.voice(it.voice);
    const row = G.el('div', 'btn-row', sh);
    G.btn('pill gold', G.icon('icon_ok') + ' 닫기', row, () => { m.remove(); G.audio.stopVoice(); }, '닫기');
    // 9/30: 낮은 휴대폰 화면에서 [닫기]가 화면 밖으로 밀리지 않게, 창이 넘치면 그림을 그만큼 줄임
    const img = big && pic.querySelector('img');
    const fit = () => { if (!img || !m.isConnected) return; img.style.maxHeight = ''; const over = sh.scrollHeight - sh.clientHeight;
      if (over > 0) img.style.maxHeight = Math.max(60, img.getBoundingClientRect().height - over - 4) + 'px'; };
    if (img) { if (img.complete) fit(); else img.onload = fit; G.resizers.add(fit); const mo = new MutationObserver(() => { if (!m.isConnected) { G.resizers.delete(fit); mo.disconnect(); } }); mo.observe(ov, { childList: true }); }
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
        state === 'locked' ? (G.artImg('map_pin', 'pin-locked') || G.svgPin('rgba(190,196,214,.55)', 'rgba(90,96,120,.8)', 5)) :
        state === 'done' ? (G.artImg('map_pin_done') || G.svgPin('#FFE9A8', '#C98F14', 6)) : (G.artImg('map_pin') || G.svgPin('#FFD66B', '#FFF6D6', 6));   // 9/30: 장소 표시는 동그란 핀
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
// 프로토타입 2: opts.noPortraits = 인물 그림 없이 대화창만 (퍼즐 화면은 위쪽에 해솔 얼굴을 따로 그림, U7)
'use strict';
G.dialog = (() => {
  const Dl = { active: false };
  const BAND = { lumi: '#FFD66B', hero: '#7FB77E', chief: '#A0764F', post: '#5B8FD0', bom: '#F4A259', haesol: '#3AA39A', daon: '#E88D7A', villager: '#B58BC4', nar: '', ui: '' };
  let wrap, box, nameEl, textEl, nextBtn, replayBtn, pgL, pgR, heroImg, lumiImg, partnerImg, choicesEl;
  let ready = false, vtok = 0, curId = null, waiter = null, blinkOff = null, lastLine = false;

  function build(partner, noPt) {
    const root = G.$('#dialog'); root.innerHTML = '';
    wrap = G.el('div', 'dlg-wrap', root);
    const hit = G.el('div', 'dlg-hit', wrap);
    hit.addEventListener('click', (e) => {
      if (G.paused || G._suppressClick) return;
      const through = lastLine && ready;   // 마지막 대사에서 장면 속 누를 곳(장소·반짝이는 곳)을 누르면 대화를 닫고 그곳을 바로 누름
      press();
      if (through) setTimeout(() => tapThrough(e.clientX, e.clientY), 80);
    });
    const P = G.D.portraits, pr = G.$('#portraits'); pr.innerHTML = '';
    if (noPt) { pgL = pgR = heroImg = lumiImg = partnerImg = null; pr.classList.remove('on'); }
    else {
      pr.classList.add('on');
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
      requestAnimationFrame(() => requestAnimationFrame(() => { pgL && pgL.classList.remove('enter'); pgR && pgR.classList.remove('enter'); }));
    }
    box = G.el('div', 'dlg-box', wrap);
    nameEl = G.el('div', 'dlg-name', box);
    textEl = G.el('div', 'dlg-text', box);
    const btns = G.el('div', 'dlg-btns', box);   // 9/29: 버튼을 옆으로 나란히 놓아 대화창을 낮게
    replayBtn = G.btn('pill dlg-replay', G.icon('icon_sound'), btns, () => { if (curId) speak(curId); }, '다시 듣기');
    nextBtn = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), btns, () => press(), '다음');
    choicesEl = null;
    // 루미 눈 깜박임 (깜박임 그림이 있을 때만)
    if (P.lumi.blink && lumiImg) {
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
    // 9/29 밤: 그림의 가로:세로를 원본 그대로 고정 (어떤 브라우저에서도 가로로 눌리지 않게)
    img.addEventListener('load', () => { if (img.naturalWidth) img.style.aspectRatio = img.naturalWidth + ' / ' + img.naturalHeight; });
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
    if (heroImg) { heroImg.classList.toggle('dim', sp !== 'hero'); heroImg.classList.toggle('speak', sp === 'hero'); }
    if (lumiImg) { lumiImg.classList.toggle('dim', sp !== 'lumi'); lumiImg.classList.toggle('speak', sp === 'lumi'); }
    if (partnerImg) { const me = !inL && sp !== 'nar'; partnerImg.classList.toggle('dim', !me); partnerImg.classList.toggle('speak', me); }
    if (Dl.onSpeaker) Dl.onSpeaker(sp);
  }
  function setNext() { if (!nextBtn) return; nextBtn.classList.toggle('wait', !ready); nextBtn.classList.toggle('ready', ready); nextBtn.disabled = !ready; }
  function speak(id) {
    const my = ++vtok; ready = false; setNext();
    if (G.fast()) { ready = true; setNext(); }   // 빠르게 모드: 음성이 끝나기 전에도 [다음]
    return G.audio.voice(id).then(() => { if (my === vtok) { ready = true; setNext(); } });
  }
  function press() { if (!ready || !waiter) return; if (G.fast()) { vtok++; G.audio.stopVoice(); } G.audio.sfx('sfx_tap', 0.5); const w = waiter; waiter = null; w(); }
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
  // opts.partner: 오른쪽 인물 ('chief', 'post', 'bom', 'haesol'), opts.keep: 끝나도 창을 닫지 않음, opts.noPortraits: 인물 그림 없이
  Dl.play = async (ids, opts = {}) => {
    if (!ids || !ids.length) return;
    open(opts.partner, opts.noPortraits);
    G.audio.preload(ids.slice(0, 3));
    for (let i = 0; i < ids.length; i++) {
      G.audio.preload(ids.slice(i + 1, i + 3));
      lastLine = i === ids.length - 1 && !opts.keep;
      show(ids[i]); if (Dl.onLine) Dl.onLine(ids[i]);
      await new Promise(res => { waiter = res; speak(ids[i]); });
    }
    if (!opts.keep) Dl.close();
  };
  function open(partner, noPt) {
    if (!Dl.active || (partner || null) !== Dl.partner || !!noPt !== Dl.noPt) {
      if (blinkOff) blinkOff();
      build(partner, noPt);
    }
    Dl.partner = partner || null; Dl.noPt = !!noPt;
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
    open(Dl.partner, Dl.noPt); lastLine = false;
    nextBtn.style.visibility = 'hidden';
    choicesEl = G.el('div', 'choices', wrap);
    const one = options.length === 1 || (G.settings && G.settings.choiceOne) || G.fast();
    let armed = -1;
    options.forEach((o, i) => {
      const b = G.btn('pill gold choice', (o.icon ? G.icon(o.icon) + ' ' : '') + o.label, choicesEl, async () => {
        if (one || armed === i) {
          choicesEl.remove(); choicesEl = null; nextBtn.style.visibility = '';
          G.audio.sfx('sfx_tap', 0.6);
          if (o.voice) { show(o.voice); if (G.fast()) { speak(o.voice); await G.wait(0.5); } else { await speak(o.voice); await G.wait(0.3); } }
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

/* ---- braille.js ---- */
// braille.js — 점자 그리기 (GDD 5-1). 점자/braille_draw.js와 같은 모양을 SVG로 그림 (글꼴이 아니라 점을 직접 그려 기기마다 모양이 같음)
// 한 칸 = 왼쪽 줄 위에서 아래로 1·2·3, 오른쪽 줄 4·5·6. 6자리를 모두 그림: 찍힌 점 = 볼록한 점, 빈 자리 = 옅은 동그라미. 칸 테두리도 옅게
// 비율은 실제 점자 크기(점 사이 2.5mm, 칸 사이 6mm, 점 지름 1.5mm)를 따름: s = 점 사이, 칸 간격 2.4s, 점 반지름 0.3s
'use strict';
G.braille = (() => {
  const B = {};
  const POS = { 1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [1, 0], 5: [1, 1], 6: [1, 2] };
  const ST = { dot: '#4A3B32', dotLight: '#8A7362', empty: 'rgba(74,59,50,0.38)', emptyFill: 'rgba(255,244,224,0.55)', cell: 'rgba(74,59,50,0.16)', cellFill: 'rgba(255,244,224,0.35)' };
  let uid = 0;
  B.metrics = (s) => ({ s, r: 0.3 * s, pitch: 2.4 * s, cellW: s, cellH: 2 * s, pad: 0.55 * s });
  // 낱말 그림의 크기 (칸 테두리 포함)
  B.size = (cells, s) => { const m = B.metrics(s); return [(cells.length - 1) * m.pitch + m.cellW + 2 * m.pad, m.cellH + 2 * m.pad]; };
  // 낱말 하나를 SVG 글로. o.dot: 볼록한 점 색 (빛날 때 바꿈)
  B.svg = (cells, s, o = {}) => {
    const m = B.metrics(s), [w, h] = B.size(cells, s), id = 'bd' + (++uid);
    const dot = o.dot || ST.dot, light = o.dotLight || ST.dotLight;
    let g = `<svg class="braille" viewBox="0 0 ${w.toFixed(1)} ${h.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}">` +
      `<defs><radialGradient id="${id}" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dot}"/></radialGradient></defs>`;
    cells.forEach((dots, i) => {
      const x = m.pad + i * m.pitch, y = m.pad, on = new Set(dots);
      g += `<rect x="${(x - m.pad).toFixed(1)}" y="${(y - m.pad).toFixed(1)}" width="${(m.cellW + 2 * m.pad).toFixed(1)}" height="${(m.cellH + 2 * m.pad).toFixed(1)}" rx="${(0.35 * s).toFixed(1)}" fill="${ST.cellFill}" stroke="${ST.cell}" stroke-width="${Math.max(1, 0.05 * s).toFixed(1)}"/>`;
      for (let d = 1; d <= 6; d++) {
        const px = x + POS[d][0] * s, py = y + POS[d][1] * s;
        if (on.has(d)) g += `<circle cx="${(px + 0.06 * s).toFixed(1)}" cy="${(py + 0.08 * s).toFixed(1)}" r="${m.r.toFixed(1)}" fill="rgba(40,30,25,0.28)"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${m.r.toFixed(1)}" fill="url(#${id})"/>`;
        else g += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(m.r * 0.92).toFixed(1)}" fill="${ST.emptyFill}" stroke="${ST.empty}" stroke-width="${Math.max(1, 0.07 * s).toFixed(1)}"/>`;
      }
    });
    return g + '</svg>';
  };
  return B;
})();

/* ---- stars.js ---- */
// stars.js — 하늘의 별 9개 (9/30 새 세계관): 주제 별 8개 + 마지막 별. 별마다 모양과 색, 하는 일이 다름
// 하는 일은 사람의 몸을 고치는 것이 아니라 "마을이 모두에게 맞는 방법을 쓰게 돕는 것" (기획안 2장 표현 원칙)
// 9/30 선생님 그림 assets/ui/stars/star_<id>.png (gen_data가 story.starImgs에 적음). 그림이 없는 별만 아래 SVG 임시 그림
'use strict';
G.STARS = (() => {
  const OUT = '#FFF6D6';
  const pts = (n, R, r, cx = 50, cy = 52, rot = -90) => {
    const a = [];
    for (let i = 0; i < n * 2; i++) { const t = (rot + i * 180 / n) * Math.PI / 180, q = i % 2 ? r : R; a.push((cx + q * Math.cos(t)).toFixed(1) + ',' + (cy + q * Math.sin(t)).toFixed(1)); }
    return a.join(' ');
  };
  const poly = (p, fill, sw = 4) => `<polygon points="${p}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  const face = (cx = 50, cy = 54) => '';   // 얼굴은 넣지 않음 (루미와 헷갈리지 않게)
  const S = [
    { id: 'road', name: '길의 별', job: '여러 가지 방법으로 길과 소식을 알려 줘요', color: '#7DBBE3',
      svg: poly(pts(4, 46, 14), '#7DBBE3') + poly(pts(4, 22, 8, 50, 52, -45), '#FFE9A8', 3) },
    { id: 'sound', name: '소리의 별', job: '모두가 편안하게 들을 수 있게 도와요', color: '#B58BC4',
      svg: poly(pts(5, 38, 22), '#B58BC4') + `<path d="M84 34 Q94 52 84 70 M76 40 Q83 52 76 64" fill="none" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/>` },
    { id: 'word', name: '말의 별', job: '말, 그림, 손짓으로 마음을 전하게 해요', color: '#F29BB0',
      svg: `<path d="M26 74 L16 94 L40 80 Z" fill="#F29BB0" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/>` + poly(pts(5, 42, 20), '#F29BB0') },
    { id: 'door', name: '문턱의 별', job: '누구나 어디든 들어갈 수 있게 해요', color: '#7FB77E',
      svg: poly(pts(6, 44, 26), '#7FB77E') + `<path d="M26 88 Q52 88 76 70" fill="none" stroke="${OUT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>` },
    { id: 'heart', name: '마음의 별', job: '왜 그랬는지 서로 물어보게 해요', color: '#F4A259',
      svg: `<path d="M50 88 C18 66 8 46 22 30 C33 18 46 24 50 34 C54 24 67 18 78 30 C92 46 82 66 50 88 Z" fill="#F4A259" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/>` +
        `<path d="M50 4 V14 M88 18 L81 25 M12 18 L19 25" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/>` },
    { id: 'speed', name: '속도의 별', job: '저마다의 빠르기를 기다려 줘요', color: '#E6B54A',
      svg: poly(pts(5, 46, 22), '#E6B54A') + `<path d="M50 52 m0 0 a4 4 0 1 1 5 4 a9 9 0 1 1 -13 -8 a14 14 0 1 1 20 14" fill="none" stroke="${OUT}" stroke-width="3.5" stroke-linecap="round"/>` },
    { id: 'idea', name: '생각의 별', job: '푸는 방법이 여러 가지라고 알려 줘요', color: '#9ED0C8',
      svg: (() => { const C = ['#F4A259', '#FFD66B', '#7FB77E', '#7DBBE3', '#B58BC4', '#F29BB0', '#E88D7A']; let g = '';
        for (let i = 0; i < 7; i++) { const a = (-90 + i * 360 / 7) * Math.PI / 180, b = (-90 + (i + 0.5) * 360 / 7) * Math.PI / 180, c = (-90 + (i - 0.5) * 360 / 7) * Math.PI / 180;
          g += `<polygon points="50,52 ${(50 + 20 * Math.cos(c)).toFixed(1)},${(52 + 20 * Math.sin(c)).toFixed(1)} ${(50 + 46 * Math.cos(a)).toFixed(1)},${(52 + 46 * Math.sin(a)).toFixed(1)} ${(50 + 20 * Math.cos(b)).toFixed(1)},${(52 + 20 * Math.sin(b)).toFixed(1)}" fill="${C[i]}" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>`; }
        return g; })() },
    { id: 'together', name: '함께의 별', job: '직접 만나고 알아 가게 해요', color: '#FFD66B',
      svg: poly(pts(5, 34, 15, 36, 50), '#FFE9A8') + poly(pts(5, 34, 15, 64, 56), '#FFD66B') },
    { id: 'last', name: '마지막 별', job: '모두의 마음이 모이면 빛나요', color: '#FFF1B8', big: true,
      svg: poly(pts(8, 47, 24), '#FFF1B8') + poly(pts(8, 26, 14, 50, 52, -67.5), '#FFD66B', 3) },
  ];
  // 별 하나를 그림으로 (선생님 그림이 있으면 그 그림)
  G.starSvg = (s, wc) => {
    if (wc && ((G.D.story || {}).starWc || []).includes(s.id)) return `<img src="${G.asset('assets/ui/stars_wc/star_' + s.id + '.png')}" alt="" draggable="false">`;   // 9/30 밤하늘에서는 수채화 톤
    const has = ((G.D.story || {}).starImgs || []).includes(s.id);
    if (has) return `<img src="${G.asset('assets/ui/stars/star_' + s.id + '.png')}" alt="" draggable="false">`;
    return `<svg viewBox="0 0 100 100">${s.svg}</svg>`;
  };
  return S;
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
    const fn = SCRIPTS[id] || (id.startsWith('CH:') ? SCRIPTS.CH : null); if (!fn) return;
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
    if (seen || G.fast()) showSkip(); else c.wait(2).then(showSkip);
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
  const sparkSvg = G.sparkle();

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
    // ---- C1 인트로 (9/30 새 세계관, 약 40초): 여러 모양의 별 9개가 뜬 하늘 → 별마다 마을로 빛줄기 → 광장에서 별 하나가 하늘로 올라감
    //      → 별이 하나둘 떨어지고 마지막 별까지 사라짐 → 카메라가 마을로 → 불빛이 꺼지고 색이 빠짐 → 루미 등장
    //      이야기꾼 대사 S01_nar_01~09 가 끝나야 다음 장면으로 (음성 길이에 맞춰 흐름)
    async C1(c, root) {
      root.style.opacity = 0;
      const V = G.mapView(root, { free: true });
      const sky = G.el('img', 'bg', null); sky.src = G.asset('assets/ui/sky.jpg'); sky.alt = '';
      Object.assign(sky.style, { top: '-1900px', left: '-900px', width: (V.W + 1800) + 'px', height: '2200px', objectFit: 'cover' }); V.el.insertBefore(sky, V.el.firstChild);   // 9/30: 카메라가 별을 따라 왼쪽 위로 가도 밤하늘이 끊기지 않게 넓힘
      V.imgs.style.webkitMaskImage = V.imgs.style.maskImage = 'linear-gradient(to bottom, transparent 0, #000 320px)';
      V.fullColor(1); V.setLamps(5, true);
      const dotL = G.el('div', 'layer', V.el), starL = G.el('div', 'layer', V.el);
      const dots = [];
      for (let i = 0; i < (c.light ? 14 : 40); i++) {
        const d = G.el('div', 'dot twinkle', dotL), r = 6 + Math.random() * 12;
        Object.assign(d.style, { left: Math.random() * V.W + 'px', top: (-1250 + Math.random() * 1000) + 'px', width: r + 'px', height: r + 'px', animationDelay: (-Math.random() * 2.2) + 's' });
        dots.push(d);
      }
      // 별 9개: 가운데 위가 마지막 별 (가장 큼)
      // 9/30 선생님: 별이 너무 커서 작게, 더 넓게 흩어 놓음. 밤하늘에서는 수채화 톤 그림 (assets/ui/stars_wc)
      const POS = [[700, -900], [1000, -1180], [1250, -860], [1630, -860], [1880, -1180], [2180, -900], [1060, -620], [1820, -620], [1440, -1080]];
      const beamL = G.el('div', 'layer', V.el);
      const S = G.STARS.map((s, i) => {
        const sz = s.big ? 124 : 92, el = G.el('div', 'skystar', starL, G.starSvg(s, true)), at = POS[i];
        Object.assign(el.style, { left: at[0] + 'px', top: at[1] + 'px', width: sz + 'px', height: sz + 'px', margin: (-sz / 2) + 'px 0 0 ' + (-sz / 2) + 'px', animationDelay: (-i * 0.37) + 's' });
        const bm = G.el('div', 'sbeam', beamL); Object.assign(bm.style, { left: (at[0] - 9) + 'px', top: at[1] + 'px', height: (900 - at[1]) + 'px', opacity: 0 });
        bm.style.background = `linear-gradient(to bottom, ${s.color}cc, ${s.color}00)`;
        return { s, el, at, bm };
      });
      const road = S[0]; road.el.style.opacity = 0;   // 길의 별: 광장에서 올라가는 모습으로 등장
      const P = G.D.places.nodes, land = [P.PLAZA[0], P.PLAZA[1] - 70];
      const flare = G.el('div', 'flare', V.fx); Object.assign(flare.style, { position: 'absolute', left: (land[0] - 450) + 'px', top: (land[1] - 300) + 'px', opacity: 0, zIndex: 3990 });
      const lumi = G.el('img', '', V.fx); lumi.src = G.asset('assets/chars/lumi_big.png'); lumi.alt = '';
      Object.assign(lumi.style, { position: 'absolute', left: (land[0] - 70) + 'px', top: (land[1] - 150) + 'px', width: '140px', height: '140px', opacity: 0, zIndex: 4001 });
      await Promise.all([V.ready, sky.decode ? sky.decode().catch(() => { }) : 0]);
      V.setCam(1440, -820, 1);
      const onR = () => V.setCam(V.cam.x, V.cam.y, V.cam.z); G.resizers.add(onR);
      // 9/30: 시작 위치를 한 번만 잡아 고르게 움직임 (전에는 매 순간 남은 거리를 줄여 카메라가 먼저 가 버렸음)
      const cam = (x, y, z, d) => { if (c.rm) { V.setCam(x, y, z); return Promise.resolve(); } const a = { ...V.cam }; return c.tween(0, 1, d, k => V.setCam(a.x + (x - a.x) * k, a.y + (y - a.y) * k, a.z + (z - a.z) * k), 'io'); };
      const pop = (el) => { if (!c.rm && el.animate && !c.skipped) el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 600, easing: 'ease-out' }); };
      // 9/30 선생님: 인트로 이야기꾼 대사 사이에 0.7초 쉼 (연달아 줄줄 말하지 않게, 인트로에만)
      const say = (id) => c.voice(id).then(() => c.wait(0.7));
      c.t0 = G.t;
      // (1) 별이 가득한 밤하늘
      fadeIn(c, root, 1.0);
      await c.wait(0.4); await say('S01_nar_01');
      // (2) 여러 모양의 별이 차례로 반짝
      await Promise.all([say('S01_nar_02'), (async () => { for (const q of S) { if (q === road) continue; pop(q.el); c.sfx('sfx_chime', 0.12); await c.wait(0.3); } })()]);
      // (3) 별마다 마을로 빛줄기 (별이 하는 일)
      await Promise.all([say('S01_nar_03'), c.tween(0, 0.55, 1.4, v => S.forEach(q => { if (q !== road) q.bm.style.opacity = v; }))]);
      await Promise.all([say('S01_nar_04'), (async () => { pop(S[2].el); await c.wait(1.2); pop(S[2].el); })()]);
      // (4) 광장으로 내려가 주민들이 함께 방법을 찾는 마을 → 길의 별이 별 받침대에서 하늘로
      c.tween(0.55, 0, 1.2, v => S.forEach(q => { if (q !== road) q.bm.style.opacity = v; }));   // 9/30: 아직 없는 길의 별 빛줄기가 잠깐 보이던 것 고침
      await Promise.all([say('S01_nar_05'), cam(1400, 640, 1.1, 2.6)]);
      road.el.style.left = land[0] + 'px'; road.el.style.top = land[1] + 'px'; road.el.style.opacity = 1;
      c.sfx('sfx_sparkle', 0.6);
      // 9/30 선생님: 별 받침대에서 올라가는 별을 카메라가 따라감 (별이 늘 화면 가운데 조금 아래)
      const c0 = { ...V.cam };
      await Promise.all([
        say('S01_nar_06'),
        c.tween(0, 1, c.rm ? 0.1 : 3.8, k => {
          const x = land[0] + (road.at[0] - land[0]) * k, y = land[1] + (road.at[1] - land[1]) * k;
          road.el.style.left = x + 'px'; road.el.style.top = y + 'px';
          if (c.rm) return;
          const f = Math.min(1, k / 0.18), b = f * f * (3 - 2 * f);   // 처음 잠깐은 카메라가 별 쪽으로 부드럽게 붙음
          V.setCam(c0.x + (x - c0.x) * b, c0.y + (y - 90 - c0.y) * b, c0.z + (1 - c0.z) * k);
        }, 'io'),
      ]);
      pop(road.el); c.sfx('sfx_chime', 0.4);
      // 별이 자리에 닿은 뒤 밤하늘 전체가 보이게 천천히 물러남
      await cam(1440, -820, 1, 1.6);
      await c.wait(0.3);
      // (5) 별이 하나둘 떨어짐 → 마지막 별까지
      // 9/30 선생님: 떨어질 때 빙글빙글 돌고, 지나간 자리에 별 잔상과 반짝이는 별의 길이 잠시 남음 (선 하나만 있던 것을 바꿈)
      const trail = G.el('div', 'layer', V.el); trail.style.zIndex = 1;
      const tw = (col) => G.sparkle('#FFFDF2', col, 5);
      const fall = (q, i) => new Promise(async (res) => {
        if (!c.rm && !c.skipped) await c.tween(0, 1, 0.8, k => { q.el.style.transform = `rotate(${Math.sin(k * Math.PI * 6) * 16}deg)`; });
        c.sfx('sfx_starfall', 0.35);
        const to = [500 + ((i * 397) % 1900), 250 + ((i * 211) % 600)], p1 = [(q.at[0] + to[0]) / 2 + 300, q.at[1] + 200];
        const sz = parseFloat(q.el.style.width), col = q.s.color, spin = (i % 2 ? -1 : 1) * (q.s.big ? 900 : 720);
        const many = !(c.rm || c.light || c.skipped);
        let lastG = -1, lastS = -1;
        await c.tween(0, 1, c.rm ? 0.3 : 1.9, k => {
          const u = 1 - k, x = u * u * q.at[0] + 2 * u * k * p1[0] + k * k * to[0], y = u * u * q.at[1] + 2 * u * k * p1[1] + k * k * to[1];
          const sc = 1 - 0.55 * k, rot = c.rm ? 0 : spin * k, op = k < 0.75 ? 1 : (1 - k) / 0.25;
          q.el.style.left = x + 'px'; q.el.style.top = y + 'px'; q.el.style.transform = `rotate(${rot}deg) scale(${sc})`; q.el.style.opacity = op;
          if (c.skipped) return;
          // 별 잔상: 지나간 자리에 같은 별이 옅게 남았다가 사라짐
          if (many && k - lastG > 0.045 && k < 0.9) {
            lastG = k;
            const g = G.el('div', 'sghost', trail, q.el.innerHTML);
            Object.assign(g.style, { left: x + 'px', top: y + 'px', width: sz + 'px', height: sz + 'px', margin: (-sz / 2) + 'px 0 0 ' + (-sz / 2) + 'px', transform: `rotate(${rot}deg) scale(${sc})` });
            c.tween(0.55, 0, 0.55, v => g.style.opacity = v * op).then(() => g.remove());
          }
          // 반짝이는 별의 길: 작은 반짝이가 뿌려져 잠시 반짝이다 천천히 사라짐
          if (k - lastS > (many ? 0.018 : 0.08) && k < 0.95) {
            lastS = k;
            const s = G.el('div', 'strail', trail, tw(col)), r = (18 + Math.random() * 26) * (q.s.big ? 1.3 : 1);
            const jx = (Math.random() - 0.5) * sz * 0.5, jy = (Math.random() - 0.5) * sz * 0.5;
            Object.assign(s.style, { left: (x + jx) + 'px', top: (y + jy) + 'px', width: r + 'px', height: r + 'px', margin: (-r / 2) + 'px 0 0 ' + (-r / 2) + 'px', animationDelay: (-Math.random()) + 's' }); s.style.setProperty('--c', col);
            const life = many ? 1.4 + Math.random() * 0.9 : 0.8;
            c.tween(1, 0, life, v => { s.style.opacity = v; s.style.transform = `translateY(${(1 - v) * 40}px) scale(${0.5 + v * 0.5})`; }, 'in').then(() => s.remove());
          }
        }, 'in');
        q.el.style.opacity = 0;
        if (!c.skipped) burst(c, root, ...V.toScreen(to[0], to[1]), c.light ? 4 : 8);
        res();
      });
      const order = [2, 5, 0, 7, 3, 1, 6, 4];
      await Promise.all([
        say('S01_nar_07'),
        (async () => { const fs = []; for (const i of order) { fs.push(fall(S[i], i)); await c.wait(c.rm ? 0.3 : 0.75); } await Promise.all(fs); })(),
      ]);
      await Promise.all([say('S01_nar_08'), fall(S[8], 8), c.tween(1, 0.25, 2, v => dotL.style.opacity = v)]);
      // (6) 마을로: 가로등이 광장 가까운 것부터 꺼지고, 색이 빠짐
      await cam(1400, 700, 1.1, c.rm ? 0 : 2.4);
      const ls = [...V.lamps].sort((a, b) => Math.hypot(a.def.at[0] - land[0], a.def.at[1] - land[1]) - Math.hypot(b.def.at[0] - land[0], b.def.at[1] - land[1]));
      await Promise.all([
        say('S01_nar_09'),
        c.tween(1, 0, 3.2, v => V.colorImg.style.opacity = v),
        (async () => { for (const l of ls) { l.el.classList.remove('on'); c.sfx('sfx_click', 0.15); await c.wait(0.28); } })(),
      ]);
      // (7) 광장 쪽 작은 빛 속에서 루미가 나타나 두리번거림
      c.sfx('sfx_sparkle', 0.7);
      await c.tween(0, 0.8, 0.6, k => { flare.style.opacity = k; flare.style.transform = `scale(${0.3 + k * 0.7})`; }, 'out');
      await c.tween(0, 1, 0.9, k => { lumi.style.opacity = k; lumi.style.transform = c.rm ? '' : `scale(${k}) rotate(${(1 - k) * 360}deg)`; }, 'out');
      c.tween(0.8, 0, 1.2, v => flare.style.opacity = v);
      await c.wait(0.6); if (!c.rm && !c.skipped) lumi.style.transform = 'scaleX(-1)';
      await c.wait(0.7); lumi.style.transform = '';
      await c.wait(0.6);
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

    // ---- C7 장소 클리어: "완료!" → 별빛이 위로 날아감 → 지도에서 금빛 물감이 번지며 색이 돌아옴 → 다음 장소에 불 ----
    async C7(c, root, opts) {
      const live = opts.live;
      const place = live ? live.place : 'plaza', from = live ? live.from : 0, to = live ? live.to : 1, unlock = live ? live.unlock : 'market';
      let SV = null;
      if (live) root.style.background = 'transparent';
      else { SV = G.sceneView(root, place); SV.setMood(0); await SV.ready; }
      c.t0 = G.t;
      // (가) 장면 위
      const big = G.el('div', 'cut-big', root, '완료!'); big.style.opacity = 0;   // 9/30 선생님: "이곳 완료!" → "완료!", 효과음도 선생님이 주신 소리로
      c.sfx('sfx_clear', 0.8); c.voice('S92_clear', false);
      const { W, H, u } = G.stage;
      burst(c, root, W / 2, H * 0.4, 16);
      await c.tween(0, 1, 0.5, k => { big.style.opacity = Math.min(1, k * 2); big.style.transform = `translate(-50%,-50%) scale(${c.rm ? 1 : 0.5 + 0.6 * k})`; }, 'out');
      await c.tween(1.1, 1, 0.2, k => { if (!c.rm) big.style.transform = `translate(-50%,-50%) scale(${k})`; });
      await c.until(1.2);
      // 9/30 새 세계관: 장소를 끝내면 별이 아니라 마을의 따뜻한 불빛이 돌아옴 (별은 역할 미션 뒤 별 받침대에서만)
      const warm = G.el('div', 'warm-glow', root);
      const sv = live ? G.scene.view() : SV; const pp = sv ? sv.toScreen(1200, 560) : [W / 2, H / 2];
      warm.style.left = pp[0] + 'px'; warm.style.top = pp[1] + 'px';
      c.sfx('sfx_chime', 0.5);
      await c.tween(0, 1, 1.3, k => { warm.style.transform = `translate(-50%,-50%) scale(${0.2 + k * 2.2})`; warm.style.opacity = Math.min(1, 3 * (1 - k)); }, 'out');
      warm.remove();
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

  // ---- 장소 도착 공통: 장면 그림 한 벌 + 카메라 + 제목 ----
  async function arrive(c, root, opts, place) {
    root.style.opacity = 0;
    const V = G.sceneView(root, place); V.setMood(opts.replay ? 0 : (G.st ? G.st.mood : 0));
    await V.ready;
    const onR = () => V.setCam(V.cam.x, V.cam.y, V.cam.z); G.resizers.add(onR);
    return { V, off: () => G.resizers.delete(onR) };
  }
  async function title(c, root, text, voice, at, until) {
    const t = G.el('div', 'cut-title', root, text); t.style.opacity = 0;
    await c.until(at);
    c.voice(voice, false);
    await c.tween(0, 1, 0.6, k => { t.style.opacity = k; t.style.transform = `translate(-50%,-50%) scale(${0.8 + 0.2 * k})`; }, 'out');
    await c.until(until - 0.6);
    await c.tween(1, 0, 0.5, v => t.style.opacity = v);
    await c.until(until);
  }

  Object.assign(SCRIPTS, {
    // ---- 9/30 장 제목 (약 4초): "제 3 장" + 선 + "소식을 아는 사람". 배경은 선생님 그림 (없으면 밤하늘 그림을 어둡게) ----
    async CH(c, root, opts) {
      const key = opts.key, T = ((G.D.story || {}).chapterTitles || {})[key]; if (!T) return;
      root.classList.add('chapter');
      const bg = G.el('div', 'ch-bg', root); bg.style.backgroundImage = `url("${G.art('chapter_' + key) || G.art('chapter_bg') || G.asset('assets/ui/sky.jpg')}")`;
      if (!G.art('chapter_' + key) && !G.art('chapter_bg')) bg.classList.add('dim');
      // 9/30 선생님: 장 제목은 마루부리 글꼴 (위 "제 1장" Light, 아래 제목 Bold). 글자는 따로 페이드 인·아웃
      const box = G.el('div', 'ch-box', root);
      const num = G.el('div', 'ch-num chapter-number', box, '제 ' + T[0] + '장');
      const line = G.el('div', 'ch-line', box, G.artImg('chapter_line') || '<i></i>');
      const tt = G.el('div', 'ch-title chapter-title', box, T[1]);
      const txt = [num, line, tt]; txt.forEach(e => e.style.opacity = 0);
      root.style.opacity = 0;
      if (document.fonts && document.fonts.load) await Promise.race([Promise.all([document.fonts.load('300 40px MaruBuri', num.textContent), document.fonts.load('700 90px MaruBuri', T[1])]).catch(() => { }), c.wait(1.2)]);   // 글꼴이 오기 전에 글자가 먼저 보이지 않게 (늦으면 대신 글꼴로)
      c.sfx('sfx_chime', 0.5);
      const fin = (e, at, d) => c.wait(c.rm ? 0 : at).then(() => c.tween(0, 1, c.rm ? 0.2 : d, v => e.style.opacity = v, 'out'));
      await Promise.all([
        c.tween(0, 1, c.rm ? 0.2 : 0.9, v => { root.style.opacity = v; bg.style.transform = c.rm ? '' : `scale(${1.06 - 0.06 * v})`; }, 'out'),
        fin(num, 0.35, 0.8), fin(line, 0.6, 0.8), fin(tt, 0.8, 1.0),
      ]);
      await Promise.all([c.voice(T[2], false), c.wait(G.fast() ? 0.6 : 2.0)]);
      await c.tween(1, 0, c.rm ? 0.2 : 0.7, v => txt.forEach(e => e.style.opacity = v));
      await c.tween(1, 0, c.rm ? 0.2 : 0.5, v => root.style.opacity = v);
    },
    // ---- C3 시장 도착 (6초): 천막이 바람에 펄럭(소리) → 과일 가게 쪽으로 다가감 → 봄이 아주머니가 폴짝 인사 → 「시장」 ----
    async C3(c, root, opts) {
      const { V, off } = await arrive(c, root, opts, 'market');
      if (c.rm) V.setCam(1200, 540, 1); else V.setCam(1500, 520, 1.3);
      c.t0 = G.t;
      // 바람: 나뭇잎 같은 작은 조각이 화면을 가로질러 날아감
      const wind = () => {
        if (c.skipped || c.light) return;
        for (let i = 0; i < 7; i++) {
          const w = G.el('div', 'wind' + (G.art('wind_leaf') ? ' art' : ''), root, G.artImg('wind_leaf') || ''); const y = G.stage.H * (0.15 + Math.random() * 0.5);
          c.tween(0, 1, 1.6 + Math.random() * 0.8, k => { w.style.transform = `translate(${-60 + (G.stage.W + 120) * k}px,${y + Math.sin(k * 9 + i) * 30 * G.stage.u}px) rotate(${k * 540}deg)`; w.style.opacity = Math.sin(k * Math.PI); }, 'lin').then(() => w.remove());
        }
      };
      await Promise.all([
        fadeIn(c, root, 0.5),
        (async () => { await c.until(0.3); c.sfx('sfx_flap', 0.8); wind(); })(),
        (async () => { if (!c.rm) await c.tween(0, 1, 3.4, k => V.setCam(1500 - 300 * k, 520 + 20 * k, 1.3 - 0.3 * k), 'io'); })(),
        (async () => {
          await c.until(2.4); const b = V.spr.bom && V.spr.bom.img; if (!b || c.rm) return;
          await c.tween(0, 1, 0.9, k => b.style.marginTop = (-Math.abs(Math.sin(k * Math.PI * 2)) * 14) + 'px');
        })(),
        title(c, root, '시장', 'S92_place_market', 3.3, 5.9),
      ]);
      V.setCam(1200, 540, 1); off();
    },

    // ---- C4 도서관 도착 (7초): 나무 문이 천천히 열림 → 따뜻한 빛이 쏟아짐 → 먼지가 반짝 → 해솔 사서가 인사 → 「도서관」 ----
    async C4(c, root, opts) {
      const { V, off } = await arrive(c, root, opts, 'library');
      V.setCam(1200, 540, 1);
      const light = G.el('div', 'door-light', root); light.style.opacity = 0;
      const door = G.el('div', 'door', root); const dl = G.el('div', 'door-l', door), dr = G.el('div', 'door-r', door);
      const dimg = G.art('library_door'); if (dimg) { door.classList.add('art'); for (const d of [dl, dr]) G.el('img', 'door-img', d).src = dimg; }   // 9/30: 선생님 문 그림 한 장을 반씩 (비율 그대로 화면을 채움)
      // 9/30 선생님 "테두리 먼저 움직이고 그다음 문이 움직임": 돌 테두리(frame)는 가만히 두고 문짝(l, r)만 경첩을 축으로 열림
      const fimg = G.art('library_door_frame'), limg = G.art('library_door_l'), rimg = G.art('library_door_r');
      if (fimg && limg && rimg) {
        door.classList.remove('art'); door.classList.add('art2'); dl.textContent = ''; dr.textContent = '';
        G.el('img', 'door-img', dl).src = limg; G.el('img', 'door-img', dr).src = rimg;
        G.el('img', 'door-img door-frame', door).src = fimg;
        // 그림(1600x893)이 화면을 채우는 배율로 경첩 위치(x 308, 1292)를 화면 좌표로
        const W = root.clientWidth || G.stage.W, H = root.clientHeight || G.stage.H, s = Math.max(W / 1600, H / 893);
        dl.style.transformOrigin = `${W / 2 + (308 - 800) * s}px 50%`; dr.style.transformOrigin = `${W / 2 + (1292 - 800) * s}px 50%`;
      }
      c.t0 = G.t;
      await Promise.all([
        fadeIn(c, root, 0.4),
        (async () => {
          await c.until(0.6); c.sfx('sfx_door', 0.9);
          await c.tween(0, 1, 2.2, k => {
            if (c.rm) { door.style.opacity = 1 - k; return; }
            dl.style.transform = `perspective(${G.stage.W}px) rotateY(${-100 * k}deg)`; dr.style.transform = `perspective(${G.stage.W}px) rotateY(${100 * k}deg)`;
            const fr = door.querySelector('.door-frame'); if (fr) fr.style.opacity = Math.min(1, (1 - k) / 0.35);   // 문이 거의 열리면 돌 테두리가 사라지며 도서관 안으로
          }, 'io');
          door.remove();
        })(),
        (async () => {   // 빛이 쏟아지고 먼지가 반짝
          await c.until(1.2);
          await c.tween(0, 1, 0.8, k => light.style.opacity = k, 'out');
          if (!c.skipped) for (let i = 0; i < (c.light ? 8 : 22); i++) {
            const d = G.el('div', 'dot twinkle', root), r = (5 + Math.random() * 9) * G.stage.u;
            Object.assign(d.style, { left: (G.stage.W * (0.2 + Math.random() * 0.6)) + 'px', top: (G.stage.H * (0.1 + Math.random() * 0.6)) + 'px', width: r + 'px', height: r + 'px', animationDelay: (-Math.random() * 2.2) + 's' });
            c.tween(0, 1, 4, k => { d.style.translate = `0 ${-60 * k * G.stage.u}px`; d.style.opacity = Math.sin(k * Math.PI); }, 'lin').then(() => d.remove());
          }
          await c.tween(1, 0.35, 2.4, k => light.style.opacity = k);
        })(),
        (async () => {   // 해솔 사서가 책에서 손을 떼고 인사 (살짝 몸을 세움)
          await c.until(3.2); const h = V.spr.haesol && V.spr.haesol.img; if (!h || c.rm) return;
          await c.tween(0, 1, 0.8, k => h.style.marginTop = (-Math.sin(k * Math.PI) * 10) + 'px');
        })(),
        title(c, root, '도서관', 'S92_place_library', 4.2, 6.9),
      ]);
      off();
    },

    // ---- C8 퍼즐 1 성공 (5초): 촉각 지도의 볼록한 길이 도서관에서 숲까지 차례로 빛남 → 숲 이름표가 반짝 ----
    async C8(c, root, opts) {
      let B = opts.live, off = () => { };
      if (B) root.style.background = 'transparent';
      else {   // 교사용 다시 보기: 촉각 지도를 따로 그림
        root.style.background = '#2a2440';
        B = G.puzzle.board(root, 'braille1');
        const fit = () => { const { W, H, u } = G.stage; B.fit(u * 40, u * 40, W - u * 80, H - u * 200); };
        fit(); G.resizers.add(fit); off = () => G.resizers.delete(fit);
      }
      const P = B.D.lightPath, seg = [];
      let total = 0; for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); seg.push(l); total += l; }
      const at = (d) => { for (let i = 0; i < seg.length; i++) { if (d <= seg[i]) { const k = d / seg[i]; return [P[i][0] + (P[i + 1][0] - P[i][0]) * k, P[i][1] + (P[i + 1][1] - P[i][1]) * k]; } d -= seg[i]; } return P[P.length - 1]; };
      B.light.style.strokeDasharray = total; B.light.style.strokeDashoffset = total; B.light.style.opacity = 1;
      c.t0 = G.t;
      await Promise.all([
        (async () => { await c.until(0.3); await c.voice('S06_haesol_11'); })(),
        (async () => {
          await c.until(0.5); c.sfx('sfx_sparkle', 0.7);
          let lastSpk = 0;
          await c.tween(0, 1, c.rm ? 1.2 : 2.6, k => {
            B.light.style.strokeDashoffset = total * (1 - k);
            if (!c.rm && k - lastSpk > 0.12) { lastSpk = k; const [x, y] = B.toScreen(...at(total * k)); burst(c, root, x, y, 5); }
          }, 'io');
          const f = B.labels.forest; if (f) { f.el.classList.add('found'); const r = f.rect, [x, y] = B.toScreen(r[0] + r[2] / 2, r[1] + r[3] / 2); c.sfx('sfx_chime', 0.6); burst(c, root, x, y, 14); }
          await c.until(4.8);
        })(),
      ]);
      B.light.style.strokeDashoffset = 0;
      off();
      if (!opts.live) await fadeOut(c, root, 0.5);
    },
  });

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
      walking = { skip: G.fast() };   // 빠르게 모드면 걷기를 바로 건너뜀
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
    const sigh = G.el('div', 'sigh', w.el, G.artImg('sigh') || '<svg viewBox="0 0 40 26"><path d="M8 20a7 7 0 0 1 2-13 9 9 0 0 1 17-1 7 7 0 0 1 5 14z" fill="#d9dcea" stroke="#6b7090" stroke-width="2"/></svg>');
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
    arrowEl = G.el('div', 'arrow', V.fx, G.arrowHtml());
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
// 프로토타입 2: 누를 곳 하나가 할 일 여러 개를 이어서 할 수 있음 (flow: flows.js, more: 이어지는 할 일),
//   after: 다른 할 일을 끝낸 뒤에 나타나는 누를 곳 (도서관 촉각 지도), randomSfx: 가끔 나는 소리 (도서관 책장 넘기는 소리)
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
  let V = null, S = null, hots = [], arrowEl = null, trailEl = null, busy = false, closeup = null, sfxOff = null;
  const missionsOf = (h) => h.mission ? [h.mission, ...(h.more || [])] : [];
  const allDone = (h) => missionsOf(h).every(m => G.st.done.includes(m));
  const shown = (h) => (!h.after || G.st.done.includes(h.after)) && (!h.afterLv || !G.lv('normal') || G.st.done.includes(h.afterLv));
  const finding = (h) => h.find && G.lv('normal') && !G.st.done.includes(h.find.done);   // 9/30 난이도: 찾아야 하는 곳
  Sc.hide = () => {
    if (!V) return;
    G.resizers.delete(onResize); G.dialog.onSpeaker = null; if (sfxOff) sfxOff(); sfxOff = null;
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
        setStar(star, allDone(h));
      }
      const btn = G.el('button', 'hot', V.fx); btn.type = 'button'; btn.setAttribute('aria-label', h.label);
      btn.style.zIndex = h.mission ? 20 : 10;
      const H = { def: h, glow, star, btn };
      G.onTap(btn, () => tapHot(H));
      hots.push(H);
      showHot(H, shown(h));
      if (h.hideLv && G.lv('normal') && !G.st.seen.includes(id + ':' + h.id)) glow.classList.add('hide');   // 보통부터: 반짝이지 않아 찾아야 함
    }
    // 보통부터: 찾기 전에는 인물 그림도 숨김 (예: 봄이 아주머니)
    for (const h of def.hotspots) if (finding(h) && V.spr[h.find.sprite]) V.spr[h.find.sprite].img.style.opacity = 0;
    if (def.randomSfx) {   // 가끔 나는 소리 (대화 중에는 쉼)
      const R = def.randomSfx; let t = 0, next = R.every[0] + Math.random() * (R.every[1] - R.every[0]);
      sfxOff = G.every(dt => { if (G.dialog.active || G.paused) return; t += dt; if (t > next) { t = 0; next = R.every[0] + Math.random() * (R.every[1] - R.every[0]); G.audio.sfx(R.name, R.vol || 0.4); } });
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
      await G.cut.play('CH:' + id, { key: id });   // 9/30 장 제목
      if (g !== G.gen) return;
      await G.cut.play(def.arrive);
      if (g !== G.gen) return;
      G.hud.hide(false);
    }
    if (!V) return;
    if (!G.st.done.includes(id + '_intro')) {
      if (def.intro) await playIntro(def);
      else { G.hud.tasks(def, true); hots.forEach(h => h.glow.classList.add('strong')); G.wait(2.5).then(() => hots.forEach(h => h.glow.classList.remove('strong'))); }
      if (g !== G.gen) return;
      G.st.done.push(id + '_intro'); G.save.write();
    }
    if (def.clueLv && G.lv('normal') && !G.st.done.includes(def.clueLv.done)) { await G.dialog.play(def.clueLv.lines); if (g !== G.gen) return; }
    setHelp();
  };
  function setStar(el, done) { el.innerHTML = G.svgDot(done); }   // 9/30: 할 일 표시는 동그라미 (별은 진짜 별에만)
  function showHot(H, on) { for (const e of [H.glow, H.star, H.btn]) if (e) e.style.display = on ? '' : 'none'; }
  // 다른 할 일을 끝내서 새로 나타나는 누를 곳: 반짝하며 나타남
  function revealHots() {
    for (const H of hots) {
      const on = shown(H.def); if (on === (H.btn.style.display !== 'none')) continue;
      showHot(H, on);
      if (on && H.def.hideLv && G.lv('normal')) { H.glow.classList.add('hide'); continue; }
      if (on) { H.glow.classList.remove('seen'); H.glow.classList.add('strong'); G.audio.sfx('sfx_sparkle', 0.5); popStar(H.star || H.glow); G.wait(3).then(() => H.glow.classList.remove('strong')); }
    }
  }
  // 할 일 하나 끝: ★ 채우기, 소리, 저장. 흐름(flows.js) 안에서도 부름
  function complete(m) {
    if (!m || G.st.done.includes(m)) return false;
    G.st.done.push(m);
    G.audio.sfx('sfx_star', 0.9);
    for (const H of hots) if (H.star && missionsOf(H.def).includes(m)) { setStar(H.star, allDone(H.def)); popStar(H.star); }
    G.hud.tasks(S, true);
    G.save.write();
    revealHots();
    return true;
  }

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
    H.glow.classList.add('seen'); H.glow.classList.remove('hide');
    if (h.louder) G.audio.ambientBoost(h.louder, true);
    if (h.flow) {
      // 할 일 여러 개가 이어지는 대화·아이템·퍼즐 (flows.js)
      try { await G.flows[h.flow]({ S, V, H, g, complete, closeup: showCloseup, hideCloseup }); } catch (e) { console.error('흐름 오류', h.flow, e); G.dialog.close(); }
      if (g !== G.gen) { busy = false; return; }
      hideCloseup();
      if (V && G.screen === 'scene') setHelp();   // 퍼즐이 도움을 바꿔 놓았을 수 있어 장면 도움으로 되돌림
    } else if (finding(h)) {
      // 찾았다! 숨어 있던 인물이 나타나고, 그 인물의 누를 곳이 열림
      await G.dialog.play(h.find.lines.slice(0, 1));
      if (g !== G.gen) { busy = false; return; }
      const sp = V && V.spr[h.find.sprite];
      if (sp) { G.audio.sfx('sfx_sparkle', 0.7); sp.img.animate && sp.img.animate([{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600, easing: 'ease-out' }); sp.img.style.opacity = 1; }
      await G.dialog.play(h.find.lines.slice(1), { partner: h.find.sprite });
      if (g !== G.gen) { busy = false; return; }
      if (!G.st.done.includes(h.find.done)) { G.st.done.push(h.find.done); G.save.write(); }
      revealHots();
    } else {
      if (h.closeup) showCloseup(h.closeup);
      await G.dialog.play(h.linesLv && G.lv('normal') ? h.linesLv : h.lines, { partner: h.partner });
      if (g !== G.gen) { busy = false; return; }
      hideCloseup();
      if (h.mission) complete(h.mission);
    }
    if (h.louder) G.audio.ambientBoost(h.louder, false);
    if (!V) { busy = false; return; }
    if (S.missions.every(m => G.st.done.includes(m)) && !G.st.cleared.includes(id)) { await G.wait(0.9); busy = false; if (g !== G.gen) return; return clear(); }
    busy = false;
  }
  function popStar(el) { el.animate && el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 700, easing: 'ease-out' }); }

  function showCloseup(kind) {
    const cu = G.$('#closeup'); cu.innerHTML = '';
    closeup = G.el('div', 'closeup', cu);
    if (kind === 'braille_book') {   // 해솔의 점자책 한 쪽: 확정된 점자 낱말 (별 / 축제)
      const bk = G.el('div', 'book-big' + (G.art('book_open') ? ' art' : ''), closeup), pg = G.el('div', 'book-page', bk);
      if (G.art('book_open')) bk.style.backgroundImage = `url("${G.art('book_open')}")`;
      for (const c of G.D.puzzles.braille1.book) G.el('div', 'book-line', pg, G.braille.svg(c, 30));
      closeup.animate && closeup.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
      return;
    }
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
  function target() { return hots.find(h => finding(h.def)) || hots.find(h => h.def.mission && shown(h.def) && !allDone(h.def)); }
  function clearHint() {
    if (arrowEl) arrowEl.remove(); if (trailEl) trailEl.remove(); arrowEl = trailEl = null;
    hots.forEach(h => h.glow.classList.remove('strong'));
  }
  function setHelp() {
    if (S && S.missions.every(m => G.st.done.includes(m))) { G.help.off(); return; }
    if (G.screen !== 'scene') return;
    G.help.set({
      l1: () => { const t = target(); const hn = t && (finding(t.def) ? t.def.find.hint : t.def.hint); if (hn) G.hud.say(hn); },
      l2: () => {
        const t = target(); if (!t || arrowEl || !V) return; const r = t.def.rect;
        arrowEl = G.el('div', 'arrow', V.fx, G.arrowHtml());
        Object.assign(arrowEl.style, { left: (r[0] + r[2] / 2) + 'px', top: (r[1] - 40) + 'px', zIndex: 30 });
      },
      l3: () => {
        const t = target(); if (!t || !V) return;
        t.glow.classList.remove('seen', 'hide'); t.glow.classList.add('strong');
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
  Sc.setHelp = () => { if (V) setHelp(); };
  Sc.sprite = (id) => V && V.spr[id];
  return Sc;
})();

/* ---- puzzle.js ---- */
// puzzle.js — 퍼즐 화면 (U7). 퍼즐 1 (GDD 5-1): 촉각 지도에서 점자 이름표 「숲」 찾기
// 촉각 지도를 정면에서 크게. 위쪽에 해솔 얼굴과 지금 할 일, 아래쪽 대화창은 공용 (인물 그림 없이)
// 9/30: 점자를 모르는 학생을 위해 해솔이 먼저 점자를 알려 주고(점 자리 여섯, 볼록한 점) 「숲」 점자 카드를 보여 줌.
//       카드는 오른쪽에 계속 있고, 지도에서 카드와 같은 모양의 이름표를 찾음. 맞히면 칸마다 같은 점이 함께 빛남
// 이름표를 누르면 해솔이 읽어 줌. 숲이 아니면 "점 모양이 달라. 카드랑 다시 비교해 볼까?" (틀림 소리·표시 없음). 숲이면 연출 C8
// [크게 보기]: 네 이름표를 크게 모아 보여 줌 (작은 화면에서도 점이 잘 보이고 누르기 쉽게)
// 퍼즐 화면은 #world 층 안에 그려 대화창(#dialog)이 늘 그 위에 옴
'use strict';
G.puzzle = (() => {
  const Pz = {};
  const DOT = 24;   // 판 위 점 사이 거리 (판 1600x900 기준)
  const PAD = [28, 24];   // 이름표 판 안쪽 여백

  // ---- 촉각 지도 판 (연출 C8 다시 보기도 같이 씀) ----
  Pz.board = (parent, id) => {
    const D = G.D.puzzles[id], [W, H] = D.size;
    const B = { D, W, H, labels: {} };
    const el = B.el = G.el('div', 'tboard', parent); el.style.width = W + 'px'; el.style.height = H + 'px';
    const ns = 'http://www.w3.org/2000/svg';
    const svg = B.svg = document.createElementNS(ns, 'svg'); svg.setAttribute('class', 'troads'); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('width', W); svg.setAttribute('height', H);
    const pl = (pts, cls) => { const p = document.createElementNS(ns, 'polyline'); p.setAttribute('points', pts.map(q => q.join(',')).join(' ')); p.setAttribute('class', cls); svg.appendChild(p); return p; };
    for (const r of D.roads) { pl(r, 'road-sh'); pl(r, 'road'); pl(r, 'road-hi'); }
    B.light = pl(D.lightPath, 'road-light');
    el.appendChild(svg);
    const bimg = G.art('tactile_board'); if (bimg) { el.classList.add('art'); el.style.backgroundImage = `url("${bimg}")`; }   // 9/30: 선생님 판 그림 (길·장소 자리는 그림에 맞춰 puzzles.json 좌표를 고침)
    for (const k in D.nodes) { const n = G.el('div', 'tnode', el); n.style.left = D.nodes[k][0] + 'px'; n.style.top = D.nodes[k][1] + 'px'; }
    for (const L of D.labels.filter(l => G.lv(l.lv))) {   // 9/30 난이도: 보통부터 이름표가 늘어남
      const [w, h] = G.braille.size(L.cells, DOT);
      const pw = w + PAD[0] * 2, ph = h + PAD[1] * 2;
      const plate = G.el('div', 'tlabel', el, G.braille.svg(L.cells, DOT));
      Object.assign(plate.style, { left: L.at[0] + 'px', top: L.at[1] + 'px', width: pw + 'px', height: ph + 'px' });
      B.labels[L.id] = { def: L, el: plate, rect: [L.at[0], L.at[1], pw, ph] };
    }
    // 판을 주어진 네모 안에 맞춤 (화면 좌표)
    B.fit = (x, y, w, h) => {
      const k = Math.min(w / W, h / H); B.k = k; B.x = x + (w - W * k) / 2; B.y = y + (h - H * k) / 2;
      el.style.transform = `translate(${B.x.toFixed(1)}px,${B.y.toFixed(1)}px) scale(${k.toFixed(4)})`;
    };
    B.toScreen = (bx, by) => [B.x + bx * B.k, B.y + by * B.k];
    return B;
  };

  // ---- 퍼즐 한 판 ----
  Pz.play = (id) => new Promise(async (finish) => {
    const D = G.D.puzzles[id], g = G.gen, ok = () => g === G.gen;
    const back = { music: (G.D.scenes[G.st.place] || {}).music, screen: G.screen };
    G.screen = 'puzzle'; G.hud.hide(true); G.help.off();
    G.audio.music('music_puzzle');
    const root = G.el('div', 'puzzle', G.$('#world'));
    const B = Pz.board(root, id);
    // 위쪽: 해솔 얼굴 + 지금 할 일 / 크게 보기
    const top = G.el('div', 'pz-top', root);
    const face = G.el('div', 'pz-face', top); const faceImg = G.el('div', 'pz-face-img', face); G.el('span', '', face, '해솔');
    const setFace = (q) => { const P = G.D.portraits.haesol; faceImg.style.backgroundImage = `url("${G.asset((P.poses && P.poses[q]) || P.img)}")`; };
    setFace('01');
    const task = G.el('button', 'quest pz-task', top); task.type = 'button';
    G.el('div', 'q2', task, (G.D.dialogues[D.task] || {}).text || '');
    G.onTap(task, () => G.audio.voice(D.task));
    const say = G.el('div', 'pz-say', top); say.style.display = 'none';
    const tr = G.el('div', 'pz-tr', root);
    const zoomBtn = G.btn('pill', G.icon('icon_zoom') + ' 크게 보기', tr, () => openZoom(), '크게 보기');
    const bl = G.el('div', 'pz-bl', root);
    const lumiB = G.el('button', 'lumi-btn', bl); lumiB.type = 'button'; lumiB.setAttribute('aria-label', '루미 도움');
    const li = G.el('img', '', lumiB); li.src = G.asset('assets/chars/lumi.png'); li.alt = ''; G.el('span', '', lumiB, '루미');
    G.onTap(lumiB, () => G.help.now());
    // 이름표 누르는 곳: 판 위 이름표 자리에 화면 좌표로 (휴대폰에서도 손가락 크기 이상)
    const hits = {};
    for (const k in B.labels) {
      const b = G.el('button', 'pz-hit', root); b.type = 'button'; b.setAttribute('aria-label', '점자 이름표');
      G.onTap(b, () => tapLabel(k)); hits[k] = b;
    }
    // 해솔의 점자 카드 (같은 모양 찾기의 보기). 처음엔 가운데 크게 → 설명이 끝나면 오른쪽으로
    const CL = D.card && D.labels.find(l => l.id === D.card);
    const card = CL ? G.el('div', 'pz-card', root) : null;
    if (card) {
      G.el('div', 'pz-card-head', card, '해솔의 점자 카드');
      G.el('div', 'pz-card-dots', card, G.braille.svg(CL.cells, 40));
      G.el('div', 'pz-card-word', card, `<span class="q">?</span><span class="w">${CL.word}</span>`);   // 글자는 같은 모양을 찾은 뒤에 보여 줌 (9/30 선생님)
      card.style.display = 'none';
    }
    let talking = false, busy = false, done = false, arrow = null, zoom = null;
    function layout() {
      const { W, H, u } = G.stage;
      const topH = top.getBoundingClientRect().bottom + u * 12;
      const dlg = G.dialog.active ? (G.$('.dlg-box') ? H - G.$('.dlg-box').getBoundingClientRect().top + u * 16 : H * 0.3) : Math.max(u * 30, 10);
      const side = Math.max(u * 30, 10);
      // 카드가 오른쪽에 있으면 그만큼 지도 판을 왼쪽으로
      let cw = 0;
      if (card && card.classList.contains('side') && card.style.display !== 'none') {
        const bh = Math.max(60, H - topH - dlg);
        card.style.top = topH + 'px'; card.style.maxHeight = bh + 'px';
        cw = card.getBoundingClientRect().width + side * 0.6;
      }
      B.fit(side, topH, W - side * 2 - cw, Math.max(60, H - topH - dlg));
      const min = 72;
      for (const k in B.labels) {
        const r = B.labels[k].rect, [x, y] = B.toScreen(r[0], r[1]), w = r[2] * B.k, h = r[3] * B.k;
        const ww = Math.max(w, min), hh = Math.max(h, min);
        Object.assign(hits[k].style, { left: (x - (ww - w) / 2) + 'px', top: (y - (hh - h) / 2) + 'px', width: ww + 'px', height: hh + 'px' });
      }
      if (arrow) placeArrow();
    }
    let lastDlg = null;
    const watch = G.every(() => { if (!ok()) { watch(); G.resizers.delete(layout); return; } const a = G.dialog.active; if (a !== lastDlg) { lastDlg = a; root.classList.toggle('talk', !!a); requestAnimationFrame(layout); } });
    G.resizers.add(layout); layout(); requestAnimationFrame(layout);
    const opts = { partner: 'haesol', noPortraits: true };
    const talk = async (ids, extra = {}) => {
      talking = true;
      G.dialog.onLine = (lid) => { const q = ((G.D.poses || {})[lid] || {}).haesol; if (q) setFace(q); if (extra.onLine) extra.onLine(lid); };
      await G.dialog.play(ids, Object.assign({}, opts, extra.keep ? { keep: true } : {}));
      G.dialog.onLine = null; talking = false; setFace('01');
    };
    function select(k) {
      for (const j in B.labels) B.labels[j].el.classList.toggle('sel', j === k);
    }
    async function tapLabel(k) {
      if (busy || done || !ok()) return;
      busy = true; clearHint(); closeZoom();
      const L = B.labels[k].def;
      G.audio.sfx('sfx_tap', 0.5); select(k);
      if (L.answer) { done = true; await success(L); return; }
      if (card) card.classList.add('look');
      await talk(G.lv('normal') ? [D.wrong] : [L.line, D.wrong]);   // 보통부터는 이름을 읽어 주지 않음 (모양을 비교해야 함)
      if (card) card.classList.remove('look');
      busy = false;
    }
    // ---- 크게 보기: 네 이름표를 크게 ----
    function openZoom() {
      if (busy || done || zoom) return;
      G.audio.voice('S92_btn_zoom', '크게 보기');   // 음성 파일이 없으면 브라우저 음성 (다음 음성 만들 때 추가)
      zoom = G.el('div', 'pz-zoom', root);
      const main = G.el('div', 'pz-zmain', zoom);   // 9/30: 카드는 왼쪽, 이름표는 오른쪽 (이름표가 6개여도 한 화면에)
      if (CL) { const zc = G.el('div', 'pz-card pz-zcard', main); G.el('div', 'pz-card-dots', zc, G.braille.svg(CL.cells, 40)); G.el('div', 'pz-card-word', zc, '?'); }
      const grid = G.el('div', 'pz-zgrid', main); grid.style.setProperty('--zrows', Math.ceil(Object.keys(B.labels).length / 2));
      for (const k in B.labels) {
        const L = B.labels[k].def;
        const b = G.btn('pz-zlabel', G.braille.svg(L.cells, 40), grid, () => tapLabel(k), '점자 이름표');
        if (B.labels[k].el.classList.contains('hint')) b.classList.add('hint');
      }
      const row = G.el('div', 'btn-row', zoom);
      G.btn('pill gold', G.icon('icon_ok') + ' 닫기', row, () => closeZoom(), '닫기');
      fitZoom(); G.resizers.add(fitZoom);
    }
    // 9/30: 아주 낮은 휴대폰 화면에서 이름표 위쪽이 잘리지 않게, 넘치면 카드·이름표 묶음을 그만큼 줄임
    function fitZoom() {
      if (!zoom) return; const main = zoom.querySelector('.pz-zmain'); main.style.zoom = '';
      const cs = getComputedStyle(zoom), row = zoom.querySelector('.btn-row'), h = main.getBoundingClientRect().height;
      const need = h + (row ? row.getBoundingClientRect().height : 0) + parseFloat(cs.rowGap || 0) + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const over = need - zoom.clientHeight;
      if (over > 0 && h > 0) main.style.zoom = Math.max(0.4, (h - over - 8) / h);
    }
    function closeZoom() { if (zoom) { zoom.remove(); zoom = null; G.resizers.delete(fitZoom); } }
    // ---- 도움 (5-1): 30초 "숲은 한 글자라서 이름표가 제일 짧아" → 60초 숲 이름표가 은은하게 빛남 → 90초·루미 해솔이 가리킴 ----
    const ans = Object.keys(B.labels).find(k => B.labels[k].def.answer);
    async function bubble(lid) {
      const L = G.D.dialogues[lid]; if (!L) return;
      say.textContent = L.text; say.style.display = ''; const q = ((G.D.poses || {})[lid] || {}).haesol; if (q) setFace(q);
      await G.audio.voice(lid); await G.wait(1.2);
      if (say.textContent === L.text) say.style.display = 'none';
      if (!talking) setFace('01');
    }
    function placeArrow() {
      const r = B.labels[ans].rect, [x, y] = B.toScreen(r[0] + r[2] / 2, r[1]);
      Object.assign(arrow.style, { left: x + 'px', top: y + 'px' });
    }
    function clearHint() {
      if (arrow) arrow.remove(); arrow = null;
      for (const k in B.labels) B.labels[k].el.classList.remove('hint');
      say.style.display = 'none';
    }
    const setHelp = () => G.help.set({
      l1: () => bubble(G.lv('normal') && D.hint1Lv ? D.hint1Lv : D.hint1),
      l2: () => { B.labels[ans].el.classList.add('hint'); },
      l3: () => {
        B.labels[ans].el.classList.add('hint');
        if (!arrow && !G.lv('hard')) { arrow = G.el('div', 'arrow pz-arrow', root, G.arrowHtml()); placeArrow(); }   // 어렵게: 화살표 없음
        bubble(D.hint3);
      },
      clear: clearHint,
    });
    // ---- 성공: "맞아! 이게 숲이야" → C8 (볼록한 길이 도서관에서 숲까지 빛남) → 숲 점자를 크게 한 번 더 ----
    async function success(L) {
      G.help.off();
      B.labels[L.id].el.classList.add('found');
      G.audio.sfx('sfx_sparkle', 0.7);
      // 카드와 이름표의 같은 칸이 차례로 함께 빛남 → "봐, 점 모양이 카드랑 똑같지?"
      if (card) {
        card.classList.add('match');
        const a = [...card.querySelectorAll('.pz-card-dots rect')], b = [...B.labels[L.id].el.querySelectorAll('rect')];
        (async () => { for (let i = 0; i < a.length; i++) { a[i].classList.add('on'); if (b[i]) b[i].classList.add('on'); G.audio.sfx('sfx_chime', 0.25); await G.wait(0.45); } })();
      }
      await talk(D.match ? [D.match, L.line] : [L.line], { onLine: (lid) => { if (card && lid === L.line) card.classList.add('show-word'); } }); if (!ok()) return end(false);
      if (card) card.style.display = 'none';
      await G.cut.play('C8', { live: B });
      if (!ok()) return end(false);
      G.hud.hide(true);   // 연출이 끝나며 켠 모서리 버튼을 퍼즐 동안 다시 숨김
      let big = null;
      await talk(D.after, { onLine: (lid) => {
        if (lid === D.after[D.after.length - 1] && !big) {
          big = G.el('div', 'pz-big', root);
          G.el('div', 'pz-big-dots', big, G.braille.svg(L.cells, 60));
          G.el('div', 'pz-big-word', big, L.word);
          big.animate && big.animate([{ opacity: 0, transform: 'translate(-50%,-50%) scale(.7)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], { duration: 500, easing: 'ease-out' });
          G.audio.sfx('sfx_chime', 0.5);
        }
      } });
      end(ok());
    }
    function end(won) {
      watch(); G.resizers.delete(layout); G.help.off(); G.dialog.onLine = null;
      root.remove();
      if (ok()) { G.screen = back.screen || 'scene'; G.hud.hide(false); if (back.music) G.audio.music(back.music); }
      finish(won);
    }
    // ---- 시작: 해솔이 소리 단서를 말하고, 숲 이름표를 같이 찾자고 함 (이름표 4개가 반짝) ----
    busy = true;
    await talk(D.start, { keep: !!D.teach }); if (!ok()) return end(false);
    // 점자 알려 주기: 카드가 가운데 크게 → 점 자리 여섯 → 볼록한 점 → "이게 숲" → 오른쪽으로 옮기고 이름표 4개가 반짝
    const T = D.teach || [];
    if (card) { card.style.display = ''; card.classList.add('center'); card.animate && card.animate([{ opacity: 0, transform: 'translate(-50%,-50%) scale(.7)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], { duration: 450, easing: 'ease-out' }); }
    await talk(T, { onLine: (lid) => {
      if (!card) return;
      card.classList.toggle('show-empty', lid === T[1]);
      card.classList.toggle('show-raised', lid === T[2]);
      if (lid === T[T.length - 1]) {
        card.classList.remove('center'); card.classList.add('side'); layout();
        for (const k in B.labels) { const e = B.labels[k].el; e.classList.add('shine'); G.wait(2.4).then(() => e.classList.remove('shine')); }
      }
    } });
    if (card) { card.classList.remove('center', 'show-empty', 'show-raised'); card.classList.add('side'); layout(); }
    if (!ok()) return end(false);
    busy = false; setHelp();
  });
  return Pz;
})();

/* ---- flows.js ---- */
// flows.js — 누를 곳 하나에서 할 일 여러 개가 이어지는 대화 (프로토타입 2)
// 시장: 봄이 아주머니와의 한 대화 안에서 할 일 3개 (GDD 4-2, 저학년이 헤매지 않게)
// 도서관: 해솔 사서 대화 → 촉각 지도 받기 → 퍼즐 1 (GDD 4-3)
// 할 일을 하나 끝낼 때마다 저장하므로, 중간에 멈춰도 다시 누르면 남은 부분부터 이어서 함
// G.present: 아이템 얻기 카드, 퀘스트 알림, 알게 된 것 카드 (모두 #overlay 층 = 인물 그림·대화창보다 위)
'use strict';
// 화면 글자: 주아체에 없는 「」는 “”로 바꿔 보여 줌 (읽어 주는 음성은 그대로)
G.txt = (id) => ((G.D.dialogues[id] || {}).text || '').replace(/「/g, '“').replace(/」/g, '”');

G.present = (() => {
  const P = {};
  const card = (cls) => { const ov = G.$('#overlay'); const m = G.el('div', 'modal ' + cls, ov); const sh = G.el('div', 'sheet', m); return { m, sh }; };
  // [다음] 버튼: 음성이 끝나면 켜짐 (대화창과 같은 규칙). 누르면 끝
  function nextRow(sh, first) {
    const row = G.el('div', 'btn-row', sh);
    const b = G.btn('pill gold dlg-next wait', '다음 ' + G.icon('icon_next'), row, null, '다음'); b.disabled = true;
    let res; const p = new Promise(r => res = r);
    if (G.fast()) first = Promise.resolve();   // 빠르게 모드: 바로 [다음]
    first.then(() => { b.disabled = false; b.classList.remove('wait'); b.classList.add('ready'); });
    G.onTap(b, () => { if (b.disabled) return; G.audio.sfx('sfx_tap', 0.5); G.audio.stopVoice(); res(); });
    return p;
  }
  // 반짝이 가루 (화면 좌표)
  function sparkle(x, y, n = 12) {
    if (G.settings && G.settings.light) n = 5;
    const ov = G.$('#overlay');
    for (let i = 0; i < n; i++) {
      const s = G.el('div', 'spk', ov, G.sparkle()); s.style.left = x + 'px'; s.style.top = y + 'px';
      const a = Math.PI * 2 * i / n, R = G.stage.u * (140 + Math.random() * 120);
      G.tween(0, 1, 1.1, k => { s.style.transform = `translate(${Math.cos(a) * R * k}px,${Math.sin(a) * R * k}px) scale(${1 - k * 0.6})`; s.style.opacity = 1 - k; }, 'out').then(() => s.remove());
    }
  }

  // ---- 아이템 얻기: 큰 그림 + "마을 지도를 얻었어요!" + 설명 → [다음] → 그림이 가방으로 날아감 ----
  P.item = async (id) => {
    const it = G.D.items.find(x => x.id === id); if (!it) return;
    const g = G.gen; G.busy++;
    if (!G.st.items.includes(id)) { G.st.items.push(id); G.save.write(); }
    const { m, sh } = card('get');
    const pic = G.el('div', 'get-pic', sh, G.icon(it.icon));
    G.el('div', 'get-title', sh, G.txt('S92_get_' + id));
    G.el('div', 'get-desc', sh, G.txt(it.voice));
    G.audio.sfx('sfx_sparkle', 0.7);
    pic.animate && pic.animate([{ transform: 'scale(.3) rotate(-20deg)', opacity: 0 }, { transform: 'scale(1.15)', opacity: 1, offset: .7 }, { transform: 'scale(1)' }], { duration: 700, easing: 'ease-out' });
    requestAnimationFrame(() => { const r = pic.getBoundingClientRect(); sparkle(r.left + r.width / 2, r.top + r.height / 2); });
    const v1 = G.audio.voice('S92_get_' + id);   // "…을 얻었어요!"가 끝나면 [다음]이 켜지고 설명도 읽어 줌
    v1.then(() => { if (g === G.gen && m.isConnected) G.audio.voice(it.voice); });
    await nextRow(sh, v1);
    if (g !== G.gen) return;
    // 가방으로 날아가기
    const r0 = pic.getBoundingClientRect(), bag = [...document.querySelectorAll('#hud .pill')].find(b => b.getAttribute('aria-label') === '가방');
    m.remove();
    if (bag && !G.reduced()) {
      const r1 = bag.getBoundingClientRect(), fly = G.el('div', 'get-fly', G.$('#overlay'), G.icon(it.icon));
      Object.assign(fly.style, { left: r0.left + 'px', top: r0.top + 'px', width: r0.width + 'px', height: r0.height + 'px' });
      const dx = r1.left + r1.width * 0.2 - r0.left, dy = r1.top + r1.height / 2 - (r0.top + r0.height / 2), k1 = Math.min(1, (r1.height * 0.9) / r0.height);
      await G.tween(0, 1, 0.7, k => { fly.style.transform = `translate(${dx * k}px,${dy * k - Math.sin(k * Math.PI) * 80 * G.stage.u}px) scale(${1 + (k1 - 1) * k})`; }, 'io');
      fly.remove();
      bag.animate && bag.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 400 });
      G.audio.sfx('sfx_chime', 0.4);
    }
    G.busy = Math.max(0, G.busy - 1);
  };

  // ---- 퀘스트 알림: 화면 위쪽 가운데에 "길의 별 찾기 2/5 해냈어요!" + 퀘스트 이름, 읽어 준 뒤 사라짐 ----
  P.quest = async (n) => {
    const g = G.gen; G.busy++;
    const ov = G.$('#overlay'), b = G.el('div', 'quest-banner', ov);
    G.el('div', 'qb1', b, '길의 별 찾기 ' + n + '/5 해냈어요!');
    G.el('div', 'qb2', b, G.txt('S92_quest_' + n));
    G.audio.sfx('sfx_chime', 0.6);
    b.animate && b.animate([{ transform: 'translate(-50%,-120%)', opacity: 0 }, { transform: 'translate(-50%,0)', opacity: 1 }], { duration: 450, easing: 'ease-out' });
    await G.audio.voice('S92_quest_' + n); await G.wait(1.2);
    if (b.isConnected && b.animate) await b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400 }).finished.catch(() => { });
    b.remove();
    if (g === G.gen) { G.busy = Math.max(0, G.busy - 1); G.hud.refreshQuest(); }
  };

  // ---- 알게 된 것: "알게 된 것" + 내용 카드 → [다음] ----
  P.info = async (id) => {
    const g = G.gen; G.busy++;
    const t = G.txt(id), i = t.indexOf(':');
    const { m, sh } = card('info');
    G.el('div', 'info-head', sh, G.icon('icon_star') + ' ' + (i > 0 ? t.slice(0, i) : '알게 된 것'));
    G.el('div', 'info-body', sh, i > 0 ? t.slice(i + 1).trim() : t);
    G.audio.sfx('sfx_chime', 0.5);
    await nextRow(sh, G.audio.voice(id));
    m.remove();
    if (g === G.gen) G.busy = Math.max(0, G.busy - 1);
  };
  return P;
})();

G.flows = (() => {
  const F = {};
  const done = (m) => G.st.done.includes(m);
  const opt = (id, icon) => ({ label: G.txt(id), icon, voice: id });

  // ---- 시장: 봄이 아주머니 (할 일 1 인사 → 2 무엇을 물어볼까? 선택지 3개 → 3 마을 지도 받기) ----
  F.market_bom = async ({ complete, g }) => {
    const ok = () => g === G.gen, P = { partner: 'bom', keep: true };
    if (!done('market_bom')) {
      await G.dialog.play(['S04_bom_01', 'S04_bom_02'], P); if (!ok()) return;
      complete('market_bom');
    }
    if (!done('market_ask')) {
      await G.dialog.play(['S04_rumi_01'], P); if (!ok()) return;
      // 무엇을 물어도 괜찮음: 고른 질문에 봄이 아주머니가 대답하고, 모두 해솔 사서 이야기로 이어짐
      const i = await G.dialog.choose([opt('S04_opt_01', 'icon_star'), opt('S04_opt_02', 'opt_road'), opt('S04_opt_03', 'opt_apple')], true); if (!ok()) return;
      await G.dialog.play([['S04_bom_03', 'S04_bom_04', 'S04_bom_05'][i]], P); if (!ok()) return;
      complete('market_ask');
    }
    if (!done('market_map')) {
      await G.dialog.play(['S04_bom_06', 'S04_bom_07', 'S04_bom_08', 'S04_bom_09'], P); if (!ok()) return;
      G.dialog.close();
      await G.present.item('map'); if (!ok()) return;
      await G.dialog.play(['S04_bom_10', 'S04_rumi_02'], { partner: 'bom' }); if (!ok()) return;
      complete('market_map');
    }
    G.dialog.close();
  };

  // ---- 도서관: 해솔 사서 (점자책 보여 주기 → 주인공 질문 버튼) ----
  F.library_haesol = async ({ complete, closeup, hideCloseup, g }) => {
    const ok = () => g === G.gen;
    G.dialog.onLine = (lid) => { if (lid === 'S05_haesol_03') closeup('braille_book'); if (lid === 'S05_haesol_04') hideCloseup(); };
    await G.dialog.play(['S05_haesol_01', 'S05_haesol_02', 'S05_haesol_03', 'S05_rumi_01', 'S05_haesol_04', 'S05_rumi_02'], { partner: 'haesol', keep: true });
    G.dialog.onLine = null; hideCloseup(); if (!ok()) return;
    await G.dialog.choose([opt('S05_ply_01', 'opt_night')], true); if (!ok()) return;
    await G.dialog.play(['S05_haesol_05', 'S05_haesol_06'], { partner: 'haesol' }); if (!ok()) return;
    complete('library_haesol');
  };

  // ---- 도서관: 촉각 지도 (할 일 2 아이템, 퀘스트 2/5) → 퍼즐 1 (할 일 3, 퀘스트 3/5) ----
  F.library_tactile = async ({ complete, g }) => {
    const ok = () => g === G.gen;
    if (!done('library_tactile')) {
      await G.dialog.play(['S05_haesol_07', 'S05_haesol_08', 'S05_haesol_09'], { partner: 'haesol' }); if (!ok()) return;
      await G.present.item('tactile'); if (!ok()) return;
      complete('library_tactile');
      G.st.quest = Math.max(G.st.quest, 2); G.save.write();
      await G.present.quest(2); if (!ok()) return;
    }
    if (!done('library_puzzle')) {
      const won = await G.puzzle.play('braille1'); if (!ok() || !won) return;
      G.st.quest = Math.max(G.st.quest, 3);
      complete('library_puzzle');
      await G.present.info('S92_info_01'); if (!ok()) return;
      await G.present.quest(3);
    }
  };
  return F;
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
    G.el('div', 't-help', p, '게임은 잠시 멈춰 있어요. ' + (G.st ? `지금 칸: ${G.st.slot}번${G.st.name ? ' (' + G.save.esc(G.st.name) + ')' : ''}` : '아직 칸을 고르지 않았어요.') + ' (프로토타입 2)');

    // 빠르게 모드 (9/30 선생님 요청, 청선별GO처럼): 대화·연출·걷기를 바로 넘길 수 있게
    let s = sec(p, '빠르게 모드 (선생님 확인·시연용)');
    choice(s, 'fast', [[false, '끄기'], [true, '켜기']]);
    G.el('div', 't-note', s, '켜면 음성이 끝나기 전에도 [다음]을 누를 수 있고, 연출은 처음부터 [건너뛰기]가 보이며, 지도에서 걷기는 바로 도착해요. 선택지는 한 번 누르면 골라져요. 학생이 할 때는 꺼 주세요.');

    // 난이도 (9/30 선생님 요청): 반마다 고름
    s = sec(p, '난이도');
    choice(s, 'level', [['easy', '쉽게'], ['normal', '보통'], ['hard', '어렵게']]);
    G.el('div', 't-note', s, '쉽게: 이름표 4개, 누르면 이름을 읽어 줌, 봄이 아주머니가 바로 보임. 보통: 이름표 5개, 카드와 모양을 비교해야 함, 시장에서 봄이 아주머니 가게를 찾음, 도서관에서 촉각 지도를 찾음. 어렵게: 이름표 6개, 도움 화살표 없음.');

    s = sec(p, '1. 음성과 음량');
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
    G.el('div', 't-note', s, G.st ? '고른 곳 앞까지의 할 일, 아이템, 마을 단계가 채워진 채로 시작해요. 5~7은 다음 프로토타입에서 열려요.' : '먼저 저장 칸 번호를 고른 뒤에 쓸 수 있어요.');

    s = sec(p, '6. 연출');
    r = row(s); G.el('span', '', r, '다시 보기:');
    for (const [id, label] of [['C1', 'C1 인트로'], ['C2', 'C2 광장 도착'], ['C3', 'C3 시장 도착'], ['C4', 'C4 도서관 도착'], ['C8', 'C8 점자 길 빛남'], ['C7', 'C7 장소 완료']]) tb(label, r, () => T.close(() => { if (!G.cut.active) G.cut.play(id, { replay: true }); }));
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
  T.fs = fullscreen;
  // 9/30 선생님: 휴대폰·태블릿에서 ESC 대신 누르는 [선생님 설정] 버튼 (왼쪽 가장자리 가운데). icon_teacher.png가 오면 그림, 없으면 글자
  if (matchMedia('(pointer: coarse)').matches) {
    const b = G.el('button', 'tbtn', G.$('#game')); b.type = 'button'; b.setAttribute('aria-label', '선생님 설정'); b.textContent = '설정';
    const im = new Image(); im.alt = ''; im.onload = () => { b.textContent = ''; b.appendChild(im); }; im.src = G.asset('assets/ui/icons/icon_teacher.png');
    b.addEventListener('click', (e) => { e.stopPropagation(); T.toggle(); });
  }
  return T;
})();

/* ---- main.js ---- */
// main.js — 시작과 흐름: 타이틀(U1) → 저장 칸 번호 고르기(U2) → 이름 → 인트로 C1 → 루미 만남 → 마을 지도
'use strict';
G.VERSION = '프로토타입 2 (2026-09-30)';
G.defaults = { volume: 0.9, voiceOn: true, textBig: false, help: 'normal', choiceOne: false, reduceMotion: false, reduceAuto: true, hideSkip: false, fast: false, level: 'normal', slotCount: 12, light: false };
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
    if (matchMedia('(pointer: coarse)').matches) G.teacher.fs(true);   // 9/30 선생님: 휴대폰에서는 처음 누를 때 전체 화면 (아이폰 사파리는 지원 안 함 → 홈 화면에 추가)
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
    await G.cut.play('CH:intro', { key: 'intro' });   // 9/30 장 제목 "제 1 장 별이 사라진 밤"
    if (g !== G.gen) return;
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
    if (id === 'library') {   // 시장까지 끝, 마을 지도를 가진 채로 도서관 앞 (프로토타입 2)
      st.done.push('plaza_intro', 'plaza_chief', 'plaza_board', 'plaza_post', 'market_intro', 'market_bom', 'market_ask', 'market_map');
      st.cleared.push('plaza', 'market'); st.items.push('map');
      st.seenCutscenes.push('C2', 'C3', 'C7'); st.visited.push('plaza', 'market'); st.mood = 2; st.quest = 1; st.place = 'market';
      st.seen.push('plaza:chief', 'plaza:board', 'plaza:post', 'market:bom');
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
