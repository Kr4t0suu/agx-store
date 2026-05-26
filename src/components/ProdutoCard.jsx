import "./ProdutoCard.css";

function ProdutoCard({ produto, addToCart }) {

  return (
    <div className="product-card">

      {/* IMAGEM */}
      <div className="product-image-container">

        <img
          src={
            produto.imagem ||
            "https://placehold.co/600x600/111/FFF?text=AGX"
          }
          alt={produto.nome}
          className="product-image"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x600/111/FFF?text=AGX";
          }}
        />

        <div className="product-overlay"></div>

      </div>

      {/* INFO */}
      <div className="product-info">

        <p className="product-category">
          {produto.categoria}
        </p>

        <h2 className="product-title">
          {produto.nome}
        </h2>

        <h3 className="product-price">
          R$ {Number(produto.preco).toFixed(2)}
        </h3>

        <button
          className="product-button"
          onClick={() => addToCart(produto)}
        >
          Comprar Agora
        </button>

      </div>

    </div>
  );
}

export default ProdutoCard;