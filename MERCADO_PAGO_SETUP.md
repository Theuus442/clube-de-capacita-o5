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

Você precisa criar uma função Supabase Edge que crie uma preferência de pagamento no Mercado Pago. Aqui está um exemplo completo:

### Passo 1: Crie a função no Supabase

```bash
supabase functions new create-preference
```

### Passo 2: Implemente a função

Arquivo: `supabase/functions/create-preference/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MERCADO_PAGO_API_URL = "https://api.mercadopago.com/checkout/preferences";
const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");

interface RequestBody {
  planType: "mensal" | "anual";
}

const planConfig = {
  mensal: {
    title: "Plano Mensal",
    price: 49,
    currency_id: "BRL",
  },
  anual: {
    title: "Plano Anual",
    price: 397,
    currency_id: "BRL",
  },
};

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    // Parse request body
    const { planType }: RequestBody = await req.json();

    // Validate plan type
    if (!planType || !["mensal", "anual"].includes(planType)) {
      return new Response(
        JSON.stringify({ error: "Invalid plan type" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const plan = planConfig[planType];

    // Create preference payload
    const preferencePayload = {
      items: [
        {
          title: plan.title,
          description: plan.title,
          quantity: 1,
          unit_price: plan.price,
          currency_id: plan.currency_id,
        },
      ],
      auto_return: "approved",
      back_urls: {
        success: `${new URL(req.url).origin}/checkout-success`,
        failure: `${new URL(req.url).origin}/checkout-failure`,
        pending: `${new URL(req.url).origin}/checkout-pending`,
      },
      notification_url: `${new URL(req.url).origin}/api/webhooks/mercado-pago`,
    };

    // Create preference in Mercado Pago
    const response = await fetch(MERCADO_PAGO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preferencePayload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Mercado Pago API error:", error);
      throw new Error(`Mercado Pago API error: ${response.statusText}`);
    }

    const preference = await response.json();

    return new Response(JSON.stringify({ preferenceId: preference.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
```

### Passo 3: Configure o token de acesso

1. Vá para o [painel do Mercado Pago](https://www.mercadopago.com.br/developers/panel/)
2. Copie seu **Access Token** de produção
3. No Supabase, defina a variável de ambiente:
   - Vá para **Project Settings** → **API**
   - Adicione a variável de ambiente: `MERCADO_PAGO_ACCESS_TOKEN`

### Passo 4: Deploy da função

```bash
supabase functions deploy create-preference --no-verify-jwt
```

### Passo 5: Configure a URL da função

Atualize o arquivo `src/pages/Checkout.tsx`:

```typescript
const SUPABASE_FUNCTION_URL = 'https://your-project-id.supabase.co/functions/v1/create-preference';
```

Substitua `your-project-id` pelo ID do seu projeto Supabase.

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
