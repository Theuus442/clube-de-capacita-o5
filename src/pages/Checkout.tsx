import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import MercadoPagoCheckout from '@/components/MercadoPagoCheckout';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
  const navigate = useNavigate();
  // ✅ URL da função Supabase configurada
  const SUPABASE_FUNCTION_URL = 'https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Escolha seu Plano
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Obtenha acesso completo a todos os nossos cursos e recursos premium.
              Escolha o plano que melhor se adapta às suas necessidades.
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Alert */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">
              ⚙️ Configuração Necessária
            </p>
            <p className="mb-2">
              Para usar o checkout, você precisa:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-amber-700">
              <li>Criar uma função Supabase Edge (veja <code className="bg-white px-2 py-0.5 rounded">MERCADO_PAGO_SETUP.md</code>)</li>
              <li>Atualizar a URL em <code className="bg-white px-2 py-0.5 rounded">src/pages/Checkout.tsx</code></li>
              <li>Adicionar o Access Token do Mercado Pago no Supabase</li>
            </ol>
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
