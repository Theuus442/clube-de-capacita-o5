import { 
  Globe, 
  Infinity, 
  Award, 
  Target, 
  Smartphone,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: <Globe className="w-5 h-5" />,
    text: "Plataforma 100% online",
  },
  {
    icon: <Infinity className="w-5 h-5" />,
    text: "Acesso ilimitado enquanto a assinatura estiver ativa",
  },
  {
    icon: <Award className="w-5 h-5" />,
    text: "Certificado ao concluir cada curso",
  },
  {
    icon: <Target className="w-5 h-5" />,
    text: "Conteúdo direto ao ponto e aplicável",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    text: "Estude no celular, tablet ou computador",
  },
];

const WhatIsSection = () => {
  return (
    <section id="o-que-e" className="py-24 lg:py-40 bg-gradient-to-b from-primary/5 via-muted/20 to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-8 border border-primary/30">
              O que é o clube
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              O Clube de Capacitação <span className="text-gradient">Profissional</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              É uma plataforma de assinatura que oferece acesso contínuo a cursos online de qualificação profissional, organizados por trilhas, para quem deseja aprender, se atualizar e crescer no mercado de trabalho.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-background rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/25 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-base text-foreground font-semibold leading-snug">{feature.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-10 lg:p-14 border border-primary/30 text-center shadow-lg">
            <p className="text-lg text-muted-foreground mb-4 font-medium">
              Aqui você não compra um curso.
            </p>
            <p className="text-3xl sm:text-4xl font-display font-bold text-foreground flex items-center justify-center gap-3 mb-4">
              <ArrowRight className="w-8 h-8 text-primary flex-shrink-0" />
              Você garante acesso contínuo à capacitação profissional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
