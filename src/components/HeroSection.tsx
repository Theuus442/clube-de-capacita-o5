import { Play, Sparkles, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-400" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Plataforma de Capacitação Profissional</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up animation-delay-200">
            Sua carreira não evolui com apenas um curso.{" "}
            <span className="text-gradient">Entre para o Clube.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-up animation-delay-400">
            Assine a maior plataforma de capacitação profissional. Acesso ilimitado a todas as trilhas e certificados por um valor fixo mensal.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up animation-delay-600">
            <Button 
              variant="hero" 
              size="xl"
              onClick={scrollToPlans}
            >
              <Play className="w-5 h-5" />
              Quero ser assinante
            </Button>
            <Button 
              variant="hero-outline" 
              size="xl"
              onClick={() => document.getElementById('trilhas')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conhecer as trilhas
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-up animation-delay-600">
            <StatCard icon={<Users className="w-6 h-6" />} value="12.000+" label="Assinantes ativos" />
            <StatCard icon={<Play className="w-6 h-6" />} value="500+" label="Aulas disponíveis" />
            <StatCard icon={<Award className="w-6 h-6" />} value="50+" label="Trilhas completas" />
            <StatCard icon={<Sparkles className="w-6 h-6" />} value="98%" label="Satisfação" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-border flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <div className="glass-card rounded-2xl p-6 hover-lift">
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 mx-auto">
      {icon}
    </div>
    <div className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

export default HeroSection;
