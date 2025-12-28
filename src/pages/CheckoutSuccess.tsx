import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Pagamento Confirmado!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sua assinatura foi ativada com sucesso. Você já tem acesso a todos os 
          cursos e recursos premium do Clube de Capacitação Profissional.
        </p>
        <Button onClick={() => navigate('/')} size="lg">
          Voltar à Página Inicial
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
