# 🚀 PathViz - Dijkstra Algorithm Visualizer

An interactive web-based visualization tool that demonstrates how **Dijkstra's Shortest Path Algorithm** works on a grid. Users can place obstacles, define source and destination nodes, and watch the algorithm explore nodes and compute the optimal path in real time.

---

## 🌟 Features

- Interactive grid-based environment
- Set custom **Start** and **End** nodes
- Draw and erase obstacles (walls)
- Real-time visualization of Dijkstra's Algorithm
- Animated node exploration and path reconstruction
- Adjustable visualization speed
- Drag-and-drop repositioning of source and destination nodes
- Reset path or clear the entire grid
- Responsive and modern user interface

---

## 🖥️ Demo

Live Demo: [Add GitHub Pages Link Here]

---

## 📸 Preview

<!-- Add screenshots here -->

![Project Screenshot](screenshot.png)

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- DOM Manipulation
- CSS Animations

---

## 📚 Algorithm Used

### Dijkstra's Shortest Path Algorithm

The project uses **Dijkstra's Algorithm** to find the shortest path between two nodes in a grid.

### Working

1. Initialize the source node distance as 0.
2. Store nodes in a Min Priority Queue.
3. Repeatedly select the node with the minimum distance.
4. Relax all valid neighboring nodes.
5. Continue until the destination is reached.
6. Reconstruct the shortest path using parent pointers.

### Time Complexity

| Operation | Complexity |
|------------|------------|
| Dijkstra with Min Heap | O((V + E) log V) |

Where:

- V = Number of vertices (grid cells)
- E = Number of edges

---

## 🏗️ Project Structure

```text
├── index.html
├── style.css
├── script.js
├── README.md
```

---

## 🎯 Key Concepts Demonstrated

- Graph Representation using 2D Grid
- Shortest Path Algorithms
- Priority Queues (Min Heap)
- Path Reconstruction using Parent Pointers
- Graph Traversal
- Event-Driven Programming
- DOM Manipulation
- Algorithm Visualization

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
```

### Open the Project

Simply open:

```text
index.html
```

in your browser.

No additional dependencies or installation required.

---

## 📈 Future Improvements

- A* Search Algorithm
- Breadth First Search (BFS)
- Depth First Search (DFS)
- Weighted Nodes
- Maze Generation Algorithms
- Mobile Optimization
- Dark/Light Theme Toggle

---

## 💡 Learning Outcomes

Through this project, I gained hands-on experience with:

- Graph Algorithms
- Dijkstra's Algorithm
- Priority Queues and Min Heaps
- Algorithm Visualization Techniques
- JavaScript DOM Manipulation
- Frontend Development using HTML, CSS, and JavaScript

---

## 👨‍💻 Author

**Rama Neeraj Dungala**

IIT Guwahati

GitHub: https://github.com/your-github-username

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
