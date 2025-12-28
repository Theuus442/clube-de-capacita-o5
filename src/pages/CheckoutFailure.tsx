import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutFailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Pagamento Não Processado
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Infelizmente, seu pagamento não foi processado. Por favor, verifique 
          seus dados e tente novamente.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/checkout')} size="lg" variant="outline">
            Tentar Novamente
          </Button>
          <Button onClick={() => navigate('/')} size="lg">
            Voltar à Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFailurePage;
