import { Check, TrendingUp, Award, Clock, MapPin, Shield } from "lucide-react";

const benefits = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    text: "Um único curso avulso pode custar mais de R$ 100",
  },
  {
    icon: <Award className="w-5 h-5" />,
    text: "No clube, você tem acesso a diversos cursos durante todo o ano",
  },
  {
    icon: <Check className="w-5 h-5" />,
    text: "Certificados inclusos, sem custo extra",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    text: "Estude quando e onde quiser",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    text: "Ideal para quem quer crescer sem depender de cursos presenciais",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: "Plataforma profissional, simples e segura",
  },
];

const ComparisonSection = () => {
  return (
    <section id="comparativo" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Por que o clube vale a pena
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Um investimento inteligente <span className="text-gradient">na sua carreira</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 bg-background rounded-xl p-5 border border-border"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  {benefit.icon}
                </div>
                <span className="text-foreground font-medium pt-2">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-2xl p-8 border border-primary/20 text-center">
            <p className="text-xl sm:text-2xl font-display font-bold text-foreground">
              Capacitação contínua custa menos do que você imagina — 
              <span className="text-gradient"> e vale muito mais do que parece.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
