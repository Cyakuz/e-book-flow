import * as React from 'react';
import './style.css';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ControlButton,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';




function ViewPanel({ onNextNodeClick }) {
  return (

    <Panel position="top-left"> <i className="fa-solid fa-eye fa-xl" onClick={onNextNodeClick} title="action"></i> </Panel>
  );
}

const defaultViewport = { x: 90, y: 0, zoom: 0.6 };

const pages_1 = [
  "https://i.ibb.co/StDvRJ4/01.jpg",
"https://i.ibb.co/tXMq7j0/02.jpg",
"https://i.ibb.co/zby6ScN/03.jpg",
"https://i.ibb.co/wQz6tbd/04.jpg",
"https://i.ibb.co/Ldw2RDW/05.jpg",
"https://i.ibb.co/n8JnD2g/06.jpg",
"https://i.ibb.co/cCg4BjH/07.jpg",
"https://i.ibb.co/PM97Rjh/08.jpg",
"https://i.ibb.co/1L03CmM/09.jpg",
"https://i.ibb.co/NF1qFD5/10.jpg",
"https://i.ibb.co/YBt98ST/11.jpg",
"https://i.ibb.co/dLwVn2L/12.jpg",
"https://i.ibb.co/BPFKjY8/13.jpg",
"https://i.ibb.co/CPHDzm1/14.jpg",
"https://i.ibb.co/0GNZCZf/15.jpg",
"https://i.ibb.co/LCJjW5x/16.jpg",
"https://i.ibb.co/9GrSLKy/17.jpg",
"https://i.ibb.co/6vjBMkS/18.jpg",
"https://i.ibb.co/yWP4nry/19.jpg",
"https://i.ibb.co/6wnHjZS/20.jpg",
"https://i.ibb.co/bsfRTH5/21.jpg",
"https://i.ibb.co/Nrcb5St/22.jpg",
"https://i.ibb.co/GHYZfpY/23.jpg",
"https://i.ibb.co/n75ykyy/24.jpg",
"https://i.ibb.co/nc4tw7G/25.jpg",
"https://i.ibb.co/JxdjD16/26.jpg",
"https://i.ibb.co/h1CvNxD/27.jpg",
"https://i.ibb.co/0GVRrZk/28.jpg",
"https://i.ibb.co/gybFtrZ/29.jpg",
"https://i.ibb.co/pb40tps/30.png",
"https://i.ibb.co/pKZmNRb/31.png",
"https://i.ibb.co/bRmqgy7/32.png",
"https://i.ibb.co/X5vWZx1/33.png",
"https://i.ibb.co/YkdtqPF/34.jpg",
"https://i.ibb.co/XJC7yWp/35.jpg",
"https://i.ibb.co/pWP0PzX/36.jpg",
"https://i.ibb.co/KNBp0FC/37.jpg",
"https://i.ibb.co/CHpbs4F/38.jpg",
"https://i.ibb.co/bFJH3V0/39.jpg",
"https://i.ibb.co/8xksDp7/40.jpg",
"https://i.ibb.co/4SC68WX/41.jpg",
"https://i.ibb.co/2Mqp4Wb/42.jpg",
"https://i.ibb.co/pXr845X/43.jpg",
"https://i.ibb.co/tKc985D/44.jpg",
"https://i.ibb.co/7KLVVGT/45.jpg",
"https://i.ibb.co/GdNk6Lg/46.jpg",
"https://i.ibb.co/h2pwMNz/47.jpg",
"https://i.ibb.co/z7HvLqn/48.jpg",
"https://i.ibb.co/qyBh31j/49.jpg",
"https://i.ibb.co/jzbSL4d/50.jpg"
];

const stil = {
  backgroundSize: 'cover',
  width: 700,
  height: 980
}

const initialNodes = pages_1.map((page, index) => ({
  id: `${index + 1}`,
  position: { x: 0, y: index * 1050 },
  draggaable: true,
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
  style: { stroke: 'red', },
  label: 'Devam...',
  labelBgPadding: [10, 10],
  labelBgBorderRadius: 4,
  labelBgStyle: { fill: '#FFCC00', color: '#fff'  },
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
      <ReactFlow nodes={nodes} edges={edges} defaultViewport={defaultViewport}  >
      <Panel position="top-left"> <i className="fa-solid fa-eye fa-xl"></i> </Panel>
        <Background variant="dots" gap={12} size={1} />
        <Controls/>
        <ViewPanel onNextNodeClick={handleNextNodeClick} />
      </ReactFlow>
    </div>
  );
}
