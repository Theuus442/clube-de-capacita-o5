# Pre-Checkout Registration Component

## Overview

The `PreCheckoutRegistration` component creates a modern, responsive registration form that integrates with your Mercado Pago payment flow. It collects user information before processing payment.

## Features

✅ Modern, clean UI with Tailwind CSS
✅ Form validation for all fields
✅ Two-step checkout process (Plans → Registration → Payment)
✅ Automatic user creation in school API
✅ Secure Mercado Pago integration
✅ Loading states and error handling
✅ Mobile responsive design

## Component Props

```typescript
interface PreCheckoutRegistrationProps {
  planType: 'anual' | 'semestral';  // Which plan user selected
  onSuccess?: () => void;            // Callback on successful checkout
  onError?: (error: string) => void; // Callback on error
}
```

## Form Fields

1. **Full Name** (required)
   - Placeholder: "Seu nome completo"
   - Validation: Required, non-empty

2. **Email** (required)
   - Placeholder: "seu@email.com"
   - Validation: Required, valid email format

3. **Gender** (required)
   - Options: "Masculino", "Feminino", "Outro"
   - Validation: Required

## Checkout Flow

```
Step 1: User selects plan → Step 2: User fills registration form → Step 3: Payment
                                                                           ↓
                                                    Mercado Pago Checkout Redirect
```

### Technical Flow

1. **User clicks plan** → `onPlanSelect` callback fires
2. **Registration form shows** → User fills and submits
3. **Form validation** → Check all required fields
4. **Create user** → POST to school API with status "bloqueado"
5. **Create preference** → POST to Supabase function
6. **Redirect to Mercado Pago** → Browser redirects to checkout
7. **User completes payment** → Webhook updates user status

## Integration Example

In your Checkout page:

```tsx
import PreCheckoutRegistration from '@/components/PreCheckoutRegistration';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<'plans' | 'registration'>('plans');
  const [selectedPlan, setSelectedPlan] = useState<'anual' | 'semestral' | null>(null);

  const handlePlanSelected = (planId: string) => {
    setSelectedPlan(planId as 'anual' | 'semestral');
    setCurrentStep('registration');
  };

  return (
    <>
      {currentStep === 'plans' ? (
        <MercadoPagoCheckout onPlanSelect={handlePlanSelected} />
      ) : selectedPlan ? (
        <PreCheckoutRegistration
          planType={selectedPlan}
          onSuccess={() => console.log('Payment initiated')}
          onError={(error) => console.error(error)}
        />
      ) : null}
    </>
  );
}
```

## Environment Variables Required

For the component to work properly, configure:

```env
# .env.local
VITE_SUPABASE_URL=https://zajyeykcepcrlngmdpvf.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ESCOLA_TOKEN=your_escola_token  # Optional - for user creation
```

## API Endpoints

### School API (User Creation)
```
POST https://estudandoead.com/threynnare/api/v2/index.php?usuarios/novo

FormData:
- token: string
- nome: string
- email: string
- status: "bloqueado" (always)
- sexo: "masculino" | "feminino" | "outro"
```

### Supabase Function (Preference Creation)
```
POST /api/mercado-pago (development)
POST https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference (production)

Headers:
- Content-Type: application/json
- Authorization: Bearer {VITE_SUPABASE_ANON_KEY}

Body:
{
  planType: "anual" | "semestral",
  redirectUrl: string,
  email?: string,
  nome?: string
}

Response:
{
  preferenceId: string
}
```

## Error Handling

The component handles various error scenarios:

- Empty required fields → "Por favor, preencha todos os campos"
- Invalid email format → "Por favor, informe um email válido"
- User creation failed → "Erro ao criar usuário. Tente novamente."
- Preference creation failed → "Erro ao gerar link de pagamento. Tente novamente."
- Network errors → User-friendly error messages with retry option

## Styling

The component uses:
- Tailwind CSS for styling
- Shadcn/ui components (Button, Input, Label, Select)
- Gradient backgrounds for modern look
- Responsive design (mobile-first approach)
- Dark mode support

## Security Features

✅ Form validation (client-side)
✅ HTTPS endpoints only
✅ No sensitive data stored in browser
✅ Mercado Pago handles payment encryption
✅ User status starts as "bloqueado" (blocked) until payment confirmed
✅ Webhook activation required for account access

## Customization

### Change Button Text

```tsx
// In PreCheckoutRegistration.tsx, line ~240
<span>Seu texto aqui 🔒</span>
```

### Change Security Message

```tsx
// In PreCheckoutRegistration.tsx, line ~260
<p>Sua mensagem aqui</p>
```

### Adjust Colors

```tsx
// Change primary color reference in Tailwind classes
from-primary → from-blue-500
to-primary/80 → to-blue-400
```

## Testing

### Test User Creation Flow

1. Fill form with test data
2. Submit form
3. Check browser console for API call logs
4. Verify "✅ Usuário criado" message

### Test Mercado Pago Redirect

1. Complete form
2. Should redirect to Mercado Pago checkout
3. Use test credit card: 4111 1111 1111 1111
4. Test expiry: 11/25, CVV: 123

## Troubleshooting

### "Por favor, preencha todos os campos"
- Ensure all three fields are filled
- Email must be valid format

### "Erro ao criar usuário"
- Check if school API is accessible
- Verify VITE_ESCOLA_TOKEN is configured
- Check CORS settings on school API

### "Erro ao gerar link de pagamento"
- Verify Supabase function is deployed
- Check MP_ACCESS_TOKEN in Supabase Secrets
- Ensure VITE_SUPABASE_ANON_KEY is configured

### Not redirecting to Mercado Pago
- Check browser console for errors
- Verify preferenceId is received from Supabase
- Check if Mercado Pago checkout URL is valid

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Notes

- Form is lightweight (~10KB)
- Two API calls (user creation + preference)
- Average response time: 1-3 seconds
- Includes loading states for UX feedback
