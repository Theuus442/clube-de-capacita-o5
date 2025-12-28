import MercadoPagoCheckout from '@/components/MercadoPagoCheckout';

const CheckoutPage = () => {
  // Replace 'URL_DA_FUNCAO_SUPABASE' with your actual Supabase function URL
  const SUPABASE_FUNCTION_URL = 'https://your-project.supabase.co/functions/v1/create-preference';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Assine Agora
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Obtenha acesso completo a todos os nossos cursos e recursos premium.
              Escolha o plano que melhor se adapta às suas necessidades.
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Component */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <MercadoPagoCheckout supabaseFunctionUrl={SUPABASE_FUNCTION_URL} />
      </div>

      {/* FAQ Section */}
      <div className="bg-muted/30 py-12 sm:py-16">
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
