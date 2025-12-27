import { 
  Briefcase, 
  BarChart3, 
  Users2, 
  FileText, 
  Megaphone, 
  Code2,
  ChevronRight,
  Play
} from "lucide-react";

const tracks = [
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Gestão de Projetos",
    courses: 45,
    hours: 120,
    description: "Domine metodologias ágeis, PMBOK, Scrum e muito mais",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Análise de Dados",
    courses: 38,
    hours: 95,
    description: "Excel avançado, Power BI, Python e SQL para dados",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <Users2 className="w-6 h-6" />,
    title: "Liderança & RH",
    courses: 52,
    hours: 140,
    description: "Gestão de pessoas, feedback, recrutamento estratégico",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Finanças & Contábil",
    courses: 41,
    hours: 110,
    description: "Controladoria, análise financeira, planejamento tributário",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: "Marketing Digital",
    courses: 48,
    hours: 130,
    description: "Tráfego pago, SEO, copywriting, redes sociais",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Tecnologia & TI",
    courses: 56,
    hours: 160,
    description: "Desenvolvimento, cloud, segurança da informação",
    color: "from-cyan-500 to-cyan-600",
  },
];

const TracksSection = () => {
  return (
    <section id="trilhas" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Play className="w-4 h-4" />
            Trilhas de Conhecimento
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Todas as <span className="text-gradient">trilhas inclusas</span> na sua assinatura
          </h2>
          <p className="text-lg text-muted-foreground">
            Mais de 50 trilhas organizadas por área de atuação. Novos cursos adicionados toda semana.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <div 
              key={index} 
              className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover-lift cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.color} flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {track.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {track.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4">
                {track.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <span className="text-foreground font-medium">{track.courses} cursos</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{track.hours}h de conteúdo</span>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                Ver trilha completa
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            E muito mais: Soft Skills, Vendas, Compliance, Produtividade...
          </p>
          <a 
            href="#planos" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Assine e tenha acesso a tudo
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
