import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import {
  Header,
  HeroSection,
  ProductsSection,
  WhyChooseSection,
  CTASection,
  Footer
} from '../components/landing';

const LandingPage: React.FC = () => {
  const { products, loading } = useProducts();

  // Função para renderizar botão de agendamento baseado na categoria
  const getScheduleButton = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('consulta')) return 'AGENDAR CONSULTA AGORA';
    if (categoryLower.includes('exame') || categoryLower.includes('laboratorial') || categoryLower.includes('imagem')) return 'AGENDAR EXAME AGORA';
    if (categoryLower.includes('vacina')) return 'AGENDAR VACINA AGORA';
    if (categoryLower.includes('bem-estar') || categoryLower.includes('estética')) return 'AGENDAR BEM-ESTAR AGORA';
    if (categoryLower.includes('veterinário') || categoryLower.includes('pet')) return 'AGENDAR ATENDIMENTO PET';
    return 'AGENDAR AGORA';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header />
      
      <HeroSection />
      
      <ProductsSection
        products={products.filter(product => product.active)}
        loading={loading}
        getScheduleButton={getScheduleButton}
      />
      
      <WhyChooseSection />
      
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default LandingPage; 