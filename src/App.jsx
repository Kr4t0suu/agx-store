import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { supabase } from "./supabase";

import CartSidebar from "./components/CartSidebar";
import Navbar from "./components/Navbar";

import { useCart } from "./context/CartContext";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [
    categoriaSelecionada,
    setCategoriaSelecionada,
  ] = useState("Todos");

  const { addToCart } = useCart();

  const isMobile =
    window.innerWidth <= 768;

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    setLoading(true);

    const { data, error } =
      await supabase
        .from("produtos")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (error) {
      console.log(error);
    } else {
      const produtosCorrigidos =
        (data || []).map(
          (produto) => ({
            ...produto,
            preco:
              Number(
                produto.preco
              ) || 0,
          })
        );

      setProdutos(
        produtosCorrigidos
      );
    }

    setLoading(false);
  }

  const categorias = [
    "Todos",

    ...new Set(
      produtos.map(
        (produto) =>
          produto.categoria ||
          "Outros"
      )
    ),
  ];

  const produtosFiltrados =
    categoriaSelecionada ===
    "Todos"
      ? produtos
      : produtos.filter(
          (produto) =>
            produto.categoria ===
            categoriaSelecionada
        );

  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Arial",
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: isMobile
            ? "110px 10px 20px"
            : "140px 20px 30px",
        }}
      >
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: isMobile
                ? "38px"
                : "52px",
              fontWeight: "900",
              marginBottom: "10px",
              letterSpacing: "-2px",
            }}
          >
            LOJA AGX
          </h1>

          <p
            style={{
              color: "#888",
              fontSize: isMobile
                ? "15px"
                : "18px",
            }}
          >
            Produtos premium e
            virais
          </p>
        </motion.div>

        {/* CATEGORIAS */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          {categorias.map(
            (categoria) => (
              <button
                key={categoria}
                onClick={() =>
                  setCategoriaSelecionada(
                    categoria
                  )
                }
                style={{
                  padding: isMobile
                    ? "10px 16px"
                    : "10px 18px",

                  borderRadius:
                    "999px",

                  border:
                    categoriaSelecionada ===
                    categoria
                      ? "none"
                      : "1px solid #333",

                  background:
                    categoriaSelecionada ===
                    categoria
                      ? "#d4af37"
                      : "#111",

                  color:
                    categoriaSelecionada ===
                    categoria
                      ? "#000"
                      : "#fff",

                  fontWeight:
                    "bold",

                  fontSize: isMobile
                    ? "14px"
                    : "16px",

                  cursor:
                    "pointer",

                  transition:
                    "0.3s",
                }}
              >
                {categoria}
              </button>
            )
          )}
        </div>

        {/* LOADING */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              padding: "100px",
            }}
          >
            <h2>
              Carregando produtos...
            </h2>
          </div>
        ) : (
          <motion.div
            layout
            style={{
              display: "grid",

              gridTemplateColumns:
                isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(auto-fit,minmax(230px,1fr))",

              gap: isMobile
                ? "10px"
                : "18px",
            }}
          >
            <AnimatePresence>
              {produtosFiltrados.map(
                (produto) => (
                  <motion.div
                    key={produto.id}
                    layout
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    style={{
                      background:
                        "#111",

                      border:
                        "1px solid #1f1f1f",

                      borderRadius:
                        isMobile
                          ? "16px"
                          : "22px",

                      overflow:
                        "hidden",

                      boxShadow:
                        "0 0 20px rgba(0,0,0,0.25)",

                      transition:
                        "0.3s",
                    }}
                  >
                    {/* IMAGEM */}
                    <div
                      style={{
                        overflow:
                          "hidden",
                      }}
                    >
                      <img
                        src={
                          produto.imagem ||
                          "https://placehold.co/600x600/111/FFF?text=AGX"
                        }
                        alt={
                          produto.nome
                        }
                        onError={(
                          e
                        ) => {
                          e.target.src =
                            "https://placehold.co/600x600/111/FFF?text=AGX";
                        }}
                        style={{
                          width:
                            "100%",

                          height:
                            isMobile
                              ? "150px"
                              : "240px",

                          objectFit:
                            "cover",

                          transition:
                            "0.4s",
                        }}
                      />
                    </div>

                    {/* INFO */}
                    <div
                      style={{
                        padding:
                          isMobile
                            ? "10px"
                            : "16px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize:
                            isMobile
                              ? "15px"
                              : "20px",

                          fontWeight:
                            "800",

                          marginBottom:
                            "8px",

                          lineHeight:
                            "1.3",

                          minHeight:
                            isMobile
                              ? "42px"
                              : "auto",
                        }}
                      >
                        {
                          produto.nome
                        }
                      </h2>

                      <p
                        style={{
                          color:
                            "#777",

                          marginBottom:
                            "10px",

                          fontSize:
                            isMobile
                              ? "12px"
                              : "14px",
                        }}
                      >
                        {
                          produto.categoria
                        }
                      </p>

                      <h3
                        style={{
                          color:
                            "#d4af37",

                          fontSize:
                            isMobile
                              ? "20px"
                              : "28px",

                          fontWeight:
                            "900",

                          marginBottom:
                            "12px",
                        }}
                      >
                        R${" "}
                        {produto.preco.toFixed(
                          2
                        )}
                      </h3>

                      <button
                        onClick={() =>
                          addToCart(
                            {
                              ...produto,
                              quantidade: 1,
                            }
                          )
                        }
                        style={{
                          width:
                            "100%",

                          padding:
                            isMobile
                              ? "10px"
                              : "12px",

                          background:
                            "#d4af37",

                          color:
                            "#000",

                          border:
                            "none",

                          borderRadius:
                            isMobile
                              ? "10px"
                              : "12px",

                          fontWeight:
                            "bold",

                          fontSize:
                            isMobile
                              ? "13px"
                              : "15px",

                          cursor:
                            "pointer",

                          transition:
                            "0.3s",
                        }}
                      >
                        Comprar Agora
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* SIDEBAR */}
      <CartSidebar />
    </div>
  );
}

export default App;