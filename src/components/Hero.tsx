import { Play, Download, Smartphone, ArrowRight, Sparkles } from 'lucide-react';
import PhoneSimulator from './PhoneSimulator';
import { CollectionRequest, MaterialType } from '../types';

interface HeroProps {
  activeRequests: CollectionRequest[];
  onCreateRequest: (request: Omit<CollectionRequest, 'id' | 'status' | 'createdAt'>) => void;
  onAcceptRequest: (requestId: string, collectorName: string) => void;
  onCompleteRequest: (requestId: string) => void;
  onOpenAppStore: () => void;
  logoText: string;
  materials: MaterialType[];
  logoUrl?: string;
}

export default function Hero({
  activeRequests,
  onCreateRequest,
  onAcceptRequest,
  onCompleteRequest,
  onOpenAppStore,
  logoText,
  materials,
  logoUrl
}: HeroProps) {
  
  const handleScrollToSimulator = () => {
    const el = document.getElementById('role-toggle');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // highlight effect or bounce role selection
      el.classList.add('animate-bounce');
      setTimeout(() => el.classList.remove('animate-bounce'), 1000);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E6F4EA] via-[#F9FBF9] to-white py-12 lg:py-20">
      
      {/* Decorative ambient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Brand Messages */}
        <div className="lg:col-span-7 space-y-6 text-left transform duration-700 animate-slide-up">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans text-xs font-semibold animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Empresa de base tecnológica certificada
          </div>

          <div className="space-y-4">
            <h1 className="font-display font-extrabold text-[#006d37] text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
              {logoText || 'RECICLAPP'}
            </h1>
            <h2 className="font-display font-extrabold text-[#122A19] text-3xl sm:text-4.5xl lg:text-[45px] tracking-tight leading-tight">
              Más que una obligación, una necesidad
            </h2>
          </div>

          <p className="font-sans text-[#122A19]/80 text-base sm:text-lg leading-relaxed max-w-xl">
            Conectamos a hogares y empresas con recicladores locales. Transforma tus residuos en ingresos, promueve la cultura ambiental y construye un futuro sostenible, todo desde tu smartphone.
          </p>

          {/* Call to Actions matching image color layout */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={onOpenAppStore}
              className="bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3 px-8 rounded-full shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 select-none active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Descargar App
            </button>
            
            <button
              onClick={handleScrollToSimulator}
              className="border-2 border-primary text-primary hover:bg-primary/5 text-sm font-bold py-2.5 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 select-none active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-primary stroke-none" />
              Ver cómo funciona
            </button>
          </div>

          {/* Mini impact metrics bar under CTA */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-primary/10 max-w-lg">
            <div>
              <p className="text-xl sm:text-2xl font-display font-black text-primary">+20K</p>
              <p className="text-xs text-neutral-500 font-medium font-sans">Usuarios Activos</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-display font-black text-[#122A19]">+150 Ton</p>
              <p className="text-xs text-neutral-500 font-medium font-sans">Residuos Reciclados</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-display font-black text-[#27ae60]">98.5%</p>
              <p className="text-xs text-neutral-500 font-medium font-sans">Satisfacción Social</p>
            </div>
          </div>

        </div>

        {/* Right Side: Smartphone Interactive Simulator Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md flex flex-col items-center">
            
            {/* Visual background rings to highlight phone */}
            <div className="absolute inset-0 bg-primary/5 rounded-full filter blur-2xl transform -translate-y-6 -z-10 animate-pulse" />
            
            {/* Real Interactive Phone Dashboard Component */}
            <PhoneSimulator
              activeRequests={activeRequests}
              onCreateRequest={onCreateRequest}
              onAcceptRequest={onAcceptRequest}
              onCompleteRequest={onCompleteRequest}
              materials={materials}
              logoUrl={logoUrl}
            />

            {/* Interactive hint label */}
            <p className="text-xs text-neutral-400 mt-4 flex items-center gap-1 font-sans">
              <Smartphone className="w-3.5 h-3.5 animate-bounce" />
              ¡Haz clic en la app para simular interacciones reales!
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
