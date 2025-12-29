# 📸 Step by Step Visual Guide

## 🎬 Guia Visual Passo a Passo

### PASSO 1️⃣: Executar SQL Migration (2 min)

#### 1.1 - Abra o SQL Editor do Supabase

```
URL: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/sql
```

Você verá uma tela como esta:
```
┌─────────────────────────────────────────┐
│ Supabase SQL Editor                     │
│ ┌─────────────────────────────────────┐ │
│ │ SELECT * FROM users LIMIT 100;      │ │
│ └─────────────────────────────────────┘ │
│ [Run]                                   │
└─────────────────────────────────────────┘
```

#### 1.2 - Limpar Query Padrão

Clique no campo e delete tudo (Ctrl+A → Delete)

#### 1.3 - Copiar SQL Migration

Abra: `supabase/migrations/001_create_payment_tables.sql`

Copie TODO o conteúdo (Ctrl+A → Ctrl+C)

#### 1.4 - Colar no SQL Editor

No campo de query, paste (Ctrl+V)

Deve ficar assim:
```sql
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mercado_pago_id TEXT NOT NULL UNIQUE,
  ...
)
```

#### 1.5 - Executar

Clique no botão **[Run]** (ou Cmd+Enter)

Você deve ver:
```
✅ Success

Created 3 tables
- payments
- subscriptions  
- payment_audit_log
```

---

### PASSO 2️⃣: Deploy das Funções (3 min)

#### 2.1 - Abrir Terminal

Na sua IDE (VS Code, etc):
- `Ctrl + ~` (ou menu Terminal)

Navegue para raiz do projeto:
```bash
cd seu/projeto
```

#### 2.2 - Login no Supabase

```bash
supabase login
```

Uma aba do navegador abrirá. Faça login com sua conta Supabase.

Após fazer login, volte ao terminal. Deve aparecer:
```
✅ Logged in as: seu-email@example.com
```

#### 2.3 - Deploy Functions

```bash
supabase functions deploy
```

Aguarde... vai demorar ~30 segundos

Você deve ver:
```
🚀 Starting deployment

✅ Function mp-webhook deployed successfully
   Endpoint: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook

✅ Function create-preference deployed successfully
   Endpoint: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference

✅ Function create-checkout deployed successfully
   Endpoint: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-checkout
```

#### 2.4 - Verificar Deployment

```bash
supabase functions list
```

Deve mostrar:
```
┌─────────────────────┬───────────────────────────────────────────┐
│ Name                │ URL                                       │
├─────────────────────┼───────────────────────────────────────────┤
│ mp-webhook          │ /functions/v1/mp-webhook                  │
│ create-preference    │ /functions/v1/create-preference           │
│ create-checkout     │ /functions/v1/create-checkout            │
└─────────────────────┴───────────────────────────────────────────┘
```

✅ **Se você vê as 3 funções, está correto!**

---

### PASSO 3️⃣: Verificar Tabelas no Banco (1 min)

#### 3.1 - Ir para Database Tables

URL: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/editor

#### 3.2 - Procurar as Tabelas

Na esquerda, você deve ver:

```
Tables
├─ auth.users
├─ public.payments          ← NOVA
├─ public.subscriptions     ← NOVA
└─ public.payment_audit_log ← NOVA
```

#### 3.3 - Clicar em "payments"

Deve mostrar:

```
Columns:
- id (UUID)
- mercado_pago_id (TEXT)
- user_email (TEXT)
- plan_type (TEXT)
- status (TEXT)
- payment_details (JSONB)
- created_at (TIMESTAMP)
- processed_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- notes (TEXT)
```

✅ **Se você vê as colunas, está correto!**

---

### PASSO 4️⃣: Testar Checkout (8 min)

#### 4.1 - Abrir seu App

No navegador:
```
http://localhost:5173/checkout
```

Você deve ver:

```
┌──────────────────────────────────┐
│ Escolha seu Plano                │
│                                  │
│ ┌─────────────┐  ┌────────────┐ │
│ │ PLANO ANUAL │  │PLANO SEMEST│ │
│ │ R$ 397      │  │ R$ 297     │ │
│ │ Continuar   │  │ Continuar  │ │
│ └─────────────┘  └────────────┘ │
└──────────────────────────────────┘
```

#### 4.2 - Clicar em "Continuar" (Plano Anual)

O botão mostrará "Processando..." por alguns segundos.

Após sucesso, você será redirecionado para o Mercado Pago:

```
Mercado Pago Checkout
┌────────────────────────────────────┐
│ Plano Anual - R$ 397               │
│                                    │
│ Email: seu@email.com               │
│ [ Continuar com Mercado Pago ]    │
└────────────────────────────────────┘
```

#### 4.3 - Usar Cartão de Teste

```
Cartão:    4111 1111 1111 1111
Data:      12/25
CVV:       123
Titular:   Fulano de Tal
```

Preencha os campos e clique "Pagar"

#### 4.4 - Confirmar Pagamento

Você será redirecionado para:
```
http://localhost:5173/payment-return?status=approved
```

Deve aparecer:
```
✅ Pagamento Confirmado! 🎉

Sua assinatura no Clube está ativa.

[Ir para Área do Aluno] [Voltar ao Início]
```

---

### PASSO 5️⃣: Verificar Webhook Logs (2 min)

#### 5.1 - Ver Logs do Webhook

No terminal:

```bash
supabase functions logs mp-webhook --follow
```

Você deve ver:

```
2025-12-29T10:15:32.123Z
🔔 Webhook recebido do Mercado Pago
Tipo: payment
ID: 123456789
Ação: approved

💳 Notificação de pagamento recebida
Payment ID: 123456789

📋 Detalhes do pagamento:
   Status: approved
   Email: seu@email.com
   Reference: anual

✅ Payment saved to database

---

2025-12-29T10:15:33.456Z
Log completed successfully
```

#### 5.2 - Parar de Ver Logs

Pressione `Ctrl + C`

---

### PASSO 6️⃣: Verificar Pagamento no Banco (1 min)

#### 6.1 - Ir para Database Tables

URL: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/editor

#### 6.2 - Clicar em "payments"

#### 6.3 - Ver Registros

Deve aparecer um novo registro:

```
┌──────────────────────────────────────────┐
│ mercado_pago_id │ user_email │ plan_type │
├─────────────────┼────────────┼───────────┤
│ 123456789       │ seu@e...   │ anual     │
└──────────────────────────────────────────┘
```

Clique para ver detalhes:

```
ID: <uuid>
Mercado Pago ID: 123456789
User Email: seu@email.com
Plan Type: anual
Status: approved
Payment Details: { ... json ... }
Created At: 2025-12-29 10:15:32
Processed At: 2025-12-29 10:15:33
```

✅ **Se você vê o registro, tudo funcionou!**

---

## 🎯 Resumo Visual

### ✅ Sucesso Total

Se você viu:
1. ✅ SQL migration executada (3 tabelas criadas)
2. ✅ 3 funções deployadas
3. ✅ Página de pagamento confirmado
4. ✅ Webhook logs mostrando sucesso
5. ✅ Pagamento salvo no banco

**PARABÉNS! 🎉 Seu webhook está 100% funcionando!**

### ❌ Se Algo Deu Errado

| O que deu errado? | Como consertar? |
|------------------|-----------------|
| SQL migration falhou | Verifique syntax no SQL Editor, execute linha por linha |
| Funções não deployaram | `supabase login` → `supabase functions deploy --force-all` |
| Redirecionamento para MP falhou | Verifique console do navegador (F12) para ver erro |
| Webhook não recebeu notificação | Veja `supabase functions logs mp-webhook` |
| Pagamento não salvou | Verifique se SUPABASE_SERVICE_ROLE_KEY está em Secrets |

---

## 🔧 Troubleshooting Visual

### Problema: Vejo erro de CORS

**Solução:** Verifique se está testando em `http://localhost:5173` (não em https)

### Problema: Vejo erro 500 no webhook

**Solução:** Execute `supabase functions logs mp-webhook` para ver o erro específico

### Problema: Botão "Continuar" fica em "Processando..." forever

**Solução:** Abra DevTools (F12) → Console → veja qual erro API retornou

### Problema: Vejo tela em branco após clique

**Solução:** Pode estar carregando. Aguarde 5 segundos. Veja console (F12) para erros.

---

## 📱 Mobile/Responsivo

Se for testar em mobile:

```
Mercado Pago detecta e abre app nativo
ou redireciona para mobile web
```

Tudo deve funcionar normalmente em mobile também.

---

## 🎬 Próximos Passos (Extras)

### Se Quiser Enviar Emails

1. Crie conta em Resend.com
2. Obtenha API key
3. Vá em: Settings → Secrets
4. Adicione: `RESEND_API_KEY = sua_chave`
5. Descomente código em `mp-webhook/index.ts`

### Se Quiser Criar Usuários Automaticamente

1. Edite `mp-webhook/index.ts`
2. Procure por: `// Create user in Supabase Auth`
3. Implemente lógica de user creation
4. Redeploy: `supabase functions deploy mp-webhook`

### Se Quiser Proteger Rotas Premium

1. Crie componente de verificação de acesso
2. Use exemplo em `INTEGRATION_EXAMPLES.md`
3. Proteja rotas com autenticação

---

## ✅ Final Checklist

Imprima/copie este checklist:

```
☐ SQL migration executada (3 tabelas criadas)
☐ Functions deployadas (3 funções online)
☐ Tabelas visíveis no Database Editor
☐ Checkout página acessível
☐ Clique em "Continuar" funciona
☐ Redirecionamento para MP funciona
☐ Pagamento com cartão de teste funciona
☐ Redireção para success page funciona
☐ Webhook logs mostram sucesso
☐ Pagamento visível no Database

✅ TUDO OK? PARABÉNS! 🎉
```

---

**Agora você está pronto para produção!** 🚀

Leia `INTEGRATION_EXAMPLES.md` para ver como integrar com seu sistema de usuários.
