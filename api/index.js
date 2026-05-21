import express from "express";
import cors from "cors";

import {
  MercadoPagoConfig,
  Preference,
} from "mercadopago";

const app = express();

app.use(cors());

app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

app.post("/api", async (req, res) => {
  try {
    const { itens } = req.body;

    if (!itens || itens.length === 0) {
      return res.status(400).json({
        erro: "Carrinho vazio",
      });
    }

    const items = itens.map((item) => ({
      title: item.nome,
      quantity: Number(item.quantidade || 1),
      currency_id: "BRL",
      unit_price: Number(item.preco || 0),
    }));

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items,
      },
    });

    res.json({
      init_point: response.init_point,
    });
  } catch (erro) {
    console.log("ERRO:", erro);

    res.status(500).json({
      erro: "Erro ao gerar pagamento",
    });
  }
});

export default app;