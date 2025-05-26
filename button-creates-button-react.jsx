import React, { useState } from 'react';

// Module-scoped ID generator
let nextId = 2;

function App() {
  const [root, setRoot] = useState({
    id: 1,
    clicks: 0,
    children: [],
  });

  /**
   * Mutable state. For immutability, keep on cloning using ... on each root.
   */
  function handleClick(target) {
    // Mutate in-place
    target.clicks += 1;
    target.children.push({
      id: nextId++,
      clicks: 0,
      children: [],
    });

    // Trigger re-render
    setRoot({ ...root });
  }

  return (
    <div>
      <ButtonTree node={root} onClick={handleClick} />
    </div>
  );
}

function ButtonTree({ node, onClick }) {
  return (
    <div style={{ marginLeft: 16 }}>
      <button onClick={() => onClick(node)}>
        Clicked {node.clicks} times
      </button>
      {node.children.map((child) => (
        <ButtonTree key={child.id} node={child} onClick={onClick} />
      ))}
    </div>
  );
}

export default App;
