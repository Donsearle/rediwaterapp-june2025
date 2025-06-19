import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types - Updated to ensure complete alignment with PRD requirements
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: 'admin' | 'editor' | 'viewer';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: 'admin' | 'editor' | 'viewer';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: 'admin' | 'editor' | 'viewer';
          updated_at?: string;
        };
      };
      sites: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          updated_at?: string;
        };
      };
      boreholes: {
        Row: {
          id: string;
          name: string;
          latitude: number;
          longitude: number;
          site_id: string;
          equipment?: string;
          drilling_depth?: number;
          casing?: string;
          status: string;
          yield_test_completed?: string;
          steps_hrs?: number;
          constant_hrs?: number;
          recovery_hrs?: number;
          static_water_level_2019?: number;
          static_water_level_2024?: number;
          depth_measured?: number;
          max_yield?: number;
          current_status_and_planned?: string;
          water_strike_depths?: string;
          recommended_pump_depth?: number;
          construction_yield?: number;
          daily_abstraction?: number;
          date_tested?: string;
          water_sample_analysis?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          latitude: number;
          longitude: number;
          site_id: string;
          equipment?: string;
          drilling_depth?: number;
          casing?: string;
          status: string;
          yield_test_completed?: string;
          steps_hrs?: number;
          constant_hrs?: number;
          recovery_hrs?: number;
          static_water_level_2019?: number;
          static_water_level_2024?: number;
          depth_measured?: number;
          max_yield?: number;
          current_status_and_planned?: string;
          water_strike_depths?: string;
          recommended_pump_depth?: number;
          construction_yield?: number;
          daily_abstraction?: number;
          date_tested?: string;
          water_sample_analysis?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          latitude?: number;
          longitude?: number;
          site_id?: string;
          equipment?: string;
          drilling_depth?: number;
          casing?: string;
          status?: string;
          yield_test_completed?: string;
          steps_hrs?: number;
          constant_hrs?: number;
          recovery_hrs?: number;
          static_water_level_2019?: number;
          static_water_level_2024?: number;
          depth_measured?: number;
          max_yield?: number;
          current_status_and_planned?: string;
          water_strike_depths?: string;
          recommended_pump_depth?: number;
          construction_yield?: number;
          daily_abstraction?: number;
          date_tested?: string;
          water_sample_analysis?: string;
          updated_at?: string;
        };
      };
      water_level_readings: {
        Row: {
          id: string;
          borehole_id: string;
          date: string;
          water_level: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          borehole_id: string;
          date: string;
          water_level: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          borehole_id?: string;
          date?: string;
          water_level?: number;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Type helpers for working with Supabase
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];