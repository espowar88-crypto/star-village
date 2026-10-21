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
// 10/12 선생님(픽셀랩 인물 결정판 review/pixellab1012): 별을 찾기 전엔 모두 무표정, 그 별 이야기 인물부터 밝은 표정으로 바뀌고 별이 늘수록 밝은 주민이 늘어남.
//  밝은 그림은 walk_<id>_lit.png(_live), 장면 인물 그림은 <그림>_lit.png(_b·_k·_bk). 숫자 = 그 인물이 밝아지는 별 수 (없으면 늘 무표정)
G.LIT = { hero: 1, chief: 1, post: 1, haesol: 1, daon: 1, duri: 2, miru: 2, v1: 2, moa: 3, bau: 3, harang: 3, v3: 3, v4: 3, v8: 3, seoyeon: 3, nuri: 4, maru: 4, yunseul: 4, v2: 4, suhyeon: 5, soyul: 5, gureum: 5, seungsam: 6, bori: 6, seoyeon6: 6 };
// 10/15 선생님(인물 연령별 키): 어른 키는 그대로(1), 청소년·초등 아이 0.85, 유아 0.65. 그림 파일은 그대로 두고 그릴 때만 발 기준으로 줄임
//  지도(mapview.js 걷는 사람), 장면(scene.js 서 있는 그림·걷기·빛 테두리·표식·그림자) 모두 G.ageScale 하나를 씀. 누를 곳(단추) 크기는 그대로
//  나이는 픽셀랩 그림을 만들 때 적은 설명(검토/픽셀랩128_1012/원본/도구/descs.py)을 따름. 여기 없는 인물은 어른 크기(1)
G.CHARACTER_AGE_SCALE = { adult: 1, teen: 0.85, toddler: 0.65 };
G.CHAR_AGE = {
  hero: 'teen', daon: 'teen', suhyeon: 'teen', miru: 'teen', harang: 'teen', nuri: 'teen', v5: 'teen',   // 주인공 14살, 다온 10살, 수현 11살, 미루·하랑·누리는 초등 아이, 이든(v5)은 '마을 학생'(names.py)
  chaei: 'toddler', soyul: 'toddler',                                                        // 채이(아기), 소율 5살
  chief: 'adult', post: 'adult', haesol: 'adult', duri: 'adult', bau: 'adult', moa: 'adult', maru: 'adult', yunseul: 'adult', seoyeon: 'adult', gureum: 'adult', seungsam: 'adult', bori: 'adult', seoyeon6: 'adult',
  v1: 'adult', v2: 'adult', v3: 'adult', v4: 'adult', v6: 'adult', v8: 'adult',
};
//  그림 자체가 다른 인물보다 작게 그려진 것(채이: 점 하나=시트 한 칸, 다른 인물 키 238px의 117px) → 연령 배율을 낼 때 나눠서 맞춤
G.CHAR_ART_HEIGHT = { chaei: 117 / 238 };
//  id 또는 그림 주소(walk_<id>.png, 장면 인물 id 'g_v4'·'bauFar'·'suhyeon2')로 배율을 냄
G.charId = (s) => { if (!s) return ''; const m = /walk_([a-z0-9]+)/.exec(s); if (m) return m[1]; const id = String(s).replace(/^g_/, ''); return G.CHAR_AGE[id] ? id : id.replace(/(Far|\d)$/, ''); };
G.ageScale = (s) => { const id = G.charId(s), a = G.CHAR_AGE[id]; return a ? G.CHARACTER_AGE_SCALE[a] / (G.CHAR_ART_HEIGHT[id] || 1) : 1; };
// 10/15 선생님(픽셀 배경 통합): 화면 배율(그림 1점 → 기기 점)이 정수에서 15% 안이면 정수로 맞춤. 더 멀면 그대로(화면 구성이 크게 바뀌지 않게)
G.pixSnap = (ws, z) => { const d = window.devicePixelRatio || 1, sd = ws * z * d, n = Math.round(sd); return n >= 1 && Math.abs(n - sd) <= sd * 0.15 ? n / (d * ws) : z; };
G.lit = (id) =>((G.st && G.st.stars) || 0) >= (G.LIT[id] || 99);
G.litPath = (p) => {
  if (typeof p !== 'string' || !G.st || !G.st.stars) return p;
  let m = /^(.*\/walk_)([a-z0-9]+)((?:_live(?:_h)?)?\.png)$/.exec(p); if (m) return G.lit(m[2]) ? m[1] + m[2] + '_lit' + m[3] : p;
  m = /^(assets\/scenes\/.+?)((?:_b|_k|_bk)?\.png)$/.exec(p); const who = m && ((G.D || {}).sceneLive || {})[m[1] + '.png'];
  return who && G.lit(who) ? m[1] + '_lit' + m[2] : p;
};
G.asset = (p) => { p = G.litPath(p); return (window.EMBED && window.EMBED[p]) || p; };
// 10/20 선생님(PC·전자칠판에서 픽셀 인물 뭉개짐): 반 크기 걷기 그림(_h)은 휴대폰·메모리 적은 기기만. 픽셀랩 인물은 잔 점이라 반으로 줄이면 점 3/4이 사라짐
G.halfSheet = /iPhone|iPod|Android.*Mobile/.test(navigator.userAgent) || (navigator.deviceMemory > 0 && navigator.deviceMemory < 4);
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
  // 10/8 검토: 버튼이 아닌 누를 곳(지도 장소, 장면 속 물건)도 Tab으로 고르고 Enter/Space로 누름 (전자칠판 리모컨·키보드)
  if (!/^(BUTTON|A|INPUT|SELECT)$/.test(elm.tagName)) {
    if (!elm.hasAttribute('tabindex')) elm.tabIndex = 0;
    elm.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); elm.click(); } });
  }
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
// 10/6 선생님: 별을 올릴 때 그냥 올라가지 않고, 별가루를 연료처럼 아래로 뿜으며 반짝이는 별 잔상을 남기고 올라감 (인트로·모든 별 받침대 같은 효과)
// 쓰는 법: const tr = G.riseTrail(부모, 별 요소, 별 색, 가볍게?) → 날아가는 동안 tr(k, x, y, 크기) / 화면이 따라 올라가면 tr.shift(내려간 거리) / 끝나면 tr.end()
G.riseTrail = (parent, starEl, col = '#FFD66B', light = false) => {
  // 10/6 선생님 보충: 화려할수록 좋음 → 떠날 때 빛 고리와 반짝이 터짐, 올라가는 동안 빛 번짐·별 잔상·별가루(별 색+금색+흰색), 닿을 때 한 번 더 터짐
  // 휴대폰 끊김 대책: 움직임은 모두 el.animate의 transform·opacity만 (filter 애니메이션 없음)
  const L = G.el('div', 'rtrail', parent); let lastG = -1, lastS = -1, lastP = -1, off = 0, fired = false, px = 0, py = 0, ps = 0;
  const COL = [col, '#FFD66B', '#FFFDF2', col];
  const fade = (el, kf, ms, ease = 'linear') => { const an = el.animate && el.animate(kf, { duration: ms, easing: ease, fill: 'forwards' }); if (an) an.finished.then(() => el.remove(), () => el.remove()); else setTimeout(() => el.remove(), ms); };
  const put = (el, x, y, r) => Object.assign(el.style, { left: x + 'px', top: (y - off) + 'px', width: r + 'px', height: r + 'px', margin: (-r / 2) + 'px 0 0 ' + (-r / 2) + 'px' });
  const spark = (x, y, r, c) => { const e = G.el('div', 'rtrail-s', L, G.sparkle('#FFFDF2', c, 5)); e.style.setProperty('--c', c); put(e, x, y, r); return e; };
  // 빛 고리 + 사방으로 튀는 반짝이
  const burst = (x, y, sz, n) => {
    if (G.reduced()) return;
    const ring = G.el('div', 'rtrail-ring', L); ring.style.setProperty('--c', col); put(ring, x, y, sz * 1.2);
    fade(ring, [{ opacity: .95, transform: 'scale(.3)' }, { opacity: 0, transform: 'scale(2.6)' }], 900, 'ease-out');
    for (let i = 0; i < n; i++) {
      const c = COL[i % COL.length], r = sz * (0.16 + Math.random() * 0.18), e = spark(x, y, r, c);
      const an = (i / n) * Math.PI * 2 + Math.random() * 0.3, d = sz * (0.9 + Math.random() * 0.9), dx = Math.cos(an) * d, dy = Math.sin(an) * d * 0.8;
      fade(e, [{ opacity: 1, transform: 'translate(0,0) scale(.4) rotate(0deg)' }, { opacity: 1, transform: `translate(${dx * .7}px,${dy * .7}px) scale(1.2) rotate(90deg)`, offset: .4 }, { opacity: 0, transform: `translate(${dx}px,${dy + sz * .4}px) scale(.5) rotate(180deg)` }], 900 + Math.random() * 600, 'ease-out');
    }
  };
  const step = (k, x, y, sz, fx = 1) => {   // fx: 별이 작게 보일 때 별가루를 더 크게
    if (G.reduced() || k >= 0.97) return;
    px = x; py = y; ps = sz * fx;
    if (!fired) { fired = true; burst(x, y, sz * fx, light ? 8 : 18); }
    // 빛 번짐: 별 둘레에 별 색 빛이 퍼졌다 사라짐
    if (!light && k - lastP > 0.03) { lastP = k; const g = G.el('div', 'rtrail-glow', L); g.style.setProperty('--c', col); put(g, x, y, sz * 1.1 * fx); fade(g, [{ opacity: .55, transform: 'scale(.7)' }, { opacity: 0, transform: 'scale(1.5)' }], 800); }
    // 별 잔상: 지나간 자리에 같은 별이 옅게 남았다가 사라짐
    if (!light && k - lastG > 0.035 && k < 0.92) { lastG = k; const g = G.el('div', 'rtrail-g', L, starEl.innerHTML); put(g, x, y, sz); fade(g, [{ opacity: 0.6, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.75)' }], 700); }
    // 별가루 연료: 별 아래로 반짝이와 빛 알갱이가 뿜어져 나와 반짝이며 천천히 떨어져 사라짐
    if (k - lastS > (light ? 0.05 : 0.012)) {
      lastS = k;
      for (let n = 0; n < (light ? 1 : 4); n++) {
        const tw = n < 2, c = COL[(Math.random() * COL.length) | 0], r = (tw ? sz * (0.12 + Math.random() * 0.2) : sz * (0.05 + Math.random() * 0.06)) * fx;
        const e = tw ? spark(0, 0, r, c) : G.el('div', 'rtrail-d', L); if (!tw) e.style.setProperty('--c', c);
        put(e, x + (Math.random() - 0.5) * sz * 0.6, y + sz * (0.15 + Math.random() * 0.3), r);
        const dx = (Math.random() - 0.5) * sz * 0.9 * fx, dy = sz * (0.5 + Math.random() * 0.9) * fx, life = (light ? 900 : 1400) + Math.random() * 1000, rot = tw ? (Math.random() < .5 ? -1 : 1) * 120 : 0;
        fade(e, [{ opacity: 1, transform: 'translate(0,0) scale(1.2) rotate(0deg)' }, { opacity: .55, transform: `translate(${dx * .3}px,${dy * .25}px) scale(.8) rotate(${rot * .3}deg)`, offset: .25 }, { opacity: 1, transform: `translate(${dx * .55}px,${dy * .5}px) scale(1) rotate(${rot * .55}deg)`, offset: .5 }, { opacity: .4, transform: `translate(${dx * .8}px,${dy * .78}px) scale(.6) rotate(${rot * .8}deg)`, offset: .78 }, { opacity: 0, transform: `translate(${dx}px,${dy}px) scale(.35) rotate(${rot}deg)` }], life);
      }
    }
  };
  step.shift = (d) => { off = d; L.style.translate = `0 ${d}px`; };
  step.reset = () => { lastG = lastS = lastP = -1; };   // 10/9: 오래 이어지는 잔상(첫 만남 루미)은 k를 0부터 다시
  step.end = () => { if (fired) burst(px, py, ps, light ? 8 : 16); setTimeout(() => L.remove(), 2600); };
  return step;
};
G.arrowHtml = () => G.artImg('hint_arrow') || '<svg viewBox="0 0 90 110"><path d="M45 104 L8 58 H30 V6 H60 V58 H82 Z" fill="#FFD66B" stroke="#8a5a0a" stroke-width="5" stroke-linejoin="round"/></svg>';
G.svgPin = (fill, stroke, sw = 6) => `<svg viewBox="0 0 100 100"><path d="M50 96 C38 76 16 62 16 40 A34 34 0 1 1 84 40 C84 62 62 76 50 96 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/><circle cx="50" cy="40" r="13" fill="${stroke}" opacity=".55"/></svg>`;
G.svgTwinkle = (fill, stroke, sw = 4) => `<svg viewBox="0 0 100 100"><path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;
G.svgStar = (fill, stroke, sw = 6) => `<svg viewBox="0 0 100 100"><path d="M50 6 L62 37 L95 38 L69 58 L78 91 L50 72 L22 91 L31 58 L5 38 L38 37 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;

// ---------- 화면 크기: 기준 1920x1080, 비율이 달라도 검은 띠 없이 채움 ----------
G.layout = () => {
  const vv = window.visualViewport;
  let W = Math.round(vv ? vv.width : window.innerWidth), H = Math.round(vv ? vv.height : window.innerHeight);
  // 10/3 선생님(아이폰 17): 홈 화면 앱에서 아래 홈 막대 높이만큼 화면을 덜 알려 줘 남색 띠가 남음 → 아이폰 홈 화면 앱은 기기 화면 크기를 그대로 씀
  if (navigator.standalone && /iPhone/.test(navigator.userAgent)) {
    const a = Math.min(screen.width, screen.height), c = Math.max(screen.width, screen.height);
    [W, H] = window.innerHeight > window.innerWidth ? [a, c] : [c, a];
    // 10/3 선생님: 처음 화면에서만 아래 띠가 남음 → 켜자마자는 문서 높이가 홈 막대만큼 짧게 잡혀 그 아래가 그려지지 않음. 문서도 기기 화면 크기로 맞춤
    for (const e of [document.documentElement, document.body]) { e.style.width = W + 'px'; e.style.height = H + 'px'; }
  }
  // 10/2 선생님: 휴대폰을 세로로 들면(아이폰은 가로 고정이 안 됨) 게임 화면을 90도 돌려 가로처럼 보여 줌
  const rot = G.isTouch && H > W * 1.05; G.rot = rot ? W : 0;
  if (rot) [W, H] = [H, W];
  document.documentElement.classList.toggle('rot90', rot);
  const game = G.$('#game'); game.style.width = W + 'px'; game.style.height = H + 'px';
  game.style.transform = rot ? `translateX(${H}px) rotate(90deg)` : '';
  document.documentElement.style.setProperty('--vw', W / 100 + 'px'); document.documentElement.style.setProperty('--vh', H / 100 + 'px');
  const ws = Math.max(H / 1080, W / 2400);                 // 세계(지도·장면) 배율: 높이 1080을 채움
  // 글자·버튼 배율: 전자칠판은 세계와 같게, 휴대폰은 손가락 크기(약 11mm)를 위해 더 크게, 그러나 화면을 넘지 않게
  let u = Math.max(H / 1080, 0.6); u = Math.min(u, W / 1500, H / 640);
  // 버튼 단위: 휴대폰(터치, 낮은 화면)에서는 누를 곳이 약 11mm(≈70px) 이상 되게 키움 (GDD 1-3)
  const bu = G.isTouch && H < 700 ? Math.max(u, 0.72) : u;
  G.stage = { W, H, ws, u, bu, portrait: H > W * 1.05 };
  document.documentElement.style.setProperty('--u', u + 'px');
  document.documentElement.style.setProperty('--bu', bu + 'px');
  G.$('#rotate').classList.toggle('on', G.stage.portrait && G.isTouch && !rot);
  if (rot && G.audio && G.audio.ready && !G._rotSaid) { G._rotSaid = 1; G.audio.voice('S92_rotate'); }
  if (G.onResize) G.onResize();
  for (const f of G.resizers) { try { f(); } catch (e) { console.error(e); } }
};
G.resizers = new Set();
// 돌린 동안에는 누른 자리·크기 값을 게임 기준으로 바꿔 줌 → 끌기·퍼즐 코드는 그대로 둠 (화면 (sx, sy) = 게임 (x, y): x = sy, y = 세로 폭 - sx)
G.rot = 0;
(() => {
  const gd = (o, k) => o && Object.getOwnPropertyDescriptor(o, k);
  for (const [o, X, Y] of [[MouseEvent.prototype, 'clientX', 'clientY'], [MouseEvent.prototype, 'pageX', 'pageY'], [window.Touch && Touch.prototype, 'clientX', 'clientY'], [window.Touch && Touch.prototype, 'pageX', 'pageY']]) {
    const dx = gd(o, X), dy = gd(o, Y); if (!dx || !dy || !dx.get || !dy.get) continue;
    Object.defineProperty(o, X, { configurable: true, enumerable: true, get() { return G.rot ? dy.get.call(this) : dx.get.call(this); } });
    Object.defineProperty(o, Y, { configurable: true, enumerable: true, get() { return G.rot ? G.rot - dx.get.call(this) : dy.get.call(this); } });
  }
  const gb = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function () { const r = gb.call(this); return G.rot ? new DOMRect(r.top, G.rot - r.right, r.height, r.width) : r; };
  const ef = Document.prototype.elementFromPoint, efs = Document.prototype.elementsFromPoint;
  Document.prototype.elementFromPoint = function (x, y) { return G.rot ? ef.call(this, G.rot - y, x) : ef.call(this, x, y); };
  if (efs) Document.prototype.elementsFromPoint = function (x, y) { return G.rot ? efs.call(this, G.rot - y, x) : efs.call(this, x, y); };
})();
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
// 10/16 휴대폰 끊김: 매 화면 matchMedia를 새로 만들던 것 → 한 번 만들어 두고 .matches만 봄(설정이 바뀌면 브라우저가 알아서 갱신)
const RM_Q = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : null;
G.reduced = () => G.settings && (G.settings.reduceMotion || (G.settings.reduceAuto && !!RM_Q && RM_Q.matches));

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
