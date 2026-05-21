import { useEffect, useState } from "react";
import { supabase } from "./supabase";

import CartSidebar from "./components/CartSidebar";
import { useCart } from "./context/CartContext";

function App() {
  const [produtos, setProdutos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { addToCart } = useCart();

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
          ascending: true,
        });

    if (error) {
      console.log(
        "ERRO SUPABASE:",
        error
      );
    } else {
      console.log(
        "PRODUTOS:",
        data
      );

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

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Arial",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "30px",
          }}
        >
          AGX STORE
        </h1>

        {loading ? (
          <h2>
            Carregando produtos...
          </h2>
        ) : (
          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",

              gap: "20px",
            }}
          >
            {produtos.map(
              (produto) => (
                <div
                  key={produto.id}
                  style={{
                    background:
                      "#111",

                    border:
                      "1px solid #333",

                    borderRadius:
                      "15px",

                    overflow:
                      "hidden",
                  }}
                >
                  <img
                    src={
                      produto.imagem
                    }
                    alt={
                      produto.nome
                    }
                    onError={(
                      e
                    ) => {
                      e.target.src =
                        "https://via.placeholder.com/500x500?text=Imagem+Indisponivel";
                    }}
                    style={{
                      width:
                        "100%",

                      height:
                        "300px",

                      objectFit:
                        "cover",
                    }}
                  />

                  <div
                    style={{
                      padding:
                        "15px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize:
                          "28px",

                        marginBottom:
                          "5px",
                      }}
                    >
                      {
                        produto.nome
                      }
                    </h2>

                    <p
                      style={{
                        color:
                          "#ccc",

                        marginBottom:
                          "10px",
                      }}
                    >
                      {
                        produto.categoria
                      }
                    </p>

                    <h3
                      style={{
                        color:
                          "#00ff88",

                        fontSize:
                          "30px",

                        marginBottom:
                          "15px",
                      }}
                    >
                      R${" "}
                      {Number(
                        produto.preco ||
                          0
                      ).toFixed(2)}
                    </h3>

                    <button
                      onClick={() =>
                        addToCart({
                          ...produto,

                          preco:
                            Number(
                              produto.preco
                            ) || 0,

                          quantidade: 1,
                        })
                      }
                      style={{
                        width:
                          "100%",

                        padding:
                          "14px",

                        background:
                          "#00ff88",

                        color:
                          "#000",

                        border:
                          "none",

                        borderRadius:
                          "8px",

                        fontWeight:
                          "bold",

                        fontSize:
                          "16px",

                        cursor:
                          "pointer",
                      }}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <CartSidebar />
    </div>
  );
}

export default App;