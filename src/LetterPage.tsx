import { motion } from "framer-motion";

export function LetterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full h-full overflow-auto"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-4xl mx-auto p-8">
        {/* Papel da carta */}
        <div
          className="rounded-lg p-8 mb-8 min-h-[600px] border-2 border-pink-200"
          style={{
            backgroundColor: '#ffffff',
            backgroundImage: "linear-gradient(to right, #fbbf24 0.5px, transparent 0.5px)",
            backgroundSize: "25px 25px",
            backgroundPosition: "35px 0",
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        >
          <div className="border-l-3 border-pink-300 pl-8">
            <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">
              💕 Carta de 5 Anos de Namoro 💕
            </h1>

            {/* Aqui você pode editar o texto diretamente no código */}
            <div className="text-lg leading-relaxed font-serif text-gray-800 space-y-4">
              <p>Oi meu amor, como você está? Ficou meio amatongas esse presente, mas acontece kk...</p>

              <p>
                Hoje (se vc estiver lendo no dia 30/08/2025) fazemos 5 anos de namoro. E Meu Deus, 5 anos
                é tempo em... pra vc ter uma noção, um chiclete fica em média 5 minutos na boca e demora 
                5 anos pra se decompor. Alimentos bem conservados, como mel, vinagre, arroz...,
                 demoram 5 anos para estragar.
              </p>

              <p>
                Enfim, fiz essa mínima surpresa pra vc, pq TE AMO muito e fico muito feliz de ter vc 
                ao meu lado por tanto tempo.
              </p>

            <p>Sabe qual a diferença entre vc e um pote de mel?</p>
            <button
                className="mt-2 px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition-colors"
                onClick={() => {
                    const answer = document.getElementById("answer");
                    if (answer) {
                        answer.classList.toggle("hidden");
                    }
                }}
            >
                Revelar resposta
            </button>
            <p
                id="answer"
                className="hidden mt-2 text-pink-700 font-semibold"
            >
                É que vc não estraga em 5 anos ;)
            </p>

              <p className="text-xl font-semibold text-pink-700 text-center mt-8">
                Obrigado por fazer parte da minha vida, por todos os momentos felizes que vc me
                proporcionou nessa meia década, e por ser essa pessoa que eu amo tanto. 💖
              </p>

              <p>
                Vc me inpira mt e sempre me faz querer ser uma pessoa melhor, tanto pra vc quanto 
                pra mim mesmo. Desculpa por não ser exatamente o que vc quer/merece, mas saiba que 
                sempre tento melhorar por vc.
              </p>
              <p className="text-right text-pink-600 font-medium mt-8">
                <br />
              </p>
            </div>
          </div>
        </div>

        {/* Seção de fotos */}
        <div className="rounded-lg p-8 border-2 border-pink-200" style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
            📸 Nossas Memórias 📸
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Aqui você pode adicionar suas fotos */}
            
            {/* Foto 1 */}
            <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg shadow-md flex items-center justify-center border-2 border-pink-200">
              <div className="text-center text-pink-600">
                <div className="text-4xl mb-2">💕</div>
                <p className="text-sm font-medium">Primeiro encontro</p>
              </div>
            </div>
            
            {/* Foto 2 */}
            <div className="aspect-square bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg shadow-md flex items-center justify-center border-2 border-rose-200">
              <div className="text-center text-rose-600">
                <div className="text-4xl mb-2">🌹</div>
                <p className="text-sm font-medium">Nossa primeira viagem</p>
              </div>
            </div>
            
            {/* Foto 3 */}
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-md flex items-center justify-center border-2 border-purple-200">
              <div className="text-center text-purple-600">
                <div className="text-4xl mb-2">🎂</div>
                <p className="text-sm font-medium">Aniversário especial</p>
              </div>
            </div>
            
            {/* Foto 4 */}
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-md flex items-center justify-center border-2 border-blue-200">
              <div className="text-center text-blue-600">
                <div className="text-4xl mb-2">🏖️</div>
                <p className="text-sm font-medium">Praia romântica</p>
              </div>
            </div>
            
            {/* Foto 5 */}
            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-md flex items-center justify-center border-2 border-green-200">
              <div className="text-center text-green-600">
                <div className="text-4xl mb-2">🎄</div>
                <p className="text-sm font-medium">Natal em família</p>
              </div>
            </div>
            
            {/* Foto 6 */}
            <div className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg shadow-md flex items-center justify-center border-2 border-yellow-200">
              <div className="text-center text-yellow-600">
                <div className="text-4xl mb-2">🌟</div>
                <p className="text-sm font-medium">Momentos especiais</p>
              </div>
            </div>
          </div>          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors shadow-lg"
            >
              ← Voltar ao presente
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
