import { useState, useEffect } from 'react';
import { X, Smartphone, ArrowRight, CheckCircle, RefreshCw, Award, LogIn } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (downloading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloading(false);
            setInstalled(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [downloading]);

  if (!isOpen) return null;

  const handleInstallClick = () => {
    setDownloading(true);
    setProgress(0);
    setInstalled(false);
  };

  const resetInstallState = () => {
    onClose();
    // Keep small delay to reset internal state gracefully
    setTimeout(() => {
      setDownloading(false);
      setProgress(0);
      setInstalled(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      
      {/* Container Card */}
      <div className="bg-white rounded-[32px] w-full max-w-md p-6 sm:p-8 border border-neutral-100 shadow-2xl relative text-center">
        
        {/* Absolute Close Button */}
        <button 
          onClick={resetInstallState}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-[#2C3E50] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6 mt-2">
          
          {/* Logo element */}
          <div className="w-14 h-14 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary">
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 text-primary fill-none stroke-current" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.57-.19" />
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-extrabold text-[#2C3E50] text-xl">
              Descarga la App Móvil
            </h3>
            <p className="text-xs text-neutral-500 font-sans max-w-xs mx-auto leading-normal">
              Comienza a vender tus residuos de plástico, papel, vidrio y latas en segundos. ¡Disponible para iOS y Android!
            </p>
          </div>

          {!downloading && !installed && (
            <div className="space-y-4">
              {/* App Platforms Mocks buttons */}
              <div className="grid grid-cols-2 gap-3.5">
                
                {/* Apple App Store */}
                <button 
                  onClick={handleInstallClick}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white p-3.5 rounded-2xl flex flex-col items-center gap-1 transition-all group select-none active:scale-95 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white group-hover:scale-105 transition-transform" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.12 1.84-.98 2.94 1.07.08 2.15-.52 2.81-1.33z"/>
                  </svg>
                  <span className="text-[10px] text-neutral-400 font-sans mt-1">App Store</span>
                  <span className="text-xs font-bold font-sans">iOS Apple</span>
                </button>

                {/* Google Play Store */}
                <button 
                  onClick={handleInstallClick}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white p-3.5 rounded-2xl flex flex-col items-center gap-1 transition-all group select-none active:scale-95 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white group-hover:scale-105 transition-transform" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5.25c0-.69.56-1.25 1.25-1.25H10L21 12 10 20H4.25c-.69 0-1.25-.56-1.25-1.25V5.25zM10 6v12l8.25-6L10 6z"/>
                  </svg>
                  <span className="text-[10px] text-neutral-400 font-sans mt-1">Google Play</span>
                  <span className="text-xs font-bold font-sans">Android APK</span>
                </button>

              </div>

              {/* Install simulated within browser CTA */}
              <button
                onClick={handleInstallClick}
                className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow"
              >
                Instalación Rápida Simulada
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Downloading Progress Section */}
          {downloading && (
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold font-sans text-[#2C3E50]">
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                  Descargando Recursos...
                </span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-200" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-neutral-400 font-sans">Esto simula de forma interactiva la instalación en segundo plano.</p>
            </div>
          )}

          {/* Installed Success Section */}
          {installed && (
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent mb-2">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-sm text-[#2C3E50]">
                ¡Instalado con Éxito!
              </h4>
              <p className="text-xs text-neutral-500 font-sans max-w-sm mx-auto leading-normal">
                La aplicación ya se encuentra lista y simulada. Elige la pestaña <strong>"Hogar / Vecino"</strong> de la esquina derecha para jugar a pedir un recolector.
              </p>
              
              <button
                onClick={() => {
                  resetInstallState();
                  // scroll to simulator
                  const el = document.getElementById('role-toggle');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3.5 rounded-2xl transition-all shadow"
              >
                Ir al Simulador Móvil
              </button>
            </div>
          )}

          {/* Safety note footer */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-1 text-[10px] text-neutral-400 font-sans">
            <Award className="w-3.5 h-3.5 text-primary" />
            Empresa Homologada por Entidades Ambientales
          </div>

        </div>

      </div>

    </div>
  );
}
