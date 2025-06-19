// Core entity types that align with PRD data models and database schema

// User role types
export type UserRole = 'admin' | 'editor' | 'viewer';

// Borehole status types - common status values
export type BoreholeStatus = 'active' | 'inactive' | 'needs_attention' | 'maintenance' | 'decommissioned';

// Yield test types
export type YieldTestType = 'step_test' | 'constant_test' | 'recovery_test' | 'pump_test' | 'none';

// User interface - matches profiles table
export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// Site interface - matches sites table and PRD Site/Mine Data Model
export interface Site {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// Borehole interface - matches boreholes table and PRD Borehole Data Model
export interface Borehole {
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
  // Joined data
  site?: Site;
}

// Water Level Reading interface - matches water_level_readings table and PRD Water Level Reading Data Model
export interface WaterLevelReading {
  id: string;
  borehole_id: string;
  date: string;
  water_level: number;
  created_at: string;
  updated_at: string;
  // Joined data
  borehole?: Borehole;
}

// Extended interfaces for application use

// Site with borehole count - for Site List page
export interface SiteWithBoreholeCount extends Site {
  borehole_count: number;
}

// Borehole with latest water level reading - for lists and dashboard
export interface BoreholeWithLatestReading extends Borehole {
  latest_reading?: WaterLevelReading;
  latest_water_level?: number;
  days_since_last_reading?: number;
}

// Dashboard metrics interface - as defined in PRD Dashboard requirements
export interface DashboardMetrics {
  totalBoreholes: number;
  activeBoreholes: number;
  averageWaterLevel: number;
  boreholesByStatus: Record<string, number>;
  recentReadings: number;
  alerts: number;
}

// Activity feed item for dashboard
export interface ActivityFeedItem {
  id: string;
  type: 'borehole_created' | 'borehole_updated' | 'water_level_reading' | 'site_created' | 'site_updated';
  title: string;
  description: string;
  timestamp: string;
  entity_id: string;
  entity_type: 'borehole' | 'site' | 'water_level_reading';
}

// Form data types for create/update operations

// Borehole form data - for add/edit forms
export interface BoreholeFormData {
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
}

// Site form data - for add/edit forms
export interface SiteFormData {
  name: string;
}

// Water level reading form data
export interface WaterLevelReadingFormData {
  borehole_id: string;
  date: string;
  water_level: number;
}

// Filter and search types

// Borehole filters for list page
export interface BoreholeFilters {
  search?: string;
  site_id?: string;
  status?: string;
  has_recent_readings?: boolean;
  date_range?: {
    start: string;
    end: string;
  };
}

// Site filters
export interface SiteFilters {
  search?: string;
}

// Sort options
export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

// Pagination
export interface PaginationOptions {
  page: number;
  pageSize: number;
}

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Authentication state interface
export interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, role?: UserRole) => Promise<void>;
}

// Map marker data for dashboard map
export interface MapMarker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
  latest_water_level?: number;
  last_reading_date?: string;
}

// Data import/export types
export interface ImportColumnMapping {
  csvColumn: string;
  dbField: string;
  required: boolean;
}

export interface ImportPreviewData {
  headers: string[];
  rows: string[][];
  mapping: ImportColumnMapping[];
  errors: string[];
}

export interface ExportOptions {
  tables: ('boreholes' | 'sites' | 'water_level_readings')[];
  filters?: {
    boreholes?: BoreholeFilters;
    sites?: SiteFilters;
    dateRange?: {
      start: string;
      end: string;
    };
  };
  format: 'csv' | 'json';
}

// Utility types for form validation
export type RequiredFields<T> = {
  [K in keyof T]-?: T[K];
};

export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;