import React, { useState, useEffect } from 'react';
import { 
  Smartphone, User, Star, Wallet, Trash2, Plus, Minus, MapPin, 
  Play, CheckCircle, RefreshCw, Layers, Smartphone as PhoneIcon, 
  Map, Award, ArrowRight, ShieldCheck, ChevronRight
} from 'lucide-react';
import { CollectionRequest, MaterialType } from '../types';

interface PhoneSimulatorProps {
  activeRequests: CollectionRequest[];
  onCreateRequest: (request: Omit<CollectionRequest, 'id' | 'status' | 'createdAt'>) => void;
  onAcceptRequest: (requestId: string, collectorName: string) => void;
  onCompleteRequest: (requestId: string) => void;
  materials: MaterialType[];
  logoUrl?: string;
}

export default function PhoneSimulator({
  activeRequests,
  onCreateRequest,
  onAcceptRequest,
  onCompleteRequest,
  materials,
  logoUrl
}: PhoneSimulatorProps) {
  // Mobile app current view: 'welcome' | 'dashboard' | 'create_request' | 'searching' | 'connected' | 'completed'
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard' | 'request' | 'searching' | 'connected' | 'completed'>('welcome');
  // 'vecino' (hogar) | 'reciclador' (collector)
  const [role, setRole] = useState<'vecino' | 'reciclador'>('vecino');
  
  // Create Request Form State
  const [quantities, setQuantities] = useState<Record<string, number>>({
    plastic: 5,
    paper: 8,
    glass: 0,
    metal: 2,
  });

  const [address, setAddress] = useState('Calle Linda No. 123');
  const [phone, setPhone] = useState('+1 234 567 890');
  const [submittedRequest, setSubmittedRequest] = useState<CollectionRequest | null>(null);

  // Stats for the client inside simulator
  const [clientStats, setClientStats] = useState({
    wallet: 15.40,
    kgRecycled: 42.5,
    points: 425
  });

  // Automatically monitor active request status
  useEffect(() => {
    if (submittedRequest) {
      const liveReq = activeRequests.find(r => r.id === submittedRequest.id);
      if (liveReq) {
        setSubmittedRequest(liveReq);
        if (liveReq.status === 'accepted' && currentScreen === 'searching') {
          setCurrentScreen('connected');
        } else if (liveReq.status === 'completed' && currentScreen === 'connected') {
          setCurrentScreen('completed');
          // Add reward to mock wallet
          setClientStats(prev => ({
            wallet: prev.wallet + liveReq.estimatedEarnings,
            kgRecycled: prev.kgRecycled + liveReq.items.reduce((acc, current) => acc + current.quantity, 0),
            points: prev.points + Math.round(liveReq.estimatedEarnings * 10)
          }));
        }
      } else {
        // If request was cleared or deleted
        setSubmittedRequest(null);
        if (currentScreen === 'searching' || currentScreen === 'connected') {
          setCurrentScreen('dashboard');
        }
      }
    }
  }, [activeRequests, currentScreen]);

  const handleCreateRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = Object.entries(quantities)
      .map(([mId, q]) => ({ materialId: mId, quantity: Number(q) || 0 }))
      .filter((it) => it.quantity > 0);

    if (items.length === 0) {
      alert('Por favor agrega al menos 1kg de algún material.');
      return;
    }

    // Estimate total earnings
    let est = 0;
    items.forEach(it => {
      const mat = materials.find(m => m.id === it.materialId);
      if (mat) {
        est += it.quantity * mat.valuePerUnit;
      }
    });

    const newReqId = 'req_' + Date.now();
    const mockRequest: CollectionRequest = {
      id: newReqId,
      userName: 'Piero Salvatierra',
      userAddress: address,
      userPhone: phone,
      items,
      status: 'pending',
      estimatedEarnings: Number(est.toFixed(2)),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Callback to parent container
    onCreateRequest(mockRequest);
    setSubmittedRequest(mockRequest);
    setCurrentScreen('searching');
  };

  const adjustQty = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const resetSimulator = () => {
    setCurrentScreen('dashboard');
    setQuantities({ plastic: 5, paper: 8, glass: 0, metal: 2 });
    setSubmittedRequest(null);
  };

  // Find pending request for the Reciclador view
  const pendingRequests = activeRequests.filter(r => r.status === 'pending');
  const acceptedByMe = activeRequests.filter(r => r.status === 'accepted' && r.collectorName === 'Don Carlos');

  return (
    <div className="flex flex-col items-center">
      {/* Interactive Tabs above the simulator */}
      <div className="flex bg-neutral-100 p-1.5 rounded-full mb-6 w-full max-w-sm" id="role-toggle">
        <button
          onClick={() => setRole('vecino')}
          className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 ${
            role === 'vecino' 
              ? 'bg-primary text-white shadow-sm' 
              : 'text-[#2C3E50] hover:text-primary'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Hogar / Vecino
        </button>
        <button
          onClick={() => setRole('reciclador')}
          className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 ${
            role === 'reciclador' 
              ? 'bg-primary text-white shadow-sm' 
              : 'text-[#2C3E50] hover:text-primary'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Reciclador Profesional
        </button>
      </div>

      {/* Sleek Mobile Frame */}
      <div className="relative w-[340px] h-[670px] bg-neutral-900 rounded-[50px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,109,55,0.25)] border-[5px] border-neutral-800 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
        
        {/* Notch Glass Reflection */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30" />
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-neutral-900 rounded-b-2xl z-40 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-neutral-800 mr-2" />
          <div className="w-12 h-1 rounded-full bg-neutral-800" />
        </div>

        {/* Screen Background container */}
        <div className="w-full h-full bg-[#F8F9FA] rounded-[36px] overflow-hidden relative flex flex-col font-sans text-neutral-800 pt-7">
          
          {/* Internal App Navigation Bar */}
          <div className="bg-white border-b border-neutral-100 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider font-bold text-primary">RECICLAPP MOBILE</span>
            </div>
            <div className="text-[10px] font-mono text-neutral-400">00:36 UTC</div>
          </div>

          {/* SCREEN CONTROLLER FOR CLIENT (VECINO) ROLE */}
          {role === 'vecino' && (
            <div className="flex-1 flex flex-col overflow-y-auto">
              {/* SCREEN 1: Welcome App Intro */}
              {currentScreen === 'welcome' && (
                <div className="flex-1 flex flex-col p-6 items-center justify-between text-center bg-gradient-to-b from-emerald-50/50 to-white">
                  <div className="mt-8 flex flex-col items-center">
                    {logoUrl ? (
                      <div className="w-16 h-16 rounded-[22px] overflow-hidden flex items-center justify-center mb-4 border border-primary/25 bg-white p-2 shadow-xs">
                        <img 
                          src={logoUrl} 
                          alt="Logo" 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
                        <Layers className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <h3 className="font-display font-extrabold text-2xl text-primary leading-tight">RECICLAPP</h3>
                    <p className="text-xs text-neutral-500 mt-2 font-medium">¡Bienvenido a tu futuro circular!</p>
                  </div>

                  <div className="my-4">
                    <p className="text-xs text-neutral-600 px-2">
                      La app móvil que convierte tus botellas, cartón e impacto ambiental en ingresos reales. ¡Pide un recolector cerca ahora!
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentScreen('dashboard')}
                    className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3 px-4 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    Empezar a Reciclar
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* SCREEN 2: Neighbor Home Dashboard */}
              {currentScreen === 'dashboard' && (
                <div className="flex-1 flex flex-col p-4 space-y-4">
                  {/* Hello Card with Micro Avatar */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Hola, Vecino</p>
                      <h4 className="font-display font-bold text-[#2C3E50] text-sm">Piero Salvatierra</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Wallet & Stats Dashboard Grid */}
                  <div className="bg-primary text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 opacity-10">
                      <Layers className="w-24 h-24" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] text-emerald-100 font-medium">Saldo Disponible</p>
                        <p className="text-2xl font-display font-bold">S/. {clientStats.wallet.toFixed(2)}</p>
                      </div>
                      <div className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-semibold flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {clientStats.points} EcoPoints
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/20 flex justify-between text-center">
                      <div>
                        <p className="text-[9px] text-emerald-100">Separado total</p>
                        <p className="text-xs font-bold">{clientStats.kgRecycled} kg</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-emerald-100">Recolecciones</p>
                        <p className="text-xs font-bold">7 exitosas</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-emerald-100">Nivel de Eco</p>
                        <p className="text-xs font-bold">Bronce ✨</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Request Button */}
                  <button
                    onClick={() => setCurrentScreen('request')}
                    className="w-full bg-accent hover:bg-accent-hover text-white text-xs font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-accent/15"
                  >
                    <Plus className="w-4 h-4" />
                    Solicitar Nueva Recolección
                  </button>

                  {/* Current Active requests list */}
                  <div>
                    <h5 className="text-[11px] font-bold text-[#2C3E50] uppercase tracking-wider mb-2">Solicitudes abiertas</h5>
                    {activeRequests.length === 0 ? (
                      <div className="border border-dashed border-neutral-200 rounded-xl p-4 text-center">
                        <p className="text-[10px] text-neutral-400">No hay recolecciones activas creadas.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {activeRequests.map(req => (
                          <div 
                            key={req.id} 
                            onClick={() => {
                              setSubmittedRequest(req);
                              if (req.status === 'pending') {
                                setCurrentScreen('searching');
                              } else if (req.status === 'accepted') {
                                setCurrentScreen('connected');
                              } else {
                                setCurrentScreen('completed');
                              }
                            }}
                            className="bg-white border border-neutral-100 rounded-xl p-3 shadow-2xs hover:border-primary/35 cursor-pointer transition-all flex justify-between items-center"
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  req.status === 'pending' ? 'bg-amber-400 animate-pulse' : 
                                  req.status === 'accepted' ? 'bg-blue-400 animate-pulse' : 'bg-primary'
                                }`} />
                                <span className="text-[10px] text-neutral-400">Total: S/. {req.estimatedEarnings.toFixed(2)}</span>
                              </div>
                              <p className="text-[11px] font-semibold text-neutral-700 mt-1 truncate max-w-[150px]">
                                {req.items.map(it => `${it.quantity}kg ${materials.find(m => m.id === it.materialId)?.name.split(' ')[0]}`).join(', ')}
                              </p>
                            </div>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                              req.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                              req.status === 'accepted' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {req.status === 'pending' ? 'Buscando' :
                               req.status === 'accepted' ? 'En camino' : 'Entregado'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SCREEN 3: Create Recoleccion Request */}
              {currentScreen === 'request' && (
                <form onSubmit={handleCreateRequestSubmit} className="flex-1 flex flex-col justify-between p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-[#2C3E50]">Nueva Solicitud</h4>
                      <button 
                        type="button" 
                        onClick={() => setCurrentScreen('dashboard')}
                        className="text-xs text-neutral-400 hover:text-primary underline font-medium"
                      >
                        Cancelar
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-500 leading-tight">
                      Estima la cantidad aproximada en kilogramos que tienes lista para entregar:
                    </p>

                    {/* Weight sliders/inputs */}
                    <div className="space-y-2.5">
                      {materials.map(m => (
                        <div key={m.id} className="bg-white border border-neutral-100 rounded-xl p-2.5 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-neutral-600">{m.name}</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => adjustQty(m.id, -1)}
                              className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors text-neutral-700 font-bold"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono font-bold text-neutral-800 w-8 text-center">
                              {quantities[m.id] || 0} kg
                            </span>
                            <button
                              type="button"
                              onClick={() => adjustQty(m.id, 1)}
                              className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors text-neutral-700 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Address Detail */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-neutral-400 uppercase">Ubicación de recogida</label>
                      <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="w-full bg-neutral-100 border-none rounded-lg p-2 text-xs focus:ring-1 focus:ring-primary focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 mt-4">
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-primary/20"
                    >
                      Buscar Reciclador Certificado
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* SCREEN 4: Searching Screen (Radar Animation) */}
              {currentScreen === 'searching' && (
                <div className="flex-1 flex flex-col items-center justify-between p-6 text-center">
                  <div className="mt-8 flex flex-col items-center w-full">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Algoritmo de Ruteo</p>
                    <h4 className="font-display font-extrabold text-sm text-[#2C3E50] mt-1">Conectando con Reciclador</h4>
                  </div>

                  {/* Pulsing Radar Circle */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping" />
                    <div className="absolute inset-4 bg-primary/10 rounded-full animate-pulse" />
                    <div className="absolute inset-8 bg-primary/20 rounded-full" />
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 z-10">
                      <RefreshCw className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '4s' }} />
                    </div>
                  </div>

                  <div className="space-y-4 w-full">
                    <div className="bg-white border border-neutral-100 rounded-xl p-3.5 text-left shadow-2xs">
                      <p className="text-[9px] text-[#2C3E50] font-bold uppercase tracking-wide">Tu Solicitud Estimada</p>
                      <p className="text-xl font-display font-extrabold text-primary mt-1">
                        S/. {submittedRequest?.estimatedEarnings.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-1 lines-clamp-1 truncate">
                        Recogida en {address}
                      </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                      <p className="text-[9px] text-amber-800 leading-tight">
                        <strong>¿Cómo simular?</strong> Cambia a la pestaña <strong>"Reciclador Profesional"</strong> arriba para ver y aceptar esta solicitud.
                      </p>
                    </div>

                    <button 
                      onClick={() => setCurrentScreen('dashboard')}
                      className="text-[10px] text-neutral-400 hover:text-[#2C3E50] font-bold uppercase tracking-wider"
                    >
                      Cancelar solicitud
                    </button>
                  </div>
                </div>
              )}

              {/* SCREEN 5: Connected (Collector on the go) */}
              {currentScreen === 'connected' && (
                <div className="flex-1 flex flex-col justify-between p-4 bg-white">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] text-primary font-bold">¡Reciclador En camino!</span>
                      </div>
                      <span className="text-[9px] text-neutral-400 font-mono">5 mins de ti</span>
                    </div>

                    {/* Collector Profile Card */}
                    <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                      <div className="w-12 h-12 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center font-display font-bold text-primary">
                        DC
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-[12px] font-bold text-neutral-800">Don Carlos R.</h5>
                          <div className="bg-amber-100 px-1.5 py-0.5 rounded-sm flex items-center text-[8px] font-extrabold text-amber-700 gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-amber-700" />
                            4.9
                          </div>
                        </div>
                        <p className="text-[9px] text-neutral-500 mt-0.5">Eco-Triciclo #12 • Reciclador Certificado</p>
                        <p className="text-[9.5px] font-medium text-primary mt-1 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verificado por la Alcaldía
                        </p>
                      </div>
                    </div>

                    {/* Pending delivery visual list */}
                    <div className="bg-neutral-50/50 p-3 rounded-xl border border-neutral-100 text-left space-y-1">
                      <p className="text-[8.5px] text-neutral-400 uppercase font-bold">Resumen de materiales:</p>
                      {submittedRequest?.items.map(it => {
                        const m = materials.find(x => x.id === it.materialId);
                        return (
                          <div key={it.materialId} className="flex justify-between text-[11px] font-medium">
                            <span className="text-neutral-600">• {m?.name}</span>
                            <span className="text-neutral-800 font-bold">{it.quantity} {m?.unit}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-2.5 text-center">
                      <p className="text-[9.5px] text-indigo-700 leading-snug">
                        <strong>Simula la entrega rápida :</strong><br />
                        Haz clic abajo para recibir confirmación de pesaje y saldo al instante.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        if (submittedRequest) {
                          onCompleteRequest(submittedRequest.id);
                        }
                      }}
                      className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow"
                    >
                      Simular Entrega y Transacción
                    </button>
                    <button
                      onClick={() => setCurrentScreen('dashboard')}
                      className="w-full text-center text-[10px] font-bold text-neutral-500 hover:text-neutral-800 py-1"
                    >
                      Volver al Dashboard
                    </button>
                  </div>
                </div>
              )}

              {/* SCREEN 6: Success! (Earnings & Eco stats earned) */}
              {currentScreen === 'completed' && (
                <div className="flex-1 flex flex-col justify-between p-6 text-center bg-emerald-50/30">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent border border-accent/35 mt-4">
                      <CheckCircle className="w-9 h-9" />
                    </div>

                    <div>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-wide">¡Recolección Exitosa!</p>
                      <h4 className="font-display font-extrabold text-sm text-[#2C3E50] mt-1 leading-snug">
                        Has ayudado a limpiar tu planeta
                      </h4>
                    </div>

                    <div className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-2xs space-y-3">
                      <div>
                        <p className="text-[9px] text-neutral-400 font-bold">Has Ganado</p>
                        <p className="text-2xl font-display font-extrabold text-primary">
                          +S/. {submittedRequest?.estimatedEarnings.toFixed(2) || '0.00'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 text-left">
                        <div className="bg-emerald-50/60 p-2 rounded-xl text-center">
                          <p className="text-[8.5px] text-neutral-400">Carbono Evitado</p>
                          <p className="text-[11px] font-bold text-primary">
                            {(submittedRequest?.items.reduce((acc, it) => acc + (it.quantity * (materials.find(m => m.id === it.materialId)?.co2PerUnit || 0)), 0) || 0).toFixed(1)} kg CO2
                          </p>
                        </div>
                        <div className="bg-blue-50/60 p-2 rounded-xl text-center">
                          <p className="text-[8.5px] text-neutral-400">Agua Salvada</p>
                          <p className="text-[11px] font-bold text-blue-700">
                            {(submittedRequest?.items.reduce((acc, it) => acc + (it.quantity * (materials.find(m => m.id === it.materialId)?.waterSavedPerUnit || 0)), 0) || 0).toFixed(0)} L
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetSimulator}
                    className="w-full bg-[#2C3E50] hover:bg-[#1a252f] text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow"
                  >
                    Ir a mi billetera
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SCREEN CONTROLLER FOR RECICLADOR ROLE */}
          {role === 'reciclador' && (
            <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
              
              {/* Reciclador Welcome Header */}
              <div className="flex items-center gap-3 bg-[#2C3E50] p-3.5 rounded-2xl text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-display font-bold text-accent">
                  DC
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h5 className="text-[12px] font-bold">Don Carlos Ruiz</h5>
                    <span className="bg-accent text-[#2C3E50] text-[7.5px] font-extrabold px-1 py-0.1 rounded">CERTIFICADO</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9.5px] bg-[#1a252f] px-1.5 py-0.5 rounded text-neutral-300">Triciclo #12</span>
                    <span className="text-[9.5px] text-accent font-bold">★ 4.9 (42)</span>
                  </div>
                </div>
              </div>

              {/* Pending jobs nearby map indicator */}
              <div className="bg-white border border-neutral-100 rounded-xl p-3 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">Pedidos Cercanos</span>
                  <span className="bg-amber-100 text-amber-800 text-[8px] px-1.5 py-0.5 rounded font-extrabold animate-pulse">
                    {pendingRequests.length} Disponible(s)
                  </span>
                </div>

                {pendingRequests.length === 0 ? (
                  <div className="text-center py-4 bg-neutral-50 rounded-lg">
                    <p className="text-[11px] text-neutral-500">
                      Esperando nuevas solicitudes locales...
                    </p>
                    <p className="text-[9px] text-neutral-400 mt-1">
                      (Solicita una recogida como "Vecino" en el simulador para verlo aparecer aquí)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {pendingRequests.map(req => (
                      <div key={req.id} className="border border-neutral-100 rounded-xl p-3 bg-neutral-50 space-y-2 hover:border-primary transition-all text-left">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[11px] font-bold text-[#2C3E50]">{req.userName}</span>
                            <p className="text-[9.5px] text-neutral-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-red-500" />
                              {req.userAddress}
                            </p>
                          </div>
                          <span className="text-[11.5px] font-bold text-primary">S/. {req.estimatedEarnings}</span>
                        </div>

                        <div className="bg-white p-2 rounded-lg text-xs font-mono space-y-0.5 text-neutral-600">
                          {req.items.map(it => {
                            const m = materials.find(x => x.id === it.materialId);
                            return (
                              <div key={it.materialId} className="flex justify-between text-[10px]">
                                <span>{m?.name.split(' ')[0]}</span>
                                <span>{it.quantity} kg</span>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => onAcceptRequest(req.id, 'Don Carlos')}
                          className="w-full bg-primary hover:bg-primary-hover text-white text-[10px] font-black py-2 rounded-lg transition-all uppercase tracking-wide flex items-center justify-center gap-1"
                        >
                          Aceptar Recogida
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accepted in-progress jobs */}
              {acceptedByMe.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 space-y-2 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wide">Tarea en Progreso</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  </div>

                  {acceptedByMe.map(req => (
                    <div key={req.id} className="bg-white border border-blue-100 rounded-lg p-3 space-y-2 text-xs text-neutral-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-neutral-800">Recoger de {req.userName}</p>
                          <p className="text-[9.5px] mt-0.5 font-medium">{req.userAddress}</p>
                        </div>
                        <span className="font-bold text-primary">S/. {req.estimatedEarnings}</span>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => onCompleteRequest(req.id)}
                          className="flex-1 bg-primary hover:bg-primary-hover text-white text-[9px] font-bold py-2 rounded-md transition-all uppercase tracking-wide"
                        >
                          Simular Pesado y Pagar
                        </button>
                        <button
                          onClick={() => {
                            // Cancel/remove
                            onCompleteRequest(req.id);
                          }}
                          className="bg-neutral-100 hover:bg-neutral-200 text-neutral-500 p-2 rounded-md"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-neutral-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Reciclador Impact Card */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 relative overflow-hidden text-center space-y-2">
                <span className="text-[9px] text-primary font-black uppercase tracking-wider block">Estadísticas Semanales de Don Carlos</span>
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="bg-white rounded-xl p-2.5 shadow-2xs">
                    <p className="text-[8.5px] text-neutral-400">Ingresos Totales</p>
                    <p className="text-sm font-display font-extrabold text-primary">S/. 184.20</p>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 shadow-2xs">
                    <p className="text-[8.5px] text-neutral-400">Kg Entregados</p>
                    <p className="text-sm font-display font-extrabold text-emerald-800">920 kg</p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
