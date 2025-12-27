import { Crown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-hero-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300">
              <Crown className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-foreground">Threynnare</span>
              <span className="block text-xs text-muted-foreground -mt-0.5">Clube de Capacitação</span>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Benefícios
            </a>
            <a href="#comparativo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Por que Assinar
            </a>
            <a href="#trilhas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Trilhas
            </a>
            <a href="#planos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Planos
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:inline-flex"
            >
              Entrar
            </Button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={scrollToPlans}
            >
              Quero ser assinante
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
