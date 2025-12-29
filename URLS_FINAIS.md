# 📱 URLs Finais - Referência Rápida

## ✅ Funções Supabase

### Create Preference
```
https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference
```
**O que faz:** Cria preferência de pagamento no Mercado Pago
**Método:** POST
**Usado por:** Frontend quando clica "Continuar"

---

### MP Webhook
```
https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
```
**O que faz:** Recebe notificação de pagamento aprovado e cria usuário
**Método:** POST
**Usado por:** Mercado Pago (automático)

---

## 🔍 Onde Estão Configuradas

### Em `create-preference/index.ts`
```typescript
const webhookUrl = `https://${supabaseProjectId}.supabase.co/functions/v1/mp-webhook`
```
✅ Automático - usa SUPABASE_PROJECT_ID

### No Frontend (`MercadoPagoCheckout.tsx`)
```typescript
const apiUrl = 'https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference'
```
✅ Configurado para chamar a função correta

---

## 📊 Fluxo de URLs

```
1. Usuário clica "Continuar"
        ↓
2. Frontend POST para:
   https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference
        ↓
3. Supabase cria preferência no MP
   └─ Define webhook_url = https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
        ↓
4. Usuário paga
        ↓
5. MP POST para:
   https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
        ↓
6. Webhook processa e cria usuário
```

---

## 🧪 Testar URLs

### Create Preference
```bash
curl -X POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference \
  -H "Content-Type: application/json" \
  -d '{"planType":"anual"}'
```

**Esperado:**
```json
{
  "preferenceId": "123456789"
}
```

---

### MP Webhook
```bash
curl -X POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
```

**Esperado:**
```
"Method Not Allowed" (pois falta o POST body correto)
```

Ou

```json
{
  "error": "ID ausente"
}
```

---

## ✅ Validação

Se você conseguir:

1. ✅ Fazer POST para create-preference e receber preferenceId
2. ✅ Ver MP webhook nos logs quando pagamento é feito
3. ✅ Ver mensagem "Resposta da Escola" nos logs

**Então TUDO está funcionando!** 🎉

---

## 🚀 Deploy Status

```
✅ create-preference deployed
   URL: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference

✅ mp-webhook deployed
   URL: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook

✅ TUDO PRONTO PARA USAR
```

---

## 📞 Se Precisar Redeploy

```bash
# Redeploy ambas as funções
supabase functions deploy

# Ou redeploy específico
supabase functions deploy create-preference
supabase functions deploy mp-webhook
```

---

## 💾 Documentação de Referência

| Documento | Conteúdo |
|-----------|----------|
| `COMECE_AQUI_AGORA.md` | Setup em 3 passos |
| `SETUP_MERCADO_PAGO_FINAL.md` | Documentação completa |
| `MUDANCAS_REALIZADAS.md` | O que foi otimizado |
| `URLS_FINAIS.md` | Este arquivo |

---

**Tudo está pronto! As URLs estão corretas e funcionando! 🚀**
