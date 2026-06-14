/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Mission from './components/Mission';
import HowItWorks from './components/HowItWorks';
import ImpactCalculator from './components/ImpactCalculator';
import Benefits from './components/Benefits';
import Footer from './components/Footer';
import DownloadModal from './components/DownloadModal';
import { CollectionRequest, MaterialType } from './types';
import { MATERIALS } from './data';
import { Settings, Image, Check, RotateCcw, Sparkles, Lock, X } from 'lucide-react';
import defaultLogo from './assets/images/reciclapp_clean_logo_1780538566140.png';

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  
  // Persistent Brand Studio config state
  const [logoUrl, setLogoUrl] = useState<string>(() => {
    const saved = localStorage.getItem('reciclapp_logo_url');
    if (!saved || saved.includes('reciclapp_logo_1780361396007.png') || saved.includes('reciclapp_new_logo_1780538095945.png')) {
      return defaultLogo;
    }
    return saved;
  });
  const [logoText, setLogoText] = useState<string>(() => localStorage.getItem('reciclapp_logo_text') || 'RECICLAPP');
  const [showConfig, setShowConfig] = useState(false);
  const [materials, setMaterials] = useState<MaterialType[]>(() => {
    const saved = localStorage.getItem('reciclapp_materials');
    return saved ? JSON.parse(saved) : MATERIALS;
  });
  const [contactPhone, setContactPhone] = useState<string>(() => localStorage.getItem('reciclapp_contact_phone') || '+51 987 654 321');
  const [contactEmail, setContactEmail] = useState<string>(() => localStorage.getItem('reciclapp_contact_email') || 'contacto@reciclapp.com');
  const [socialFacebook, setSocialFacebook] = useState<string>(() => localStorage.getItem('reciclapp_social_facebook') || 'https://facebook.com/reciclapp');
  const [socialInstagram, setSocialInstagram] = useState<string>(() => localStorage.getItem('reciclapp_social_instagram') || 'https://instagram.com/reciclapp');
  const [socialLinkedin, setSocialLinkedin] = useState<string>(() => localStorage.getItem('reciclapp_social_linkedin') || 'https://linkedin.com/company/reciclapp');
  const [socialTwitter, setSocialTwitter] = useState<string>(() => localStorage.getItem('reciclapp_social_twitter') || 'https://x.com/reciclapp');
  const [socialTiktok, setSocialTiktok] = useState<string>(() => localStorage.getItem('reciclapp_social_tiktok') || 'https://tiktok.com/@reciclapp');

  // Synchronize Brand Studio settings to localStorage automatically when changed
  React.useEffect(() => {
    localStorage.setItem('reciclapp_logo_url', logoUrl);
  }, [logoUrl]);

  React.useEffect(() => {
    localStorage.setItem('reciclapp_logo_text', logoText);
  }, [logoText]);

  React.useEffect(() => {
    localStorage.setItem('reciclapp_materials', JSON.stringify(materials));
  }, [materials]);

  React.useEffect(() => {
    localStorage.setItem('reciclapp_contact_phone', contactPhone);
  }, [contactPhone]);

  React.useEffect(() => {
    localStorage.setItem('reciclapp_contact_email', contactEmail);
  }, [contactEmail]);

  React.useEffect(() => {
    localStorage.setItem('reciclapp_social_facebook', socialFacebook);
  }, [socialFacebook]);

  React.useEffect(() => {
    localStorage.setItem('reciclapp_social_instagram', socialInstagram);
  }, [socialInstagram]);

  React.useEffect(() => {
    localStorage.setItem('reciclapp_social_linkedin', socialLinkedin);
  }, [socialLinkedin]);

  React.useEffect(() => {
    localStorage.setItem('reciclapp_social_twitter', socialTwitter);
  }, [socialTwitter]);

  React.useEffect(() => {
    localStorage.setItem('reciclapp_social_tiktok', socialTiktok);
  }, [socialTiktok]);

  // Hidden admin/creator toggle state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const saved = localStorage.getItem('reciclapp_is_admin');
    return saved === 'true' || 
           window.location.search.includes('admin') || 
           window.location.hash.includes('admin');
  });

  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminPasscodeInput, setAdminPasscodeInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  
  // Snapshots for canceling brand changes safely without keeping residues
  const [snapshot, setSnapshot] = useState<{
    logoUrl: string;
    logoText: string;
    materials: MaterialType[];
    contactPhone: string;
    socialTiktok: string;
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleToggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setShowConfig(false);
      localStorage.removeItem('reciclapp_is_admin');
      showNotification('Ha salido de Modo Administrador de forma segura. El Estudio de Marca ya no está visible.', 'info');
    } else {
      setAdminPasscodeInput('');
      setAdminError('');
      setShowAdminLoginModal(true);
    }
  };

  const handleVerifyAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = adminPasscodeInput.trim();
    // Accept only the exact requested passcode "210507"
    if (cleanPass === '210507') {
      setIsAdmin(true);
      localStorage.setItem('reciclapp_is_admin', 'true');
      setShowAdminLoginModal(false);
      setShowConfig(true); // Open configuration studio right away!
      
      // Capture current settings state for cancellation rollback
      setSnapshot({
        logoUrl,
        logoText,
        materials: JSON.parse(JSON.stringify(materials)),
        contactPhone,
        socialTiktok
      });

      showNotification('¡Acceso concedido! Panel de Estudio de Marca activado.', 'success');
    } else {
      setAdminError('Código incorrecto. Ingrese el código secreto autorizado.');
    }
  };

  const handleSaveAndLogout = () => {
    setIsAdmin(false);
    setShowConfig(false);
    localStorage.removeItem('reciclapp_is_admin'); // lock again
    setSnapshot(null);
    showNotification('¡Cambios guardados con éxito! Sesión de administrador cerrada por seguridad.', 'success');
  };

  const handleCancelConfig = () => {
    if (snapshot) {
      setLogoUrl(snapshot.logoUrl);
      setLogoText(snapshot.logoText);
      setMaterials(snapshot.materials);
      setContactPhone(snapshot.contactPhone);
      setSocialTiktok(snapshot.socialTiktok);
    }
    setIsAdmin(false);
    setShowConfig(false);
    localStorage.removeItem('reciclapp_is_admin'); // lock again
    setSnapshot(null);
    showNotification('Configuración cancelada. Se han restaurado los valores anteriores.', 'info');
  };

  const handleRestoreDefaultsAndLogout = () => {
    setLogoUrl(defaultLogo);
    setLogoText('RECICLAPP');
    setMaterials(MATERIALS);
    setContactPhone('+51 987 654 321');
    setContactEmail('contacto@reciclapp.com');
    setSocialFacebook('https://facebook.com/reciclapp');
    setSocialInstagram('https://instagram.com/reciclapp');
    setSocialLinkedin('https://linkedin.com/company/reciclapp');
    setSocialTwitter('https://x.com/reciclapp');
    setSocialTiktok('https://tiktok.com/@reciclapp');

    setIsAdmin(false);
    setShowConfig(false);
    localStorage.removeItem('reciclapp_is_admin'); // lock again
    setSnapshot(null);
    showNotification('Valores predeterminados restaurados y guardados. Sesión cerrada por seguridad.', 'success');
  };

  const [activeRequests, setActiveRequests] = useState<CollectionRequest[]>([
    {
      id: 'demo_req_1',
      userName: 'Marcela Gómez',
      userAddress: 'Av. El Sol 405, Condominio Praderas',
      userPhone: '+1 555 987 654',
      items: [
        { materialId: 'plastic', quantity: 12 },
        { materialId: 'paper', quantity: 20 }
      ],
      status: 'pending',
      estimatedEarnings: 24.40, // 12kg plastic * 1.20 + 20kg paper * 0.50 in Peruvian Soles
      createdAt: '10:15 AM'
    }
  ]);

  const handleOpenAppStore = () => {
    setDownloadModalOpen(true);
  };

  const handleCloseAppStore = () => {
    setDownloadModalOpen(false);
  };

  const handleCreateRequest = (newReq: Omit<CollectionRequest, 'id' | 'status' | 'createdAt'>) => {
    const freshReq: CollectionRequest = {
      ...newReq,
      id: `req_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActiveRequests((prev) => [freshReq, ...prev]);
  };

  const handleAcceptRequest = (requestId: string, collectorName: string) => {
    setActiveRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: 'accepted',
              collectorName,
              collectorPhone: '+1 234 567 890'
            }
          : req
      )
    );
  };

  const handleCompleteRequest = (requestId: string) => {
    setActiveRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: 'completed'
            }
          : req
      )
    );
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const logoPresets = [
    {
      name: 'Planeta Limpio',
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150',
      description: 'Hojas verdes'
    },
    {
      name: 'Gota de Vida',
      url: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=150',
      description: 'Luz solar eco'
    },
    {
      name: 'Brote Circular',
      url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=150',
      description: 'Gota pura'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FBF9] text-[#112211] antialiased flex flex-col font-sans relative">
      {/* Absolute top grid line line tracking */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 pointer-events-none" />

      {/* Global Header */}
      <Header 
        onScrollToSection={handleScrollToSection} 
        onOpenAppStore={handleOpenAppStore} 
        logoImage={logoUrl}
        logoText={logoText}
      />

      {/* Landing Hero Area with Phone Simulator */}
      <main className="flex-1">
        <Hero
          activeRequests={activeRequests}
          onCreateRequest={handleCreateRequest}
          onAcceptRequest={handleAcceptRequest}
          onCompleteRequest={handleCompleteRequest}
          onOpenAppStore={handleOpenAppStore}
          logoText={logoText}
          materials={materials}
          logoUrl={logoUrl}
        />

        {/* Brand Mission Badge Statement */}
        <Mission />

        {/* Step-by-Step Logistics Walkthrough */}
        <HowItWorks />

        {/* Dynamic Calculator Widget Area */}
        <ImpactCalculator materials={materials} />

        {/* Dual benefits lists column segment */}
        <Benefits onOpenAppStore={handleOpenAppStore} />
      </main>

      {/* Footer Details details listings */}
      <Footer 
        logoImage={logoUrl}
        logoText={logoText}
        contactEmail={contactEmail}
        contactPhone={contactPhone}
        socialFacebook={socialFacebook}
        socialInstagram={socialInstagram}
        socialLinkedin={socialLinkedin}
        socialTwitter={socialTwitter}
        socialTiktok={socialTiktok}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
      />

      {/* Interactive download modal windows installation simulated flow */}
      <DownloadModal 
        isOpen={downloadModalOpen} 
        onClose={handleCloseAppStore} 
      />

      {/* Brand Personalization Studio Widget - Center Panel or Slide-out drawer - ONLY VISIBLE TO LOGGED IN ADMIN */}
      {isAdmin && showConfig && (
        <>
          {/* Glass background overlay */}
          <div 
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs z-50 transition-opacity animate-fade-in"
            onClick={handleCancelConfig}
          />
          
          <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white border-l border-neutral-200 shadow-2xl z-50 p-6 flex flex-col justify-between animate-slide-in-right">
            
            {/* Header section */}
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100 mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <div>
                  <h4 className="font-display font-black text-sm text-neutral-800 uppercase tracking-wider">Estudio de Marca</h4>
                  <p className="text-[10px] text-neutral-400 font-sans">Ajustes visuales y tarifario</p>
                </div>
              </div>
              <button
                onClick={handleCancelConfig}
                className="text-neutral-400 hover:text-neutral-800 p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
                title="Cerrar sin guardar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-5 scrollbar-thin pb-6 text-left">
              
              {/* Brand Name Input */}
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider block block">Nombre de la Empresa</label>
                <input
                  type="text"
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  className="w-full bg-neutral-50 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-xs font-sans font-semibold focus:ring-2 focus:ring-primary focus:bg-white text-neutral-800 uppercase focus:outline-none"
                  placeholder="Ej. RECICLAPP"
                />
              </div>

              {/* Paste URL Input */}
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider block">Tu Propio Logo (URL de Imagen)</label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full bg-neutral-50 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-xs font-sans focus:ring-2 focus:ring-primary focus:bg-white text-neutral-700 focus:outline-none"
                  placeholder="Pega enlace de logo (png, jpg, svg)"
                />
                <p className="text-[9.5px] text-neutral-400 leading-normal">
                  Sugerencia: Sube tu imagen a ImgBB, imgur, o copia cualquier enlace y pégalo aquí.
                </p>
              </div>

              {/* Preset examples selection */}
              <div className="space-y-2">
                <label className="text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider block">O elige un preset ecológico:</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {logoPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setLogoUrl(preset.url)}
                      className={`relative rounded-xl overflow-hidden aspect-square border ${
                        logoUrl === preset.url ? 'border-primary ring-2 ring-primary/20' : 'border-neutral-200'
                      } hover:border-primary transition-all group cursor-pointer`}
                      title={preset.name}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#2C3E50]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[8.5px] font-bold text-white px-1 text-center truncate leading-none">{preset.name}</span>
                      </div>
                      {logoUrl === preset.url && (
                        <div className="absolute top-1 right-1 bg-primary text-white p-0.5 rounded-full">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact and Social Networks Configuration */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <label className="text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider block">Contacto y Redes Sociales</label>
                
                <div className="space-y-2.5">
                  {/* Phone */}
                  <div className="space-y-1">
                    <span className="text-[9.5px] font-bold text-neutral-500 uppercase tracking-wide block">WhatsApp / Teléfono</span>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-neutral-50 px-3 py-2 border border-neutral-200 rounded-lg text-xs font-sans text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Ej. +51 987 654 321"
                    />
                  </div>

                  {/* TikTok */}
                  <div className="space-y-1">
                    <span className="text-[9.5px] font-bold text-neutral-500 uppercase tracking-wide block font-sans">TikTok URL</span>
                    <input
                      type="text"
                      value={socialTiktok}
                      onChange={(e) => setSocialTiktok(e.target.value)}
                      className="w-full bg-neutral-50 px-3 py-2 border border-neutral-200 rounded-lg text-xs font-sans text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="tiktok.com/@usuario"
                    />
                  </div>
                </div>
              </div>

              {/* Tariff Configuration Section */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <label className="text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider block">Tarifas por Kilogramo (S/.)</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {materials.map((m) => (
                    <div key={m.id} className="bg-neutral-50 px-3 py-2.5 border border-neutral-200 rounded-xl space-y-1.5">
                      <span className="text-[9.5px] font-extrabold text-neutral-500 truncate block leading-none">{m.name.split(' (')[0]}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10.5px] font-bold text-neutral-400 font-mono">S/.</span>
                        <input
                          type="number"
                          step="0.10"
                          min="0"
                          value={m.valuePerUnit}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setMaterials((prev) =>
                              prev.map((item) =>
                                item.id === m.id ? { ...item, valuePerUnit: val } : item
                              )
                            );
                          }}
                          className="w-full bg-white px-2 py-1 border border-neutral-200 rounded-md text-xs font-mono font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Information badge */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-[10px] text-[#006d37] leading-relaxed">
                📢 <strong>Económicamente Peruano:</strong> El tarifario completo de la aplicación se ha configurado al valor del <strong>Sol Peruano (S/.)</strong>. ¡Prueba calcular y simular servicios!
              </div>

            </div>

            {/* Bottom Button Action Panel - Safe closure and logout */}
            <div className="pt-4 border-t border-neutral-100 space-y-2 mt-auto">
              <button
                onClick={handleSaveAndLogout}
                className="w-full bg-[#122A19] hover:bg-primary text-white font-sans font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Check className="w-4 h-4" />
                Guardar Cambios y Salir
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={handleRestoreDefaultsAndLogout}
                  className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-sans font-bold text-[10px] py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="Restaurar valores de fábrica"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restaurar Default
                </button>
                
                <button
                  onClick={handleCancelConfig}
                  className="flex-1 bg-neutral-50 hover:bg-neutral-200 text-neutral-500 font-sans font-semibold text-[10px] py-2.5 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>

          </div>
        </>
      )}

      {/* Custom Alert Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div className={`p-4 rounded-xl shadow-2xl border flex items-center gap-3 max-w-sm ${
            notification.type === 'success' 
              ? 'bg-[#0B2113] border-emerald-500/30 text-white' 
              : 'bg-neutral-900 border-neutral-800 text-white'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              notification.type === 'success' ? 'bg-primary/20 text-accent' : 'bg-white/10 text-neutral-400'
            }`}>
              {notification.type === 'success' ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div className="text-left">
              <p className="text-xs font-sans font-bold leading-tight">{notification.message}</p>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="text-neutral-400 hover:text-white ml-2 text-xs cursor-pointer p-1 rounded hover:bg-white/5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* HTML Custom Admin Access Modal Dialog (No more browser prompt blocks!) */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 w-full max-w-md rounded-[32px] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-xl pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-neutral-900 mt-3">Estudio de Marca</h3>
                <p className="text-[11px] text-neutral-400 font-sans leading-none">Acceso exclusivo para el Administrador del Sitio</p>
              </div>
              <button 
                onClick={() => setShowAdminLoginModal(false)}
                className="text-neutral-400 hover:text-neutral-800 p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleVerifyAdmin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest block font-sans">Código de Acceso</label>
                <input
                  type="password"
                  value={adminPasscodeInput}
                  onChange={(e) => setAdminPasscodeInput(e.target.value)}
                  placeholder="Por ejemplo: admin"
                  className="w-full bg-neutral-50 px-4 py-3 border border-neutral-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-800"
                  autoFocus
                />
                <p className="text-[10px] text-neutral-400 leading-normal">
                  💡 Ingrese el código secreto autorizado <strong>210507</strong> para activar y configurar el Estudio de Marca.
                </p>
              </div>

              {adminError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold py-2 px-3 rounded-lg leading-snug">
                  ⚠ {adminError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminLoginModal(false)}
                  className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-sans font-bold text-xs py-3 rounded-xl transition-all cursor-pointer text-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#122A19] hover:bg-primary-hover text-[#FDFDFD] font-sans font-bold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer text-center"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

