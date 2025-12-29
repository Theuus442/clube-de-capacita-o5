# Guia de Integração: Mercado Pago Checkout

## 📋 Visão Geral

Este guia explica como integrar e usar o componente `MercadoPagoCheckout` no seu projeto Builder.io.

## 🚀 O que foi criado

1. **Componente `MercadoPagoCheckout`** (`src/components/MercadoPagoCheckout.tsx`)
   - Exibe dois planos: Mensal (R$ 49/mês) e Anual (R$ 397/ano)
   - Interface limpa com Tailwind CSS
   - Integração com Mercado Pago SDK
   - Estados de loading e tratamento de erros

2. **Página de Checkout** (`src/pages/Checkout.tsx`)
   - Página completa com FAQ
   - Pronta para uso

## 🔑 Configuração da Chave Pública

A chave pública do Mercado Pago já está configurada:
```
PUBLIC_KEY = 'TEST-f7e8a080-93c5-4ed9-a60a-01d8a90c014b'
```

Esta é uma chave de **teste**. Para produção, você precisará:
1. Gerar uma chave pública de produção no painel do Mercado Pago
2. Atualizar o valor em `src/components/MercadoPagoCheckout.tsx` linha 10

## 📡 Função Supabase Necessária

✅ **A função já foi criada para você!** Veja `supabase/functions/create-preference/index.ts`

### Próximos Passos

**✅ A função Supabase já está criada! Veja: `supabase/functions/create-preference/index.ts`**

Para fazer o deployment e ativar o checkout:

1. **Obtenha o Access Token do Mercado Pago**
   - Acesse: [Painel Mercado Pago](https://www.mercadopago.com.br/developers/panel/)
   - Vá em Credenciais → Access Token de Produção

2. **Configure no Supabase**
   - Project Settings → Secrets
   - Adicione: `MERCADO_PAGO_ACCESS_TOKEN` = seu token

3. **Deploy da Função**
   ```bash
   supabase login
   supabase link --project-ref zajyeykcepcrlngmdpvf
   supabase functions deploy create-preference
   ```

4. **URL Já Configurada!**
   - ✅ Já atualizei em `src/pages/Checkout.tsx`
   - URL: `https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference`

5. **Configure as URLs de Retorno no Mercado Pago**
   - Acesse o painel Mercado Pago → Configurações → URLs de Retorno
   - Configure as URLs de retorno conforme abaixo (subepita o domínio pela sua URL real):

   **Para Produção:**
   - ✅ URL de retorno (Sucesso): `https://seu-dominio.com.br/payment-return?status=approved`
   - ✅ URL de retorno (Pendência): `https://seu-dominio.com.br/payment-return?status=pending`
   - ✅ URL de retorno (Falha): `https://seu-dominio.com.br/payment-return?status=failure`

   **Para Testes (localhost):**
   - Use o ngrok ou similar para expor localhost: `https://seu-ngrok-url.ngrok.io/payment-return?status=approved`

**📖 Veja o guia completo em: `SUPABASE_DEPLOYMENT_GUIDE.md`**

## 📱 Usando o Componente

### Uso básico com a página

Acesse `/checkout` para ver o componente em ação.

### Uso em outro lugar

```tsx
import MercadoPagoCheckout from '@/components/MercadoPagoCheckout';

export default function MyPage() {
  return (
    <MercadoPagoCheckout 
      supabaseFunctionUrl="https://sua-url-supabase.supabase.co/functions/v1/create-preference"
    />
  );
}
```

## 🔄 Fluxo do Componente

1. **Usuário clica em um plano**
2. Component envia POST para Supabase com `{ planType: "mensal" | "anual" }`
3. Supabase cria uma preferência no Mercado Pago
4. Retorna `{ preferenceId: "..." }`
5. Component renderiza o `<Wallet />` do Mercado Pago
6. Usuário completa o pagamento

## 🎨 Personalizando os Planos

Edite `src/components/MercadoPagoCheckout.tsx`:

```typescript
const plans: Plan[] = [
  {
    id: 'mensal',
    name: 'Plano Mensal',
    price: '49',  // Altere aqui
    period: '/mês',
    description: 'Acesso completo por 1 mês',
    features: [
      // Altere as features aqui
      'Todos os cursos disponíveis',
      // ...
    ],
    icon: <Zap className="w-6 h-6" />,
  },
  // ... mais planos
];
```

## 🧪 Testando

1. **Modo Teste**: Use a chave de teste fornecida
2. **Cartões de Teste**: Mercado Pago fornece cartões para testes
   - Cartão Válido: `4111 1111 1111 1111`
   - Data: `12/25`
   - CVV: `123`

## 🛡️ Segurança

- A chave pública é segura (visível no frontend)
- O token de acesso está protegido no Supabase (backend)
- Valide sempre o pagamento no seu backend
- Implemente webhooks para sincronizar dados

## 📚 Recursos

- [Documentação Mercado Pago SDK React](https://www.mercadopago.com.br/developers/pt/docs)
- [Documentação Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [API Preferences Mercado Pago](https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences/post)

## ❓ Troubleshooting

### Erro: "Preferência ID não recebida"
- Verifique se a função Supabase está respondendo corretamente
- Confira se o `MERCADO_PAGO_ACCESS_TOKEN` está configurado

### Erro: "Falha ao criar preferência de pagamento"
- Verifique a URL da função em `src/pages/Checkout.tsx`
- Confira se o CORS está permitindo requisições

### Wallet não aparece
- Certifique-se de que a chave pública está correta
- Verifique se o `preferenceId` foi recebido do Supabase
- Abra o console do navegador para ver erros de JavaScript

---

Pronto! Seu componente de Checkout com Mercado Pago está configurado e pronto para usar! 🎉
