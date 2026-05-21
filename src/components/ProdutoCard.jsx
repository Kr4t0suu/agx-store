import "./ProdutoCard.css";

function ProdutoCard({ produto, addToCart }) {

  return (
    <div className="product-card">

      <img
        src={produto.imagem}
        alt={produto.nome}
      />

      <h2>{produto.nome}</h2>

      <p>{produto.categoria}</p>

      <h3>R$ {produto.preco}</h3>

      <button onClick={() => addToCart(produto)}>
        Comprar
      </button>

    </div>
  );
}

export default ProdutoCard;