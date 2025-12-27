import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import WhatIsSection from "@/components/WhatIsSection";
import TracksSection from "@/components/TracksSection";
import ComparisonSection from "@/components/ComparisonSection";
import PlansSection from "@/components/PlansSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Clube de Capacitação Profissional | Threynnare</title>
        <meta 
          name="description" 
          content="Tenha acesso contínuo a cursos de capacitação profissional, estude no seu ritmo e conquiste certificados que fortalecem seu currículo. Plataforma digital by Threynnare."
        />
        <meta name="keywords" content="cursos online, capacitação profissional, certificados, trilhas de aprendizado, qualificação profissional" />
        <link rel="canonical" href="https://threynnare.com.br" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Clube de Capacitação Profissional | Threynnare" />
        <meta property="og:description" content="Capacitação profissional online para quem quer evoluir de verdade. Acesso contínuo a cursos e certificados." />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clube de Capacitação Profissional | Threynnare" />
        <meta name="twitter:description" content="Tenha acesso contínuo a cursos de capacitação profissional e conquiste certificados." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <BenefitsSection />
          <WhatIsSection />
          <TracksSection />
          <ComparisonSection />
          <PlansSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
