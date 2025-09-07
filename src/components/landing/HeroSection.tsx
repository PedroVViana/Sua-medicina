import React from 'react';
import { Rocket, Phone } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="py-20 flex justify-center relative overflow-hidden">
      {/* Efeito de fundo suave */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-60"></div>
      
      {/* Elementos decorativos flutuantes */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-20 right-16 w-12 h-12 bg-green-200 rounded-full opacity-30 animate-float-delayed"></div>
      <div className="absolute bottom-20 left-20 w-8 h-8 bg-red-200 rounded-full opacity-25 animate-float-slow"></div>
      <div className="absolute bottom-16 right-10 w-10 h-10 bg-yellow-200 rounded-full opacity-20 animate-float"></div>
      
      <div className="relative w-[90%] bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white py-16 px-10 rounded-[25px] shadow-2xl border-2 border-red-400 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] group">
        {/* Overlay sutil para profundidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-[25px]"></div>
        
        <div className="text-center relative z-10">
          <h2 className="text-5xl font-bold mb-5 drop-shadow-lg animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
              Cuide da Saúde com a Sua Medicina
            </span>
          </h2>
          
          <p className="text-2xl mb-5 font-semibold text-yellow-100 animate-fade-in-up-delayed">
            Rápido, Acessível e Humanizado
          </p>
          
          <p className="text-lg mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in-up-delayed-2">
            👉 Escolha agora o plano ideal e garanta consultas, exames, bem-estar e muito mais com preços justos e atendimento de qualidade.
          </p>
          
          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in-up-delayed-3">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-green-400 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-white" />
              COMEÇAR AGORA
            </div>
            <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-white/30 transition-all duration-300 cursor-pointer border-2 border-white/30 hover:border-white/50 flex items-center gap-2">
              <Phone className="w-5 h-5 text-white" />
              FALAR COM ESPECIALISTA
            </div>
          </div>
          
          {/* Indicadores de confiança */}
          <div className="mt-12 animate-fade-in-up-delayed-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
              <div className="flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 backdrop-blur-sm border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Atendimento 24h</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 backdrop-blur-sm border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Médicos Especialistas</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 backdrop-blur-sm border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Preços Acessíveis</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 backdrop-blur-sm border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Nacional + Internacional</span>
              </div>
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-fade-in-up-delayed { animation: fade-in-up 1s ease-out 0.2s both; }
        .animate-fade-in-up-delayed-2 { animation: fade-in-up 1s ease-out 0.4s both; }
        .animate-fade-in-up-delayed-3 { animation: fade-in-up 1s ease-out 0.6s both; }
        .animate-fade-in-up-delayed-4 { animation: fade-in-up 1s ease-out 0.8s both; }
      `}</style>
    </section>
  );
};

export default HeroSection;
