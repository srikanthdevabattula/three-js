import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Room = () => {
  const roomWidth = 32;
  const roomDepth = 32;
  const roomHeight = 10;

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshBasicMaterial color="gray" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshBasicMaterial color="gray" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshBasicMaterial color="lightgray" />
      </mesh>
      <mesh position={[0, roomHeight / 2, roomDepth / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshBasicMaterial color="lightgray" />
      </mesh>
      <mesh position={[-roomWidth / 2, roomHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshBasicMaterial color="lightgray" />
      </mesh>
      <mesh position={[roomWidth / 2, roomHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshBasicMaterial color="lightgray" />
      </mesh>
    </>
  );
};

const Model = ({ url, position, scale }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} scale={scale} />;
};

const RoomScene = () => {
  const models = [
    { url: '/model1.glb', position: [5, 0, 5], scale: [1, 1, 1] },
    { url: '/model2.glb', position: [6, 0, 9], scale: [0.01, 0.01, 0.01] }, // Scaled down to fit in the room
    { url: '/model3.glb', position: [1, 0.5, -15], scale: [1, 1, 1] }, // Adjusted y position to place on the floor
  
    { url: '/model4.glb', position: [1, 1.5, -15], scale: [0.1, 0.1, 0.1] },
    { url: '/model5.glb', position: [-4, 0.2, 11], scale: [0.5, 0.5, 0.5] }, // Scaled down to fit in the room
    { url: '/model6.glb', position: [10, 0, 1], scale: [0.05, 0.05, 0.05] }, // Adjusted y position to place on the floor
 ];

  return (
    <Canvas camera={{ position: [0, 15, 40], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <Room />
      {models.map((model, index) => (
        <Model key={index} url={model.url} position={model.position} scale={model.scale} />
      ))}
      <OrbitControls />
    </Canvas>
  );
};

export default RoomScene;
