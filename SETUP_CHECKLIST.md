# ✅ Checklist de Configuração - Mercado Pago + Supabase

## 📋 Status Atual

- ✅ **Componente de Checkout Criado**: `src/components/MercadoPagoCheckout.tsx`
- ✅ **Página de Checkout Criada**: `src/pages/Checkout.tsx`
- ✅ **Função Supabase Criada**: `supabase/functions/create-preference/index.ts`
- ✅ **URL do Supabase Configurada**: Seu projeto `zajyeykcepcrlngmdpvf`
- ✅ **Navegação Funcionando**: Botões levam para `/checkout`

## 🎯 Próximas Etapas (Para Você)

### [ ] 1. Preparar Access Token

- [ ] Acesse [Painel Mercado Pago](https://www.mercadopago.com.br/developers/panel/)
- [ ] Vá para **Credenciais**
- [ ] Copie seu **Access Token de Produção** (começa com `APP_USR-`)
- [ ] Guarde em local seguro

### [ ] 2. Instalar Supabase CLI

```bash
# MacOS
brew install supabase/tap/supabase

# Linux/Windows
npm install -g supabase
```

### [ ] 3. Fazer Login

```bash
supabase login
```

Uma janela do navegador se abrirá para autenticar.

### [ ] 4. Vincular Projeto

```bash
supabase link --project-ref zajyeykcepcrlngmdpvf
```

### [ ] 5. Adicionar Secret no Supabase

1. Acesse: https://app.supabase.com/project/zajyeykcepcrlngmdpvf
2. Vá para **Project Settings** (engrenagem)
3. Clique em **Secrets**
4. Clique em **New secret**
5. Preencha:
   - **Name**: `MERCADO_PAGO_ACCESS_TOKEN`
   - **Value**: Cola o token que você copiou
6. Clique em **Add secret**

### [ ] 6. Fazer Deploy da Função

```bash
# Na raiz do seu projeto
supabase functions deploy create-preference
```

Você deve ver:
```
✓ Function deployed successfully!
✓ https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference
```

### [ ] 7. Testar

**Opção A: Na sua aplicação**
1. Abra: http://localhost:8080/checkout
2. Clique em um plano
3. Se aparecer a tela de pagamento, funcionou! ✅

**Opção B: No Supabase Dashboard**
1. Vá para **Functions** → `create-preference`
2. Clique em **Test function**
3. Cole no body:
```json
{
  "planType": "anual"
}
```
4. Clique em **Send**
5. Deve retornar um `preferenceId`

## 🧪 Testando o Pagamento

Use os dados de teste do Mercado Pago:

- **Cartão**: `4111 1111 1111 1111`
- **Data**: `12/25`
- **CVV**: `123`

## 📚 Documentação

- **Guia Completo**: `SUPABASE_DEPLOYMENT_GUIDE.md`
- **Detalhes Técnicos**: `MERCADO_PAGO_SETUP.md`

## ❓ Não funcionou?

Verifique:

1. ✅ Access Token foi adicionado como Secret
2. ✅ Função foi deployada (`supabase functions list`)
3. ✅ Nenhum erro no console do navegador (F12)
4. ✅ URL em `src/pages/Checkout.tsx` está correta

## 🎉 Depois que Funcionar

- Configurar webhooks para sincronizar pagamentos
- Criar páginas de sucesso/erro após pagamento
- Atualizar para chave pública de produção
- Sincronizar dados de pagamento com seu banco de dados

---

**Você tem alguma dúvida?** Verifique os arquivos `.md` inclusos ou entre em contato!
