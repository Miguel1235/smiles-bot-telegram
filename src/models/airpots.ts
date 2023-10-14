export interface Airport {
  international: boolean;
  state: null | string;
  congenere: boolean;
  mac: null | string;
  code: string;
  city: string;
  country: string;
  iata: null | string;
  name: string;
  longitude?: number;
  latitude?: number;
  zone: string;
  g3: boolean;
}

export interface MetaInformation {
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  page: number;
  quantity: number;
}
