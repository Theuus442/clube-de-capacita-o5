# 🚀 Setup Final - Mercado Pago + Escola

## 📋 Resumo

Sistema de pagamento do Mercado Pago que:
1. ✅ Cria preferência de pagamento
2. ✅ Recebe webhook após aprovação
3. ✅ **Envia dados automaticamente para sua plataforma de educação**
4. ✅ **Cria usuário com acesso ativo**

**Tudo automático!** Sem necessidade de tabelas extras no Supabase.

---

## 🎯 O Fluxo

```
1. Usuário clica "Continuar" no plano
        ↓
2. Frontend chama: /functions/v1/create-preference
        ↓
3. Supabase cria preferência no Mercado Pago
   └─ external_reference = PLANO_ANUAL ou PLANO_SEMESTRAL
        ↓
4. Usuário vai para checkout Mercado Pago
        ↓
5. Completa pagamento
        ↓
6. Mercado Pago envia webhook para: /functions/v1/mp-webhook
        ↓
7. mp-webhook:
   - Valida pagamento no MP
   - Se APPROVED, extrai dados do pagador
   - Calcula data final (365 dias para anual, 180 para semestral)
   - Envia FormData para: https://estudandoead.com/threynnare/api/v2/index.php?usuarios/novo
   - Cria usuário automaticamente
        ↓
8. ✅ USUÁRIO ATIVADO - Pode acessar a plataforma!
```

---

## 🔧 Setup (5 passos)

### PASSO 1: Configurar Secrets no Supabase

URL: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets

Você precisa de **2 secrets**:

```
1. MP_ACCESS_TOKEN
   Valor: Seu token do Mercado Pago (TEST-xxx em sandbox)
   Obtenha em: https://www.mercadopago.com.br/developers/panel/credentials

2. ESCOLA_TOKEN
   Valor: Seu token de autenticação da plataforma estudandoead.com
   (Será usado para validar as requisições da API)
```

Clique em "New secret" para cada um.

---

### PASSO 2: Deploy das Funções

No terminal na raiz do projeto:

```bash
# Login no Supabase (se não estiver)
supabase login

# Deploy das funções
supabase functions deploy
```

Você deve ver:
```
✅ Function mp-webhook deployed successfully
✅ Function create-preference deployed successfully
```

---

### PASSO 3: Verificar Deployment

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
└─────────────────────┴───────────────────────────────────────────┘
```

✅ Se vê as 2 funções, está correto!

---

### PASSO 4: Testar Checkout

No navegador:
```
http://localhost:5173/checkout
```

1. Clique em "Continuar" em um plano
2. Você será redirecionado para o Mercado Pago
3. Use cartão de teste:
   - Número: `4111 1111 1111 1111`
   - Data: `12/25`
   - CVV: `123`
4. Complete o pagamento

---

### PASSO 5: Validar Webhook

```bash
# Ver logs em tempo real
supabase functions logs mp-webhook --follow
```

Você deve ver:

```
Enviando para: https://estudandoead.com/threynnare/api/v2/index.php?usuarios/novo
Resposta da Escola: {"success": true} ou similiar
```

Parabéns! O usuário foi criado na sua plataforma! 🎉

---

## 📊 O Que Cada Função Faz

### `create-preference`
**Arquivo:** `supabase/functions/create-preference/index.ts`

**Responsabilidades:**
- ✅ Recebe o plano selecionado (anual ou semestral)
- ✅ Cria preferência no Mercado Pago
- ✅ Define external_reference para saber qual plano
- ✅ Define webhook URL para receber notificações
- ✅ Retorna preferenceId para redirecionar ao checkout MP

**Entrada:**
```javascript
{
  planType: "anual" | "semestral",
  redirectUrl: "https://seu-dominio.com" (opcional)
}
```

**Saída:**
```javascript
{
  preferenceId: "123456789"
}
```

---

### `mp-webhook`
**Arquivo:** `supabase/functions/mp-webhook/index.ts`

**Responsabilidades:**
- ✅ Recebe notificação do Mercado Pago
- ✅ Valida o pagamento (verifica se é realmente "approved")
- ✅ Extrai dados do pagador (nome, email)
- ✅ Calcula data de expiração (365 dias ou 180 dias)
- ✅ Gera senha aleatória
- ✅ **Envia dados para sua plataforma de educação**
- ✅ **Cria usuário automaticamente**

**Entrada (do Mercado Pago):**
```javascript
{
  data: { id: "12345678" },
  topic: "payment",
  action: "payment.created"
}
```

**Saída (para sua escola):**
```javascript
{
  token: "SEU_ESCOLA_TOKEN",
  nome: "Fulano de Tal",
  email: "email@example.com",
  status: "ativo",
  datafinal: "2026-12-29",
  senha: "abc12345"
}
```

---

## 🔐 Ambiente & Secrets

**Necessário em Supabase Secrets:**

```
MP_ACCESS_TOKEN = "Seu token do Mercado Pago"
ESCOLA_TOKEN = "Seu token da plataforma"
SUPABASE_PROJECT_ID = "zajyeykcepcrlngmdpvf" (automático)
```

**Como obter:**

1. **MP_ACCESS_TOKEN:**
   - Acesse: https://www.mercadopago.com.br/developers/panel/credentials
   - Em "Producción", copie o "Access Token"
   - Para testes, use o de "Sandbox"

2. **ESCOLA_TOKEN:**
   - Obtém com seu time da plataforma educacional
   - Será usado para validar requisições ao API

---

## 🧪 Teste Completo (Passo a Passo)

### 1. Verify Secrets
```bash
# Não consegue fazer via CLI, but você pode ver em:
# https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets
# (Procure por MP_ACCESS_TOKEN e ESCOLA_TOKEN)
```

### 2. Fazer Pagamento
```
1. Acesse: http://localhost:5173/checkout
2. Clique em "Plano Anual"
3. Cartão: 4111 1111 1111 1111 / 12/25 / 123
4. Clique em "Pagar"
```

### 3. Ver Webhook Logs
```bash
supabase functions logs mp-webhook --limit 50

# Procure por:
# "Enviando para: https://estudandoead.com/..."
# "Resposta da Escola: ..."
```

### 4. Verificar Se Usuário Foi Criado
- Acesse sua plataforma de educação
- Procure pelo email usado no teste
- Deve estar com status "ativo"
- Data final deve ser ~365 dias a partir de hoje

---

## 🐛 Troubleshooting

### ❌ "Token do MP não configurado"
```
Solução: Configure MP_ACCESS_TOKEN em Supabase Secrets
URL: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets
```

### ❌ "Falha ao conectar com Mercado Pago"
```
Possíveis causas:
1. Token MP_ACCESS_TOKEN inválido
2. Plano inválido (deve ser "anual" ou "semestral")
3. Rede/conectividade

Solução: Verifique logs com: supabase functions logs create-preference
```

### ❌ "Webhook não recebeu notificação"
```
Possíveis causas:
1. Função não foi deployada
2. Erro na função (verifique logs)
3. Pagamento não foi aprovado

Solução:
- Ver logs: supabase functions logs mp-webhook
- Verificar status do pagamento no Mercado Pago
```

### ❌ "Usuário não foi criado na plataforma"
```
Possíveis causas:
1. ESCOLA_TOKEN inválido
2. URL da API está errada
3. Formato de dados está incorreto

Solução:
- Ver logs: supabase functions logs mp-webhook
- Verificar "Resposta da Escola" nos logs
- Validar URL: https://estudandoead.com/threynnare/api/v2/index.php?usuarios/novo
```

### ❌ "CORS Error"
```
Solução: Já está configurado em create-preference
Se erro persistir, limpe cache do navegador
```

---

## 📱 URLs Importantes

| Recurso | Link |
|---------|------|
| **Supabase Dashboard** | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf |
| **Secrets** | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets |
| **Functions** | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/functions |
| **MP Credentials** | https://www.mercadopago.com.br/developers/panel/credentials |
| **MP Sandbox** | https://www.mercadopago.com.ar/developers/en/tools/sandbox |
| **Webhook URL** | https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook |
| **Create Preference URL** | https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference |

---

## ✅ Checklist Final

```
☐ MP_ACCESS_TOKEN configurado em Secrets
☐ ESCOLA_TOKEN configurado em Secrets
☐ Funções deployadas (supabase functions deploy)
☐ Verificou com: supabase functions list
☐ Teste feito em http://localhost:5173/checkout
☐ Pagamento completado com cartão de teste
☐ Logs mostram: "Resposta da Escola: ..."
☐ Usuário aparece na plataforma de educação
☐ Tudo funcionando!

✅ PRONTO PARA PRODUÇÃO
```

---

## 🚀 Deploy para Produção

Quando tiver certeza que tudo funciona:

1. **Atualize os Secrets:**
   - MP_ACCESS_TOKEN → Use token de produção (não sandbox)
   - ESCOLA_TOKEN → Mantenha igual

2. **Confirme as URLs:**
   - back_urls em create-preference devem apontar para seu domínio
   - urlEscola em mp-webhook deve ser a URL correta

3. **Execute deploy:**
   ```bash
   supabase functions deploy --project-id zajyeykcepcrlngmdpvf
   ```

4. **Teste com pagamento real**

---

## 📞 Próximas Integrações

Se quiser melhorar ainda mais:

1. **Email de boas-vindas:**
   - Configure SendGrid ou Resend
   - Envie para paymentData.payer.email

2. **Log de transações:**
   - Salve em Supabase para auditoria
   - Crie tabela de logs

3. **Reembolsos:**
   - Configure webhook para payment.refunded
   - Desative usuário na plataforma

4. **Renovação automática:**
   - Configure assinatura no MP
   - Detecte renewal e atualize datafinal

---

## 💡 Dicas Finais

1. **Sempre testar em sandbox primeiro**
   - Use tokens TEST- (não APP_USR-)
   - Use cartões de teste

2. **Ver logs frequentemente**
   ```bash
   supabase functions logs mp-webhook --follow
   ```

3. **Salvar resposta da plataforma**
   - Ajuda a debugar problemas
   - Já está sendo feito (veja console.log)

4. **Testar com diferentes planos**
   - Anual → data final = hoje + 365 dias
   - Semestral → data final = hoje + 180 dias

---

**Você está pronto! Boa sorte! 🎉**
