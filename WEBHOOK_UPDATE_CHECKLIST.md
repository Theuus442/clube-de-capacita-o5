# ✅ Checklist - Sincronização Webhook + Preferência

## 📋 O que Mudou

### 1. **`create-preference/index.ts`** - ATUALIZADO
Agora envia metadata com nomes descritivos:
```javascript
metadata: {
  nome_aluno: nome,
  email_aluno: email,
  sexo_aluno: sexo,
  plano_escolhido: type
}
```

### 2. **`mp-webhook/index.ts`** - ATUALIZADO
Agora:
- ✅ Lê o novo metadata com nomes descritivos
- ✅ Cria aluno com `POST ?usuarios/novo`
- ✅ Envia email com `POST ?usuarios/envioemail`
- ✅ Aceita tanto `approved` quanto `pending`
- ✅ Usa `ESCOLA_TOKEN` do Deno.env (seguro)
- ✅ Logging detalhado em CADA passo

---

## 🚀 Passos para Deploy

### Passo 1: Configurar Secrets no Supabase

Acesse: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets

Verifique/Crie:
- ✅ `MP_ACCESS_TOKEN` - seu token Mercado Pago
- ✅ `ESCOLA_TOKEN` - seu token de acesso à API
- ✅ `SUPABASE_PROJECT_ID` - deve ser: `zajyeykcepcrlngmdpvf`

Se houver mudanças, aguarde 1-2 minutos para sincronizar.

### Passo 2: Deploy das Funções

```bash
# Login (se não fez ainda)
npx supabase login

# Deploy da nova preferência
npx supabase functions deploy create-preference

# Deploy do novo webhook
npx supabase functions deploy mp-webhook

# (Opcional) Verificar deploy
npx supabase functions list
```

### Passo 3: Testar

1. Acesse: https://seu-dominio.com/checkout
2. Selecione um plano
3. Preencha:
   - Nome: `João Silva`
   - Email: `joao@test.com`
   - Gênero: `Masculino`
4. Clique em "Continuar para Pagamento"
5. Use cartão: `4111 1111 1111 1111`
   - Vencimento: `12/25` (ou qualquer data futura)
   - CVV: `123` (qualquer número)
6. Complete o pagamento

### Passo 4: Verificar Logs

```bash
# Ver logs da preferência
npx supabase functions logs create-preference

# Ver logs do webhook
npx supabase functions logs mp-webhook
```

**Procure por mensagens como:**
```
✅ [WEBHOOK] Pagamento approved! Iniciando cadastro...
✅ [WEBHOOK] Aluno criado com ID: 12345
✅ [WEBHOOK] E-mail disparado com sucesso
✨ [WEBHOOK] Processo de cadastro finalizado
```

---

## 📊 Fluxo Completo Agora

```
1. Frontend: Preenche formulário
   ├─ Nome: João Silva
   ├─ Email: joao@test.com
   └─ Sexo: Masculino

2. Frontend: Chama create-preference
   ├─ Envia: { planType, nome, email, sexo }
   └─ Recebe: { preferenceId }

3. Frontend: Redireciona para MP Checkout
   └─ URL: https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=xxxxx

4. Usuário: Completa pagamento

5. MP Webhook: Recebe notificação
   ├─ Valida pagamento (status=approved ou pending)
   ├─ Extrai dados do metadata:
   │  ├─ nome_aluno: João Silva
   │  ├─ email_aluno: joao@test.com
   │  └─ sexo_aluno: Masculino
   ├─ POST /usuarios/novo → Cria aluno
   ├─ Recebe: { resultado: { login: 12345 } }
   └─ POST /usuarios/envioemail → Dispara email

6. Usuário: Recebe email com credenciais
```

---

## 🔍 Problemas Comuns

### ❌ "Erro ao criar preferência"
- [ ] `MP_ACCESS_TOKEN` está configurado?
- [ ] Token é válido?
- [ ] Deploy foi feito? (`npx supabase functions deploy create-preference`)

### ❌ "Pagamento criado mas aluno não aparece"
- [ ] `ESCOLA_TOKEN` está configurado?
- [ ] Base URL está correta? (`https://estudanteead.com/oficial/api/v2/`)
- [ ] Ver logs do webhook: `npx supabase functions logs mp-webhook`

### ❌ "Email não foi enviado"
- [ ] Aluno foi criado? (verifique `✅ Aluno criado com ID`)
- [ ] Endpoint `/usuarios/envioemail` existe na sua API?
- [ ] Ver resposta da API nos logs

### ❌ "Pagamento em 'pending' mas não processa"
- O webhook agora aceita `pending`!
- Se ainda não funcionar, verifique logs

---

## ✨ Resumo das Mudanças

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Metadata | `email`, `nome`, `sexo` | `email_aluno`, `nome_aluno`, `sexo_aluno`, `plano_escolhido` |
| Status aceito | Só `approved` | `approved` ou `pending` |
| Email | Não enviado | Enviado automaticamente após cadastro |
| Token | Hardcoded | Via `Deno.env` (seguro) ✅ |
| Logging | Básico | Detalhado em CADA passo |
| Tratamento de erros | Simples | Robusto com fallback |

---

## 📞 Se Algo Der Errado

1. Execute: `npx supabase functions logs mp-webhook`
2. Procure por `❌` (erros)
3. Copie a mensagem de erro
4. Verifique:
   - URL da escola está correta?
   - Token é válido?
   - Cartão de teste correto?
   - Supabase secrets configurados?

**Para debug completo:**
```bash
npx supabase functions logs mp-webhook --tail

# Ver logs em tempo real
npx supabase functions logs create-preference --tail
```
