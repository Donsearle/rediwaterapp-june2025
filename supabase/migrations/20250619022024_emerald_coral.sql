/*
  # Create water level readings table

  1. New Tables
    - `water_level_readings`
      - `id` (uuid, primary key)
      - `borehole_id` (uuid, foreign key to boreholes)
      - `date` (date, not null)
      - `water_level` (numeric, not null) - Water level in meters
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `water_level_readings` table
    - Add policies for role-based access (viewers read, editors CRUD, admins full access)

  3. Indexes
    - Add indexes on borehole_id and date for query performance
    - Add composite index for borehole_id + date for time series queries

  4. Constraints
    - Add unique constraint on borehole_id + date to prevent duplicate readings
*/

-- Create water level readings table
CREATE TABLE IF NOT EXISTS water_level_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  borehole_id uuid NOT NULL REFERENCES boreholes(id) ON DELETE CASCADE,
  date date NOT NULL,
  water_level numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(borehole_id, date)
);

-- Enable RLS
ALTER TABLE water_level_readings ENABLE ROW LEVEL SECURITY;

-- Create policies for role-based access
CREATE POLICY "All authenticated users can read water level readings"
  ON water_level_readings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Editors and admins can insert water level readings"
  ON water_level_readings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editors and admins can update water level readings"
  ON water_level_readings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editors and admins can delete water level readings"
  ON water_level_readings
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER water_level_readings_updated_at
  BEFORE UPDATE ON water_level_readings
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS water_level_readings_borehole_id_idx ON water_level_readings(borehole_id);
CREATE INDEX IF NOT EXISTS water_level_readings_date_idx ON water_level_readings(date DESC);
CREATE INDEX IF NOT EXISTS water_level_readings_borehole_date_idx ON water_level_readings(borehole_id, date DESC);
CREATE INDEX IF NOT EXISTS water_level_readings_created_at_idx ON water_level_readings(created_at DESC);