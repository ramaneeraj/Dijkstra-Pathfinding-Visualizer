const ROWS = 22;
const COLS = 50;

let grid            = [];
let startNode       = null;
let endNode         = null;
let currentTool     = 'wall';
let isMouseDown     = false;
let isRunning       = false;
let animationTimers = [];
let dragTarget      = null;

const speedMap = { 1: 80, 2: 40, 3: 15, 4: 5, 5: 1 };

function initGrid() {
  grid = [];
  const g = document.getElementById('grid');
  g.innerHTML = '';
  g.style.gridTemplateColumns = `repeat(${COLS}, var(--cell))`;

  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      const cell = { r, c, isWall: false, el: null, dist: Infinity, prev: null, visited: false };
      const div = document.createElement('div');
      div.className = 'cell';
      div.dataset.r = r;
      div.dataset.c = c;
      div.addEventListener('mousedown', onCellMouseDown);
      div.addEventListener('mouseenter', onCellMouseEnter);
      div.addEventListener('mouseup', () => { isMouseDown = false; dragTarget = null; });
      cell.el = div;
      grid[r][c] = cell;
      g.appendChild(div);
    }
  }

  setStart(Math.floor(ROWS / 2), 5);
  setEnd(Math.floor(ROWS / 2), COLS - 6);
}

function setStart(r, c) {
  if (startNode) grid[startNode.r][startNode.c].el.classList.remove('start');
  startNode = { r, c };
  const el = grid[r][c].el;
  grid[r][c].isWall = false;
  el.classList.remove('wall', 'end', 'visited', 'path', 'frontier');
  el.classList.add('start');
}

function setEnd(r, c) {
  if (endNode) grid[endNode.r][endNode.c].el.classList.remove('end');
  endNode = { r, c };
  const el = grid[r][c].el;
  grid[r][c].isWall = false;
  el.classList.remove('wall', 'start', 'visited', 'path', 'frontier');
  el.classList.add('end');
}

document.addEventListener('mouseup', () => { isMouseDown = false; dragTarget = null; });

function onCellMouseDown(e) {
  e.preventDefault();
  if (isRunning) return;
  isMouseDown = true;
  const r = +this.dataset.r;
  const c = +this.dataset.c;
  if (this.classList.contains('start')) { dragTarget = 'start'; return; }
  if (this.classList.contains('end'))   { dragTarget = 'end';   return; }
  applyTool(r, c);
}

function onCellMouseEnter(e) {
  if (!isMouseDown || isRunning) return;
  const r = +this.dataset.r;
  const c = +this.dataset.c;
  if (dragTarget === 'start') { if (!grid[r][c].isWall) setStart(r, c); return; }
  if (dragTarget === 'end')   { if (!grid[r][c].isWall) setEnd(r, c);   return; }
  applyTool(r, c);
}

function applyTool(r, c) {
  const cell = grid[r][c];
  if (startNode && r === startNode.r && c === startNode.c) return;
  if (endNode   && r === endNode.r   && c === endNode.c)   return;

  if (currentTool === 'wall') {
    cell.isWall = true;
    cell.el.classList.remove('visited', 'path', 'frontier');
    cell.el.classList.add('wall');
  } else if (currentTool === 'erase') {
    cell.isWall = false;
    cell.el.classList.remove('wall', 'visited', 'path', 'frontier');
  } else if (currentTool === 'start') {
    setStart(r, c);
    currentTool = 'wall';
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-tool="wall"]').classList.add('active');
  } else if (currentTool === 'end') {
    setEnd(r, c);
    currentTool = 'wall';
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-tool="wall"]').classList.add('active');
  }
}

function clearAll() {
  stopAnimation();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      cell.isWall = false;
      cell.dist = Infinity;
      cell.prev = null;
      cell.visited = false;
      cell.el.className = 'cell';
    }
  }
  setStart(Math.floor(ROWS / 2), 5);
  setEnd(Math.floor(ROWS / 2), COLS - 6);
  updateStatus('idle', 'Place walls, set start & end, then run');
  document.getElementById('stepsPill').style.display = 'none';
  document.getElementById('distPill').style.display  = 'none';
}

function clearPath() {
  stopAnimation();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      cell.dist = Infinity;
      cell.prev = null;
      cell.visited = false;
      cell.el.classList.remove('visited', 'path', 'frontier');
    }
  }
  updateStatus('idle', 'Path cleared — ready to run again');
  document.getElementById('stepsPill').style.display = 'none';
  document.getElementById('distPill').style.display  = 'none';
}

function stopAnimation() {
  animationTimers.forEach(t => clearTimeout(t));
  animationTimers = [];
  isRunning = false;
  document.getElementById('runBtn').disabled = false;
}

class MinHeap {
  constructor() { this.heap = []; }

  push(item) {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    const top  = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return top;
  }

  get size() { return this.heap.length; }

  _bubbleUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p].dist <= this.heap[i].dist) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.heap[l].dist < this.heap[smallest].dist) smallest = l;
      if (r < n && this.heap[r].dist < this.heap[smallest].dist) smallest = r;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}

function dijkstra() {
  if (!startNode || !endNode) return { visitedOrder: [], path: [], found: false };

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      grid[r][c].dist    = Infinity;
      grid[r][c].prev    = null;
      grid[r][c].visited = false;
    }
  }

  grid[startNode.r][startNode.c].dist = 0;

  const pq = new MinHeap();
  pq.push({ r: startNode.r, c: startNode.c, dist: 0 });

  const visitedOrder = [];
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  while (pq.size > 0) {
    const { r, c, dist } = pq.pop();
    const cell = grid[r][c];
    if (cell.visited) continue;
    cell.visited = true;
    visitedOrder.push({ r, c });
    if (r === endNode.r && c === endNode.c) break;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
      const neighbor = grid[nr][nc];
      if (neighbor.visited || neighbor.isWall) continue;
      const newDist = dist + 1;
      if (newDist < neighbor.dist) {
        neighbor.dist = newDist;
        neighbor.prev = { r, c };
        pq.push({ r: nr, c: nc, dist: newDist });
      }
    }
  }

  const path = [];
  let cur = endNode;
  const endReached =
    grid[endNode.r][endNode.c].prev !== null ||
    (endNode.r === startNode.r && endNode.c === startNode.c);

  if (endReached) {
    while (cur) {
      path.unshift(cur);
      cur = grid[cur.r][cur.c].prev;
    }
  }

  const found = path.length > 0 && path[0].r === startNode.r && path[0].c === startNode.c;
  return { visitedOrder, path, found };
}

function runVisualization() {
  if (isRunning) return;
  clearPath();

  const speed = +document.getElementById('speedSlider').value;
  const delay = speedMap[speed];
  const { visitedOrder, path, found } = dijkstra();

  isRunning = true;
  document.getElementById('runBtn').disabled = true;
  updateStatus('running', `Exploring ${visitedOrder.length} nodes...`);

  visitedOrder.forEach((node, i) => {
    const t = setTimeout(() => {
      const { r, c } = node;
      if (r === startNode.r && c === startNode.c) return;
      if (r === endNode.r   && c === endNode.c)   return;
      grid[r][c].el.classList.add('visited');
    }, i * delay);
    animationTimers.push(t);
  });

  const pathDelay = visitedOrder.length * delay + 100;

  if (found) {
    path.forEach((node, i) => {
      const t = setTimeout(() => {
        const { r, c } = node;
        if (r === startNode.r && c === startNode.c) return;
        if (r === endNode.r   && c === endNode.c)   return;
        grid[r][c].el.classList.remove('visited');
        grid[r][c].el.classList.add('path');
      }, pathDelay + i * (delay * 3));
      animationTimers.push(t);
    });

    const doneDelay = pathDelay + path.length * (delay * 3) + 200;
    const t = setTimeout(() => {
      isRunning = false;
      document.getElementById('runBtn').disabled = false;
      updateStatus('done', 'Path found!');
      document.getElementById('stepsPill').style.display = 'flex';
      document.getElementById('distPill').style.display  = 'flex';
      document.getElementById('stepsText').textContent = `${visitedOrder.length} nodes explored`;
      document.getElementById('distText').textContent  = `Distance: ${path.length - 1}`;
      showToast(`✓ Shortest path: ${path.length - 1} steps`, 'success');
    }, doneDelay);
    animationTimers.push(t);

  } else {
    const t = setTimeout(() => {
      isRunning = false;
      document.getElementById('runBtn').disabled = false;
      updateStatus('no-path', 'No path exists!');
      showToast('✕ No path found — try removing some walls', 'error');
    }, visitedOrder.length * delay + 200);
    animationTimers.push(t);
  }
}

function updateStatus(state, msg) {
  const pill = document.getElementById('statusPill');
  const text = document.getElementById('statusText');
  pill.className   = 'status-pill ' + state;
  text.textContent = msg;
}

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show ' + type;
  setTimeout(() => { t.className = type; }, 3000);
}

document.querySelectorAll('.tool-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTool = btn.dataset.tool;
  });
});

document.getElementById('runBtn').addEventListener('click', runVisualization);
document.getElementById('clearBtn').addEventListener('click', clearAll);
document.getElementById('clearPathBtn').addEventListener('click', clearPath);

document.getElementById('speedSlider').addEventListener('input', function () {
  document.getElementById('speedLabel').textContent = this.value + '×';
});

document.getElementById('grid-wrapper').addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); runVisualization(); }
  if (e.key === 'c' || e.key === 'C') clearAll();
  if (e.key === 'r' || e.key === 'R') clearPath();
  if (e.key === '1') document.querySelector('[data-tool="wall"]').click();
  if (e.key === '2') document.querySelector('[data-tool="start"]').click();
  if (e.key === '3') document.querySelector('[data-tool="end"]').click();
  if (e.key === '4') document.querySelector('[data-tool="erase"]').click();
});

initGrid();
showToast('Click & drag to draw walls • Press SPACE to run', '');