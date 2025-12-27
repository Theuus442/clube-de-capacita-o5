import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Santos",
    role: "Gerente de Projetos",
    company: "Tech Solutions",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "Antes gastava mais de R$ 200 por mês em cursos avulsos. Hoje pago uma fração disso e tenho acesso a muito mais conteúdo. Minha carreira deu um salto.",
    rating: 5,
  },
  {
    name: "Carlos Oliveira",
    role: "Analista de Dados",
    company: "DataCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "A trilha de análise de dados é fantástica. Consegui minha promoção em 6 meses graças aos conhecimentos que adquiri aqui. Investimento que vale cada centavo.",
    rating: 5,
  },
  {
    name: "Ana Paula Costa",
    role: "Diretora de RH",
    company: "Grupo Empresarial ABC",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Assinei para minha equipe inteira. Os cursos de liderança e gestão de pessoas transformaram nossa cultura organizacional. Recomendo demais!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            O que nossos <span className="text-gradient">assinantes</span> dizem
          </h2>
          <p className="text-lg text-muted-foreground">
            Mais de 12.000 profissionais já transformaram suas carreiras com o Clube.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-background rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover-lift relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote className="w-10 h-10" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
