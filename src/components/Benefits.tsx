import { BENEFITS } from '../data';
import { User, Award, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface BenefitsProps {
  onOpenAppStore: () => void;
}

export default function Benefits({ onOpenAppStore }: BenefitsProps) {
  return (
    <section id="beneficios" className="py-20 sm:py-28 bg-[#F9FBF9] border-b border-primary/5">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-[11px]">
            Inclusión y Progreso
          </span>
          <h2 className="font-display font-extrabold text-[#122A19] text-3xl sm:text-4xl tracking-tight leading-tight">
            Beneficios para un Ecosistema Común
          </h2>
          <p className="font-sans text-neutral-500 text-sm sm:text-base">
            Creamos un canal que dignifica a los trabajadores y recompensa activamente a los generadores para lograr un impacto real y sostenible.
          </p>
        </div>

        {/* Dual segment cards layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="bg-white border border-primary/10 p-8 rounded-3xl shadow-[0_15px_40px_-20px_rgba(18,42,25,0.06)] hover:shadow-lg hover:border-primary/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                
                {/* Header Icon Indicator */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    index === 0 ? 'bg-primary/10 text-primary' : 'bg-[#eaf5ee] text-primary'
                  }`}>
                    {index === 0 ? <User className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-[#122A19]">{benefit.title}</h3>
                    <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">{benefit.subtitle}</p>
                  </div>
                </div>

                {/* Points List */}
                <ul className="space-y-4 pt-2">
                  {benefit.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed text-left">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Internal Action Button inside each column */}
              <div className="pt-8 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  100% Certificado
                </span>
                <button
                  onClick={onOpenAppStore}
                  className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors select-none cursor-pointer"
                >
                  Unirse ahora
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
