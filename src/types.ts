export interface MaterialType {
  id: string;
  name: string;
  icon: string;
  unit: string;
  co2PerUnit: number; // kg CO2 avoided per kg
  waterSavedPerUnit: number; // Liters of water saved per kg
  treesSavedPerUnit: number; // Tree fraction saved per kg
  valuePerUnit: number; // Estimated local currency paid per kg (e.g. USD or equivalent)
  color: string;
}

export type CollectionStatus = 'pending' | 'accepted' | 'completed';

export interface CollectionRequest {
  id: string;
  userName: string;
  userAddress: string;
  userPhone: string;
  items: { materialId: string; quantity: number }[];
  status: CollectionStatus;
  collectorName?: string;
  collectorPhone?: string;
  estimatedEarnings: number;
  createdAt: string;
}

export interface ImpactStats {
  totalKg: number;
  totalCO2: number;
  totalWater: number;
  totalTrees: number;
  totalEarnings: number;
}


