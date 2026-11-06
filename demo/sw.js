// 체험판 전용 서비스 워커 (make_demo2.py가 demo/sw.js로 씀, 맡는 범위 /demo/)
// 11/6 선생님: 한 바퀴 돌고 [처음부터 다시](페이지 새로 열기)를 해도 미리 받아 둔 그림·소리를 다시 받지 않게, 받은 것을 저장소에 두고 거기서 꺼내 줌.
// 저장소 이름에 판 지문(f99462b4c2) → 체험판을 새로 올렸을 때만 옛 저장소를 지우고 한 번 다시 받음. 영상(mp4)은 사파리가 나눠 받으므로 맡지 않음
const C = 'sv-demo-f99462b4c2';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('sv-demo-') && k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const q = e.request; if (q.method !== 'GET' || q.headers.has('range')) return;
  const u = new URL(q.url); if (u.origin !== location.origin || /\.mp4$/.test(u.pathname)) return;
  e.respondWith(caches.open(C).then(c => c.match(q).then(hit => hit || fetch(q).then(r => {
    if (r.ok && r.status === 200 && r.type === 'basic') { const cp = r.clone(); e.waitUntil(c.put(q, cp).catch(() => { })); }
    return r;
  }))));
});
