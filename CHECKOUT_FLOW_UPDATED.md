# Fluxo de Checkout Atualizado

## Resumo das Mudanças

Agora o front-end envia todos os dados necessários em cada etapa do processo, incluindo `planType`.

## Diagrama do Fluxo

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USUÁRIO SELECIONA PLANO (anual ou semestral)                │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. FORMULÁRIO PRÉ-CHECKOUT                                      │
│    - Nome completo                                              │
│    - Email                                                      │
│    - Gênero                                                     │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. ENVIAR DADOS PARA API DA ESCOLA                             │
│    POST /api/v2/usuarios/novo                                  │
│    Body (FormData):                                             │
│    - token: ESCOLA_TOKEN                                        │
│    - nome: "João Silva"                                         │
│    - email: "joao@email.com"                                    │
│    - sexo: "masculino" | "feminino" | "outro"                  │
│    - planType: "anual" | "semestral"  ← NOVO!                 │
│    - status: "bloqueado"                                        │
│    - senha: gerada_automaticamente                              │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. CRIAR PREFERÊNCIA MERCADO PAGO                              │
│    POST /functions/v1/create-preference                         │
│    Headers:                                                     │
│    - Content-Type: application/json                             │
│    - Authorization: Bearer SUPABASE_KEY                         │
│                                                                 │
│    Body (JSON):                                                 │
│    {                                                            │
│      planType: "anual",                                         │
│      redirectUrl: "https://seu-site.com",                      │
│      email: "joao@email.com",                                   │
│      nome: "João Silva",                                        │
│      sexo: "masculino"                                          │
│    }                                                            │
│                                                                 │
│    Response:                                                    │
│    {                                                            │
│      preferenceId: "123456789"                                  │
│    }                                                            │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. REDIRECIONAR PARA MERCADO PAGO                              │
│    URL: https://www.mercadopago.com.br/checkout/v1/redirect    │
│          ?preference-id=123456789                               │
│                                                                 │
│    [Usuário completa pagamento...]                              │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. MERCADO PAGO NOTIFICA WEBHOOK                               │
│    POST /functions/v1/mp-webhook                                │
│    Payload: { data: { id: PAYMENT_ID, ... } }                 │
│                                                                 │
│    Webhook extrai dados:                                        │
│    - email, nome, sexo, plano, status=approved                 │
│                                                                 │
│    Webhook valida pagamento em:                                 │
│    https://api.mercadopago.com/v1/payments/{id}                │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. ATIVAR USUÁRIO NA PLATAFORMA DA ESCOLA                      │
│    POST /api/v2/usuarios/novo                                  │
│    Body (FormData):                                             │
│    - token: ESCOLA_TOKEN                                        │
│    - nome: "João Silva"                                         │
│    - email: "joao@email.com"                                    │
│    - sexo: "masculino"                                          │
│    - planType: "anual"                                          │
│    - status: "ativo"  ← MUDA DE "bloqueado"!                   │
│    - datafinal: "2025-12-29" (ou 6 meses depois)               │
│    - senha: enviada_por_email                                   │
│                                                                 │
│    ✅ Conta ativada com sucesso!                                │
└─────────────────────────────────────────────────────────────────┘
```

## Dados Enviados em Cada Etapa

### Etapa 2 → 3: Formulário → API da Escola

```javascript
// FormData (não JSON)
const formData = new FormData();
formData.append('token', ESCOLA_TOKEN);
formData.append('nome', 'João Silva');
formData.append('email', 'joao@email.com');
formData.append('sexo', 'masculino');
formData.append('planType', 'anual');  // ← NOVO
formData.append('status', 'bloqueado');
```

### Etapa 3 → 4: Formulário → Supabase Function

```javascript
// JSON
body: JSON.stringify({
  planType: 'anual',           // ← Obrigatório
  redirectUrl: 'https://...',  // ← Obrigatório
  email: 'joao@email.com',     // ← NOVO
  nome: 'João Silva',          // ← NOVO
  sexo: 'masculino'            // ← NOVO
})
```

### Etapa 6 → 7: Webhook → API da Escola

```javascript
// FormData
const formData = new FormData();
formData.append('token', ESCOLA_TOKEN);
formData.append('nome', 'João Silva');
formData.append('email', 'joao@email.com');
formData.append('sexo', 'masculino');        // ← NOVO
formData.append('planType', 'PLANO_ANUAL');  // ← NOVO
formData.append('status', 'ativo');          // ← MUDOU
formData.append('datafinal', '2025-12-29');
formData.append('senha', 'abc12345');
```

## Arquivos Modificados

### 1. `src/components/PreCheckoutRegistration.tsx`
- ✅ Adicionado `planType` ao FormData para API da escola
- ✅ Adicionado `sexo` ao JSON para Supabase function
- ✅ Adicionados logs detalhados do fluxo
- ✅ Tratamento de erros 403 (token inválido)

### 2. `supabase/functions/create-preference/index.ts`
- ✅ Recebe `email`, `nome`, `sexo` do front-end
- ✅ Adiciona esses dados ao payload da preferência
- ✅ Logs com 👤, 💰, 🔔 para visualização
- ✅ Metadata com dados do usuário para webhook

### 3. `supabase/functions/mp-webhook/index.ts`
- ✅ Extrai `sexo` dos metadados do pagamento
- ✅ Envia `sexo` para API da escola
- ✅ Envia `planType` para API da escola
- ✅ Logs detalhados de cada etapa

## Testes

### Test 1: Fluxo Completo
```
1. Acesse /checkout
2. Selecione plano "Anual"
3. Preencha: João Silva, joao@email.com, Masculino
4. Clique "Continuar para Pagamento 🔒"
5. Verifique logs no console
6. Verifique em Supabase → mp-webhook → Logs
7. Simule pagamento no Mercado Pago (teste)
8. Verifique se usuário foi criado com status "ativo"
```

### Test 2: Verificar Logs

**Console do navegador (F12):**
```
📝 Criando usuário na plataforma...
📋 Dados enviados para criação de usuário: {
  nome: "João Silva",
  email: "joao@email.com",
  sexo: "masculino",
  planType: "anual",
  status: "bloqueado"
}
💳 Criando preferência de pagamento...
📊 Dados do pagamento: {
  planType: "anual",
  email: "joao@email.com",
  nome: "João Silva",
  sexo: "masculino"
}
```

**Logs do Supabase (Functions → create-preference → Logs):**
```
🎯 Criando preferência para plano: anual
👤 Aluno: João Silva (joao@email.com)
⚖️ Gênero: masculino
🔔 Webhook: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
💰 Valor: R$ 397
```

**Logs do Webhook (Functions → mp-webhook → Logs):**
```
✅ Pagamento aprovado! ID: 123456789
📋 Dados do pagamento:
  - Email: joao@email.com
  - Nome: João Silva
  - Gênero: masculino
  - Plano: PLANO_ANUAL
Enviando para: https://estudandoead.com/threynnare/api/v2/index.php?usuarios/novo
Resposta da Escola: {...}
```

## Erros Comuns e Soluções

### Erro 403: "Token informado é inválido"
- **Causa:** VITE_ESCOLA_TOKEN incorreto ou expirado
- **Solução:** 
  1. Atualize `VITE_ESCOLA_TOKEN` em `.env.local`
  2. Redeploy da função webhook
  3. Teste novamente

### Erro: "Preferência ID não recebida"
- **Causa:** Supabase function não retornou ID
- **Solução:**
  1. Verifique se MP_ACCESS_TOKEN está em Supabase Secrets
  2. Verifique logs da função create-preference
  3. Verifique resposta do Mercado Pago API

### Usuário não ativado após pagamento
- **Causa:** Webhook não recebeu notificação ou falhou
- **Solução:**
  1. Verifique logs de `mp-webhook` em Supabase
  2. Verifique URL do webhook está correta
  3. Verifique se Mercado Pago está configurado para enviar notificações

## Próximas Melhorias

- [ ] Adicionar validação de CPF/CNPJ
- [ ] Adicionar telefone no formulário
- [ ] Melhorar tratamento de erros de webhook
- [ ] Adicionar retry automático para falhas
- [ ] Dashboard de monitoramento de pagamentos

---

**Status:** ✅ Implementado e testado
**Última atualização:** 2024
