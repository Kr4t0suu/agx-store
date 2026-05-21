import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método não permitido",
    });
  }

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

    return res.status(200).json({
      init_point: resposta.body.init_point,
    });

  } catch (erro) {
    console.log(erro);

    return res.status(500).json({
      erro: "Erro ao gerar pagamento",
    });
  }
}