# 🚀 PathViz – Dijkstra Pathfinding Visualizer

An interactive web-based visualization tool that demonstrates how **Dijkstra's Shortest Path Algorithm** computes the shortest path between two nodes in a grid environment. Users can place obstacles, configure source and destination nodes, and observe the algorithm's exploration and path reconstruction process in real time.

---

## 🌐 Live Demo

🔗 **Live Website:**  
https://ramaneeraj.github.io/Dijkstra-Pathfinding-Visualizer/

🔗 **GitHub Repository:**  
https://github.com/ramaneeraj/Dijkstra-Pathfinding-Visualizer

---

## ✨ Features

- Interactive grid-based graph environment.
- Dynamic obstacle (wall) creation and removal.
- Customizable start and destination nodes.
- Real-time visualization of Dijkstra's shortest path algorithm.
- Adjustable visualization speed controls.
- Drag-and-drop source and destination positioning.
- Path reset and full-grid reset functionality.
- Responsive and user-friendly interface.

---

## 📸 Preview

> Add screenshots here after taking them.

```text
assets/
├── home.png
├── path-found.png
└── demo.gif
```

Example:

```md
![Home Screen](assets/home.png)

![Path Found](assets/path-found.png)
```

---

## 🎬 Demo

> Add a GIF recording of the algorithm in action.

```md
![Demo](assets/demo.gif)
```

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)
- Graph Algorithms
- DOM Manipulation
- CSS Animations

---

## 📚 Algorithm Used

### Dijkstra's Shortest Path Algorithm

The application computes the shortest path between two nodes while avoiding obstacles placed by the user.

### Key Concepts Implemented

- Graph representation using a 2D grid.
- Priority Queue (Min Heap) for efficient node selection.
- Greedy shortest-path computation.
- Parent-pointer based path reconstruction.
- Graph traversal and neighbor exploration.

### Complexity Analysis

| Metric | Complexity |
|----------|------------|
| Time Complexity | O((V + E) log V) |
| Space Complexity | O(V) |

Where:

- **V** = Number of vertices (grid cells)
- **E** = Number of edges

---

## 🎯 Project Highlights

- Developed an interactive web-based visualization platform for demonstrating shortest-path computation using Dijkstra's Algorithm.
- Implemented a custom **Min Heap (Priority Queue)** to efficiently select the next node with the minimum tentative distance during pathfinding.
- Designed a dynamic grid-based graph structure supporting obstacle generation, source/destination placement, and shortest-path computation.
- Implemented real-time visualization of graph traversal and shortest-path computation, including animated node exploration, visited-order tracking, frontier processing, and path reconstruction through parent-pointer backtracking techniques.
- Developed the frontend using **HTML5, CSS3, and JavaScript**, leveraging DOM manipulation, event-driven programming, and CSS animations to deliver an interactive algorithm visualization experience.

---

## 📂 Project Structure

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

---

## 🚀 Running Locally

### Clone the repository

```bash
git clone https://github.com/ramaneeraj/Dijkstra-Pathfinding-Visualizer.git
```

### Navigate to project directory

```bash
cd Dijkstra-Pathfinding-Visualizer
```

### Launch

Open:

```text
index.html
```

in any modern browser.

No additional dependencies or installation are required.

---

## 🔮 Future Enhancements

- A* Search Algorithm
- Breadth First Search (BFS)
- Depth First Search (DFS)
- Weighted Graph Support
- Maze Generation Algorithms
- Mobile Optimization
- Additional Pathfinding Algorithms

---

## 📖 Learning Outcomes

Through this project, I gained practical experience with:

- Graph Theory
- Dijkstra's Algorithm
- Priority Queues and Min Heaps
- Pathfinding Algorithms
- Algorithm Visualization Techniques
- JavaScript DOM Manipulation
- Event-Driven Programming
- Frontend Development

---

## 👨‍💻 Author

### Rama Neeraj Dungala

B.Tech, IIT Guwahati

GitHub: https://github.com/ramaneeraj

LinkedIn: Add your LinkedIn profile here

---

## ⭐ Support

If you found this project useful, consider giving it a star ⭐ on GitHub.
