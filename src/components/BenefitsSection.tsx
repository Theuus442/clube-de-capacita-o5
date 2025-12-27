import { 
  Infinity, 
  Award, 
  RefreshCw, 
  Headphones, 
  Smartphone, 
  Users 
} from "lucide-react";

const benefits = [
  {
    icon: <Infinity className="w-7 h-7" />,
    title: "Acesso Ilimitado",
    description: "Assista quantas vezes quiser, sem restrições. O conteúdo é seu enquanto for assinante.",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "Certificados Gratuitos",
    description: "Emita certificados de conclusão para todos os cursos sem custo adicional.",
  },
  {
    icon: <RefreshCw className="w-7 h-7" />,
    title: "Conteúdo Atualizado",
    description: "Novos cursos toda semana e atualizações constantes do material existente.",
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: "Suporte Dedicado",
    description: "Tire dúvidas com nossa equipe especializada sempre que precisar.",
  },
  {
    icon: <Smartphone className="w-7 h-7" />,
    title: "Acesse de Qualquer Lugar",
    description: "Estude pelo computador, tablet ou celular. Sua conta sincroniza em todos os dispositivos.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Comunidade Exclusiva",
    description: "Conecte-se com outros profissionais, troque experiências e faça networking.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            Benefícios Exclusivos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tudo isso <span className="text-gradient">incluso</span> na sua assinatura
          </h2>
          <p className="text-lg text-muted-foreground">
            Sem taxas escondidas. Sem surpresas. Apenas resultados para sua carreira.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group relative bg-background rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
