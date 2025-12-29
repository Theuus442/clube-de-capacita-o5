import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

console.log("Webhook MP -> Escola (Versão FINAL) 🚀")

serve(async (req) => {
  // Log TUDO que chega no webhook
  console.log('📍 [WEBHOOK] Método:', req.method)
  console.log('📍 [WEBHOOK] URL:', req.url)
  console.log('📍 [WEBHOOK] Headers:', JSON.stringify(Object.fromEntries(req.headers), null, 2))

  if (req.method !== 'POST') {
    console.log('⚠️ [WEBHOOK] Ignorando requisição não-POST')
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const url = new URL(req.url)
    const body = await req.json().catch(() => ({}))
    const dataId = body.data?.id || body.id || url.searchParams.get('id')

    console.log('📍 [WEBHOOK] Body completo:', JSON.stringify(body, null, 2))
    console.log('📍 [WEBHOOK] Data ID extraído:', dataId)

    // Filtro para ignorar avisos repetidos ou testes de conexão
    const action = body.action || body.type
    const topic = body.topic || body.type

    // Aceita eventos de pagamento (várias variações possíveis)
    const isPaymentEvent =
      action === 'payment.created' ||
      topic === 'payment' ||
      action === 'payment.updated' ||
      body.action === 'payment.updated'

    console.log('📍 [WEBHOOK] Verificação de evento:', { action, topic, isPaymentEvent })

    if (!isPaymentEvent) {
       console.log('⚠️ [WEBHOOK] Evento ignorado - não é pagamento:', { action, topic })
       return new Response('Ignorado', { status: 200 })
    }

    if (!dataId) {
      console.log('⚠️ [WEBHOOK] ID ausente no webhook')
      return new Response('ID ausente', { status: 200 })
    }

    console.log(`📍 [WEBHOOK] Processando pagamento ID: ${dataId}`)

    // 1. Confere se o pagamento existe no Mercado Pago
    console.log(`🔍 [WEBHOOK] Consultando MP API para ID: ${dataId}`)
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
        headers: { 'Authorization': `Bearer ${Deno.env.get('MP_ACCESS_TOKEN')}` }
    })

    if (!mpResponse.ok) {
      const errorText = await mpResponse.text()
      console.error('❌ [WEBHOOK] Erro ao consultar MP API:', mpResponse.status, errorText)
      throw new Error('Falha MP')
    }
    const paymentData = await mpResponse.json()

    console.log(`📊 [WEBHOOK] Status do pagamento: ${paymentData.status}`)
    console.log(`📊 [WEBHOOK] Dados completos do pagamento:`, JSON.stringify(paymentData, null, 2))

    // ✅ ACEITAMOS TANTO 'approved' QUANTO 'pending' (cartões de teste ficam pending)
    const isApprovedOrPending = paymentData.status === 'approved' || paymentData.status === 'pending'

    if (!isApprovedOrPending) {
        console.log(`⏳ [WEBHOOK] Pagamento ${paymentData.status} - ignorando (aguardando aprovação ou processamento)`)
        return new Response('Aguardando aprovação', { status: 200 })
    }

    console.log(`✅ [WEBHOOK] Pagamento em estado processável: ${paymentData.status}`)

    console.log(`✅ [WEBHOOK] Pagamento em estado processável! ID: ${dataId}`)

    // 2. Prepara os dados do aluno
    console.log(`📍 [WEBHOOK] Extraindo dados do payer...`)
    const email = paymentData.payer?.email
    const nome = paymentData.payer?.first_name
       ? `${paymentData.payer.first_name} ${paymentData.payer.last_name || ''}`.trim()
       : 'Novo Aluno'

    // Extract additional metadata from payment
    const metadata = paymentData.metadata || {}
    const sexo = metadata.sexo || 'não_informado'

    const plano = paymentData.external_reference || 'MENSAL'

    console.log(`✅ [WEBHOOK] Dados do pagamento extraídos:`)
    console.log(`  ├─ Email: ${email}`)
    console.log(`  ├─ Nome: ${nome}`)
    console.log(`  ├─ Gênero: ${sexo}`)
    console.log(`  └─ Plano: ${plano}`)
    const hoje = new Date()
    const dataFinal = new Date()
    
    // Calcula a data final baseado no plano escolhido
    if (plano.includes('ANUAL')) dataFinal.setFullYear(hoje.getFullYear() + 1)
    else dataFinal.setMonth(hoje.getMonth() + 6)
    
    const dataFormatada = dataFinal.toISOString().split('T')[0]

    console.log(`📍 [WEBHOOK] Data de expiração calculada: ${dataFormatada}`)

    // Pega o token seguro do Supabase
    const tokenEscola = (Deno.env.get('ESCOLA_TOKEN') ?? '').trim()

    if (!tokenEscola) {
      console.error('❌ [WEBHOOK] ESCOLA_TOKEN não configurado!')
      throw new Error('ESCOLA_TOKEN não configurado em Supabase Secrets')
    }

    // 3. Monta o pacote de envio (FormData é o segredo aqui)
    console.log(`📍 [WEBHOOK] Preparando FormData...`)
    const formData = new FormData()
    formData.append('token', tokenEscola)
    formData.append('nome', nome)
    formData.append('email', email)
    formData.append('sexo', sexo)
    formData.append('status', 'ativo')
    formData.append('datafinal', dataFormatada)
    formData.append('planType', plano) // Include plan type
    formData.append('senha', Math.random().toString(36).slice(-8)) // Auto-generated password

    console.log(`✅ [WEBHOOK] FormData preparado com os seguintes campos:`)
    console.log(`  ├─ token: [SECRETO]`)
    console.log(`  ├─ nome: ${nome}`)
    console.log(`  ├─ email: ${email}`)
    console.log(`  ├─ sexo: ${sexo}`)
    console.log(`  ├─ status: ativo`)
    console.log(`  ├─ datafinal: ${dataFormatada}`)
    console.log(`  ├─ planType: ${plano}`)
    console.log(`  └─ senha: [AUTO-GERADA]`)

    // 4. URL DA VITÓRIA (Com index.php e rota correta)
    const urlEscola = "https://estudandoead.com/threynnare/api/v2/index.php?usuarios/novo"

    console.log(`🚀 [WEBHOOK] Enviando para: ${urlEscola}`)
    console.log(`📋 [WEBHOOK] Criando usuário na plataforma da escola...`)

    const escolaResponse = await fetch(urlEscola, {
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)',
            // NÃO defina Content-Type aqui, o fetch faz automático para FormData
        },
        body: formData,
    })

    console.log(`📊 [WEBHOOK] Resposta da Escola - Status: ${escolaResponse.status}`)
    const rawText = await escolaResponse.text()
    console.log(`📊 [WEBHOOK] Resposta da Escola - Body:`, rawText)

    if (!escolaResponse.ok) {
      console.warn(`⚠️ [WEBHOOK] Escola retornou status ${escolaResponse.status}`)
    }

    console.log(`✅ [WEBHOOK] Usuário ${email} criado com sucesso!`)

    return new Response(JSON.stringify({ success: true, response: rawText }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    console.error("❌ [WEBHOOK] ERRO FATAL:", error)
    if (error instanceof Error) {
      console.error("❌ [WEBHOOK] Stack:", error.stack)
    }
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), { status: 500 })
  }
})
