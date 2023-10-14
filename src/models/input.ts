export interface TravelInput {
  origen: string;
  destino: string;
  ida: string;
  scanDays: number;
  adultos: number;
  niños: number;
  bebes: number;
  agrupar: boolean;
  duracionMax: number;
  escalasMax: number;
  clase: string;
  asientosMin: number;
  tasas: boolean;
  awards: boolean;
  ppm: number;
}
