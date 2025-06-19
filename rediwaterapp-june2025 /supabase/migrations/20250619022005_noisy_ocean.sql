/*
  # Create boreholes table for borehole management

  1. New Tables
    - `boreholes`
      - All 25 fields as specified in PRD Borehole Data Model
      - Proper data types and constraints
      - Foreign key relationship to sites table

  2. Security
    - Enable RLS on `boreholes` table
    - Add policies for role-based access (viewers read, editors CRUD, admins full access)

  3. Indexes
    - Add indexes on frequently queried columns for performance
    - Add spatial index on latitude/longitude for map queries

  4. Constraints
    - Add check constraints for latitude/longitude ranges
    - Add check constraints for status values
*/

-- Create boreholes table with all PRD fields
CREATE TABLE IF NOT EXISTS boreholes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  latitude numeric NOT NULL CHECK (latitude >= -90 AND latitude <= 90),
  longitude numeric NOT NULL CHECK (longitude >= -180 AND longitude <= 180),
  site_id uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  equipment text DEFAULT '',
  drilling_depth numeric,
  casing text DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'needs_attention', 'maintenance', 'decommissioned')),
  yield_test_completed text DEFAULT '',
  steps_hrs numeric,
  constant_hrs numeric,
  recovery_hrs numeric,
  static_water_level_2019 numeric,
  static_water_level_2024 numeric,
  depth_measured numeric,
  max_yield numeric,
  current_status_and_planned text DEFAULT '',
  water_strike_depths text DEFAULT '',
  recommended_pump_depth numeric,
  construction_yield numeric,
  daily_abstraction numeric,
  date_tested date,
  water_sample_analysis text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE boreholes ENABLE ROW LEVEL SECURITY;

-- Create policies for role-based access
CREATE POLICY "All authenticated users can read boreholes"
  ON boreholes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Editors and admins can insert boreholes"
  ON boreholes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editors and admins can update boreholes"
  ON boreholes
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editors and admins can delete boreholes"
  ON boreholes
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER boreholes_updated_at
  BEFORE UPDATE ON boreholes
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS boreholes_site_id_idx ON boreholes(site_id);
CREATE INDEX IF NOT EXISTS boreholes_status_idx ON boreholes(status);
CREATE INDEX IF NOT EXISTS boreholes_name_idx ON boreholes(name);
CREATE INDEX IF NOT EXISTS boreholes_location_idx ON boreholes(latitude, longitude);
CREATE INDEX IF NOT EXISTS boreholes_created_at_idx ON boreholes(created_at DESC);