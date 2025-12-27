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
    <section id="o-que-e" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              O que é o clube
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              O Clube de Capacitação <span className="text-gradient">Profissional</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              É uma plataforma de assinatura que oferece acesso contínuo a cursos online de qualificação profissional, organizados por trilhas, para quem deseja aprender, se atualizar e crescer no mercado de trabalho.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-background rounded-xl p-4 border border-border"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  {feature.icon}
                </div>
                <span className="text-sm text-foreground font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-2xl p-8 border border-primary/20 text-center">
            <p className="text-xl text-muted-foreground mb-2">
              Aqui você não compra um curso.
            </p>
            <p className="text-2xl font-display font-bold text-foreground flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5 text-primary" />
              Você garante acesso contínuo à capacitação profissional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
