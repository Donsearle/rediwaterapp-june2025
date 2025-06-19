import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthStore {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, role?: string) => Promise<void>;
  initialize: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,

  initialize: async () => {
    try {
      console.log('Initializing auth store...');
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        set({ user: null, loading: false });
        return;
      }
      
      if (session?.user) {
        console.log('Found session, fetching profile...');
        
        // Fetch user profile with role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          set({ user: null, loading: false });
          return;
        }

        if (profile) {
          console.log('Profile found:', profile);
          set({
            user: {
              id: session.user.id,
              email: session.user.email!,
              role: profile.role,
              created_at: profile.created_at,
              updated_at: profile.updated_at,
            },
            loading: false,
          });
        }
      } else {
        console.log('No session found');
        set({ user: null, loading: false });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            set({
              user: {
                id: session.user.id,
                email: session.user.email!,
                role: profile.role,
                created_at: profile.created_at,
                updated_at: profile.updated_at,
              },
              loading: false,
            });
          }
        } else if (event === 'SIGNED_OUT') {
          set({ user: null, loading: false });
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true });
    
    try {
      console.log('Attempting sign in for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Sign in successful, fetching profile...');
        
        // Fetch user profile with role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          throw profileError;
        }

        if (profile) {
          set({
            user: {
              id: data.user.id,
              email: data.user.email!,
              role: profile.role,
              created_at: profile.created_at,
              updated_at: profile.updated_at,
            },
            loading: false,
          });
        }
      }
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, loading: false });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  signUp: async (email: string, password: string, role = 'viewer') => {
    set({ loading: true });
    
    try {
      console.log('Attempting sign up for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }

      console.log('Sign up successful:', data);
      
      // Profile creation will be handled by database trigger
      // The onAuthStateChange listener will update the user state
      // once the profile is created and the user is confirmed
      
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateProfile: async (updates: Partial<User>) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('No user logged in');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          role: updates.role,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentUser.id)
        .select()
        .single();

      if (error) throw error;

      set({
        user: {
          ...currentUser,
          ...updates,
          updated_at: data.updated_at,
        },
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
}));