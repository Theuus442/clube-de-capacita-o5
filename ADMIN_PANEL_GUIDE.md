# Guia Completo do Painel Admin

Este documento descreve como usar e implementar o painel admin para gerenciar cursos, trilhas e planos.

## Visão Geral

O painel admin permite que administradores:
- **Gerenciar Trilhas**: Criar, editar, deletar trilhas de capacitação
- **Gerenciar Cursos**: Adicionar/remover cursos de trilhas existentes
- **Gerenciar Planos**: Editar preços, descrições e benefícios dos planos
- **Atualizar Valores**: Modificar preços e períodos de acesso

## Arquitetura

### Componentes Implementados

#### 1. **Páginas de Admin**
- `src/pages/AdminLogin.tsx` - Página de login do admin
- `src/pages/AdminDashboard.tsx` - Dashboard principal com abas

#### 2. **Componentes de Gerenciamento**
- `src/components/admin/TracksManager.tsx` - Gerenciar trilhas e cursos
- `src/components/admin/PlansManager.tsx` - Gerenciar planos e preços

#### 3. **Componentes Dinâmicos (Supabase)**
- `src/components/TracksSectionDynamic.tsx` - Carrega trilhas do Supabase
- `src/components/PlansSectionDynamic.tsx` - Carrega planos do Supabase

#### 4. **Serviços e Hooks**
- `src/lib/supabase-client.ts` - Cliente Supabase
- `src/lib/tracks-service.ts` - Operações CRUD de trilhas
- `src/lib/plans-service.ts` - Operações CRUD de planos
- `src/hooks/useTracks.ts` - Hook para carregar trilhas
- `src/hooks/usePlans.ts` - Hook para carregar planos

## Como Usar

### Passo 1: Acessar o Painel Admin

```
URL: http://localhost:5173/admin/login
Email: admin@threynnare.com.br
Senha: admin123
```

### Passo 2: Gerenciar Trilhas

1. Acesse `/admin/dashboard`
2. Clique na aba "Trilhas e Cursos"
3. Para cada trilha, você pode:
   - **Editar**: Clicar em "Editar" para modificar título, cor ou cursos
   - **Ver Cursos**: Expandir a lista de cursos
   - **Deletar**: Remover a trilha completamente

### Passo 3: Gerenciar Planos

1. Acesse `/admin/dashboard`
2. Clique na aba "Planos"
3. Para cada plano, você pode:
   - **Editar**: Modificar preço, descrição, benefícios
   - **Marcar como Popular**: Destaque visual especial
   - **Adicionar Benefícios**: Incluir novos benefícios
   - **Deletar**: Remover o plano

## Configuração do Supabase

### Passo 1: Criar Tabelas

Execute o SQL em `SUPABASE_SETUP.md`:

```sql
-- Tabelas principais
CREATE TABLE tracks (...)
CREATE TABLE courses (...)
CREATE TABLE plans (...)
CREATE TABLE plan_features (...)
```

### Passo 2: Migrar Dados

Execute os scripts em `SUPABASE_SEED_DATA.md` para popular as tabelas com dados iniciais.

### Passo 3: Configurar Variáveis de Ambiente

As variáveis já estão configuradas em `.env`:
```
VITE_SUPABASE_URL=https://zajyeykcepcrlngmdpvf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

## Ativando Componentes Dinâmicos

Para usar os componentes que carregam dados do Supabase em tempo real:

### 1. Atualizar TracksSection

**Em `src/pages/Index.tsx`**, altere:

```tsx
// De:
import TracksSection from "@/components/TracksSection";

// Para:
import TracksSectionDynamic from "@/components/TracksSectionDynamic";

// E no JSX:
<TracksSectionDynamic /> // Em vez de <TracksSection />
```

### 2. Atualizar PlansSection

**Em `src/pages/Index.tsx`**, altere:

```tsx
// De:
import PlansSection from "@/components/PlansSection";

// Para:
import PlansSectionDynamic from "@/components/PlansSectionDynamic";

// E no JSX:
<PlansSectionDynamic /> // Em vez de <PlansSection />
```

## Fluxo de Dados

### Quando Dados São Atualizados no Admin

1. Admin edita um plano/trilha no dashboard
2. Alteração é salva em sessão (localStorage atualmente)
3. Ao ativar componentes dinâmicos, eles carregam do Supabase

### Melhorias Futuras

Para persistência em Supabase:

1. Atualizar `TracksManager` para chamar `updateTrack()` ao invés de atualizar estado local
2. Atualizar `PlansManager` para chamar `updatePlan()` ao invés de atualizar estado local
3. Implementar refresh automático dos componentes dinâmicos

## Autenticação

### Atualmente

O painel usa credenciais simples (não é seguro para produção):
- Email: `admin@threynnare.com.br`
- Senha: `admin123`

### Para Produção

1. **Integrar com Supabase Auth**:
   ```tsx
   const { data, error } = await supabase.auth.signInWithPassword({
     email,
     password,
   });
   ```

2. **Usar Supabase Roles**:
   - Criar role de "admin" em Supabase
   - Configurar Row Level Security (RLS)

3. **Proteger Endpoints**:
   - Validar token de autenticação em cada operação

## Troubleshooting

### "Erro ao carregar trilhas"

1. Verificar conexão com Supabase
2. Confirmar que as tabelas existem
3. Verificar VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY

### "localStorage não está persistindo"

Os dados no painel de admin não são salvos no Supabase automaticamente. Você precisa integrar as chamadas das functions de service.

### "Componentes dinâmicos mostram "carregando" eternamente"

1. Verificar console do navegador para erros
2. Confirmar que o Supabase está respondendo
3. Verificar conexão de internet

## Próximas Etapas

1. [ ] Executar scripts SQL do Supabase
2. [ ] Migrar dados iniciais
3. [ ] Testar painel admin com credenciais demo
4. [ ] Ativar componentes dinâmicos na página principal
5. [ ] Implementar Supabase Auth adequado
6. [ ] Configurar RLS (Row Level Security)
7. [ ] Testar em produção

## Rotas Disponíveis

```
/                    - Página principal
/admin/login         - Login do admin
/admin/dashboard     - Dashboard do admin
/payment-return      - Retorno de pagamento
```
