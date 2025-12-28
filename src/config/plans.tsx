import { Crown, Zap } from 'lucide-react';

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  highlight?: string;
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'anual',
    name: 'Plano Anual',
    price: '397',
    period: '',
    description: '12 meses de acesso ilimitado à plataforma',
    features: [
      'Todos os cursos disponíveis',
      'Certificados inclusos',
      'Melhor custo-benefício',
      'Ideal para quem pensa no médio e longo prazo',
    ],
    icon: <Crown className="w-6 h-6" />,
    highlight: 'Mais vantajoso',
    popular: true,
  },
  {
    id: 'semestral',
    name: 'Plano Semestral',
    price: '297',
    period: '',
    description: 'Acesso completo à plataforma por 6 meses',
    features: [
      'Todos os cursos disponíveis',
      'Certificados inclusos',
      'Acesso por 6 meses',
    ],
    icon: <Zap className="w-6 h-6" />,
    popular: false,
  },
];
