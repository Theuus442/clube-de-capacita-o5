import { 
  Rocket,
  Briefcase,
  Sparkles,
  ChevronRight,
  ArrowRight
} from "lucide-react";

const tracks = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Primeira Oportunidade",
    description: "Cursos essenciais para quem está entrando no mercado de trabalho",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Administrativo e Escritório",
    description: "Capacitação para rotinas administrativas e gestão de escritório",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Beleza",
    description: "Cursos para profissionais da área de estética e beleza",
    color: "from-pink-500 to-pink-600",
  },
];

const TracksSection = () => {
  return (
    <section id="trilhas" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Trilhas de capacitação
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Capacitação organizada por <span className="text-gradient">objetivos profissionais</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

              {/* CTA */}
              <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                Ver trilha completa
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-4">
            Você não precisa escolher um curso isolado.
          </p>
          <p className="text-xl font-display font-bold text-foreground flex items-center justify-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            O clube acompanha sua evolução.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
