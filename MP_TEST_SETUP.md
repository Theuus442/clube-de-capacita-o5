# 🧪 Setup de Teste: Mercado Pago

## ✅ O que você precisa fazer AGORA (antes de testar)

### Passo 1: Obter Token de TESTE do Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel/credentials
2. **IMPORTANTE**: Certifique-se que o switch está em **"MODO TESTE"** (não produção!)
3. Copie o **Access Token** da seção de teste
   - Ele começa com `TEST-` (exemplo: `TEST-1234567890abcdef...`)

### Passo 2: Configurar no Supabase (você faz via UI)

1. Acesse: https://supabase.com/dashboard/project/zajyeykcepcrlngmdpvf/settings/secrets
2. Clique em **"New secret"**
3. Preencha:
   - **Name**: `MP_ACCESS_TOKEN`
   - **Value**: Cole o token de teste que copou no Passo 1
4. Clique em **"Save"**
5. **Aguarde 1-2 minutos** para o secret ser deployado

---

## 🚀 Testando AGORA (localhost)

Após configurar o secret:

1. Abra: http://seu-localhost:5173/checkout
2. Clique em um plano (ex: "Plano Anual")
3. Deve abrir o checkout do Mercado Pago (Wallet)

### Se der erro:

- Verifique se o secret `MP_ACCESS_TOKEN` foi criado
- Aguarde 1-2 minutos após criar o secret
- Abra o DevTools (F12) → Console para ver logs detalhados

---

## 📝 Próximos Passos (para Vercel/Produção)

Quando você abrir o PR:

1. **Você**: Abre PR e aprova
2. **Automático**: Deploy vai para Vercel
3. **Vercel**: Usa a mesma função Supabase (que já tem `MP_ACCESS_TOKEN` configurado)
4. **Resultado**: Funciona em Vercel também!

**Observação**: O token de TESTE funciona em Vercel da mesma forma que funciona localmente.

---

## 🔄 Quando você tiver o token REAL (Produção)

No futuro, quando quiser usar em produção real:

1. Acesse Mercado Pago: https://www.mercadopago.com.br/developers/panel/credentials
2. Mude para **"MODO PRODUÇÃO"** (switch no topo)
3. Copie o **Access Token** de produção
4. Em Supabase, **atualize** o secret `MP_ACCESS_TOKEN` com o novo token
5. Pronto! Agora aceita pagamentos reais

---

## 🧪 Testando Pagamentos

Com o token de TESTE, você pode usar esses cartões:

| Situação | Cartão | Data | CVV |
|----------|--------|------|-----|
| ✅ Aprovado | 4111 1111 1111 1111 | 12/25 | 123 |
| ⏱️ Pendente | 5555 5555 5555 4444 | 12/25 | 123 |
| ❌ Rejeitado | 4000 0000 0000 0002 | 12/25 | 123 |

**Email**: Pode ser qualquer email (ex: teste@teste.com)
**CPF**: Pode ser qualquer CPF válido (ex: 12345678999)

---

## 📋 Checklist

- [ ] Obtive o token de TESTE do Mercado Pago
- [ ] Configurei `MP_ACCESS_TOKEN` em Supabase Secrets
- [ ] Aguardei 1-2 minutos para o deploy
- [ ] Testei localmente em `/checkout` → funciona
- [ ] Vou abrir PR quando estiver pronto
- [ ] PR vai para Vercel automaticamente
- [ ] Testei em Vercel → funciona

---

## ❓ Troubleshooting

### Erro: "MP_ACCESS_TOKEN não configurado"
- Verifique se criou o secret em Supabase
- Aguarde 1-2 minutos após criar
- Recarregue a página

### Erro: "Token inválido"
- Certifique-se que copiou o token correto (não cortou nada)
- Verifique se está em MODO TESTE do Mercado Pago

### Funciona em desenvolvimento mas não em Vercel
- Verifique se o secret está criado no Supabase
- O Vercel usa a mesma função Supabase
- Não há configuração extra necessária em Vercel

---

Pronto! Você está pronto para testar! 🎉
