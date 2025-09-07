import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efeito de scroll para mudar a aparência do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 via-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-primary-500'
              }`}>
                Sua Medicina
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className={`transition-colors duration-300 hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              }`}
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('produtos')}
              className={`transition-colors duration-300 hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              }`}
            >
              Produtos
            </button>
            <button 
              onClick={() => scrollToSection('por-que-escolher')}
              className={`transition-colors duration-300 hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              }`}
            >
              Por Que Escolher
            </button>
            <button 
              onClick={() => scrollToSection('comece-agora')}
              className="relative bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10">Comece Agora</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 mt-2 mb-4">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left text-gray-700 hover:text-primary-600 transition-colors duration-300 py-2"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('produtos')}
                className="block w-full text-left text-gray-700 hover:text-primary-600 transition-colors duration-300 py-2"
              >
                Produtos
              </button>
              <button 
                onClick={() => scrollToSection('por-que-escolher')}
                className="block w-full text-left text-gray-700 hover:text-primary-600 transition-colors duration-300 py-2"
              >
                Por Que Escolher
              </button>
              <button 
                onClick={() => scrollToSection('comece-agora')}
                className="w-full bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
              >
                Comece Agora
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
