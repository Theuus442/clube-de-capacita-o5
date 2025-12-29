# 🔧 Troubleshooting: Pagamentos em "Processando"

## ❌ Problema
Cartões de teste do Mercado Pago ficam em "Já é quase seu! Estamos processando seu pagamento" em vez de serem aprovados.

---

## ✅ Solução

### Passo 1: Deploy das Funções Atualizadas
O código foi melhorado com logs detalhados. Faça deploy:

```bash
# Login no Supabase (se não fez ainda)
npx supabase login

# Deploy do webhook
npx supabase functions deploy mp-webhook

# Deploy da criação de preferência (opcional, mas recomendado)
npx supabase functions deploy create-preference
```

### Passo 2: Verificar Cartão de Teste Correto
Nem todos os cartões de teste são aprovados automaticamente! Use **UM DESSES**:

**Mastercard (Aprovado Automaticamente):**
- Número: `4111 1111 1111 1111`
- Vencimento: Qualquer data futura (ex: 12/25)
- CVV: Qualquer número (ex: 123)

**Visa (Aprovado Automaticamente):**
- Número: `4235 6010 3010 9903`
- Vencimento: Qualquer data futura
- CVV: Qualquer número

**⚠️ Cartões a EVITAR (ficam em "pending"):**
- `4111 1111 1111 1112` ❌ (Será recusado)
- `5425 2334 3010 9903` ❌ (Será "pending")

### Passo 3: Verificar Webhook nos Logs

Após fazer o deploy e testar um pagamento, verifique os logs da função:

```bash
# Ver logs do webhook
npx supabase functions logs mp-webhook

# Ver logs da preferência
npx supabase functions logs create-preference
```

Procure por mensagens como:
```
✅ [WEBHOOK] Pagamento em estado processável: approved
✅ [WEBHOOK] FormData preparado
✅ [WEBHOOK] Usuário xxx@xxx.com criado com sucesso!
```

### Passo 4: Verificar Configurações Supabase

1. Acesse: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets
2. Verifique se esses secrets existem:
   - ✅ `MP_ACCESS_TOKEN` - Token do Mercado Pago
   - ✅ `ESCOLA_TOKEN` - Token da sua plataforma de educação
   - ✅ `SUPABASE_PROJECT_ID` - Deve ser: `zajyeykcepcrlngmdpvf`

### Passo 5: URL do Webhook

Verifique se o webhook está configurado no Mercado Pago:

**URL do Webhook (automática no código):**
```
https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
```

Para verificar no Mercado Pago:
1. Acesse: https://www.mercadopago.com.br/ipn/webhooks
2. Procure por `https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook`
3. Se não existir, adicione manualmente

---

## 🔍 O Que Mudou no Código

### 1. **Webhook agora aceita "pending"**
Antes: Só aceitava `approved`
Agora: Aceita `approved` ou `pending` (cartões de teste)

### 2. **Logs detalhados**
Adicionado logging em CADA passo:
```
📍 [WEBHOOK] Método: POST
📍 [WEBHOOK] Body completo: {...}
✅ [WEBHOOK] Pagamento em estado processável: pending
✅ [WEBHOOK] FormData preparado
📊 [WEBHOOK] Resposta da Escola - Status: 200
```

### 3. **Melhor tratamento de erros**
- Valida se `ESCOLA_TOKEN` está configurado
- Mostra resposta completa da API da escola
- Logs de stack trace em caso de erro

---

## 📋 Checklist de Teste

- [ ] Cartão de teste é `4111 1111 1111 1111` ou `4235 6010 3010 9903`?
- [ ] Executou `npx supabase functions deploy mp-webhook`?
- [ ] `MP_ACCESS_TOKEN` está em Supabase Secrets?
- [ ] `ESCOLA_TOKEN` está em Supabase Secrets?
- [ ] Webhook URL (`mp-webhook`) está no Mercado Pago?
- [ ] Verificou logs com `npx supabase functions logs mp-webhook`?

---

## 🆘 Se Ainda Não Funcionar

Se depois disso o pagamento continua em "pending":

1. **Copie os logs da função** (`npx supabase functions logs mp-webhook`)
2. **Procure por mensagens de erro** (❌ ERRO FATAL)
3. **Verifique a resposta da escola** (📊 Resposta da Escola - Body)

A maioria dos problemas aparecerá nos logs agora que adicionamos logging detalhado.

---

## 📞 Contato / Suporte

Se os logs mostram:
- `❌ ESCOLA_TOKEN não configurado!` → Configure em Supabase Secrets
- `Resposta da Escola: 403` → Webhook URL incorreta ou token inválido
- `Resposta da Escola: 500` → Erro no servidor da escola
