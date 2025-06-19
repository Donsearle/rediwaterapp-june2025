/*
  # Create sites table for site/mine management

  1. New Tables
    - `sites`
      - `id` (uuid, primary key)
      - `name` (text, unique, not null)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `sites` table
    - Add policies for all authenticated users to read sites
    - Add policies for admins to manage sites
    - Add policies for editors to read sites (cannot create/update/delete)

  3. Indexes
    - Add index on name for search performance
*/

-- Create sites table
CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "All authenticated users can read sites"
  ON sites
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert sites"
  ON sites
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update sites"
  ON sites
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete sites"
  ON sites
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER sites_updated_at
  BEFORE UPDATE ON sites
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create index for search performance
CREATE INDEX IF NOT EXISTS sites_name_idx ON sites(name);