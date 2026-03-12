-- Create propiedades table for property submissions
CREATE TABLE IF NOT EXISTS propiedades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  ubicacion TEXT NOT NULL,
  tipo_propiedad TEXT NOT NULL,
  precio INTEGER NOT NULL,
  dormitorios INTEGER NOT NULL,
  banos INTEGER NOT NULL,
  descripcion TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE propiedades ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form submission)
CREATE POLICY "Allow public inserts" ON propiedades
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admins) can view submissions
CREATE POLICY "Allow authenticated users to view" ON propiedades
  FOR SELECT
  USING (auth.uid() IS NOT NULL);
