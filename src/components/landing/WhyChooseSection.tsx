import React from 'react';
import { 
  Clock, 
  Users, 
  DollarSign, 
  Globe, 
  Shield,
  CheckCircle
} from 'lucide-react';

const WhyChooseSection: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Atendimento 24h/dia, 7 dias por semana',
      description: 'Disponibilidade total para cuidar da sua saúde quando você precisar',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Rede de médicos e especialistas de confiança',
      description: 'Profissionais qualificados e experientes em diversas especialidades',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: DollarSign,
      title: 'Custos muito mais acessíveis que planos de saúde',
      description: 'Economia de até 70% comparado aos planos tradicionais',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Globe,
      title: 'Abrangência nacional + teleatendimento mundial',
      description: 'Atendimento em todo o Brasil e em qualquer lugar do mundo',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Segurança e confidencialidade garantidas',
      description: 'Seus dados protegidos com tecnologia de ponta e sigilo médico',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="por-que-escolher" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-10 animate-float"></div>
      <div className="absolute top-20 right-16 w-16 h-16 bg-green-200 rounded-full opacity-15 animate-float-delayed"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-16 right-10 w-14 h-14 bg-pink-200 rounded-full opacity-10 animate-float"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            🚀 Por Que Escolher a Sua Medicina?
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra os diferenciais que fazem da Sua Medicina a melhor escolha para cuidar da sua saúde
          </p>
        </div>
        
        {/* Grid de benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
              >
                {/* Gradiente de fundo sutil */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Ícone com gradiente */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Título */}
                  <h4 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-primary-600 transition-colors duration-300">
                    {benefit.title}
                  </h4>
                  
                  {/* Descrição */}
                  <p className="text-gray-600 text-center leading-relaxed mb-6">
                    {benefit.description}
                  </p>
                  
                  {/* Indicador de qualidade */}
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm font-semibold text-green-600">Comprovado</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Seção de estatísticas */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-black text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">Pacientes Atendidos</div>
              <div className="text-sm text-gray-500">Em todo o Brasil</div>
            </div>
            <div className="group">
              <div className="text-4xl font-black text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">Satisfação</div>
              <div className="text-sm text-gray-500">Dos nossos pacientes</div>
            </div>
            <div className="group">
              <div className="text-4xl font-black text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">Disponibilidade</div>
              <div className="text-sm text-gray-500">Atendimento contínuo</div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default WhyChooseSection;
