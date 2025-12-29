# ✅ Fluxo de Checkout Simplificado

## O que mudou

**REMOVIDO:** Chamada para API da escola no front-end  
**MANTIDO:** Apenas coleta de dados e geração de link Mercado Pago  
**RESULTADO:** Webhook fará a criação do usuário após pagamento aprovado

## Novo Fluxo (Simplificado)

```
┌─────────────────────────────────────────────────────────┐
│ 1. USUÁRIO SELECIONA PLANO                             │
│    (anual ou semestral)                                 │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 2. FORMULÁRIO PRÉ-CHECKOUT                             │
│    - Nome completo                                      │
│    - Email                                              │
│    - Gênero                                             │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 3. FRONT-END ENVIA PARA SUPABASE                       │
│    POST /functions/v1/create-preference                │
│    JSON:                                                │
│    {                                                    │
│      planType: "anual",                                 │
│      email: "joao@email.com",                           │
│      nome: "João Silva",                                │
│      sexo: "masculino",                                 │
│      redirectUrl: "https://seu-site.com"               │
│    }                                                    │
│                                                         │
│    Response: { preferenceId: "123456789" }             │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 4. REDIRECIONAR PARA MERCADO PAGO                      │
│    URL: https://mercadopago.com.br/checkout/...        │
│         ?preference-id=123456789                        │
│                                                         │
│    [Usuário completa pagamento]                         │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 5. MERCADO PAGO NOTIFICA WEBHOOK                       │
│    POST /functions/v1/mp-webhook                       │
│    Payload com dados do pagamento                      │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 6. WEBHOOK CRIA USUÁRIO NA ESCOLA                      │
│    Extrai: email, nome, sexo, planType                 │
│    Status: "ativo" (aprovado)                           │
│    Chama API da escola com os dados                     │
│    ✅ Usuário criado e ativado!                        │
└─────────────────────────────────────────────────────────┘
```

## Código Simplificado do Front-end

```typescript
async function handleCadastroECheckout(event) {
  event.preventDefault();

  // 1. Pega dados
  const nome = document.getElementById('input-nome').value;
  const email = document.getElementById('input-email').value;
  const sexo = document.getElementById('select-sexo').value;

  if (!nome || !email || !sexo) {
    alert("Preencha tudo!");
    return;
  }

  // 2. Manda para o Supabase criar a preferência (COM METADATA)
  // NÃO CHAMA A API DA ESCOLA AQUI. DEIXE O WEBHOOK FAZER ISSO.

  const response = await fetch(
    'https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        planType: 'anual',      // ou 'semestral'
        email: email,
        nome: nome,
        sexo: sexo,
        redirectUrl: window.location.origin,
      }),
    }
  );

  const data = await response.json();

  if (data.preferenceId) {
    // 3. Redireciona para Mercado Pago
    const checkoutUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${data.preferenceId}`;
    window.location.href = checkoutUrl;
  } else {
    alert("Erro ao gerar link de pagamento");
  }
}
```

## O que o Webhook Fará

Quando o Mercado Pago notificar que o pagamento foi aprovado:

1. **Valida pagamento** em `https://api.mercadopago.com/v1/payments/{id}`
2. **Extrai dados** da preferência:
   - Email
   - Nome
   - Gênero (sexo)
   - Plano (planType)
3. **Cria usuário** na API da escola com:
   ```
   POST https://estudandoead.com/threynnare/api/v2/usuarios/novo
   
   FormData:
   - token: ESCOLA_TOKEN
   - nome: João Silva
   - email: joao@email.com
   - sexo: masculino
   - planType: PLANO_ANUAL
   - status: ativo (aprovado!)
   - datafinal: 2025-12-29
   - senha: gerada_automaticamente
   ```
4. **Envia e-mail** com login/senha para o usuário

## Benefícios da Mudança

✅ **Sem erro 403** - Front-end não acessa API da escola  
✅ **Webhook responsável** - Cria usuário apenas após pagamento aprovado  
✅ **Mais seguro** - Token da escola não fica no front-end  
✅ **Melhor UX** - Usuário sai da aplicação para Mercado Pago (padrão)  
✅ **Simples** - Menos requisições do front-end

## Arquivo Modificado

**`src/components/PreCheckoutRegistration.tsx`**
- ❌ REMOVIDA: Chamada para `https://estudandoead.com/...` (API da escola)
- ✅ MANTIDA: Validação de formulário
- ✅ MANTIDA: Chamada para Supabase `create-preference`
- ✅ MANTIDA: Redirecionamento ao Mercado Pago

## Fluxo de Dados Agora

```
Front-end   →  Supabase  →  Mercado Pago  →  Webhook  →  API Escola
  Form Data    Preference    Checkout         Payment    Create User
   (3 dados)  (preferenceId)  (payment)     (Validation)  (6 campos)
```

## Resumo das Requisições

| Quem | O quê | Quando |
|------|-------|--------|
| Front-end | Cria preferência | Ao clicar "Continuar" |
| Mercado Pago | Processa pagamento | Usuário completa checkout |
| Webhook | Cria usuário | Após pagamento aprovado |

## Status

✅ **Simplificado e Testado**

O novo fluxo está implementado em `PreCheckoutRegistration.tsx`. Agora o front-end é apenas responsável por:
1. Coletar dados
2. Criar preferência
3. Redirecionar para Mercado Pago

**Tudo mais é feito pelo webhook! 🚀**
