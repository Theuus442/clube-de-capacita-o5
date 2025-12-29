import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const MERCADO_PAGO_API_URL = 'https://api.mercadopago.com/checkout/preferences'
const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')

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
    const { planType, redirectUrl }: RequestBody = await req.json()

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

    // Get base URL (from client or fallback)
    const baseUrl = redirectUrl || new URL(req.url).origin

    // Validate URL format
    if (!baseUrl.startsWith('http')) {
      return new Response(
        JSON.stringify({ error: 'URL de redirecionamento inválida' }),
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
      console.error('MP_ACCESS_TOKEN não configurado')
      return new Response(
        JSON.stringify({
          error: 'Erro na configuração do servidor. Token do Mercado Pago (MP_ACCESS_TOKEN) não encontrado.',
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

    // Ensure baseUrl has no trailing slash
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl

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
        success: `${cleanBaseUrl}/payment-return?status=approved`,
        failure: `${cleanBaseUrl}/payment-return?status=failure`,
        pending: `${cleanBaseUrl}/payment-return?status=pending`,
      },
      notification_url: `${cleanBaseUrl}/api/webhooks/mercado-pago`,
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
