\# D\*ijkstra.viz — Shortest Path Algorithm Visualizer



An interactive, browser-based visualizer for \*\*Dijkstra's shortest path algorithm\*\*, built with vanilla HTML, CSS, and JavaScript. Draw walls, place start and end points, and watch the algorithm explore the grid in real time before tracing out the shortest path.



\## Features



\- Interactive grid where you can draw walls by clicking and dragging

\- Movable Start and End nodes — drag them anywhere on the grid

\- Animated visualization of node exploration order (visited cells)

\- Shortest path reconstruction and highlighting once the end node is reached

\- Adjustable animation speed (1x to 5x)

\- Live status updates, step count, and total distance display

\- Toast notifications and keyboard shortcuts for quick interaction

\- Handles unreachable targets gracefully ("No path found")



\## Algorithm



The project implements \*\*Dijkstra's algorithm\*\* using a custom \*\*binary min-heap\*\* as the priority queue, giving efficient O(log n) extraction of the next closest node instead of a naive O(n log n) sort on every iteration. Since all grid edges have equal weight, the algorithm behaves equivalently to a Breadth-First Search, but is implemented in a general weighted form.



\## Keyboard Shortcuts



| Key | Action |

|-----|--------|

| `Space` / `Enter` | Run visualization |

| `C` | Clear entire grid |

| `R` | Reset path (keep walls) |

| `1` | Wall tool |

| `2` | Start tool |

| `3` | End tool |

| `4` | Erase tool |



\## Tech Stack



\- \*\*HTML5\*\* — structure

\- \*\*CSS3\*\* — custom dark-themed UI, grid layout, and animations

\- \*\*JavaScript (ES6)\*\* — algorithm logic, DOM manipulation, animation scheduling



No external libraries or frameworks are used.



\## How It Works



1\. The grid is generated as a 2D array of cell objects, each tracking its distance, visited state, and previous node.

2\. On clicking \*\*Run\*\*, Dijkstra's algorithm executes instantly on the underlying data, recording the order in which nodes are visited.

3\. This visited order is then replayed visually using staggered timeouts, simulating a wave-like search expanding outward from the start node.

4\. Once the end node is reached, the shortest path is reconstructed by backtracking through stored parent pointers from the end back to the start, then animated separately to highlight the optimal route.



\## Getting Started



```bash

git clone https://github.com/your-username/dijkstra-visualizer.git

cd dijkstra-visualizer

```



Open `index.html` in your browser — no build step or dependencies required.



\## License



This project is open source and available under the \[MIT License](LICENSE).



