import { useCart } from "../context/CartContext";
import { supabase } from "../supabase";

function CartSidebar() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce((acc, item) => {
    return (
      acc +
      Number(item.preco) *
        Number(item.quantidade)
    );
  }, 0);

  async function finalizarCompra() {
    try {
      if (cart.length === 0) {
        alert("Carrinho vazio");
        return;
      }

      const produtosFormatados = cart.map(
        (item) => ({
          id: item.id,
          nome: item.nome,
          preco:
            Number(item.preco) || 0,
          quantidade:
            Number(item.quantidade) || 1,
          imagem: item.imagem || "",
        })
      );

      console.log(
        "PRODUTOS ENVIADOS:",
        produtosFormatados
      );

      console.log(
        "TOTAL:",
        total
      );

      // SALVAR NO SUPABASE
      const { data, error } =
        await supabase
          .from("pedidos")
          .insert([
            {
              produtos:
                produtosFormatados,
              valor_total: total,
              status: "pendente",
            },
          ])
          .select();

      if (error) {
        console.log(
          "ERRO SUPABASE:",
          error
        );

        alert(
          "Erro ao salvar pedido"
        );

        return;
      }

      console.log(
        "PEDIDO SALVO:",
        data
      );

      // MERCADO PAGO
      const resposta = await fetch(
        "/api/create-preference",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            itens:
              produtosFormatados,
          }),
        }
      );

      const dataPagamento =
        await resposta.json();

      console.log(
        "MERCADO PAGO:",
        dataPagamento
      );

      if (
        dataPagamento.init_point
      ) {
        clearCart();

        window.location.href =
          dataPagamento.init_point;
      } else {
        console.log(
          "ERRO MP:",
          dataPagamento
        );

        alert(
          "Erro ao gerar pagamento"
        );
      }
    } catch (erro) {
      console.log(
        "ERRO GERAL:",
        erro
      );

      alert(
        "Erro ao conectar servidor"
      );
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "340px",
        height: "100vh",
        background: "#050505",
        borderLeft:
          "1px solid #222",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <h1
        style={{
          color: "#fff",
          fontSize: "42px",
          marginBottom: "20px",
        }}
      >
        Carrinho
      </h1>

      {cart.length === 0 ? (
        <p style={{ color: "#aaa" }}>
          Seu carrinho está vazio
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#111",
                borderRadius:
                  "15px",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <img
                src={item.imagem}
                alt={item.nome}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius:
                    "10px",
                }}
              />

              <h2
                style={{
                  color: "#fff",
                  fontSize: "20px",
                  marginTop: "10px",
                }}
              >
                {item.nome}
              </h2>

              <p
                style={{
                  color: "#ccc",
                  marginTop: "5px",
                }}
              >
                Quantidade:{" "}
                {item.quantidade}
              </p>

              <h3
                style={{
                  color: "#00ff88",
                  marginTop: "10px",
                }}
              >
                R${" "}
                {(
                  Number(item.preco) *
                  Number(
                    item.quantidade
                  )
                ).toFixed(2)}
              </h3>

              <button
                onClick={() =>
                  removeFromCart(
                    item.id
                  )
                }
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "12px",
                  border: "none",
                  borderRadius:
                    "10px",
                  background:
                    "#ff3030",
                  color: "#fff",
                  fontWeight:
                    "bold",
                  cursor: "pointer",
                }}
              >
                Remover 1
              </button>
            </div>
          ))}

          <h2
            style={{
              color: "#fff",
              marginTop: "20px",
              fontSize: "34px",
            }}
          >
            Total: R${" "}
            {total.toFixed(2)}
          </h2>

          <button
            onClick={
              finalizarCompra
            }
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "18px",
              border: "none",
              borderRadius:
                "12px",
              background:
                "#00ff88",
              color: "#000",
              fontWeight:
                "bold",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}

export default CartSidebar;