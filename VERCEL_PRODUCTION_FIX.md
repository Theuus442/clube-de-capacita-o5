# 🚀 Guia: Corrigir "Failed to Fetch" em Vercel

## 🎯 Situação Atual

- ✅ Funciona localmente (dev)
- ❌ Erro em Vercel: "Failed to fetch" ao clicar em um plano

## ✅ Checklist de Verificação (Execute AGORA)

### 1️⃣ Verificar se a função foi deployada

```bash
# No seu terminal local (com CLI do Supabase instalado)
supabase login
supabase link --project-ref zajyeykcepcrlngmdpvf
supabase functions list
```

**Você deve ver:**
```
create-checkout  (deployed)
```

**Se NÃO aparecer ou estiver como "(not deployed)":**
```bash
supabase functions deploy create-checkout
```

---

### 2️⃣ Verificar Mercado Pago Access Token

1. Acesse: https://www.mercadopago.com.br/developers/panel/
2. Clique em: **Credenciais** → **Access Token**
3. Copie o token de **PRODUÇÃO** (não teste!)

---

### 3️⃣ Configurar no Supabase Secrets

1. Acesse: https://supabase.com/dashboard
2. Projeto: `zajyeykcepcrlngmdpvf`
3. Project Settings → **Secrets**
4. Clique em: **New secret**

**Adicione:**
```
Name: MP_ACCESS_TOKEN
Value: (cole o token copiado no passo 2)
```

5. Clique em **Save** e espere deploy (1-2 minutos)

---

### 4️⃣ Testar a função via cURL

Abra o terminal e execute:

```bash
curl -X POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphanlleWtjZXBjcmxuZ21kcHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4ODMyNDUsImV4cCI6MjA4MjQ1OTI0NX0.NxT2Qv7u3ONRnVjzxwP55RRHQP00rKNw3SIG2GTW_SE" \
  -d '{"planType":"anual","redirectUrl":"https://seu-dominio-vercel.vercel.app"}'
```

**Resposta esperada (sucesso):**
```json
{"preferenceId":"1234567890"}
```

**Resposta de erro (token não configurado):**
```json
{"error":"Erro na configuração do servidor. Token do Mercado Pago (MP_ACCESS_TOKEN) não encontrado."}
```

---

### 5️⃣ Verificar logs da função

No Painel Supabase:
1. Functions → **create-checkout**
2. Aba: **Logs**
3. Verifique os logs das últimas tentativas
4. Procure por erros como:
   - `MP_ACCESS_TOKEN não configurado`
   - Erros de conexão com Mercado Pago
   - Erros de CORS

---

## 🔄 Fluxo do que acontece agora:

### Em Desenvolvimento (localhost:8080)
```
1. Clica "Continuar"
2. → POST /api/mercado-pago (proxy Vite)
3. → Vite reescreve para: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-checkout
4. → Supabase function processa
5. → Retorna preferenceId ✅
6. → Abre Wallet do Mercado Pago
```

### Em Vercel (seu-dominio.vercel.app)
```
1. Clica "Continuar"
2. → POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-checkout
3. → Vercel envia seu anon key no header Authorization
4. → Supabase function processa (precisa do MP_ACCESS_TOKEN configurado!)
5. → Retorna preferenceId ✅
6. → Abre Wallet do Mercado Pago
```

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch" persiste

**Causa 1: Função não deployada**
```bash
supabase functions deploy create-checkout
```

**Causa 2: MP_ACCESS_TOKEN não configurado**
- Vá para Supabase → Secrets
- Confirme que `MP_ACCESS_TOKEN` está ali com o token CORRETO

**Causa 3: Token inválido ou expirado**
- Gere um novo token no Mercado Pago
- Atualize em Supabase Secrets

**Causa 4: Timeout na função**
- Verifique os logs no Supabase
- Veja se o Mercado Pago API está respondendo

---

## ✅ Testes Finais

Após completar todos os passos:

1. **Localmente**: Teste em `http://localhost:8080/checkout`
   - Clique em um plano
   - Deve abrir o Wallet do Mercado Pago

2. **Em Vercel**: Teste em `https://seu-dominio.vercel.app/checkout`
   - Clique em um plano
   - Deve abrir o Wallet do Mercado Pago
   - **Não pode dar "Failed to fetch"**

---

## 📝 Checklist Final

- [ ] Executei `supabase functions deploy create-checkout`
- [ ] Configurei `MP_ACCESS_TOKEN` nos Supabase Secrets
- [ ] Testei via cURL e obtive `preferenceId` na resposta
- [ ] Verifiquei os logs da função no Supabase (sem erros)
- [ ] Testei localmente e funcionou
- [ ] Fiz um novo deploy no Vercel (`git push` ou redeploy)
- [ ] Testei em Vercel e funcionou

---

## 🆘 Se nada funcionar

Se após todos esses passos ainda der erro, compartilhe:

1. **Print do erro completo** (F12 → Console)
2. **Print dos logs da função** no Supabase (em "Logs")
3. **Resultado do teste cURL** (em caso de erro, qual foi?)
4. **Confirmação**: O `MP_ACCESS_TOKEN` está configurado em Secrets?

Estarei pronto para ajudar! 🚀
