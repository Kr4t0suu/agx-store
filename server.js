import "dotenv/config";

import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago";

import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(cors());

app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken:
    process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post("/criar-pagamento", async (req, res) => {
  try {
    const { itens } = req.body;

    console.log("ITENS:", itens);

    if (!itens || itens.length === 0) {
      return res.status(400).json({
        erro: "Carrinho vazio",
      });
    }

    const total = itens.reduce((acc, item) => {
      return (
        acc +
        Number(item.preco) *
          Number(item.quantidade || 1)
      );
    }, 0);

    // SALVAR PEDIDO NO SUPABASE
    const { data, error } = await supabase
      .from("pedidos")
      .insert([
        {
          produtos: itens,
          total,
          status: "pendente",
        },
      ])
      .select();

    if (error) {
      console.log("ERRO SUPABASE:", error);

      return res.status(500).json({
        erro: "Erro ao salvar pedido",
      });
    }

    console.log("PEDIDO SALVO:", data);

    // FORMATAR ITENS MERCADO PAGO
    const items = itens.map((item) => ({
      title: item.nome,
      quantity: Number(item.quantidade || 1),
      currency_id: "BRL",
      unit_price: Number(item.preco),
    }));

    const preference = new Preference(client);

    // CRIAR PAGAMENTO
    const resposta = await preference.create({
      body: {
        items,
      },
    });

    console.log(
      "LINK PAGAMENTO:",
      resposta.init_point
    );

    res.json({
      init_point: resposta.init_point,
    });
  } catch (erro) {
    console.log("ERRO MP:", erro);

    res.status(500).json({
      erro: "Erro ao gerar pagamento",
      detalhes: erro.message,
    });
  }
});

app.listen(3000, () => {
  console.log(
    "Servidor rodando na porta 3000"
  );
});