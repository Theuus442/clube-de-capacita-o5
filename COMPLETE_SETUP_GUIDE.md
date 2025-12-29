# 🚀 Complete Mercado Pago Integration Setup

## 📋 Resumo das Mudanças

Você tem TUDO pronto para:
- ✅ Webhook do Mercado Pago com URL pública
- ✅ Processamento automático de pagamentos
- ✅ Salvar pagamentos no banco de dados
- ✅ Tabelas criadas no Supabase
- ✅ Notificações de email (pronto para integrar)

---

## 🎯 Passo a Passo - Siga na Ordem

### PASSO 1: Criar Tabelas no Supabase (2 min)

Abra o Supabase SQL Editor:
1. Vá para: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/sql
2. Clique em "New Query"
3. Cole o conteúdo do arquivo: `supabase/migrations/001_create_payment_tables.sql`
4. Execute (Cmd+Enter)

Você deve ver: ✅ Success

### PASSO 2: Deploy das Funções (2 min)

No terminal na raiz do projeto:

```bash
# Login no Supabase (se não estiver logado)
supabase login

# Deploy todas as funções
supabase functions deploy

# Ou se preferir deploy individual:
supabase functions deploy mp-webhook
supabase functions deploy create-preference
supabase functions deploy create-checkout
```

Você deve ver:
```
✅ Function mp-webhook deployed successfully
✅ Function create-preference deployed successfully
✅ Function create-checkout deployed successfully
```

### PASSO 3: Verificar Deployment (1 min)

```bash
# Ver funções deployadas
supabase functions list
```

Deve mostrar as 3 funções:
- ✅ mp-webhook
- ✅ create-preference
- ✅ create-checkout

### PASSO 4: Testar no Sandbox do Mercado Pago (10 min)

1. Acesse seu app em desenvolvimento: `http://localhost:5173/checkout`
2. Clique em um plano (ex: "Plano Anual")
3. Você será direcionado ao Mercado Pago sandbox
4. Use cartão de teste:
   - Número: `4111 1111 1111 1111`
   - Data: `12/25` (qualquer mês/ano futuro)
   - CVV: `123`
   - Nome: Qualquer coisa
5. Complete o pagamento

### PASSO 5: Validar Webhook (2 min)

Após completar o pagamento:

```bash
# Ver logs do webhook
supabase functions logs mp-webhook --follow
```

Você deve ver:
```
🔔 Webhook recebido do Mercado Pago
💳 Notificação de pagamento recebida
📋 Detalhes do pagamento:
   Status: approved (ou pending)
   Email: test@example.com
   Reference: anual
✅ Payment saved to database
```

### PASSO 6: Verificar Dados no Banco (1 min)

No Supabase:
1. Vá para: Database → Tables → payments
2. Você deve ver um registro novo com:
   - mercado_pago_id
   - user_email
   - plan_type (anual ou semestral)
   - status (approved ou pending)

---

## 🔧 Configurações Avançadas (Opcional)

### Email Notifications

O webhook está preparado para enviar emails. Para ativar:

1. **Com Resend (recomendado):**
   ```bash
   # 1. Faça signup em https://resend.com
   # 2. Obtenha sua API key
   # 3. No Supabase, vá em Settings → Secrets
   # 4. Adicione: RESEND_API_KEY = sua_chave
   # 5. Descomente o código em supabase/functions/mp-webhook/index.ts
   ```

2. **Com SendGrid:**
   ```bash
   # Similar ao Resend, mas use SendGrid API
   # Configure: SENDGRID_API_KEY em Supabase Secrets
   ```

3. **Com outro serviço:**
   - Edite `supabase/functions/mp-webhook/index.ts`
   - Procure a função `sendEmailNotification()`
   - Implemente sua lógica de email

### Sincronizar com Frontend

Para obter dados do pagamento no seu app React:

```typescript
// src/pages/PaymentReturn.tsx
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const PaymentReturn = () => {
  const [paymentData, setPaymentData] = useState(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const status = searchParams.get('status')
    const preferenceId = searchParams.get('preference_id')
    
    // Buscar dados do pagamento no Supabase
    fetch(`/api/payment-status?preference_id=${preferenceId}`)
      .then(r => r.json())
      .then(data => setPaymentData(data))
  }, [searchParams])

  // ... resto do componente
}
```

---

## ✅ Checklist Completo

- [ ] **PASSO 1:** Executar SQL no Supabase (tabelas criadas)
- [ ] **PASSO 2:** Fazer deploy das funções (`supabase functions deploy`)
- [ ] **PASSO 3:** Verificar que as 3 funções estão deployadas
- [ ] **PASSO 4:** Testar pagamento no sandbox
- [ ] **PASSO 5:** Ver webhook logs mostrando sucesso
- [ ] **PASSO 6:** Confirmar dados no banco de dados
- [ ] **PASSO 7:** (Opcional) Configurar emails

---

## 📊 URLs de Referência

| Recurso | URL |
|---------|-----|
| **Dashboard Supabase** | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf |
| **SQL Editor** | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/sql |
| **Secrets** | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets |
| **Functions** | https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/functions |
| **Webhook Function** | https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook |
| **Mercado Pago Sandbox** | https://www.mercadopago.com.ar/developers/en/tools/sandbox |

---

## 🐛 Troubleshooting

### ❌ Erro: "Functions not deployed"

```bash
# Verifique se você está logado
supabase login

# Force deploy
supabase functions deploy --project-id zajyeykcepcrlngmdpvf
```

### ❌ Erro: "Table does not exist"

```bash
# Execute a migration novamente no SQL Editor
# Ou verifique em: Database → Tables
```

### ❌ Webhook não recebe notificações

```bash
# 1. Verifique o log:
supabase functions logs mp-webhook --limit 100

# 2. Teste a URL manualmente:
curl -X POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook

# 3. Confirme que a função está public (não pode exigir autenticação)
```

### ❌ Pagamento salvo mas status "pending"

- Isso é normal! No sandbox, às vezes fica pendente
- O webhook foi acionado corretamente
- Você pode simular aprovação na conta Mercado Pago

---

## 🎓 Próximos Passos

1. **Enviar credenciais de acesso** após aprovação:
   - Crie uma tabela `user_activations`
   - Marque como ativo quando status = "approved"

2. **Integrar com seu sistema de membros:**
   - Sincronizar com sua plataforma de cursos
   - Bloquear acesso se status ≠ "approved"

3. **Configurar renovação automática:**
   - Mercado Pago suporta assinaturas
   - Tabela `subscriptions` já está criada

4. **Adicionar webhooks para:**
   - Reembolsos
   - Cancelamentos
   - Renovações

---

## 📞 Suporte

Se algo não funcionar:

1. **Verifique os logs:**
   ```bash
   supabase functions logs mp-webhook
   supabase functions logs create-preference
   ```

2. **Teste com curl:**
   ```bash
   curl -X POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
   ```

3. **Revise a documentação:**
   - Mercado Pago: https://www.mercadopago.com.br/developers
   - Supabase: https://supabase.com/docs

---

✅ **Você tem TUDO pronto! Agora é só executar os passos acima.**
