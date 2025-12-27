import { Check, Crown, Zap, Star, ShieldCheck, CreditCard, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "mensal",
    name: "Plano Mensal",
    description: "Pague todo mês. Cancele quando quiser.",
    price: "49,90",
    period: "/mês",
    features: [
      "Acesso a todos os cursos",
      "Certificados ilimitados",
      "Novos cursos toda semana",
      "Suporte por email",
      "Comunidade exclusiva",
    ],
    icon: <Zap className="w-6 h-6" />,
    popular: false,
    // TODO: Substituir pelo link de assinatura do Mercado Pago
    // checkoutUrl: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=SEU_PLAN_ID_MENSAL"
  },
  {
    id: "anual",
    name: "Plano Anual",
    description: "Economize assinando o plano anual. 12 meses de acesso liberado.",
    price: "39,90",
    period: "/mês",
    originalPrice: "49,90",
    savings: "Economize R$ 120/ano",
    features: [
      "Tudo do plano mensal",
      "2 meses grátis",
      "Suporte prioritário 24/7",
      "Acesso antecipado a novidades",
      "Mentoria mensal em grupo",
      "Material complementar exclusivo",
    ],
    icon: <Crown className="w-6 h-6" />,
    popular: true,
    // TODO: Substituir pelo link de assinatura do Mercado Pago
    // checkoutUrl: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=SEU_PLAN_ID_ANUAL"
  },
];

const PlansSection = () => {
  // Função para redirecionar para o checkout de assinatura
  const handleSubscribe = (planId: string) => {
    // TODO: Integrar com Mercado Pago Preapproval (Assinatura Recorrente)
    // Exemplo de estrutura para criar a preferência de assinatura:
    /*
    const subscription = {
      preapproval_plan_id: planId === 'anual' ? 'PLAN_ID_ANUAL' : 'PLAN_ID_MENSAL',
      back_url: window.location.origin + '/criar-conta', // Redireciona para criação de conta após pagamento
      payer_email: 'email@do.usuario',
    };
    
    // Chamar API do Mercado Pago para criar preapproval e obter link
    // window.location.href = response.init_point;
    */
    
    console.log(`Iniciando assinatura do plano: ${planId}`);
    // Por enquanto, apenas mostra um alerta
    alert(`Em breve você será redirecionado para o checkout de assinatura do plano ${planId === 'anual' ? 'Anual' : 'Mensal'}.`);
  };

  return (
    <section id="planos" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Escolha seu plano
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Invista no seu <span className="text-gradient">futuro profissional</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Assine agora e tenha acesso imediato a todo o conteúdo. Sua assinatura começa hoje.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-background rounded-3xl p-8 lg:p-10 border-2 transition-all duration-300 hover-lift ${
                plan.popular 
                  ? 'border-primary shadow-glow' 
                  : 'border-border hover:border-primary/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-hero-gradient text-primary-foreground text-sm font-semibold shadow-lg">
                    <Crown className="w-4 h-4" />
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                plan.popular 
                  ? 'bg-hero-gradient text-primary-foreground shadow-lg' 
                  : 'bg-muted text-foreground'
              }`}>
                {plan.icon}
              </div>

              {/* Plan Name */}
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              {/* Pricing */}
              <div className="mb-8">
                {plan.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through mb-1">
                    R$ {plan.originalPrice}/mês
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className={`font-display text-5xl font-bold ${plan.popular ? 'text-gradient' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                {plan.savings && (
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    {plan.savings}
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-primary' : 'text-foreground'}`} />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                variant={plan.popular ? "hero" : "outline"} 
                size="lg" 
                className="w-full"
                onClick={() => handleSubscribe(plan.id)}
              >
                {plan.popular ? "Começar minha assinatura" : "Assinar Agora"}
              </Button>

              {/* Trust Signal */}
              <p className="text-xs text-center text-muted-foreground mt-4">
                Cancele quando quiser • Sem taxa de cancelamento
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
          <TrustBadge icon={<ShieldCheck className="w-5 h-5" />} text="Pagamento 100% Seguro" />
          <TrustBadge icon={<Zap className="w-5 h-5" />} text="Acesso Imediato" />
          <TrustBadge icon={<Target className="w-5 h-5" />} text="7 dias de garantia" />
          <TrustBadge icon={<CreditCard className="w-5 h-5" />} text="Parcele no cartão" />
        </div>
      </div>
    </section>
  );
};

const TrustBadge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    <span className="text-primary">{icon}</span>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default PlansSection;
