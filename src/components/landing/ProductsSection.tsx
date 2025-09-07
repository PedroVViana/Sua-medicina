import React from 'react';
import { Product } from '../../types';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { 
  Stethoscope, 
  Microscope, 
  Syringe, 
  Heart, 
  PawPrint,
  Building2
} from 'lucide-react';

interface ProductsSectionProps {
  products: Product[];
  loading: boolean;
  getScheduleButton: (category: string) => string;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  loading,
  getScheduleButton
}) => {
  const { addToCart } = useCart();

  return (
    <section id="produtos" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-center mb-12">🛍️ Nossos Produtos</h3>
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
             {products.map((product) => (
               <div key={product.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                 {/* Header com gradiente baseado na categoria */}
                 <div className={`h-2 bg-gradient-to-r ${
                   product.category.toLowerCase().includes('consulta') ? 'from-blue-500 to-blue-600' :
                   product.category.toLowerCase().includes('exame') ? 'from-green-500 to-green-600' :
                   product.category.toLowerCase().includes('vacina') ? 'from-purple-500 to-purple-600' :
                   product.category.toLowerCase().includes('bem-estar') ? 'from-pink-500 to-pink-600' :
                   product.category.toLowerCase().includes('veterinário') ? 'from-orange-500 to-orange-600' :
                   'from-red-500 to-red-600'
                 }`}></div>
                 
                 <div className="p-6">
                   {/* Categoria e ícone */}
                   <div className="flex items-center justify-between mb-4">
                     <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full ${
                       product.category.toLowerCase().includes('consulta') ? 'bg-blue-100 text-blue-700' :
                       product.category.toLowerCase().includes('exame') ? 'bg-green-100 text-green-700' :
                       product.category.toLowerCase().includes('vacina') ? 'bg-purple-100 text-purple-700' :
                       product.category.toLowerCase().includes('bem-estar') ? 'bg-pink-100 text-pink-700' :
                       product.category.toLowerCase().includes('veterinário') ? 'bg-orange-100 text-orange-700' :
                       'bg-gray-100 text-gray-700'
                     }`}>
                       {product.category}
                     </span>
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                       product.category.toLowerCase().includes('consulta') ? 'bg-blue-500' :
                       product.category.toLowerCase().includes('exame') ? 'bg-green-500' :
                       product.category.toLowerCase().includes('vacina') ? 'bg-purple-500' :
                       product.category.toLowerCase().includes('bem-estar') ? 'bg-pink-500' :
                       product.category.toLowerCase().includes('veterinário') ? 'bg-orange-500' :
                       'bg-red-500'
                     }`}>
                       {product.category.toLowerCase().includes('consulta') ? (
                         <Stethoscope className="w-6 h-6 text-white" />
                       ) : product.category.toLowerCase().includes('exame') ? (
                         <Microscope className="w-6 h-6 text-white" />
                       ) : product.category.toLowerCase().includes('vacina') ? (
                         <Syringe className="w-6 h-6 text-white" />
                       ) : product.category.toLowerCase().includes('bem-estar') ? (
                         <Heart className="w-6 h-6 text-white" />
                       ) : product.category.toLowerCase().includes('veterinário') ? (
                         <PawPrint className="w-6 h-6 text-white" />
                        ) : (
                          <Building2 className="w-6 h-6 text-white" />
                        )}
                     </div>
                   </div>
                   
                   {/* Título e descrição */}
                   <h4 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                     {product.name}
                   </h4>
                   <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                     {product.description}
                   </p>
                   
                   {/* Preço destacado */}
                   <div className="mb-6">
                     <div className="flex items-baseline gap-2">
                       <span className="text-3xl font-black text-primary-600">
                         R$ {product.price.toFixed(2)}
                       </span>
                       <span className="text-sm text-gray-500 line-through opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         R$ {(product.price * 1.2).toFixed(2)}
                       </span>
                     </div>
                     <p className="text-xs text-green-600 font-semibold mt-1">
                       💰 Economia garantida
                     </p>
                   </div>
                   
                   {/* Botões de ação */}
                   <div className="space-y-3">
                     <button
                       onClick={() => addToCart(product)}
                       className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                     >
                       <span>🛒</span>
                       Adicionar ao Carrinho
                     </button>
                     <Link
                       to={`/checkout?product=${product.id}`}
                       className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                     >
                       <span>⚡</span>
                       {getScheduleButton(product.category)}
                     </Link>
                   </div>
                   
                   {/* Indicadores de qualidade */}
                   <div className="mt-6 pt-4 border-t border-gray-100">
                     <div className="flex items-center justify-between text-xs text-gray-500">
                       <div className="flex items-center gap-1">
                         <span className="text-green-500">✓</span>
                         <span>Qualidade garantida</span>
                       </div>
                       <div className="flex items-center gap-1">
                         <span className="text-blue-500">✓</span>
                         <span>Atendimento 24h</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
        ))}
      </div>
         )}
      </div>
      
      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;
