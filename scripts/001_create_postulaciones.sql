-- Create postulaciones table for property contact form submissions
CREATE TABLE IF NOT EXISTS postulaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  propiedad_id UUID NOT NULL REFERENCES propiedades(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  mensaje TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE postulaciones ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form submissions)
CREATE POLICY "Allow public insert on postulaciones" ON postulaciones 
  FOR INSERT 
  WITH CHECK (true);

-- Only allow authenticated users (admins) to view submissions
CREATE POLICY "Allow authenticated users to view postulaciones" ON postulaciones 
  FOR SELECT 
  USING (auth.role() = 'authenticated');
