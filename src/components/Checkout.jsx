import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, removeFromCart } = useCart();

  // TOTAL CORRIGIDO
  const total = cart.reduce(
    (acc, item) => acc + Number(item.preco),
    0
  );

  // WHATSAPP
  const finalizarWhatsapp = (tipoPagamento) => {
    const itens = cart
      .map(
        (item) =>
          `• ${item.nome} - R$ ${Number(item.preco).toFixed(2)}`
      )
      .join("%0A");

    const mensagem =
      `🛒 *NOVO PEDIDO - AGX STORE*%0A%0A` +
      `${itens}%0A%0A` +
      `💰 TOTAL: R$ ${total.toFixed(2)}%0A%0A` +
      `📦 Forma de pagamento: ${tipoPagamento}`;

    window.open(
      `https://wa.me/559286388593?text=${mensagem}`,
      "_blank"
    );
  };

  // MERCADO PAGO
  const pagarMercadoPago = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/criar-pagamento",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            produtos: cart,

            total: Number(total),
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Erro ao gerar pagamento");
      }
    } catch (error) {
      console.log(error);

      alert(
        "Erro ao conectar com Mercado Pago"
      );
    }
  };

  return (
    <div className="cart-sidebar">
      <h2>🛒 Carrinho</h2>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              className="cart-item"
              key={index}
            >
              <div>
                <h4>{item.nome}</h4>

                <p>
                  R$ {Number(item.preco).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() =>
                  removeFromCart(index)
                }
              >
                X
              </button>
            </div>
          ))}

          <div className="cart-total">
            Total:

            <span>
              R$ {total.toFixed(2)}
            </span>
          </div>

          {/* MERCADO PAGO */}
          <button
            onClick={pagarMercadoPago}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background: "#009ee3",
              color: "#fff",
              fontWeight: "800",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            💳 PAGAR COM MERCADO PAGO
          </button>

          {/* WHATSAPP */}
          <button
            onClick={() =>
              finalizarWhatsapp(
                "Pedido pelo WhatsApp"
              )
            }
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background: "#25D366",
              color: "#fff",
              fontWeight: "800",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "12px",
            }}
          >
            📲 PEDIR PELO WHATSAPP
          </button>

          {/* ENTREGA */}
          <button
            onClick={() =>
              finalizarWhatsapp(
                "Pagamento na entrega"
              )
            }
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #333",
              background: "#1a1a1a",
              color: "#fff",
              fontWeight: "800",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "12px",
            }}
          >
            🛵 PAGAR NA ENTREGA
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;