import "./Admin.css";

export default function Admin() {

  const pedidos = [
    {
      id: 1,
      cliente: "Cliente Site",
      produto: "Air Pods",
      valor: 70,
      status: "pendente",
    },

    {
      id: 2,
      cliente: "Cliente Site",
      produto: "Mouse RGB",
      valor: 125,
      status: "aprovado",
    },
  ];

  const produtos = [
    {
      id: 1,
      nome: "Air Pods",
      categoria: "Eletrônicos",
      preco: 70,
      estoque: 20,
      imagem:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 2,
      nome: "Mouse RGB",
      categoria: "Gamer",
      preco: 125,
      estoque: 12,
      imagem:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="layout">

      <div className="sidebar">

        <div className="logo">
          AGX ADMIN
        </div>

        <div className="menu">

          <button>📊 Dashboard</button>

          <button>📦 Produtos</button>

          <button>🛒 Pedidos</button>

          <button>💰 Financeiro</button>

          <button>⚙️ Configurações</button>

        </div>

      </div>

      <div className="content">

        <div className="topbar">

          <div className="title">
            Dashboard <span className="gold">AGX</span>
          </div>

          <div className="profile">

            <img
              src="https://i.imgur.com/2DhmtJ4.png"
              alt=""
            />

            <div>
              <h3>AGX Imports</h3>

              <p>Painel Premium</p>
            </div>

          </div>

        </div>

        <div className="cards">

          <div className="card">

            <div className="cardIcon">
              🛒
            </div>

            <h3>TOTAL PEDIDOS</h3>

            <h1>
              {pedidos.length}
            </h1>

            <div className="mini">
              +18% esse mês
            </div>

          </div>

          <div className="card">

            <div className="cardIcon">
              💰
            </div>

            <h3>FATURAMENTO</h3>

            <h1>
              R$ 195
            </h1>

            <div className="mini">
              lucro crescendo
            </div>

          </div>

          <div className="card">

            <div className="cardIcon">
              📦
            </div>

            <h3>PRODUTOS</h3>

            <h1>
              {produtos.length}
            </h1>

            <div className="mini">
              catálogo ativo
            </div>

          </div>

        </div>

        <div className="grid">

          <div className="chartBox">

            <div className="chartTitle">
              Vendas da Semana
            </div>

            <div className="chart">

              <div
                className="bar"
                style={{
                  height:"70%"
                }}
              >
                <span>SEG</span>
              </div>

              <div
                className="bar"
                style={{
                  height:"45%"
                }}
              >
                <span>TER</span>
              </div>

              <div
                className="bar"
                style={{
                  height:"90%"
                }}
              >
                <span>QUA</span>
              </div>

              <div
                className="bar"
                style={{
                  height:"65%"
                }}
              >
                <span>QUI</span>
              </div>

              <div
                className="bar"
                style={{
                  height:"100%"
                }}
              >
                <span>SEX</span>
              </div>

            </div>

          </div>

          <div className="rightPanel">

            <div className="miniCard">

              <h2>Pedidos Hoje</h2>

              <h1>4</h1>

              <p>pedidos realizados hoje</p>

            </div>

            <div className="miniCard">

              <h2>Clientes</h2>

              <h1>4</h1>

              <p>clientes cadastrados</p>

            </div>

          </div>

        </div>

        <div className="sectionTitle">
          Produtos Premium
        </div>

        <div className="produtosGrid">

          {produtos.map((produto) => (

            <div
              className="produto"
              key={produto.id}
            >

              <div className="badge">
                PREMIUM
              </div>

              <img
                src={produto.imagem}
                alt=""
              />

              <div className="produtoContent">

                <h2>
                  {produto.nome}
                </h2>

                <div className="categoria">
                  {produto.categoria}
                </div>

                <div className="preco">
                  R$ {produto.preco}
                </div>

                <div className="estoque">
                  Estoque: {produto.estoque}
                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="sectionTitle">
          Últimos Pedidos
        </div>

        <div className="tabela">

          <table>

            <thead>

              <tr>

                <th>CLIENTE</th>

                <th>PRODUTO</th>

                <th>VALOR</th>

                <th>STATUS</th>

              </tr>

            </thead>

            <tbody>

              {pedidos.map((pedido) => (

                <tr key={pedido.id}>

                  <td>
                    {pedido.cliente}
                  </td>

                  <td>
                    {pedido.produto}
                  </td>

                  <td>
                    R$ {pedido.valor}
                  </td>

                  <td>

                    <div className="status">
                      {pedido.status}
                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}