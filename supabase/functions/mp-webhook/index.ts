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

    console.log('Webhook recebido:', JSON.stringify(body, null, 2))

    // Filtro para ignorar avisos repetidos ou testes de conexão
    const action = body.action || body.type
    const topic = body.topic || body.type

    // Aceita eventos de pagamento (várias variações possíveis)
    const isPaymentEvent =
      action === 'payment.created' ||
      topic === 'payment' ||
      action === 'payment.updated' ||
      body.action === 'payment.updated'

    if (!isPaymentEvent) {
       console.log('Evento ignorado:', { action, topic })
       return new Response('Ignorado', { status: 200 })
    }

    if (!dataId) {
      console.log('ID ausente no webhook')
      return new Response('ID ausente', { status: 200 })
    }

    // 1. Confere se o pagamento existe no Mercado Pago
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
        headers: { 'Authorization': `Bearer ${Deno.env.get('MP_ACCESS_TOKEN')}` }
    })

    if (!mpResponse.ok) throw new Error('Falha MP')
    const paymentData = await mpResponse.json()

    if (paymentData.status !== 'approved') {
        console.log(`⏳ Pagamento ainda não aprovado. Status: ${paymentData.status}`)
        return new Response('Aguardando aprovação', { status: 200 })
    }

    console.log(`✅ Pagamento aprovado! ID: ${dataId}`)

    // 2. Prepara os dados do aluno
    const email = paymentData.payer.email
    const nome = paymentData.payer.first_name
       ? `${paymentData.payer.first_name} ${paymentData.payer.last_name || ''}`.trim()
       : 'Novo Aluno'

    // Extract additional metadata from payment
    const metadata = paymentData.metadata || {}
    const sexo = metadata.sexo || 'não_informado'

    const plano = paymentData.external_reference || 'MENSAL'

    console.log(`📋 Dados do pagamento:`)
    console.log(`  - Email: ${email}`)
    console.log(`  - Nome: ${nome}`)
    console.log(`  - Gênero: ${sexo}`)
    console.log(`  - Plano: ${plano}`)
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
    formData.append('sexo', sexo)
    formData.append('status', 'ativo')
    formData.append('datafinal', dataFormatada)
    formData.append('planType', plano) // Include plan type
    formData.append('senha', Math.random().toString(36).slice(-8)) // Auto-generated password

    // 4. URL DA VITÓRIA (Com index.php e rota correta)
    const urlEscola = "https://estudandoead.com/threynnare/api/v2/index.php?usuarios/novo"

    console.log(`🚀 Enviando para: ${urlEscola}`)
    console.log(`📋 Criando usuário na plataforma da escola...`)

    const escolaResponse = await fetch(urlEscola, {
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)',
            // NÃO defina Content-Type aqui, o fetch faz automático para FormData
        },
        body: formData,
    })

    const rawText = await escolaResponse.text()
    console.log("✅ Resposta da Escola:", rawText)
    console.log(`✨ Usuário ${email} criado com sucesso!`)

    return new Response(JSON.stringify({ success: true, response: rawText }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    console.error("Erro:", error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
