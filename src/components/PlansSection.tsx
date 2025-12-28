import { Check, Star, ShieldCheck, CreditCard, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { plans } from "@/config/plans";

const PlansSection = () => {
  const navigate = useNavigate();

  // Função para redirecionar para o checkout de assinatura
  const handleSubscribe = (planId: string) => {
    navigate('/checkout');
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
            Planos de acesso
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Invista no seu <span className="text-gradient">futuro profissional</span>
          </h2>
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
              {plan.popular && plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-hero-gradient text-primary-foreground text-sm font-semibold shadow-lg">
                    <Crown className="w-4 h-4" />
                    {plan.highlight}
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
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className={`font-display text-5xl font-bold ${plan.popular ? 'text-gradient' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                </div>
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
                {plan.popular ? "Assinar agora" : "Começar agora"}
              </Button>
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
