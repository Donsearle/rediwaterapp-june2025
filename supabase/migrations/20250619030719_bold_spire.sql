/*
  # Fix user signup by adding profile creation trigger

  1. Problem Resolution
    - Fixes "Database error saving new user" during signup
    - Adds automatic profile creation when users register
    - Ensures profiles table is populated for new auth users

  2. New Functions
    - `handle_new_user()` - Creates profile entry for new authenticated users

  3. New Triggers
    - `on_auth_user_created` - Triggers profile creation after user insertion

  4. Security
    - Function runs with security definer privileges
    - Maintains existing RLS policies on profiles table
*/

-- Function to create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (new.id, 'viewer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();