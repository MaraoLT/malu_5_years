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
  // const boxRef = useRef<THREE.Group>(null!); // Removido pois não está sendo usado
  const [hovered, setHovered] = useState(false);

  // Criar texturas procedurais para o presente
  const giftTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d")!;

    // Fundo vermelho
    context.fillStyle = "#dc2626";
    context.fillRect(0, 0, 256, 256);

    // Padrão de pontos brancos
    context.fillStyle = "#ffffff";
    for (let x = 0; x < 256; x += 32) {
      for (let y = 0; y < 256; y += 32) {
        context.beginPath();
        context.arc(x + 16, y + 16, 4, 0, Math.PI * 2);
        context.fill();
      }
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const ribbonTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d")!;

    // Gradiente dourado para a fita
    const gradient = context.createLinearGradient(0, 0, 128, 128);
    gradient.addColorStop(0, "#fbbf24");
    gradient.addColorStop(0.5, "#f59e0b");
    gradient.addColorStop(1, "#d97706");

    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);

    // Brilho metálico
    context.fillStyle = "rgba(255, 255, 255, 0.3)";
    context.fillRect(0, 0, 128, 20);
    context.fillRect(0, 50, 128, 10);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Tampa animada - abre pela metade (desliza para trás)
  const { lidZ } = useSpring({
    lidZ: opened ? -1.5 : 0,
    config: { tension: 200, friction: 20 },
  });

  // Laço animado (pode ser melhorado)
  // const { bowY } = useSpring({
  //   bowY: dragging ? 0.3 : 0,
  //   config: { tension: 300, friction: 10 },
  // });

  // Interação com o laço
  function handlePointerDown(e: any) {
    e.stopPropagation();
    if (!opened) onOpen();
  }
  function handlePointerUp(e: any) {
    e.stopPropagation();
  }

  return (
    <group>
      {/* Caixa principal com textura */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          map={giftTexture}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Tampa animada com textura - desliza para trás */}
      <animated.mesh
        ref={lidRef}
        position-x={0}
        position-y={1.01}
        position-z={lidZ}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.05, 0.4, 2.05]} />
        <meshStandardMaterial
          map={giftTexture}
          roughness={0.3}
          metalness={0.1}
        />
      </animated.mesh>

      {/* Laço mais realista - parte central */}
      <group
        position={[0, 1.4, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {/* Centro do laço */}
        <mesh castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
          <meshStandardMaterial
            map={ribbonTexture}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Laço esquerdo */}
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            map={ribbonTexture}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Laço direito */}
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            map={ribbonTexture}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Pontas do laço */}
        <mesh
          position={[-0.65, -0.15, 0]}
          rotation={[0, 0, Math.PI / 4]}
          castShadow
        >
          <coneGeometry args={[0.1, 0.4, 8]} />
          <meshStandardMaterial
            map={ribbonTexture}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        <mesh
          position={[0.65, -0.15, 0]}
          rotation={[0, 0, -Math.PI / 4]}
          castShadow
        >
          <coneGeometry args={[0.1, 0.4, 8]} />
          <meshStandardMaterial
            map={ribbonTexture}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </group>

      {/* Fita vertical com textura */}
      <mesh position={[0, 0, 1.03]} castShadow>
        <boxGeometry args={[0.25, 2.1, 0.05]} />
        <meshStandardMaterial
          map={ribbonTexture}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Fita horizontal com textura */}
      <mesh position={[1.03, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.25, 2.1, 0.05]} />
        <meshStandardMaterial
          map={ribbonTexture}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Partículas brilhantes quando aberto */}
      <Sparkles visible={opened} count={30} />
    </group>
  );
}
