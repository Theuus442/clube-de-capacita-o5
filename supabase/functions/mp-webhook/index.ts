import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

console.log("🚀 MP Webhook iniciado - Versão com novo metadata")

serve(async (req) => {
  try {
    // 1. CONFIGURAÇÕES DA ESCOLA (usar Deno.env para token por segurança)
    const BASE_URL = "https://estudanteead.com/oficial/api/v2/"
    const TOKEN_ESCOLA = Deno.env.get('ESCOLA_TOKEN') || '' // ✅ Seguro: vem do .env
    const MP_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')
    
    if (!MP_ACCESS_TOKEN) {
      console.error('❌ [WEBHOOK] MP_ACCESS_TOKEN não configurado')
      throw new Error('MP_ACCESS_TOKEN não configurado')
    }

    if (!TOKEN_ESCOLA) {
      console.error('❌ [WEBHOOK] ESCOLA_TOKEN não configurado')
      throw new Error('ESCOLA_TOKEN não configurado')
    }
    
    // 2. Validações do Webhook
    console.log(`📍 [WEBHOOK] URL completa: ${req.url}`)
    const url = new URL(req.url)
    const topic = url.searchParams.get('topic') || url.searchParams.get('type')
    const id = url.searchParams.get('id') || url.searchParams.get('data.id')

    console.log(`📍 [WEBHOOK] Topic: ${topic}, ID: ${id}`)

    if (topic !== 'payment') {
      console.log(`⚠️ [WEBHOOK] Topic não é 'payment'. Ignorando...`)
      return new Response(JSON.stringify({ message: "Ignorado" }), { status: 200 })
    }

    if (!id) {
      console.error('❌ [WEBHOOK] ID do pagamento não encontrado')
      return new Response(JSON.stringify({ message: "ID ausente" }), { status: 400 })
    }

    // 3. Busca o pagamento no Mercado Pago
    console.log(`🔍 [WEBHOOK] Consultando pagamento ${id} no Mercado Pago...`)
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { 'Authorization': `Bearer ${MP_ACCESS_TOKEN}` }
    })
    
    if (!mpResponse.ok) {
      console.error(`❌ [WEBHOOK] Erro ao validar pagamento: ${mpResponse.status}`)
      throw new Error("Erro ao validar pagamento no MP")
    }
    
    const payment = await mpResponse.json()
    console.log(`✅ [WEBHOOK] Pagamento obtido. Status: ${payment.status}`)

    // 4. Se APROVADO OU PENDING, começa o processo
    // Aceitamos tanto 'approved' quanto 'pending' (cartões de teste ficam pending)
    if (payment.status === 'approved' || payment.status === 'pending') {
      console.log(`✅ [WEBHOOK] Pagamento ${payment.status}! Iniciando cadastro...`)

      // Recupera dados do Metadata (com os nomes corretos do novo payload)
      const meta = payment.metadata || {}
      const nome = meta.nome_aluno || payment.payer?.first_name || 'Aluno Novo'
      const email = meta.email_aluno || payment.payer?.email || 'nao_informado@email.com'
      const sexo = meta.sexo_aluno || 'nao_informado'
      const plano = meta.plano_escolhido || 'PLANO_ANUAL'

      console.log(`📊 [WEBHOOK] Dados extraídos do pagamento:`)
      console.log(`  ├─ Nome: ${nome}`)
      console.log(`  ├─ Email: ${email}`)
      console.log(`  ├─ Sexo: ${sexo}`)
      console.log(`  └─ Plano: ${plano}`)

      // --- PASSO 1: CRIAR O ALUNO ---
      console.log(`1️⃣ [WEBHOOK] Criando aluno...`)
      
      const formCadastro = new FormData()
      formCadastro.append('token', TOKEN_ESCOLA)
      formCadastro.append('nome', nome)
      formCadastro.append('email', email)
      formCadastro.append('status', 'ativo')
      formCadastro.append('sexo', sexo)
      formCadastro.append('plano', plano)

      const resCadastro = await fetch(`${BASE_URL}?usuarios/novo`, {
        method: 'POST',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        body: formCadastro
      })

      const textoCadastro = await resCadastro.text()
      console.log(`📊 [WEBHOOK] Resposta do cadastro (status ${resCadastro.status}): ${textoCadastro}`)
      
      let idAluno = null

      try {
        const jsonCadastro = JSON.parse(textoCadastro)
        // Pega o ID do aluno (O campo 'login' na sua API parece ser o ID numérico)
        if (jsonCadastro.resultado && jsonCadastro.resultado.login) {
          idAluno = jsonCadastro.resultado.login
          console.log(`✅ [WEBHOOK] Aluno criado com ID: ${idAluno}`)
        } else {
          console.warn(`⚠️ [WEBHOOK] Aluno pode ter sido criado, mas ID não encontrado no response:`, jsonCadastro)
        }
      } catch (e) {
        console.warn(`⚠️ [WEBHOOK] Resposta não é JSON. Raw text: ${textoCadastro}`)
        // Às vezes a API retorna sucesso mas não em JSON
        // Mesmo assim, continuamos com o email
      }

      // --- PASSO 2: DISPARAR E-MAIL DO SISTEMA ---
      if (idAluno) {
        console.log(`2️⃣ [WEBHOOK] Solicitando envio de e-mail para o aluno ${idAluno}...`)
        
        const formEmail = new FormData()
        formEmail.append('token', TOKEN_ESCOLA)
        formEmail.append('aluno', idAluno.toString()) // Passa o ID recebido

        const resEmail = await fetch(`${BASE_URL}?usuarios/envioemail`, {
          method: 'POST',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          },
          body: formEmail
        })
        
        const textoEmail = await resEmail.text()
        console.log(`📩 [WEBHOOK] Status do envio de e-mail (status ${resEmail.status}): ${textoEmail}`)
        
        if (resEmail.ok) {
          console.log(`✅ [WEBHOOK] E-mail disparado com sucesso`)
        } else {
          console.warn(`⚠️ [WEBHOOK] Erro ao disparar e-mail`)
        }
      } else {
        console.warn(`⚠️ [WEBHOOK] ID do aluno não obtido, pulando envio de e-mail`)
      }

      console.log(`✨ [WEBHOOK] Processo de cadastro finalizado para ${email}`)
    } else {
      console.log(`⏳ [WEBHOOK] Pagamento com status '${payment.status}' (não é approved/pending). Ignorando...`)
    }

    return new Response(JSON.stringify({ message: "Processado com sucesso" }), { status: 200 })

  } catch (error) {
    console.error("❌ [WEBHOOK] Erro Fatal:", error)
    if (error instanceof Error) {
      console.error("❌ [WEBHOOK] Stack:", error.stack)
    }
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : String(error),
      success: false
    }), { status: 400 })
  }
})
