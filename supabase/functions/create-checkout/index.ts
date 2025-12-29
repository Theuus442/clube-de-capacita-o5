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
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Método não permitido. Use POST.' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
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
      console.error('❌ CRITICAL: MP_ACCESS_TOKEN não configurado em Supabase Secrets')
      console.error('📍 Projeto: zajyeykcepcrlngmdpvf')
      console.error('🔗 Para configurar: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets')
      console.error('')
      console.error('Passos:')
      console.error('1. Acesse Supabase Dashboard → Settings → Secrets')
      console.error('2. Clique em "New secret"')
      console.error('3. Name: MP_ACCESS_TOKEN')
      console.error('4. Value: Seu token do Mercado Pago')
      console.error('5. Save e aguarde 1-2 minutos')
      console.error('')
      console.error('Para obter o token:')
      console.error('- Acesse: https://www.mercadopago.com.br/developers/panel/credentials')
      console.error('- Cópia o token (TEST-xxx ou APP_USR-xxx)')

      return new Response(
        JSON.stringify({
          error: 'Erro de Configuração: Token Mercado Pago não encontrado',
          code: 'MISSING_MP_TOKEN',
          instructions: 'Configure MP_ACCESS_TOKEN em https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets',
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

    console.log('📋 Criando preferência para plano:', planType)
    console.log('💰 Plano:', plan)
    console.log('🔗 Base URL:', cleanBaseUrl)

    // Create preference in Mercado Pago
    const response = await fetch(MERCADO_PAGO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferencePayload),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('❌ Erro da API Mercado Pago:')
      console.error('Status:', response.status)
      console.error('Status Text:', response.statusText)
      console.error('Resposta:', JSON.stringify(responseData, null, 2))

      const errorMessage = responseData?.message || responseData?.error || 'Erro desconhecido'
      const errorCode = responseData?.code || response.status

      // Check for specific MP errors
      if (response.status === 401) {
        console.error('❌ ERRO 401: Token MP_ACCESS_TOKEN inválido ou expirado')
        throw new Error('Token Mercado Pago inválido. Verifique se o token está correto em Supabase Secrets')
      } else if (response.status === 400) {
        console.error('❌ ERRO 400: Dados inválidos enviados para Mercado Pago')
        throw new Error(`Dados inválidos: ${errorMessage}`)
      } else if (response.status >= 500) {
        console.error('❌ ERRO 5xx: Problema no servidor do Mercado Pago')
        throw new Error('Servidor Mercado Pago indisponível. Tente novamente')
      }

      throw new Error(`Erro Mercado Pago (${errorCode}): ${errorMessage}`)
    }

    if (!responseData?.id) {
      console.error('❌ Resposta inválida do Mercado Pago:', responseData)
      throw new Error('Resposta inválida: preference ID não encontrado')
    }

    console.log('✅ Preferência criada com sucesso:', responseData.id)

    return new Response(JSON.stringify({ preferenceId: responseData.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('❌ Erro completo na função:', error)

    const errorMessage = error instanceof Error ? error.message : String(error)
    const isTokenError = errorMessage.includes('Token') || errorMessage.includes('401')

    return new Response(
      JSON.stringify({
        error: errorMessage,
        type: isTokenError ? 'TOKEN_ERROR' : 'UNKNOWN_ERROR',
        timestamp: new Date().toISOString(),
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
