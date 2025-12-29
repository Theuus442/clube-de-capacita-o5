'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lock, AlertCircle, Loader } from 'lucide-react';

interface PreCheckoutRegistrationProps {
  planType: 'anual' | 'semestral';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const PreCheckoutRegistration = ({
  planType,
  onSuccess,
  onError,
}: PreCheckoutRegistrationProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setError('Por favor, informe seu nome completo');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Por favor, informe seu email');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, informe um email válido');
      return false;
    }

    if (!formData.gender) {
      setError('Por favor, selecione seu gênero');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Log start of checkout flow
      console.group('🛒 CHECKOUT FLOW INICIADO');
      console.log('📦 Plano selecionado:', planType);
      console.log('👤 Dados do usuário:', {
        nome: formData.fullName,
        email: formData.email,
        sexo: formData.gender,
        planType: planType,
      });
      console.groupEnd();
      // Step 1: Create user in the school's API with "bloqueado" status
      console.log('📝 Criando usuário na plataforma...');

      const formDataApi = new FormData();
      // Get token from environment or use placeholder
      const escolaToken = import.meta.env.VITE_ESCOLA_TOKEN || '';
      formDataApi.append('token', escolaToken || 'TOKEN_NOT_CONFIGURED');
      formDataApi.append('nome', formData.fullName);
      formDataApi.append('email', formData.email);
      formDataApi.append('status', 'bloqueado');
      formDataApi.append('sexo', formData.gender);
      formDataApi.append('planType', planType); // Include plan type in user creation

      console.log('📋 Dados enviados para criação de usuário:', {
        nome: formData.fullName,
        email: formData.email,
        sexo: formData.gender,
        planType: planType,
        status: 'bloqueado',
      });

      try {
        const createUserResponse = await fetch(
          'https://estudandoead.com/threynnare/api/v2/index.php?usuarios/novo',
          {
            method: 'POST',
            body: formDataApi,
          }
        );

        // Log response even if not ok - the user might still be created
        const userResponse = await createUserResponse.json().catch(() => null);
        console.log('📋 Resposta da criação de usuário:', {
          ok: createUserResponse.ok,
          status: createUserResponse.status,
          data: userResponse,
        });

        if (!createUserResponse.ok && createUserResponse.status === 403) {
          console.warn('⚠️ Token inválido na API da escola. Continuando com pagamento...');
        }

        // Continue even if user creation partially failed - focus on Mercado Pago
      } catch (userError) {
        console.warn('⚠️ Aviso ao criar usuário (continuando):', userError);
      }

      // Step 2: Create Mercado Pago preference
      console.log('💳 Criando preferência de pagamento...');
      console.log('📊 Dados do pagamento:', {
        planType: planType,
        email: formData.email,
        nome: formData.fullName,
        sexo: formData.gender,
      });

      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const apiUrl = import.meta.env.DEV
        ? '/api/mercado-pago'
        : 'https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1/create-preference';

      const preferenceResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          planType: planType,
          redirectUrl: window.location.origin,
          email: formData.email,
          nome: formData.fullName,
          sexo: formData.gender,
        }),
      });

      if (!preferenceResponse.ok) {
        const errorData = await preferenceResponse.text();
        throw new Error(
          'Erro ao gerar link de pagamento. Tente novamente.'
        );
      }

      const preferenceData = await preferenceResponse.json();
      console.log('✅ Preferência criada:', preferenceData);

      // Step 3: Redirect to Mercado Pago
      if (preferenceData.preferenceId) {
        console.log('🔄 Redirecionando para Mercado Pago...');
        const checkoutUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${preferenceData.preferenceId}`;
        window.location.href = checkoutUrl;

        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error('Preferência ID não recebida');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('❌ Erro no fluxo de checkout:', err);
      setError(errorMessage);

      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 sm:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Criar Conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Preencha os dados abaixo para continuar
              </p>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Full Name Field */}
            <div className="mb-6">
              <Label
                htmlFor="fullName"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nome Completo <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Seu nome completo"
                value={formData.fullName}
                onChange={(e) =>
                  handleInputChange('fullName', e.target.value)
                }
                disabled={isLoading}
                className="rounded-xl h-11 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isLoading}
                className="rounded-xl h-11 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            {/* Gender Field */}
            <div className="mb-8">
              <Label
                htmlFor="gender"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Gênero <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  handleInputChange('gender', value)
                }
                disabled={isLoading}
              >
                <SelectTrigger
                  id="gender"
                  className="rounded-xl h-11 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/50"
                >
                  <SelectValue placeholder="Selecione seu gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CTA Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Criando cadastro...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Continuar para Pagamento 🔒
                </span>
              )}
            </Button>

            {/* Security Message */}
            <p className="text-xs text-muted-foreground text-center mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              Seus dados estão seguros. Você será redirecionado para o Mercado
              Pago em seguida.
            </p>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>🔒</span>
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⚡</span>
                <span>Acesso Imediato</span>
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Ao continuar, você concorda com nossos{' '}
          <a href="#" className="text-primary hover:underline">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="text-primary hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
};

export default PreCheckoutRegistration;
