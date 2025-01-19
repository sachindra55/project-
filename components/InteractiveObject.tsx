import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveObjectProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  name: string;
  description: string;
  type: '3d-model' | 'info-point' | 'portal';
  onClick?: () => void;
  animate?: boolean;
}

export function InteractiveObject({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  color = '#ffffff',
  name,
  description,
  type,
  onClick,
  animate = true,
}: InteractiveObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !animate) return;
    
    // Different animations based on type
    if (type === '3d-model') {
      meshRef.current.rotation.y += 0.01;
    } else if (type === 'info-point') {
      meshRef.current.scale.x = meshRef.current.scale.y = 
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    } else if (type === 'portal') {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.scale.x = meshRef.current.scale.y = 
        1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
    }
  });

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
    if (onClick) onClick();
  };

  const getGeometry = () => {
    switch (type) {
      case '3d-model':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'info-point':
        return <sphereGeometry args={[0.3, 32, 32]} />;
      case 'portal':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
    }
  };

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        scale={scale}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getGeometry()}
        <meshStandardMaterial
          color={hovered ? '#ff0000' : color}
          metalness={0.5}
          roughness={0.5}
          emissive={hovered ? '#ff0000' : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>

      {(hovered || showInfo) && (
        <Html position={[0, 1, 0]} center>
          <div className="bg-black bg-opacity-75 text-white p-2 rounded-lg shadow-lg">
            <h3 className="font-bold">{name}</h3>
            {showInfo && <p className="text-sm mt-1">{description}</p>}
          </div>
        </Html>
      )}
    </group>
  );
}
