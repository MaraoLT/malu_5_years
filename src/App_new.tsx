import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GiftBox3D } from "./GiftBox3DSimple";
import { motion } from "framer-motion";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showLetterPage, setShowLetterPage] = useState(false);
  const [letterText, setLetterText] = useState(
    "Meu amor,\n\nHá cinco anos você entrou na minha vida e transformou tudo em magia...\n\nCada dia ao seu lado é um presente.\n\nTe amo infinitamente! ❤️"
  );

  const openGift = () => {
    setOpened(true);

    // Após 3 segundos (quando as partículas tampam a tela), mostrar página da carta
    setTimeout(() => {
      setShowLetterPage(true);
    }, 3000);
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}
      className="bg-pink-100 relative overflow-hidden"
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
        // Página da carta editável
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 overflow-auto"
        >
          <div className="max-w-4xl mx-auto p-8">
            {/* Papel da carta */}
            <div
              className="bg-white shadow-2xl rounded-lg p-8 mb-8 min-h-[600px]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fbbf24 1px, transparent 1px)",
                backgroundSize: "30px 30px",
                backgroundPosition: "40px 0",
              }}
            >
              <div className="border-l-4 border-pink-400 pl-8">
                <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">
                  💕 Carta de Amor 💕
                </h1>

                <textarea
                  value={letterText}
                  onChange={(e) => setLetterText(e.target.value)}
                  className="w-full h-96 p-4 text-lg leading-relaxed border-none resize-none bg-transparent focus:outline-none font-serif text-gray-800"
                  placeholder="Escreva sua mensagem de amor aqui..."
                  style={{
                    fontFamily: "Georgia, serif",
                    lineHeight: "2",
                  }}
                />
              </div>
            </div>

            {/* Seção de fotos */}
            <div className="bg-white shadow-2xl rounded-lg p-8">
              <h2 className="text-2xl font-bold text-pink-800 mb-6 text-center">
                📸 Nossas Memórias 📸
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholders para fotos */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg shadow-md flex items-center justify-center border-4 border-white"
                  >
                    <div className="text-center text-pink-700">
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-sm font-medium">Foto {i + 1}</p>
                      <p className="text-xs">Clique para adicionar</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowLetterPage(false)}
                  className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors shadow-lg"
                >
                  ← Voltar ao presente
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
