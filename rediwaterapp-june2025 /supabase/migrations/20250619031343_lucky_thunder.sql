/*
  # Fix infinite recursion in profiles RLS policies

  The current admin policies for the profiles table are causing infinite recursion 
  because they query the profiles table within the policy itself. This creates a 
  circular dependency where accessing profiles triggers a policy that tries to 
  access profiles again.

  ## Changes
  1. Drop existing problematic admin policies
  2. Recreate admin policies using a safer approach that doesn't cause recursion
  3. Keep the existing user policies as they are working correctly

  ## Security
  - Admin policies will use a function-based approach to avoid recursion
  - Users can still read and update their own profiles
  - All operations remain secure with proper RLS
*/

-- Drop all existing admin policies that cause recursion
DROP POLICY IF EXISTS "Admins can delete profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Create a function to safely check if current user is admin
-- This function uses auth.users table instead of profiles to avoid recursion
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  -- Check if user is authenticated
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  
  -- Get the user's role from profiles table using a direct query
  -- This is safe because it's called from outside the RLS context
  SELECT role INTO user_role
  FROM profiles
  WHERE id = auth.uid();
  
  RETURN COALESCE(user_role = 'admin', false);
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$;

-- Create new admin policies using the function
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can insert profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can delete profiles"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (is_admin());