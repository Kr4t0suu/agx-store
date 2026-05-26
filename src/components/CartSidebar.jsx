import { useState } from "react";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Loader2,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useCart } from "../context/CartContext";
import { supabase } from "../supabase";

function CartSidebar() {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCart();

  const [isOpen, setIsOpen] =
    useState(false);

  const [
    loadingCheckout,
    setLoadingCheckout,
  ] = useState(false);

  const total = cart.reduce(
    (acc, item) => {
      return (
        acc +
        (Number(item.preco) || 0) *
          (Number(
            item.quantidade
          ) || 1)
      );
    },
    0
  );

  async function finalizarCompra() {
    try {
      if (cart.length === 0) {
        alert("Carrinho vazio");
        return;
      }

      setLoadingCheckout(true);

      const produtosFormatados =
        cart.map((item) => ({
          id: item.id,

          nome: item.nome,

          preco:
            Number(item.preco) || 0,

          quantidade:
            Number(
              item.quantidade
            ) || 1,

          imagem:
            item.imagem || "",
        }));

      // SALVA PEDIDO
      const { error } =
        await supabase
          .from("pedidos")
          .insert([
            {
              produtos:
                produtosFormatados,

              valor_total:
                total,

              status:
                "pendente",
            },
          ]);

      if (error) {
        console.log(error);

        alert(error.message);

        setLoadingCheckout(false);

        return;
      }

      // MERCADO PAGO
      const resposta =
        await fetch(
          "/api/create-preference",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              items:
                produtosFormatados.map(
                  (item) => ({
                    nome:
                      item.nome,

                    preco:
                      Number(
                        item.preco
                      ),

                    quantidade:
                      Number(
                        item.quantidade
                      ),
                  })
                ),
            }),
          }
        );

      const dataPagamento =
        await resposta.json();

      if (
        dataPagamento.init_point
      ) {
        clearCart();

        // ABRE MAIS RÁPIDO
        window.open(
          dataPagamento.init_point,
          "_blank"
        );
      } else {
        alert(
          "Erro Mercado Pago"
        );
      }
    } catch (erro) {
      console.log(erro);

      alert(
        "Erro ao finalizar compra"
      );
    } finally {
      setLoadingCheckout(false);
    }
  }

  return (
    <>
      {/* BOTÃO FLUTUANTE PREMIUM */}
      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() =>
          setIsOpen(true)
        }
        style={{
          position: "fixed",

          bottom: "25px",

          right: "25px",

          zIndex: 9990,

          width: "68px",

          height: "68px",

          borderRadius: "50%",

          border:
            "1px solid rgba(255,215,0,0.15)",

          background:
            "linear-gradient(135deg,#d4af37,#f5d76e)",

          display: "flex",

          alignItems: "center",

          justifyContent:
            "center",

          cursor: "pointer",

          boxShadow:
            "0 0 30px rgba(212,175,55,0.35)",
        }}
      >
        <ShoppingBag
          size={28}
          color="#000"
        />

        {cart.length > 0 && (
          <div
            style={{
              position:
                "absolute",

              top: "-4px",

              right: "-4px",

              background:
                "#fff",

              color: "#000",

              borderRadius:
                "50%",

              width: "24px",

              height: "24px",

              fontSize: "11px",

              fontWeight:
                "bold",

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              border:
                "2px solid #050505",
            }}
          >
            {cart.length}
          </div>
        )}
      </motion.button>

      {/* SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setIsOpen(false)
              }
              style={{
                position:
                  "fixed",

                inset: 0,

                background:
                  "rgba(0,0,0,0.7)",

                backdropFilter:
                  "blur(6px)",

                zIndex: 9995,
              }}
            />

            {/* SIDEBAR */}
            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 180,
              }}
              style={{
                position:
                  "fixed",

                top: 0,

                right: 0,

                width: "100%",

                maxWidth:
                  "420px",

                height: "100vh",

                background:
                  "#050505",

                zIndex: 9999,

                display: "flex",

                flexDirection:
                  "column",

                borderLeft:
                  "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  padding: "22px",

                  display:
                    "flex",

                  justifyContent:
                    "space-between",

                  alignItems:
                    "center",

                  borderBottom:
                    "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <h2
                  style={{
                    color:
                      "#fff",

                    fontSize:
                      "28px",

                    fontWeight:
                      "900",

                    margin: 0,
                  }}
                >
                  Seu Carrinho
                </h2>

                <button
                  onClick={() =>
                    setIsOpen(
                      false
                    )
                  }
                  style={{
                    background:
                      "transparent",

                    border:
                      "none",

                    color:
                      "#fff",

                    cursor:
                      "pointer",
                  }}
                >
                  <X size={30} />
                </button>
              </div>

              {/* PRODUTOS */}
              <div
                style={{
                  flex: 1,

                  overflowY:
                    "auto",

                  padding:
                    "18px",
                }}
              >
                {cart.length ===
                0 ? (
                  <div
                    style={{
                      color:
                        "#777",

                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      height:
                        "100%",

                      fontSize:
                        "18px",
                    }}
                  >
                    Seu carrinho
                    está vazio
                  </div>
                ) : (
                  cart.map(
                    (
                      item
                    ) => (
                      <div
                        key={
                          item.id
                        }
                        style={{
                          background:
                            "#111",

                          border:
                            "1px solid rgba(255,255,255,0.05)",

                          borderRadius:
                            "22px",

                          padding:
                            "14px",

                          marginBottom:
                            "18px",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",

                            gap: "14px",
                          }}
                        >
                          <img
                            src={
                              item.imagem
                            }
                            alt={
                              item.nome
                            }
                            style={{
                              width:
                                "95px",

                              height:
                                "95px",

                              objectFit:
                                "cover",

                              borderRadius:
                                "16px",
                            }}
                          />

                          <div
                            style={{
                              flex: 1,
                            }}
                          >
                            <h4
                              style={{
                                color:
                                  "#fff",

                                margin:
                                  "0 0 8px 0",

                                fontSize:
                                  "17px",

                                fontWeight:
                                  "700",

                                lineHeight:
                                  "1.3",
                              }}
                            >
                              {
                                item.nome
                              }
                            </h4>

                            <p
                              style={{
                                color:
                                  "#d4af37",

                                margin:
                                  "0 0 14px 0",

                                fontWeight:
                                  "bold",

                                fontSize:
                                  "24px",
                              }}
                            >
                              R${" "}
                              {Number(
                                item.preco
                              ).toFixed(
                                2
                              )}
                            </p>

                            <div
                              style={{
                                display:
                                  "flex",

                                alignItems:
                                  "center",

                                justifyContent:
                                  "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display:
                                    "flex",

                                  alignItems:
                                    "center",

                                  gap: "10px",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    removeFromCart(
                                      item.id
                                    )
                                  }
                                  style={{
                                    width:
                                      "34px",

                                    height:
                                      "34px",

                                    border:
                                      "none",

                                    borderRadius:
                                      "10px",

                                    background:
                                      "#1f1f1f",

                                    color:
                                      "#fff",

                                    cursor:
                                      "pointer",
                                  }}
                                >
                                  <Minus
                                    size={
                                      14
                                    }
                                  />
                                </button>

                                <span
                                  style={{
                                    color:
                                      "#fff",

                                    fontWeight:
                                      "bold",
                                  }}
                                >
                                  {
                                    item.quantidade
                                  }
                                </span>

                                <button
                                  onClick={() =>
                                    addToCart(
                                      item
                                    )
                                  }
                                  style={{
                                    width:
                                      "34px",

                                    height:
                                      "34px",

                                    border:
                                      "none",

                                    borderRadius:
                                      "10px",

                                    background:
                                      "#d4af37",

                                    color:
                                      "#000",

                                    cursor:
                                      "pointer",
                                  }}
                                >
                                  <Plus
                                    size={
                                      14
                                    }
                                  />
                                </button>
                              </div>

                              <button
                                onClick={() =>
                                  removeFromCart(
                                    item.id
                                  )
                                }
                                style={{
                                  width:
                                    "36px",

                                  height:
                                    "36px",

                                  border:
                                    "none",

                                  borderRadius:
                                    "10px",

                                  background:
                                    "#ff3b30",

                                  color:
                                    "#fff",

                                  cursor:
                                    "pointer",
                                }}
                              >
                                <Trash2
                                  size={
                                    16
                                  }
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>

              {/* FOOTER */}
              {cart.length > 0 && (
                <div
                  style={{
                    padding:
                      "22px",

                    borderTop:
                      "1px solid rgba(255,255,255,0.05)",

                    background:
                      "#080808",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",

                      justifyContent:
                        "space-between",

                      alignItems:
                        "center",

                      marginBottom:
                        "18px",
                    }}
                  >
                    <span
                      style={{
                        color:
                          "#fff",

                        fontSize:
                          "20px",

                        fontWeight:
                          "bold",
                      }}
                    >
                      Total
                    </span>

                    <span
                      style={{
                        color:
                          "#d4af37",

                        fontSize:
                          "30px",

                        fontWeight:
                          "900",
                      }}
                    >
                      R${" "}
                      {total.toFixed(
                        2
                      )}
                    </span>
                  </div>

                  <button
                    onClick={
                      finalizarCompra
                    }
                    disabled={
                      loadingCheckout
                    }
                    style={{
                      width:
                        "100%",

                      padding:
                        "17px",

                      border:
                        "none",

                      borderRadius:
                        "16px",

                      background:
                        "linear-gradient(135deg,#d4af37,#f5d76e)",

                      color:
                        "#000",

                      fontWeight:
                        "900",

                      fontSize:
                        "17px",

                      cursor:
                        loadingCheckout
                          ? "not-allowed"
                          : "pointer",

                      opacity:
                        loadingCheckout
                          ? 0.7
                          : 1,

                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      gap: "10px",

                      boxShadow:
                        "0 0 25px rgba(212,175,55,0.25)",
                    }}
                  >
                    {loadingCheckout ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        CARREGANDO...
                      </>
                    ) : (
                      <>
                        FINALIZAR
                        PEDIDO

                        <ShoppingBag
                          size={
                            20
                          }
                        />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default CartSidebar;