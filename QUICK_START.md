# 🚀 Quick Start - Mercado Pago Checkout

## Seus Dados Já Configurados ✅

```
Projeto Supabase: zajyeykcepcrlngmdpvf
URL: https://zajyeykcepcrlngmdpvf.supabase.co
Função: supabase/functions/create-preference/index.ts
Componente: src/components/MercadoPagoCheckout.tsx
Página: src/pages/Checkout.tsx (URL já atualizada!)
```

## O Que Ainda Falta

Você precisa de **UMA ÚNICA COISA**:

### 1️⃣ Access Token do Mercado Pago

```
🔗 Link: https://www.mercadopago.com.br/developers/panel/
🔍 Procure por: Credenciais → Access Token de Produção
📋 Formato: APP_USR-xxxxxxxxxx...
```

## Deploy em 3 Comandos

```bash
# 1. Fazer login
supabase login

# 2. Vincular projeto
supabase link --project-ref zajyeykcepcrlngmdpvf

# 3. Adicionar secret no dashboard (https://app.supabase.com/project/zajyeykcepcrlngmdpvf)
#    Project Settings → Secrets → New secret
#    Name: MERCADO_PAGO_ACCESS_TOKEN
#    Value: [Cole seu Access Token aqui]

# 4. Deploy
supabase functions deploy create-preference
```

## Testar Agora

### Na sua aplicação:
```
http://localhost:8080/checkout
→ Clique em um plano
→ Se ver a tela de pagamento, está pronto! ✅
```

### No Supabase:
```
https://app.supabase.com/project/zajyeykcepcrlngmdpvf/functions
→ Clique em create-preference → Test function
→ Cole: { "planType": "anual" }
→ Deve retornar um preferenceId
```

## Dados de Teste

```
Cartão: 4111 1111 1111 1111
Data: 12/25
CVV: 123
```

## 📁 Arquivos Criados Para Você

```
✅ supabase/functions/create-preference/index.ts
   └─ Função que cria preferência no Mercado Pago

✅ src/components/MercadoPagoCheckout.tsx
   └─ Componente de checkout com validação

✅ src/pages/Checkout.tsx
   └─ Página pronta para usar
   └─ URL já configurada!

📖 SETUP_CHECKLIST.md
   └─ Guia passo a passo
   
📖 SUPABASE_DEPLOYMENT_GUIDE.md
   └─ Documentação completa

📖 MERCADO_PAGO_SETUP.md
   └─ Detalhes técnicos
```

## Tudo Pronto Para...

- [x] Componente visual bonito
- [x] Integração com Mercado Pago SDK
- [x] Validação de erros
- [x] Estados de loading
- [x] Responsivo (mobile/desktop)
- [x] Navegação funcional
- [x] Função Supabase pronta
- [x] URL configurada

**Agora é só fazer o deploy e testar!** 🎉

---

**Dúvidas?** Veja `SETUP_CHECKLIST.md` ou `SUPABASE_DEPLOYMENT_GUIDE.md`
