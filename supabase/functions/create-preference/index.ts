import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const MERCADO_PAGO_API_URL = 'https://api.mercadopago.com/checkout/preferences'

// ✅ 1. CONFIGURAÇÃO DE CORS (Essencial para não dar erro na Vercel)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const planConfig = {
  anual: {
    title: 'Clube Threynnare - Plano Anual',
    description: '12 meses de acesso ilimitado à plataforma',
    price: 397,
    currency_id: 'BRL',
    ref: 'PLANO_ANUAL' 
  },
  semestral: {
    title: 'Clube Threynnare - Plano Semestral',
    description: 'Acesso completo à plataforma por 6 meses',
    price: 297,
    currency_id: 'BRL',
    ref: 'PLANO_SEMESTRAL' 
  },
}

serve(async (req: Request) => {
  // ✅ 2. Responde ao "Preflight" do navegador
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')
    
    if (!MERCADO_PAGO_ACCESS_TOKEN) {
      throw new Error('Erro interno: Token do MP não configurado.')
    }

    const { planType, redirectUrl } = await req.json()

    if (!planType || !planConfig[planType]) {
      return new Response(JSON.stringify({ error: 'Tipo de plano inválido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const plan = planConfig[planType]
    const baseUrl = redirectUrl || new URL(req.url).origin
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl

    // ✅ 3. Define o Webhook corretamente
    const supabaseProjectId = Deno.env.get('SUPABASE_PROJECT_ID') || 'zajyeykcepcrlngmdpvf'
    const webhookUrl = `https://${supabaseProjectId}.supabase.co/functions/v1/mp-webhook`

    console.log(`Criando preferência: ${planType} | Webhook: ${webhookUrl}`)

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
      external_reference: plan.ref, // Importante para sabermos se é Anual ou Semestral
      notification_url: webhookUrl,
    }

    const response = await fetch(MERCADO_PAGO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferencePayload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erro MP:', errorText)
      throw new Error(`Erro ao criar preferência no Mercado Pago.`)
    }

    const preference = await response.json()

    // ✅ 4. Retorna com Headers CORS
    return new Response(JSON.stringify({ preferenceId: preference.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Erro Fatal:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
