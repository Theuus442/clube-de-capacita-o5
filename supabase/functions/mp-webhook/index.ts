import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

console.log("Webhook MP -> Escola (Versão FINAL) 🚀")

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const url = new URL(req.url)
    const body = await req.json().catch(() => ({}))
    const dataId = body.data?.id || body.id || url.searchParams.get('id')
    
    // Filtro para ignorar avisos repetidos ou testes de conexão
    const action = body.action || body.type
    if (action !== 'payment.created' && body.topic !== 'payment') {
       return new Response('Ignorado', { status: 200 })
    }

    if (!dataId) return new Response('ID ausente', { status: 200 })

    // 1. Confere se o pagamento existe no Mercado Pago
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
        headers: { 'Authorization': `Bearer ${Deno.env.get('MP_ACCESS_TOKEN')}` }
    })

    if (!mpResponse.ok) throw new Error('Falha MP')
    const paymentData = await mpResponse.json()

    if (paymentData.status !== 'approved') {
        return new Response('Aguardando aprovação', { status: 200 })
    }

    // 2. Prepara os dados do aluno
    const email = paymentData.payer.email
    const nome = paymentData.payer.first_name 
       ? `${paymentData.payer.first_name} ${paymentData.payer.last_name || ''}`.trim()
       : 'Novo Aluno'
    
    const plano = paymentData.external_reference || 'MENSAL'
    const hoje = new Date()
    const dataFinal = new Date()
    
    // Calcula a data final baseado no plano escolhido
    if (plano.includes('ANUAL')) dataFinal.setFullYear(hoje.getFullYear() + 1)
    else dataFinal.setMonth(hoje.getMonth() + 6)
    
    const dataFormatada = dataFinal.toISOString().split('T')[0]
    
    // Pega o token seguro do Supabase
    const tokenEscola = (Deno.env.get('ESCOLA_TOKEN') ?? '').trim()

    // 3. Monta o pacote de envio (FormData é o segredo aqui)
    const formData = new FormData()
    formData.append('token', tokenEscola) 
    formData.append('nome', nome)
    formData.append('email', email)
    formData.append('status', 'ativo')
    formData.append('datafinal', dataFormatada)
    formData.append('senha', Math.random().toString(36).slice(-8))

    // 4. URL DA VITÓRIA (Com index.php e rota correta)
    const urlEscola = "https://estudandoead.com/threynnare/api/v2/index.php?usuarios/novo"

    console.log(`Enviando para: ${urlEscola}`)

    const escolaResponse = await fetch(urlEscola, {
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)',
            // NÃO defina Content-Type aqui, o fetch faz automático para FormData
        },
        body: formData,
    })

    const rawText = await escolaResponse.text()
    console.log("Resposta da Escola:", rawText)

    return new Response(JSON.stringify({ success: true, response: rawText }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    console.error("Erro:", error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
