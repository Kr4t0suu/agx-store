import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();

app.use(cors());

app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-5299449247557402-051720-63389702ba8b8fb35d8b46c0aa0fc52e-605036946",
});

app.post("/criar-pagamento", async (req, res) => {
  try {
    const { itens } = req.body;

    console.log("ITENS:", itens);

    if (!itens || itens.length === 0) {
      return res.status(400).json({
        erro: "Carrinho vazio",
      });
    }

    const items = itens.map((item) => ({
      title: item.nome,
      quantity: 1,
      currency_id: "BRL",
      unit_price: Number(item.preco),
    }));

    console.log("ITEMS FORMATADOS:", items);

    const preference = new Preference(client);

    const resposta = await preference.create({
      body: {
        items,
      },
    });

    console.log("LINK:", resposta.init_point);

    res.json({
      init_point: resposta.init_point,
    });
  } catch (erro) {
    console.log("ERRO MP:", erro);

    res.status(500).json({
      erro: "Erro ao gerar pagamento",
      detalhes: erro,
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});