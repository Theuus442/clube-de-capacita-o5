import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';

type PaymentStatus = 'approved' | 'pending' | 'failure' | null;

const PaymentReturn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus>(null);

  useEffect(() => {
    const statusParam = searchParams.get('status') as PaymentStatus;
    if (statusParam && ['approved', 'pending', 'failure'].includes(statusParam)) {
      setStatus(statusParam);
    } else {
      setStatus('failure');
    }
  }, [searchParams]);

  if (status === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (status) {
      case 'approved':
        return (
          <>
            <Helmet>
              <title>Pagamento Confirmado | Threynnare</title>
              <meta name="description" content="Seu pagamento foi confirmado com sucesso. Acesso ativado ao Clube Threynnare." />
            </Helmet>
            <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
              <div className="text-center max-w-2xl w-full">
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"></div>
                    <CheckCircle className="relative w-24 h-24 text-green-500" />
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Pagamento Confirmado! 🎉
                </h1>

                <p className="text-lg text-muted-foreground mb-8">
                  Sua assinatura no Clube Threynnare está ativa.
                </p>

                {/* Important Notice */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 mb-10 rounded-r-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 text-left">
                    ⚠️ Aviso Importante
                  </h3>
                  <p className="text-blue-800 dark:text-blue-300 text-left">
                    Enviamos seu Login e Senha para o seu E-mail. Verifique sua caixa de entrada e pasta de Spam agora mesmo.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => window.open('https://escolathreynnare.com.br', '_blank')}
                    size="lg"
                    className="min-w-48"
                  >
                    Ir para Área do Aluno
                  </Button>
                  <Button 
                    onClick={() => navigate('/')} 
                    size="lg"
                    variant="outline"
                    className="min-w-48"
                  >
                    Voltar ao Início
                  </Button>
                </div>
              </div>
            </div>
          </>
        );

      case 'pending':
        return (
          <>
            <Helmet>
              <title>Pagamento em Processamento | Threynnare</title>
              <meta name="description" content="Seu pagamento está sendo processado. Você receberá o acesso em breve." />
            </Helmet>
            <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
              <div className="text-center max-w-2xl w-full">
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl"></div>
                    <Clock className="relative w-24 h-24 text-amber-500 animate-spin" />
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Pagamento em Processamento
                </h1>

                <p className="text-lg text-muted-foreground mb-8">
                  Estamos verificando seu pagamento. Assim que for confirmado, você receberá seu acesso por e-mail.
                </p>

                <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-6 mb-10 rounded-r-lg">
                  <p className="text-amber-900 dark:text-amber-200 text-left">
                    ⏱️ Este processo geralmente leva alguns minutos. Verifique seu e-mail e pasta de Spam.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/')} 
                    size="lg"
                    className="min-w-48"
                  >
                    Voltar ao Início
                  </Button>
                </div>
              </div>
            </div>
          </>
        );

      case 'failure':
        return (
          <>
            <Helmet>
              <title>Pagamento Não Processado | Threynnare</title>
              <meta name="description" content="Seu pagamento não foi processado. Tente novamente." />
            </Helmet>
            <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
              <div className="text-center max-w-2xl w-full">
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl"></div>
                    <XCircle className="relative w-24 h-24 text-red-500" />
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Algo deu errado
                </h1>

                <p className="text-lg text-muted-foreground mb-8">
                  Infelizmente, seu pagamento não foi processado. Por favor, verifique seus dados e tente novamente.
                </p>

                <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 mb-10 rounded-r-lg">
                  <p className="text-red-900 dark:text-red-200 text-left">
                    ❌ Se o problema persistir, entre em contato com nosso suporte.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/checkout')} 
                    size="lg"
                    className="min-w-48"
                  >
                    Tentar Novamente
                  </Button>
                  <Button 
                    onClick={() => navigate('/')} 
                    size="lg"
                    variant="outline"
                    className="min-w-48"
                  >
                    Voltar ao Início
                  </Button>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

export default PaymentReturn;
