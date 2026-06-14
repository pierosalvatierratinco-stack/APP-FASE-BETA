import { Globe, Download, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenAppStore: () => void;
  logoImage: string;
  logoText: string;
}

export default function Header({ onScrollToSection, onOpenAppStore, logoImage, logoText }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Sobre Nosotros', id: 'sobre-nosotros' },
    { name: 'Cómo Funciona', id: 'como-funciona' },
    { name: 'Beneficios', id: 'beneficios' },
    { name: 'Impacto', id: 'impacto-calc' }
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F9FBF9]/85 backdrop-blur-md border-b border-primary/10 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo with Recyclic Vector or Custom Image */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          id="brand-logo"
        >
          {logoImage ? (
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20 bg-white flex items-center justify-center shadow-md">
              <img 
                src={logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            /* Custom SVG Reciclapp Logo replicating the original design */
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/20 transition-transform duration-500 group-hover:rotate-180">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5.5 h-5.5 text-white fill-none stroke-current" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.57-.19" />
              </svg>
            </div>
          )}
          <span className="font-display font-black text-xl tracking-tight text-primary uppercase">
            {logoText || 'RECICLAPP'}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="font-sans text-sm font-medium text-neutral-600 hover:text-primary transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenAppStore}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/15 cursor-pointer transform hover:-translate-y-0.5 select-none active:scale-95"
            id="download-btn-header"
          >
            Descargar App
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-600 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-md absolute top-full left-0 w-full shadow-lg py-5 px-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 font-sans font-medium text-neutral-600 hover:text-primary transition-colors text-base"
              >
                {item.name}
              </button>
            ))}
            <hr className="border-neutral-100 my-1" />
            <button
              onClick={() => {
                onOpenAppStore();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3 px-6 rounded-full transition-all duration-300 text-center"
            >
              Descargar App
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
