#!/bin/bash

# Setup script for Mercado Pago Integration
# Execute este script na raiz do seu projeto

set -e

echo "🚀 Setup Mercado Pago Integration"
echo "=================================="
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
  echo "❌ Supabase CLI não encontrado"
  echo "Instale com: npm install -g @supabase/cli"
  exit 1
fi

echo "✅ Supabase CLI encontrado"
echo ""

# Check if user is logged in
if ! supabase projects list &> /dev/null; then
  echo "⚠️ Você não está logado no Supabase"
  echo "Executando: supabase login"
  echo ""
  supabase login
fi

echo ""
echo "📋 Deployando funções Supabase..."
echo "=================================="

# Deploy functions
supabase functions deploy mp-webhook
supabase functions deploy create-preference
supabase functions deploy create-checkout

echo ""
echo "✅ Funções deployadas com sucesso!"
echo ""

echo "🔍 Verificando deployment..."
supabase functions list

echo ""
echo "=================================="
echo "✅ Setup concluído!"
echo ""
echo "📝 Próximos passos:"
echo "1. Acesse Supabase SQL Editor"
echo "2. Cole o conteúdo de: supabase/migrations/001_create_payment_tables.sql"
echo "3. Execute a migration"
echo ""
echo "4. Teste em: http://localhost:5173/checkout"
echo "5. Veja logs com: supabase functions logs mp-webhook --follow"
echo ""
echo "📚 Mais info: veja COMPLETE_SETUP_GUIDE.md"
