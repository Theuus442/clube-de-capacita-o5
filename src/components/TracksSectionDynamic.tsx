import { useTracks } from '@/hooks/useTracks';
import { ChevronRight, ArrowRight, Rocket, Briefcase, Sparkles, Monitor, GraduationCap, Share2, BookOpen } from 'lucide-react';

const TracksSectionDynamic = () => {
  const { tracks, loading, error } = useTracks();

  if (loading) {
    return (
      <section id="trilhas" className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="animate-pulse h-8 w-32 bg-muted rounded mx-auto mb-4"></div>
            <div className="animate-pulse h-12 w-3/4 bg-muted rounded mx-auto mb-6"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-muted rounded-2xl h-64"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="trilhas" className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-destructive">
            <p>Erro ao carregar trilhas. Por favor, tente novamente.</p>
          </div>
        </div>
      </section>
    );
  }

  // Get icon component based on icon name
  const getIcon = (iconName: string) => {
    const Icons: Record<string, JSX.Element> = {
      'Rocket': <Rocket className="w-6 h-6" />,
      'Briefcase': <Briefcase className="w-6 h-6" />,
      'Sparkles': <Sparkles className="w-6 h-6" />,
      'Monitor': <Monitor className="w-6 h-6" />,
      'GraduationCap': <GraduationCap className="w-6 h-6" />,
      'Share2': <Share2 className="w-6 h-6" />,
    };
    return Icons[iconName] || <BookOpen className="w-6 h-6" />;
  };

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
              key={track.id} 
              className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover-lift"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.color} flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {getIcon(track.icon)}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {track.title}
              </h3>

              {/* Courses list */}
              <div className="flex flex-wrap gap-2 mb-4">
                {track.courses && track.courses.map((course, courseIndex) => (
                  <span 
                    key={courseIndex}
                    className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                  >
                    {course.title}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <p className="text-sm text-primary font-medium">
                {track.courses?.length || 0} cursos disponíveis
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

export default TracksSectionDynamic;
