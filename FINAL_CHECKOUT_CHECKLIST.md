# ✅ Checklist Final do Fluxo de Checkout

## Responsabilidades de Cada Parte

### 🖥️ Front-end (src/components/PreCheckoutRegistration.tsx)

- ✅ Formulário coleta: Nome, Email, Gênero
- ✅ Validação local dos campos
- ✅ Envia dados para Supabase (create-preference)
- ✅ Redireciona para Mercado Pago
- ❌ NÃO chama API da escola (removido!)
- ❌ NÃO cria usuário com status "bloqueado"

### ☁️ Supabase (create-preference)

- ✅ Recebe dados do front-end
- ✅ Cria preferência no Mercado Pago
- ✅ Armazena dados em metadata
- ✅ Retorna preferenceId ao front-end
- ❌ NÃO cria usuário na escola

### 🔔 Webhook (mp-webhook)

- ✅ Recebe notificação do Mercado Pago
- ✅ Valida pagamento (status = approved)
- ✅ Extrai dados de email, nome, sexo
- ✅ **Cria usuário na API da escola com status "ativo"**
- ✅ Envia senha por e-mail
- ✅ Logs detalhados

## Fluxo Resumido

```
1. Front-end coleta dados
           ↓
2. Front-end envia para Supabase
           ↓
3. Supabase cria preferência Mercado Pago
           ↓
4. Front-end redireciona para checkout
           ↓
5. Usuário faz pagamento
           ↓
6. Mercado Pago aprova pagamento
           ↓
7. Webhook recebe notificação
           ↓
8. ⭐ Webhook CRIA USUÁRIO NA ESCOLA com status "ativo"
           ↓
9. ✅ Usuário recebe e-mail com login/senha
```

## Código Front-end (Simplificado)

### handleSubmit em PreCheckoutRegistration.tsx

```typescript
async handleSubmit(e) {
  e.preventDefault();
  
  // 1. Validar
  if (!nome || !email || !sexo) return;
  
  // 2. Criar preferência
  const response = await fetch(
    'https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planType: this.planType,
        email: email,
        nome: nome,
        sexo: sexo,
        redirectUrl: window.location.origin
      })
    }
  );
  
  // 3. Redirecionar
  const data = await response.json();
  window.location.href = 
    `https://mercadopago.com.br/checkout/v1/redirect?preference-id=${data.preferenceId}`;
}
```

## Dados em Cada Etapa

### Etapa 1 → 2 (Front-end → Supabase)

```json
{
  "planType": "anual",
  "email": "joao@email.com",
  "nome": "João Silva",
  "sexo": "masculino",
  "redirectUrl": "https://seu-site.com"
}
```

### Etapa 3 (Supabase → Mercado Pago)

```json
{
  "items": [...],
  "metadata": {
    "email": "joao@email.com",
    "nome": "João Silva",
    "sexo": "masculino"
  },
  "notification_url": "https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook"
}
```

### Etapa 4 → 5 (Webhook → API Escola)

```
FormData:
- token: ESCOLA_TOKEN
- nome: João Silva
- email: joao@email.com
- sexo: masculino
- planType: PLANO_ANUAL
- status: ativo
- datafinal: 2025-12-29
- senha: abc12345
```

## Testes

### ✅ Test 1: Fluxo Completo
```
1. Acesse /checkout
2. Selecione "Plano Anual"
3. Preencha: João Silva, joao@email.com, Masculino
4. Clique "Continuar para Pagamento 🔒"
5. Verifique logs no console (F12)
6. Você deve ser redirecionado para Mercado Pago
7. ❌ NÃO deve haver erro 403
8. ❌ NÃO deve chamar API da escola do front-end
```

### ✅ Test 2: Verificar Logs Front-end

**Console (F12):**
```
🛒 CHECKOUT FLOW INICIADO
📦 Plano selecionado: anual
👤 Dados do usuário: {nome, email, sexo, planType}
💡 API da escola será chamada pelo webhook após pagamento aprovado

💳 Criando preferência de pagamento...
📊 Enviando dados: {...}

✅ CHECKOUT PREPARADO COM SUCESSO
🎯 Preference ID: 123456789
🔄 Redirecionando para Mercado Pago...
```

### ✅ Test 3: Verificar Logs Supabase

**Dashboard → Functions → create-preference → Logs:**
```
🎯 Criando preferência para plano: anual
👤 Aluno: João Silva (joao@email.com)
⚖️ Gênero: masculino
💰 Valor: R$ 397
📩 Dados recebidos: {...}
```

### ✅ Test 4: Verificar Webhook

**Dashboard → Functions → mp-webhook → Logs:**
```
Webhook recebido: {...}
✅ Pagamento aprovado! ID: 123456789
📋 Dados do pagamento:
  - Email: joao@email.com
  - Nome: João Silva
  - Gênero: masculino
  - Plano: PLANO_ANUAL
🚀 Enviando para: https://estudandoead.com/...
✅ Resposta da Escola: {...}
✨ Usuário joao@email.com criado com sucesso!
```

## Erros Esperados e Soluções

### ❌ Erro 403 no Front-end
- **Não deve mais ocorrer!** Removemos chamada para API da escola
- Se ocorrer, é da chamada para Supabase
- Solução: Verificar `VITE_SUPABASE_ANON_KEY` em `.env`

### ❌ Erro "Preferência ID não recebida"
- **Solução**: Verificar logs do `create-preference` no Supabase
- Verificar se `MP_ACCESS_TOKEN` está configurado
- Verificar resposta do Mercado Pago API

### ❌ Webhook não recebe pagamento
- **Solução**: Verificar logs do `mp-webhook` no Supabase
- Verificar URL do webhook em `create-preference`
- Verificar notificações em Mercado Pago Dashboard

### ❌ Usuário não criado na escola
- **Solução**: Verificar logs do webhook
- Verificar `ESCOLA_TOKEN` em Supabase Secrets
- Verificar se API da escola está acessível

## Arquivos Modificados

### 1. `src/components/PreCheckoutRegistration.tsx`
- ❌ Removida: Chamada para API da escola
- ✅ Mantida: Validação e formulário
- ✅ Mantida: Chamada para Supabase
- ✅ Mantida: Redirecionamento Mercado Pago

### 2. `supabase/functions/create-preference/index.ts`
- ✅ Adicionados: Logs comentados sobre responsabilidade
- ✅ Mantidos: Metadados com dados do usuário

### 3. `supabase/functions/mp-webhook/index.ts`
- ✅ Mantida: Criação de usuário
- ✅ Melhorados: Logs e comentários

## Resumo Final

| Etapa | Responsável | Ação |
|-------|-------------|------|
| 1 | Front-end | Coleta dados |
| 2 | Supabase | Cria preferência |
| 3 | Front-end | Redireciona MP |
| 4 | Mercado Pago | Processa pagamento |
| 5 | **Webhook** | **Cria usuário na escola** ⭐ |
| 6 | Webhook | Envia e-mail |

**Status: ✅ IMPLEMENTADO E SIMPLIFICADO**

Front-end apenas coleta e redireciona. Webhook cria usuário!
