import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO, isValid } from 'date-fns';
import { DATE_FORMATS } from './constants';
import type { UserRole, Permission } from '../types';
import { PERMISSIONS } from './constants';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Date formatting utilities
 */
export const dateUtils = {
  /**
   * Format a date string for display
   */
  formatForDisplay: (dateString: string | null | undefined): string => {
    if (!dateString) return 'N/A';
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
      return isValid(date) ? format(date, DATE_FORMATS.DISPLAY) : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  },

  /**
   * Format a date string for form inputs
   */
  formatForInput: (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
      return isValid(date) ? format(date, DATE_FORMATS.INPUT) : '';
    } catch {
      return '';
    }
  },

  /**
   * Get days between two dates
   */
  daysBetween: (startDate: string, endDate: string = new Date().toISOString()): number => {
    try {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return 0;
    }
  },

  /**
   * Check if a date is recent (within specified days)
   */
  isRecent: (dateString: string, withinDays: number = 30): boolean => {
    return dateUtils.daysBetween(dateString) <= withinDays;
  },
};

/**
 * Number formatting utilities
 */
export const numberUtils = {
  /**
   * Format a number to specified decimal places
   */
  formatDecimal: (value: number | null | undefined, decimalPlaces: number = 2): string => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    return Number(value).toFixed(decimalPlaces);
  },

  /**
   * Format a number with units
   */
  formatWithUnit: (value: number | null | undefined, unit: string, decimalPlaces: number = 2): string => {
    const formatted = numberUtils.formatDecimal(value, decimalPlaces);
    return formatted === 'N/A' ? 'N/A' : `${formatted} ${unit}`;
  },

  /**
   * Parse a string to number safely
   */
  parseNumber: (value: string | number | null | undefined): number | null => {
    if (value === null || value === undefined || value === '') return null;
    const parsed = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(parsed) ? null : parsed;
  },

  /**
   * Check if a value is a valid number within range
   */
  isValidNumber: (value: any, min?: number, max?: number): boolean => {
    const num = numberUtils.parseNumber(value);
    if (num === null) return false;
    if (min !== undefined && num < min) return false;
    if (max !== undefined && num > max) return false;
    return true;
  },
};

/**
 * String utilities
 */
export const stringUtils = {
  /**
   * Capitalize first letter of each word
   */
  capitalize: (str: string): string => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  },

  /**
   * Convert snake_case to Title Case
   */
  snakeToTitle: (str: string): string => {
    return str
      .split('_')
      .map(word => stringUtils.capitalize(word))
      .join(' ');
  },

  /**
   * Truncate string with ellipsis
   */
  truncate: (str: string, maxLength: number): string => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
  },

  /**
   * Generate a slug from a string
   */
  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
};

/**
 * Permission utilities
 */
export const permissionUtils = {
  /**
   * Check if a user role has a specific permission
   */
  hasPermission: (role: UserRole, permission: Permission): boolean => {
    return PERMISSIONS[role]?.[permission] ?? false;
  },

  /**
   * Check if a user role can perform an action on an entity
   */
  canPerformAction: (role: UserRole, action: 'create' | 'read' | 'update' | 'delete', entity: 'boreholes' | 'sites' | 'users'): boolean => {
    const permissionMap = {
      boreholes: {
        create: 'canCreateBoreholes' as Permission,
        read: 'canViewBoreholes' as Permission,
        update: 'canEditBoreholes' as Permission,
        delete: 'canDeleteBoreholes' as Permission,
      },
      sites: {
        create: 'canCreateSites' as Permission,
        read: 'canViewSites' as Permission,
        update: 'canEditSites' as Permission,
        delete: 'canDeleteSites' as Permission,
      },
      users: {
        create: 'canManageUsers' as Permission,
        read: 'canManageUsers' as Permission,
        update: 'canManageUsers' as Permission,
        delete: 'canManageUsers' as Permission,
      },
    };

    const permission = permissionMap[entity]?.[action];
    return permission ? permissionUtils.hasPermission(role, permission) : false;
  },
};

/**
 * Array utilities
 */
export const arrayUtils = {
  /**
   * Group array items by a key
   */
  groupBy: <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  /**
   * Sort array by multiple criteria
   */
  sortBy: <T>(array: T[], ...criteria: Array<(item: T) => any>): T[] => {
    return [...array].sort((a, b) => {
      for (const criterion of criteria) {
        const aVal = criterion(a);
        const bVal = criterion(b);
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
      }
      return 0;
    });
  },

  /**
   * Remove duplicates from array based on a key
   */
  uniqueBy: <T, K extends keyof T>(array: T[], key: K): T[] => {
    const seen = new Set();
    return array.filter(item => {
      const keyValue = item[key];
      if (seen.has(keyValue)) {
        return false;
      }
      seen.add(keyValue);
      return true;
    });
  },
};

/**
 * File utilities
 */
export const fileUtils = {
  /**
   * Convert file size to human readable format
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Validate file type
   */
  isValidFileType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
  },

  /**
   * Download data as CSV file
   */
  downloadCSV: (data: any[], filename: string): void => {
    if (!data.length) return;

    // Convert data to CSV
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape values that contain commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value ?? '';
        }).join(',')
      )
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};

/**
 * Validation utilities
 */
export const validationUtils = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate coordinates
   */
  isValidLatitude: (lat: number): boolean => {
    return lat >= -90 && lat <= 90;
  },

  isValidLongitude: (lng: number): boolean => {
    return lng >= -180 && lng <= 180;
  },

  /**
   * Validate required fields in an object
   */
  validateRequired: (obj: Record<string, any>, requiredFields: string[]): string[] => {
    const errors: string[] = [];
    requiredFields.forEach(field => {
      if (!obj[field] || (typeof obj[field] === 'string' && obj[field].trim() === '')) {
        errors.push(`${stringUtils.snakeToTitle(field)} is required`);
      }
    });
    return errors;
  },
};

/**
 * URL utilities
 */
export const urlUtils = {
  /**
   * Build query string from object
   */
  buildQueryString: (params: Record<string, any>): string => {
    const validParams = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    
    return validParams.length > 0 ? `?${validParams.join('&')}` : '';
  },

  /**
   * Parse query string to object
   */
  parseQueryString: (queryString: string): Record<string, string> => {
    const params: Record<string, string> = {};
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  },
};

/**
 * Error handling utilities
 */
export const errorUtils = {
  /**
   * Extract error message from various error types
   */
  getErrorMessage: (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.error?.message) return error.error.message;
    return 'An unexpected error occurred';
  },

  /**
   * Check if error is a network error
   */
  isNetworkError: (error: any): boolean => {
    return error?.code === 'NETWORK_ERROR' || 
           error?.message?.includes('fetch') ||
           error?.message?.includes('network');
  },
};