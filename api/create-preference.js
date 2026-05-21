import {
  MercadoPagoConfig,
  Preference,
} from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método não permitido",
    });
  }

  try {
    const { itens } = req.body;

    console.log(
      "ITENS RECEBIDOS:",
      itens
    );

    const preference =
      new Preference(client);

    const resposta =
      await preference.create({
        body: {
          items: itens.map((item) => ({
            title: item.nome,
            unit_price: Number(
              item.preco
            ),
            quantity: Number(
              item.quantidade
            ),
            currency_id: "BRL",
          })),
        },
      });

    console.log(
      "PREFERENCE:",
      resposta
    );

    return res.status(200).json({
      init_point:
        resposta.init_point,
    });
  } catch (erro) {
    console.log(
      "ERRO MERCADO PAGO:",
      erro
    );

    return res.status(500).json({
      erro:
        erro.message ||
        "Erro ao gerar pagamento",
    });
  }
}