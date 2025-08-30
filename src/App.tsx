import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GiftBox3D } from "./GiftBox3DSimple";
import { LetterPageSimple } from "./LetterPageSimple";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showLetterPage, setShowLetterPage] = useState(false);

  const openGift = () => {
    setOpened(true);

    // Tocar som de abertura do presente
    try {
      // Criar um som de trompeta usando Web Audio API
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // Som de trompeta - fanfarra de celebração
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const oscillator3 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Conectar os osciladores
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      oscillator3.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configurar como onda quadrada para som mais "metálico"
      oscillator1.type = 'sawtooth';
      oscillator2.type = 'sawtooth';
      oscillator3.type = 'triangle';

      // Sequência de notas da trompeta (fanfarra)
      const currentTime = audioContext.currentTime;
      
      // Primeira nota (C5 - 523 Hz)
      oscillator1.frequency.setValueAtTime(523, currentTime);
      oscillator2.frequency.setValueAtTime(523 * 2, currentTime); // Oitava superior
      oscillator3.frequency.setValueAtTime(523 / 2, currentTime); // Oitava inferior
      
      // Segunda nota (E5 - 659 Hz) após 0.2s
      oscillator1.frequency.setValueAtTime(659, currentTime + 0.2);
      oscillator2.frequency.setValueAtTime(659 * 2, currentTime + 0.2);
      oscillator3.frequency.setValueAtTime(659 / 2, currentTime + 0.2);
      
      // Terceira nota (G5 - 784 Hz) após 0.4s
      oscillator1.frequency.setValueAtTime(784, currentTime + 0.4);
      oscillator2.frequency.setValueAtTime(784 * 2, currentTime + 0.4);
      oscillator3.frequency.setValueAtTime(784 / 2, currentTime + 0.4);
      
      // Nota final sustentada (C6 - 1047 Hz) após 0.6s
      oscillator1.frequency.setValueAtTime(1047, currentTime + 0.6);
      oscillator2.frequency.setValueAtTime(1047 * 2, currentTime + 0.6);
      oscillator3.frequency.setValueAtTime(1047 / 2, currentTime + 0.6);

      // Envelope de volume (attack, sustain, decay) - Volume mais baixo
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.15, currentTime + 0.8);
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 1.2);

      // Iniciar e parar os osciladores
      oscillator1.start(currentTime);
      oscillator2.start(currentTime);
      oscillator3.start(currentTime);
      
      oscillator1.stop(currentTime + 1.2);
      oscillator2.stop(currentTime + 1.2);
      oscillator3.stop(currentTime + 1.2);
    } catch (error) {
      console.log("Não foi possível tocar o som:", error);
    }

    // Após 3 segundos (quando as partículas tampam a tela), mostrar página da carta
    setTimeout(() => {
      setShowLetterPage(true);
    }, 3000);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #fce7f3, #f3e8ff, #ddd6fe)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!showLetterPage ? (
        // Tela do presente
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Canvas
            style={{ width: "100%", height: "100%", display: "block" }}
            shadows
            camera={{ position: [0, 0, 5], fov: 50 }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={0.8}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-5, 5, 5]} intensity={0.3} color="#fbbf24" />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 6}
            />

            <GiftBox3D opened={opened} onOpen={openGift} />

            {/* Chão para sombras */}
            <mesh
              position={[0, -3, 0]}
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[15, 15]} />
              <meshStandardMaterial color="#f8fafc" opacity={0.3} transparent />
            </mesh>
          </Canvas>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-lg font-medium text-gray-800 bg-white/80 px-4 py-2 rounded-lg shadow-lg">
              {!opened ? "Clique no presente para abrir 🎁" : "Surpresa! 💕"}
            </p>
          </div>
        </div>
      ) : (
        // Página da carta
        <LetterPageSimple />
      )}
    </div>
  );
}
