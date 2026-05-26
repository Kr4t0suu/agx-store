import { useEffect, useState } from "react";
import { supabase } from "../supabase";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const vendasData = [
  { mes: "Jan", vendas: 12 },
  { mes: "Fev", vendas: 18 },
  { mes: "Mar", vendas: 8 },
  { mes: "Abr", vendas: 27 },
  { mes: "Mai", vendas: 33 },
  { mes: "Jun", vendas: 49 },
];

const pedidosData = [
  { dia: "Seg", pedidos: 5 },
  { dia: "Ter", pedidos: 9 },
  { dia: "Qua", pedidos: 7 },
  { dia: "Qui", pedidos: 12 },
  { dia: "Sex", pedidos: 20 },
  { dia: "Sab", pedidos: 15 },
];

export default function Admin() {

  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");

  const [imagemFile, setImagemFile] =
    useState(null);

  const [editando, setEditando] =
    useState(null);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {

    const { data } = await supabase
      .from("produtos")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (data) {
      setProdutos(data);
    }
  }

  async function uploadImagem(file) {

    if (!file) return null;

    const nomeArquivo =
      `${Date.now()}-${file.name}`;

    const { error } =
      await supabase.storage
        .from("produtos")
        .upload(
          nomeArquivo,
          file
        );

    if (error) {
      console.log(error);
      alert("Erro ao enviar imagem");
      return null;
    }

    const { data } =
      supabase.storage
        .from("produtos")
        .getPublicUrl(nomeArquivo);

    return data.publicUrl;
  }

  async function adicionarProduto() {

    if (!nome || !preco) {
      alert(
        "Preencha nome e preço"
      );
      return;
    }

    let imagemUrl = "";

    if (imagemFile) {
      imagemUrl =
        await uploadImagem(
          imagemFile
        );
    }

    await supabase
      .from("produtos")
      .insert([
        {
          nome,
          preco,
          categoria,
          imagem: imagemUrl,
        },
      ]);

    setNome("");
    setPreco("");
    setCategoria("");
    setImagemFile(null);

    buscarProdutos();
  }

  async function excluirProduto(id) {

    await supabase
      .from("produtos")
      .delete()
      .eq("id", id);

    buscarProdutos();
  }

  async function salvarEdicao() {

    await supabase
      .from("produtos")
      .update({
        nome: editando.nome,
        preco: editando.preco,
        categoria:
          editando.categoria,
      })
      .eq("id", editando.id);

    setEditando(null);

    buscarProdutos();
  }

  return (

    <div className="flex bg-black min-h-screen text-white">

      {/* SIDEBAR */}
      <aside className="hidden lg:block w-[260px] border-r border-zinc-900 p-8 sticky top-0 h-screen">

        <h1 className="text-4xl font-black text-green-400 mb-14">
          AGX ADMIN
        </h1>

        <div className="space-y-5">

          <button className="w-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 p-5 rounded-3xl text-left text-xl font-semibold">
            Dashboard
          </button>

          <button className="w-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 p-5 rounded-3xl text-left text-xl font-semibold">
            Produtos
          </button>

          <button className="w-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 p-5 rounded-3xl text-left text-xl font-semibold">
            Pedidos
          </button>

        </div>

      </aside>

      {/* CONTEUDO */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-hidden">

        <h1 className="text-4xl md:text-6xl font-black mb-10">
          Painel Admin AGX
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div className="bg-zinc-900 p-8 rounded-[30px]">

            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Total Produtos
            </h2>

            <p className="text-6xl md:text-8xl font-black text-green-400">
              {produtos.length}
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-[30px]">

            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Total Pedidos
            </h2>

            <p className="text-6xl md:text-8xl font-black text-green-400">
              49
            </p>

          </div>

        </div>

        {/* GRAFICOS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">

          <div className="bg-zinc-900 p-6 md:p-8 rounded-[30px]">

            <h2 className="text-3xl md:text-5xl font-black mb-10">
              Vendas
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart
                data={vendasData}
              >

                <XAxis
                  dataKey="mes"
                  stroke="#fff"
                />

                <YAxis
                  stroke="#fff"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="vendas"
                  stroke="#4ade80"
                  strokeWidth={5}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-zinc-900 p-6 md:p-8 rounded-[30px]">

            <h2 className="text-3xl md:text-5xl font-black mb-10">
              Pedidos Semanais
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={pedidosData}
              >

                <XAxis
                  dataKey="dia"
                  stroke="#fff"
                />

                <YAxis
                  stroke="#fff"
                />

                <Tooltip />

                <Bar
                  dataKey="pedidos"
                  fill="#4ade80"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-zinc-900 p-5 md:p-10 rounded-[30px] mb-10">

          <h2 className="text-4xl md:text-6xl font-black mb-10">
            Adicionar Produto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              value={nome}
              onChange={(e) =>
                setNome(
                  e.target.value
                )
              }
              placeholder="Nome"
              className="
                bg-black
                p-5
                rounded-2xl
                text-lg
                md:text-2xl
                border
                border-zinc-800
                focus:border-green-400
                outline-none
              "
            />

            <input
              value={preco}
              onChange={(e) =>
                setPreco(
                  e.target.value
                )
              }
              placeholder="Preço"
              className="
                bg-black
                p-5
                rounded-2xl
                text-lg
                md:text-2xl
                border
                border-zinc-800
                focus:border-green-400
                outline-none
              "
            />

            {/* INPUT FILE PREMIUM */}
            <label
              className="
                bg-black
                rounded-2xl
                p-5
                flex
                items-center
                justify-between
                cursor-pointer
                border
                border-zinc-800
                hover:border-green-400
                transition
                overflow-hidden
              "
            >

              <div className="flex flex-col overflow-hidden">

                <span className="text-zinc-500 text-sm md:text-base mb-1">
                  Imagem do Produto
                </span>

                <span className="text-white text-sm md:text-lg truncate max-w-[160px] md:max-w-[300px]">
                  {imagemFile
                    ? imagemFile.name
                    : "Selecionar imagem"}
                </span>

              </div>

              <div
                className="
                  bg-green-400
                  text-black
                  px-4
                  md:px-5
                  py-2
                  md:py-3
                  rounded-xl
                  font-black
                  text-sm
                  md:text-lg
                  whitespace-nowrap
                "
              >
                Escolher
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImagemFile(
                    e.target.files[0]
                  )
                }
                className="hidden"
              />

            </label>

            <input
              value={categoria}
              onChange={(e) =>
                setCategoria(
                  e.target.value
                )
              }
              placeholder="Categoria"
              className="
                bg-black
                p-5
                rounded-2xl
                text-lg
                md:text-2xl
                border
                border-zinc-800
                focus:border-green-400
                outline-none
              "
            />

          </div>

          <button
            onClick={
              adicionarProduto
            }
            className="
              mt-8
              bg-green-400
              text-black
              px-10
              py-5
              rounded-2xl
              text-lg
              md:text-2xl
              font-black
              hover:scale-105
              transition
            "
          >
            Adicionar Produto
          </button>

        </div>

        {/* PRODUTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">

          {produtos.map(
            (produto) => (

              <div
                key={produto.id}
                className="
                  bg-zinc-900
                  rounded-[30px]
                  overflow-hidden
                  hover:-translate-y-2
                  transition
                  duration-300
                  border
                  border-zinc-800
                  hover:border-green-400
                "
              >

                <img
                  src={
                    produto.imagem ||
                    "https://placehold.co/600x600/111/FFF?text=AGX"
                  }
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x600/111/FFF?text=AGX";
                  }}
                  className="
                    w-full
                    h-[260px]
                    md:h-[350px]
                    object-cover
                  "
                />

                <div className="p-6">

                  <p className="text-green-400 text-sm md:text-base mb-3 uppercase font-bold">
                    {produto.categoria}
                  </p>

                  <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
                    {produto.nome}
                  </h2>

                  <p className="text-green-400 text-4xl md:text-5xl font-black mb-8">
                    R$ {produto.preco}
                  </p>

                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        setEditando(
                          produto
                        )
                      }
                      className="
                        flex-1
                        bg-yellow-500
                        text-black
                        py-4
                        rounded-2xl
                        text-lg
                        md:text-2xl
                        font-black
                        hover:scale-105
                        transition
                      "
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        excluirProduto(
                          produto.id
                        )
                      }
                      className="
                        flex-1
                        bg-red-500
                        py-4
                        rounded-2xl
                        text-lg
                        md:text-2xl
                        font-black
                        hover:scale-105
                        transition
                      "
                    >
                      Excluir
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </main>

      {/* MODAL */}
      {editando && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">

          <div className="bg-zinc-900 p-6 md:p-10 rounded-[30px] w-full max-w-[700px]">

            <h2 className="text-4xl md:text-5xl font-black mb-8">
              Editar Produto
            </h2>

            <div className="space-y-5">

              <input
                value={editando.nome}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    nome:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  bg-black
                  p-5
                  rounded-2xl
                  text-lg
                  md:text-2xl
                  border
                  border-zinc-800
                  focus:border-green-400
                  outline-none
                "
              />

              <input
                value={editando.preco}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    preco:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  bg-black
                  p-5
                  rounded-2xl
                  text-lg
                  md:text-2xl
                  border
                  border-zinc-800
                  focus:border-green-400
                  outline-none
                "
              />

              <input
                value={
                  editando.categoria
                }
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    categoria:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  bg-black
                  p-5
                  rounded-2xl
                  text-lg
                  md:text-2xl
                  border
                  border-zinc-800
                  focus:border-green-400
                  outline-none
                "
              />

            </div>

            <div className="flex gap-4 mt-8">

              <button
                onClick={
                  salvarEdicao
                }
                className="
                  flex-1
                  bg-green-400
                  text-black
                  py-5
                  rounded-2xl
                  text-lg
                  md:text-2xl
                  font-black
                  hover:scale-105
                  transition
                "
              >
                Salvar
              </button>

              <button
                onClick={() =>
                  setEditando(null)
                }
                className="
                  flex-1
                  bg-red-500
                  py-5
                  rounded-2xl
                  text-lg
                  md:text-2xl
                  font-black
                  hover:scale-105
                  transition
                "
              >
                Cancelar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}