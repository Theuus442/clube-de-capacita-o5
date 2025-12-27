import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import ComparisonSection from "@/components/ComparisonSection";
import TracksSection from "@/components/TracksSection";
import PlansSection from "@/components/PlansSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Clube de Capacitação Profissional | Threynnare</title>
        <meta 
          name="description" 
          content="Assine a maior plataforma de capacitação profissional. Acesso ilimitado a mais de 500 cursos e 50 trilhas por um valor fixo mensal. Entre para o Clube Threynnare."
        />
        <meta name="keywords" content="cursos online, capacitação profissional, assinatura cursos, certificados, trilhas de aprendizado" />
        <link rel="canonical" href="https://threynnare.com.br" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Clube de Capacitação Profissional | Threynnare" />
        <meta property="og:description" content="Sua carreira não evolui com apenas um curso. Entre para o Clube e tenha acesso ilimitado a todos os cursos." />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clube de Capacitação Profissional | Threynnare" />
        <meta name="twitter:description" content="Assine e tenha acesso ilimitado a mais de 500 cursos por um valor fixo mensal." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <BenefitsSection />
          <ComparisonSection />
          <TracksSection />
          <PlansSection />
          <TestimonialsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
