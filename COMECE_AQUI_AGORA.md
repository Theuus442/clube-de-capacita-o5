# 🚀 COMECE AQUI AGORA

## ⚡ 3 Passos - 10 minutos

### PASSO 1️⃣: Configurar Secrets (3 min)

URL: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets

Clique em "New secret" e adicione:

```
Name: MP_ACCESS_TOKEN
Value: Seu token MP (obtenha em https://www.mercadopago.com.br/developers/panel/credentials)
```

```
Name: ESCOLA_TOKEN  
Value: Seu token de autenticação da plataforma (com seu time técnico)
```

---

### PASSO 2️⃣: Deploy (2 min)

Terminal na raiz:

```bash
supabase login
supabase functions deploy
```

Espere até ver:
```
✅ Function mp-webhook deployed
✅ Function create-preference deployed
```

---

### PASSO 3️⃣: Testar (5 min)

Navegador:
```
http://localhost:5173/checkout
```

1. Clique em "Continuar" (qualquer plano)
2. Cartão: `4111 1111 1111 1111` / `12/25` / `123`
3. Complete pagamento

Ver logs:
```bash
supabase functions logs mp-webhook
```

Procure por:
```
✅ "Resposta da Escola: ..."
```

---

## ✅ Pronto!

Se viu a mensagem acima, **TUDO FUNCIONANDO!** 🎉

---

## 📚 Documentação

- **Detalhes completos:** `SETUP_MERCADO_PAGO_FINAL.md`
- **O que mudou:** `MUDANCAS_REALIZADAS.md`
- **Overview:** `README_MERCADO_PAGO.md`

---

## 🐛 Se Algo Deu Errado

```bash
# Ver logs detalhados
supabase functions logs mp-webhook --limit 100

# Fazer deploy novamente
supabase functions deploy --force-all
```

---

**Só isso! Bora lá! 💪**
