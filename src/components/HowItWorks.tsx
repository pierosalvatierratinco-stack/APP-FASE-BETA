import { HOW_IT_WORKS_STEPS } from '../data';
import { Layers, Smartphone, Wallet, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  
  // Icon selector helper
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-primary" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-primary" />;
      case 'Wallet':
        return <Wallet className="w-6 h-6 text-primary" />;
      default:
        return <Layers className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-[#F3F9F5] relative overflow-hidden border-b border-primary/5">
      
      {/* Structural decoration circles */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 border border-primary/15 px-3.5 py-1 rounded-full text-[11px]">
            Logística Sostenible
          </span>
          <h2 className="font-display font-extrabold text-[#122A19] text-3xl sm:text-4xl tracking-tight">
            ¿Cómo funciona RECICLAPP?
          </h2>
          <p className="font-sans text-neutral-600 text-sm sm:text-base">
            Rediseñamos la cadena de recolección de punta a punta para hacer el reciclaje tan simple como pedir un taxi desde tu smartphone.
          </p>
        </div>

        {/* 3 Step horizontal grid cards with connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 relative">
          
          {HOW_IT_WORKS_STEPS.map((stepItem, index) => (
            <div 
              key={stepItem.step} 
              className="bg-white border border-primary/10 p-8 rounded-3xl shadow-[0_15px_40px_-20px_rgba(18,42,25,0.06)] hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Highlight background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              
              <div className="relative z-10 space-y-6">
                
                {/* Header item with step number and icon */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {renderIcon(stepItem.icon)}
                  </div>
                  <span className="font-display font-black text-4xl text-[#122A19]/10 group-hover:text-primary/15 transition-colors duration-300 select-none">
                    {stepItem.step}
                  </span>
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-[18px] text-[#122A19]">
                    {stepItem.title}
                  </h3>
                  <p className="font-sans text-neutral-500 text-sm leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

              </div>

              {/* Arrow Connector for desktop */}
              {index < 2 && (
                <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-primary/10 shadow-sm items-center justify-center pointer-events-none group-hover:border-primary/45 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors" />
                </div>
              )}

            </div>
          ))}

        </div>

        {/* Dynamic call to action prompt under steps */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary-hover rounded-[32px] p-8 sm:p-10 shadow-lg text-white max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-display font-bold text-lg">¿Listo para probarlo tú mismo?</h4>
            <p className="text-xs text-emerald-100 font-sans">Utiliza el simulador de arriba para experimentar el ruteo de inmediato.</p>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('role-toggle');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="bg-white text-primary hover:bg-neutral-50 font-bold text-xs py-3.5 px-6 rounded-full cursor-pointer transition-colors shadow-md shrink-0 flex items-center gap-1.5"
          >
            Probar simulador interactivo
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
