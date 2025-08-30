import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SparklesProps {
  count?: number;
  visible: boolean;
  intense?: boolean;
}

export function Sparkles({
  count = 50,
  visible,
  intense = false,
}: SparklesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const [shouldShow, setShouldShow] = useState(false);

  // Controlar duração do confete
  useEffect(() => {
    if (visible) {
      setShouldShow(true);
      // Parar após 6 segundos (mais tempo para garantir que tampem a tela)
      const timer = setTimeout(() => {
        setShouldShow(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20, // Maior área horizontal
          Math.random() * 15 + 2, // Altura inicial mais alta
          (Math.random() - 0.5) * 20, // Maior área de profundidade
        ],
        velocity: [
          (Math.random() - 0.5) * 0.3,
          -Math.random() * 0.2 - 0.1, // Caindo para baixo
          (Math.random() - 0.5) * 0.3,
        ],
        scale: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }
    return temp;
  }, [count, intense]);

  useFrame((state) => {
    if (!shouldShow || !meshRef.current) return;

    const time = state.clock.getElapsedTime();

    particles.forEach((particle, index) => {
      // Movimento das partículas
      particle.position[0] += particle.velocity[0];
      particle.position[1] += particle.velocity[1];
      particle.position[2] += particle.velocity[2];
      particle.rotation += particle.rotationSpeed;

      // Reset quando sai de vista (para baixo)
      if (particle.position[1] < -10) {
        particle.position[1] = 15;
        particle.position[0] = (Math.random() - 0.5) * 20;
        particle.position[2] = (Math.random() - 0.5) * 20;
      }

      // Matriz de transformação
      const matrix = new THREE.Matrix4();
      matrix.makeTranslation(
        particle.position[0],
        particle.position[1],
        particle.position[2]
      );
      matrix.multiply(new THREE.Matrix4().makeRotationZ(particle.rotation));
      matrix.scale(
        new THREE.Vector3(
          particle.scale * (1 + Math.sin(time * 3 + index) * 0.2),
          particle.scale * (1 + Math.sin(time * 3 + index) * 0.2),
          particle.scale * (1 + Math.sin(time * 3 + index) * 0.2)
        )
      );

      meshRef.current.setMatrixAt(index, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!shouldShow) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color={intense ? "#ffffff" : "#fbbf24"}
        emissive={intense ? "#fbbf24" : "#f59e0b"}
        emissiveIntensity={intense ? 1.0 : 0.5}
        transparent
        opacity={intense ? 0.9 : 0.8}
      />
    </instancedMesh>
  );
}
