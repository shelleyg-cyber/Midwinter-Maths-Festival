/* Maths deck widgets: <mw-timer>, <mw-reveal>, <mw-shape>, <mw-drag> */
(() => {
if (customElements.get('mw-timer')) return;
const ACCENT = '#f2a324', INK = '#201f1d', PAPER = '#f3f2f2';

/* ---------- mw-timer ---------- */
class MWTimer extends HTMLElement {
  static get observedAttributes() { return ['minutes']; }
  attributeChangedCallback(_, __, v) {
    if (!this.shadowRoot || this.running) return;
    this.total = Math.round(parseFloat(v || '5') * 60); this.left = this.total; this.paint();
  }
  connectedCallback() {
    if (this.shadowRoot) return;
    const mins = parseFloat(this.getAttribute('minutes') || '5');
    this.total = Math.round(mins * 60); this.left = this.total; this.running = false;
    const r = this.attachShadow({mode: 'open'});
    r.innerHTML = `<style>
      :host{display:inline-flex;flex-direction:column;align-items:center;gap:14px;font-family:'Lora',serif}
      .face{position:relative;width:210px;height:210px}
      svg{transform:rotate(-90deg)}
      .t{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
        font-family:'Cormorant Garamond',serif;font-size:56px;font-weight:600;color:${INK};font-feature-settings:'tnum'}
      .btns{display:flex;gap:10px}
      button{font-family:'Lora',serif;font-size:19px;padding:8px 22px;background:transparent;
        border:1px solid ${ACCENT};color:#c47a12;border-radius:4px;cursor:pointer}
      button:hover{background:rgba(242,163,36,.12)}
      :host(.done) .t{color:${ACCENT};animation:blink 1s steps(2) 6}
      @keyframes blink{50%{opacity:.25}}
    </style>
    <div class="face">
      <svg width="210" height="210" viewBox="0 0 210 210">
        <circle cx="105" cy="105" r="96" fill="none" stroke="#dedcd9" stroke-width="6"/>
        <circle class="ring" cx="105" cy="105" r="96" fill="none" stroke="${ACCENT}" stroke-width="6"
          stroke-linecap="round" stroke-dasharray="603" stroke-dashoffset="0"/>
      </svg>
      <div class="t">0:00</div>
    </div>
    <div class="btns"><button class="go">Start</button><button class="re">Reset</button></div>`;
    this.$t = r.querySelector('.t'); this.$ring = r.querySelector('.ring');
    this.$go = r.querySelector('.go');
    this.$go.onclick = () => this.running ? this.pause() : this.start();
    r.querySelector('.re').onclick = () => this.reset();
    this.paint();
  }
  paint() {
    const m = Math.floor(this.left / 60), s = this.left % 60;
    this.$t.textContent = m + ':' + String(s).padStart(2, '0');
    this.$ring.style.strokeDashoffset = 603 * (1 - this.left / this.total);
  }
  start() {
    if (this.left <= 0) this.left = this.total;
    this.classList.remove('done'); this.running = true; this.$go.textContent = 'Pause';
    this.iv = setInterval(() => {
      this.left--; this.paint();
      if (this.left <= 0) { this.pause(); this.classList.add('done'); }
    }, 1000);
  }
  pause() { this.running = false; this.$go.textContent = 'Start'; clearInterval(this.iv); }
  reset() { this.pause(); this.left = this.total; this.classList.remove('done'); this.paint(); }
  disconnectedCallback() { clearInterval(this.iv); }
}
customElements.define('mw-timer', MWTimer);

/* ---------- mw-reveal ---------- */
class MWReveal extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const label = this.getAttribute('label') || 'Reveal';
    const dark = this.hasAttribute('dark');
    const bc = dark ? '#ffffff' : ACCENT, tc = dark ? '#ffffff' : '#c47a12';
    const hov = dark ? 'rgba(255,255,255,.18)' : 'rgba(242,163,36,.12)';
    const r = this.attachShadow({mode: 'open'});
    r.innerHTML = `<style>
      :host{display:block}
      button{font-family:'Lora',serif;font-size:22px;padding:12px 30px;background:transparent;
        border:1px solid ${bc};color:${tc};border-radius:4px;cursor:pointer;letter-spacing:.02em}
      button:hover{background:${hov}}
      .body{display:none}
      :host(.open) button{display:none}
      :host(.open) .body{display:block;animation:in .5s ease}
      @keyframes in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
    </style>
    <button>✦ ${label}</button><div class="body"><slot></slot></div>`;
    r.querySelector('button').onclick = () => this.classList.add('open');
  }
}
customElements.define('mw-reveal', MWReveal);

/* ---------- mw-shape : animated transformation demo ---------- */
class MWShape extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const type = this.getAttribute('type') || 'translation';
    const r = this.attachShadow({mode: 'open'});
    const W = 560, H = 360, G = 40;
    const dw = +(this.getAttribute('width') || W), dh = Math.round(dw * H / W);
    let grid = '';
    for (let x = 0; x <= W; x += G) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#e3e1de" stroke-width="1"/>`;
    for (let y = 0; y <= H; y += G) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#e3e1de" stroke-width="1"/>`;
    const tri = 'M0,0 L120,80 L20,110 Z';
    let extra = '', anims;
    if (type === 'reflection') extra = `<line x1="${W/2}" y1="12" x2="${W/2}" y2="${H-12}" stroke="${ACCENT}" stroke-width="2" stroke-dasharray="8 7"/>`;
    if (type === 'rotation') extra = `<circle cx="${W/2}" cy="${H/2}" r="6" fill="${ACCENT}"/>`;
    r.innerHTML = `<style>
      :host{display:inline-flex;flex-direction:column;align-items:center;gap:12px}
      svg{background:#fbfaf9;border:1px solid #d8d5d1;border-radius:4px}
      button{font-family:'Lora',serif;font-size:19px;padding:8px 24px;background:transparent;
        border:1px solid ${ACCENT};color:#c47a12;border-radius:4px;cursor:pointer}
      button:hover{background:rgba(242,163,36,.12)}
    </style>
    <svg width="${dw}" height="${dh}" viewBox="0 0 ${W} ${H}">
      ${grid}${extra}
      <path class="ghost" d="${tri}" fill="none" stroke="#b8b4af" stroke-width="2" stroke-dasharray="6 6"/>
      <path class="mover" d="${tri}" fill="rgba(242,163,36,.28)" stroke="${ACCENT}" stroke-width="2.5"/>
    </svg>
    <button>▶ Play it</button>`;
    const mover = r.querySelector('.mover'), ghost = r.querySelector('.ghost');
    const start = {translation: [80, 90], reflection: [90, 100], rotation: [W/2 - 150, H/2 - 120], combo: [40, 60]}[type] || [80, 90];
    const base = `translate(${start[0]}px,${start[1]}px)`;
    ghost.style.transform = base; mover.style.transform = base;
    if (type === 'translation') anims = [
      {transform: base}, {transform: `translate(${start[0]+240}px,${start[1]+80}px)`}];
    else if (type === 'reflection') anims = [
      {transform: base},
      {transform: `translate(${2*(W/2) - start[0]}px,${start[1]}px) scaleX(-1)`}];
    else if (type === 'rotation') anims = [
      {transform: `translate(${W/2}px,${H/2}px) rotate(0deg) translate(${start[0]-W/2}px,${start[1]-H/2}px)`},
      {transform: `translate(${W/2}px,${H/2}px) rotate(90deg) translate(${start[0]-W/2}px,${start[1]-H/2}px)`}];
    else anims = [
      {transform: base, offset: 0},
      {transform: `translate(${start[0]+220}px,${start[1]}px)`, offset: .45},
      {transform: `translate(${start[0]+220}px,${start[1]}px)`, offset: .55},
      {transform: `translate(${start[0]+220}px,${start[1]+120}px) scaleY(-1)`, offset: 1}];
    if (type === 'rotation') { ghost.style.transform = anims[0].transform; mover.style.transform = anims[0].transform; }
    r.querySelector('button').onclick = () =>
      mover.animate(anims, {duration: type === 'combo' ? 3400 : 2000, easing: 'ease-in-out', fill: 'forwards'});
  }
}
customElements.define('mw-shape', MWShape);

/* ---------- mw-drag : draggable shapes on a grid ---------- */
class MWDrag extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const W = +(this.getAttribute('width') || 760), H = +(this.getAttribute('height') || 440), G = 40;
    const plane = this.getAttribute('plane') === 'cartesian';
    const kinds = (this.getAttribute('shapes') || 'triangle,square').split(',');
    const r = this.attachShadow({mode: 'open'});
    let grid = '';
    for (let x = 0; x <= W; x += G) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#e3e1de"/>`;
    for (let y = 0; y <= H; y += G) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#e3e1de"/>`;
    if (plane) grid += `<line x1="0" y1="${H/2}" x2="${W}" y2="${H/2}" stroke="#9b968f" stroke-width="2"/>
      <line x1="${W/2}" y1="0" x2="${W/2}" y2="${H}" stroke="#9b968f" stroke-width="2"/>`;
    r.innerHTML = `<style>
      :host{display:inline-flex;flex-direction:column;gap:12px;align-items:center}
      svg{background:#fbfaf9;border:1px solid #d8d5d1;border-radius:4px;touch-action:none}
      .bar{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
      button{font-family:'Lora',serif;font-size:18px;padding:7px 18px;background:transparent;
        border:1px solid ${ACCENT};color:#c47a12;border-radius:4px;cursor:pointer}
      button:hover{background:rgba(242,163,36,.12)}
      g.sel path{stroke-width:3.5}
      g{cursor:grab}
    </style>
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${grid}<g class="layer"></g></svg>
    <div class="bar">
      ${kinds.map(k => `<button data-add="${k.trim()}">+ ${k.trim()}</button>`).join('')}
      <button data-act="rot">⟳ Turn 90°</button><button data-act="flip">⇋ Flip</button><button data-act="del">✕ Remove</button>
    </div>`;
    const svg = r.querySelector('svg'), layer = r.querySelector('.layer');
    const paths = {
      triangle: 'M0,-46 L46,34 L-46,34 Z', square: 'M-40,-40 H40 V40 H-40 Z',
      hexagon: 'M46,0 L23,40 L-23,40 L-46,0 L-23,-40 L23,-40 Z',
      rectangle: 'M-60,-30 H60 V30 H-60 Z', 'l-shape': 'M-40,-40 H0 V0 H40 V40 H-40 Z'
    };
    const colors = ['rgba(242,163,36,.30)', 'rgba(120,124,96,.30)', 'rgba(140,96,80,.30)', 'rgba(96,110,130,.30)'];
    let sel = null, n = 0;
    const select = g => { layer.querySelectorAll('g').forEach(x => x.classList.remove('sel')); sel = g; if (g) g.classList.add('sel'); };
    const place = g => {
      const d = g.dataset;
      g.setAttribute('transform', `translate(${d.x},${d.y}) rotate(${d.r}) scale(${d.f},1)`);
    };
    const add = kind => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.innerHTML = `<path d="${paths[kind] || paths.triangle}" fill="${colors[n % 4]}" stroke="${ACCENT}" stroke-width="2.5"/>`;
      Object.assign(g.dataset, {x: G * (3 + (n % 4)) , y: G * 3, r: 0, f: 1});
      n++; layer.appendChild(g); place(g); select(g);
      g.addEventListener('pointerdown', e => {
        select(g); e.preventDefault();
        const pt = ev => { const b = svg.getBoundingClientRect();
          return [(ev.clientX - b.left) * W / b.width, (ev.clientY - b.top) * H / b.height]; };
        const [sx, sy] = pt(e), ox = +g.dataset.x, oy = +g.dataset.y;
        const mv = ev => { const [cx, cy] = pt(ev);
          g.dataset.x = Math.round((ox + cx - sx) / (G/2)) * (G/2);
          g.dataset.y = Math.round((oy + cy - sy) / (G/2)) * (G/2); place(g); };
        const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
        window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
      });
    };
    r.querySelectorAll('[data-add]').forEach(b => b.onclick = () => add(b.dataset.add));
    r.querySelector('[data-act="rot"]').onclick = () => { if (sel) { sel.dataset.r = (+sel.dataset.r + 90) % 360; place(sel); } };
    r.querySelector('[data-act="flip"]').onclick = () => { if (sel) { sel.dataset.f = -sel.dataset.f; place(sel); } };
    r.querySelector('[data-act="del"]').onclick = () => { if (sel) { sel.remove(); sel = null; } };
    add(kinds[0].trim());
  }
}
customElements.define('mw-drag', MWDrag);

/* ---------- mw-coord : mini 4-quadrant plane with plotted labelled points ---------- */
class MWCoord extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const S = 220, R = 5, O = S / 2, U = (S / 2 - 14) / R; // units->px
    const px = (x, y) => [O + x * U, O - y * U];
    // points: "A:2,3;A':5,1"   arrow: "2,1>5,1"
    const pts = (this.getAttribute('points') || '').split(';').filter(Boolean).map(p => {
      const [name, xy] = p.split(':'); const [x, y] = xy.split(',').map(Number); return {name, x, y};
    });
    const arrow = this.getAttribute('arrow');
    const r = this.attachShadow({mode: 'open'});
    let grid = '';
    for (let i = -R; i <= R; i++) {
      const [gx] = px(i, 0), [, gy] = px(0, i);
      grid += `<line x1="${gx}" y1="0" x2="${gx}" y2="${S}" stroke="#e6e4e1"/>`;
      grid += `<line x1="0" y1="${gy}" x2="${S}" y2="${gy}" stroke="#e6e4e1"/>`;
    }
    grid += `<line x1="0" y1="${O}" x2="${S}" y2="${O}" stroke="#8a857e" stroke-width="1.5"/>
             <line x1="${O}" y1="0" x2="${O}" y2="${S}" stroke="#8a857e" stroke-width="1.5"/>`;
    let arr = '';
    if (arrow) {
      const [a, b] = arrow.split('>'); const [ax, ay] = a.split(',').map(Number), [bx, by] = b.split(',').map(Number);
      const [x1, y1] = px(ax, ay), [x2, y2] = px(bx, by);
      arr = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f2a324" stroke-width="2.5" stroke-dasharray="5 4" marker-end="url(#ah)"/>`;
    }
    const dots = pts.map(p => {
      const [cx, cy] = px(p.x, p.y);
      return `<circle cx="${cx}" cy="${cy}" r="6" fill="#e0522f"/>
              <text x="${cx + 10}" y="${cy - 8}" font-family="'Cormorant Garamond',serif" font-weight="600" font-size="20" fill="#241d33">${p.name}</text>`;
    }).join('');
    r.innerHTML = `<style>:host{display:inline-block}svg{background:#fbfaf9;border:1px solid #d8d5d1;border-radius:4px}</style>
      <svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
        <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#f2a324"/></marker></defs>
        ${grid}${arr}${dots}
      </svg>`;
  }
}
customElements.define('mw-coord', MWCoord);

/* ---------- mw-tess : animated tessellation building up (no gaps, no overlaps) ---------- */
class MWTess extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const W = +(this.getAttribute('width') || 560), H = Math.round(W * 360 / 560);
    const kind = this.getAttribute('kind') || 'triangle'; // triangle | square | hexagon
    const fills = ['rgba(242,163,36,.55)', 'rgba(31,182,176,.55)', 'rgba(214,57,138,.5)'];
    const cells = []; // {points, fill}
    if (kind === 'square') {
      const s = 70, cols = Math.ceil(W / s), rows = Math.ceil(H / s);
      for (let ry = 0; ry < rows; ry++) for (let cx = 0; cx < cols; cx++) {
        const x = cx * s, y = ry * s;
        cells.push({points: `${x},${y} ${x+s},${y} ${x+s},${y+s} ${x},${y+s}`, fill: fills[(cx + ry) % 2]});
      }
    } else if (kind === 'hexagon') {
      const s = 46, hw = s * Math.sqrt(3) / 2; // flat-top: half-height = hw
      const colStep = 1.5 * s, rowStep = 2 * hw;
      const cols = Math.ceil(W / colStep) + 1, rows = Math.ceil(H / rowStep) + 1;
      for (let c = 0; c < cols; c++) for (let ry = 0; ry <= rows; ry++) {
        const cx = c * colStep, cy = ry * rowStep + (c % 2 ? hw : 0);
        const pts = [];
        for (let a = 0; a < 6; a++) {
          const ang = Math.PI / 180 * (60 * a);
          pts.push(`${(cx + s * Math.cos(ang)).toFixed(1)},${(cy + s * Math.sin(ang)).toFixed(1)}`);
        }
        cells.push({points: pts.join(' '), fill: fills[(c + ry) % 3]});
      }
    } else {
      const b = 84, ht = 74, cols = Math.ceil(W / (b / 2)) + 1, rows = Math.ceil(H / ht);
      for (let ry = 0; ry < rows; ry++) {
        const y0 = ry * ht, y1 = y0 + ht;
        for (let k = 0; k < cols; k++) {
          const x = k * (b / 2);
          if (k % 2 === 0) // upward
            cells.push({points: `${x},${y1} ${x+b},${y1} ${x+b/2},${y0}`, fill: fills[(k + ry) % 2]});
          else // downward
            cells.push({points: `${x-b/2},${y1} ${x+b/2},${y1} ${x},${y0}`, fill: fills[(k + ry) % 2]});
        }
      }
    }
    const r = this.attachShadow({mode: 'open'});
    r.innerHTML = `<style>
      :host{display:inline-flex;flex-direction:column;align-items:center;gap:12px}
      svg{background:#fbfaf9;border:1px solid #d8d5d1;border-radius:4px}
      polygon{stroke:#fbfaf9;stroke-width:1.5;transform-box:fill-box;transform-origin:center}
      polygon.building{opacity:0;transform:scale(.2)}
      polygon.on{opacity:1;transform:scale(1);transition:opacity .3s,transform .3s}
      button{font-family:'Lora',serif;font-size:19px;padding:8px 24px;background:transparent;
        border:1px solid #f2a324;color:#c47a12;border-radius:4px;cursor:pointer}
      button:hover{background:rgba(242,163,36,.12)}
    </style>
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${cells.map(c => `<polygon points="${c.points}" fill="${c.fill}"/>`).join('')}
    </svg>
    <button>▶ Build the tessellation</button>`;
    const polys = [...r.querySelectorAll('polygon')];
    const play = () => {
      polys.forEach(p => { p.classList.remove('on'); p.classList.add('building'); });
      polys.forEach((p, i) => setTimeout(() => p.classList.add('on'), 60 + i * 70));
    };
    r.querySelector('button').onclick = play;
  }
}
customElements.define('mw-tess', MWTess);
})();
