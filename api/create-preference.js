import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  try {
    // ACEITA SOMENTE POST
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Método não permitido",
      });
    }

    const { items } = req.body;

    // VALIDAÇÃO
    if (!items || items.length === 0) {
      return res.status(400).json({
        error: "Carrinho vazio",
      });
    }

    const preference = new Preference(client);

    // CRIA PREFERÊNCIA
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.nome,
          quantity: Number(item.quantidade),
          currency_id: "BRL",
          unit_price: Number(item.preco),
        })),

        // DEIXA MAIS RÁPIDO
        binary_mode: true,

        // URLS DO SEU SITE
        back_urls: {
          success:
            "https://agx-store.vercel.app",
          failure:
            "https://agx-store.vercel.app",
          pending:
            "https://agx-store.vercel.app",
        },

        auto_return: "approved",
      },
    });

    // RETORNA LINK PAGAMENTO
    return res.status(200).json({
      init_point: response.init_point,
    });
  } catch (error) {
    console.log("ERRO MP:", error);

    return res.status(500).json({
      error:
        error.message ||
        "Erro Mercado Pago",
    });
  }
}