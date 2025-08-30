import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Rose3D() {
  const roseRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (roseRef.current) {
      roseRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={roseRef} position={[0, -0.5, 0]}>
      {/* Caule */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 2, 8]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>

      {/* Folhas */}
      <mesh position={[-0.3, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#16a34a" roughness={0.7} />
      </mesh>

      <mesh position={[0.3, -0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#16a34a" roughness={0.7} />
      </mesh>

      {/* Pétalas da rosa */}
      <group position={[0, 0.5, 0]}>
        {/* Pétalas externas */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 0.4,
              Math.sin(i * 0.3) * 0.1,
              Math.sin((i / 8) * Math.PI * 2) * 0.4,
            ]}
            rotation={[Math.PI / 6, (i / 8) * Math.PI * 2, Math.sin(i) * 0.3]}
          >
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial
              color="#e11d48"
              roughness={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}

        {/* Pétalas internas */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={`inner-${i}`}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 0.2,
              0.1,
              Math.sin((i / 6) * Math.PI * 2) * 0.2,
            ]}
            rotation={[Math.PI / 4, (i / 6) * Math.PI * 2, 0]}
          >
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial
              color="#be185d"
              roughness={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}

        {/* Centro da rosa */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#881337" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}
