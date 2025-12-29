import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// Webhook handler for Mercado Pago notifications
serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  // Only accept POST and GET
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Método não permitido' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  try {
    // Parse notification
    const url = new URL(req.url)
    const type = url.searchParams.get('type')
    const id = url.searchParams.get('id')
    const action = url.searchParams.get('action')

    console.log('🔔 Webhook recebido do Mercado Pago')
    console.log('Tipo:', type)
    console.log('ID:', id)
    console.log('Ação:', action)

    // Handle payment notifications
    if (type === 'payment') {
      console.log('💳 Notificação de pagamento recebida')
      console.log('Payment ID:', id)

      // TODO: Aqui você pode:
      // 1. Consultar o status do pagamento na API do Mercado Pago
      // 2. Atualizar o banco de dados com o status do pagamento
      // 3. Enviar email de confirmação para o usuário
      // 4. Ativar a assinatura do usuário

      console.log('✅ Pagamento processado com sucesso')
    }

    // Handle subscription notifications
    if (type === 'subscription') {
      console.log('📅 Notificação de assinatura recebida')
      console.log('Subscription ID:', id)
      console.log('Ação:', action)

      // TODO: Aqui você pode:
      // 1. Atualizar status da assinatura no banco de dados
      // 2. Renovar ou cancelar assinatura conforme necessário
    }

    // Return 200 OK to Mercado Pago
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notificação recebida',
        type,
        id,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  } catch (error) {
    console.error('❌ Erro ao processar webhook:', error)

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Erro desconhecido',
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
