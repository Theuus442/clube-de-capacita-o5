import { ArrowRight, Crown, Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Pronto para transformar sua carreira?
            </h2>
            <p className="text-background/70 text-lg mb-8">
              Junte-se a mais de 12.000 profissionais que já estão evoluindo com o Clube.
            </p>
            <Button 
              variant="hero" 
              size="xl"
              onClick={scrollToPlans}
              className="group"
            >
              <Crown className="w-5 h-5" />
              Quero ser assinante
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-hero-gradient rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-background" />
              </div>
              <div>
                <span className="font-display text-xl font-bold">Threynnare</span>
                <span className="block text-sm text-background/60">Clube de Capacitação Profissional</span>
              </div>
            </div>
            <p className="text-background/70 mb-6 max-w-md">
              A maior plataforma de capacitação profissional do Brasil. Acesso ilimitado a todos os cursos por um valor fixo mensal.
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
              <FooterLink href="#beneficios">Benefícios</FooterLink>
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
                <span className="text-sm">contato@threynnare.com.br</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(11) 99999-9999</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="text-sm">São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Threynnare. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-background transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-background transition-colors">Política de Privacidade</a>
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
