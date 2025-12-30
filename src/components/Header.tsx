import { Button } from "@/components/ui/button";

const logo = "https://cdn.builder.io/api/v1/image/assets%2Ff4670bbbe2cf4661b102af324234e044%2Fc2b8ad5f20e74cc9bfc3c554409ba0aa?format=webp&width=800";

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 lg:py-3">
          {/* Logo */}
          <a href="/" className="flex items-center hover:opacity-90 transition-opacity group">
            <img
              src={logo}
              alt="Clube de Capacitação Profissional"
              className="h-16 lg:h-24 w-auto max-w-3xl group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button onClick={scrollToTop} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-200 bg-transparent border-none cursor-pointer">
              Inicio
            </button>
            <a href="#o-que-e" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-200">
              O que é
            </a>
            <a href="#para-quem" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-200">
              Para quem é
            </a>
            <a href="#trilhas" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-200">
              Trilhas
            </a>
            <a href="#planos" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-200">
              Planos
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex text-muted-foreground hover:text-foreground hover:bg-primary/5"
              onClick={() => window.location.href = "https://online.threynnare.com.br/metodo/index.php"}
            >
              Acessar Plataforma do curso
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={scrollToPlans}
              className="font-semibold shadow-md hover:shadow-lg transition-shadow"
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
