import { X, Check, TrendingUp, Wallet, BookOpen } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section id="comparativo" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Por que Assinar
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            O modelo tradicional está <span className="text-gradient">ultrapassado</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pare de gastar fortunas em cursos avulsos. Tenha acesso ilimitado por uma fração do preço.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Model */}
          <div className="bg-background rounded-3xl p-8 lg:p-10 border-2 border-destructive/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-destructive/30" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Mercado Tradicional</h3>
                <p className="text-sm text-muted-foreground">O jeito antigo de estudar</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <ComparisonItem negative text="Você paga R$ 150+ por apenas 1 curso" />
              <ComparisonItem negative text="Conteúdo limitado e desatualizado" />
              <ComparisonItem negative text="Sem acesso a novos lançamentos" />
              <ComparisonItem negative text="Certificados cobrados separadamente" />
              <ComparisonItem negative text="Suporte inexistente ou demorado" />
            </div>

            <div className="bg-destructive/5 rounded-2xl p-6 text-center">
              <div className="text-sm text-muted-foreground mb-1">Para fazer 10 cursos</div>
              <div className="font-display text-4xl font-bold text-destructive">R$ 1.500+</div>
              <div className="text-sm text-muted-foreground mt-1">sem garantia de qualidade</div>
            </div>
          </div>

          {/* Club Model */}
          <div className="bg-background rounded-3xl p-8 lg:p-10 border-2 border-primary shadow-glow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-hero-gradient" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="flex items-center gap-3 mb-8 relative">
              <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center shadow-lg">
                <Check className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">O Clube Threynnare</h3>
                <p className="text-sm text-muted-foreground">O jeito inteligente de evoluir</p>
              </div>
            </div>

            <div className="space-y-4 mb-8 relative">
              <ComparisonItem text="Acesso a TODOS os 500+ cursos do catálogo" />
              <ComparisonItem text="Conteúdo atualizado mensalmente" />
              <ComparisonItem text="Novos cursos inclusos automaticamente" />
              <ComparisonItem text="Certificados ilimitados sem custo extra" />
              <ComparisonItem text="Suporte prioritário 24/7" />
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 text-center relative">
              <div className="text-sm text-muted-foreground mb-1">Acesso ilimitado por apenas</div>
              <div className="font-display text-4xl font-bold text-gradient">R$ 49,90/mês</div>
              <div className="text-sm text-muted-foreground mt-1">cancele quando quiser</div>
            </div>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <ValueCard 
            icon={<TrendingUp className="w-6 h-6" />}
            title="Economize 97%"
            description="Comparado a comprar cursos individualmente"
          />
          <ValueCard 
            icon={<BookOpen className="w-6 h-6" />}
            title="Aprenda sem limites"
            description="Quanto mais você estuda, mais economiza"
          />
          <ValueCard 
            icon={<Wallet className="w-6 h-6" />}
            title="Sem surpresas"
            description="Valor fixo mensal, sem taxas escondidas"
          />
        </div>
      </div>
    </section>
  );
};

const ComparisonItem = ({ text, negative = false }: { text: string; negative?: boolean }) => (
  <div className="flex items-start gap-3">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
      negative ? 'bg-destructive/10' : 'bg-primary/10'
    }`}>
      {negative ? (
        <X className="w-3 h-3 text-destructive" />
      ) : (
        <Check className="w-3 h-3 text-primary" />
      )}
    </div>
    <span className={`text-sm ${negative ? 'text-muted-foreground' : 'text-foreground'}`}>
      {text}
    </span>
  </div>
);

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="text-center p-6">
    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
      {icon}
    </div>
    <h4 className="font-display text-lg font-bold text-foreground mb-2">{title}</h4>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default ComparisonSection;
