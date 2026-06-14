import React, { useState } from 'react';
import { Leaf, Droplets, Flame, Smile, Wallet, AlertCircle, ArrowUpRight } from 'lucide-react';
import { MaterialType } from '../types';

interface ImpactCalculatorProps {
  materials: MaterialType[];
}

export default function ImpactCalculator({ materials }: ImpactCalculatorProps) {
  // Kilogram weights for each material
  const [weights, setWeights] = useState<Record<string, number>>({
    plastic: 25,
    paper: 35,
    glass: 10,
    metal: 5,
  });

  const handleSliderChange = (id: string, val: number) => {
    setWeights((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  // Calculations
  const calculateTotalEarnings = () => {
    return materials.reduce((sum, m) => {
      const qty = weights[m.id] || 0;
      return sum + qty * m.valuePerUnit;
    }, 0);
  };

  const calculateTotalCO2 = () => {
    return materials.reduce((sum, m) => {
      const qty = weights[m.id] || 0;
      return sum + qty * m.co2PerUnit;
    }, 0);
  };

  const calculateTotalWater = () => {
    return materials.reduce((sum, m) => {
      const qty = weights[m.id] || 0;
      return sum + qty * m.waterSavedPerUnit;
    }, 0);
  };

  const calculateTotalTrees = () => {
    return materials.reduce((sum, m) => {
      const qty = weights[m.id] || 0;
      return sum + qty * m.treesSavedPerUnit;
    }, 0);
  };

  const handleScrollToRequest = () => {
    const el = document.getElementById('role-toggle');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="impacto-calc" className="py-20 sm:py-28 bg-white border-b border-primary/5">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#006d37] tracking-widest uppercase bg-green-100/60 border border-green-200 px-3.5 py-1 rounded-full text-[11px]">
            Calculadora Social y Ecológica
          </span>
          <h2 className="font-display font-extrabold text-[#122A19] text-3xl sm:text-4xl tracking-tight">
            Calcula tu Impacto Verde
          </h2>
          <p className="font-sans text-neutral-500 text-sm sm:text-base">
            Estima tus ingresos y el equivalente de CO2, agua dulce limpia y árboles salvados por separar correctamente tus residuos en casa.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Sliders Input Panel */}
          <div className="lg:col-span-7 bg-[#F3F9F5]/40 border border-primary/10 p-6 sm:p-8 rounded-[32px] flex flex-col justify-between space-y-6 shadow-2xs">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-[#122A19]">Configura tus Pesos</h3>
              <p className="text-xs text-neutral-500 font-sans">Mueve los deslizadores de abajo para simular tu volumen mensual:</p>
            </div>

            <div className="space-y-6">
              {materials.map((m) => {
                const colors: Record<string, string> = {
                  emerald: 'accent',
                  blue: 'blue-500',
                  amber: 'amber-500',
                  neutral: 'neutral-600',
                };
                
                return (
                  <div key={m.id} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-sans font-semibold text-[#122A19]">{m.name}</span>
                      <span className="font-mono text-xs font-bold text-[#006d37]">
                        {weights[m.id]} kg
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={weights[m.id]}
                        onChange={(e) => handleSliderChange(m.id, parseInt(e.target.value) || 0)}
                        className="flex-1 accent-primary h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-amber-50 border border-amber-200/60 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-normal">
                Precios de remisión estimados de acuerdo con el promedio de centros de valorización locales. El monto final es acreditado por transferencia o eco-puntos canjeables.
              </p>
            </div>
          </div>

          {/* Real-time Environmental HUD stats displays */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B2113] to-[#143B21] text-white p-6 sm:p-8 rounded-[32px] shadow-lg flex flex-col justify-between space-y-8 relative overflow-hidden border border-emerald-950/25">
            {/* Visual shine */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-primary/20 rounded-full filter blur-2xl pointer-events-none animate-pulse" />

            <div className="space-y-1">
              <span className="text-[10px] text-accent font-black uppercase tracking-widest font-sans">IMPACTO PROMEDIO</span>
              <h3 className="font-display font-extrabold text-2xl text-white">Tu Logro Ecológico</h3>
            </div>

            {/* Micro counters section */}
            <div className="space-y-4">
              
              {/* Earnings Indicator Card */}
              <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-300 font-medium font-sans animate-pulse">Ganancias Estimadas</p>
                    <p className="text-xl font-display font-bold text-accent">S/. {calculateTotalEarnings().toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right text-[10px] text-neutral-300">
                  <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-white font-bold">~{Math.round(calculateTotalEarnings() * 10)} XP</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* CO2 Display */}
                <div className="bg-white/5 p-3.5 rounded-xl text-center space-y-1 border border-white/5">
                  <Flame className="w-5 h-5 text-amber-400 mx-auto" />
                  <p className="text-[10px] text-neutral-300 font-sans">CO2 Evitado</p>
                  <p className="text-sm font-display font-bold">{calculateTotalCO2().toFixed(1)} kg</p>
                </div>

                {/* Water Display */}
                <div className="bg-white/5 p-3.5 rounded-xl text-center space-y-1 border border-white/5">
                  <Droplets className="w-5 h-5 text-blue-400 mx-auto" />
                  <p className="text-[10px] text-neutral-300 font-sans">Agua Ahorrada</p>
                  <p className="text-sm font-display font-bold">{calculateTotalWater().toFixed(0)} L</p>
                </div>

                {/* Trees Display */}
                <div className="bg-white/5 p-3.5 rounded-xl text-center space-y-1 border border-white/5">
                  <Leaf className="w-5 h-5 text-accent mx-auto" />
                  <p className="text-[10px] text-neutral-300 font-sans">Árboles Salvados</p>
                  <p className="text-sm font-display font-bold">{calculateTotalTrees().toFixed(2)}</p>
                </div>
              </div>

            </div>

            <button
              onClick={handleScrollToRequest}
              className="w-full bg-accent hover:bg-accent-hover text-[#0B2113] text-xs font-black py-4.5 rounded-2xl transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg active:scale-95"
            >
              Convertir en Solicitud Real
              <ArrowUpRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
