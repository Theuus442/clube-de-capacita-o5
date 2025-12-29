import {
  Rocket,
  Briefcase,
  Sparkles,
  Monitor,
  GraduationCap,
  Share2,
  ChevronRight,
  ArrowRight
} from "lucide-react";

const tracks = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Primeira Oportunidade",
    courses: ["Porteiro", "Frentista", "Fiscal de Loja", "Cuidador de Idosos", "Atendimento de Farmácia", "Operador de Caixa", "Telemarketing", "Elaboração de Currículo"],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Administrativa",
    courses: ["Administração", "Técnicas de Vendas", "Contabilidade", "Departamento Pessoal", "Gestão de RH", "Conhecimentos Bancários", "Estoque e Faturamento"],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Área da Beleza",
    courses: ["Maquiagem", "Designer de Cílios", "Massagem Modeladora", "Manicure e Pedicure", "Barbeiro"],
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    title: "Informática e Tecnologia",
    courses: ["Windows", "Segurança na Internet", "Word", "Excel", "PowerPoint", "Google Drive", "Digitação", "Manutenção de PC"],
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Preparatórios",
    courses: ["Português", "Redação", "Matemática", "História", "Geografia", "Biologia", "Física", "Química", "Filosofia", "Sociologia", "Artes"],
    color: "from-green-500 to-green-600",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Mídias Digitais",
    courses: ["Marketing Digital", "Instagram para Vendas", "Mídias Digitais", "YouTube", "Canva", "Operador de Podcast", "Photoshop CC", "Edição de Vídeo Premiere"],
    color: "from-red-500 to-red-600",
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <div 
              key={index} 
              className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.color} flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {track.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {track.title}
              </h3>

              {/* Courses list */}
              <div className="flex flex-wrap gap-2 mb-4">
                {track.courses.map((course, courseIndex) => (
                  <span 
                    key={courseIndex}
                    className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                  >
                    {course}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <p className="text-sm text-primary font-medium">
                {track.courses.length} cursos disponíveis
              </p>
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
