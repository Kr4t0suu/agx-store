import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método não permitido",
    });
  }

  try {
    const { itens } = req.body;

    const preference = new Preference(client);

    const resposta = await preference.create({
      body: {
        items: itens.map((item) => ({
          title: item.nome,
          unit_price: Number(item.preco),
          quantity: Number(item.quantidade),
          currency_id: "BRL",
        })),
      },
    });

    res.status(200).json({
      init_point: resposta.init_point,
    });
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      erro: "Erro ao gerar pagamento",
    });
  }
}