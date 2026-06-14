import { ShieldCheck, Target, Award } from 'lucide-react';
import userRecyclerImg from '../assets/images/user_eco_recycling_1780533544058.png';
import collectorsImg from '../assets/images/collectors_dignity_1780533558886.png';

export default function Mission() {
  return (
    <section id="sobre-nosotros" className="py-20 sm:py-28 bg-[#0B2113] border-y border-[#006d37]/20 relative overflow-hidden">
      {/* Decorative organic green glows inside deep dark focus area */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 text-center space-y-6 animate-slide-up relative z-10">
        
        {/* Centered Green Badge Pill */}
        <div className="inline-block">
          <span className="bg-[#006d37]/45 text-accent border border-accent/25 text-xs font-semibold px-4.5 py-1.5 rounded-full select-none uppercase tracking-widest font-sans">
            Nuestra Misión
          </span>
        </div>

        {/* Display Typography Header */}
        <h2 className="font-display font-extrabold text-white text-3xl sm:text-4.5xl leading-tight tracking-tight">
          Impulsando la Cultura Ambiental
        </h2>

        {/* Mission Paragraph Body */}
        <p className="font-sans text-neutral-300 text-base sm:text-[18px] leading-relaxed font-light max-w-3xl mx-auto">
          En RECICLAPP, creemos que el reciclaje debe ser un proceso sin fricciones, recompensado y transparente. Nuestra plataforma tecnológica une a ciudadanos conscientes con recicladores expertos, generando oportunidades económicas directas a sectores vulnerables mientras limpiamos activamente nuestro planeta.
        </p>

        {/* Visual impact loop using AI generated real-life photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 pb-4 max-w-4xl mx-auto text-left">
          {/* Column 1: Citizen */}
          <div className="bg-white/5 border border-white/10 rounded-[28px] overflow-hidden group hover:border-accent/30 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img 
                src={userRecyclerImg} 
                alt="Ciudadano clasificando residuos y usando la aplicación" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="bg-accent text-[#0B2113] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Fase 1: Clasificación e Ingreso
                </span>
                <h4 className="text-white font-display font-extrabold text-lg mt-1 tracking-tight">El Ciudadano Consciente</h4>
              </div>
            </div>
            <div className="p-6 space-y-2">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                Registra tus materiales reciclables (plástico, papel, vidrio, metales) desde tu hogar. Cotiza el valor exacto según las tarifas actualizadas y solicita un recolector con un solo toque.
              </p>
            </div>
          </div>

          {/* Column 2: Recycler */}
          <div className="bg-white/5 border border-white/10 rounded-[28px] overflow-hidden group hover:border-accent/30 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img 
                src={collectorsImg} 
                alt="Recicladores locales recolectando materiales con dignidad" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Fase 2: Retiro Seguro y Formalizado
                </span>
                <h4 className="text-white font-display font-extrabold text-lg mt-1 tracking-tight">Nuestra Red de Aliados</h4>
              </div>
            </div>
            <div className="p-6 space-y-2">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                Un recolector local formalizado y uniformado acude de forma segura a retirar tu reciclaje. Pesa los materiales al instante en básculas digitales autorizadas y te transfiere las recompensas correspondientes.
              </p>
            </div>
          </div>
        </div>

        {/* Shared core values icons indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 text-left max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 hover:border-accent/30 p-5 rounded-2xl flex items-start gap-3 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 flex items-center justify-center shrink-0 transition-colors">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Tecnología Circular</h4>
              <p className="text-xs text-neutral-400 mt-1">Eficiencia de ruteo para recolectar de forma automatizada y sin esperas.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-accent/30 p-5 rounded-2xl flex items-start gap-3 transition-all duration-350 group">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 flex items-center justify-center shrink-0 transition-colors">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Inclusión Social</h4>
              <p className="text-xs text-neutral-400 mt-1">Dignificamos y formalizamos laboralmente a recicladores tradicionales locales.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 hover:border-accent/30 p-5 rounded-2xl flex items-start gap-3 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 flex items-center justify-center shrink-0 transition-colors">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Transparencia</h4>
              <p className="text-xs text-neutral-400 mt-1">Pesaje digital justo y certificado de trazabilidad ecológica para empresas.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
