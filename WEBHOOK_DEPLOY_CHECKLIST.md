# ⚡ Quick Deploy Checklist

## 📋 Antes de Deployar

- [ ] Terminal aberto na pasta raiz do projeto
- [ ] Estar logado no Supabase CLI: `supabase login`
- [ ] Conexão com internet ativa

## 🚀 Deploy (execute apenas 1 comando)

```bash
supabase functions deploy
```

Ou se preferir deploy individual:
```bash
supabase functions deploy mp-webhook
supabase functions deploy create-preference
supabase functions deploy create-checkout
```

## ✅ Verificar Deploy

```bash
# Ver funções deployadas
supabase functions list

# Ver logs em tempo real
supabase functions logs mp-webhook --follow
```

## 🧪 Testar

1. Acesse: **https://seu-app-url/checkout**
2. Selecione um plano
3. Complete o pagamento (use cartão de teste do Mercado Pago)
4. Você deve ver:
   - ✅ Página de sucesso/pending/falha
   - ✅ Logs aparecem em `supabase functions logs`

## 🔍 Validar URL do Webhook

O webhook agora está em:
```
https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
```

Teste com:
```bash
curl -X POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/mp-webhook
```

Você deve receber resposta: `{"success":true,"message":"Notificação recebida"}`

## ❌ Se Algo der Errado

1. **Verifique logs:**
   ```bash
   supabase functions logs mp-webhook --limit 100
   ```

2. **Confirme que a função está deployed:**
   ```bash
   supabase functions list
   ```

3. **Tente fazer deploy novamente:**
   ```bash
   supabase functions deploy --force-all
   ```

---

✅ **Pronto!** Seu webhook está configurado e público.
