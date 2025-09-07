import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section id="comece-agora" className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-20 right-16 w-16 h-16 bg-blue-200 rounded-full opacity-15 animate-float-delayed"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-float-slow"></div>
      <div className="absolute bottom-16 right-10 w-14 h-14 bg-red-200 rounded-full opacity-10 animate-float"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Box principal chamativo */}
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white py-16 px-12 rounded-[25px] shadow-2xl border-2 border-red-400 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] group relative overflow-hidden">
          {/* Overlay sutil para profundidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-[25px]"></div>
          
          <div className="text-center relative z-10">
            {/* Ícone principal */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse-slow">
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>
            
            {/* Título principal */}
            <h3 className="text-5xl font-bold mb-6 drop-shadow-lg animate-fade-in-up">
              <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                Comece Agora
              </span>
            </h3>
            
            {/* Subtítulo */}
            <p className="text-2xl mb-6 font-semibold text-pink-100 animate-fade-in-up-delayed">
              Sua saúde merece o melhor cuidado
            </p>
            
            {/* Descrição */}
            <p className="text-xl mb-12 leading-relaxed max-w-4xl mx-auto animate-fade-in-up-delayed-2">
              👉 Escolha o serviço que você precisa, clique no botão e finalize sua compra no checkout seguro.
              Seja consulta, exame, vacina, bem-estar ou cuidado para seu pet — a saúde está a um clique de distância.
            </p>
            
             {/* Botão de ação */}
             <div className="flex justify-center animate-fade-in-up-delayed-3">
               <Link
                 to="/checkout"
                 className="bg-white text-pink-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-pink-50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white flex items-center gap-3"
               >
                 <Rocket className="w-6 h-6" />
                 QUERO AGENDAR AGORA
                 <ArrowRight className="w-5 h-5" />
               </Link>
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

export default CTASection;
