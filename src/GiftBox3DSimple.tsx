import { useRef, useState, useMemo } from "react";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from "three";
import { Sparkles } from "./Sparkles";

interface GiftBoxProps {
  opened: boolean;
  onOpen: () => void;
}

export function GiftBox3D({ opened, onOpen }: GiftBoxProps) {
  const lidRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Tampa animada - abre pela metade (desliza para trás) - DISTÂNCIA REDUZIDA
  const { lidZ } = useSpring({
    lidZ: opened ? -2.0 : 0,
    config: { tension: 200, friction: 20 },
  });

  // Interação com a caixa toda
  function handleClick(e: any) {
    e.stopPropagation();
    if (!opened) onOpen();
  }

  // Criar materiais para as faces da caixa
  const materials = useMemo(() => {
    return [
      new THREE.MeshStandardMaterial({ color: "#ec4899" }), // direita
      new THREE.MeshStandardMaterial({ color: "#ec4899" }), // esquerda
      new THREE.MeshStandardMaterial({ color: "#000000" }), // topo - PRETO
      new THREE.MeshStandardMaterial({ color: "#ec4899" }), // fundo
      new THREE.MeshStandardMaterial({ color: "#ec4899" }), // frente
      new THREE.MeshStandardMaterial({ color: "#ec4899" }), // trás
    ];
  }, []);

  return (
    <group
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
      position={[0, 0, 0]}
    >
      {/* Caixa principal com faces diferentes - TOPO PRETO */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow material={materials}>
        <boxGeometry args={[2, 2, 2]} />
      </mesh>

      {/* Interior preto da caixa quando aberta */}
      {opened && (
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.9, 1.9, 1.9]} />
          <meshStandardMaterial
            color="#000000"
            roughness={0.9}
            metalness={0.0}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Tampa animada com cor rosa - desliza para trás */}
      <animated.mesh
        ref={lidRef}
        position-x={0}
        position-y={1.01}
        position-z={lidZ}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.1, 0.4, 2.1]} />
        <meshStandardMaterial color="#ec4899" roughness={0.3} metalness={0.1} />
      </animated.mesh>

      {/* Fitas em todos os lados - CORES SÓLIDAS */}
      {/* Fita frente */}
      <mesh position={[0, 0, 1.05]} castShadow>
        <boxGeometry args={[0.25, 2.2, 0.05]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Fita trás */}
      <mesh position={[0, 0, -1.05]} castShadow>
        <boxGeometry args={[0.25, 2.2, 0.05]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Fita direita */}
      <mesh position={[1.05, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.25, 2.2, 0.05]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Fita esquerda */}
      <mesh position={[-1.05, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.25, 2.2, 0.05]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Sparkles when opened - MUITO INTENSO */}
      <Sparkles visible={opened} count={800} intense={true} />
    </group>
  );
}
