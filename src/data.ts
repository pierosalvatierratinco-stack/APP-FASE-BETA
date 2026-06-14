import { MaterialType } from './types';

export const MATERIALS: MaterialType[] = [
  {
    id: 'plastic',
    name: 'Plásticos (PET, PEAD)',
    icon: 'Package',
    unit: 'kg',
    co2PerUnit: 1.5,
    waterSavedPerUnit: 2.0,
    treesSavedPerUnit: 0.008,
    valuePerUnit: 1.20, // Soles por kg
    color: 'emerald',
  },
  {
    id: 'paper',
    name: 'Cartón y Papel',
    icon: 'FileText',
    unit: 'kg',
    co2PerUnit: 0.9,
    waterSavedPerUnit: 26.0,
    treesSavedPerUnit: 0.017,
    valuePerUnit: 0.50, // Soles por kg
    color: 'blue',
  },
  {
    id: 'glass',
    name: 'Vidrio',
    icon: 'GlassWater',
    unit: 'kg',
    co2PerUnit: 0.3,
    waterSavedPerUnit: 1.2,
    treesSavedPerUnit: 0,
    valuePerUnit: 0.15, // Soles por kg
    color: 'amber',
  },
  {
    id: 'metal',
    name: 'Latas y Metales',
    icon: 'Sparkles',
    unit: 'kg',
    co2PerUnit: 9.0,
    waterSavedPerUnit: 40.0,
    treesSavedPerUnit: 0,
    valuePerUnit: 3.50, // Soles por kg
    color: 'neutral',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Separa tus Residuos',
    description: 'Clasifica tus materiales reciclables en casa o negocio (plásticos, papel, cartón, vidrio y metales) sin complicaciones.',
    icon: 'Layers'
  },
  {
    step: '02',
    title: 'Solicita un Reciclador',
    description: 'Usa nuestra app móvil para pedir una recolección. El algoritmo de ruteo conectará de inmediato con un reciclador local certificado.',
    icon: 'Smartphone'
  },
  {
    step: '03',
    title: 'Pesaje y Pago',
    description: 'El reciclador pesa los materiales con su báscula digital garantizando transparencia. Recibes tus ingresos al instante y acumulas eco-puntos.',
    icon: 'Wallet'
  }
];

export const BENEFITS = [
  {
    title: 'Para Vecinos y Colonos',
    subtitle: 'Consigue ingresos por limpiar tu hogar',
    points: [
      'Gana dinero o puntos canjeables por cada kilogramo de residuo entregado.',
      'Sigue el impacto real de tu huella de carbono y árboles salvados.',
      'Asegura que tus residuos se procesen en instalaciones 100% ecológicas.'
    ],
    bgClass: 'bg-emerald-50/50'
  },
  {
    title: 'Para Recicladores Profesionales',
    subtitle: 'Dignidad laboral, logística inteligente y mejores ganancias',
    points: [
      'Acceso gratuito a rutas optimizadas de recolección para ahorrar tiempo.',
      'Trato directo sin intermediarios abusivos, recibiendo precios de mercado justos.',
      'Herramientas tecnológicas y capacitación de seguridad y salud.'
    ],
    bgClass: 'bg-green-50/50'
  }
];
