# 🚀 Guia de Deployment - Função Supabase + Mercado Pago

## 📋 Seus Dados (Já Configurados)

- **Projeto Supabase**: `zajyeykcepcrlngmdpvf`
- **URL Supabase**: `https://zajyeykcepcrlngmdpvf.supabase.co`
- **Chave Anon**: Já armazenada com segurança

## ⚠️ O que você precisa:

### 1. **Access Token do Mercado Pago** (Essencial!)

Você precisa do seu **Access Token de Produção** do Mercado Pago:

1. Acesse [Painel do Mercado Pago](https://www.mercadopago.com.br/developers/panel/)
2. Vá para **Credenciais** 
3. Procure por **Access Token de Produção**
4. Copie o token (começa com `APP_USR-`)

### 2. **CLI do Supabase** (Instalar)

```bash
# MacOS
brew install supabase/tap/supabase

# Linux/Windows
npm install -g supabase
```

## 📝 Passos para Deploy

### Passo 1: Fazer Login no Supabase

```bash
supabase login
```

Será aberta uma página no navegador para você autenticar.

### Passo 2: Link com seu Projeto

```bash
supabase link --project-ref zajyeykcepcrlngmdpvf
```

Isso conecta sua CLI ao seu projeto Supabase.

### Passo 3: Adicionar a Variável de Ambiente

No seu painel do Supabase:

1. Vá para **Project Settings** (ícone de engrenagem)
2. Clique em **Secrets**
3. Clique em **New secret**
4. Preencha:
   - **Name**: `MERCADO_PAGO_ACCESS_TOKEN`
   - **Value**: Cole o Access Token que você copiou
5. Clique em **Add secret**

### Passo 4: Deploy da Função

Execute no seu terminal (na raiz do projeto):

```bash
supabase functions deploy create-preference
```

Você deverá ver algo como:
```
Deploying function 'create-preference'...
✓ Function deployed successfully!
✓ https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference
```

## ✅ Verificar se Está Funcionando

### Opção 1: Testar no Supabase Dashboard

1. Vá para **Functions**
2. Clique em `create-preference`
3. Clique em **Test function**
4. No campo **Request body**, cole:
```json
{
  "planType": "anual"
}
```
5. Clique em **Send**

Você deverá receber um `preferenceId`.

### Opção 2: Testar na sua Aplicação

1. Acesse: `https://seu-app.com/checkout`
2. Clique em um plano
3. Se vir o Wallet do Mercado Pago, está funcionando! ✅

## 🔧 Troubleshooting

### Erro: "Token do Mercado Pago não encontrado"

**Solução**: Você não adicionou a variável de ambiente. Volte ao Passo 3.

### Erro: "Failed to fetch"

**Solução**: Verifique se a função foi deployada corretamente:
```bash
supabase functions list
```

### Erro: "Tipo de plano inválido"

**Solução**: Envie apenas `"anual"` ou `"semestral"`, não `"mensal"`.

## 🧪 Modo de Teste

Para testar antes de usar cartão real, use:
- **Chave Pública de Teste**: `TEST-f7e8a080-93c5-4ed9-a60a-01d8a90c014b` (já configurada)
- **Cartão de Teste**: `4111 1111 1111 1111`
- **Data**: `12/25`
- **CVV**: `123`

Depois, quando for para produção, atualize para a **Chave Pública de Produção**.

## 📱 O que Acontece Agora

1. Usuário clica em um plano
2. Frontend faz POST para sua função Supabase
3. Função cria preferência no Mercado Pago
4. Retorna `preferenceId`
5. Frontend mostra o Wallet do Mercado Pago
6. Usuário completa o pagamento

## ❓ Próximas Etapas (Opcionais)

- [ ] Configurar Webhooks para sincronizar pagamentos
- [ ] Criar página de sucesso/erro após pagamento
- [ ] Salvar informações de pagamento no banco de dados

---

**Precisa de ajuda?** Volte ao arquivo `MERCADO_PAGO_SETUP.md` para mais detalhes técnicos.
