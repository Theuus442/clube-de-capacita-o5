import { useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, Lock, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Success Card */}
        <div className="bg-background rounded-3xl border border-border shadow-lg overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 sm:px-8 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
                <CheckCircle className="w-20 h-20 text-green-500 relative" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Pagamento Confirmado! 🎉
            </h1>
            <p className="text-lg text-muted-foreground">
              Sua assinatura foi ativada com sucesso
            </p>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-8 py-8">
            {/* Email notification */}
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-5 mb-8 border border-amber-200 dark:border-amber-800">
              <div className="flex gap-3">
                <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    📧 Verifique seu e-mail!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Enviamos seu login e senha para o seu e-mail. Verifique sua caixa de entrada e a pasta de Spam agora mesmo.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Você agora tem acesso a:
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Todos os Cursos</p>
                    <p className="text-xs text-muted-foreground">Acesso completo ao catálogo</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Certificados</p>
                    <p className="text-xs text-muted-foreground">Válidos e reconhecidos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Acesso 24/7</p>
                    <p className="text-xs text-muted-foreground">Estude quando quiser</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Suporte Premium</p>
                    <p className="text-xs text-muted-foreground">Ajuda quando precisar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Voltar à Página Inicial
              </Button>
              <Button
                onClick={() => window.location.href = 'https://online.threynnare.com.br/metodo/index.php'}
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg"
              >
                Acessar Área do Aluno →
              </Button>
            </div>

            {/* Footer note */}
            <p className="text-xs text-muted-foreground text-center mt-6 pt-6 border-t">
              Não recebeu o e-mail? Verifique a pasta de Spam ou entre em contato com nosso suporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
