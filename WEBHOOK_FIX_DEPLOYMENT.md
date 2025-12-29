# 🔧 Correção do Webhook do Mercado Pago

## O Problema

O webhook do Mercado Pago estava sendo configurado com URLs locais (ex: `http://localhost:5173`), que o Mercado Pago não consegue acessar porque são URLs privadas/locais.

Você via logs assim:
```
Webhook: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
Listening on http://localhost:9999/
```

A URL localhost nunca chegava ao Mercado Pago porque é interna.

## A Solução

✅ Criamos uma função Supabase dedicada para webhooks: `mp-webhook`
✅ Agora o webhook usa a URL pública: `https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook`
✅ Esta URL funciona em desenvolvimento E produção

## 📋 Passos para Deploy

### 1️⃣ Abra o terminal na raiz do projeto

```bash
cd seu/projeto
```

### 2️⃣ Deploy das funções Supabase

```bash
# Deploy de todas as funções
supabase functions deploy

# Ou especificamente:
supabase functions deploy mp-webhook
supabase functions deploy create-preference
supabase functions deploy create-checkout
```

### 3️⃣ Aguarde confirmação

Você deve ver algo assim:
```
✅ Function mp-webhook deployed successfully
✅ Function create-preference deployed successfully  
✅ Function create-checkout deployed successfully
```

### 4️⃣ Teste no Sandbox do Mercado Pago

1. Acesse: https://seu-app/checkout
2. Clique em um plano
3. Complete o pagamento no Mercado Pago (sandbox)
4. Verificar logs:
   ```
   supabase functions logs mp-webhook
   ```

## 🔍 O que mudou?

### Antes ❌
```javascript
notification_url: `${cleanBaseUrl}/api/webhooks/mercado-pago`,
// Resultado em dev: http://localhost:5173/api/webhooks/mercado-pago
// Resultado em prod: https://seu-app/api/webhooks/mercado-pago
```

### Depois ✅
```javascript
const supabaseProjectId = 'zajyeykcepcrlngmdpvf'
const webhookUrl = `https://${supabaseProjectId}.supabase.co/functions/v1/mp-webhook`
// Sempre: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
```

## 📝 Arquivos Alterados

- ✅ `supabase/functions/mp-webhook/index.ts` (criado)
- ✅ `supabase/functions/create-preference/index.ts` (atualizado)
- ✅ `supabase/functions/create-checkout/index.ts` (atualizado)

## ⚠️ Próximos Passos

A função `mp-webhook` foi criada com estrutura básica. Você ainda precisa:

1. **Processar os pagamentos no webhook:**
   ```typescript
   // Em mp-webhook/index.ts, você precisa:
   // 1. Consultar status do pagamento
   // 2. Atualizar banco de dados
   // 3. Enviar email de confirmação
   // 4. Ativar assinatura do usuário
   ```

2. **Configurar banco de dados** (Supabase/PostgreSQL):
   ```sql
   CREATE TABLE payments (
     id uuid PRIMARY KEY,
     user_email text,
     mercado_pago_id text,
     plan_type text,
     status text,
     created_at timestamp
   );
   ```

3. **Integrar webhook com seu backend** conforme necessário

## 🚀 Comandos Úteis

```bash
# Ver logs das funções
supabase functions logs mp-webhook
supabase functions logs create-preference

# Testar função localmente
supabase functions serve

# Deploy específico
supabase functions deploy mp-webhook --project-id zajyeykcepcrlngmdpvf
```

## ✅ Como Saber que Funcionou

Quando você completar um pagamento no sandbox do Mercado Pago, você deve ver:

1. Página de sucesso/pending/falha
2. Logs no Supabase mostrando:
   ```
   🔔 Webhook recebido do Mercado Pago
   Tipo: payment
   ID: xxxxx
   ✅ Pagamento processado com sucesso
   ```

## 📞 Suporte

Se tiver problemas:

1. Verifique se as funções estão deployadas:
   ```bash
   supabase functions list
   ```

2. Veja os logs:
   ```bash
   supabase functions logs mp-webhook --limit 50
   ```

3. Teste manualmente a URL:
   ```bash
   curl https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
   ```

---

**Status:** ✅ Webhook público configurado e pronto para deploy
