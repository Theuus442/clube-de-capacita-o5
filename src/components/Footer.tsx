import { ArrowRight, Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const logo = "https://cdn.builder.io/api/v1/image/assets%2Fe5bb440d62b9444d8b1b5ce7174c9669%2Ffaf14d2bbfda45589565e22491d28969?format=webp&width=800";

const Footer = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Authority & CTA Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-background/70 mb-4">
              O Clube de Capacitação Profissional é um produto digital desenvolvido por uma empresa com experiência em capacitação e qualificação profissional.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-sm text-background/60">by</span>
              <span className="font-display text-lg font-bold">Threynnare</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Invista na sua evolução profissional hoje.
            </h2>
            <p className="text-background/70 text-lg mb-8">
              Aprenda mais, se qualifique e esteja preparado para novas oportunidades.
            </p>
            <Button 
              variant="hero" 
              size="xl"
              onClick={scrollToPlans}
              className="group"
            >
              Entrar para o clube agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src={logo} 
                alt="Clube de Capacitação Profissional" 
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-background/70 mb-6 max-w-md">
              Plataforma digital de capacitação profissional com acesso contínuo a cursos online de qualificação.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Instagram className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Linkedin className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Youtube className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3">
              <FooterLink href="#para-quem">Para quem é</FooterLink>
              <FooterLink href="#o-que-e">O que é o clube</FooterLink>
              <FooterLink href="#trilhas">Trilhas</FooterLink>
              <FooterLink href="#planos">Planos</FooterLink>
              <FooterLink href="#">Entrar</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4" />
                <span className="text-sm">atendimento@threynnare.com.br</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4" />
                <span className="text-sm">82 3013-0024</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="text-sm">Maceió, AL</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <p className="text-sm text-background/50 text-center mb-6">
            Os cursos do Clube de Capacitação Profissional são voltados para capacitação profissional online e não substituem treinamentos técnicos ou obrigatórios exigidos por lei.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} Threynnare. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-background/60">
              <a href="#" className="hover:text-background transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-background transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a href={href} className="text-background/70 hover:text-background transition-colors text-sm">
      {children}
    </a>
  </li>
);

export default Footer;
