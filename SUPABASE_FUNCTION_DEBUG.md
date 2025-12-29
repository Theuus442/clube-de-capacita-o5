# 🔧 Guia de Debug: Erro "Failed to Fetch" na Função Supabase

Se você está recebendo o erro **"TypeError: Failed to fetch"**, siga este checklist:

## ✅ Passo 1: Verificar se a Função Foi Deployada

### Via Terminal:
```bash
# Verificar se a função existe no Supabase
supabase functions list

# Você deve ver algo como:
# create-checkout  (deployed)
```

### Via Painel Supabase:
1. Acesse: https://supabase.com/dashboard
2. Projeto: `zajyeykcepcrlngmdpvf`
3. Functions → Veja se `create-checkout` aparece lá
4. Se não aparecer ou precisar atualizar, faça o deploy:

```bash
supabase login
supabase link --project-ref zajyeykcepcrlngmdpvf
supabase functions deploy create-checkout
```

---

## ✅ Passo 2: Verificar o Token do Mercado Pago

### Via Painel Supabase:
1. Project Settings → Secrets
2. Procure por `MP_ACCESS_TOKEN`
3. Se não existir, **CRIE AGORA**:
   - Name: `MP_ACCESS_TOKEN`
   - Value: seu token de **PRODUÇÃO** do Mercado Pago
   
### Obter o Token:
1. Acesse: https://www.mercadopago.com.br/developers/panel/
2. Credenciais → Access Token de **Produção**
3. Copie e cole no Supabase

**⚠️ Importante:** Use o token de **PRODUÇÃO**, não de teste!

---

## ✅ Passo 3: Testar a Função Manualmente

### Via cURL:
```bash
curl -X POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_ANON_KEY" \
  -d '{"planType":"anual","redirectUrl":"http://localhost:3000"}'
```

**Onde obter `SEU_ANON_KEY`:**
- Painel Supabase → Project Settings → API Keys → Anon Key

### Resposta Esperada (Sucesso):
```json
{"preferenceId":"123456789"}
```

### Resposta de Erro (Verifica se o Token está Configurado):
```json
{"error":"Erro na configuração do servidor. Token do Mercado Pago não encontrado."}
```

---

## ✅ Passo 4: Verificar CORS

A função já tem CORS configurado para aceitar requisições de qualquer origem:

```typescript
'Access-Control-Allow-Origin': '*'
```

Mas se ainda assim receber erro, verifique o console do navegador (F12):
- Network tab → create-preference
- Veja se há erro de CORS (Cross-Origin)

---

## ✅ Passo 5: Verificar Logs da Função

### Via Painel Supabase:
1. Functions → create-preference
2. Clique em "Logs"
3. Veja os logs da última execução
4. Procure por erros como:
   - `MERCADO_PAGO_ACCESS_TOKEN não configurado`
   - `Tipo de plano inválido`
   - Erros da API do Mercado Pago

---

## ✅ Passo 6: Verificar URL da Função

Em `src/pages/Checkout.tsx`, verifique se a URL está **EXATAMENTE**:

```typescript
const SUPABASE_FUNCTION_URL = 'https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference';
```

⚠️ **Verifique:**
- Não tem typos?
- Não tem barra extra no final?
- Está em HTTPS (não HTTP)?
- O nome da função é `create-preference` (não `create-checkout`)?

---

## 🐛 Erros Comuns e Soluções

### Erro: "Failed to fetch"
**Causa:** Função não deployada ou token não configurado
**Solução:** Siga os passos 1 e 2 acima

### Erro: "URL de redirecionamento inválida"
**Causa:** O `redirectUrl` não começa com `http`
**Solução:** Verifique se `window.location.origin` está funcionando

### Erro: "Tipo de plano inválido"
**Causa:** O plano enviado não é `anual` ou `semestral`
**Solução:** Verifique em `src/components/MercadoPagoCheckout.tsx` se os planos estão corretos

### Erro: "Erro ao criar preferência: 401"
**Causa:** Token do Mercado Pago inválido ou expirado
**Solução:** Regenere um novo token de PRODUÇÃO e atualize no Supabase

---

## 📝 Checklist Final

- [ ] Função `create-preference` está deployada
- [ ] `MERCADO_PAGO_ACCESS_TOKEN` está configurado no Supabase
- [ ] Token é de **PRODUÇÃO** (não teste)
- [ ] URL em `Checkout.tsx` está correta: `create-preference`
- [ ] Testei o fetch via cURL e funcionou
- [ ] Verificei os logs da função no painel Supabase

Se ainda assim não funcionar, compartilhe:
1. O erro completo do console (F12)
2. A resposta do teste cURL
3. Os logs da função Supabase

Estaremos prontos para ajudar! 🚀
