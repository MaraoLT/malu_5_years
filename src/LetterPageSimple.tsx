import { useState } from "react";

export function LetterPageSimple() {
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(-45deg, #ff9a9e, #fecfef, #fecfef, #ff9a9e)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
        overflow: "auto",
      }}
    >
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        style={{
          maxWidth: "800px",
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          margin: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#d53f8c",
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: "bold",
          }}
        >
          💕 Carta de 5 Anos de Namoro 💕
        </h1>

        <div
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "#2d3748",
            textAlign: "justify",
          }}
        >
          <p style={{ marginBottom: "20px" }}>
            Oi meu amor, como você está? Ficou meio amatongas esse presente, mas
            acontece kk...
          </p>

          <p style={{ marginBottom: "20px" }}>
            Hoje (se vc estiver lendo no dia 30/08/2025) fazemos 5 anos de
            namoro. E Meu Deus, 5 anos é tempo em... pra vc ter uma noção, um
            chiclete fica em média 5 minutos na boca e demora 5 anos pra se
            decompor. Alimentos bem conservados, como mel, vinagre, arroz...
            podem durar 5 anos para estragar.
          </p>

          <p style={{ marginBottom: "20px" }}>
            Enfim, fiz essa mínima surpresa pra vc, pq TE AMO muito e fico muito
            feliz de ter vc ao meu lado por tanto tempo.
          </p>

          <p style={{ marginBottom: "20px" }}>
            Sabe qual a diferença entre vc e um pote de mel?
          </p>

          <div
            style={{
              backgroundColor: "#f7fafc",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
              borderLeft: "4px solid #d53f8c",
            }}
          >
            {!answerRevealed ? (
              <button
                onClick={() => setAnswerRevealed(true)}
                style={{
                  backgroundColor: "#d53f8c",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Revelar resposta
              </button>
            ) : (
              <p
                style={{
                  color: "#d53f8c",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                O mel estraga depois de 5 anos... você só fica mais doce com o
                tempo! 🍯💕
              </p>
            )}
          </div>

          <p
            style={{
              marginBottom: "20px",
              color: "#d53f8c",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Obrigado por fazer parte da minha vida, por todos os momentos
            felizes que vc me proporcionou nessa meia década, por ser o AMA do
            meu TONGAS e por ser essa pessoa que eu admiro tanto. 💕
          </p>

          <p
            style={{
              fontSize: "1.1rem",
              fontStyle: "italic",
              textAlign: "center",
              color: "#4a5568",
            }}
          >
            Vc me inspira mt e sempre me faz querer ser uma pessoa melhor, tanto
            pra vc quanto pra mim mesmo. Desculpa por não ser exatamente o que
            vc quer/merece, mas saiba que sempre tento melhorar por vc.
          </p>

          <p
            style={{
              fontSize: "1.1rem",
              fontStyle: "italic",
              textAlign: "center",
              color: "#4a5568",
            }}
          >
            Novamente, obrigado por tudo que vc é e saiba que mudou a minha vida
            pra sempre. E não foi só agora, depois de 5 anos juntos, foi desde o
            início, desde quando a gente se conheceu, se aproximou, e começou a
            construir a nossa história juntos.
          </p>

          <p
            style={{
              marginBottom: "20px",
              color: "#d53f8c",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Feliz 5 anos de namoro Malu! E que venham muitos mais! 💖
          </p>

          {/* Botão Surpresa / Vídeo especial */}
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            {!videoVisible ? (
              <button
                onClick={() => setVideoVisible(true)}
                style={{
                  backgroundColor: "#e53e3e",
                  color: "white",
                  border: "none",
                  padding: "15px 30px",
                  borderRadius: "15px",
                  fontSize: "18px",
                  cursor: "pointer",
                  boxShadow: "0 8px 20px rgba(229, 62, 62, 0.3)",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.backgroundColor = "#dc2626";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "#e53e3e";
                }}
              >
                🎁 SURPRESA 🎁
              </button>
            ) : (
              <div>
                <video
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <source src="/video_5_years.mp4" type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "0.9rem",
                    color: "#6b7280",
                    fontStyle: "italic",
                  }}
                >
                  💕 Um vídeo especial para você 💕
                </p>
              </div>
            )}
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#d53f8c",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "25px",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(213, 63, 140, 0.3)",
              }}
            >
              ← Voltar ao presente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
