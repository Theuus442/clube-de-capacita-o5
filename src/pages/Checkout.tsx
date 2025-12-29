import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MercadoPagoCheckout from '@/components/MercadoPagoCheckout';
import PreCheckoutRegistration from '@/components/PreCheckoutRegistration';

type CheckoutStep = 'plans' | 'registration';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('plans');
  const [selectedPlan, setSelectedPlan] = useState<'anual' | 'semestral' | null>(null);

  const handlePlanSelected = (planId: string) => {
    setSelectedPlan(planId as 'anual' | 'semestral');
    setCurrentStep('registration');
  };

  const handleBackToPlans = () => {
    setCurrentStep('plans');
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              {currentStep === 'plans' ? 'Escolha seu Plano' : 'Complete seu Cadastro'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {currentStep === 'plans'
                ? 'Obtenha acesso completo a todos os nossos cursos e recursos premium. Escolha o plano que melhor se adapta às suas necessidades.'
                : 'Preencha seus dados para continuar com o pagamento de forma segura.'}
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Component */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentStep === 'plans' ? (
          <MercadoPagoCheckout onPlanSelect={handlePlanSelected} />
        ) : selectedPlan ? (
          <div className="space-y-6">
            <PreCheckoutRegistration
              planType={selectedPlan}
              onSuccess={() => {
                // Success will redirect to Mercado Pago
              }}
              onError={(error) => {
                console.error('Checkout error:', error);
              }}
            />
            <div className="text-center">
              <button
                onClick={handleBackToPlans}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                ← Voltar aos planos
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* FAQ Section */}
      <div className="bg-muted/30 py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Perguntas Frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Como funciona o cancelamento?
              </h3>
              <p className="text-muted-foreground text-sm">
                Você pode cancelar sua assinatura a qualquer momento. Basta
                acessar sua conta e solicitar o cancelamento. Seu acesso será
                mantido até o final do período pago.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Quais métodos de pagamento vocês aceitam?
              </h3>
              <p className="text-muted-foreground text-sm">
                Aceitamos todos os cartões de crédito principais, débito em conta
                bancária e outras formas de pagamento oferecidas pelo Mercado Pago.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Posso trocar de plano depois de assinar?
              </h3>
              <p className="text-muted-foreground text-sm">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer
                momento. As mudanças serão refletidas na próxima cobrança.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Existe suporte técnico?
              </h3>
              <p className="text-muted-foreground text-sm">
                Claro! Todos os planos incluem suporte por email. Planos anuais
                também têm suporte prioritário e acesso ao nosso chat de suporte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
