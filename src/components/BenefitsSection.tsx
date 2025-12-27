import { 
  FileCheck, 
  Target, 
  Award, 
  BookOpen, 
  Briefcase, 
  TrendingUp 
} from "lucide-react";

const benefits = [
  {
    icon: <FileCheck className="w-7 h-7" />,
    title: "Quer melhorar seu currículo e se destacar",
    description: "Certificados reconhecidos que valorizam seu perfil profissional.",
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: "Busca capacitação prática e objetiva",
    description: "Conteúdo direto ao ponto e aplicável no dia a dia.",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "Precisa de certificados para comprovar qualificação",
    description: "Emita certificados ao concluir cada curso, sem custo adicional.",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Quer aprender de forma contínua",
    description: "Acesso ilimitado sem pagar por curso avulso.",
  },
  {
    icon: <Briefcase className="w-7 h-7" />,
    title: "Valoriza acesso profissional",
    description: "Plataforma estruturada, não curso solto.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Quer investir no próprio crescimento",
    description: "Evolução contínua com investimento acessível.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="para-quem" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            Para quem é o clube
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            O Clube de Capacitação Profissional é <span className="text-gradient">para você</span> que:
          </h2>
          <p className="text-lg text-muted-foreground">
            Se você leva sua evolução profissional a sério, esse clube é para você.
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
