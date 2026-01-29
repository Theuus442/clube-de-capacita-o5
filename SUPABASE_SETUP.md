# Configuração do Supabase para Painel Admin

Este documento contém as instruções para configurar as tabelas necessárias no Supabase.

## Tabelas Necessárias

### 1. Tabela de Trilhas (tracks)
```sql
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Tabela de Cursos (courses)
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX courses_track_id_idx ON courses(track_id);
```

### 3. Tabela de Planos (plans)
```sql
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  period TEXT NOT NULL,
  icon TEXT NOT NULL,
  popular BOOLEAN DEFAULT FALSE,
  highlight TEXT,
  hotmart_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Tabela de Benefícios de Planos (plan_features)
```sql
CREATE TABLE plan_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX plan_features_plan_id_idx ON plan_features(plan_id);
```

## Como Aplicar as Migrações

1. Acesse o Supabase Dashboard: https://app.supabase.com
2. Selecione seu projeto
3. Vá para "SQL Editor"
4. Crie uma nova query
5. Cole cada uma das queries acima e execute

## Dados Iniciais

Após criar as tabelas, execute os scripts de migração de dados em `SUPABASE_SEED_DATA.md`.

## Próximos Passos

- [ ] Criar tabelas no Supabase
- [ ] Migrar dados existentes
- [ ] Configurar Row Level Security (RLS) se necessário
- [ ] Testar integrações no painel admin
