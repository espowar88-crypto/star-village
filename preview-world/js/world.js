// world.js — 새 월드 화면(10/21 선생님 결정판 review/worldrebuild1021: HTML 유지, 별마다 이어진 구역, 누른 곳 걷기 + 자유 이동)
//  설계서 4절: 바닥은 512점 조각(컬러·먹색 두 판)을 화면 근처만 올리고, 나무·집·인물은 발 y 순서(z-index)로 앞뒤를 정함.
//  깊이 그림(_depth.png)과 가림 캔버스가 없음. 걸을 수 있는 곳은 walk.png(한 칸 = 세계 16칸)로 길을 찾음.
//  자료: data/world/<구역>.json (도구/월드/bake.py가 만듦). 1단계(회색 상자)에서는 아직 게임 흐름에 연결하지 않고 미리보기에서만 씀.
//  5단계에서 scene.js와 같은 이름의 기능(setCam·toScreen·walk·walkPath·gather·spr…)을 더해 별 코드가 그대로 돌게 함
'use strict';
G.World = (host, def, o = {}) => {
  const V = { def, gone: false }, u = def.unit, C = def.chunk.size, WW = def.size[0], WH = def.size[1];
  const el = V.el = G.el('div', 'world2', host);
  Object.assign(el.style, { position: 'absolute', left: 0, top: 0, width: WW + 'px', height: WH + 'px', transformOrigin: '0 0' });
  const ground = G.el('div', 'w2-ground', el), sort = V.sort = G.el('div', 'w2-sort', el), fx = V.fx = G.el('div', 'w2-fx', el);

  // ---------- 바닥 조각: 먹색 위에 컬러(지금 장면과 같은 생각). 화면 근처만 그림을 올리고 먼 것은 놓아 줌(10/15 그림 놓기 규칙) ----------
  V.color = 1;
  const chunks = [];
  for (let r = 0; r < def.chunk.rows; r++) for (let c = 0; c < def.chunk.cols; c++) {
    const w = Math.min(C, WW / u - c * C), h = Math.min(C, WH / u - r * C), ch = { c, r, x: c * C * u, y: r * C * u, w: w * u, h: h * u, on: false };
    ch.imgs = ['m', 'c'].map((v) => { const im = G.el('img', 'w2-chunk ' + v, ground); im.alt = ''; im.draggable = false;
      Object.assign(im.style, { left: ch.x + 'px', top: ch.y + 'px', width: ch.w + 'px', height: ch.h + 'px' }); im.dataset.src = G.asset(def.chunk.src.replace('{c}', c).replace('{r}', r).replace('{v}', v)); return im; });
    ch.imgs[1].style.opacity = V.color;
    chunks.push(ch);
  }
  V.setColor = (a) => { V.color = a; for (const ch of chunks) ch.imgs[1].style.opacity = a; };
  const view = (m) => { const s = V.cam.s, hw = G.stage.W / 2 / s + m, hh = G.stage.H / 2 / s + m; return [V.cam.x - hw, V.cam.y - hh, V.cam.x + hw, V.cam.y + hh]; };
  function updChunks() {
    const a = view(256), b = view(900);
    for (const ch of chunks) {
      const hit = (q) => ch.x < q[2] && ch.x + ch.w > q[0] && ch.y < q[3] && ch.y + ch.h > q[1];
      if (!ch.on && hit(a)) { ch.on = true; for (const im of ch.imgs) im.src = im.dataset.src; }
      else if (ch.on && !hit(b)) { ch.on = false; for (const im of ch.imgs) im.removeAttribute('src'); }
    }
  }
  V.loaded = () => chunks.filter((c) => c.on).length;

  // ---------- 물건: 그림 묶음(obj.png) 한 장에서 잘라 씀. z-index = 발 y ----------
  const A = def.atlas, objs = V.objs = [];
  for (const ob of def.objs) {
    const sp = def.sprites[ob.s], [sx, sy, sw, sh] = sp.r, e = G.el('div', 'w2-obj', sort);
    const x0 = ob.x - sp.f[0] * u, y0 = ob.y - sp.f[1] * u;
    Object.assign(e.style, { left: x0 + 'px', top: y0 + 'px', width: sw * u + 'px', height: sh * u + 'px', zIndex: ob.y,
      backgroundImage: `url("${G.asset(A.src)}")`, backgroundSize: `${A.w * u}px ${A.h * u}px`, backgroundPosition: `${-sx * u}px ${-sy * u}px` });
    objs.push({ e, def: ob, box: [x0, y0, x0 + sw * u, y0 + sh * u], y: ob.y, fade: !!ob.fade, faded: false });
  }

  // ---------- 걸을 수 있는 곳 ----------
  const WK = def.walk, cell = WK.cell, gw = WK.w, gh = WK.h;
  let grid = null;
  const gridReady = new Promise((res) => { const im = new Image(); im.onload = () => {
    const cv = document.createElement('canvas'); cv.width = gw; cv.height = gh; const cx = cv.getContext('2d'); cx.drawImage(im, 0, 0);
    const d = cx.getImageData(0, 0, gw, gh).data; grid = new Uint8Array(gw * gh); for (let i = 0; i < grid.length; i++) grid[i] = d[i * 4] > 127 ? 1 : 0;
    stand = new Uint8Array(gw * gh); for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) stand[j * gw + i] = V.canStand((i + 0.5) * cell, (j + 0.5) * cell) ? 1 : 0; res(); };
    im.onerror = () => res(); im.src = G.asset(WK.src); });
  let stand = null;   // 칸 가운데에 발을 디딜 수 있는 칸(길찾기는 이것으로, 자유 이동은 canStand로 → 둘이 늘 같은 답)
  const ptOk = (x, y) => { const i = Math.floor(x / cell), j = Math.floor(y / cell); return i >= 0 && j >= 0 && i < gw && j < gh && !!grid && grid[j * gw + i] === 1; };
  V.canStand = (x, y) => ptOk(x, y) && ptOk(x - 14, y) && ptOk(x + 14, y) && ptOk(x, y - 6) && ptOk(x, y + 6);   // 발 둘레
  const cellOk = (i, j) => i >= 0 && j >= 0 && i < gw && j < gh && !!stand && stand[j * gw + i] === 1;
  V.grid = () => grid;
  const nearestOk = (i, j) => {   // 막힌 곳을 누르면 가장 가까운 걸을 수 있는 칸
    if (cellOk(i, j)) return [i, j];
    for (let r = 1; r < 40; r++) { let best = null, bd = 1e9;
      for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) { if (Math.max(Math.abs(di), Math.abs(dj)) !== r || !cellOk(i + di, j + dj)) continue; const d = di * di + dj * dj; if (d < bd) { bd = d; best = [i + di, j + dj]; } }
      if (best) return best; }
    return null;
  };
  // A* (8방향, 모서리 끼어 가기 없음). 칸 수가 약 5만이라 한 번에 몇 ms
  function findPath(x0, y0, x1, y1) {
    if (!grid) return null;
    const s = nearestOk(Math.floor(x0 / cell), Math.floor(y0 / cell)), t = nearestOk(Math.floor(x1 / cell), Math.floor(y1 / cell));
    if (!s || !t) return null;
    const N = gw * gh, si = s[1] * gw + s[0], ti = t[1] * gw + t[0], g = new Float32Array(N).fill(Infinity), from = new Int32Array(N).fill(-1), shut = new Uint8Array(N);
    const heap = [], push = (f, i) => { heap.push([f, i]); let k = heap.length - 1; while (k) { const p = (k - 1) >> 1; if (heap[p][0] <= heap[k][0]) break; [heap[p], heap[k]] = [heap[k], heap[p]]; k = p; } };
    const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let k = 0; for (;;) { const l = 2 * k + 1, r = l + 1; let m = k; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === k) break; [heap[m], heap[k]] = [heap[k], heap[m]]; k = m; } } return top; };
    const hh = (i) => { const dx = Math.abs(i % gw - t[0]), dy = Math.abs(((i / gw) | 0) - t[1]); return Math.max(dx, dy) + 0.414 * Math.min(dx, dy); };
    g[si] = 0; push(hh(si), si);
    while (heap.length) {
      const [, i] = pop(); if (shut[i]) continue; shut[i] = 1; if (i === ti) break;
      const ci = i % gw, cj = (i / gw) | 0;
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
        if (!di && !dj) continue; const ni = ci + di, nj = cj + dj; if (!cellOk(ni, nj)) continue;
        if (di && dj && (!cellOk(ci + di, cj) || !cellOk(ci, cj + dj))) continue;
        const k = nj * gw + ni, ng = g[i] + (di && dj ? 1.414 : 1); if (ng < g[k]) { g[k] = ng; from[k] = i; push(ng + hh(k), k); }
      }
    }
    if (from[ti] < 0 && si !== ti) return null;
    const cells = []; for (let i = ti; i !== -1; i = from[i]) cells.push(i); cells.reverse();
    const pts = cells.map((i) => [(i % gw + 0.5) * cell, (((i / gw) | 0) + 0.5) * cell]);
    pts[0] = [x0, y0]; if (V.canStand(x1, y1)) pts[pts.length - 1] = [x1, y1];
    // 줄 당기기: 곧게 갈 수 있으면 사이 점을 뺌(지그재그 걸음 없음)
    const out = [pts[0]]; let a = 0;
    while (a < pts.length - 1) { let b = pts.length - 1; while (b > a + 1 && !los(pts[a], pts[b])) b--; out.push(pts[b]); a = b; }
    return out;
  }
  const los = (p, q) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]), n = Math.ceil(L / 8); for (let k = 1; k < n; k++) { const t = k / n; if (!V.canStand(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t)) return false; } return true; };
  V.findPath = findPath;

  // ---------- 주인공(장면 인물과 같은 걷기 그림: walk_<id>_live.png, 칸 100x130을 2배, 발 (50,125)) ----------
  const ROW = { SE: 0, SW: 1, NW: 2, NE: 3 };
  V.walker = (id, x, y) => {
    const k = G.ageScale(id), cw = 200 * k, chh = 260 * k, w = { id, x, y, k, dir: 'SE', dist: 0, moving: false, ph: Math.random() * 2600, nb: performance.now() + 2000, bu: 0 };
    w.el = G.el('div', 'w2-walker', sort);
    const FT = ((G.D.feet || {}).walk || {})[id];
    w.sh = G.el('div', 'w2-shadow', w.el);
    w.spr = G.el('div', 'w2-spr', w.el);
    Object.assign(w.spr.style, { width: cw + 'px', height: chh + 'px', backgroundImage: `url("${G.asset('assets/chars/walk_' + id + '_live.png')}")`, backgroundSize: `${8600 * k}px ${1040 * k}px` });
    w.col = () => {
      if (w.moving) return Math.floor(((w.dist / (116 * k * 1.15)) % 1) * 8) * 2;   // 걸음은 걸은 거리에 묶음(10/16 미끄러지는 발 고침과 같음)
      if (G.reduced && G.reduced()) return 16;
      const now = performance.now();
      if (now > w.nb) { w.bu = now + 120; w.nb = now + 2000 + Math.random() * 3000; }
      const br = (now + w.ph) % 2600 < 1100; return now < w.bu ? (br ? 19 : 18) : (br ? 17 : 16);
    };
    w.draw = () => {
      const c = w.col(), r = ROW[w.dir], bp = `${-c * cw}px ${-r * chh}px`;
      if (bp !== w.bp) { w.bp = bp; w.spr.style.backgroundPosition = bp; }
      if (FT && r !== w.r) { w.r = r; const f = FT[r], q = 2 * k; Object.assign(w.sh.style, { left: (f[0] - 50 - f[2] / 2) * q + 'px', top: (f[1] - 125 - f[3] / 2) * q + 'px', width: f[2] * q + 'px', height: f[3] * q + 'px' }); }
    };
    w.set = (nx, ny) => { w.x = nx; w.y = ny; w.el.style.transform = `translate(${nx.toFixed(1)}px,${ny.toFixed(1)}px)`; const z = Math.round(ny); if (z !== w.z) { w.z = z; w.el.style.zIndex = z; } };
    w.face = (dx, dy) => { if (Math.hypot(dx, dy) < 0.01) return; w.dir = dy >= 0 ? (dx >= 0 ? 'SE' : 'SW') : (dx >= 0 ? 'NE' : 'NW'); };
    w.spr.style.left = -100 * k + 'px'; w.spr.style.top = -250 * k + 'px';
    w.set(x, y); w.draw();
    return w;
  };
  const hero = V.hero = V.walker(o.hero || 'hero', def.spawn[0], def.spawn[1]);

  // ---------- 움직이기: 길 따라(누르기·자리로 가기) 또는 방향(키보드·화면 패드) ----------
  const SPEED = { walk: 320, run: 560 };
  let route = null, routeRes = null, dirIn = [0, 0], runKey = false;
  const marker = G.el('div', 'w2-marker', fx); marker.style.display = 'none';
  V.goTo = (x, y) => {
    const P = findPath(hero.x, hero.y, x, y); if (!P || P.length < 2) return Promise.resolve(false);
    let L = 0; for (let i = 1; i < P.length; i++) L += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
    if (routeRes) routeRes(false);
    route = { P, i: 1, run: L > 1400 };
    const end = P[P.length - 1]; marker.style.display = ''; marker.style.transform = `translate(${end[0]}px,${end[1]}px)`;
    return new Promise((res) => { routeRes = res; });
  };
  V.goArea = (id) => { const a = def.areas[id]; return a ? V.goTo(a.anchor[0], a.anchor[1]) : Promise.resolve(false); };
  V.setDir = (dx, dy, run) => { dirIn = [dx, dy]; runKey = !!run; if (dx || dy) stopRoute(false); };
  const stopRoute = (ok) => { route = null; marker.style.display = 'none'; if (routeRes) { const r = routeRes; routeRes = null; r(ok); } };

  function moveFree(dt) {
    let [dx, dy] = dirIn; const L = Math.hypot(dx, dy); if (L < 0.15) return false;
    dx /= Math.max(1, L); dy /= Math.max(1, L);
    const sp = (runKey || L > 0.95 && o.padRun ? SPEED.run : SPEED.walk) * Math.min(1, L) * dt, nx = hero.x + dx * sp, ny = hero.y + dy * sp;
    let moved = 0;
    const free = !V.canStand(hero.x, hero.y);   // 혹시 막힌 자리에 서 있으면 빠져나올 수 있게
    if (free || V.canStand(nx, ny)) { moved = Math.hypot(nx - hero.x, ny - hero.y); hero.set(nx, ny); }
    else if (V.canStand(nx, hero.y)) { moved = Math.abs(nx - hero.x); hero.set(nx, hero.y); }   // 벽을 따라 미끄러짐
    else if (V.canStand(hero.x, ny)) { moved = Math.abs(ny - hero.y); hero.set(hero.x, ny); }
    hero.face(dx, dy); hero.dist += moved; return true;
  }
  function moveRoute(dt) {
    if (!route) return false;
    let left = (route.run ? SPEED.run : SPEED.walk) * dt;
    while (left > 0 && route) {
      const q = route.P[route.i], dx = q[0] - hero.x, dy = q[1] - hero.y, d = Math.hypot(dx, dy);
      if (d <= left) { hero.set(q[0], q[1]); hero.dist += d; left -= d; if (++route.i >= route.P.length) { stopRoute(true); break; } }
      else { hero.face(dx, dy); hero.set(hero.x + dx / d * left, hero.y + dy / d * left); hero.dist += left; left = 0; }
    }
    return true;
  }

  // ---------- 카메라: 주인공을 부드럽게 따라가고 구역 밖은 보이지 않게. 배율은 정수 화소에 붙임(G.pixSnap) ----------
  V.cam = { x: hero.x, y: hero.y, z: o.zoom || 1, s: 1 };
  V.setCam = (x, y, z = V.cam.z) => {
    const ws = G.stage.ws, zz = G.pixSnap ? G.pixSnap(ws, z) : z, s = ws * zz, hw = G.stage.W / 2 / s, hh = G.stage.H / 2 / s;
    x = WW <= 2 * hw ? WW / 2 : Math.max(hw, Math.min(WW - hw, x)); y = WH <= 2 * hh ? WH / 2 : Math.max(hh, Math.min(WH - hh, y));
    V.cam = { x, y, z, s };
    const d = window.devicePixelRatio || 1, tx = Math.round((G.stage.W / 2 - x * s) * d) / d, ty = Math.round((G.stage.H / 2 - y * s) * d) / d;
    el.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
    updChunks();
  };
  V.toScreen = (x, y) => [G.stage.W / 2 + (x - V.cam.x) * V.cam.s, G.stage.H / 2 + (y - V.cam.y) * V.cam.s];
  V.toWorld = (sx, sy) => [V.cam.x + (sx - G.stage.W / 2) / V.cam.s, V.cam.y + (sy - G.stage.H / 2) / V.cam.s];

  // ---------- 앞을 가리는 나무·집은 주인공이 뒤에 들어가면 반투명(설계서 4절 머리 위 층) ----------
  function fades() {
    const hb = [hero.x - 70 * hero.k, hero.y - 230 * hero.k, hero.x + 70 * hero.k, hero.y];
    for (const ob of objs) { if (!ob.fade) continue;
      const on = hero.y < ob.y && hb[0] < ob.box[2] && hb[2] > ob.box[0] && hb[1] < ob.box[3] && hb[3] > ob.box[1];
      if (on !== ob.faded) { ob.faded = on; ob.e.classList.toggle('faded', on); } }
  }
  // ---------- 자리(옛 장소 id) 들어가기 ----------
  V.area = null;
  function areaCheck() {
    let cur = null; for (const [id, a] of Object.entries(def.areas)) { const r = a.rect; if (hero.x >= r[0] && hero.x <= r[0] + r[2] && hero.y >= r[1] && hero.y <= r[1] + r[3]) { cur = id; break; } }
    if (cur !== V.area) { V.area = cur; if (V.onArea) V.onArea(cur); }
  }

  let lx = -1, ly = -1, ld = -1;
  const off = G.every((dt) => {
    if (V.gone) return; dt = Math.min(dt, 0.05);
    hero.moving = moveFree(dt) || moveRoute(dt);
    const f = 1 - Math.exp(-dt * (G.reduced && G.reduced() ? 30 : 6));
    const cx = V.cam.x + (hero.x - V.cam.x) * f, cy = V.cam.y + (hero.y - 120 - V.cam.y) * f;
    if (Math.abs(cx - V.cam.x) > 0.05 || Math.abs(cy - V.cam.y) > 0.05) V.setCam(cx, cy);
    hero.draw();
    if (hero.x !== lx || hero.y !== ly) { lx = hero.x; ly = hero.y; fades(); areaCheck(); }
    if (hero.dist !== ld) ld = hero.dist;
  });

  // ---------- 누르기·키보드·화면 패드 ----------
  const onDown = (e) => {
    if (e.button > 0 || V.gone || G.paused) return;
    if (e.target.closest && e.target.closest('.w2-pad, button, .w2-ui')) return;
    const r = host.getBoundingClientRect(), p = V.toWorld(e.clientX - r.left, e.clientY - r.top); V.goTo(p[0], p[1]);
  };
  host.addEventListener('pointerdown', onDown);
  const keys = new Set(), KD = { ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0], ArrowRight: [1, 0], d: [1, 0], D: [1, 0], ArrowUp: [0, -1], w: [0, -1], W: [0, -1], ArrowDown: [0, 1], s: [0, 1], S: [0, 1] };
  const keyDir = () => { let x = 0, y = 0; for (const kk of keys) { const v = KD[kk]; if (v) { x += v[0]; y += v[1]; } } const L = Math.hypot(x, y) || 1; V.setDir(x / L, y / L, keys.has('Shift')); };
  const kd = (e) => { if (!KD[e.key] && e.key !== 'Shift') return; e.preventDefault(); keys.add(e.key); keyDir(); };
  const ku = (e) => { if (!keys.delete(e.key)) return; keyDir(); };
  window.addEventListener('keydown', kd); window.addEventListener('keyup', ku);
  window.addEventListener('blur', () => { keys.clear(); keyDir(); });
  if (o.pad) {   // 화면 패드: 왼쪽 아래 원 안에서 끌면 그 쪽으로 걸음(멀리 끌면 달림)
    const pad = V.pad = G.el('div', 'w2-pad', host), knob = G.el('div', 'w2-knob', pad); let pid = null;
    const mv = (e) => { const r = pad.getBoundingClientRect(), R = r.width / 2, dx = (e.clientX - r.left - R) / R, dy = (e.clientY - r.top - R) / R, L = Math.min(1, Math.hypot(dx, dy)), a = Math.atan2(dy, dx);
      knob.style.transform = `translate(${Math.cos(a) * L * R * 0.6}px,${Math.sin(a) * L * R * 0.6}px)`; dirIn = [Math.cos(a) * L, Math.sin(a) * L]; runKey = L > 0.95; if (L > 0.15) stopRoute(false); };
    pad.addEventListener('pointerdown', (e) => { e.stopPropagation(); pid = e.pointerId; pad.setPointerCapture(pid); mv(e); });
    pad.addEventListener('pointermove', (e) => { if (e.pointerId === pid) mv(e); });
    const up = (e) => { if (e.pointerId !== pid) return; pid = null; dirIn = [0, 0]; runKey = false; knob.style.transform = ''; };
    pad.addEventListener('pointerup', up); pad.addEventListener('pointercancel', up);
  }

  const onRes = () => V.setCam(V.cam.x, V.cam.y);
  G.resizers.add(onRes);
  V.ready = gridReady.then(() => { V.setCam(hero.x, hero.y - 120); fades(); areaCheck(); });
  V.dispose = () => { V.gone = true; off(); G.resizers.delete(onRes); host.removeEventListener('pointerdown', onDown); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku);
    for (const ch of chunks) for (const im of ch.imgs) im.removeAttribute('src'); if (V.pad) V.pad.remove(); el.remove(); stopRoute(false); };
  return V;
};
