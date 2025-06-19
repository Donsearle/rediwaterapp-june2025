// Application constants that align with PRD requirements

// User roles as defined in PRD Section 2
export const USER_ROLES = {
  ADMIN: 'admin' as const,
  EDITOR: 'editor' as const,
  VIEWER: 'viewer' as const,
} as const;

// Borehole status options - common values for water management
export const BOREHOLE_STATUS_OPTIONS = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
  { value: 'needs_attention', label: 'Needs Attention', color: 'red' },
  { value: 'maintenance', label: 'Under Maintenance', color: 'yellow' },
  { value: 'decommissioned', label: 'Decommissioned', color: 'gray' },
] as const;

// Yield test types
export const YIELD_TEST_OPTIONS = [
  { value: 'step_test', label: 'Step Test' },
  { value: 'constant_test', label: 'Constant Test' },
  { value: 'recovery_test', label: 'Recovery Test' },
  { value: 'pump_test', label: 'Pump Test' },
  { value: 'none', label: 'None' },
] as const;

// Map marker colors based on borehole status
export const MARKER_COLORS = {
  active: '#10b981', // green
  inactive: '#6b7280', // gray
  needs_attention: '#ef4444', // red
  maintenance: '#f59e0b', // yellow
  decommissioned: '#374151', // dark gray
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx',
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// Dashboard metrics thresholds
export const DASHBOARD_THRESHOLDS = {
  RECENT_READING_DAYS: 30, // Days to consider a reading "recent"
  LOW_WATER_LEVEL: 10, // Meters - threshold for low water level alerts
  HIGH_WATER_LEVEL: 100, // Meters - threshold for high water level alerts
} as const;

// Form validation rules
export const VALIDATION_RULES = {
  REQUIRED_FIELD: 'This field is required',
  EMAIL_INVALID: 'Invalid email address',
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MIN_LENGTH_MESSAGE: 'Password must be at least 6 characters',
  LATITUDE_MIN: -90,
  LATITUDE_MAX: 90,
  LONGITUDE_MIN: -180,
  LONGITUDE_MAX: 180,
  POSITIVE_NUMBER: 'Must be a positive number',
  DECIMAL_PLACES: 2,
} as const;

// API endpoints (relative to Supabase base URL)
export const API_ENDPOINTS = {
  PROFILES: 'profiles',
  SITES: 'sites',
  BOREHOLES: 'boreholes',
  WATER_LEVEL_READINGS: 'water_level_readings',
} as const;

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 10,
  ALLOWED_TYPES: ['text/csv', 'application/csv'],
  CSV_MIME_TYPES: ['text/csv', 'application/csv', 'text/plain'],
} as const;

// Map configuration
export const MAP_CONFIG = {
  DEFAULT_CENTER: [-26.2041, 28.0473] as [number, number], // Johannesburg, South Africa
  DEFAULT_ZOOM: 8,
  MARKER_CLUSTER_DISTANCE: 50,
  POPUP_MAX_WIDTH: 300,
} as const;

// Activity feed configuration
export const ACTIVITY_FEED = {
  MAX_ITEMS: 50,
  REFRESH_INTERVAL_MS: 30000, // 30 seconds
} as const;

// Performance thresholds as per PRD Non-Functional Requirements
export const PERFORMANCE = {
  PAGE_LOAD_TARGET_MS: 2000, // 2 seconds as specified in PRD
  API_TIMEOUT_MS: 10000, // 10 seconds
  DEBOUNCE_SEARCH_MS: 300,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  FILE_TOO_LARGE: `File size must be less than ${FILE_UPLOAD.MAX_SIZE_MB}MB`,
  INVALID_FILE_TYPE: 'Please upload a valid CSV file',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  BOREHOLE_CREATED: 'Borehole created successfully',
  BOREHOLE_UPDATED: 'Borehole updated successfully',
  BOREHOLE_DELETED: 'Borehole deleted successfully',
  SITE_CREATED: 'Site created successfully',
  SITE_UPDATED: 'Site updated successfully',
  SITE_DELETED: 'Site deleted successfully',
  DATA_IMPORTED: 'Data imported successfully',
  DATA_EXPORTED: 'Data exported successfully',
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
} as const;

// Permission matrices for role-based access
export const PERMISSIONS = {
  [USER_ROLES.ADMIN]: {
    canViewDashboard: true,
    canViewBoreholes: true,
    canCreateBoreholes: true,
    canEditBoreholes: true,
    canDeleteBoreholes: true,
    canViewSites: true,
    canCreateSites: true,
    canEditSites: true,
    canDeleteSites: true,
    canImportData: true,
    canExportData: true,
    canManageUsers: true,
    canViewSettings: true,
  },
  [USER_ROLES.EDITOR]: {
    canViewDashboard: true,
    canViewBoreholes: true,
    canCreateBoreholes: true,
    canEditBoreholes: true,
    canDeleteBoreholes: true,
    canViewSites: true,
    canCreateSites: false,
    canEditSites: false,
    canDeleteSites: false,
    canImportData: true,
    canExportData: true,
    canManageUsers: false,
    canViewSettings: false,
  },
  [USER_ROLES.VIEWER]: {
    canViewDashboard: true,
    canViewBoreholes: true,
    canCreateBoreholes: false,
    canEditBoreholes: false,
    canDeleteBoreholes: false,
    canViewSites: true,
    canCreateSites: false,
    canEditSites: false,
    canDeleteSites: false,
    canImportData: false,
    canExportData: true,
    canManageUsers: false,
    canViewSettings: false,
  },
} as const;

export type Permission = keyof typeof PERMISSIONS[typeof USER_ROLES.ADMIN];