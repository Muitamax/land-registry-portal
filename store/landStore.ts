import { create } from 'zustand';
import { landService } from '../services/api';

export interface Land {
  id: number;
  search_number: string;
  title_deed_number: string;
  size_acres: number;
  size_hectares: number;
  latitude: number;
  longitude: number;
  land_type: string;
  location_description: string;
  county: string;
  sub_county: string;
  ward: string;
  boundary_coordinates: Array<[number, number]>;
  current_owner: Owner | null;
  ownership_history: OwnershipHistory[];
}

export interface Owner {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  id_number: string;
  is_individual: boolean;
  business_name: string;
  acquired_date: string;
}

export interface OwnershipHistory {
  id: number;
  owner_name: string;
  business_name: string;
  is_individual: boolean;
  acquired_date: string;
  disposed_date: string | null;
  transaction_type: string;
  notes: string;
}

interface LandStore {
  lands: Land[];
  selectedLand: Land | null;
  loading: boolean;
  error: string | null;
  searchLands: (searchNumber?: string, titleDeedNumber?: string) => Promise<void>;
  selectLand: (land: Land) => void;
  clearSelection: () => void;
  clearError: () => void;
}

export const useLandStore = create<LandStore>((set) => ({
  lands: [],
  selectedLand: null,
  loading: false,
  error: null,

  searchLands: async (searchNumber?: string, titleDeedNumber?: string) => {
    set({ loading: true, error: null });
    try {
      const results = await landService.search(searchNumber, titleDeedNumber);
      set({ lands: Array.isArray(results) ? results : [results], loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message || 'Search failed',
        loading: false,
      });
    }
  },

  selectLand: (land: Land) => set({ selectedLand: land }),
  clearSelection: () => set({ selectedLand: null }),
  clearError: () => set({ error: null }),
}));
