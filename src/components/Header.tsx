import { Button } from "@/components/ui/button";

const logo = "https://cdn.builder.io/api/v1/image/assets%2Fe5bb440d62b9444d8b1b5ce7174c9669%2Fee393151f3d54614831850d1a16b29db?format=webp&width=800";

const Header = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0">
            <img
              src={logo}
              alt="Clube de Capacitação Profissional"
              className="h-12 lg:h-16 w-auto"
            />
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#para-quem" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Para quem é
            </a>
            <a href="#o-que-e" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              O que é
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
              Quero acesso ao clube
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
