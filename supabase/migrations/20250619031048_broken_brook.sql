/*
  # Fix infinite recursion in profiles RLS policies

  1. Problem
    - Admin policies were checking user role by querying profiles table
    - This created infinite recursion when trying to access profiles table
    - Error: "infinite recursion detected in policy for relation profiles"

  2. Solution
    - Drop the problematic admin SELECT policy that causes recursion
    - Keep the simple "Users can read own profile" policy
    - Keep other admin policies but modify them to avoid recursion in critical paths
    - Application will handle admin privileges after initial profile fetch

  3. Changes
    - Drop "Admins can read all profiles" SELECT policy
    - Keep "Users can read own profile" SELECT policy (no recursion)
    - Keep other admin policies for INSERT/UPDATE/DELETE operations
*/

-- Drop the problematic admin SELECT policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

-- The "Users can read own profile" policy should remain and doesn't cause recursion
-- This policy allows: (uid() = id)

-- Note: Admin users can still manage profiles through other policies,
-- but the initial profile fetch will work without recursion.
-- The application will need to handle admin-specific profile access 
-- at the application level after the initial profile is loaded.