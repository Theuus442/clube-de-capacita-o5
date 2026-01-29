# 🚀 Quick Start - Configurar Banco de Dados

Siga estes passos para configurar o banco de dados em 5 minutos!

## ⚡ Passo 1: Acessar Supabase

1. Abra https://app.supabase.com
2. Selecione o projeto: **clube-de-capacita-o5**
3. Clique em **SQL Editor** (lado esquerdo)

## ⚡ Passo 2: Executar Primeira Migração (Criar Tabelas)

1. Clique em **+ New Query**
2. Copie o conteúdo completo do arquivo: **supabase/migrations/001_create_admin_tables.sql**
3. Cole no editor
4. Clique em **Run** (ou pressione `Ctrl + Enter`)
5. Aguarde até ver ✅ Sucesso

## ⚡ Passo 3: Executar Segunda Migração (Inserir Dados)

1. Clique em **+ New Query** (nova query)
2. Copie o conteúdo completo do arquivo: **supabase/migrations/002_seed_data.sql**
3. Cole no editor
4. Clique em **Run**
5. Aguarde até ver ✅ Sucesso

## ✅ Passo 4: Verificar Dados

### Método 1: Via Table Editor
1. Clique em **Table Editor** (lado esquerdo)
2. Você deve ver as 4 tabelas criadas:
   - `tracks` (6 trilhas)
   - `courses` (60 cursos)
   - `plans` (3 planos)
   - `plan_features` (11 benefícios)

### Método 2: Via SQL Query
Cole esta query para verificar:

```sql
SELECT 
  (SELECT COUNT(*) FROM tracks) as trilhas,
  (SELECT COUNT(*) FROM courses) as cursos,
  (SELECT COUNT(*) FROM plans) as planos,
  (SELECT COUNT(*) FROM plan_features) as beneficios;
```

Resultado esperado:
```
trilhas | cursos | planos | beneficios
--------|--------|--------|----------
   6    |   60   |   3    |    11
```

## 🎉 Pronto!

Seu banco de dados está configurado! Agora:

1. Acesse o painel admin em: `/admin/login`
2. Use as credenciais:
   - Email: `admin@threynnare.com.br`
   - Senha: `admin123`
3. Vá para `/admin/dashboard` para gerenciar trilhas e planos

## 🔧 Se Algo Deu Errado

### Erro: "relation "tracks" already exists"
- As tabelas já foram criadas
- Continue para a migração 002 (inserir dados)

### Erro: "duplicate key value violates unique constraint"
- Os dados já foram inseridos
- Tudo está OK, você pode continuar

### Erro: "permission denied"
- Você não tem permissão no Supabase
- Verifique se está usando a conta correta

## 📂 Arquivos de Migração

```
supabase/migrations/
├── 001_create_admin_tables.sql  ← Cria as tabelas
├── 002_seed_data.sql            ← Insere dados iniciais
└── README.md                     ← Documentação detalhada
```

## 🎯 Próximos Passos

Após configurar o banco:

1. ✅ Banco de dados pronto
2. ⏭️ Testar painel admin
3. ⏭️ Integrar componentes dinâmicos (TracksSectionDynamic, PlansSectionDynamic)
4. ⏭️ Implementar Supabase Auth para segurança

Consulte `ADMIN_PANEL_GUIDE.md` para mais detalhes!
