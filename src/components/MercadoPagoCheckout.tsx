'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Loader, Crown, Zap, X, Lock, Target } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  highlight?: string;
  popular?: boolean;
}

interface CheckoutState {
  selectedPlanId: string | null;
  preferenceId: string | null;
  loading: boolean;
  error: string | null;
}

const plans: Plan[] = [
  {
    id: 'anual',
    name: 'Plano Anual',
    price: '397',
    period: '',
    description: '12 meses de acesso ilimitado à plataforma',
    features: [
      'Todos os cursos disponíveis',
      'Certificados inclusos',
      'Melhor custo-benefício',
      'Ideal para quem pensa no médio e longo prazo',
    ],
    icon: <Crown className="w-6 h-6" />,
    highlight: 'Mais vantajoso',
    popular: true,
  },
  {
    id: 'semestral',
    name: 'Plano Semestral',
    price: '297',
    period: '',
    description: 'Acesso completo à plataforma por 6 meses',
    features: [
      'Todos os cursos disponíveis',
      'Certificados inclusos',
      'Acesso por 6 meses',
    ],
    icon: <Zap className="w-6 h-6" />,
    popular: false,
  },
];

const MercadoPagoCheckout = ({
  supabaseFunctionUrl = 'URL_DA_FUNCAO_SUPABASE',
}: {
  supabaseFunctionUrl?: string;
} = {}) => {
  const [checkout, setCheckout] = useState<CheckoutState>({
    selectedPlanId: null,
    preferenceId: null,
    loading: false,
    error: null,
  });

  const handlePlanSelect = async (planId: string) => {
    // Validate that the Supabase function URL is configured
    if (
      !supabaseFunctionUrl ||
      supabaseFunctionUrl === 'URL_DA_FUNCAO_SUPABASE' ||
      supabaseFunctionUrl.includes('your-project')
    ) {
      setCheckout({
        selectedPlanId: null,
        preferenceId: null,
        loading: false,
        error:
          '⚙️ Função Supabase não configurada. Atualize a URL em src/pages/Checkout.tsx com sua função real. Veja MERCADO_PAGO_SETUP.md para mais informações.',
      });
      return;
    }

    setCheckout({
      selectedPlanId: planId,
      preferenceId: null,
      loading: true,
      error: null,
    });

    try {
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!anonKey) {
        throw new Error('Chave de autenticação Supabase não configurada. Configure VITE_SUPABASE_ANON_KEY.');
      }

      const response = await fetch(supabaseFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          planType: planId,
        }),
      });

      if (!response.ok) {
        let errorDetails = '';
        try {
          const errorData = await response.json();
          errorDetails = errorData.error || JSON.stringify(errorData);
        } catch {
          errorDetails = await response.text();
        }
        console.error('Erro da função Supabase:', {
          status: response.status,
          statusText: response.statusText,
          details: errorDetails,
        });
        throw new Error(
          `Erro da função: ${response.status} ${response.statusText}. Detalhes: ${errorDetails}`
        );
      }

      const data = await response.json();
      console.log('Resposta da função:', data);

      if (!data.preferenceId) {
        throw new Error(
          `Preferência ID não recebida. Resposta: ${JSON.stringify(data)}`
        );
      }

      setCheckout((prev) => ({
        ...prev,
        preferenceId: data.preferenceId,
        loading: false,
      }));
    } catch (err) {
      let errorMessage = 'Erro ao processar pagamento';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else if (err && typeof err === 'object') {
        errorMessage = JSON.stringify(err);
      }

      console.error('Erro no checkout:', err);

      setCheckout({
        selectedPlanId: null,
        preferenceId: null,
        loading: false,
        error: errorMessage,
      });
    }
  };

  const handleReset = () => {
    setCheckout({
      selectedPlanId: null,
      preferenceId: null,
      loading: false,
      error: null,
    });
  };

  // If we have a preferenceId and selectedPlanId, show the Wallet
  if (checkout.preferenceId && checkout.selectedPlanId) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-background rounded-3xl border-2 border-border p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Finalizando Pagamento
              </h3>
              <p className="text-muted-foreground mt-2">
                {plans.find((p) => p.id === checkout.selectedPlanId)?.name}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-8">
            <Wallet preferenceId={checkout.preferenceId} />
          </div>

          <button
            onClick={handleReset}
            className="w-full px-4 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            Voltar aos planos
          </button>
        </div>
      </div>
    );
  }

  // Show plans grid
  return (
    <section className="w-full py-0">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
          Escolha seu <span className="text-gradient">plano</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Selecione o melhor plano para você e comece agora mesmo
        </p>
      </div>

      {checkout.error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{checkout.error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const isSelected = checkout.selectedPlanId === plan.id;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`relative bg-background rounded-3xl p-6 lg:p-8 border-2 transition-all duration-300 ${
                isPopular
                  ? 'border-primary shadow-glow'
                  : 'border-border hover:border-primary/30'
              } ${isSelected ? 'ring-2 ring-primary' : ''}`}
            >
              {/* Popular Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-hero-gradient text-primary-foreground text-sm font-semibold shadow-lg">
                    <Crown className="w-4 h-4" />
                    {plan.highlight}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  isPopular
                    ? 'bg-hero-gradient text-primary-foreground shadow-lg'
                    : 'bg-muted text-foreground'
                }`}
              >
                {plan.icon}
              </div>

              {/* Plan Name */}
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span
                    className={`font-display text-5xl font-bold ${
                      isPopular ? 'text-gradient' : 'text-foreground'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isPopular ? 'bg-primary/10' : 'bg-muted'
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          isPopular ? 'text-primary' : 'text-foreground'
                        }`}
                      />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={isPopular ? 'hero' : 'outline'}
                size="lg"
                className="w-full"
                onClick={() => handlePlanSelect(plan.id)}
                disabled={checkout.loading && isSelected}
              >
                {checkout.loading && isSelected ? (
                  <span className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    Processando...
                  </span>
                ) : (
                  'Continuar'
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Pagamento 100% Seguro</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Acesso Imediato</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">7 dias de garantia</span>
        </div>
      </div>
    </section>
  );
};

export default MercadoPagoCheckout;
