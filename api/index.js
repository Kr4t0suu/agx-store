import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";

const app = express();

app.use(cors());

app.use(express.json());

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

app.post("/api", async (req, res) => {
  try {
    const { itens } = req.body;

    const preference = {
      items: itens.map((item) => ({
        title: item.nome,
        unit_price: Number(item.preco),
        quantity: Number(item.quantidade),
        currency_id: "BRL",
      })),
    };

    const resposta = await mercadopago.preferences.create(
      preference
    );

    res.json({
      init_point: resposta.body.init_point,
    });
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      erro: "Erro ao gerar pagamento",
    });
  }
});

export default app;