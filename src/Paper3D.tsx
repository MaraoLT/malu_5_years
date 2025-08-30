import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from "three";

interface Paper3DProps {
  visible: boolean;
}

export function Paper3D({ visible }: Paper3DProps) {
  const paperRef = useRef<THREE.Mesh>(null);

  // Animação de flutuação suave
  useFrame((state) => {
    if (paperRef.current && visible) {
      paperRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      paperRef.current.position.y =
        1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  // Animação de saída do presente (começa de dentro)
  const { scale, positionY } = useSpring({
    scale: visible ? 1 : 0,
    positionY: visible ? 1 : 0, // Sai de dentro do presente
    config: { tension: 120, friction: 20 },
  });

  if (!visible) return null;

  return (
    <animated.group scale={scale} position-y={positionY}>
      {/* Papel principal */}
      <animated.mesh
        ref={paperRef}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 2.8, 0.02]} />
        <meshStandardMaterial color="#fefefe" roughness={0.8} metalness={0.1} />
      </animated.mesh>

      {/* Texto "TE AMO" na carta */}
      {/* Letra T */}
      <mesh position={[-0.6, 0.5, 0.015]} castShadow>
        <boxGeometry args={[0.3, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[-0.6, 0.3, 0.015]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>

      {/* Letra E */}
      <mesh position={[-0.2, 0.4, 0.015]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0, 0.5, 0.015]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0, 0.4, 0.015]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0, 0.3, 0.015]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>

      {/* Letra A */}
      <mesh position={[0.4, 0.4, 0.015]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.6, 0.4, 0.015]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.5, 0.5, 0.015]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.5, 0.4, 0.015]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>

      {/* Letra M */}
      <mesh position={[-0.4, -0.1, 0.015]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[-0.2, -0.1, 0.015]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[-0.3, 0.15, 0.015]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[-0.3, 0.05, 0.015]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>

      {/* Letra O */}
      <mesh position={[0.1, -0.1, 0.015]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.3, -0.1, 0.015]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.2, 0.15, 0.015]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.2, -0.35, 0.015]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.01]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>

      {/* Coração no final */}
      <mesh position={[0.3, -1.0, 0.015]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.15, -1.0, 0.015]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0.225, -1.12, 0.015]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
    </animated.group>
  );
}
