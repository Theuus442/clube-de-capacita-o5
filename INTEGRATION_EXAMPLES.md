# 🔗 Integration Examples - Frontend + Backend

## Exemplo 1: Criar Usuário Quando Pagamento é Aprovado

Adicione este código ao `supabase/functions/mp-webhook/index.ts`:

```typescript
// After payment details are fetched and before sending email
if (paymentStatus === 'approved' && payerEmail) {
  console.log('👤 Criando usuário para:', payerEmail)
  
  // Generate temporary password
  const tempPassword = Math.random().toString(36).substring(2, 15)
  
  try {
    // Create user in Supabase Auth
    const { data: user, error: authError } = await supabase!.auth.admin.createUser({
      email: payerEmail,
      password: tempPassword,
      email_confirm: true, // Skip email confirmation
    })
    
    if (authError) {
      console.error('❌ Error creating user:', authError)
    } else {
      console.log('✅ User created:', user.user.id)
      
      // Save user data
      const { error: dbError } = await supabase!
        .from('users')
        .insert({
          id: user.user.id,
          email: payerEmail,
          plan_type: externalReference,
          payment_id: id,
          status: 'active',
          created_at: new Date().toISOString(),
        })
      
      if (dbError) {
        console.error('❌ Error saving user data:', dbError)
      } else {
        console.log('✅ User data saved')
      }
    }
  } catch (error) {
    console.error('❌ Error in user creation:', error)
  }
}
```

## Exemplo 2: Tabela de Usuários (SQL)

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  plan_type TEXT NOT NULL,
  payment_id TEXT REFERENCES payments(mercado_pago_id),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  expires_at TIMESTAMP
);

-- Expiration dates based on plan
UPDATE users SET expires_at = created_at + INTERVAL '1 year'
WHERE plan_type = 'anual';

UPDATE users SET expires_at = created_at + INTERVAL '6 months'
WHERE plan_type = 'semestral';
```

## Exemplo 3: Verificar Acesso no Frontend

```typescript
// src/hooks/useCheckAccess.ts
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export function useCheckAccess() {
  const navigate = useNavigate()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAccess = async () => {
      const { data: session } = await supabase.auth.getSession()
      
      if (!session?.user) {
        setHasAccess(false)
        navigate('/checkout')
        return
      }

      // Check if user has active subscription
      const { data: user, error } = await supabase
        .from('users')
        .select('status, expires_at')
        .eq('id', session.user.id)
        .single()

      if (error || !user) {
        setHasAccess(false)
        navigate('/checkout')
        return
      }

      // Check if access is still valid
      const isValid = user.status === 'active' && 
                      new Date(user.expires_at) > new Date()

      setHasAccess(isValid)
      
      if (!isValid) {
        navigate('/checkout')
      }
    }

    checkAccess()
  }, [navigate])

  return hasAccess
}
```

## Exemplo 4: Proteger Rota Premium

```typescript
// src/pages/ProtectedPage.tsx
import { useCheckAccess } from '@/hooks/useCheckAccess'

export function ProtectedPage() {
  const hasAccess = useCheckAccess()

  if (hasAccess === null) {
    return <div>Carregando...</div>
  }

  if (!hasAccess) {
    return <div>Acesso negado. Faça upgrade!</div>
  }

  return (
    <div>
      <h1>Bem-vindo ao conteúdo premium!</h1>
      {/* Seu conteúdo aqui */}
    </div>
  )
}
```

## Exemplo 5: API Route para Recuperar Status de Pagamento

```typescript
// src/lib/payment-api.ts
export async function getPaymentStatus(preferenceId: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('external_reference', preferenceId)
    .single()

  if (error) {
    throw new Error('Payment not found')
  }

  return data
}

export async function getUserPlan(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('plan_type, expires_at, status')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error('User not found')
  }

  return data
}
```

## Exemplo 6: Componente para Mostrar Status de Assinatura

```typescript
// src/components/SubscriptionStatus.tsx
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function SubscriptionStatus() {
  const [plan, setPlan] = useState<any>(null)
  const [daysLeft, setDaysLeft] = useState<number | null>(null)

  useEffect(() => {
    const loadSubscription = async () => {
      const { data: session } = await supabase.auth.getSession()
      if (!session?.user) return

      const { data: user } = await supabase
        .from('users')
        .select('plan_type, expires_at, created_at')
        .eq('id', session.user.id)
        .single()

      if (user) {
        setPlan(user)
        
        const expiresDate = new Date(user.expires_at)
        const today = new Date()
        const days = Math.ceil((expiresDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        setDaysLeft(days)
      }
    }

    loadSubscription()
  }, [])

  if (!plan) return null

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="font-semibold">Seu Plano: {plan.plan_type === 'anual' ? 'Anual' : 'Semestral'}</p>
      <p className="text-sm text-gray-600">
        {daysLeft && daysLeft > 0
          ? `Válido por mais ${daysLeft} dias`
          : 'Sua assinatura expirou'}
      </p>
    </div>
  )
}
```

## Exemplo 7: Email Template (para Resend ou SendGrid)

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #333;">Pagamento Confirmado! 🎉</h1>
  
  <p>Olá,</p>
  
  <p>Seu pagamento foi processado com sucesso!</p>
  
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>Seus Dados de Acesso:</h3>
    <p><strong>Email:</strong> {{userEmail}}</p>
    <p><strong>Senha Temporária:</strong> {{tempPassword}}</p>
    <p><strong>Plano:</strong> {{planType}}</p>
    <p><strong>Válido até:</strong> {{expiresAt}}</p>
  </div>
  
  <p>
    <a href="{{loginUrl}}" style="background: #007bff; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 4px; display: inline-block;">
      Fazer Login
    </a>
  </p>
  
  <p style="color: #666; font-size: 12px; margin-top: 40px;">
    Se tiver dúvidas, entre em contato conosco.
  </p>
</div>
```

## Exemplo 8: Renovação Automática (para Assinaturas Mercado Pago)

```typescript
// Executar esta função periodicamente (via Supabase Cron ou seu backend)
async function renewSubscriptions() {
  const { data: expiring } = await supabase
    .from('users')
    .select('*')
    .lt('expires_at', new Date().toISOString())
    .eq('status', 'active')

  for (const user of expiring || []) {
    // Create new preference for renewal
    const apiUrl = 'https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        planType: user.plan_type,
        redirectUrl: 'https://seu-site.com/payment-return',
      }),
    })

    const { preferenceId } = await response.json()

    // Send renewal email
    console.log(`Renewal preference created for ${user.email}: ${preferenceId}`)
  }
}
```

---

## 🔧 Como Implementar

1. **Escolha qual exemplo você quer:**
   - Quer criar usuários? → Exemplo 1 + 2
   - Quer proteger rotas? → Exemplo 3 + 4
   - Quer mostrar status? → Exemplo 5 + 6
   - Quer enviar emails? → Exemplo 7

2. **Adapte para seu projeto:**
   - Troque nomes de tabelas se necessário
   - Ajuste campos do usuário
   - Configure seu serviço de email

3. **Teste:**
   - Faça um pagamento no sandbox
   - Verifique se os dados apareceram
   - Teste a lógica de acesso

---

## 📊 Fluxo Completo

```
1. Usuário clica em "Continuar"
   ↓
2. Frontend chama create-preference
   ↓
3. Supabase cria preferência no Mercado Pago
   ↓
4. Usuário é direcionado ao checkout do MP
   ↓
5. Usuário completa pagamento
   ↓
6. Mercado Pago envia webhook
   ↓
7. mp-webhook function:
   - Valida pagamento
   - Salva em DB
   - Cria usuário
   - Envia email
   ↓
8. Usuário recebe email com credenciais
   ↓
9. Usuário faz login e acessa conteúdo premium
```

---

✅ **Escolha os exemplos que você precisa e boa sorte!**
