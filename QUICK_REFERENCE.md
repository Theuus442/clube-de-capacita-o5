# ⚡ Quick Reference Card

## Copy & Paste Commands

### 1️⃣ SQL Migration (Copie e cole no Supabase SQL Editor)

URL: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/sql

Copie o arquivo: `supabase/migrations/001_create_payment_tables.sql`

Execute no SQL Editor

### 2️⃣ Deploy Functions

```bash
# Terminal na raiz do projeto
supabase login
supabase functions deploy
```

### 3️⃣ Ver Logs

```bash
# Ver logs em tempo real
supabase functions logs mp-webhook --follow

# Ver últimas 50 linhas
supabase functions logs mp-webhook --limit 50

# Salvar logs em arquivo
supabase functions logs mp-webhook > webhook-logs.txt
```

### 4️⃣ Teste de URL

```bash
# Testar webhook manualmente
curl -X POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook

# Esperado: {"success":true,"message":"Notificação recebida",...}
```

### 5️⃣ Verificar Status

```bash
# Listar todas as funções
supabase functions list

# Esperado: 3 funções (mp-webhook, create-preference, create-checkout)
```

### 6️⃣ Limpar Deploy (Se necessário)

```bash
# Refazer deploy completo
supabase functions deploy --force-all

# Deploy apenas webhook
supabase functions deploy mp-webhook
```

---

## URLs Importantes

| Recurso | URL |
|---------|-----|
| Supabase Dashboard | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf |
| SQL Editor | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/sql |
| Secrets | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets |
| Functions | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/functions |
| Database Tables | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/editor |
| Webhook URL | https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook |
| MP Sandbox | https://www.mercadopago.com.ar/developers/en/tools/sandbox |

---

## Cartão de Teste (Mercado Pago Sandbox)

```
Cartão:         4111 1111 1111 1111
Data:           12/25 (qualquer futuro)
CVV:            123
Titular:        Qualquer nome

Status Resultados:
4111 1111 1111 1111 → APPROVED
4111 1111 1111 1112 → REJECTED
4111 1111 1111 1113 → PENDING
```

---

## Estrutura de Pastas

```
seu-projeto/
├── supabase/
│   ├── functions/
│   │   ├── mp-webhook/
│   │   │   └── index.ts              ✅ NOVO
│   │   ├── create-preference/
│   │   │   └── index.ts              ✅ ATUALIZADO
│   │   └── create-checkout/
│   │       └── index.ts              ✅ ATUALIZADO
│   └── migrations/
│       └── 001_create_payment_tables.sql  ✅ NOVO
│
├── WEBHOOK_FIX_DEPLOYMENT.md         ✅ NOVO
├── WEBHOOK_DEPLOY_CHECKLIST.md       ✅ NOVO
├── COMPLETE_SETUP_GUIDE.md           ✅ NOVO
├── INTEGRATION_EXAMPLES.md           ✅ NOVO
├── DEPLOYMENT_SUMMARY.md             ✅ NOVO
└── setup-mercado-pago.sh             ✅ NOVO
```

---

## 🔍 Debug Rápido

### Problema: Webhook não está recebendo notificações

```bash
# 1. Ver se função está online
supabase functions list

# 2. Ver logs de erros
supabase functions logs mp-webhook

# 3. Testar URL manualmente
curl -X POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook

# 4. Verificar se está público (sem autenticação)
# Deve responder 200 sem token
```

### Problema: Payment não está sendo salvo no DB

```bash
# 1. Verificar se migration foi executada
# Vá em: Database → Tables → Deve haver "payments"

# 2. Se não existe, executar migration novamente
# Abra SQL Editor e cole: supabase/migrations/001_create_payment_tables.sql

# 3. Verificar Secrets
# Vá em: Settings → Secrets → SUPABASE_SERVICE_ROLE_KEY deve existir
```

### Problema: Função não está deployada

```bash
# 1. Verificar login
supabase login

# 2. Verificar projeto certo
supabase projects list

# 3. Fazer deploy com force
supabase functions deploy --force-all

# 4. Ver status
supabase functions list
```

---

## 📊 Fluxo de Dados

```
START: Usuário clica "Continuar"
  ↓
POST /functions/v1/create-preference
  (planType: "anual", redirectUrl: "https://seu-site.com")
  ↓
RESPONSE: { preferenceId: "123456789" }
  ↓
Redireciona para: mercadopago.com/checkout/v1?preference_id=123456789
  ↓
Usuário completa pagamento
  ↓
MP chama webhook:
  GET /functions/v1/mp-webhook?type=payment&id=12345&action=approved
  ↓
mp-webhook function:
  1. Valida pagamento
  2. Salva em payments table
  3. Atualiza subscriptions table
  4. Pronto para: email, user creation, etc
  ↓
RESPONSE: 200 OK
  ↓
MP para de retentativas
```

---

## 🧪 Checklist de Validação

```
ANTES DE COLOCAR EM PRODUÇÃO:

□ SQL migration executada? (3 tabelas criadas)
□ Funções deployadas? (supabase functions list)
□ Webhook recebendo notificações? (veja logs)
□ Pagamentos sendo salvos no DB? (query na tabela)
□ Email configurado? (opcional, mas recomendado)
□ Teste end-to-end feito? (pagamento fake no sandbox)
□ Logs configurados? (para monitor erros)
□ Backup do DB feito? (antes de produção)
□ MP_ACCESS_TOKEN configurado? (em Secrets)
□ SUPABASE_SERVICE_ROLE_KEY existe? (em Secrets)
```

---

## 🚨 Erros Comuns

| Erro | Solução |
|------|---------|
| `Table payments does not exist` | Execute SQL migration |
| `SUPABASE_SERVICE_ROLE_KEY not found` | Configure em Settings → Secrets |
| `Function deployment failed` | `supabase login` → `supabase functions deploy --force-all` |
| `Webhook not receiving` | Veja `supabase functions logs` |
| `Permission denied` | RLS policies configuradas, use service role |
| `Payment not saving` | Verifique logs e console.log em mp-webhook |

---

## 📞 Recursos

- **Supabase CLI Docs:** https://supabase.com/docs/guides/cli/getting-started
- **Mercado Pago API:** https://www.mercadopago.com.br/developers
- **Deno Runtime:** https://deno.land/manual
- **PostgreSQL:** https://www.postgresql.org/docs/

---

## ✅ Pronto?

Se tudo está funcionando:

1. ✅ SQL migration executada
2. ✅ Funções deployadas
3. ✅ Webhook recebendo
4. ✅ Pagamentos salvos

**PARABÉNS! 🎉 Seu webhook está funcionando!**

Próximos passos:
- Integrar com seu sistema de usuários
- Enviar emails de confirmação
- Criar lógica de renovação automática
- Proteger rotas premium

Veja `INTEGRATION_EXAMPLES.md` para código pronto!
