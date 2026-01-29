# Migrações do Supabase

Este diretório contém as migrações SQL para configurar o banco de dados do painel admin.

## 📋 Migrações Disponíveis

### 1. `001_create_admin_tables.sql`
Cria as 4 tabelas principais:
- **tracks** - Trilhas de capacitação
- **courses** - Cursos dentro de trilhas
- **plans** - Planos de acesso
- **plan_features** - Benefícios dos planos

**Status**: Deve ser executada primeiro

### 2. `002_seed_data.sql`
Popula as tabelas com dados iniciais:
- 6 trilhas
- 60 cursos
- 3 planos
- 11 benefícios

**Status**: Executar após criar as tabelas

## 🚀 Como Executar

### Método 1: Via Supabase Dashboard (Recomendado)

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto: **clube-de-capacita-o5**
3. Vá para **SQL Editor**
4. Clique em **+ New Query**
5. Copie o conteúdo de `001_create_admin_tables.sql`
6. Cole no editor
7. Clique em **Run** (ou Ctrl+Enter)
8. Aguarde a conclusão
9. Repita para `002_seed_data.sql`

### Método 2: Via Supabase CLI

```bash
# Instale a CLI se ainda não tiver
npm install -g supabase

# Execute as migrações
supabase db push
```

### Método 3: Copiar e Colar Direto

#### Passo 1: Criar Tabelas
```sql
-- Copie todo o conteúdo de 001_create_admin_tables.sql
-- Cole no SQL Editor do Supabase
-- Execute
```

#### Passo 2: Inserir Dados
```sql
-- Copie todo o conteúdo de 002_seed_data.sql
-- Cole no SQL Editor do Supabase
-- Execute
```

## ✅ Verificação

Após executar as migrações, verifique se os dados foram criados corretamente:

### No Supabase Dashboard:
1. Vá para **Table Editor**
2. Você deve ver as tabelas:
   - `tracks`
   - `courses`
   - `plans`
   - `plan_features`

### Via SQL:
```sql
-- Verifique a quantidade de registros
SELECT COUNT(*) as total_trilhas FROM tracks;       -- Esperado: 6
SELECT COUNT(*) as total_cursos FROM courses;       -- Esperado: 60
SELECT COUNT(*) as total_planos FROM plans;         -- Esperado: 3
SELECT COUNT(*) as total_beneficios FROM plan_features;  -- Esperado: 11
```

## 🔍 Estrutura das Tabelas

### tracks
```
id (UUID)
title (TEXT) - Nome da trilha
icon (TEXT) - Nome do ícone (ex: 'Rocket')
color (TEXT) - Gradiente Tailwind (ex: 'from-blue-500 to-blue-600')
order (INTEGER) - Ordem de exibição
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### courses
```
id (UUID)
track_id (UUID) - Referência à trilha
title (TEXT) - Nome do curso
order (INTEGER) - Ordem de exibição
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### plans
```
id (UUID)
name (TEXT) - Nome do plano
description (TEXT) - Descrição
price (DECIMAL) - Preço em reais
period (TEXT) - Período (mês, semestre, ano)
icon (TEXT) - Nome do ícone
popular (BOOLEAN) - Se é destaque
highlight (TEXT) - Texto de destaque
hotmart_url (TEXT) - Link Hotmart
order (INTEGER) - Ordem de exibição
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### plan_features
```
id (UUID)
plan_id (UUID) - Referência ao plano
feature (TEXT) - Descrição do benefício
order (INTEGER) - Ordem de exibição
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## ⚠️ Observações Importantes

- As migrações usam `ON CONFLICT DO NOTHING` para evitar erros se executadas múltiplas vezes
- Os índices (indexes) melhoram a performance de consultas
- As chaves estrangeiras garantem integridade referencial (ao deletar uma trilha, seus cursos também são deletados)
- Os timestamps (`created_at`, `updated_at`) são preenchidos automaticamente

## 🔄 Restaurar/Resetar Dados

Se precisar resetar os dados (cuidado!), execute:

```sql
-- AVISO: Isso deletará TODOS os dados!
DROP TABLE IF EXISTS plan_features CASCADE;
DROP TABLE IF EXISTS plans CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS tracks CASCADE;

-- Depois execute novamente as migrações
```

## 📞 Suporte

Se tiver dúvidas:
1. Verifique se as tabelas foram criadas em **Table Editor**
2. Verifique os erros no console do Supabase
3. Consulte a documentação em `ADMIN_PANEL_GUIDE.md`
