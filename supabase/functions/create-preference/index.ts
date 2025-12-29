import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const MERCADO_PAGO_API_URL = 'https://api.mercadopago.com/checkout/preferences'
const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN')

interface RequestBody {
  planType: 'anual' | 'semestral'
  redirectUrl?: string
}

const planConfig = {
  anual: {
    title: 'Plano Anual',
    description: '12 meses de acesso ilimitado à plataforma',
    price: 397,
    currency_id: 'BRL',
  },
  semestral: {
    title: 'Plano Semestral',
    description: 'Acesso completo à plataforma por 6 meses',
    price: 297,
    currency_id: 'BRL',
  },
}

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  try {
    // Parse request body
    const { planType }: RequestBody = await req.json()

    // Validate plan type
    if (!planType || !['anual', 'semestral'].includes(planType)) {
      return new Response(
        JSON.stringify({ error: 'Tipo de plano inválido' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    // Validate access token
    if (!MERCADO_PAGO_ACCESS_TOKEN) {
      console.error('MERCADO_PAGO_ACCESS_TOKEN não configurado')
      return new Response(
        JSON.stringify({
          error: 'Erro na configuração do servidor. Token do Mercado Pago não encontrado.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    }

    const plan = planConfig[planType]

    // Create preference payload
    const preferencePayload = {
      items: [
        {
          title: plan.title,
          description: plan.description,
          quantity: 1,
          unit_price: plan.price,
          currency_id: plan.currency_id,
        },
      ],
      auto_return: 'approved',
      back_urls: {
        success: `${new URL(req.url).origin}/checkout-success`,
        failure: `${new URL(req.url).origin}/checkout-failure`,
        pending: `${new URL(req.url).origin}/checkout-pending`,
      },
      notification_url: `${new URL(req.url).origin}/api/webhooks/mercado-pago`,
    }

    console.log('Criando preferência para plano:', planType)

    // Create preference in Mercado Pago
    const response = await fetch(MERCADO_PAGO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferencePayload),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Erro da API Mercado Pago:', error)
      throw new Error(
        `Erro ao criar preferência: ${response.status} ${response.statusText}`,
      )
    }

    const preference = await response.json()

    console.log('Preferência criada com sucesso:', preference.id)

    return new Response(JSON.stringify({ preferenceId: preference.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Erro na função:', error)
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'Erro interno do servidor',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
})
