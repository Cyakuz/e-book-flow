import * as React from 'react';
import './style.css';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ControlButton
} from 'reactflow';
import 'reactflow/dist/style.css';

function CustomControls({ onNextNodeClick }) {
  return (
    <Controls>
      <ControlButton onClick={onNextNodeClick} title="action">
        <div>D</div>
      </ControlButton>
    </Controls>
  );
}

const defaultViewport = { x: 90, y: 0, zoom: 0.6 };

const pages_1 = [
  "https://i.ibb.co/StDvRJ4/01.jpg",
  "https://i.ibb.co/tXMq7j0/02.jpg",
  "https://i.ibb.co/zby6ScN/03.jpg",
];

const stil = {
  backgroundColor: '#edef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url(https://i.ibb.co/jzbSL4d/50.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: 700,
  height: 980
}

const initialNodes = pages_1.map((page, index) => ({
  id: `${index + 1}`,
  position: { x: 0, y: index * 1050 },
  data: { label: `${index + 1}` },
  style: {
    ...stil,
    backgroundImage: `url(${page})`,
    display: index === 0 ? 'flex' : 'none',
  },
}));

const initialEdges = initialNodes.slice(0, initialNodes.length - 1).map((_, index) => ({
  id: `e${index + 1}-${index + 2}`,
  source: `${index + 1}`,
  target: `${index + 2}`,
  animated: true,
  style: { stroke: 'red' },
  label: 'Devam...',
  labelBgPadding: [10, 10],
  labelBgBorderRadius: 4,
  labelBgStyle: { fill: '#FFCC00', color: '#fff' },
}));

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [currentNodeIndex, setCurrentNodeIndex] = React.useState(0);

  const handleNextNodeClick = () => {
    if (currentNodeIndex < initialNodes.length - 1) {
      const nextNodeIndex = currentNodeIndex + 1;
      setCurrentNodeIndex(nextNodeIndex);

      // Set the next node visible
      const updatedNodes = nodes.map((node, index) => ({
        ...node,
        style: {
          ...node.style,
          display: index <= nextNodeIndex ? 'flex' : 'none',
        },
      }));
      setNodes(updatedNodes);
    }
  };


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} defaultViewport={defaultViewport} >
        <Background variant="dots" gap={12} size={1} />
        <CustomControls onNextNodeClick={handleNextNodeClick} />
      </ReactFlow>
    </div>
  );
}
