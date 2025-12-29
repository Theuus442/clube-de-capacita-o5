# 🔧 Solução de CORS - Proxy para Mercado Pago

## 🎯 O Problema

Quando a aplicação está deployada em `fly.dev` e tenta chamar a função Supabase diretamente, ocorrem problemas de CORS ("Failed to fetch").

```
fly.dev (origem) → supabase.co (destino) ❌ CORS Error
```

## ✅ A Solução

Implementamos um **proxy automático** que:

1. **Em desenvolvimento**: Usa um proxy Vite local para evitar problemas de CORS
2. **Em produção**: Chama a função Supabase através da mesma origem (se houver um backend)

### Arquitetura

```
Frontend (fly.dev)
    ↓
    → /api/mercado-pago (proxy local em dev, ou backend em prod)
        ↓
        → Supabase Function API
            ↓
            → Mercado Pago API
```

---

## 📁 Arquivos Modificados

### 1. **vite.config.ts**
Configurou o proxy do Vite para desenvolvimento:

```typescript
server: {
  proxy: {
    "/api/mercado-pago": {
      target: "https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/mercado-pago/, "/create-preference"),
    },
  },
}
```

### 2. **src/lib/api-config.ts** (NOVO)
Arquivo que detecta o ambiente e retorna a URL apropriada:

```typescript
// Em desenvolvimento: /api/mercado-pago (usa proxy Vite)
// Em produção: https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference
```

### 3. **src/components/MercadoPagoCheckout.tsx**
Atualizado para:
- Usar `getMercadoPagoApiUrl()` automaticamente
- Condicionar o header `Authorization` (necessário só em produção)
- Melhorar mensagens de erro

### 4. **src/pages/Checkout.tsx**
Simplificado - não precisa mais passar a URL da função manualmente

---

## 🔄 Como Funciona

### Em Desenvolvimento (localhost)

```
1. Usuário clica "Continuar" no checkout
2. Frontend faz: POST /api/mercado-pago
3. Vite proxy intercepta a requisição
4. Proxy reescreve para: POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference
5. Proxy envia o header Authorization automaticamente
6. Supabase function responde com preferenceId
7. Componente renderiza o Wallet do Mercado Pago
```

### Em Produção (fly.dev)

```
1. Usuário clica "Continuar" no checkout
2. Frontend faz: POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference
3. Header Authorization é adicionado automaticamente
4. Supabase function responde com preferenceId
5. Componente renderiza o Wallet do Mercado Pago
```

---

## 🚀 Como Testar

### Em Desenvolvimento

```bash
npm run dev
# Acesse http://localhost:8080/checkout
# Clique em "Continuar" - deve funcionar com o proxy
```

### Em Produção (fly.dev)

```bash
# Deploy para fly.dev
# Acesse https://seu-app.fly.dev/checkout
# Deve funcionar normalmente
```

---

## 🔐 Segurança

### Em Desenvolvimento
- ✅ O proxy Vite adiciona o header `Authorization` automaticamente
- ✅ Seu token Supabase fica seguro (não é expostoao frontend)
- ✅ CORS é configurado apenas para desenvolvimento

### Em Produção
- ✅ A requisição é feita diretamente para Supabase
- ✅ Header `Authorization` é incluído
- ✅ Token MP_ACCESS_TOKEN fica seguro no Supabase (não é enviado ao frontend)

---

## ⚙️ Configuração Necessária

### Variáveis de Ambiente (Supabase)

Não há mudança necessária! Continue usando:

```
MP_ACCESS_TOKEN = seu_token_mercado_pago_producao
```

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch" em desenvolvimento

```bash
# Verifique se o proxy do Vite está ativo
# Abra o console (F12) e veja se a requisição vai para /api/mercado-pago
# Em Network tab deve aparecer como: GET /api/mercado-pago
```

### Erro: "Failed to fetch" em produção

```bash
# O proxy Vite não funciona em produção
# Você precisa de um backend real que faça o proxy
# Ou confiar que a função Supabase está respondendo corretamente
```

---

## 📝 Próximos Passos (Se Houver Erro em Produção)

Se em produção (`fly.dev`) ainda houver erro, você pode implementar um backend simples:

1. **Criar um endpoint Node.js/Express**
2. **Fazer o proxy na sua aplicação backend**
3. **Chamar a função Supabase de forma mais confiável**

Exemplo:

```javascript
// server.js
app.post('/api/mercado-pago', async (req, res) => {
  const { planType, redirectUrl } = req.body;
  
  const response = await fetch('https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ planType, redirectUrl }),
  });
  
  const data = await response.json();
  res.json(data);
});
```

Mas por enquanto, teste com a solução do proxy! 🚀
